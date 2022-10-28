const isExternalLink = (url: string) => {
  // In SSR mode, treat everything as an external link
  if (typeof window === 'undefined') {
    return true
  }

  // Override is needed for root URL, as it cannot be parsed
  if (url === '/') {
    return true
  }

  const tmp = new URL(url)
  return tmp.host !== window.location.host
}

export default isExternalLink
