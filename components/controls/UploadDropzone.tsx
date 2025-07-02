'use client'

import { useCallback, useState } from 'react'
import { useEditorStore } from '@/lib/store'
import { UploadCloud } from 'lucide-react'
import { cn } from '@/lib/utils'

export function UploadDropzone() {
  const { setScreenshot } = useEditorStore()
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  const handleFileUpload = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) return

      const reader = new FileReader()
      reader.onload = (e) => {
        const src = e.target?.result as string
        setScreenshot({ src })
      }
      reader.readAsDataURL(file)
    },
    [setScreenshot],
  )

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingOver(false)
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDraggingOver(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFileUpload(file)
    },
    [handleFileUpload],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFileUpload(file)
    },
    [handleFileUpload],
  )

  const handleContainerClick = () => {
    document.getElementById('file-upload')?.click()
  }

  return (
    <div
      className={cn(
        'w-full h-full flex flex-col items-center justify-center p-8 border-dashed border-2 border-border hover:border-foreground/20 rounded-xl text-center space-y-6 cursor-pointer bg-background/80 transition-all duration-300 ease-in-out',
        {
          'scale-105 bg-background border-accent': isDraggingOver,
        },
      )}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onClick={handleContainerClick}
    >
      <UploadCloud className="w-24 h-24 text-muted-foreground/50" />
      <div className="text-muted-foreground">
        <div className="text-2xl font-medium mb-2 text-foreground">Drop screenshot here</div>
        <div className="text-lg">or click to browse your files</div>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
        id="file-upload"
      />
    </div>
  )
} 