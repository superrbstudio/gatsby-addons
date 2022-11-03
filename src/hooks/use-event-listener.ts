import { MutableRefObject, useEffect, useRef } from 'react'

type EventName = keyof GlobalEventHandlersEventMap

type EventListener<E extends EventName> = (
  event: GlobalEventHandlersEventMap[E]
) => void | boolean

type Target = Document | Window | Element | null

// Hook
const useEventListener = <E extends EventName>(
  eventName: E,
  handler: EventListener<E>,
  options: boolean | AddEventListenerOptions = {},
  element: Target,
  flag: boolean = true
) => {
  // Create a ref that stores handler
  const savedHandler = useRef() as MutableRefObject<EventListener<E>>

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener
      if (!isSupported) return

      // Create event listener that calls handler function stored in ref
      const eventListener = (event: GlobalEventHandlersEventMap[E]) =>
        savedHandler.current(event)

      if (flag) {
        // Add event listener
        element.addEventListener(
          eventName,
          eventListener as EventListenerOrEventListenerObject,
          options
        )
      } else {
        element.removeEventListener(
          eventName,
          eventListener as EventListenerOrEventListenerObject
        )
      }

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(
          eventName,
          eventListener as EventListenerOrEventListenerObject
        )
      }
    },
    [eventName, element, flag] // Re-run if eventName or element changes
  )
}

export default useEventListener
