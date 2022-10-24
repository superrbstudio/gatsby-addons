const isExternalLink = (url: string) => {
  // In SSR mode, treat everything as an external link
  if (typeof window === 'undefined') {
    return true
  }

  const tmp = new URL(url)
  return tmp.host !== window.location.host
}

export default isExternalLink
