'use client'

import * as React from 'react'
import { useEditorStore } from '@/lib/store'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'

const frameOptions = [
  { value: 'none', label: 'None' },
  { value: 'solid', label: 'Solid' },
  { value: 'glassy', label: 'Glassy' },
  { value: 'window-light', label: 'Window' },
  { value: 'window-dark', label: 'Window (Dark)' },
  { value: 'infinite-mirror', label: 'Mirror' },
  { value: 'ruler', label: 'Ruler' },
  { value: 'eclipse', label: 'Eclipse' },
  { value: 'stack-light', label: 'Stack' },
  { value: 'stack-dark', label: 'Stack (Dark)' },
  { value: 'dotted', label: 'Dotted' },
] as const

type FrameType = (typeof frameOptions)[number]['value']

function FramePreview({
  type,
  selected,
  onSelect,
  children,
}: {
  type: FrameType
  selected: boolean
  onSelect: () => void
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={onSelect}
        aria-selected={selected}
        className="flex h-14 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-transparent bg-secondary transition-colors duration-200 aria-selected:border-primary hover:bg-secondary/80"
        title={type}
      >
        <div className="relative h-8 w-10">{children}</div>
      </button>
      <div className="text-xs text-muted-foreground">{frameOptions.find((f) => f.value === type)?.label}</div>
    </div>
  )
}

const framePreviews: Record<FrameType, React.ReactNode> = {
  none: <div className="size-full rounded-md border-2 border-dashed border-muted-foreground/50" />,
  solid: <div className="size-full rounded-md border-4 border-primary/80" />,
  glassy: <div className="size-full rounded-md border-2 border-white/50 bg-white/10 backdrop-blur-sm" />,
  'window-light': (
    <div className="flex size-full flex-col rounded-md border-2 border-neutral-300 bg-white/80">
      <div className="flex h-2 items-center gap-0.5 rounded-t-sm bg-neutral-200 px-1">
        <div className="size-1 rounded-full bg-red-400" />
        <div className="size-1 rounded-full bg-yellow-400" />
        <div className="size-1 rounded-full bg-green-400" />
      </div>
    </div>
  ),
  'window-dark': (
    <div className="flex size-full flex-col rounded-md border-2 border-neutral-700 bg-black/80">
      <div className="flex h-2 items-center gap-0.5 rounded-t-sm bg-neutral-800 px-1">
        <div className="size-1 rounded-full bg-red-500" />
        <div className="size-1 rounded-full bg-yellow-500" />
        <div className="size-1 rounded-full bg-green-500" />
      </div>
    </div>
  ),
  'infinite-mirror': (
    <div className="size-full rounded-md border-2 border-primary/80 p-1">
      <div className="size-full rounded-[3px] border-2 border-primary/60 p-0.5">
        <div className="size-full rounded-[2px] border-2 border-primary/40" />
      </div>
    </div>
  ),
  ruler: <div className="size-full border-2 border-black/60 bg-yellow-400/50" />,
  eclipse: <div className="size-full rounded-full bg-secondary-foreground" />,
  'stack-light': (
    <div className="relative size-full">
      <div className="absolute left-0 top-0 h-5/6 w-5/6 rounded-md border-2 border-neutral-300 bg-white/80" />
      <div className="absolute bottom-0 right-0 h-5/6 w-5/6 rounded-md border-2 border-neutral-400/80 bg-white/60" />
    </div>
  ),
  'stack-dark': (
    <div className="relative size-full">
      <div className="absolute left-0 top-0 h-5/6 w-5/6 rounded-md border-2 border-neutral-700 bg-black/80" />
      <div className="absolute bottom-0 right-0 h-5/6 w-5/6 rounded-md border-2 border-neutral-600/80 bg-black/60" />
    </div>
  ),
  dotted: <div className="size-full rounded-md border-2 border-dashed border-primary/80" />,
}

export function FrameControls() {
  const { frame, setFrame } = useEditorStore()

  const handleSelect = (value: FrameType) => {
    if (value.includes('-')) {
      const [type, theme] = value.split('-')
      setFrame({ type: type as 'window' | 'stack', theme: theme as 'light' | 'dark', enabled: true })
    } else {
      setFrame({ type: value as Exclude<FrameType, `${'window' | 'stack'}-${'light' | 'dark'}`>, enabled: true })
    }
  }

  const isSelected = (value: FrameType) => {
    if (value.includes('-')) {
      const [type, theme] = value.split('-')
      return frame.type === type && frame.theme === theme
    }
    return frame.type === value
  }

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-muted-foreground">Frame</div>

      <div className="space-y-4 border-t border-border pt-4">
        <div>
          <label className="mb-2 block text-xs text-muted-foreground">Style</label>
          <div className="grid grid-cols-4 gap-x-2 gap-y-4">
            {frameOptions.map(({ value }) => (
              <FramePreview
                key={value}
                type={value}
                selected={isSelected(value)}
                onSelect={() => handleSelect(value)}
              >
                {framePreviews[value]}
              </FramePreview>
            ))}
          </div>
        </div>

        {['solid', 'dotted'].includes(frame.type) && (
          <>
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Color</label>
              <div className="flex items-center gap-2">
                <div
                  className="relative size-9 shrink-0 overflow-hidden rounded-lg"
                  style={{ backgroundColor: frame.color }}
                >
                  <input
                    type="color"
                    value={frame.color}
                    onChange={(e) => setFrame({ color: e.target.value, enabled: true })}
                    className="absolute inset-0 size-full cursor-pointer opacity-0"
                  />
                </div>
                <Input
                  type="text"
                  value={frame.color}
                  onChange={(e) => setFrame({ color: e.target.value, enabled: true })}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">
                Width
              </label>
              <Slider
                value={[frame.width]}
                onValueChange={([value]) => setFrame({ width: value })}
                min={1}
                max={20}
                step={1}
              />
            </div>
          </>
        )}

        {frame.type === 'window' && (
          <>
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Title</label>
              <Input
                type="text"
                value={frame.title}
                onChange={(e) => setFrame({ title: e.target.value, enabled: true })}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">
                Padding
              </label>
              <Slider
                value={[frame.padding]}
                onValueChange={([value]) => setFrame({ padding: value })}
                min={0}
                max={100}
                step={1}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
} 