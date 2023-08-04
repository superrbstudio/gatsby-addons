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
import useImageSources from '../hooks/use-image-sources'

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

    const { src, sources } = useImageSources(image)

    if (image === undefined) {
      return null
    }

    if (sources.length > 0) {
      const source = sources[0]

      return (
        <figure
          className={`image ${className}`}
          style={{ ...DEFAULT_STYLE, ...style }}
          ref={ref}
        >
          <img
            ref={imageRef}
            src={src}
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

    if (src) {
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
                  'data-src': src,
                }
              : {
                  src: src,
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
