import { useCallback, useEffect, useState } from 'react'

const useIsMobile = (initial = true) => {
  const [isMobile, setIsMobile] = useState(initial)

  const setScreenSize = useCallback(() => {
    setIsMobile(!window.matchMedia('(min-width: 63.75em)').matches)
  }, [setIsMobile])

  useEffect(() => {
    setScreenSize()
    window.addEventListener('resize', setScreenSize)

    return () => {
      window.removeEventListener('resize', setScreenSize)
    }
  }, [setScreenSize])

  return isMobile
}

export default useIsMobile
