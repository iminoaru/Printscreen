'use client'

import { Button } from '@/components/ui/button'
import { useEditorStore } from '@/lib/store'
import Konva from 'konva'
import { useEffect } from 'react'

const doExport = (stage: Konva.Stage, options: any) => {
  const stageCanvas = stage.toCanvas()
  if (!stageCanvas) return

  const MAX_EDGE = 8192
  const { exportMultiplier, exportQuality, format } = options
  const canvasW = stageCanvas.width
  const canvasH = stageCanvas.height
  const cappedPR = Math.min(exportMultiplier, MAX_EDGE / Math.max(canvasW, canvasH))

  Konva.pixelRatio = 1;
  const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png'
  const uri = stage.toDataURL({
    mimeType,
    quality: format === 'jpeg' ? exportQuality : undefined,
    pixelRatio: cappedPR,
  })

  const link = document.createElement('a')
  const extension = format === 'jpeg' ? 'jpg' : 'png'
  link.download = `prtscn-${Date.now()}.${extension}`
  link.href = uri
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

declare global {
  interface Window {
    handleExport: (format: 'png' | 'jpeg') => void
  }
}

export function ExportControls() {
  const { canvas, screenshot } = useEditorStore()

  useEffect(() => {
    window.handleExport = (format: 'png' | 'jpeg') => {
      const stage = Konva.stages.find((s) => s.container().parentElement?.style.display !== 'none');
      if (stage) {
        doExport(stage, { ...canvas, format })
      }
    }
  }, [canvas])

  if (!screenshot.src) {
    return null
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">
          <a href="https://github.com/iminoaru/Printscreen" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">⭐️ us on the hub!</a>
        </p>
      </div>
      
    {screenshot.src && (
      <div className="flex gap-4">
        <Button onClick={() => window.handleExport('png')} size="lg">
          Crisp
        </Button>
        <Button onClick={() => window.handleExport('jpeg')} size="lg">
          Compact
        </Button>
      </div>
    )}
    </div>
  )
} 