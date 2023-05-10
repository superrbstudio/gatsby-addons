import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import isExternalLink from '../utils/is-external-link'

const Link = ({ to, ...props }) => {
  if (isExternalLink(to)) {
    return <a href={to} {...props} />
  }

  return <GatsbyLink to={to} {...props} />
}

export default Link
