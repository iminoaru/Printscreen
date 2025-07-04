"use client"

import { useMemo, useState, useEffect } from 'react'
import { useEditorStore } from '@/lib/store'
import { Slider } from '@/components/ui/slider'
import { generatePattern, patternTypes, type PatternType } from '@/lib/patterns'
import { Input } from '@/components/ui/input'

const isValidHex = (color: string) => /^#[0-9A-F]{6}$/i.test(color)

function ColorInput({
  value,
  onChange,
  className = '',
}: {
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleBlur = () => {
    if (isValidHex(localValue)) {
      onChange(localValue)
    } else {
      setLocalValue(value)
    }
  }

  return (
    <Input
      type="text"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      onBlur={handleBlur}
      className={className}
    />
  )
}

interface PatternPreviewProps {
  type: PatternType
  selected: boolean
  onSelect: () => void
}

function PatternPreview({ type, selected, onSelect }: PatternPreviewProps) {
  const patternUrl = useMemo(() => {
    if (type === 'none') return ''
    const canvas = generatePattern(type, 1, 1, 'white', 0, 0)
    return canvas.toDataURL()
  }, [type])

  return (
    <button
      onClick={onSelect}
      className='w-full h-12 rounded-lg cursor-pointer border-2 border-transparent aria-selected:border-accent flex items-center justify-center'
      aria-selected={selected}
      style={{ backgroundColor: 'var(--secondary)', backgroundImage: `url(${patternUrl})` }}
    >
      {type === 'none' && <div className="size-8 rounded-md border-2 border-dashed border-muted-foreground/50" />}
    </button>
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
              <div key={value}>
                <PatternPreview
                  type={value}
                  selected={value === 'none' ? !pattern.enabled : pattern.type === value && pattern.enabled}
                  onSelect={() => {
                    if (value === 'none') {
                      set((state) => ({ ...state, pattern: { ...state.pattern, enabled: false } }))
                    } else {
                      setPattern({ type: value })
                    }
                  }}
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
            <ColorInput
              value={pattern.color}
              onChange={(color) => setPattern({ color: color })}
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
            step={0.01}
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