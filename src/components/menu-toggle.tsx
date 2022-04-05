import React, {
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { NavContext } from '../context/nav-context-provider'
import Button from './button'
import extendClass from '../utils/extend-class'

interface Props
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  'aria-controls': string
  className?: string
  label?: string
  closeLabel?: string
  renderIcon?: (navOpen: boolean) => ReactElement
}

const MenuToggle = ({
  'aria-controls': ariaControls,
  className = '',
  label = 'Open Nav',
  closeLabel = 'Close Nav',
  renderIcon = undefined,
  ...props
}: Props) => {
  const { navOpen, toggleNav } = useContext(NavContext)
  const [icon, setIcon] = useState<ReactElement | string>(navOpen ? '×' : '꠵')

  useEffect(() => {
    if (renderIcon) {
      setIcon(renderIcon(navOpen))

      return
    }

    setIcon(navOpen ? '×' : '꠵')
  }, [navOpen])

  const handleClick = useCallback(() => {
    if (
      document &&
      document?.activeElement instanceof Element &&
      'blur' in document?.activeElement
    ) {
      document.activeElement.blur()
    }

    toggleNav()
  }, [toggleNav])

  return (
    <Button
      className={`menu-toggle ${className}`}
      onClick={handleClick}
      aria-expanded={navOpen}
      aria-controls={ariaControls}
      label={navOpen ? closeLabel : label}
      {...props}
    >
      <span className={`menu-toggle__icon ${extendClass(className, 'icon')}`}>
        {icon}
      </span>
    </Button>
  )
}

export default MenuToggle
