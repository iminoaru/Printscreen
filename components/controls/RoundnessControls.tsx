'use client'

import { useEditorStore } from '@/lib/store'
import { Slider } from '@/components/ui/slider'

export function RoundnessControls() {
  const { screenshot, setScreenshot } = useEditorStore()

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-muted-foreground">Roundness & Position</div>
      <div className="space-y-4 pt-4 border-t border-[var(--sidebar-border)]">
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">
            Corner Radius
          </label>
          <Slider
            value={[screenshot.radius]}
            onValueChange={([value]) => setScreenshot({ radius: value })}
            min={0}
            max={80}
            step={0.5}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-2 block">
            Horizontal Offset
          </label>
          <Slider
            value={[screenshot.offsetX]}
            onValueChange={([value]) => setScreenshot({ offsetX: value })}
            min={-100}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-2 block">
            Vertical Offset
          </label>
          <Slider
            value={[screenshot.offsetY]}
            onValueChange={([value]) => setScreenshot({ offsetY: value })}
            min={-100}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-2 block">
            Scale
          </label>
          <Slider
            value={[screenshot.scale]}
            onValueChange={([value]) => setScreenshot({ scale: value })}
            min={0.5}
            max={2}
            step={0.01}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
} 