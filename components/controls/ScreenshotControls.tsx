'use client'

import { useEditorStore } from '@/lib/store'
import { Button } from '@/components/ui/button'

export function ScreenshotControls() {
  const { screenshot, setScreenshot } = useEditorStore()

  if (!screenshot.src) {
    return null
  }

  return (
    <div className="space-y-4">
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setScreenshot({ src: null })}
        className="w-full"
      >
        Remove Screenshot
      </Button>
    </div>
  )
} 