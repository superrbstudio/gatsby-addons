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
import get from 'lodash/fp/get'
import moment from 'moment/min/moment-with-locales'
import { AlternateLanguage } from '../../types'

export type AlternateLanguageMap = {
  [P in Language]?: AlternateLanguage
}

interface Props {
  messages: Messages
  language: Language
  setLanguage: (language: Language) => void
  translate: (key: string, displayErrors?: boolean) => string | undefined
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
  translate: (key: string, displayErrors: boolean = true) => undefined,
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
    (key: string, displayErrors = true) => {
      const translated = get(key, messages)
      if (!translated && displayErrors) {
        return `Translation missing: ${key}`
      }

      return translated
    },
    [messages]
  )

  const setAlternateLanguages = useCallback(
    (alternates: AlternateLanguage[]) => {
      const storage = {} as AlternateLanguageMap
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
