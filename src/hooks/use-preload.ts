import { useContext } from 'react'
import {
  ContentType,
  CrossOrigin,
  PreloadContext,
} from '../context/preload-context-provider'

const usePreload = (
  url: string,
  imagesrcset?: string,
  as: ContentType = 'image',
  crossOrigin: CrossOrigin = 'anonymous',
  options = {}
) => {
  const { addPreloadItem } = useContext(PreloadContext)
  addPreloadItem({ url, imagesrcset, as, crossOrigin, ...options })
}

export default usePreload
