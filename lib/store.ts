import { create } from 'zustand'

export type AspectRatio = 'square' | '4:3' | '2:1' | '3:2'

export interface ScreenshotStyle {
  src: string | null
  scale: number
  rotation: number
  radius: number
  offsetX: number
  offsetY: number
}

export interface ShadowStyle {
  enabled: boolean
  elevation: number
  side: 'bottom' | 'right' | 'bottom-right'
  softness: number
  color: string
  intensity: number
}

export interface BackgroundStyle {
  mode: 'solid' | 'gradient'
  colorA: string
  colorB: string
  gradientDirection: number // 0-360 degrees
}

export interface PatternStyle {
  enabled: boolean
  type:
    | 'dots'
    | 'grid'
    | 'diagonal'
    | 'lines'
    | 'zigzag'
    | 'swiggle'
    | 'cross'
    | 'wave'
    | 'checkerboard'
    | 'rings'
  opacity: number
  scale: number
  spacing: number
  rotation: number
  color: string
  blur: number
}

export interface FrameStyle {
  enabled: boolean
  type: 'none' | 'solid' | 'window' | 'glassy' | 'infinite-mirror' | 'ruler' | 'eclipse'
  // Solid
  color: string
  width: number
  // Window
  padding: number
  title: string
  theme: 'light' | 'dark'
}

export interface CanvasSettings {
  aspectRatio: AspectRatio
  padding: number
  frameColor: string
  exportMultiplier: number
  exportFormat: 'png' | 'jpeg'
  exportQuality: number
}

export interface EditorState {
  screenshot: ScreenshotStyle
  shadow: ShadowStyle
  background: BackgroundStyle
  pattern: PatternStyle
  frame: FrameStyle
  canvas: CanvasSettings

  // Actions
  setScreenshot: (screenshot: Partial<ScreenshotStyle>) => void
  setShadow: (shadow: Partial<ShadowStyle>) => void
  setBackground: (background: Partial<BackgroundStyle>) => void
  setPattern: (pattern: Partial<PatternStyle>) => void
  setFrame: (frame: Partial<FrameStyle>) => void
  setCanvas: (canvas: Partial<CanvasSettings>) => void
  set: (fn: (state: EditorState) => EditorState) => void
}

export const useEditorStore = create<EditorState>((set) => ({
  screenshot: {
    src: null,
    scale: 1,
    rotation: 0,
    radius: 12,
    offsetX: 0,
    offsetY: 0,
  },
  shadow: {
    enabled: true,
    elevation: 20,
    side: 'bottom-right',
    softness: 20,
    color: '#000000',
    intensity: 0.5,
  },
  background: {
    mode: 'solid',
    colorA: '#ffffff',
    colorB: '#f0f0f0',
    gradientDirection: 0,
  },
  pattern: {
    enabled: false,
    type: 'dots',
    opacity: 0.2,
    scale: 1,
    spacing: 1,
    rotation: 0,
    color: '#000000',
    blur: 0,
  },
  frame: {
    enabled: true,
    type: 'solid',
    color: '#000000',
    width: 2,
    padding: 24,
    title: 'screenshot.png',
    theme: 'dark',
  },
  canvas: {
    aspectRatio: 'square',
    padding: 40,
    frameColor: '#ffffff',
    exportMultiplier: 2,
    exportFormat: 'png',
    exportQuality: 0.9,
  },

  setScreenshot: (screenshot) =>
    set((state) => ({
      screenshot: { ...state.screenshot, ...screenshot },
    })),
  setShadow: (shadow) =>
    set((state) => ({
      shadow: { ...state.shadow, ...shadow },
    })),
  setBackground: (background) =>
    set((state) => ({
      background: { ...state.background, ...background },
    })),
  setPattern: (pattern) =>
    set((state) => ({
      pattern: { ...state.pattern, ...pattern },
    })),
  setFrame: (frame) =>
    set((state) => ({
      frame: { ...state.frame, ...frame },
    })),
  setCanvas: (canvas) =>
    set((state) => ({
      canvas: { ...state.canvas, ...canvas },
    })),
  set: (fn) => set(fn),
})) 