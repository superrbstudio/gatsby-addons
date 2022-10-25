import React, {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useLayoutEffect,
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

  const onIntersection = useCallback(entries => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0) {
        const element: HTMLImageElement = entry.target as HTMLImageElement
        if (
          'srcset' in element.dataset &&
          element.dataset.srcset !== undefined
        ) {
          element.srcset = element.dataset.srcset
        }

        if ('src' in element.dataset && element.dataset.src !== undefined) {
          element.src = element.dataset.src
        }
      }
    })
  }, [])

  const createObserver = useCallback(() => {
    if (!observer.current) {
      observer.current = new IntersectionObserver(onIntersection, {
        rootMargin: '100% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      })
    }

    return observer.current
  }, [])

  useLayoutEffect(() => {
    createObserver()

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
          reject(new Error('Timeout waiting for observer. Creating a new one.'))
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
      let observer: IntersectionObserver

      try {
        observer = await waitForObserver()
      } catch (error) {
        observer = createObserver()
      }

      observer.observe(ref)
      ref.addEventListener('load', () => {
        if ('src' in ref.dataset || 'srcset' in ref.dataset) {
          return
        }

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
