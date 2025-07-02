'use client'

import { useEditorStore } from '@/lib/store'
import { SOLID_PRESETS, GRADIENT_PRESETS } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

export function BackgroundControls() {
  const { background, setBackground } = useEditorStore()

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Background</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
            Mode
          </label>
          <Select
            value={background.mode}
            onValueChange={(value: 'solid' | 'gradient') => setBackground({ mode: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solid">Solid Color</SelectItem>
              <SelectItem value="gradient">Gradient</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Solid Color Presets */}
        {background.mode === 'solid' && (
          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
              Presets
            </label>
            <div className="grid grid-cols-3 gap-2">
              {SOLID_PRESETS.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setBackground({ colorA: color })}
                  className="w-full h-8 rounded border border-gray-300 dark:border-gray-600 hover:scale-105 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}

        {/* Gradient Presets */}
        {background.mode === 'gradient' && (
          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
              Presets
            </label>
            <div className="grid grid-cols-3 gap-2">
              {GRADIENT_PRESETS.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => setBackground({ 
                    colorA: preset.colorA, 
                    colorB: preset.colorB,
                    gradientDirection: preset.direction
                  })}
                  className="w-full h-8 rounded border border-gray-300 dark:border-gray-600 hover:scale-105 transition-transform"
                  style={{
                    background: `linear-gradient(${preset.direction}deg, ${preset.colorA}, ${preset.colorB})`
                  }}
                  title={`${preset.colorA} → ${preset.colorB}`}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
            {background.mode === 'gradient' ? 'Start Color' : 'Color'}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={background.colorA}
              onChange={(e) => setBackground({ colorA: e.target.value })}
              className="w-10 h-8 rounded border border-gray-300 dark:border-gray-600"
            />
            <input
              type="text"
              value={background.colorA}
              onChange={(e) => setBackground({ colorA: e.target.value })}
              className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
            />
          </div>
        </div>

        {background.mode === 'gradient' && (
          <>
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
                End Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={background.colorB}
                  onChange={(e) => setBackground({ colorB: e.target.value })}
                  className="w-10 h-8 rounded border border-gray-300 dark:border-gray-600"
                />
                <input
                  type="text"
                  value={background.colorB}
                  onChange={(e) => setBackground({ colorB: e.target.value })}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
                Direction ({background.gradientDirection}°)
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
          </>
        )}
      </CardContent>
    </Card>
  )
} 