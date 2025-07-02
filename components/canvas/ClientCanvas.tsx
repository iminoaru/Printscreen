'use client'

import { useEffect, useRef, useState } from 'react'
import { Stage, Layer, Rect, Image as KonvaImage, Group, Circle, Text, Path } from 'react-konva'
import { useEditorStore } from '@/lib/store'
import { generatePattern } from '@/lib/patterns'

function CanvasRenderer({ image }: { image: HTMLImageElement }) {
  const stageRef = useRef<any>(null)
  const patternRectRef = useRef<any>(null)
  const noiseRectRef = useRef<any>(null)
  const [patternImage, setPatternImage] = useState<HTMLCanvasElement | null>(null)
  const [noiseImage, setNoiseImage] = useState<HTMLImageElement | null>(null)

  const {
    screenshot,
    background,
    shadow,
    pattern: patternStyle,
    frame,
    canvas,
    noise,
  } = useEditorStore()

  useEffect(() => {
    if (!patternStyle.enabled) {
      setPatternImage(null)
      return
    }
    const newPattern = generatePattern(
      patternStyle.type,
      patternStyle.scale,
      patternStyle.spacing,
      patternStyle.color,
      patternStyle.rotation,
      patternStyle.blur
    )
    setPatternImage(newPattern)
  }, [
    patternStyle.enabled,
    patternStyle.type,
    patternStyle.scale,
    patternStyle.spacing,
    patternStyle.color,
    patternStyle.rotation,
    patternStyle.blur,
  ])

  useEffect(() => {
    if (!noise.enabled || noise.type === 'none') {
      setNoiseImage(null)
      return
    }
    
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => setNoiseImage(img)
    img.onerror = () => setNoiseImage(null)
    img.src = `/${noise.type}.jpg`
  }, [noise.enabled, noise.type])

  /* ─────────────────── layout helpers ─────────────────── */
  const MAX_STAGE = 1000
  const imageAspect = image.naturalWidth / image.naturalHeight

  const canvasAspect =
    canvas.aspectRatio === 'square'
      ? 1
      : canvas.aspectRatio === '4:3'
      ? 4 / 3
      : canvas.aspectRatio === '2:1'
      ? 2
      : canvas.aspectRatio === '3:2'
      ? 3 / 2
      : imageAspect // fallback: free

  let contentW, contentH
  if (imageAspect > canvasAspect) {
    contentW = Math.min(MAX_STAGE, image.naturalWidth)
    contentH = contentW / canvasAspect
  } else {
    contentH = Math.min(MAX_STAGE, image.naturalHeight)
    contentW = contentH * canvasAspect
  }

  const canvasW = contentW + canvas.padding * 2
  const canvasH = contentH + canvas.padding * 2

  useEffect(() => {
    if (patternRectRef.current) {
      patternRectRef.current.cache()
    }
  }, [
    patternImage,
    canvasW,
    canvasH,
    patternStyle.opacity,
    patternStyle.blur,
  ])

  
  let imageScaledW, imageScaledH
  if (contentW / contentH > imageAspect) {
    imageScaledH = contentH * screenshot.scale
    imageScaledW = imageScaledH * imageAspect
  } else {
    imageScaledW = contentW * screenshot.scale
    imageScaledH = imageScaledW / imageAspect
  }

  /* ─────────────────── frame helpers ─────────────────── */
  const showFrame = frame.enabled && frame.type !== 'none'
  const frameOffset =
    showFrame && (frame.type === 'solid' || frame.type === 'glassy')
      ? frame.width
      : showFrame && frame.type === 'ruler'
      ? frame.width + 2
      : 0
  const windowPadding = showFrame && frame.type === 'window' ? frame.padding : 0
  const windowHeader = showFrame && frame.type === 'window' ? 40 : 0
  const eclipseBorder = showFrame && frame.type === 'eclipse' ? frame.width + 2 : 0

  const framedW = imageScaledW + frameOffset * 2 + windowPadding * 2 + eclipseBorder
  const framedH = imageScaledH + frameOffset * 2 + windowPadding * 2 + windowHeader + eclipseBorder


  /* ─────────────────── background + shadow helpers ─────────────────── */
  const gradientProps =
    background.mode === 'gradient'
      ? (() => {
          const rad = (background.gradientDirection * Math.PI) / 180
          const cx = canvasW / 2,
            cy = canvasH / 2
          const hw = canvasW / 2,
            hh = canvasH / 2
          return {
            fillLinearGradientStartPoint: {
              x: cx - Math.cos(rad) * hw,
              y: cy - Math.sin(rad) * hh,
            },
            fillLinearGradientEndPoint: {
              x: cx + Math.cos(rad) * hw,
              y: cy + Math.sin(rad) * hh,
            },
            fillLinearGradientColorStops: [0, background.colorA, 1, background.colorB],
          }
        })()
      : {}

  const shadowProps = shadow.enabled
    ? (() => {
        const { elevation, side, softness, color, intensity } = shadow
        const diag = elevation * 0.707
        const offset =
          side === 'bottom'
            ? { x: 0, y: elevation }
            : side === 'right'
            ? { x: elevation, y: 0 }
            : side === 'bottom-right'
            ? { x: diag, y: diag }
            : { x: 0, y: 0 }
        return {
          shadowColor: color,
          shadowBlur: softness,
          shadowOffsetX: offset.x,
          shadowOffsetY: offset.y,
          shadowOpacity: intensity,
        }
      })()
    : {}



  /* ─────────────────── render ─────────────────── */
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div style={{ width: '75%', aspectRatio: `${canvasW}/${canvasH}` }} className="flex items-center justify-center">
          <Stage
            width={canvasW}
            height={canvasH}
            ref={stageRef}
            className='hires-stage'
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <Layer>
              <Rect
                width={canvasW}
                height={canvasH}
                fill={background.mode === 'solid' ? background.colorA : undefined}
                {...gradientProps}
              />
            </Layer>
            <Layer>
              {patternImage && (
                <Rect
                  ref={patternRectRef}
                  width={canvasW}
                  height={canvasH}
                  fillPatternImage={patternImage as any}
                  fillPatternRepeat='repeat'
                  opacity={patternStyle.opacity}
                  perfectDrawEnabled={false}
                />
              )}
            </Layer>
            <Layer>
              {noiseImage && (
                <Rect
                  ref={noiseRectRef}
                  width={canvasW}
                  height={canvasH}
                  fillPatternImage={noiseImage as any}
                  fillPatternRepeat='repeat'
                  opacity={noise.opacity}
                  perfectDrawEnabled={false}
                />
              )}
            </Layer>
            <Layer>
              <Group
                x={canvasW / 2 + screenshot.offsetX}
                y={canvasH / 2 + screenshot.offsetY}
                width={framedW}
                height={framedH}
                offsetX={framedW / 2}
                offsetY={framedH / 2}
                rotation={screenshot.rotation}
              >

                {/* Solid Frame */}
                {showFrame && frame.type === 'solid' && (
                  <Rect
                    width={framedW}
                    height={framedH}
                    fill={frame.color}
                    cornerRadius={screenshot.radius}
                    {...shadowProps}
                  />
                )}

                {/* Glassy Frame */}
                {showFrame && frame.type === 'glassy' && (
                  <Rect
                    width={framedW}
                    height={framedH}
                    fill="rgba(255, 255, 255, 0.15)"
                    stroke="rgba(255, 255, 255, 0.3)" 
                    strokeWidth={frame.width * 4 + 6}
                    cornerRadius={screenshot.radius + 6}
                    shadowForStrokeEnabled
                    {...shadowProps}
                  />
                )}

                {/* Ruler Frame */}
                {showFrame && frame.type === 'ruler' && (
                  <Group>
                    <Rect 
                      width={framedW} 
                      height={framedH}
                      cornerRadius={screenshot.radius}
                      fill="rgba(0,0,0,0.3)"
                      shadowForStrokeEnabled
                      {...shadowProps}
                    />
                    
                    <Rect 
                      width={framedW - 1} 
                      height={framedH - 1} 
                      x={1} 
                      y={1}
                      stroke="rgba(255, 255, 255, 0.9)" 
                      strokeWidth={1}
                      cornerRadius={Math.max(0, screenshot.radius - 2)} 
                    />
                    
                    <Group>
                      <Rect width={framedW} height={framedH} fill="rgba(255, 255, 255, 0.2)" cornerRadius={screenshot.radius} />
                      <Group globalCompositeOperation="source-atop">
                        {/* Top ruler marks */}
                        {Array.from({ length: Math.floor(framedW / 10) -1 }).map((_, i) => (
                          <Rect key={`t-${i}`} x={(i) * 10} y={1} width={2} height={(i+1) % 5 === 0 ? 10 : 5} fill="rgba(0, 0, 0, 0.8)" />
                        ))}
                        {/* Left ruler marks */}
                        {Array.from({ length: Math.floor(framedH / 10) -1 }).map((_, i) => (
                          <Rect key={`l-${i}`} x={1} y={(i) * 10} width={(i+1) % 5 === 0 ? 10 : 5} height={2} fill="rgba(0, 0, 0, 0.8)" />
                        ))}
                        {/* Right ruler marks */}
                        {Array.from({ length: Math.floor(framedH / 10) -1 }).map((_, i) => (
                          <Rect key={`r-${i}`} x={framedW - 1} y={(i) * 10} width={(i+1) % 5 === 0 ? -10 : -5} height={2} fill="rgba(0, 0, 0, 0.8)" />
                        ))}
                        {/* Bottom ruler marks */}
                        {Array.from({ length: Math.floor(framedW / 10) -1 }).map((_, i) => (
                          <Rect key={`b-${i}`} x={(i) * 10} y={framedH - 1} width={2} height={(i+1) % 5 === 0 ? -10 : -5} fill="rgba(0, 0, 0, 0.8)" />
                        ))}
                      </Group>
                    </Group>
                    
                    <Rect 
                      width={framedW} 
                      height={framedH} 
                      stroke="rgba(0, 0, 0, 0.15)" 
                      strokeWidth={1} 
                      cornerRadius={screenshot.radius} 
                    />
                  </Group>
                )}


                {/* Infinite Mirror Frame */}
                {showFrame && frame.type === 'infinite-mirror' && (
                  <>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Rect
                        key={i}
                        width={framedW + i * 15}
                        height={framedH + i * 15}
                        x={-i * 7.5}
                        y={-i * 7.5}
                        stroke={frame.color}
                        strokeWidth={4}
                        cornerRadius={screenshot.radius + i * 5}
                        opacity={0.3 - i * 0.07}
                        {...(i === 0 ? { ...shadowProps, shadowForStrokeEnabled: true } : {})}
                      />
                    ))}
                  </>
                )}

                {/* Eclipse Frame */}
                {showFrame && frame.type === 'eclipse' && (
                  <Group>
                    <Rect
                      width={framedW}
                      height={framedH}
                      fill={frame.color}
                      cornerRadius={screenshot.radius + eclipseBorder}
                      {...shadowProps}
                    />
                    <Rect
                      globalCompositeOperation="destination-out"
                      x={eclipseBorder}
                      y={eclipseBorder}
                      width={framedW - eclipseBorder * 2}
                      height={framedH - eclipseBorder * 2}
                      fill="black"
                      cornerRadius={screenshot.radius}
                    />
                  </Group>
                )}
                

                {/* Stack Frame */}
                {showFrame && frame.type === 'stack' && (
                  <>
                    {/* Bottom layer - darkest */}
                    <Rect
                      width={framedW / 1.2}
                      height={framedH / 5}
                      x={(framedW - framedW / 1.2) / 2}
                      y={-40}
                      fill={frame.theme === 'dark' ? '#444444' : '#f5f5f5' }
                      cornerRadius={screenshot.radius}
                      opacity={1}
                      {...shadowProps}
                    />
                    {/* Middle layer */}
                    <Rect
                      width={framedW / 1.1}
                      height={framedH / 5}
                      x={(framedW - framedW / 1.1) / 2}
                      y={-20}
                      fill={frame.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'}
                      cornerRadius={screenshot.radius}
                      opacity={1}
                    />
                    {/* Top layer - lightest, will have image on top */}
                    <Rect
                      width={framedW}
                      height={framedH}
                      fill={frame.theme === 'dark' ? '#555555' : '#e8e8e8'}
                      cornerRadius={screenshot.radius}
                      {...shadowProps}
                    />
                  </>
                )}

                {/* Window Frame */}
                {showFrame && frame.type === 'window' && (
                  <>
                    <Rect // main window
                      width={framedW}
                      height={framedH}
                      fill={frame.theme === 'dark' ? '#2f2f2f' : '#fefefe'}
                      cornerRadius={[screenshot.radius / 2, screenshot.radius / 2, screenshot.radius, screenshot.radius]}
                      {...shadowProps}
                    />
                    <Rect // header
                      width={framedW}
                      height={windowHeader}
                      fill={frame.theme === 'dark' ? '#4a4a4a' : '#e2e2e2'}
                      cornerRadius={[screenshot.radius, screenshot.radius, 0, 0]}
                    />
                    <Circle x={25} y={20} radius={10} fill="#ff5f57" />
                    <Circle x={50} y={20} radius={10} fill="#febc2e" />
                    <Circle x={75} y={20} radius={10} fill="#28c840" />
                    <Text
                      text={frame.title}
                      x={0}
                      y={0}
                      width={framedW}
                      height={windowHeader}
                      align="center"
                      verticalAlign="middle"
                      fill={frame.theme === 'dark' ? '#f0f0f0' : '#4f4f4f'}
                      fontSize={16}
                    />
                  </>
                )}

                {/* Dotted Frame */}
                {showFrame && frame.type === 'dotted' && (
                  <Rect
                    width={framedW}
                    height={framedH}
                    stroke={frame.color}
                    strokeWidth={frame.width}
                    dash={[frame.width * 2, frame.width * 1.2]}
                    cornerRadius={screenshot.radius}
                  />
                )}

                {/* Focus Frame */}
                {showFrame && frame.type === 'focus' && (
                  <Group>
                    <Path
                      data={`M ${frameOffset}, ${frameOffset + frame.width * 1.5} Q ${frameOffset}, ${frameOffset} ${frameOffset + frame.width * 1.5}, ${frameOffset}`}
                      stroke={frame.color}
                      strokeWidth={frame.width}
                      lineCap="round"
                      {...shadowProps}
                    />
                    <Path
                      data={`M ${frameOffset + imageScaledW}, ${frameOffset + imageScaledH - frame.width * 1.5} Q ${frameOffset + imageScaledW}, ${frameOffset + imageScaledH} ${frameOffset + imageScaledW - frame.width * 1.5}, ${frameOffset + imageScaledH}`}
                      stroke={frame.color}
                      strokeWidth={frame.width}
                      lineCap="round"
                      {...shadowProps}
                    />
                    <Path
                      data={`M ${frameOffset + imageScaledW - frame.width * 1.5}, ${frameOffset} Q ${frameOffset + imageScaledW}, ${frameOffset} ${frameOffset + imageScaledW}, ${frameOffset + frame.width * 1.5}`}
                      stroke={frame.color}
                      strokeWidth={frame.width}
                      lineCap="round"
                      {...shadowProps}
                    />
                    <Path
                      data={`M ${frameOffset + frame.width * 1.5}, ${frameOffset + imageScaledH} Q ${frameOffset}, ${frameOffset + imageScaledH} ${frameOffset}, ${frameOffset + imageScaledH - frame.width * 1.5}`}
                      stroke={frame.color}
                      strokeWidth={frame.width}
                      lineCap="round"
                      {...shadowProps}
                    />
                  </Group>
                )}

                <KonvaImage
                  image={image}
                  x={frameOffset + windowPadding}
                  y={frameOffset + windowPadding + windowHeader}
                  width={imageScaledW}
                  height={imageScaledH}
                  cornerRadius={
                    showFrame && frame.type === 'window'
                      ? [0, 0, screenshot.radius, screenshot.radius]
                      : showFrame && frame.type === 'ruler'
                      ? screenshot.radius * 0.8
                      : screenshot.radius
                  }
                  imageSmoothingEnabled={false}
                  {...(!showFrame || frame.type === 'none' || frame.type === 'dotted' ? shadowProps : {})}
                />
              </Group>
            </Layer>
          </Stage>
        </div>
    </div>
  )
}

export default function ClientCanvas() {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const { screenshot, setScreenshot } = useEditorStore()

  useEffect(() => {
    if (!screenshot.src) {
      setImage(null)
      return
    }
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => setImage(img)
    img.onerror = () => setScreenshot({ src: null })
    img.src = screenshot.src
  }, [screenshot.src, setScreenshot])

  if (!image) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
      </div>
    )
  }

  return <CanvasRenderer image={image} />
}
