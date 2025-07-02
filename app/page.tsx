'use client'

import { EditorCanvas } from '@/components/canvas/EditorCanvas'
import { BackgroundControls } from '@/components/controls/BackgroundControls'
import { ShadowControls } from '@/components/controls/ShadowControls'
import { RoundnessControls } from '@/components/controls/RoundnessControls'
import { UploadDropzone } from '@/components/controls/UploadDropzone'
import { DimensionControls } from '@/components/controls/DimensionControls'
import { PatternControls } from '@/components/controls/PatternControls'
import { FrameControls } from '@/components/controls/FrameControls'
import { NoiseControls } from '@/components/controls/NoiseControls'
import { ExportControls } from '@/components/controls/ExportControls'

export default function EditorPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 grid lg:grid-cols-10">
      {/* Controls Panel */}
      <div className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col lg:col-span-3 h-screen max-h-screen">
        {/* Scrollable controls list */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          <UploadDropzone />
          <DimensionControls />
          <FrameControls />
          <BackgroundControls />
          <PatternControls />
          <NoiseControls />
          <ShadowControls />
          <RoundnessControls />
        </div>
        
        {/* Fixed Export Section */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <ExportControls />
        </div>
      </div>
      {/* <div className="lg:col-span-1"></div> */}
      {/* Canvas Area */}
      <div className="lg:col-span-7 flex items-center justify-center p-4 h-screen w-full">
        <EditorCanvas />
      </div>
    </div>
  )
}
