import * as React from 'react'
import { Helmet } from 'react-helmet'
import Metadata from '../../types/metadata'

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
    meta.push({
      name: `og:image`,
      content: data.meta_image?.fluid?.src,
    })
    meta.push({
      name: `twitter:image:src`,
      content: data.meta_image?.fluid?.src,
    })
  }

  return (
    <>
      <Helmet
        title={data.meta_title}
        meta={[
          {
            name: `description`,
            content: data.meta_description,
          },
          {
            property: `og:title`,
            content: data.meta_title,
          },
          {
            property: `og:description`,
            content: data.meta_description,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:creator`,
            content: data.meta_author || ``,
          },
          {
            name: `twitter:title`,
            content: data.meta_title,
          },
          {
            name: `twitter:description`,
            content: data.meta_description,
          },
        ].concat(meta)}
      />
    </>
  )
}

export default Seo
