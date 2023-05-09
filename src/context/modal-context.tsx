import useLockBodyScroll from '../hooks/use-lock-body-scroll'
import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
} from 'react'
import { useState } from 'reinspect'

export const ModalContext = createContext({
  openState: {} as OpenState,
  isOpen: (name: string) => false as boolean,
  openModal: (name: string) => {},
  closeModal: (name: string) => {},
})

interface OpenState {
  [key: string]: boolean
}

export const ModalContextProvider = ({
  children,
}: PropsWithChildren<ReactNode>) => {
  const [openState, setOpenState] = useState<OpenState>({}, 'Modal open state')

  const isOpen = (name: string) => {
    return openState[name] || false
  }

  const openModal = (name: string) => {
    setOpenState((state) => {
      const newState = { ...state }
      newState[name] = true

      return newState
    })
  }

  const closeModal = (name: string) => {
    setOpenState((state) => {
      const newState = { ...state }
      newState[name] = false

      return newState
    })
  }

  console.log(openState)

  return (
    <ModalContext.Provider value={{ openState, isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalContextProvider
