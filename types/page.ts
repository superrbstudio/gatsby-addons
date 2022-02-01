import Metadata from './metadata'

interface Page {
  _previewable: string
  uid: string
  type: string
  id: string
  tags: string[]
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
