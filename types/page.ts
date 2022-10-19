import Link from './link'
import Metadata from './metadata'

interface AlternateLanguage extends Link {
  lang: string
}

interface Page {
  _previewable: string
  uid: string
  type: string
  id: string
  lang: string
  tags: string[]
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
