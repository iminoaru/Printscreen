'use client'

import { EditorCanvas } from '@/components/canvas/EditorCanvas'
import { BackgroundControls } from '@/components/controls/BackgroundControls'
import { ShadowControls } from '@/components/controls/ShadowControls'
import { RoundnessControls } from '@/components/controls/RoundnessControls'
import { UploadDropzone } from '@/components/controls/UploadDropzone'
import { DimensionControls } from '@/components/controls/DimensionControls'
import { PatternControls } from '@/components/controls/PatternControls'

export default function EditorPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Controls Panel */}
        <div className="w-[500px] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen flex flex-col">
          {/* Scrollable controls list */}
          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            <UploadDropzone />
            <DimensionControls />
            <BackgroundControls />
            <PatternControls />
            <ShadowControls />
            <RoundnessControls />
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 p-8 flex items-center justify-center">
          <EditorCanvas />
        </div>
      </div>
    </div>
  )
}
