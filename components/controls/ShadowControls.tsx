'use client'

import { useEditorStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

export function ShadowControls() {
  const { shadow, setShadow } = useEditorStore()

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          Shadow
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={shadow.enabled}
              onChange={(e) => setShadow({ enabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </CardTitle>
      </CardHeader>
      {shadow.enabled && (
        <CardContent className="space-y-4">
          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
              Elevation ({shadow.elevation}px)
            </label>
            <Slider
              value={[shadow.elevation]}
              onValueChange={([value]) => setShadow({ elevation: value })}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
              Direction
            </label>
            <Select
              value={shadow.side}
              onValueChange={(value: 'bottom' | 'right' | 'bottom-right') => setShadow({ side: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bottom">Bottom</SelectItem>
                <SelectItem value="right">Right</SelectItem>
                <SelectItem value="bottom-right">Bottom Right</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
              Softness ({shadow.softness}px)
            </label>
            <Slider
              value={[shadow.softness]}
              onValueChange={([value]) => setShadow({ softness: value })}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
              Intensity ({Math.round((shadow.intensity ?? 0.5) * 100)}%)
            </label>
            <Slider
              value={[shadow.intensity ?? 2]}
              onValueChange={([value]) => setShadow({ intensity: value })}
              min={1}
              max={3}
              step={0.05}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
              Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={shadow.color}
                onChange={(e) => setShadow({ color: e.target.value })}
                className="w-10 h-8 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
              />
              <input
                type="text"
                value={shadow.color}
                onChange={(e) => setShadow({ color: e.target.value })}
                className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
              />
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
} 