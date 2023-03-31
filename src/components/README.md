# Gatsby Addons Components

## [Alternate Languages](./alternate-languages.tsx)

Sets the correct hreflang tags for the current page, and any alternative languages

**This component is included in the [`Page`](#page) wrapper component, so you won't need to use it directly unless you omit that component**

### Usage

```tsx
<AlternativeLanguages page={page} />
```

## [Button](./button.tsx)

Creates a button. Determines whether to use an `<a>`, `<Link>` or `<button>` element depending on the props passed.

### Usage

```tsx
<Button url={'https://superrb.com'} label={'The visible label'} label_a11y={'A separate label for screenreaders'} />
```

## [Form](./form.tsx)

Creates a form, with field structure defined by a [Yup](https://npmjs.com/package/yup) schema. See [full documentation](./form/README.md)

### Usage

```tsx
import { Form } from '@superrb/gatsby-addons/components'
import * as yup from 'yup'

const OPTIONS = [
  'Option 1',
  'Option 2'
]

const schema = yup.object({
  name: yup.string().required(),
  select: yup.string().oneOf(OPTIONS).required(),            // The `oneOf` validation rule will automatically trigger a select box
  message: yup.string().meta({ textarea: true }).required() // Set `textarea: true` in the fields metadata to display a textarea
})

const Page = () => (
  <Form action="https://yoursite.com/send" schema={schema} />
)
```

## [Image](./image.tsx)

Render an image object, with srcset and sizes attributes.

Expects to be passed an image object generated with the following query:
```graphql
query ImageQuery {
  image {
    alt
    fluid(
      imgixParams: { q: 35, auto: "compress", fm: "webp" }
      srcSetBreakpoints: [25, 750, 1080, 1366, 1920, 2560]
    ) {
      base64
      src
      srcSet
    }
  }
}
```

### Usage

```tsx
<Image
  image={image}
  layout={ImageLayout.cover}
  sizes={'(min-width: 75em) 50vw, 100vw' /* Default: 100vw */}
  preload={false /* Change to true for above-the-fold images */}
  lazyLoad={true /* Disabled if preloading is enabled */}
/>
```

## [Map](./map/map.tsx)

A wrapper around Google Maps, which comes preconfigured with clustering of map pins

### Usage

```tsx
<Map
  center={{
    lat: offices[0]?.data?.office_latitude,
    lng: offices[0]?.data?.office_longitude,
  }}
  useClustering={true}
  initialZoom={1}
  markers={offices.map(
    (
      { data: { office_title, office_latitude, office_longitude } },
      index,
    ) => {
      return {
        label: office_title,
        center: {
          lat: office_latitude,
          lng: office_longitude,
        },
      }
    },
  )}
  markerIcon={
    <MapPin
      style={{
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    />
  }
  options={mapOptions}
/>
```

## [Menu Toggle](./menu-toggle.tsx)

Renders a button which is automatically set up to toggle the `navOpen` property of [`NavContext`](../context/README.md#nav)

### Usage

```tsx
<MenuToggle />
```

## [Page](./page.tsx)

A wrapper element to be placed around the content of a page, which automatically sets up page language, translation context, alternative languages, and SEO metadata

### Usage

```tsx
const Index = () => (
  <Page page={page}>
    // Page content here
  </Page>
)
```

## [PreloadLinks](./preload-links.tsx)

Used to render preload links from a parent [`PreloadContext`](../context/preload-context-provider.tsx).

**This component is included in the [`Page`](#page) wrapper component, so you won't need to use it directly unless you omit that component**

### Usage

```tsx
<PreloadLinks />
```

## [Rich Text](./rich-text.tsx)

A memoized wrapper around Prismic's `<PrismicRichText>` component, which automatically registers the link resolver and link components.

### Usage

```tsx
<RichText field={page.data.description.richText} />
```

## [SEO](./seo.tsx)

Sets SEO metadata for a page, include OG tags

**This component is included in the [`Page`](#page) wrapper component, so you won't need to use it directly unless you omit that component**

### Usage

```tsx
<Seo data={page.data as Metadata} />
```
