import React, {
  useCallback,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import * as yup from 'yup'
import { InferType, ObjectSchema } from 'yup'
import { pascalCase, sentenceCase } from 'change-case'
import {
  Field,
  FieldError,
  FieldErrorsImpl,
  Merge,
  useForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useAsync from '../hooks/use-async'
import { TranslationContext } from '../context/translation-context-provider'
import Button from './button'
import { FieldRenderer } from './form/types'
import SuccessMessage from './form/success-message'
import ErrorMessage from './form/error-message'

interface FormProps<T extends ObjectSchema<any>> {
  action: string
  name: string
  schema: T
  onSubmit?: (data: { [P in T as string]: any }) => void
  renderSuccessMessage?: (data: { [P in T as string]: any }) => ReactNode
  renderErrorMessage?: (error?: FieldError) => ReactNode
  renderers?: { [P in T as string]: FieldRenderer }
}

const Form = ({
  action,
  name,
  schema,
  onSubmit,
  renderSuccessMessage = () => <SuccessMessage />,
  renderErrorMessage = (error?: FieldError) => <ErrorMessage error={error} />,
  renderers = {},
  ...props
}: FormProps<ObjectSchema<any>>) => {
  type DataStructure = InferType<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataStructure>({
    resolver: yupResolver(schema),
  })

  const onSubmitHandler = useCallback(
    async (data: DataStructure) => {
      if (onSubmit) {
        return onSubmit(data)
      }

      const response = await fetch(action as string, {
        method: 'post',
        headers: {
          contentType: 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      return responseData
    },
    [action, onSubmit]
  )

  const { execute, status, error } = useAsync(onSubmitHandler, false, [
    onSubmitHandler,
  ])
  const { translate } = useContext(TranslationContext)

  Object.keys(schema.fields).map(fieldName => {
    if (!schema.fields[fieldName]?.spec?.label) {
      schema.fields[fieldName].spec.label = sentenceCase(fieldName)
    }
  })

  return (
    <>
      {status === 'success' ? (
        <>{renderSuccessMessage(data)}</>
      ) : (
        <form
          className="form"
          action={action}
          onSubmit={handleSubmit(execute)}
          {...props}
        >
          {error && renderErrorMessage({ message: error } as FieldError)}

          {Object.keys(schema.fields).map(fieldName => (
            <div className="form__group">
              <label className="form__label" htmlFor={`${name}__${fieldName}`}>
                <span className="form__label-text">
                  {schema.fields[fieldName]?.spec?.label}
                </span>

                {fieldName in renderers ? (
                  renderers[fieldName](
                    register(fieldName),
                    errors[fieldName] as FieldError
                  )
                ) : (
                  <>
                    {schema.fields[fieldName]?._whitelist?.list?.size > 0 ? (
                      <select
                        className="form__control form__control--select"
                        {...register(fieldName)}
                      >
                        {[
                          ...schema.fields[
                            fieldName
                          ]?._whitelist?.list?.entries(),
                        ].map(([value, label]) => (
                          <option value={value}>{label}</option>
                        ))}
                      </select>
                    ) : (
                      <>
                        {schema.fields[fieldName]?.spec?.meta?.textarea ===
                        true ? (
                          <textarea
                            className="form__control"
                            {...register(fieldName)}
                          />
                        ) : (
                          <input
                            className="form__control"
                            {...register(fieldName)}
                          />
                        )}
                      </>
                    )}
                    {fieldName in errors &&
                      renderErrorMessage(errors[fieldName] as FieldError)}
                  </>
                )}
              </label>
            </div>
          ))}

          <Button
            label={translate('form.submit')}
            className="form__submit"
            type="submit"
          />
        </form>
      )}
    </>
  )
}

export default Form
