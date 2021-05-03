import { Drawer, IDrawerConfig } from '../drawer'

export const genImage = (config: IDrawerConfig) => {
  const drawer = new Drawer(config)
  drawer.drawAllText()
  const binary = drawer.save()
  return binary
}
