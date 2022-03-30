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
  }, [element])

  const waitForObserver: () => Promise<true | NodeJS.Timeout> =
    useCallback(async () => {
      if (!observer.current) {
        return setTimeout(waitForObserver, 50)
      }

      return true
    }, [])

  const setRef = useCallback(
    async ref => {
      element.current = ref
      if (ref) {
        await waitForObserver()

        if (observer.current) {
          observer.current.observe(ref)
        }
      }
    },
    [element]
  )

  return { isInViewport, setRef }
}

export default useIsInViewport
