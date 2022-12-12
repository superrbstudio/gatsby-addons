import React, {
  CSSProperties,
  useContext,
  memo,
  MutableRefObject,
  useRef,
  useEffect,
} from 'react'
import atob from 'atob'
import { Image as ImageType, ImageLayout } from '../../types'
import { LazyLoadingContext } from '../context/lazy-loading-context'

const DEFAULT_STYLE: CSSProperties = {
  display: 'block',
}

const DEFAULT_IMG_STYLE: CSSProperties = {
  display: 'block',
  width: '100%',
}

const COVER_STYLES: CSSProperties = {
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  width: '100%',
}

const CONTAIN_STYLES: CSSProperties = {
  ...COVER_STYLES,
  objectFit: 'contain',
}

interface Props {
  image: ImageType
  className?: string
  style?: CSSProperties
  imgStyle?: CSSProperties
  layout?: ImageLayout
  lazyLoad?: boolean
  [key: string]: any
}

const Image = ({
  image,
  className = '',
  style = {},
  imgStyle = {},
  layout = ImageLayout.none,
  lazyLoad: shouldLazyLoad = true,
  ...props
}: Props) => {
  const imageRef =
    useRef<HTMLImageElement>() as MutableRefObject<HTMLImageElement>
  const { lazyLoad } = useContext(LazyLoadingContext)

  useEffect(() => {
    if (shouldLazyLoad) {
      lazyLoad(imageRef.current)
    }
  }, [image?.fluid?.src, image?.fluid?.srcSet])

  if (image === undefined) {
    return null
  }

  if (image.fluid?.base64) {
    const stub = 'data:image/svg+xml;base64,'
    if (image.fluid.base64.includes(stub)) {
      return (
        <figure
          className={`image ${className}`}
          dangerouslySetInnerHTML={{
            __html: atob(image.fluid.base64.replace(stub, '')),
          }}
          style={{ ...DEFAULT_STYLE, ...style }}
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
          ref={imageRef}
          src={placeholder}
          {...(shouldLazyLoad
            ? {
                'data-srcset': image?.fluid?.srcSet,
              }
            : {
                srcset: image?.fluid?.srcSet,
              })}
          alt={image.alt}
          style={{
            ...DEFAULT_IMG_STYLE,
            ...(layout === ImageLayout.cover
              ? COVER_STYLES
              : layout === ImageLayout.contain
              ? CONTAIN_STYLES
              : {}),
            ...imgStyle,
          }}
          {...props}
        />
      </figure>
    )
  }

  if (image.fluid?.src) {
    return (
      <figure
        className={`image ${className}`}
        style={{ ...DEFAULT_STYLE, ...style }}
      >
        <img
          ref={imageRef}
          {...(shouldLazyLoad
            ? {
                'data-src': image?.fluid?.src,
              }
            : {
                src: image?.fluid?.src,
              })}
          alt={image.alt}
          style={{
            ...DEFAULT_IMG_STYLE,
            ...(layout === ImageLayout.cover
              ? COVER_STYLES
              : layout === ImageLayout.contain
              ? CONTAIN_STYLES
              : {}),
            ...imgStyle,
          }}
          {...props}
        />
      </figure>
    )
  }

  return <div className="image-placeholder" {...props} />
}

export default memo(Image)
