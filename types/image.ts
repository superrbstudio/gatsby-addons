import { IGatsbyImageData } from 'gatsby-plugin-image'

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
  gatsbyImageData?: IGatsbyImageData
}

export default Image
