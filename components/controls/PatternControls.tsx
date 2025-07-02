'use client'

import { useMemo } from 'react'
import { useEditorStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { generatePattern, patternTypes, type PatternType } from '@/lib/patterns'

interface PatternPreviewProps {
  type: PatternType
  selected: boolean
  onSelect: () => void
}

function PatternPreview({ type, selected, onSelect }: PatternPreviewProps) {
  // Generate a lightweight preview only once per type
  const patternUrl = useMemo(() => {
    const canvas = generatePattern(type, 1, 1, '#000000', 0, 0)
    return canvas.toDataURL()
  }, [type])

  return (
    <div
      onClick={onSelect}
      className='w-full h-12 rounded-lg cursor-pointer border-2 border-transparent aria-selected:border-blue-500'
      aria-selected={selected}
      style={{ backgroundColor: '#ffffff', backgroundImage: `url(${patternUrl})` }}
    />
  )
}

export function PatternControls() {
  const pattern = useEditorStore((s) => s.pattern)
  const set = useEditorStore((s) => s.set)

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
                  <PatternPreview type={value} selected={pattern.type === value} onSelect={() => setPattern({ type: value })} />
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
              step={0.1}
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
              max={10}
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
              max={15}
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
              Blur ({(pattern.blur ?? 0).toFixed(1)}px)
            </label>
            {(() => {
              const sliderValue = (pattern.blur ?? 0) * 5 // 0-20px -> 0-100 UI
              return (
                <Slider
                  value={[sliderValue]}
                  onValueChange={([val]) => {
                    const newBlur = val / 5 // map back to px
                    setPattern({ blur: newBlur })
                  }}
                  min={0}
                  max={100}
                  step={1}
                  className='w-full'
                />
              )
            })()}
          </div>
        </CardContent>
      )}
    </Card>
  )
} 