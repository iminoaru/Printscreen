'use client'

import { EditorCanvas } from '@/components/canvas/EditorCanvas'
import { BackgroundControls } from '@/components/controls/BackgroundControls'
import { ShadowControls } from '@/components/controls/ShadowControls'
import { RoundnessControls } from '@/components/controls/RoundnessControls'
import { ScreenshotControls } from '@/components/controls/ScreenshotControls'
import { DimensionControls } from '@/components/controls/DimensionControls'
import { FrameControls } from '@/components/controls/FrameControls'
import { NoiseControls } from '@/components/controls/NoiseControls'
import { ExportControls } from '@/components/controls/ExportControls'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const PatternControls = dynamic(
  () => import('@/components/controls/PatternControls').then(mod => mod.PatternControls),
  { ssr: false }
)

export default function EditorPage() {
  return (
    <div className="min-h-screen bg-background grid lg:grid-cols-10">
      <a 
        href="https://sgaud.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 text-xs text-foreground/60 hover:text-foreground  transition-colors duration-200 z-[100]"
      >
        made by Sarthak
      </a>
      
      {/* Controls Panel */}
      <div className="bg-[var(--panel-bg)] text-[var(--panel-fg)] border-r border-[var(--sidebar-border)] flex flex-col lg:col-span-3 h-screen max-h-screen">
        {/* Header */}
        <div className="p-4 border-b border-[var(--sidebar-border)]">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-md" />
            <div>
              <h1 className="text-2xl font-bold -ml-2">Printscreen <span className="text-sm text-muted-foreground pl-4 font-semibold"> Make your screenshots presentable</span></h1>
            </div>
          </div>
        </div>

        {/* Scrollable controls list */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          <DimensionControls />
          <Separator />
          <BackgroundControls />
          <Separator />
          <RoundnessControls />
          <Separator />
          <PatternControls />
          <Separator />
          <FrameControls />
          <Separator />
          <ShadowControls />
          <Separator />
          <NoiseControls />
          <Separator />
          <ScreenshotControls />
        </div>
        
        {/* Fixed Export Section */}
        <div className="p-6 border-t border-[var(--sidebar-border)]">
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
