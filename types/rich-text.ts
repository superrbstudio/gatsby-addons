import { graphql } from 'gatsby'

interface RichText {
  html: string
  richText: string
  text: string
}

export const query = graphql`
  fragment RichText on PrismicStructuredTextType {
    html
    richText
    text
  }
`

export default RichText
