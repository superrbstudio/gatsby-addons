import React, {
  CSSProperties,
  useContext,
  memo,
  MutableRefObject,
  useRef,
  useEffect,
  forwardRef,
  ForwardedRef,
} from 'react'
import atob from 'atob'
import { Image as ImageType, ImageLayout } from '../../types'
import { LazyLoadingContext, PreloadContext } from '../../context'

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
  preload?: boolean
  [key: string]: any
}

const Image = forwardRef(
  (
    {
      image,
      className = '',
      style = {},
      imgStyle = {},
      layout = ImageLayout.none,
      lazyLoad: shouldLazyLoad = true,
      preload: shouldPreload = false,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLElement>
  ) => {
    const imageRef =
      useRef<HTMLImageElement>() as MutableRefObject<HTMLImageElement>
    const { lazyLoad } = useContext(LazyLoadingContext)
    const { addPreloadItem } = useContext(PreloadContext)

    addPreloadItem(
      shouldPreload
        ? {
            url: image?.gatsbyImageData?.fallback?.src,
            imagesrcset: image?.gatsbyImageData?.sources[0]?.srcSet,
            as: 'image',
          }
        : null
    )

    useEffect(() => {
      if (shouldLazyLoad && !shouldPreload) {
        lazyLoad(imageRef.current)
      }
    }, [
      image?.gatsbyImageData?.images?.fallback?.src,
      image?.gatsbyImageData?.images?.sources[0]?.srcSet,
    ])

    if (image === undefined) {
      return null
    }

    // Alias images from files
    if (image?.file?.childImageSharp?.gatsbyImageData) {
      image.gatsbyImageData = image.file.childImageSharp.gatsbyImageData
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
            ref={ref}
            {...props}
          />
        )
      }
    }

    if (image.gatsbyImageData?.images?.sources) {
      const source = image.gatsbyImageData?.images?.sources[0]
      const placeholder = image.gatsbyImageData?.images?.fallback

      return (
        <figure
          className={`image ${className}`}
          style={{ ...DEFAULT_STYLE, ...style }}
          ref={ref}
        >
          <img
            ref={imageRef}
            src={placeholder.src}
            {...(shouldLazyLoad && !shouldPreload
              ? {
                  'data-srcset': source?.srcSet,
                }
              : {
                  srcSet: source?.srcSet,
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

    if (image.gatsbyImageData?.images?.fallback?.src) {
      const source = image.gatsbyImageData?.images?.fallback

      return (
        <figure
          className={`image ${className}`}
          style={{ ...DEFAULT_STYLE, ...style }}
          ref={ref}
        >
          <img
            ref={imageRef}
            {...(shouldLazyLoad && !shouldPreload
              ? {
                  'data-src': source.src,
                }
              : {
                  src: source.src,
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
)

export default memo(Image)
