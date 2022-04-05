import React, { PropsWithChildren } from 'react'
import useId from '../../hooks/use-id'

interface Props extends PropsWithChildren<{}> {
  className: string
  flex: boolean
}

const Footer = ({className, flex, children }: Props) => {
  const id = useId('footer')

  return (
    <footer
      className={`footer ${className}`}
      id={id}
    >
      <div className={`footer__container container `${flex ? 'container--flex' : ''}``}>
        {children}
      </div>
    </footer>
  )
}

export default Footer
