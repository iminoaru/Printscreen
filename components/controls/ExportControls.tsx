'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/lib/store'

export function ExportControls() {
  const { canvasRef, canvas } = useEditorStore()

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

  return (
    
      <div className="space-y-4 grid grid-cols-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white col-span-2">Export</h3>
        
        <div className="space-y-3 col-span-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-full">
                Download Image
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={cn('bg-white dark:bg-gray-800 shadow-lg rounded-md p-1 text-sm')}> 
              <DropdownMenuItem
                onSelect={() => handleExport('png')}
                className={cn('cursor-pointer px-3 py-2 rounded-md focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700')}
              >
                PNG (lossless)
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => handleExport('jpeg')}
                className={cn('cursor-pointer px-3 py-2 rounded-md focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700')}
              >
                JPEG (smaller)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.open('https://github.com', '_blank')}
          >
            View on GitHub
          </Button>
        </div>
      </div>
  )
} 