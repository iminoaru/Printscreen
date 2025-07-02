'use client'

import { useEditorStore } from '@/lib/store'
import { SOLID_PRESETS, GRADIENT_PRESETS } from '@/lib/store'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Palette } from 'lucide-react'

export function BackgroundControls() {
  const { background, setBackground } = useEditorStore()
  const commonInputClasses =
    'flex-1 px-2 py-1 text-sm border border-[var(--sidebar-border)] rounded bg-[var(--secondary)] text-[var(--panel-fg)] placeholder:text-muted-foreground focus:ring-1 focus:ring-accent focus:border-accent outline-none'

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-muted-foreground">Background</div>

      <div className="grid grid-cols-2 gap-2">
        <Tabs
          value={background.mode}
          onValueChange={(value) => setBackground({ mode: value as 'solid' | 'gradient' })}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="solid">Solid</TabsTrigger>
            <TabsTrigger value="gradient">Gradient</TabsTrigger>
          </TabsList>
        </Tabs>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <Palette className="w-4 h-4 mr-2" />
              Presets
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            {background.mode === 'solid' ? (
              <div className="grid grid-cols-4 gap-2">
                {SOLID_PRESETS.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setBackground({ colorA: color })}
                    className="w-full h-8 rounded border border-[var(--sidebar-border)] hover:scale-105 transition-transform"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {GRADIENT_PRESETS.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setBackground({
                        colorA: preset.colorA,
                        colorB: preset.colorB,
                        gradientDirection: preset.direction,
                      })
                    }
                    className="w-full h-8 rounded border border-[var(--sidebar-border)] hover:scale-105 transition-transform"
                    style={{
                      background: `linear-gradient(${preset.direction}deg, ${preset.colorA}, ${preset.colorB})`,
                    }}
                    title={`${preset.colorA} → ${preset.colorB}`}
                  />
                ))}
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>

      {background.mode === 'solid' && (
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={background.colorA}
              onChange={(e) => setBackground({ colorA: e.target.value })}
              className="w-9 h-9 rounded border-none cursor-pointer"
              style={{ backgroundColor: background.colorA }}
            />
            <input
              type="text"
              value={background.colorA}
              onChange={(e) => setBackground({ colorA: e.target.value })}
              className={commonInputClasses}
            />
          </div>
        </div>
      )}

      {background.mode === 'gradient' && (
        <div className="space-y-4">
          <div className="flex items-start gap-4 overflow-hidden">
            <div className="flex-1 min-w-0 py-2 px-4 rounded-lg bg-[var(--secondary)]/80">
              <label className="text-xs text-muted-foreground mb-2 block">Start</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={background.colorA}
                  onChange={(e) => setBackground({ colorA: e.target.value })}
                  className="w-7 h-7 rounded cursor-pointer flex-shrink-0"
                  style={{ backgroundColor: background.colorA }}
                />
                <input
                  type="text"
                  value={background.colorA}
                  onChange={(e) => setBackground({ colorA: e.target.value })}
                  className="min-w-0 flex-1 px-2 py-1 text-sm border border-[var(--sidebar-border)] rounded bg-[var(--secondary)] text-[var(--panel-fg)] placeholder:text-muted-foreground focus:ring-1 focus:ring-accent focus:border-accent outline-none"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0 py-2 px-4 rounded-lg bg-[var(--secondary)]/80">
              <label className="text-xs text-muted-foreground mb-2 block">End</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={background.colorB}
                  onChange={(e) => setBackground({ colorB: e.target.value })}
                  className="w-7 h-7 rounded cursor-pointer flex-shrink-0"
                  style={{ backgroundColor: background.colorB }}
                />
                <input
                  type="text"
                  value={background.colorB}
                  onChange={(e) => setBackground({ colorB: e.target.value })}
                  className="min-w-0 flex-1 px-2 py-1 text-sm border border-[var(--sidebar-border)] rounded bg-[var(--secondary)] text-[var(--panel-fg)] placeholder:text-muted-foreground focus:ring-1 focus:ring-accent focus:border-accent outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-2 block">
              Direction
            </label>
            <Slider
              value={[background.gradientDirection]}
              onValueChange={([value]) => setBackground({ gradientDirection: value })}
              min={0}
              max={360}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  )
} 