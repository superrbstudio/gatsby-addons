import React, { useContext } from 'react'
import { TranslationContext } from '../../context/translation-context-provider'
import { Button } from '../../../components'

const SubmitButton = ({ label }: { label?: string }) => {
  const { translate } = useContext(TranslationContext)

  return (
    <Button
      label={label || translate('form.submit')}
      className="form__submit"
      type="submit"
    />
  )
}

export default SubmitButton
