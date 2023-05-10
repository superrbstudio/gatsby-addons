import { useContext } from 'react'
import { PreloadContext } from '../context/preload-context-provider'

const usePreconnect = (url: string) => {
  const { addPreconnectItem } = useContext(PreloadContext)
  addPreconnectItem({ url })
}

export default usePreconnect
