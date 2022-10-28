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

## [Image](./image.tsx)

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
<Image image={image} layout={layout} />
```

## [Map](./map/map.tsx)

A wrapper around Google Maps, which comes preconfigured with clustering of map pins

### Usage

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

Renders a button which is automatically set up to toggle the `navOpen` property of [`NavContext`](../context#nav-context)

### Usage

```tsx
<MenuToggle />
```

## [Page](./page.tsx)

A wrapper element to be placed around the content of a page, which automatically sets up page language, translation context, alternative languages, and SEO metadata

### Usage

```tsx
const Index = () => (
  <Page page={page}>
    // Page content here
  </Page>
)
```

## [Rich Text](./rich-text.tsx)

A memoized wrapper around Prismic's `<PrismicRichText>` component, which automatically registers the link resolver and link components.

### Usage

```tsx
<RichText field={page.data.description.richText} />
```

## [SEO](./seo.tsx)

Sets SEO metadata for a page, include OG tags

**This component is included in the `[Page](#page)` wrapper component, so you won't need to use it directly unless you omit that component**

### Usage

```tsx
<Seo data={page.data as Metadata} />
```
