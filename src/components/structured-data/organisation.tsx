import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'
import { StructuredData } from '../../../types'

const Organisation = () => {
  const data = useStaticQuery(graphql`
    query StructuredDataOrganisationQuery {
      organisation: prismicStructuredDataOrganisation {
        ...StructuredDataOrganisation
      }
    }
  `)

  const organisation: StructuredData.Organisation = data?.organisation
  if (!organisation) {
    return null
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "url": "${organisation.data.company_website}",
            "name": "${organisation.data.company_name}",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "${organisation.data.contact_point_telephone}",
              "email": "${organisation.data.contact_point_email}",
              "contactType": "Customer Support"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "${organisation.data.address_street}",
              "addressLocality": "${organisation.data.address_locality}",
              "addressRegion": "${organisation.data.address_region}",
              "postalCode": "${organisation.data.address_postal_code}",
              "addressCountry": "${organisation.data.address_country}"
            }
          }
        `}
      </script>
    </Helmet>
  )
}

export default Organisation
