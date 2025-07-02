'use client'

import { useEditorStore } from '@/lib/store'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function ShadowControls() {
  const { shadow, setShadow } = useEditorStore()
  const commonInputClasses =
    'flex-1 px-2 py-1 text-sm border border-[var(--sidebar-border)] rounded bg-[var(--secondary)] text-[var(--panel-fg)] placeholder:text-muted-foreground focus:ring-1 focus:ring-accent focus:border-accent outline-none'

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
            <input
              type="color"
              value={shadow.color}
              onChange={(e) => setShadow({ color: e.target.value, enabled: true })}
              className="w-10 h-8 rounded border-none cursor-pointer"
              style={{ backgroundColor: shadow.color }}
            />
            <input
              type="text"
              value={shadow.color}
              onChange={(e) => setShadow({ color: e.target.value, enabled: true })}
              className={commonInputClasses}
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