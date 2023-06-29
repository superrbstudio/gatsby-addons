import React, { PropsWithChildren } from 'react'
import { LocationProvider } from '@reach/router'
import NavContextProvider from '../context/nav-context-provider'
import LazyLoadingContextProvider from '../context/lazy-loading-context-provider'
import PreloadContextProvider from '../context/preload-context-provider'
import TranslationContextProvider from '../context/translation-context-provider'
import ModalContextProvider from '../context/modal-context-provider'

const ContextWrapper = ({ children }: PropsWithChildren<{}>) => (
  <LocationProvider>
    <ModalContextProvider>
      <NavContextProvider>
        <LazyLoadingContextProvider>
          <PreloadContextProvider>
            <TranslationContextProvider>{children}</TranslationContextProvider>
          </PreloadContextProvider>
        </LazyLoadingContextProvider>
      </NavContextProvider>
    </ModalContextProvider>
  </LocationProvider>
)

export default ContextWrapper
