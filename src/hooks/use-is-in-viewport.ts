import {
  useCallback,
  useEffect,
  useRef,
  useState,
  MutableRefObject,
} from 'react'

const useIsInViewport = (initial = false, rootMargin = '0px 0px') => {
  const [isInViewport, setIsInViewport] = useState(initial)
  const element: MutableRefObject<Element | null> = useRef<Element>(null)
  const observer: MutableRefObject<IntersectionObserver | null> =
    useRef<IntersectionObserver>(null)

  useEffect(() => {
    observer.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setIsInViewport(entry.isIntersecting && entry.intersectionRatio > 0)
        })
      },
      {
        rootMargin,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    return () => {
      if (observer.current) {
        observer.current.disconnect()
        observer.current = null
      }
    }
  }, [])

  const waitForObserver: () => Promise<IntersectionObserver> =
    useCallback(async () => {
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

  const setRef = useCallback(
    async ref => {
      element.current = ref
      if (ref) {
        const observer = await waitForObserver()
        observer.observe(ref)
      }
    },
    [element]
  )

  return { isInViewport, setRef }
}

export default useIsInViewport
