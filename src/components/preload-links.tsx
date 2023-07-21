import React, { useContext } from 'react'
import { PreloadContext } from '../../context'

const PreloadLinks = () => {
  const { preloadItems, preconnectItems } = useContext(PreloadContext)

  return (
    <>
      {preconnectItems.map(({ url }, index) => (
        <link key={index} rel="preconnect" href={url} />
      ))}
      {preloadItems.map(({ url, as, crossOrigin, ...rest }, index) => (
        <link
          key={index}
          rel="preload"
          href={url}
          as={as}
          crossOrigin={crossOrigin}
          {...rest}
        />
      ))}
    </>
  )
}

export default PreloadLinks
