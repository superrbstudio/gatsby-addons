import * as React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'
import { Metadata } from '../types/metadata'

interface Props {
  data: Metadata
}

const Seo = ({ data }: Props) => {
  const queryData = useStaticQuery(graphql`
    query SiteQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  if (!data) return null

  let metaTitle = queryData.site.siteMetadata.title

  if (data.meta_title !== undefined && data.meta_title !== null) {
    metaTitle = data.meta_title
  }

  let metaDescription = queryData.site.siteMetadata.description

  if (data.meta_description !== undefined && data.meta_description !== null) {
    metaDescription = data.meta_description
  }

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
        title={metaTitle}
        meta={[
          {
            name: `description`,
            content: metaDescription,
          },
          {
            property: `og:title`,
            content: metaTitle,
          },
          {
            property: `og:description`,
            content: metaDescription,
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
            content: queryData.site.siteMetadata?.author || ``,
          },
          {
            name: `twitter:title`,
            content: metaTitle,
          },
          {
            name: `twitter:description`,
            content: metaDescription,
          },
        ].concat(meta)}
      />
    </>
  )
}

export default Seo
