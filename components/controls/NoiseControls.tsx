'use client'

import { useEditorStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function NoiseControls() {
  const { noise, setNoise } = useEditorStore()

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">
          Texture
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          value={noise.type}
          onValueChange={(value) => {
            setNoise({ 
              type: value as 'none' | 'noise' | 'paper',
              enabled: value !== 'none',
              opacity: 0.1
            })
          }}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="none">None</TabsTrigger>
            <TabsTrigger value="noise">Film Grain</TabsTrigger>
            <TabsTrigger value="paper">Paper</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  )
} 