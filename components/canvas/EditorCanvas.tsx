'use client'

import dynamic from 'next/dynamic'
import { useEditorStore } from '@/lib/store'
import { UploadDropzone } from '@/components/controls/UploadDropzone'

const ClientCanvas = dynamic(() => import('@/components/canvas/ClientCanvas'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center min-h-[400px]">
      <div className="text-gray-500">Loading Canvas...</div>
    </div>
  ),
})

export function EditorCanvas() {
  const { screenshot } = useEditorStore()

  if (!screenshot.src) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="w-full max-w-md">
          <UploadDropzone />
        </div>
      </div>
    )
  }

  return <ClientCanvas />
} 