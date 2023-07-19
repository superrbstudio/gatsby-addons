import React, { PropsWithChildren } from 'react'
import { LocationProvider } from '@reach/router'
import {
  NavContextProvider,
  LazyLoadingContextProvider,
  PreloadContextProvider,
  TranslationContextProvider,
  ModalContextProvider,
  ErrorPageContextProvider,
  CookiesContextProvider,
} from '../../context'

const ContextWrapper = ({ children }: PropsWithChildren<{}>) => (
  <LocationProvider>
    <CookiesContextProvider>
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
    </CookiesContextProvider>
  </LocationProvider>
)

export default ContextWrapper
