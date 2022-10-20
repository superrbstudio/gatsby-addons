import AlternateLanguage from './alternate-language'
import Metadata from './metadata'

interface Page {
  _previewable: string
  uid: string
  type: string
  id: string
  lang: string
  tags: string[]
  first_publication_date: string
  last_publication_date: string
  alternate_languages: AlternateLanguage[]
  data:
    | Metadata
    | {
        page_title: string
      }
    | {
        [key: string]: any
      }
}

export default Page
