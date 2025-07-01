'use client'

import { useEditorStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'

export function RoundnessControls() {
  const { screenshot, setScreenshot } = useEditorStore()

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Roundness & Position</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
            Corner Radius ({screenshot.radius}px)
          </label>
          <Slider
            value={[screenshot.radius]}
            onValueChange={([value]) => setScreenshot({ radius: value })}
            min={0}
            max={50}
            step={1}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
            Horizontal Offset ({screenshot.offsetX}px)
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
          <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
            Vertical Offset ({screenshot.offsetY}px)
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
          <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
            Scale ({(screenshot.scale * 100).toFixed(0)}%)
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
      </CardContent>
    </Card>
  )
} 