'use client'

import { useEditorStore, type AspectRatio } from '@/lib/store'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const aspectRatios: { value: AspectRatio; label: string }[] = [
  { value: 'square', label: '1:1' },
  { value: '4:3', label: '4:3' },
  { value: '3:2', label: '3:2' },
]

export function DimensionControls() {
  const { canvas, setCanvas } = useEditorStore()

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-muted-foreground">Dimensions</div>
      <Tabs
        value={canvas.aspectRatio}
        onValueChange={(value) => setCanvas({ aspectRatio: value as AspectRatio })}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          {aspectRatios.map((ratio) => (
            <TabsTrigger key={ratio.value} value={ratio.value}>
              {ratio.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
} 