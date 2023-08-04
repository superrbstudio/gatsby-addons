import { Image } from '../../types'

const useImageSources = (image: Image) => {
  // Alias images from files
  if (image?.file?.childImageSharp?.gatsbyImageData) {
    image.gatsbyImageData = image.file.childImageSharp.gatsbyImageData
  }

  return {
    src: image?.gatsbyImageData?.images?.fallback?.src,
    sources: image?.gatsbyImageData?.images?.sources,
  }
}

export default useImageSources
