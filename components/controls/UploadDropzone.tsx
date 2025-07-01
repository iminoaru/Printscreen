'use client'

import { useCallback } from 'react'
import { useEditorStore } from '@/lib/store'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function UploadDropzone() {
  const { screenshot, setScreenshot } = useEditorStore()

  const handleFileUpload = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const src = e.target?.result as string
      setScreenshot({ src })
    }
    reader.readAsDataURL(file)
  }, [setScreenshot])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFileUpload(file)
  }, [handleFileUpload])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileUpload(file)
  }, [handleFileUpload])

  if (screenshot.src) {
    return (
      <Card className="p-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Screenshot loaded</div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setScreenshot({ src: null })}
        >
          Remove & Upload New
        </Button>
      </Card>
    )
  }

  return (
    <Card 
      className="p-8 border-dashed border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="text-center space-y-4">
        <div className="text-gray-600 dark:text-gray-400">
          <div className="text-lg font-medium mb-2">Drop screenshot here</div>
          <div className="text-sm">or click to browse</div>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
        />
        <Button asChild variant="outline">
          <label htmlFor="file-upload" className="cursor-pointer">
            Choose File
          </label>
        </Button>
      </div>
    </Card>
  )
} 