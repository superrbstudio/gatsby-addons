import { TranslationContext } from '../../context'
import React, {
  useState,
  PropsWithChildren,
  useEffect,
  useContext,
  MutableRefObject,
  useRef,
  useCallback,
} from 'react'
import { local } from '../../storage'
import { useLockBodyScroll } from '../../hooks'
import useModal from '../hooks/use-modal'

interface Props {
  name: string
  className?: string
  openAfter?: number
  dismissable?: boolean
}

const Modal = ({
  name,
  className,
  openAfter,
  dismissable = false,
  children,
}: PropsWithChildren<Props>) => {
  const [dismissed, setDismissed] = useState<boolean>(false)
  const { translate } = useContext(TranslationContext)
  const openTimer = useRef<NodeJS.Timeout>() as MutableRefObject<NodeJS.Timeout>

  const { isOpen, openModal, closeModal } = useModal(name)
  useLockBodyScroll(isOpen)

  useEffect(() => {
    if (dismissable) {
      setDismissed(local.getItem(`${name}-popup-dismissed`) === 'true')
    }
  }, [])

  useEffect(() => {
    clearTimeout(openTimer.current)
    if (!dismissed && openAfter) {
      openTimer.current = setTimeout(() => {
        openModal()
      }, openAfter)
    }
  }, [dismissed, openAfter, openModal])

  const close = useCallback(() => {
    closeModal()

    if (dismissable) {
      local.setItem(`${name}-popup-dismissed`, 'true')
      setDismissed(true)
    }
  }, [name, closeModal])

  return (
    <aside id={name} className={`modal ${className}`} aria-hidden={!isOpen}>
      <button className={`modal__close`} onClick={close}>
        <span className="screenreader-text">{translate('modal.close')}</span>
        &times;
      </button>

      <div className={`modal__inner`}>{children}</div>
    </aside>
  )
}

export default Modal
