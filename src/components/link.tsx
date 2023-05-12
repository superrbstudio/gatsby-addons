import React, { ForwardedRef, HTMLAttributes, forwardRef } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Link as LinkType } from '../../types'
import isExternalLink from '../utils/is-external-link'
import { linkResolver } from 'ProjectRoot/src/utils/linkResolver'

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  to: LinkType | string | undefined
}

const Link = forwardRef(
  ({ to, ...props }: Props, ref: ForwardedRef<HTMLAnchorElement>) => {
    let url = to
    if (url && typeof url !== 'string') {
      if ('target' in url) {
        props.target = url.target

        if (props.target === '_blank') {
          props.rel = 'noopener'
        }
      }

      url = linkResolver(url)
    }

    if (isExternalLink(url)) {
      return <a href={url} {...props} ref={ref} />
    }

    return <GatsbyLink to={url} {...props} ref={ref} />
  }
)

export default Link
