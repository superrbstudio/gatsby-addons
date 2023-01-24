import { useEventListener } from '@superrb/gatsby-addons/hooks'
import { useCallback, useEffect, useState } from 'react'

const useHideOnScroll = (hiddenOnLoad: boolean = false): boolean => {
  const [hidden, setHidden] = useState<boolean>(hiddenOnLoad)

  const handleScroll = useCallback(() => {
    const previousY = window.scrollY

    setTimeout(() => {
      const y = window.scrollY

      if (y <= 50) {
        setHidden(false)
        return
      }

      if (y > previousY + 10) {
        setHidden(true)
      }

      if (y < previousY - 10) {
        setHidden(false)
      }
    }, 100)
  }, [setHidden])

  useEffect(() => {
    handleScroll()
  }, [])

  useEventListener(
    'scroll',
    handleScroll,
    { passive: true },
    typeof window !== 'undefined' ? window : undefined,
  )

  return hidden
}

export default useHideOnScroll
