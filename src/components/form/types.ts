import { ReactNode } from 'react'
import { FieldError, FieldErrorsImpl } from 'react-hook-form'

export type FieldRenderer = (
  props: object,
  error?: FieldError | FieldErrorsImpl<any>
) => ReactNode
