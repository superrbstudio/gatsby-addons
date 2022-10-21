import { Link } from 'gatsby'
import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
} from 'react'
import useId from '../hooks/use-id'
import extendClass from '../utils/extend-class'

interface Props
  extends PropsWithChildren<
    HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>
  > {
  label: string
  label_a11y?: string
  onClick?: MouseEventHandler
  href?: string
  className?: string
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

const Button = ({
  children,
  label,
  label_a11y = undefined,
  onClick = undefined,
  href = undefined,
  className = '',
  ...props
}: Props) => {
  const id = props.id || useId('button')

  const renderedChildren = (
    <>
      {label_a11y && <span className="screenreader-text">{label_a11y}</span>}
      <span
        className={`button__label ${extendClass(className, 'label')}`}
        id={`${id}-label`}
        aria-hidden={label_a11y !== undefined}
        data-text={label}
      >
        {label}
      </span>
      {children}
    </>
  )

  if (href) {
    return (
      <Link
        onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
        to={href}
        className={`button ${className}`}
        id={id}
        aria-labelledby={`${id}-label`}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {renderedChildren}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
      className={`button ${className}`}
      id={id}
      aria-labelledby={`${id}-label`}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {renderedChildren}
    </button>
  )
}

export default Button
