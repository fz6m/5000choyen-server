import xss from 'xss'

export const ensureStringSafe = (text: string) => xss(text)
