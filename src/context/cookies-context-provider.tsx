import React, { createContext, useCallback, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useLocation } from '@reach/router'
import { initializeAndTrack } from '@superrb/gatsby-plugin-gdpr-cookies'

export const CookiesContext = createContext({
  cookiesAccepted: false,
  setCookiesAccepted: (accepted: boolean) => {},
  trackingCookiesAccepted: false,
  setTrackingCookiesAccepted: (accepted: boolean) => {},
})

export const CookiesContextProvider = ({ children }) => {
  const [cookiesAccepted, setCookiesAcceptedStorage] = useState<boolean>(false)
  const [trackingCookiesAccepted, setTrackingCookiesAcceptedStorage] =
    useState<boolean>(false)

  const location = useLocation()

  useEffect(() => {
    const accepted = Cookies.get('gatsby-accepted-cookies') || false
    setCookiesAcceptedStorage(!!accepted)
  }, [setCookiesAcceptedStorage])

  useEffect(() => {
    const accepted = Cookies.get('gatsby-gdpr-tracking-cookies') || false
    setTrackingCookiesAcceptedStorage(!!accepted)
  }, [setTrackingCookiesAcceptedStorage])

  const setCookiesAccepted = useCallback(
    (accepted: boolean) => {
      Cookies.set('gatsby-gdpr-cookies', accepted.toString(), {
        expires: 30,
      })
      Cookies.set('gatsby-accepted-cookies', accepted.toString(), {
        expires: 30,
      })
      setCookiesAcceptedStorage(accepted)
    },
    [setCookiesAcceptedStorage]
  )

  const setTrackingCookiesAccepted = useCallback(
    (accepted: boolean) => {
      Cookies.set('gatsby-gdpr-tracking-cookies', accepted.toString(), {
        expires: 30,
      })
      setTrackingCookiesAcceptedStorage(accepted)

      if (accepted) {
        initializeAndTrack(location)
      }
    },
    [setTrackingCookiesAcceptedStorage]
  )

  return (
    <CookiesContext.Provider
      value={{
        cookiesAccepted,
        setCookiesAccepted,
        trackingCookiesAccepted,
        setTrackingCookiesAccepted,
      }}
    >
      {children}
    </CookiesContext.Provider>
  )
}

export default CookiesContextProvider
