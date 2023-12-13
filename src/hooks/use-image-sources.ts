import { Image } from '../../types'
import { SourceProps } from "gatsby-plugin-image/dist/src/components/picture";

const useImageSources = (image: Image) => {
  // Alias images from files
  if (image?.file?.childImageSharp?.gatsbyImageData) {
    image.gatsbyImageData = image.file.childImageSharp.gatsbyImageData
  }

  if (image?.gatsbyImageData?.images?.fallback?.src && image?.gatsbyImageData?.images?.sources && process.env.GATSBY_IMAGE_URL_FIND && process.env.GATSBY_IMAGE_URL_REPLACE) {
    image.gatsbyImageData.images.fallback.src = image.gatsbyImageData.images.fallback.src.replace(process.env.GATSBY_IMAGE_URL_FIND, process.env.GATSBY_IMAGE_URL_REPLACE)
    let newSources: { sizes: string | undefined; srcSet: string | undefined; type: string | undefined }[] = []
    image.gatsbyImageData.images.sources.forEach(function (item: SourceProps) {
      newSources.push({
        sizes: item.sizes,
        srcSet: item.srcSet.replace(process.env.GATSBY_IMAGE_URL_FIND as string, process.env.GATSBY_IMAGE_URL_REPLACE as string),
        type: item.type,
      })
    })
    image.gatsbyImageData.images.sources = newSources
  }

  return {
    src: image?.gatsbyImageData?.images?.fallback?.src,
    sources: image?.gatsbyImageData?.images?.sources,
  }
}

export default useImageSources
