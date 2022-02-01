import { graphql } from 'gatsby'

interface SiteConfig {
  email_address: string
  facebook_username: string
  instagram_username: string
  linkedin_username: string
  twitter_username: string
}

export const query = graphql`
  fragment SiteConfig on PrismicSiteconfig {
    data {
      email_address
      facebook_username
      instagram_username
      linkedin_username
      twitter_username
    }
  }
`

export default SiteConfig
