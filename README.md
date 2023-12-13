# Gatsby Addons

## Installation

First, install the package

```sh
yarn add @superrb/gatsby-addons
```

## Package aliases

Add the following webpack aliases in `gatsby-node.ts`.

```tsx
export const onCreateWebpackConfig = async ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        ProjectRoot: path.resolve(__dirname, '.'),
        '@superrb/gatsby-addons-cms': path.resolve(
          './node_modules/@superrb/gatsby-addons-prismic/', // Replace with path to chosen CMS extension
        ),
      },
    },
  })
}
```

## Context Providers

Add the context providers in `src/gatsby-browser.tsx` and `src/gatsby-ssr.tsx` for any of the [contexts](./src/context/README.md) you wish to use.

```tsx
import { LazyLoadingContextProvider, NavContextProvider, TranslationContextProvider } from '@superrb/gatbsy-addons/context'

export const wrapRootElement = ({ element }) => (
  <LazyLoadingContextProvider>
    <NavContextProvider>
      <TranslationContextProvider>
        {element}
      </TranslationContextProvider>
    </NavContextProvider>
  </LazyLoadingContextProvider>
)
```

## Language Map

If you want to use translations, after adding the translation context provider, create a language map for each language you want to use in `src/utils/translation.ts`.

Example:

```ts
import en from '../translations/en.json'
import jp from '../translations/jp.json'

export type Messages = Partial<typeof en & typeof jp>

export enum Language {
  en = 'en', // These strings should match the language or locale code used in Prismic
  jp = 'jp',
}

const translations = (
  language: Language = process.env.GATSBY_LANGUAGE as Language,
) => {
  switch (language) {
    case Language.jp:
      return jp as Messages
    case Language.en:
      return en as Messages
    default:
      return en as Messages
  }
}

export default translations
```

Translations should be stored in `src/translations/<lang>.json`. The typescript types are automatically generated based on the keys in the JSON file.

## Image Reverse Proxy

To use a reverse proxy for Images you can replace the domain in the image urls by populating the following env vars:

```env
GATSBY_IMAGE_URL_FIND="images.prismic.io"
GATSBY_IMAGE_URL_REPLACE="reverseproxy.cdn.com"
```

All image URLs will be converted from `https://images.prismic.io/image.webp` to `https://reverseproxy.cdn.com/image.webp`

## Further Documentation
* [Components](./src/components/README.md)
* [Contexts](./src/context/README.md)
* [Hooks](./src/hooks/README.md)
* [Utilities](./src/utils/README.md)
