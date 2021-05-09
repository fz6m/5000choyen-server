import { createCanvas, Canvas, CanvasRenderingContext2D } from 'canvas'

import {
  DEFAULT_BK_COLOR,
  DEFAULT_TOP_START_POS,
  DEFAULT_BOTTOM_START_POS,
  FONT_SIZE,
  DEFAULT_BOTTOM_TEXT_OFFSET,
  CANVAS_MAX_HEIGHT,
} from '../constants'
import { loadFonts, FONT_FAMILY } from '../load/font'
import { getPureBase64String } from '../utils'
import { getCanvasWidthByText } from '../utils/length'

export interface IDrawerConfig {
  top: string
  bottom?: string
  width?: number
  height?: number
  format?: EDrawerOutputFormat
  offset?: number
}

export interface IDrawerActualSize {
  top: number
  bottom: number
}

export enum EDrawerOutputFormat {
  png = 'image/png',
  jpg = 'image/jpeg',
}

export class Drawer {
  canvas: Canvas | null = null
  ctx: CanvasRenderingContext2D | null = null
  actualWidth: IDrawerActualSize = { top: 0, bottom: 0 }

  width: number = 0
  height: number = 0
  offset: number = 0

  top: string
  bottom?: string

  format?: EDrawerOutputFormat

  constructor(config: IDrawerConfig) {
    // initial canvas size
    const { width, height } = config
    if (width && height) {
      this.width = width
      this.height = height
    } else {
      // if not width or height, calc enough canvas area
      this.calcInitialCanvasSizeByText(config.top, config.bottom)
    }

    // set text
    this.top = config.top
    this.bottom = config.bottom

    // set offset
    this.offset = config.offset || 0

    // set fomat
    this.setFormat(config.format)

    // initial font
    this.initialFonts()
    // initial canvas
    this.initialCanvas()
    // initial canvas bk
    this.initialCanvasBackground()
  }

  private setFormat(format?: EDrawerOutputFormat) {
    if (!format || !Object.values(EDrawerOutputFormat).includes(format)) {
      this.format = EDrawerOutputFormat.jpg
      return
    }
    this.format = format
  }

  private calcInitialCanvasSizeByText(top: string, bottom?: string) {
    const topTextWidth = getCanvasWidthByText(top) + 2 * DEFAULT_TOP_START_POS.x
    const bottomTextWidth = bottom
      ? getCanvasWidthByText(bottom) +
        DEFAULT_BOTTOM_TEXT_OFFSET +
        this.offset +
        DEFAULT_TOP_START_POS.x
      : 0

    const canvasWidth = Math.max(topTextWidth, bottomTextWidth)

    this.width = canvasWidth
    this.height = bottom ? CANVAS_MAX_HEIGHT : CANVAS_MAX_HEIGHT / 2
  }

  private initialFonts() {
    loadFonts()
  }

  private initialCanvas() {
    const canvas = createCanvas(this.width, this.height)
    const ctx = canvas.getContext('2d')

    // set line style
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    this.canvas = canvas
    this.ctx = ctx
  }

  private initialCanvasBackground(color = DEFAULT_BK_COLOR) {
    if (!this.ctx) {
      return
    }
    this.ctx.fillStyle = color
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  drawTopText(
    text: string,
    x = DEFAULT_TOP_START_POS.x,
    y = DEFAULT_TOP_START_POS.y
  ) {
    if (!this.ctx) {
      return
    }

    this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    this.ctx.font = `${FONT_SIZE}px ${FONT_FAMILY.notobk}`

    this.ctx.setTransform(1, 0, -0.45, 1, 0, 0)

    // 黒色
    {
      this.ctx.strokeStyle = '#000'
      this.ctx.lineWidth = 22
      this.ctx.strokeText(text, x + 4, y + 4)
    }

    // 銀色
    {
      const grad = this.ctx.createLinearGradient(0, 24, 0, 122)
      grad.addColorStop(0.0, 'rgb(0,15,36)')
      grad.addColorStop(0.1, 'rgb(255,255,255)')
      grad.addColorStop(0.18, 'rgb(55,58,59)')
      grad.addColorStop(0.25, 'rgb(55,58,59)')
      grad.addColorStop(0.5, 'rgb(200,200,200)')
      grad.addColorStop(0.75, 'rgb(55,58,59)')
      grad.addColorStop(0.85, 'rgb(25,20,31)')
      grad.addColorStop(0.91, 'rgb(240,240,240)')
      grad.addColorStop(0.95, 'rgb(166,175,194)')
      grad.addColorStop(1, 'rgb(50,50,50)')
      this.ctx.strokeStyle = grad
      this.ctx.lineWidth = 20
      this.ctx.strokeText(text, x + 4, y + 4)
    }

    // 黒色
    {
      this.ctx.strokeStyle = '#000000'
      this.ctx.lineWidth = 16
      this.ctx.strokeText(text, x, y)
    }

    // 金色
    {
      const grad = this.ctx.createLinearGradient(0, 20, 0, 100)
      grad.addColorStop(0, 'rgb(253,241,0)')
      grad.addColorStop(0.25, 'rgb(245,253,187)')
      grad.addColorStop(0.4, 'rgb(255,255,255)')
      grad.addColorStop(0.75, 'rgb(253,219,9)')
      grad.addColorStop(0.9, 'rgb(127,53,0)')
      grad.addColorStop(1, 'rgb(243,196,11)')
      this.ctx.strokeStyle = grad
      this.ctx.lineWidth = 10
      this.ctx.strokeText(text, x, y)
    }

    // 黒
    this.ctx.lineWidth = 6
    this.ctx.strokeStyle = '#000'
    this.ctx.strokeText(text, x + 2, y - 3)

    // 白
    this.ctx.lineWidth = 6
    this.ctx.strokeStyle = '#FFFFFF'
    this.ctx.strokeText(text, x, y - 3)

    // 赤
    {
      const grad = this.ctx.createLinearGradient(0, 20, 0, 100)
      grad.addColorStop(0, 'rgb(255, 100, 0)')
      grad.addColorStop(0.5, 'rgb(123, 0, 0)')
      grad.addColorStop(0.51, 'rgb(240, 0, 0)')
      grad.addColorStop(1, 'rgb(5, 0, 0)')
      this.ctx.lineWidth = 4
      this.ctx.strokeStyle = grad
      this.ctx.strokeText(text, x, y - 3)
    }

    // 赤
    {
      const grad = this.ctx.createLinearGradient(0, 20, 0, 100)
      grad.addColorStop(0, 'rgb(230, 0, 0)')
      grad.addColorStop(0.5, 'rgb(123, 0, 0)')
      grad.addColorStop(0.51, 'rgb(240, 0, 0)')
      grad.addColorStop(1, 'rgb(5, 0, 0)')
      this.ctx.fillStyle = grad
      this.ctx.fillText(text, x, y - 3)
    }

    this.actualWidth.top = this.ctx.measureText(text).width + x
  }

  drawBottomText(
    text: string,
    x = DEFAULT_BOTTOM_START_POS.x + this.offset,
    y = DEFAULT_BOTTOM_START_POS.y
  ) {
    if (!this.ctx) {
      return
    }

    this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    this.ctx.font = `${FONT_SIZE}px ${FONT_FAMILY.notoserifbk}`

    this.ctx.setTransform(1, 0, -0.45, 1, 0, 0)

    // 黒色
    {
      this.ctx.strokeStyle = '#000'
      this.ctx.lineWidth = 22
      this.ctx.strokeText(text, x + 5, y + 2)
    }

    // 銀
    {
      const grad = this.ctx.createLinearGradient(0, y - 80, 0, y + 18)
      grad.addColorStop(0, 'rgb(0,15,36)')
      grad.addColorStop(0.25, 'rgb(250,250,250)')
      grad.addColorStop(0.5, 'rgb(150,150,150)')
      grad.addColorStop(0.75, 'rgb(55,58,59)')
      grad.addColorStop(0.85, 'rgb(25,20,31)')
      grad.addColorStop(0.91, 'rgb(240,240,240)')
      grad.addColorStop(0.95, 'rgb(166,175,194)')
      grad.addColorStop(1, 'rgb(50,50,50)')
      this.ctx.strokeStyle = grad
      this.ctx.lineWidth = 19
      this.ctx.strokeText(text, x + 5, y + 2)
    }

    // 黒色
    {
      this.ctx.strokeStyle = '#10193A'
      this.ctx.lineWidth = 17
      this.ctx.strokeText(text, x, y)
    }

    // 白
    {
      this.ctx.strokeStyle = '#DDD'
      this.ctx.lineWidth = 8
      this.ctx.strokeText(text, x, y)
    }

    // 紺
    {
      const grad = this.ctx.createLinearGradient(0, y - 80, 0, y)
      grad.addColorStop(0, 'rgb(16,25,58)')
      grad.addColorStop(0.03, 'rgb(255,255,255)')
      grad.addColorStop(0.08, 'rgb(16,25,58)')
      grad.addColorStop(0.2, 'rgb(16,25,58)')
      grad.addColorStop(1, 'rgb(16,25,58)')
      this.ctx.strokeStyle = grad
      this.ctx.lineWidth = 7
      this.ctx.strokeText(text, x, y)
    }

    // 銀
    {
      const grad = this.ctx.createLinearGradient(0, y - 80, 0, y)
      grad.addColorStop(0, 'rgb(245,246,248)')
      grad.addColorStop(0.15, 'rgb(255,255,255)')
      grad.addColorStop(0.35, 'rgb(195,213,220)')
      grad.addColorStop(0.5, 'rgb(160,190,201)')
      grad.addColorStop(0.51, 'rgb(160,190,201)')
      grad.addColorStop(0.52, 'rgb(196,215,222)')
      grad.addColorStop(1.0, 'rgb(255,255,255)')
      this.ctx.fillStyle = grad
      this.ctx.fillText(text, x, y - 3)
    }

    this.actualWidth.bottom = this.ctx.measureText(text).width + x
  }

  drawAllText() {
    this.top && this.drawTopText(this.top)
    this.bottom && this.drawBottomText(this.bottom)
  }

  save() {
    if (!this.ctx) {
      return
    }
    // font raw size
    const width = Math.max(
      this.actualWidth.top + 10,
      this.actualWidth.bottom - 20
    )
    const height = this.height
    const data = this.ctx.getImageData(0, 0, width, height)
    // create save canvas
    const saveCanvas = createCanvas(width, height)
    const saveCtx = saveCanvas.getContext('2d')
    // add white background
    saveCtx.fillStyle = DEFAULT_BK_COLOR
    saveCtx.fillRect(0, 0, width, height)
    // put image
    saveCtx.putImageData(data, 0, 0)
    // image base64 to binary
    const base64 = saveCanvas.toDataURL(this.format as any)
    const pureBase64 = getPureBase64String(base64)
    return Buffer.from(pureBase64, 'base64')
    // fs.writeFileSync(path, pureBase64, 'base64')
  }
}
