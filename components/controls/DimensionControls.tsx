'use client'

import { useEditorStore, type AspectRatio } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const aspectRatios: { value: AspectRatio; label: string }[] = [
  { value: 'square', label: '1:1 (Square)' },
  { value: '4:3', label: '4:3 (Standard)' },
  { value: '3:2', label: '3:2 (Photo)' },
]

export function DimensionControls() {
  const { canvas, setCanvas } = useEditorStore()

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Dimensions</CardTitle>
      </CardHeader>
      <CardContent>
        <Select
          value={canvas.aspectRatio}
          onValueChange={(value: AspectRatio) => setCanvas({ aspectRatio: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {aspectRatios.map((ratio) => (
              <SelectItem key={ratio.value} value={ratio.value}>
                {ratio.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  )
} 