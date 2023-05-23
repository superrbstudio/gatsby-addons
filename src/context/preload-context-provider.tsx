import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useState,
  LinkHTMLAttributes,
  HTMLLinkElement
} from 'react'

export type CrossOrigin = LinkHTMLAttributes<HTMLLinkElement>['crossOrigin']
export type ContentType = LinkHTMLAttributes<HTMLLinkElement>['as']

export interface PreloadItem {
  url: string
  imagesrcset?: string
  as?: ContentType
  crossOrigin?: CrossOrigin
}

export interface PreconnectItem {
  url: string
}

export const PreloadContext = createContext({
  preloadItems: [] as PreloadItem[],
  addPreloadItem: (item: PreloadItem | null) => {},
  preconnectItems: [] as PreconnectItem[],
  addPreconnectItem: (item: PreconnectItem | null) => {},
})

export const PreloadContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [preloadItems, setPreloadItems] = useState<PreloadItem[]>([])
  const [preconnectItems, setPreconnectItems] = useState<PreconnectItem[]>([])

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

  const addPreconnectItem = useCallback(
    (item: PreconnectItem | null) => {
      // Filter out missing URLs and duplicate items
      if (
        item === null ||
        preconnectItems.filter(child => child.url === item.url).length > 0
      ) {
        return
      }

      setPreconnectItems((items: PreconnectItem[]) => {
        items.push(item)
        return items
      })
    },
    [setPreconnectItems]
  )

  return (
    <PreloadContext.Provider
      value={{
        preloadItems,
        addPreloadItem,
        preconnectItems,
        addPreconnectItem,
      }}
    >
      {children}
    </PreloadContext.Provider>
  )
}

export default PreloadContextProvider
