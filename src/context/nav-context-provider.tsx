import useLockBodyScroll from '../hooks/use-lock-body-scroll'
import React, {
  createContext,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useState,
} from 'react'

export const NavContext = createContext({
  navOpen: false,
  toggleNav: () => {},
  openNav: () => {},
  closeNav: () => {},
})

export const NavContextProvider = ({
  children,
}: PropsWithChildren<ReactElement>) => {
  const [navOpen, setNavOpen] = useState<boolean>(false)
  useLockBodyScroll(navOpen)

  const toggleNav = useCallback(() => {
    setNavOpen(navOpen => !navOpen)
  }, [setNavOpen])

  const openNav = useCallback(() => {
    setNavOpen(true)
  }, [setNavOpen])

  const closeNav = useCallback(() => {
    setNavOpen(false)
  }, [setNavOpen])

  return (
    <NavContext.Provider value={{ navOpen, toggleNav, openNav, closeNav }}>
      {children}
    </NavContext.Provider>
  )
}

export default NavContextProvider
