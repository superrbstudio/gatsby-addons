import React, { HTMLAttributes } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Link as LinkType } from '../../types'
import isExternalLink from '../utils/is-external-link'
import linkResolver from 'ProjectRoot/src/utils/linkResolver'

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  to: LinkType | string | undefined
}

const Link = ({ to, ...props }: Props) => {
  if ('type' in to || 'url' in to) {
    to = linkResolver(to)
  }

  if (isExternalLink(to)) {
    return <a href={to} {...props} />
  }

  return <GatsbyLink to={to} {...props} />
}

export default Link
