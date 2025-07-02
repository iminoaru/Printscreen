import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { useEditorStore } from '@/lib/store'

export function ExportControls() {
  const { canvas, setCanvas } = useEditorStore()
  const isJPEG = canvas.exportFormat === 'jpeg'

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Export</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">Format</label>
          <Select
            value={canvas.exportFormat}
            onValueChange={(value: 'png' | 'jpeg') => setCanvas({ exportFormat: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG (lossless)</SelectItem>
              <SelectItem value="jpeg">JPEG (compressed)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isJPEG && (
          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
              Quality ({Math.round((canvas.exportQuality ?? 0.9) * 100)}%)
            </label>
            <Slider
              value={[canvas.exportQuality ?? 0.9]}
              onValueChange={([value]) => setCanvas({ exportQuality: value })}
              min={0.3}
              max={1}
              step={0.01}
              className="w-full"
            />
          </div>
        )}

        <div>
          <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
            Resolution Multiplier ({canvas.exportMultiplier}×)
          </label>
          <Slider
            value={[canvas.exportMultiplier]}
            onValueChange={([value]) => setCanvas({ exportMultiplier: value })}
            min={1}
            max={16}
            step={1}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  )
} 