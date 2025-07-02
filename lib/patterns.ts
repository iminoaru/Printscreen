export type PatternType =
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

function createDotPattern(
  scale: number,
  spacing: number,
  color: string
): HTMLCanvasElement {
  const patternCanvas = document.createElement('canvas')
  const patternContext = patternCanvas.getContext('2d')!

  const size = 20 * spacing
  patternCanvas.width = size
  patternCanvas.height = size

  patternContext.fillStyle = color
  patternContext.beginPath()
  patternContext.arc(size / 2, size / 2, 1.5 * scale, 0, 2 * Math.PI)
  patternContext.fill()

  return patternCanvas
}

function createGridPattern(
  scale: number,
  spacing: number,
  color: string
): HTMLCanvasElement {
  const patternCanvas = document.createElement('canvas')
  const patternContext = patternCanvas.getContext('2d')!

  const size = 20 * spacing
  patternCanvas.width = size
  patternCanvas.height = size

  patternContext.strokeStyle = color
  patternContext.lineWidth = 1 * scale

  patternContext.beginPath()
  patternContext.moveTo(0, size / 2)
  patternContext.lineTo(size, size / 2)
  patternContext.moveTo(size / 2, 0)
  patternContext.lineTo(size / 2, size)
  patternContext.stroke()

  return patternCanvas
}

function createLinePattern(
  scale: number,
  spacing: number,
  color: string
): HTMLCanvasElement {
  const patternCanvas = document.createElement('canvas')
  const patternContext = patternCanvas.getContext('2d')!

  const size = 20 * spacing
  patternCanvas.width = size
  patternCanvas.height = size

  patternContext.strokeStyle = color
  patternContext.lineWidth = 1 * scale
  patternContext.beginPath()
  patternContext.moveTo(0, size / 2)
  patternContext.lineTo(size, size / 2)
  patternContext.stroke()

  return patternCanvas
}

function createZigzagPattern(
  scale: number,
  spacing: number,
  color: string
): HTMLCanvasElement {
  const patternCanvas = document.createElement('canvas')
  const patternContext = patternCanvas.getContext('2d')!

  const size = 20 * spacing
  patternCanvas.width = size
  patternCanvas.height = size

  patternContext.strokeStyle = color
  patternContext.lineWidth = 1 * scale
  patternContext.beginPath()
  patternContext.moveTo(-patternContext.lineWidth, size * 0.75)
  patternContext.lineTo(size * 0.5, size * 0.25)
  patternContext.lineTo(size + patternContext.lineWidth, size * 0.75)
  patternContext.stroke()

  return patternCanvas
}

function createDiagonalPattern(
  scale: number,
  spacing: number,
  color: string
): HTMLCanvasElement {
  const patternCanvas = document.createElement('canvas')
  const patternContext = patternCanvas.getContext('2d')!

  const size = 20 * spacing
  patternCanvas.width = size
  patternCanvas.height = size

  patternContext.strokeStyle = color
  patternContext.lineWidth = 1 * scale
  patternContext.beginPath()
  patternContext.moveTo(0, size)
  patternContext.lineTo(size, 0)
  patternContext.stroke()

  patternContext.beginPath()
  patternContext.moveTo(0, 0)
  patternContext.lineTo(size, size)
  patternContext.stroke()

  return patternCanvas
}

function createSwigglePattern(
  scale: number,
  spacing: number,
  color: string
): HTMLCanvasElement {
  const patternCanvas = document.createElement('canvas')
  const ctx = patternCanvas.getContext('2d')!
  const size = 20 * spacing
  patternCanvas.width = size
  patternCanvas.height = size

  ctx.strokeStyle = color
  ctx.lineWidth = 1 * scale
  ctx.lineCap = 'square'
  ctx.lineJoin = 'miter'

  const amplitude = size / 4
  ctx.beginPath()
  for (let x = 0; x <= size; x += 1) {
    const y = size / 2 + amplitude * Math.sin((2 * Math.PI * x) / size)
    if (x === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()
  return patternCanvas
}

function createCrossPattern(
  scale: number,
  spacing: number,
  color: string
): HTMLCanvasElement {
  const patternCanvas = document.createElement('canvas')
  const patternContext = patternCanvas.getContext('2d')!
  const size = 15 * spacing
  const shapeSize = 4 * scale
  patternCanvas.width = size
  patternCanvas.height = size
  patternContext.strokeStyle = color
  patternContext.lineWidth = 1 * scale
  patternContext.beginPath()
  patternContext.moveTo(size / 2 - shapeSize, size / 2)
  patternContext.lineTo(size / 2 + shapeSize, size / 2)
  patternContext.moveTo(size / 2, size / 2 - shapeSize)
  patternContext.lineTo(size / 2, size / 2 + shapeSize)
  patternContext.stroke()
  return patternCanvas
}

function createWavePattern(
  scale: number,
  spacing: number,
  color: string
): HTMLCanvasElement {
  const patternCanvas = document.createElement('canvas')
  const ctx = patternCanvas.getContext('2d')!
  const size = 30 * spacing
  patternCanvas.width = size
  patternCanvas.height = size

  ctx.strokeStyle = color
  ctx.lineWidth = 1.5 * scale
  ctx.lineCap = 'square'
  ctx.lineJoin = 'miter'

  const amplitude = size / 3
  ctx.beginPath()
  for (let x = 0; x <= size; x += 1) {
    const y = size / 2 + amplitude * Math.sin((2 * Math.PI * x) / size)
    if (x === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()
  return patternCanvas
}

function createCheckerboardPattern(
  scale: number,
  spacing: number,
  color: string
): HTMLCanvasElement {
  const patternCanvas = document.createElement('canvas')
  const patternContext = patternCanvas.getContext('2d')!
  const size = 20 * spacing
  const squareSize = 10 * scale
  patternCanvas.width = size
  patternCanvas.height = size
  patternContext.fillStyle = color
  patternContext.fillRect(0, 0, squareSize, squareSize)
  patternContext.fillRect(squareSize, squareSize, squareSize, squareSize)
  return patternCanvas
}

function createRingsPattern(
  scale: number,
  spacing: number,
  color: string
): HTMLCanvasElement {
  const patternCanvas = document.createElement('canvas')
  const patternContext = patternCanvas.getContext('2d')!
  const s = 25 * spacing // distance between ring centers
  const radius = 8 * scale

  patternCanvas.width = s
  patternCanvas.height = s * Math.sqrt(3)

  patternContext.strokeStyle = color
  patternContext.lineWidth = 1.5 * scale

  const drawRingArc = (x: number, y: number, start: number, end: number) => {
    patternContext.beginPath()
    patternContext.arc(x, y, radius, start * Math.PI, end * Math.PI)
    patternContext.stroke()
  }

  // center circle
  drawRingArc(s / 2, (s * Math.sqrt(3)) / 2, 0, 2)

  // corner circles for tiling
  drawRingArc(0, 0, 0, 0.5)
  drawRingArc(s, 0, 0.5, 1)
  drawRingArc(0, s * Math.sqrt(3), 1.5, 2)
  drawRingArc(s, s * Math.sqrt(3), 1, 1.5)

  return patternCanvas
}

export function generatePattern(
  type: PatternType,
  scale: number = 1,
  spacing: number = 1,
  color: string = '#ffffff',
  rotation: number = 0,
  blur: number = 0
): HTMLCanvasElement {
  let patternCanvas: HTMLCanvasElement

  if (type === 'dots') {
    patternCanvas = createDotPattern(scale, spacing, color)
  } else if (type === 'grid') {
    patternCanvas = createGridPattern(scale, spacing, color)
  } else if (type === 'diagonal') {
    patternCanvas = createDiagonalPattern(scale, spacing, color)
  } else if (type === 'lines') {
    patternCanvas = createLinePattern(scale, spacing, color)
  } else if (type === 'zigzag') {
    patternCanvas = createZigzagPattern(scale, spacing, color)
  } else if (type === 'swiggle') {
    patternCanvas = createSwigglePattern(scale, spacing, color)
  } else if (type === 'cross') {
    patternCanvas = createCrossPattern(scale, spacing, color)
  } else if (type === 'wave') {
    patternCanvas = createWavePattern(scale, spacing, color)
  } else if (type === 'checkerboard') {
    patternCanvas = createCheckerboardPattern(scale, spacing, color)
  } else if (type === 'rings') {
    patternCanvas = createRingsPattern(scale, spacing, color)
  } else {
    // fallback
    patternCanvas = createDotPattern(scale, spacing, color)
  }

  if (rotation > 0 && rotation < 360) {
    const rotatedCanvas = document.createElement('canvas')
    const rotatedContext = rotatedCanvas.getContext('2d')!
    const size = patternCanvas.width
    rotatedCanvas.width = size
    rotatedCanvas.height = size
    rotatedContext.translate(size / 2, size / 2)
    rotatedContext.rotate((rotation * Math.PI) / 180)
    rotatedContext.drawImage(patternCanvas, -size / 2, -size / 2)
    patternCanvas = rotatedCanvas
  }

  if (blur > 0) {
    const size = patternCanvas.width
    const radius = Math.ceil(blur)
    const extended = size + radius * 2

    // 1. Tile the original pattern in a 3×3 grid on a larger canvas
    const tiled = document.createElement('canvas')
    tiled.width = extended
    tiled.height = extended
    const tCtx = tiled.getContext('2d')!
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        tCtx.drawImage(patternCanvas, (dx + 1) * size, (dy + 1) * size)
      }
    }

    // 2. Blur the tiled canvas
    const blurred = document.createElement('canvas')
    blurred.width = extended
    blurred.height = extended
    const bCtx = blurred.getContext('2d')!
    bCtx.filter = `blur(${blur}px)`
    bCtx.drawImage(tiled, 0, 0)

    // 3. Crop the center so edges wrap seamlessly
    const finalCanvas = document.createElement('canvas')
    finalCanvas.width = size
    finalCanvas.height = size
    finalCanvas
      .getContext('2d')!
      .drawImage(blurred, radius, radius, size, size, 0, 0, size, size)

    patternCanvas = finalCanvas
  }

  return patternCanvas
}

export const patternTypes = [
  { value: 'dots', label: 'Dots' },
  { value: 'grid', label: 'Grid' },
  { value: 'diagonal', label: 'Diagonal' },
  { value: 'lines', label: 'Lines' },
  { value: 'zigzag', label: 'Zigzag' },
  { value: 'swiggle', label: 'Swiggle' },
  { value: 'cross', label: 'Cross' },
  { value: 'wave', label: 'Wave' },
  { value: 'checkerboard', label: 'Checkerboard' },
  { value: 'rings', label: 'Rings' },
] as const 