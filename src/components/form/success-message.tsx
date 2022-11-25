import React, { useContext } from 'react'
import { TranslationContext } from '../../context/translation-context-provider'

const SuccessMessage = () => {
  const { translate } = useContext(TranslationContext)

  return (
    <div className="success-message">
      <h2 className="success-message__title">
        {translate('form.successMessage.title')}
      </h2>
      <p className="success-message__text">
        {translate('form.successMessage.text')}
      </p>
    </div>
  )
}
export default SuccessMessage
