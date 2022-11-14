import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useEventListener, useIsInViewport } from '../../hooks'
import { getYPos } from '../../utils'

const useParallax = (ref: MutableRefObject<HTMLElement>) => {
  if (!ref) {
    return 0
  }

  const yPos = useRef<number>(0) as MutableRefObject<number>
  const [pos, setPos] = useState<number>(0)
  const { isInViewport, setRef } = useIsInViewport(false)

  useEffect(() => {
    setRef(ref.current)
  }, [ref.current])

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      setPos(((window.scrollY - yPos.current) / window.innerHeight) * 100)
    })
  }, [setPos, ref.current])

  const handleResize = useCallback(() => {
    requestAnimationFrame(() => {
      yPos.current = getYPos(ref.current)
    })
  }, [])

  useEventListener(
    'scroll',
    handleScroll,
    { passive: true },
    typeof window !== 'undefined' ? window : null,
    isInViewport
  )
  useEventListener(
    'resize',
    handleResize,
    undefined,
    typeof window !== 'undefined' ? window : null,
    isInViewport
  )

  useEffect(() => {
    yPos.current = getYPos(ref.current)
  }, [ref.current])

  useEffect(() => {
    yPos.current = isInViewport ? getYPos(ref.current) : 0
  }, [isInViewport])

  useEffect(() => {
    handleScroll()
  }, [yPos.current])

  return pos
}

export default useParallax
