'use client'

import { useEffect, useRef, useState } from 'react'
import { Stage, Layer, Rect, Image as KonvaImage } from 'react-konva'
import Konva from 'konva'
import { useEditorStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { generatePattern } from '@/lib/patterns'

function CanvasRenderer({ image }: { image: HTMLImageElement }) {
  const stageRef = useRef<any>(null)
  const patternRectRef = useRef<any>(null)
  const [patternImage, setPatternImage] = useState<HTMLCanvasElement | null>(null)

  const {
    screenshot,
    background,
    shadow,
    pattern: patternStyle,
    canvas,
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
      patternStyle.rotation
    )
    setPatternImage(newPattern)
  }, [
    patternStyle.enabled,
    patternStyle.type,
    patternStyle.scale,
    patternStyle.spacing,
    patternStyle.color,
    patternStyle.rotation,
  ])

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
    patternStyle.blur,
    patternImage,
    canvasW,
    canvasH,
    patternStyle.opacity,
  ])

  // The user's screenshot must be contained within the content box.
  let imageScaledW, imageScaledH
  if (contentW / contentH > imageAspect) {
    imageScaledH = contentH * screenshot.scale
    imageScaledW = imageScaledH * imageAspect
  } else {
    imageScaledW = contentW * screenshot.scale
    imageScaledH = imageScaledW / imageAspect
  }

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

  /* ─────────────────── HQ export (dynamic pixelRatio) ─────────────────── */
  const handleExport = () => {
    if (!stageRef.current || !image) return
    const shrinkFactor = image.naturalWidth / imageScaledW
    const desiredPR = canvas.exportMultiplier * shrinkFactor
    const MAX_EDGE = 8192
    const cappedPR = Math.min(desiredPR, MAX_EDGE / canvasW)
    const uri = stageRef.current.toDataURL({
      mimeType: 'image/png',
      pixelRatio: cappedPR,
      imageSmoothingEnabled: true,
    })
    const link = document.createElement('a')
    link.download = `media-kit-${Date.now()}.png`
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  /* ─────────────────── render ─────────────────── */
  return (
    <div className='flex flex-col items-center space-y-4'>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4'>
        <Stage
          width={canvasW}
          height={canvasH}
          ref={stageRef}
          className='hires-stage'
          style={{
            width: canvasW / 1.4,
            height: canvasH / 1.4,
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
                filters={[Konva.Filters.Blur]}
                blurRadius={patternStyle.blur}
                perfectDrawEnabled={false}
              />
            )}
          </Layer>
          <Layer>
            <KonvaImage
              image={image}
              x={canvasW / 2 + screenshot.offsetX}
              y={canvasH / 2 + screenshot.offsetY}
              width={imageScaledW}
              height={imageScaledH}
              offsetX={imageScaledW / 2}
              offsetY={imageScaledH / 2}
              cornerRadius={screenshot.radius}
              rotation={screenshot.rotation}
              imageSmoothingEnabled={false} // crisp preview
              {...shadowProps}
            />
          </Layer>
        </Stage>
      </div>

      <Button onClick={handleExport}>Download PNG</Button>
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
      <div className='flex-1 flex items-center justify-center min-h-[400px]'>
        <div className='text-gray-500'>Awaiting image…</div>
      </div>
    )
  }

  return <CanvasRenderer image={image} />
}
