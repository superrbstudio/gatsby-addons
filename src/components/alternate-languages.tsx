import React from 'react'
import { AlternateLanguage, Page } from '../../types'
import { linkResolver } from 'ProjectRoot/src/utils/linkResolver'

const AlternateLanguages = ({ page }: { page: Page }) => {
  const languages = [...page.alternate_languages, page as AlternateLanguage]

  return (
    <>
      {process.env.GATSBY_LANGUAGE &&
        languages
          ?.filter(page => page.lang === process.env.GATSBY_LANGUAGE)
          .map(page => (
            <link
              rel="alternate"
              hrefLang="x-default"
              href={`${process.env.GATSBY_SITE_URL}${linkResolver(page)}`}
              key="x-default"
            />
          ))}
      {languages.map(page => (
        <link
          rel="alternate"
          hrefLang={page.lang}
          href={`${process.env.GATSBY_SITE_URL}${linkResolver(page)}`}
          key={page.lang}
        />
      ))}
    </>
  )
}

export default AlternateLanguages
