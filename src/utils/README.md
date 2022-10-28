# Gatsby Addons Utilities

## [animate](./animate.ts)

Allows the animation of any numeric value over a given duration, including [easing](./easing-functions.ts).

### Usage

```tsx
import React, { useCallback, useState } from 'react'
import { animate } from '@superrb/gatsby-addons/utils'

const MyComponent = () => {
  const [value, setValue] = useState<number>(0)

  const handleClick = useCallback(() => {
    animate(0, 100, v => {
      setValue(v)
    })
  }, [setValue])

  return (
    <button onClick={handleClick}>{value}</button>
  )
}
```

## [animator](./animator.ts)

Uses `IntersectionObserver` to set classes on elements as they appear in the viewport. To be coupled with CSS animations.

```tsx
import React from 'react'
import { animator } from '@superrb/gatsby-addons/utils'

// Component will recieve a class of `animated` when in the viewport
const MyComponent = (
  <div ref={animator}></div>
)
```

## [isExternalLink](./is-external-link.ts)

Used to determine whether a given URL is internal or external

### Usage

```tsx
import { isExternalLink } from '@superrb/gatsby-addons/utils'

isExternalLink('https://superrb.com') // true
isExternalLink('/home')               // false
```

## [storageFactory](./storage-factory.ts)

A safe wrapper around browser storage, which fails gracefully if storage is unavailable (for example, if user has blocked cookies in Safari, which causes accessing `localStorage` and `sessionStorage` to throw a fatal error)

### Usage

```tsx
import { storageFactory } from '@superrb/gatsby-addons/utils'

const session = storageFactory(() => window.sessionStorage)
session.getItem('testing') // No longer throws an error if access to sessionStorage is blocked, and just returns `null`
```