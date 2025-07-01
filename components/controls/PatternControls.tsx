'use client'

import { useMemo, useState, useEffect } from 'react'
import { useEditorStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { generatePattern, patternTypes, type PatternType } from '@/lib/patterns'

function PatternPreview({ type }: { type: PatternType }) {
  const pattern = useEditorStore((state) => state.pattern)
  const background = useEditorStore((state) => state.background)

  const [patternUrl, setPatternUrl] = useState('')

  const backgroundStyle = useMemo(() => {
    if (background.mode === 'solid') {
      return { backgroundColor: background.colorA }
    }
    return { backgroundColor: background.colorA }
  }, [background])

  useEffect(() => {
    if (!pattern.enabled) {
      setPatternUrl('')
      return
    }
    const patternCanvas = generatePattern(
      type,
      pattern.scale,
      pattern.spacing,
      pattern.color,
      pattern.rotation
    )
    setPatternUrl(patternCanvas.toDataURL())
  }, [
    type,
    pattern.enabled,
    pattern.scale,
    pattern.spacing,
    pattern.color,
    pattern.rotation,
  ])

  const patternStyle = useMemo(() => {
    if (!patternUrl) {
      return { backgroundImage: 'none' }
    }
    return {
      backgroundImage: `url(${patternUrl})`,
    }
  }, [patternUrl])

  return (
    <div
      className='w-full h-12 rounded-lg cursor-pointer border-2 border-transparent aria-selected:border-blue-500'
      aria-selected={pattern.type === type}
      style={{ ...backgroundStyle, ...patternStyle }}
    />
  )
}

export function PatternControls() {
  const { pattern, set } = useEditorStore()

  const setPattern = (newPattern: Partial<typeof pattern>) => {
    set((state) => ({ ...state, pattern: { ...state.pattern, ...newPattern } }))
  }

  return (
    <Card>
      <CardHeader className='pb-3'>
        <CardTitle className='text-sm font-medium flex items-center justify-between'>
          Pattern
          <label className='relative inline-flex items-center cursor-pointer'>
            <input
              type='checkbox'
              checked={pattern.enabled}
              onChange={(e) => setPattern({ enabled: e.target.checked })}
              className='sr-only peer'
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </CardTitle>
      </CardHeader>
      {pattern.enabled && (
        <CardContent className='space-y-4 pt-4'>
          <div>
            <label className='text-xs text-gray-600 dark:text-gray-400 mb-2 block'>
              Style
            </label>
            <div className='grid grid-cols-5 gap-2'>
              {patternTypes.map(({ value }) => (
                <div key={value} onClick={() => setPattern({ type: value })}>
                  <PatternPreview type={value} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className='text-xs text-gray-600 dark:text-gray-400 mb-2 block'>
              Color
            </label>
            <div className='flex items-center gap-2'>
              <input
                type='color'
                value={pattern.color}
                onChange={(e) => setPattern({ color: e.target.value })}
                className='w-10 h-8 rounded border border-gray-300 dark:border-gray-600 cursor-pointer'
              />
              <input
                type='text'
                value={pattern.color}
                onChange={(e) => setPattern({ color: e.target.value })}
                className='flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800'
              />
            </div>
          </div>
          <div>
            <label className='text-xs text-gray-600 dark:text-gray-400 mb-2 block'>
              Opacity ({Math.round(pattern.opacity * 100)}%)
            </label>
            <Slider
              value={[pattern.opacity]}
              onValueChange={([value]) => setPattern({ opacity: value })}
              min={0}
              max={1}
              step={0.05}
              className='w-full'
            />
          </div>
          <div>
            <label className='text-xs text-gray-600 dark:text-gray-400 mb-2 block'>
              Scale ({pattern.scale.toFixed(1)}x)
            </label>
            <Slider
              value={[pattern.scale]}
              onValueChange={([value]) => setPattern({ scale: value })}
              min={0.1}
              max={3}
              step={0.1}
              className='w-full'
            />
          </div>
          <div>
            <label className='text-xs text-gray-600 dark:text-gray-400 mb-2 block'>
              Spacing ({(pattern.spacing ?? 1).toFixed(1)}x)
            </label>
            <Slider
              value={[pattern.spacing ?? 1]}
              onValueChange={([value]) => setPattern({ spacing: value })}
              min={0.1}
              max={5}
              step={0.1}
              className='w-full'
            />
          </div>
          <div>
            <label className='text-xs text-gray-600 dark:text-gray-400 mb-2 block'>
              Rotation ({pattern.rotation ?? 0}°)
            </label>
            <Slider
              value={[pattern.rotation ?? 0]}
              onValueChange={([value]) => setPattern({ rotation: value })}
              min={0}
              max={360}
              step={1}
              className='w-full'
            />
          </div>
          <div>
            <label className='text-xs text-gray-600 dark:text-gray-400 mb-2 block'>
              Blur ({(pattern.blur ?? 0)}px)
            </label>
            <Slider
              value={[pattern.blur ?? 0]}
              onValueChange={([value]) => setPattern({ blur: value })}
              min={0}
              max={50}
              step={1}
              className='w-full'
            />
          </div>
        </CardContent>
      )}
    </Card>
  )
} 