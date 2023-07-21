import * as React from 'react'
import { Metadata } from '../../types'

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
    const imageUrl = data.meta_image?.gatsbyImageData?.images?.fallback?.src

    if (imageUrl) {
      meta.push({
        name: `twitter:image:src`,
        content: imageUrl,
      })
      meta.push({
        name: 'image',
        property: 'og:image',
        content: imageUrl,
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
