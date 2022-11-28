import { ReactNode } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

export type FieldRenderer = (props: object, error?: FieldError) => ReactNode
