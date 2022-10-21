import AlternateLanguage from './alternate-language'
import Metadata from './metadata'

interface PageData {
  page_title: string
  [key: string]: any
}

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
  data: Metadata & PageData
}

export default Page
