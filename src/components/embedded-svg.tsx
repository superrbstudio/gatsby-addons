import React, {
  HTMLAttributes,
  MutableRefObject,
  useEffect,
  useRef,
} from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  url: string
}

const EmbeddedSVG = ({ url, ...props }: Props) => {
  const xml = useRef<TrustedHTML | undefined>() as MutableRefObject<
    TrustedHTML | undefined
  >

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch(url)
        const text = await response.text()

        xml.current = text as TrustedHTML
      } catch (error) {
        console.error(error)
        xml.current = undefined
      }
    })()
  }, [url])

  return (
    <div
      {...(xml.current
        ? { dangerouslySetInnerHTML: { __html: xml.current } }
        : {})}
      {...props}
    />
  )
}

export default EmbeddedSVG
