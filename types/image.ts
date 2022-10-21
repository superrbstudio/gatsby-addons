export enum ImageLayout {
  none,
  cover,
  contain,
}

interface Image {
  alt: string
  fluid?: {
    base64?: string
    src: string
    srcSet: string
  }
}

export default Image
