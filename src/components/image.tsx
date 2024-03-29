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
import { EmbeddedSVG } from '../../components'
import { Image as ImageType, ImageLayout } from '../../types'
import { LazyLoadingContext, PreloadContext } from '../../context'
import useImageSources from '../hooks/use-image-sources'
import extendClass from '../utils/extend-class'

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

    const { src, sources } = useImageSources(image)

    addPreloadItem(
      shouldPreload
        ? {
          url: src,
          imagesrcset: Array.isArray(sources)
            ? sources[0]?.srcSet
            : '',
          as: 'image',
        }
        : null
    )

    useEffect(() => {
      if (shouldLazyLoad && !shouldPreload) {
        lazyLoad(imageRef.current)
      }
    }, [
      src,
      sources,
    ])

    if (image === undefined) {
      return null
    }

    if ('url' in image && image.url?.includes('.svg')) {
      return (
        <EmbeddedSVG url={image.url} {...{ ref, className, style, ...props }} />
      )
    }

    if (sources && sources.length > 0) {
      const source = sources[0]

      return (
        <figure
          className={`image ${className}`}
          style={{ ...DEFAULT_STYLE, ...style }}
          ref={ref}
        >
          <img
            className={`${extendClass('image', 'image')} ${extendClass(
              className,
              'image'
            )}`}
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
            className={`${extendClass('image', 'image')} ${extendClass(
              className,
              'image'
            )}`}
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

export default Image
