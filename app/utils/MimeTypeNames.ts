export const getExtentionByFileName = (fileName: string) => {
  return fileName?.substring(fileName.lastIndexOf('.') + 1) || ''
}

export const isImageFile = (mime: string) => {
  return [
    'image/png',
    'mage/svg+xml',
    'image/webp',
    'image/jpeg',
    'image/gif',
  ].includes(mime)
}
