import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ForwardedRef,
  HTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
  forwardRef,
  memo,
} from 'react'
import Link from './link'
import useId from '../hooks/use-id'
import extendClass from '../utils/extend-class'
import { Link as LinkType } from '../../types'

type Props = (
  | PropsWithChildren<HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>>
  | ButtonHTMLAttributes<HTMLButtonElement>
  | AnchorHTMLAttributes<HTMLAnchorElement>
) & {
  label?: string
  label_a11y?: string
  onClick?: MouseEventHandler
  href?: LinkType | string
  className?: string
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

const Button = forwardRef(
  (
    {
      children,
      label,
      label_a11y = undefined,
      onClick = undefined,
      href = undefined,
      className = '',
      ...props
    }: Props,
    ref: ForwardedRef<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    const id = props.id || useId('button')

    const renderedChildren = (
      <>
        {label_a11y && (
          <span className="screenreader-text" id={`${id}-label`}>
            {label_a11y}
          </span>
        )}
        {label && (
          <span
            className={`button__label ${extendClass(className, 'label')}`}
            id={!label_a11y ? `${id}-label` : ''}
            aria-hidden={label_a11y !== undefined}
            data-text={label}
          >
            {label}
          </span>
        )}
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
          ref={ref as ForwardedRef<HTMLAnchorElement>}
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
        ref={ref as ForwardedRef<HTMLButtonElement>}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {renderedChildren}
      </button>
    )
  }
)

export default memo(Button)
export type { Props as ButtonProps }
