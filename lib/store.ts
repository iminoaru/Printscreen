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
  type: 'none' | 'solid' | 'window' | 'glassy' | 'infinite-mirror' | 'ruler' | 'eclipse' | 'stack' | 'dotted' | 'focus'
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
  
  // Actions
  setScreenshot: (screenshot: Partial<ScreenshotStyle>) => void
  setShadow: (shadow: Partial<ShadowStyle>) => void
  setBackground: (background: Partial<BackgroundStyle>) => void
  setPattern: (pattern: Partial<PatternStyle>) => void
  setFrame: (frame: Partial<FrameStyle>) => void
  setCanvas: (canvas: Partial<CanvasSettings>) => void
  setNoise: (noise: Partial<NoiseStyle>) => void
  set: (fn: (state: EditorState) => EditorState) => void
}

export const useEditorStore = create<EditorState>((set) => ({
  screenshot: {
    src: null,
    scale: 0.8,
    rotation: 0,
    radius: 16,
    offsetX: 0,
    offsetY: 0,
  },
  shadow: {
    enabled: true,
    elevation: 30,
    side: 'bottom',
    softness: 30,
    color: '#000000',
    intensity: 0.5,
  },
  background: {
    mode: 'solid',
    colorA: '#c7d2fe',
    colorB: '#f0f0f0',
    gradientDirection: 0,
  },
  pattern: {
    enabled: true,
    type: 'swiggle',
    opacity: 0.5,
    scale: 5,
    spacing: 5,
    rotation: 0,
    color: '#ffffff',
    blur: 5,
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
  set: (fn) => set(fn),
}))

export const SOLID_PRESETS = [
  '#f3e8ff', // Soft Lavender
  '#bfdbfe', // Light Blue
  '#fed7aa', // Peach Orange
  '#fef3c7', // Soft Yellow
  '#a7f3d0', // Emerald Green
  '#fbbf24', // Bright Yellow
  '#c7d2fe', // Periwinkle Blue
  '#fb7185', // Coral Pink
]

export const GRADIENT_PRESETS = [
  { colorA: '#1a202c', colorB: '#2d3748', direction: 45 },  // Midnight Slate
  { colorA: '#2c2a4a', colorB: '#4f4c7a', direction: 240 }, // Velvet Night
  { colorA: '#d1fae5', colorB: '#bfdbfe', direction: 120 }, // Minty Sky
  { colorA: '#fed7aa', colorB: '#fce7f3', direction: 200 }, // Peach Petal
  { colorA: '#fef9c3', colorB: '#fde68a', direction: 330 }, // Morning Haze
  { colorA: '#c7d2fe', colorB: '#ddd6fe', direction: 45 },  // Periwinkle Dream
  { colorA: '#a7f3d0', colorB: '#bae6fd', direction: 135 }, // Ocean Mist
  { colorA: '#fecdd3', colorB: '#fbcfe8', direction: 270 }, // Rosewater
] 