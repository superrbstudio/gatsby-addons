# Gatsby Addons Hooks

## [useAsync](./use-async.ts)

Allows asynchronous fetch operations to be run, whilst handling success, error and processing states.

### Usage

```tsx
import React, { useCallback } from 'react'
import { useAsync } from '@superrb/gatsby-addons/hooks'

const MyComponent = () => {
  const onSubmit = useCallback(async (data) => {
    return validate(data)
  })

  // Passing `true` as the second argument, will also run the callback immediately on page load
  // The third argument is a dependency array, which works in the same way as `useEffect`.
  // When a change to an item in the dependency array occurs, the hooks state is reset
  const { execute, status, error } = useAsync(onSubmit, false, [onSubmit])

  return (
    {status === 'success' ? (
      <div>
        {'Success message'}
      </div>
    ) : (
      <form onSubmit={execute}>
        {status === 'error' && (
          <span>{error}</span>
        )}

        {status !== 'pending' && (
          <button type="submit">Submit</button>
        )}
      </form>
    )}
  )
}
```

## [useDraggableScroll](./use-draggable-scroll.ts)

Enables click and drag to scroll an element with overflow.

The `className` passed to the object should match the container. The component then adds and removes the following classes as you interact with it (based on a class of `list`):
* `list--draggable` - automatically added when the `scrollWidth` of the container is larger than the containers width
* `list--scrolling` - added when a `scroll` event is fired on the container
* `list--dragging` - added when the user begins dragging the container

### Usage

```tsx
import React, { useRef, MutableRefObject } from 'react'
import { useDraggableScroll } from '@superrb/gatsby-addons/hooks'

const MyComponent = () => {
  const scrollContainer = useRef<HTMLUListElement>() as MutableRefObject<HTMLUListElement>
  const { events } = useDraggableScroll(scrollContainer, { className: 'list' })

  return (
    <ul class="list" ref={scrollContainer} {...events}>
      {items.map(item => <Item item={item} />)}
    </ul>
  )
}
```

## [useEventListener](./use-event-listener.ts)

Adds an event listener to an object, with an optional conditional flag.

### Usage

```tsx
import React, { useCallback, useState } from 'react'
import { useEventListener } from '@superrb/gatsby-addons/hooks'

const MyComponent = () => {
  const [yPos, setYPos] = useState<number>(0)
  const handleScroll = useCallback((event) => {
    setYPos(window.scrollY)
  }, [])

  useEventListener('scroll', handleScroll, { passive: true }, typeof window !== 'undefined' ? window : null)

  return () => {
    <>
      {yPos}
    </>
  }
}
```

#### Attach event listeners conditionally

Passing a 5th boolean parameter, allows the event listener to be added when the parameter resolves to true, for example, using the [`isInViewport`](#isInViewport) to only attach the event listener when the component is within the viewport.

```tsx
import React, { useCallback, useState } from 'react'
import { useEventListener } from '@superrb/gatsby-addons/hooks'

const MyComponent = () => {
  const [yPos, setYPos] = useState<number>(0)
  const { isInViewport, setRef } = useIsInViewport(false)
  const handleScroll = useCallback((event) => {
    setYPos(window.scrollY)
  }, [])

  useEventListener('scroll', handleScroll, { passive: true }, typeof window !== 'undefined' ? window : null, isInViewport)

  return () => {
    <div ref={setRef}>
      {yPos}
    </div>
  }
}
```

## [useId](./use-id.ts)

Generate a unique ID for a component with a given prefix.

### Usage

```tsx
import React from 'react'
import { useId } from '@superrb/gatsby-addons/hooks'

const MyComponent = () => {
  const id = useId('my-component-')

  return <div id={id}></div>
}
```

## [useIsInViewport](./use-is-in-viewport.ts)

Returns true/false depending on whether or not the given ref is visible on screen.

### Usage

```tsx
import React from 'react'
import { useIsInViewport } from '@superrb/gatsby-addons/hooks'

const MyComponent = () => {
  const { isInViewport, setRef } = useIsInViewport(false)

  return (
    <div ref={setRef}>
      {isInViewport ? 'Now you see me' : 'Now you don\'t'}
    </div>
  )
}
```

## [useIsMobile](./use-is-mobile.ts)

Returns true/false depending on whether the screen size is smaller than a given size (default: `63.75em`)

### Usage

```tsx
import React from 'react'
import { useIsMobile } from '@superrb/gatsby-addons/hooks'

const MyComponent = () => {
  const isMobile = useIsMobile(false, '90em')

  return (
    <>
      {isMobile : 'This is a mobile device' : 'This is a desktop device'}
    </>
  )
}
```

## [useLockBodyScroll](./use-lock-body-scroll.ts)

Use a boolean flag to determine whether scrolling should be disabled on the body (for example when a modal is open)

### Usage

```tsx
import React, { useState } from 'react'
import { useLockBodyScroll } from '@superrb/gatsby-addons/hooks'

const MyComponent = () => {
  const [open, setOpen] = useState<boolean>(false)

  useLockBodyScroll(open)
}
```

## [useMotionAllowed](./use-motion-allowed.ts)

Returns true/false depending on whether the users would prefer reduced motion (based on `@media (prefers-reduced-motion: reduce)`)

### Usage

```tsx
import React from 'react'
import { useMotionAllowed } from '@superrb/gatsby-addons/hooks'

const MyComponent = () => {
  const isMotionAllowed = useMotionAllowed(false)

  return (
    <>
      {motionAllowed ? <Animation /> : 'No animation'}
    </>
  )
}
```