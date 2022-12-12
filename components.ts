/**
 * Components
 */
import AlternateLanguages from './src/components/alternate-languages'
import Button from './src/components/button'
import Form from './src/components/form'
import Image from './src/components/image'
import Map from './src/components/map/map'
import MenuToggle from './src/components/menu-toggle'
import Page from './src/components/page'
import Seo from './src/components/seo'
import Slideshow from './src/components/slideshow'
import * as StructuredData from './src/components/structured-data'

const options = [
  '@superrb/gatsby-addons-prismic',
  '@superrb/gatsby-addons-filesystem',
]

let moduleComponents
for (let option of options) {
  try {
    moduleComponents = import(`${option}/components`)

    break
  } catch (_) {} // Fail silently
}

const exports = {
  ...moduleComponents,
  AlternateLanguages,
  Button,
  Form,
  Image,
  Map,
  MenuToggle,
  Page,
  Seo,
  Slideshow,
  StructuredData,
}

export default exports
