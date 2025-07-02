'use client'

import { useEditorStore } from '@/lib/store'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function NoiseControls() {
  const { noise, setNoise } = useEditorStore()

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-muted-foreground">Texture</div>
      <Tabs
        value={noise.type}
        onValueChange={(value) => {
          setNoise({
            type: value as 'none' | 'noise' | 'paper',
            enabled: value !== 'none',
            opacity: 0.05,
          })
        }}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="none">None</TabsTrigger>
          <TabsTrigger value="noise">Noise</TabsTrigger>
          <TabsTrigger value="paper">Paper</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
} 