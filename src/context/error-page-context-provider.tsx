import React, {
  Dispatch,
  SetStateAction,
  createContext,
  PropsWithChildren,
  ReactNode,
  useState,
} from 'react'

export const ErrorPageContext = createContext({
  isErrorPage: false,
  setIsErrorPage: ((isErrorPage: boolean) => {}) as Dispatch<
    SetStateAction<boolean>
  >,
})

export const ErrorPageContextProvider = ({
  children,
}: PropsWithChildren<ReactNode>) => {
  const [isErrorPage, setIsErrorPage] = useState<boolean>(false)

  return (
    <ErrorPageContext.Provider value={{ isErrorPage, setIsErrorPage }}>
      {children}
    </ErrorPageContext.Provider>
  )
}

export default ErrorPageContextProvider
