# Gatsby Addons Contexts

## [Lazy Loading](./lazy-loading-context.tsx)

A context which allows you to provide it with image refs to be lazy loaded.

*Included in the built-in [`Image`](../components/README.md#image) component.*

### Usage

```tsx
import React, { useContext } from 'react'
import { LazyLoadingContext } from '@superrb/gatsby-addons/context'

const Image = () => {
  const { lazyLoad } = useContext(LazyLoadingContext)

  return (
    <img data-src='https://placecage.com/200/200' ref={lazyLoad} />
  )
}
```

## [Nav](./nav-context-provider.tsx)

A simple global context to allow components to control a navigation menu.

### Usage

```tsx
import React, { useContext } from 'react'
import { NavContext } from '@superrb/gatsby-addons/context'

const Header = () => {
  const { navOpen, closeNav } = useContext(NavContext)

  return (
    <header className={`header ${navOpen ? 'header--nav-open' : ''}`}>
      <a href="https://some.url" onClick={closeNav}>Click me!</a>
    </header>
  )
}
```

## [Preload](./preload-context-provider.tsx)

A context which allows you to mark URLs for preloading with the [`usePreload`](../hooks/use-preload.ts), and delivers them to a [`<PreloadLinks />`](../components/preload-links.tsx) component in the layout.

```tsx
import { React, useContext } from 'react'
import { PreloadContext } from '@superrb/gatsby-addons/context'

const MyComponent = () => {
  const { preloadLinks } = useContext(PreloadContext)

  return (
    <>
      {preloadLinks.map(link => (
        // Do something with preload items
      ))}
    </>
  )
}
```

## [Translation](./translation-context-provider.tsx)

A context which allows you to access and control page language, translations, page alternative languages, and locale formatting for dates

*If you are using the [`Page`](../components/README.md#page) wrapper component, then the page language and alternative languages are set for you automatically. Check the source of that component to see how to set language yourself.*

### Usage

#### Simple string translation

Translations are added in `src/translations/<lang>.json` in your project.

**Check the instructions for creating a [Language Map](../../README.md#language-map) which is required for this context to function**

```
import { TranslationContext } from '@superrb/gatsby-addons/context'

const MyComponent = () => {
  const { translate } = useContext(TranslationContext)

  return (
    <>
      {translate('translation.key')}
    </>
  )
}
```

#### Date Formatting

```
import { TranslationContext } from '@superrb/gatsby-addons/context'

const MyComponent = ({ date }) => {
  const { moment } = useContext(TranslationContext)
  const formattedDate = moment(date, 'Y-m-d').format('LL')

  return (
    <>
      {formattedDate}
    </>
  )
}
```
