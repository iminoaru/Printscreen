'use client'

import { useEditorStore } from '@/lib/store'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'

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

export function ShadowControls() {
  const { shadow, setShadow } = useEditorStore()

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-muted-foreground">Shadow</div>
      <div className="space-y-4 pt-4 border-t border-[var(--sidebar-border)]">
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">Direction</label>
          <Tabs
            value={shadow.side}
            onValueChange={(value) =>
              setShadow({ side: value as 'bottom' | 'right' | 'bottom-right', enabled: true })
            }
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bottom">Bottom</TabsTrigger>
              <TabsTrigger value="right">Right</TabsTrigger>
              <TabsTrigger value="bottom-right">Btm Right</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-2 block">Color</label>
          <div className="flex items-center gap-2">
            <div
              className="relative size-9 shrink-0 overflow-hidden rounded-lg"
              style={{ backgroundColor: shadow.color }}
            >
              <input
                type="color"
                value={shadow.color}
                onChange={(e) => setShadow({ color: e.target.value, enabled: true })}
                className="absolute inset-0 size-full cursor-pointer opacity-0"
              />
            </div>
            <ColorInput
              value={shadow.color}
              onChange={(color) => setShadow({ color, enabled: true })}
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-2 block">
            Elevation
          </label>
          <Slider
            value={[shadow.elevation]}
            onValueChange={([value]) => setShadow({ elevation: value, enabled: true })}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-2 block">
            Softness
          </label>
          <Slider
            value={[shadow.softness]}
            onValueChange={([value]) => setShadow({ softness: value, enabled: true })}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-2 block">
            Intensity
          </label>
          <Slider
            value={[shadow.intensity ?? 0.5]}
            onValueChange={([value]) => setShadow({ intensity: value, enabled: true })}
            min={0}
            max={1}
            step={0.05}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
} 