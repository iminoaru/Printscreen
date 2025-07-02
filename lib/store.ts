import { create } from 'zustand'
import React from 'react'

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
  opacity: number
  scale: number
  spacing: number
  rotation: number
  color: string
  blur: number
}

export interface FrameStyle {
  enabled: boolean
  type: 'none' | 'solid' | 'window' | 'glassy' | 'infinite-mirror' | 'ruler' | 'eclipse' | 'stack' | 'dotted' | 'photo'
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

export interface NoiseStyle {
  enabled: boolean
  type: 'none' | 'noise' | 'paper'
  opacity: number
}

export interface EditorState {
  screenshot: ScreenshotStyle
  shadow: ShadowStyle
  background: BackgroundStyle
  pattern: PatternStyle
  frame: FrameStyle
  canvas: CanvasSettings
  noise: NoiseStyle
  canvasRef: React.RefObject<any> | null

  // Actions
  setScreenshot: (screenshot: Partial<ScreenshotStyle>) => void
  setShadow: (shadow: Partial<ShadowStyle>) => void
  setBackground: (background: Partial<BackgroundStyle>) => void
  setPattern: (pattern: Partial<PatternStyle>) => void
  setFrame: (frame: Partial<FrameStyle>) => void
  setCanvas: (canvas: Partial<CanvasSettings>) => void
  setNoise: (noise: Partial<NoiseStyle>) => void
  setCanvasRef: (ref: React.RefObject<any> | null) => void
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
    width: 8,
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
  noise: {
    enabled: false,
    type: 'none',
    opacity: 0.1,
  },
  canvasRef: null,

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
  setNoise: (noise) =>
    set((state) => ({
      noise: { ...state.noise, ...noise },
    })),
  setCanvasRef: (ref) =>
    set((state) => ({
      canvasRef: ref,
    })),
  set: (fn) => set(fn),
}))

export const SOLID_PRESETS = [
  '#f3e8ff', // Soft Lavender
  '#bfdbfe', // Light Blue
  '#d1fae5', // Soft Mint
  '#fed7aa', // Peach Orange
  '#fce7f3', // Blush Pink
  '#a7f3d0', // Emerald Green
  '#fbbf24', // Bright Yellow
  '#c7d2fe', // Periwinkle Blue
  '#fb7185', // Coral Pink
]

export const GRADIENT_PRESETS = [
  { colorA: '#1a202c', colorB: '#2d3748', direction: 45 },  // Midnight Slate
  { colorA: '#553c9a', colorB: '#9f7aea', direction: 135 }, // Deep Purple
  { colorA: '#0f4c75', colorB: '#3282b8', direction: 90 },  // Deep Ocean
  { colorA: '#2d5016', colorB: '#68d391', direction: 180 }, // Forest to Mint
  { colorA: '#7c2d12', colorB: '#fed7aa', direction: 225 }, // Copper Sunset
  { colorA: '#4a1d96', colorB: '#a78bfa', direction: 270 }, // Cosmic Purple
  { colorA: '#1e3a8a', colorB: '#60a5fa', direction: 315 }, // Navy to Sky
  { colorA: '#166534', colorB: '#86efac', direction: 0 },   // Emerald Fade
  { colorA: '#991b1b', colorB: '#fca5a5', direction: 60 },  // Cherry Blossom
] 