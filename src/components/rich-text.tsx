import React, { memo } from 'react'
import { RichText as RichTextType } from '../../types'
import { PrismicRichText } from '@prismicio/react'
import { linkResolver } from 'ProjectRoot/src/utils/linkResolver'
import { Link } from 'gatsby'

interface Props {
  field: RichTextType['richText']
}

const RichText = ({ field }: Props) => {
  return (
    <PrismicRichText
      field={field}
      linkResolver={linkResolver}
      internalLinkComponent={({ href, ...props }) => (
        <Link to={href} {...props} />
      )}
    />
  )
}

export default memo(RichText)
