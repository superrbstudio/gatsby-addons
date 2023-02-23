import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { PreloadContext } from '../../context'

const PreloadLinks = () => {
  const { preloadItems } = useContext(PreloadContext)

  return (
    <Helmet>
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
    </Helmet>
  )
}

export default PreloadLinks
