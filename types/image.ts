import { IGatsbyImageData } from 'gatsby-plugin-image'

interface Image {
  alt: string
  fluid: {
    base64: string
    src: string
  }
  gatsbyImageData: IGatsbyImageData
}

export default Image
