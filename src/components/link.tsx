import React, { HTMLAttributes } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Link as LinkType } from '../../types'
import isExternalLink from '../utils/is-external-link'
import { linkResolver } from 'ProjectRoot/src/utils/linkResolver'

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  to: LinkType | string | undefined
}

const Link = ({ to, ...props }: Props) => {
  let url = to
  if (url && typeof url !== 'string') {
    url = linkResolver(url)
  }

  try {
    if (isExternalLink(url)) {
      return <a href={url} {...props} />
    }
  } catch (err) {
    console.log(err, url)
  }

  return <GatsbyLink to={url} {...props} />
}

export default Link
