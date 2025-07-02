"use client"

import { useMemo } from 'react'
import { useEditorStore } from '@/lib/store'
import { Slider } from '@/components/ui/slider'
import { generatePattern, patternTypes, type PatternType } from '@/lib/patterns'
import { Input } from '@/components/ui/input'

interface PatternPreviewProps {
  type: PatternType
  selected: boolean
  onSelect: () => void
}

function PatternPreview({ type, selected, onSelect }: PatternPreviewProps) {
  const patternUrl = useMemo(() => {
    const canvas = generatePattern(type, 1, 1, 'white', 0, 0)
    return canvas.toDataURL()
  }, [type])

  return (
    <button
      onClick={onSelect}
      className='w-full h-12 rounded-lg cursor-pointer border-2 border-transparent aria-selected:border-accent'
      aria-selected={selected}
      style={{ backgroundColor: 'var(--secondary)', backgroundImage: `url(${patternUrl})` }}
    />
  )
}

export function PatternControls() {
  const pattern = useEditorStore((s) => s.pattern)
  const set = useEditorStore((s) => s.set)

  const setPattern = (newPattern: Partial<typeof pattern>) => {
    set((state) => ({ ...state, pattern: { ...state.pattern, ...newPattern, enabled: true } }))
  }

  return (
    <div className='space-y-4'>
      <div className='text-sm font-medium text-muted-foreground'>Pattern</div>

      <div className='space-y-4 pt-4 border-t border-[var(--sidebar-border)]'>
        <div>
          <label className='text-xs text-muted-foreground mb-2 block'>Style</label>
          <div className='grid grid-cols-3 gap-2'>
            {patternTypes.map(({ value }) => (
              <div key={value} onClick={() => setPattern({ type: value, enabled: true })}>
                <PatternPreview
                  type={value}
                  selected={pattern.type === value}
                  onSelect={() => setPattern({ type: value, enabled: true })}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className='text-xs text-muted-foreground mb-2 block'>Color</label>
          <div className='flex items-center gap-2'>
            <div
              className="relative size-9 shrink-0 overflow-hidden rounded-lg"
              style={{ backgroundColor: pattern.color }}
            >
              <input
                type='color'
                value={pattern.color}
                onChange={(e) => setPattern({ color: e.target.value })}
                className="absolute inset-0 size-full cursor-pointer opacity-0"
              />
            </div>
            <Input
              type='text'
              value={pattern.color}
              onChange={(e) => setPattern({ color: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className='text-xs text-muted-foreground mb-2 block'>
            Opacity
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
          <label className='text-xs text-muted-foreground mb-2 block'>
            Scale
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
          <label className='text-xs text-muted-foreground mb-2 block'>
            Spacing
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
          <label className='text-xs text-muted-foreground mb-2 block'>
            Rotation
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
          <label className='text-xs text-muted-foreground mb-2 block'>
            Blur
          </label>
          {(() => {
            const sliderValue = (pattern.blur ?? 0) * 5
            return (
              <Slider
                value={[sliderValue]}
                onValueChange={([val]) => {
                  const newBlur = val / 5
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
      </div>
    </div>
  )
} 