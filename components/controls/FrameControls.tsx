'use client'

import { useEditorStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

export function FrameControls() {
  const { frame, setFrame } = useEditorStore()

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          Frame
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={frame.enabled}
              onChange={(e) => setFrame({ enabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </CardTitle>
      </CardHeader>
      {frame.enabled && (
        <CardContent className="space-y-4">
          <Select value={frame.type} onValueChange={(v) => setFrame({ type: v as any })}>
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
            </SelectContent>
          </Select>

          {frame.type === 'solid' && (
            <>
              <div>
                <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={frame.color}
                    onChange={(e) => setFrame({ color: e.target.value })}
                    className="w-10 h-8 rounded border border-gray-300 dark:border-gray-600"
                  />
                  <input
                    type="text"
                    value={frame.color}
                    onChange={(e) => setFrame({ color: e.target.value })}
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
                  Width ({frame.width}px)
                </label>
                <Slider
                  value={[frame.width]}
                  onValueChange={([value]) => setFrame({ width: value })}
                  min={1}
                  max={50}
                  step={1}
                />
              </div>
            </>
          )}

          {frame.type === 'window' && (
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
              <div>
                <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">Title</label>
                <input
                  type="text"
                  value={frame.title}
                  onChange={(e) => setFrame({ title: e.target.value })}
                  className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
                  Padding ({frame.padding}px)
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
        </CardContent>
      )}
    </Card>
  )
} 