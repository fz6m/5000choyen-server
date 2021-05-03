import { Context } from 'koa'
import { genImage } from '../services'
import { IDrawerConfig, EDrawerOutputFormat } from '../drawer'
import { isNil, isString, toNumber } from 'lodash'
import { ensureStringSafe } from '../utils/xss'

export const GenImage = (ctx: Context) => {
  const { top, bottom, width, height, format, offset } = ctx.query

  const config: Record<string, any> = {
    width: width ? toNumber(width) : width,
    height: height ? toNumber(height) : height,
    offset: offset ? toNumber(offset) : offset,
  }

  // 1. top validator
  const topValid = isString(top) && !isNil(top)
  if (!topValid) {
    ctx.response.status = 400
    ctx.response.body = '[Bad Request]: top must be string and not empty'
    return
  }

  // 2. xss filter
  const isOpenXssFilter = process.env.OPEN_XSS_FILTER === 'true'
  config.top = isOpenXssFilter ? ensureStringSafe(top as string) : top
  if (bottom && isString(bottom)) {
    config.bottom = isOpenXssFilter ? ensureStringSafe(bottom) : bottom
  }

  // 3. length limit
  const limitLength = toNumber(process.env.TEXT_MAX_LENGTH)
  config.top = config.top.slice(0, limitLength)
  if (bottom) {
    config.bottom = config.bottom?.slice(0, limitLength)
  }

  // 4. format validator, if not png/jpg, default set jpg format
  if (format?.length && format?.includes('jpg')) {
    config.format = EDrawerOutputFormat.jpg
  }
  if (format?.length && format?.includes('png')) {
    config.format = EDrawerOutputFormat.png
  }

  // image process
  const binary = genImage(config as IDrawerConfig)
  ctx.response.set('Content-Type', config.format || EDrawerOutputFormat.jpg)
  ctx.body = binary
}
