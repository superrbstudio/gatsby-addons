import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import translations, {
  Language,
  Messages,
} from 'ProjectRoot/src/utils/translations'
import * as LodashObject from 'lodash/fp/object'
import moment from 'moment/min/moment-with-locales'
import { AlternateLanguage } from '@superrb/gatsby-addons/types'

export type AlternateLanguageMap = {
  [P in Language]?: AlternateLanguage
}

interface Props {
  messages: Messages
  language: Language
  setLanguage: (language: Language) => void
  translate: (key: string) => string
  moment: typeof moment
  alternateLanguages: AlternateLanguageMap
  setAlternateLanguages: (alternates: AlternateLanguage[]) => void
}

const momentLocaleMap = {
  [Language.en]: 'en',
  [Language.jp]: 'ja',
}

export const TranslationContext = createContext({
  messages: {},
  language: process.env.GATSBY_LANGUAGE as Language,
  setLanguage: (language: Language) => {},
  translate: (key: string) => '',
} as Props)

export const TranslationContextProvider = ({
  children,
}: PropsWithChildren<ReactNode>) => {
  const [language, setLanguage] = useState<Language>(
    process.env.GATSBY_LANGUAGE as Language
  )
  const [alternateLanguages, setAlternateLanguagesStorage] =
    useState<AlternateLanguageMap>({})

  const [messages, setMessages] = useState<Messages>(translations(language))

  const [locale, setLocale] = useState<string>()
  moment.locale(locale)

  useEffect(() => {
    setMessages(translations(language))
    setLocale(momentLocaleMap[language])
  }, [language, setMessages, setLocale])

  const translate = useCallback(
    (key: string) => {
      const translated = LodashObject.get(key, messages)
      if (!translated) {
        return `Translation missing: ${key}`
      }

      return translated
    },
    [messages]
  )

  const setAlternateLanguages = useCallback(
    (alternates: AlternateLanguage[]) => {
      const storage = {}
      for (let alternate of alternates) {
        storage[alternate.lang] = alternate
      }

      setAlternateLanguagesStorage(storage)
    },
    [setAlternateLanguagesStorage]
  )

  return (
    <TranslationContext.Provider
      value={{
        messages,
        language,
        setLanguage,
        translate,
        moment,
        alternateLanguages,
        setAlternateLanguages,
      }}
    >
      {children}
    </TranslationContext.Provider>
  )
}

export default TranslationContextProvider