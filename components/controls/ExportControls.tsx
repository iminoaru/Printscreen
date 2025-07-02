'use client'

import { Button } from '@/components/ui/button'
import { useEditorStore } from '@/lib/store'

export function ExportControls() {
  const { canvasRef, canvas, screenshot } = useEditorStore()

  const handleExport = (format: 'png' | 'jpeg') => {
    if (!canvasRef?.current) return

    const stage = canvasRef.current
    const stageCanvas = stage.getCanvas()
    if (!stageCanvas) return

    const MAX_EDGE = 8192
    const exportMultiplier = canvas.exportMultiplier
    const canvasW = stageCanvas.width
    const canvasH = stageCanvas.height
    const cappedPR = Math.min(exportMultiplier, MAX_EDGE / Math.max(canvasW, canvasH))

    const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png'
    const uri = stage.toDataURL({
      mimeType,
      quality: format === 'jpeg' ? canvas.exportQuality : undefined,
      pixelRatio: cappedPR,
      imageSmoothingEnabled: true,
    })

    const link = document.createElement('a')
    const extension = format === 'jpeg' ? 'jpg' : 'png'
    link.download = `prtscn-${Date.now()}.${extension}`
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!screenshot.src) {
    return null
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1">
        <p className="text-xs text-muted-foreground">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Star us on the hub!</a>
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button onClick={() => handleExport('png')} size="lg">
          PNG
        </Button>
        <Button onClick={() => handleExport('jpeg')} size="lg">
          JPEG
        </Button>
      </div>
    </div>
  )
} 