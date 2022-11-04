const isExternalLink = (url: string) => {
  // In SSR mode, treat everything as an external link
  if (typeof window === 'undefined') {
    return true
  }

  // Override is needed for relative or hash URLs, as they cannot be parsed
  if (url.startsWith('/') || url.startsWith('#')) {
    return false
  }

  const tmp = new URL(url)
  return tmp.host !== window.location.host
}

export default isExternalLink
