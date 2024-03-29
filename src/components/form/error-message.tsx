import React, { useContext } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import { TranslationContext } from '../../context/translation-context-provider'
import { OptionalObjectSchema } from 'yup/lib/object'

export interface ErrorMessageProps {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  fieldSchema?: OptionalObjectSchema<any>
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  const { translate } = useContext(TranslationContext)
  const GENERIC_ERROR =
    translate('form.error.generic') || 'Sorry, an error occurred'

  return <span className="form__error">{error?.message || GENERIC_ERROR}</span>
}

export default ErrorMessage
