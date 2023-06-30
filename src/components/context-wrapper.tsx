import React, { PropsWithChildren } from 'react'
import { LocationProvider } from '@reach/router'
import {
  NavContextProvider,
  LazyLoadingContextProvider,
  PreloadContextProvider,
  TranslationContextProvider,
  ModalContextProvider,
  ErrorPageContextProvider,
} from '../../context'

const ContextWrapper = ({ children }: PropsWithChildren<{}>) => (
  <LocationProvider>
    <ErrorPageContextProvider>
      <ModalContextProvider>
        <NavContextProvider>
          <LazyLoadingContextProvider>
            <PreloadContextProvider>
              <TranslationContextProvider>
                {children}
              </TranslationContextProvider>
            </PreloadContextProvider>
          </LazyLoadingContextProvider>
        </NavContextProvider>
      </ModalContextProvider>
    </ErrorPageContextProvider>
  </LocationProvider>
)

export default ContextWrapper
