export enum ImageLayout {
  none,
  cover,
  contain,
}

interface Image {
  alt: string
  fluid: {
    src: string
    base64?: string
    srcSet?: string
  }
}

export default Image
