import React, { HTMLAttributes, PropsWithChildren } from 'react'
import useId from '../../hooks/use-id'

interface Props extends PropsWithChildren<{}> {
  title: string
  className: string
  flex: boolean
}

const Section = ({ title, className, children, flex = false }: Props) => {
  const id = useId('section')

  return (
    <section
      className={`section ${className}`}
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <div
        className={`section__container container ${
          flex ? 'container--flex' : ''
        }`}
      >
        <h2 id={`${id}-title`} className={`section__title ${className}__title`}>
          {title}
        </h2>

        {children}
      </div>
    </section>
  )
}

export default Section
