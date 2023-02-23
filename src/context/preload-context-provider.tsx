import { isEqual, matchesProperty, some, uniqWith } from 'lodash'
import React, {
  createContext,
  memo,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { Helmet } from 'react-helmet'

export type CrossOrigin = 'anonymous' | 'use-credentials'
export type ContentType = 'style' | 'script' | 'image' | 'font'

export interface PreloadItem {
  url: string
  imagesrcset?: string
  as?: ContentType
  crossOrigin?: CrossOrigin
}

export const PreloadContext = createContext({
  preloadItems: [] as PreloadItem[],
  addPreloadItem: (item: PreloadItem | null) => {},
})

export const PreloadContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [preloadItems, setPreloadItems] = useState<PreloadItem[]>([])

  const addPreloadItem = useCallback(
    (item: PreloadItem | null) => {
      // Filter out missing URLs and duplicate items
      if (
        item === null ||
        preloadItems.filter(child => child.url === item.url).length > 0
      ) {
        return
      }

      setPreloadItems((items: PreloadItem[]) => {
        items.push(item)
        return items
      })
    },
    [setPreloadItems]
  )

  return (
    <PreloadContext.Provider
      value={{
        preloadItems,
        addPreloadItem,
      }}
    >
      {children}
    </PreloadContext.Provider>
  )
}

export default PreloadContextProvider
