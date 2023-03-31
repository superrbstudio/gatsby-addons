import { ReactNode } from 'react'
import { FieldError } from 'react-hook-form'

export type FieldRenderer = (props: object, error?: FieldError) => ReactNode
