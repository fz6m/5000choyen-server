import { registerFont } from 'canvas'
const path = require('path')

export const FONT_FAMILY = {
  notobk: 'notobk',
  notoserifbk: 'notoserifbk',
}

export const loadFonts = () => {
  registerFont(path.join(__dirname, '../../assets/fonts/notobk-subset.otf'), {
    family: FONT_FAMILY.notobk,
  })

  registerFont(
    path.join(__dirname, '../../assets/fonts/notoserifbk-subset.otf'),
    {
      family: FONT_FAMILY.notoserifbk,
    }
  )
}
