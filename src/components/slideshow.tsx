import React, {
  MutableRefObject,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { useSwipeable } from 'react-swipeable'

const SLIDE_TIME = 10000

interface Props {
  children: ReactNode[]
  autoPlay: boolean
  slideDuration: number
}

const Slideshow = ({
  children,
  autoPlay = false,
  slideDuration = SLIDE_TIME,
}: Props) => {
  const timer = useRef<NodeJS.Timeout>() as MutableRefObject<NodeJS.Timeout>
  const [current, setCurrent] = useState<number>(0)

  const previous = useCallback(() => {
    setCurrent(current => {
      let newCurrent = current - 1

      if (newCurrent < 0) {
        newCurrent = children.length - 1
      }

      return newCurrent
    })
  }, [setCurrent])

  const next = useCallback(() => {
    setCurrent(current => {
      let newCurrent = current + 1

      if (newCurrent >= children.length) {
        newCurrent = 0
      }

      return newCurrent
    })
  }, [setCurrent])

  const handlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: previous,
  })

  useLayoutEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current)
    }

    if (autoPlay === true) {
      timer.current = setTimeout(next, slideDuration)
    }

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [current])

  return (
    <section className="slideshow" {...handlers}>
      <ul className="slideshow__slides">
        {children.map((child, index) => (
          <li
            className="slideshow__slide"
            aria-selected={index === current}
            key={index}
          >
            {child}
          </li>
        ))}
      </ul>

      <nav className="slideshow__pagination">
        <ul className="slideshow__pagination-items">
          {children.map((_, index) => (
            <li className="slideshow__pagination-item" key={index}>
              <button
                className="slideshow__pagination-button"
                aria-selected={index === current}
                onClick={setCurrent.bind(null, index)}
              >
                <span className="slideshow__pagination-number">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}

export default Slideshow
