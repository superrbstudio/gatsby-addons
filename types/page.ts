import AlternateLanguage from './alternate-language'
import Metadata from './metadata'
import { Language } from 'ProjectRoot/src/utils/translations'

export interface PageData {
  page_title: string
  [key: string]: any
}

export interface PageStub {
  id: string
  uid: string
  lang: Language
  type: string
}

interface Page extends PageStub {
  _previewable: string
  tags: string[]
  first_publication_date: string
  last_publication_date: string
  alternate_languages: AlternateLanguage[]
  data: Metadata & PageData
}

export default Page
