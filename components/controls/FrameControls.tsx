'use client'

import { useEditorStore } from '@/lib/store'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

export function FrameControls() {
  const { frame, setFrame } = useEditorStore()

  const commonInputClasses =
    'w-full px-2 py-1 text-sm border border-[var(--sidebar-border)] rounded bg-[var(--secondary)] text-[var(--panel-fg)] placeholder:text-muted-foreground focus:ring-1 focus:ring-accent focus:border-accent outline-none'

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-muted-foreground">Frame</div>

      <div className="space-y-4 pt-4 border-t border-[var(--sidebar-border)]">
        <Select
          value={frame.type}
          onValueChange={(v) => setFrame({ type: v as any, enabled: true })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="solid">Solid</SelectItem>
            <SelectItem value="glassy">Glassy</SelectItem>
            <SelectItem value="window">Window</SelectItem>
            <SelectItem value="infinite-mirror">Infinite Mirror</SelectItem>
            <SelectItem value="ruler">Ruler</SelectItem>
            <SelectItem value="eclipse">Eclipse</SelectItem>
            <SelectItem value="stack">Stack</SelectItem>
            <SelectItem value="dotted">Dotted</SelectItem>
          </SelectContent>
        </Select>

        {['solid', 'dotted'].includes(frame.type) && (
          <>
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={frame.color}
                  onChange={(e) => setFrame({ color: e.target.value })}
                  className="w-10 h-8 rounded border-none cursor-pointer"
                  style={{ backgroundColor: frame.color }}
                />
                <input
                  type="text"
                  value={frame.color}
                  onChange={(e) => setFrame({ color: e.target.value })}
                  className={commonInputClasses}
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

        {(frame.type === 'window' || frame.type === 'stack') && (
          <>
            <Select value={frame.theme} onValueChange={(v) => setFrame({ theme: v as any })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
            {frame.type === 'window' && (
              <>
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">Title</label>
                  <input
                    type="text"
                    value={frame.title}
                    onChange={(e) => setFrame({ title: e.target.value })}
                    className={commonInputClasses}
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
          </>
        )}
      </div>
    </div>
  )
} 