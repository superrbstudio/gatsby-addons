import {
  MouseEventHandler,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useDraggable } from 'react-use-draggable-scroll'
import { useEventListener, useIsInViewport } from '@superrb/gatsby-addons/hooks'

interface Events {
  onMouseDown: MouseEventHandler<HTMLElement>
}

const useDraggableScroll = (ref, { className }) => {
  const { isInViewport, setRef } = useIsInViewport(false)
  const { events } = useDraggable(ref)
  const [modifiedEvents, setModifiedEvents] = useState<Events>(events)
  const timer = useRef<NodeJS.Timeout>() as MutableRefObject<NodeJS.Timeout>
  const [dragging, setDragging] = useState<boolean>(false)
  const [scrolling, setScrolling] = useState<boolean>(false)

  const [shouldScroll, setShouldScroll] = useState<boolean>(false)

  setRef(ref.current)

  useEffect(() => {
    const shouldScroll =
      ref.current?.scrollWidth > ref.current?.clientWidth ||
      ref.current?.scrollHeight > ref.current?.clientHeight
    setShouldScroll(shouldScroll)

    const fn = shouldScroll ? 'add' : 'remove'
    ref.current?.classList[fn](`${className}--draggable`)
  }, [ref.current])

  const onScrollStart = () => {
    setScrolling(true)
    ref.current?.classList.add(`${className}--scrolling`)
  }

  const onScrollEnd = () => {
    setScrolling(false)
    ref.current?.classList.remove(`${className}--scrolling`)
  }

  const onDragStart = () => {
    setDragging(true)
    ref.current?.classList.add(`${className}--dragging`)
  }

  const onDragMove = () => {
    if (timer.current && dragging) {
      clearTimeout(timer.current)
    }
  }

  const onDragEnd = () => {
    setDragging(false)
    timer.current = setTimeout(() => {
      ref.current?.classList.remove(`${className}--dragging`)
    }, 100)
  }

  const handleScroll = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current)
    }

    requestAnimationFrame(() => {
      if (!dragging) {
        onScrollStart()
      }

      timer.current = setTimeout(onScrollEnd, 1000)
    })
  }, [onScrollStart, onScrollEnd])

  useEventListener(
    'mousemove',
    onDragMove,
    null,
    typeof window !== 'undefined' ? window : null,
    isInViewport && shouldScroll,
  )
  useEventListener(
    'mouseup',
    onDragEnd,
    null,
    typeof window !== 'undefined' ? window : null,
    isInViewport && shouldScroll,
  )

  useEffect(() => {
    if (!shouldScroll) {
      setModifiedEvents({
        onMouseDown: (event: MouseEvent<HTMLElement, MouseEvent>) => {},
      })

      return
    }

    const originalOnMouseDown = events.onMouseDown

    setModifiedEvents({
      onMouseDown: (event) => {
        onDragStart()
        originalOnMouseDown(event)
      },
    } as Events)
  }, [ref, ref.current, setModifiedEvents, shouldScroll])

  return { events: modifiedEvents }
}

export default useDraggableScroll
