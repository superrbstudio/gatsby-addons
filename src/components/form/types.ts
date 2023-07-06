import { ReactNode } from 'react'
import { FieldError } from 'react-hook-form'
import { OptionalObjectSchema } from 'yup/lib/object'

export type FieldRenderer = (
  props: object,
  error?: FieldError,
  schema?: OptionalObjectSchema<any>
) => ReactNode
