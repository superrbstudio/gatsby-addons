import { Page as PageType } from '../../types'
import React, { ReactNode, useContext, useEffect } from 'react'
import { TranslationContext } from '../context/translation-context-provider'
import { Language } from 'ProjectRoot/src/utils/translations'

interface Props {
  page: PageType
  lang?: Language
  children: ReactNode
}

const Page = ({ page, children, lang = undefined }: Props) => {
  const { setLanguage, setAlternateLanguages } = useContext(TranslationContext)

  if (page.alternate_languages === null) {
    page.alternate_languages = []
  }

  useEffect(() => {
    setAlternateLanguages(page.alternate_languages)
    setLanguage(lang || (page.lang as Language))
  }, [lang, page])

  return <>{children}</>
}

export default Page
