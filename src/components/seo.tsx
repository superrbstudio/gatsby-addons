import * as React from 'react'
import { Metadata } from '../../types'
import useImageSources from '../hooks/use-image-sources'

interface Props {
  data: Metadata
}

const Seo = ({ data }: Props) => {
  if (!data) return null

  const meta = []

  if (data.meta_robots !== undefined && data.meta_robots !== null) {
    meta.push({
      name: `robots`,
      content: data.meta_robots,
    })
  }

  if (data.meta_image !== undefined && data.meta_image !== null) {
    const { src } = useImageSources(data.meta_image)

    if (src) {
      meta.push({
        name: `twitter:image:src`,
        content: src,
      })
      meta.push({
        name: 'image',
        property: 'og:image',
        content: src,
      })
    }
  }

  return (
    <>
      <title>{data.meta_title}</title>
      <meta name="title" property="og:title" content={data.meta_title} />
      <meta
        name="description"
        property="og:description"
        content={data.meta_description}
      />
      <meta name="type" property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={data.meta_author || ``} />
      <meta name="twitter:title" content={data.meta_title} />
      <meta name="twitter:description" content={data.meta_description} />

      {meta.map(({ name, property, content }) => (
        <meta key={name} name={name} property={property} content={content} />
      ))}
    </>
  )
}

export default Seo
