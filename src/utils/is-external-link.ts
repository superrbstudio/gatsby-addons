import { Location } from '@reach/router'

const isExternalLink = (url: string, forceExternal = false) => {
  if (forceExternal) {
    // If no key is present on route, then we can assume we're on the 404 page
    //
    // If so, treat all URLs as external as location context does not update
    // when navigating from a 404 page
    return true
  }

  // In SSR mode, treat everything as an external link
  if (!url || typeof window === 'undefined') {
    return true
  }

  // Override is needed for relative or hash URLs, as they cannot be parsed
  if (url.startsWith('/') || url.startsWith('#')) {
    return false
  }

  let tmp: URL
  try {
    tmp = new URL(url)
  } catch (_) {
    return true
  }

  return tmp?.host !== window.location.host
}

export default isExternalLink
