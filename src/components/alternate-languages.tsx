import React from 'react'
import { Page } from '../../types'
import { linkResolver } from 'ProjectRoot/src/utils/linkResolver'
import { Helmet } from 'react-helmet'
import AlternateLanguage from '../../types/alternate-language'

const AlternateLanguages = ({ page }: { page: Page }) => {
  const languages = [...page.alternate_languages, page as AlternateLanguage]

  return (
    <Helmet>
      {process.env.GATSBY_LANGUAGE &&
        languages
          ?.filter(page => page.lang === process.env.GATSBY_LANGUAGE)
          .map(page => (
            <link
              rel="alternate"
              hrefLang="x-default"
              href={linkResolver(page)}
              key="x-default"
            />
          ))}
      {languages.map(page => (
        <link
          rel="alternate"
          hrefLang={page.lang}
          href={linkResolver(page)}
          key={page.lang}
        />
      ))}
    </Helmet>
  )
}

export default AlternateLanguages
