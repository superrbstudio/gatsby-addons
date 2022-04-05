import React, { PropsWithChildren } from 'react'
import useId from '../../hooks/use-id'

interface Props extends PropsWithChildren<{}> {
  title: string
  className: string
}

const Section = ({ title, className, children }: Props) => {
  const id = useId('section')

  return (
    <section
      className={`section ${className}`}
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <div className="section__container container">
        <h2 id={`${id}-title`} className={`section__title ${className}__title`}>
          {title}
        </h2>

        {children}
      </div>
    </section>
  )
}

export default Section
