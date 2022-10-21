const isExternalLink = (url: string) => {
  const tmp = document.createElement('a')
  tmp.href = url
  return tmp.host !== window.location.host
}

export default isExternalLink
