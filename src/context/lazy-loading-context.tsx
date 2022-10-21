import React, {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
} from 'react'

export const LazyLoadingContext = createContext({
  lazyLoad: (ref: HTMLImageElement) => {},
})

export const LazyLoadingContextProvider = ({
  children,
}: PropsWithChildren<ReactElement>) => {
  const observer: MutableRefObject<IntersectionObserver | null> =
    useRef<IntersectionObserver>(null)

  useEffect(() => {
    if (!observer.current) {
      observer.current = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0) {
              const element = entry.target as HTMLImageElement
              if (
                'srcset' in element.dataset &&
                element.dataset.srcset !== undefined
              ) {
                element.srcset = element.dataset.srcset
              }

              if (
                'src' in element.dataset &&
                element.dataset.src !== undefined
              ) {
                element.src = element.dataset.src
              }
            }
          })
        },
        {
          rootMargin: '100% 0px',
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      )
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
        observer.current = null
      }
    }
  }, [])

  const waitForObserver: () => Promise<IntersectionObserver> =
    useCallback(async () => {
      if (observer.current) {
        return observer.current
      }

      return new Promise((resolve, reject) => {
        const rejectionTimer = setTimeout(() => {
          reject(new Error('Timeout waiting for observer'))
        }, 5000)

        const wait: () => NodeJS.Timeout | void = () => {
          if (observer.current) {
            clearTimeout(rejectionTimer)
            resolve(observer.current)
            return
          }

          return setTimeout(wait, 1000)
        }

        wait()
      })
    }, [])

  const lazyLoad = useCallback(async (ref: HTMLImageElement) => {
    if (ref) {
      const observer = await waitForObserver()
      observer.observe(ref)
      ref.addEventListener('load', () => {
        observer.unobserve(ref)
      })
    }
  }, [])

  return (
    <LazyLoadingContext.Provider value={{ lazyLoad }}>
      {children}
    </LazyLoadingContext.Provider>
  )
}

export default LazyLoadingContextProvider
