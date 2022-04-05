import { graphql } from 'gatsby'

interface StructuredDataOrganisation {
  data: {
    company_name: string
    company_website: string
    contact_point_email: string
    contact_point_telephone: string
    address_street: string
    address_locality: string
    address_region: string
    address_postal_code: string
    address_country: string
  }
}

export const query = graphql`
  fragment StructuredDataOrganisation on PrismicStructuredDataOrganisation {
    data {
      company_name
      company_website
      contact_point_email
      contact_point_telephone
      address_street
      address_locality
      address_region
      address_postal_code
      address_country
    }
  }
`

export default StructuredDataOrganisation
