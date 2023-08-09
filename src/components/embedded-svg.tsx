import React, { HTMLAttributes, useEffect, useState } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  url: string
}

const EmbeddedSVG = ({ url, ...props }: Props) => {
  const [xml, setXml] = useState<TrustedHTML | undefined>()

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch(url)
        const text = await response.text()

        setXml(text)
      } catch (error) {
        console.error(error)
        setXml(undefined)
      }
    })()
  }, [url])

  return (
    <div
      {...(xml ? { dangerouslySetInnerHTML: { __html: xml } } : {})}
      {...props}
    />
  )
}

export default EmbeddedSVG
