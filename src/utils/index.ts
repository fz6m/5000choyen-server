export const getPureBase64String = (dirtyText: string) => {
  return dirtyText.replace(/^data:image\/\w+;base64,/, '')
}
