import React, { CSSProperties, useContext } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import atob from 'atob'
import ImageType from '../../types/image'
import { LazyLoadingContext } from '../context/lazy-loading-context'

const DEFAULT_STYLE: CSSProperties = {
  display: 'block',
}

const DEFAULT_IMG_STYLE: CSSProperties = {
  display: 'block',
  width: '100%',
}

interface Props {
  image: ImageType
  className?: string
  style?: CSSProperties
  imgStyle?: CSSProperties
  [key: string]: any
}

const Image = ({
  image,
  className = '',
  style = {},
  imgStyle = {},
  ...props
}: Props) => {
  const { lazyLoad } = useContext(LazyLoadingContext)

  // Everything rendered after this point is a DOM element,
  // so remove any props which would be invalid in that context
  delete props.fadeIn

  if (image === undefined) {
    return null
  }

  if (image.fluid?.base64) {
    const stub = 'data:image/svg+xml;base64,'
    if (image.fluid.base64.includes(stub)) {
      return (
        <div
          className={`image ${className}`}
          dangerouslySetInnerHTML={{
            __html: atob(image.fluid.base64.replace(stub, '')),
          }}
          {...props}
        />
      )
    }
  }

  if (image.fluid?.srcSet) {
    const placeholder = image.fluid?.srcSet.split(',')[0]?.split(' ')[0]

    return (
      <figure
        className={`image ${className}`}
        style={{ ...DEFAULT_STYLE, ...style }}
      >
        <img
          ref={lazyLoad}
          src={placeholder}
          data-srcset={image?.fluid?.srcSet}
          alt={image.alt}
          style={{ ...DEFAULT_IMG_STYLE, ...imgStyle }}
          {...props}
        />
      </figure>
    )
    // return (
    //   <GatsbyImage
    //     className={`image ${className}`}
    //     image={image.gatsbyImageData}
    //     alt={image.alt}
    //     style={{ ...DEFAULT_STYLE, style }}
    //     imgStyle={{ ...DEFAULT_STYLE, imgStyle }}
    //     {...props}
    //   />
    // )
  }

  if (image.fluid) {
    return (
      <figure
        className={`image ${className}`}
        style={{ ...DEFAULT_STYLE, ...style }}
      >
        <img
          // ref={lazyLoad}
          src={image.fluid.src}
          alt={image.alt}
          style={{ ...DEFAULT_IMG_STYLE, ...imgStyle }}
          {...props}
        />
      </figure>
    )
  }

  return <div className="image-placeholder" {...props} />
}

export default Image
