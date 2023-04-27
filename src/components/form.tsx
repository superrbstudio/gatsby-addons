import React, {
  useCallback,
  useState,
  ReactNode,
  useEffect,
  Fragment, useContext
} from 'react'
import { InferType } from 'yup'
import { sentenceCase } from 'change-case'
import { FieldError, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useAsync, { Status } from '../hooks/use-async'
import { FieldRenderer } from './form/types'
import SuccessMessage from './form/success-message'
import ErrorMessage from './form/error-message'
import FormField from './form/field'
import { OptionalObjectSchema } from 'yup/lib/object'
import SubmitButton from './form/submit-button'
import { TranslationContext } from '../context/translation-context-provider'

interface FormProps<T extends OptionalObjectSchema<any>> {
  action: string
  method?: string
  name: string
  schema: T
  onSubmit?: (data: { [P in T as string]: any }) => void
  onStatusChange?: (status: Status) => void
  renderSuccessMessage?: (data: { [P in T as string]: any }) => ReactNode
  renderErrorMessage?: (error?: FieldError) => ReactNode
  renderSubmit?: () => ReactNode
  renderers?: { [P in T as string]: FieldRenderer }
}

const Form = ({
  action,
  method = 'post',
  name,
  schema,
  onSubmit,
  onStatusChange,
  renderSuccessMessage = data => <SuccessMessage />,
  renderErrorMessage = error => <ErrorMessage error={error} />,
  renderSubmit = () => <SubmitButton />,
  renderers = {},
  ...props
}: FormProps<OptionalObjectSchema<any>>) => {
  type DataStructure = InferType<typeof schema>
  const [data, setData] = useState<DataStructure>({})
  const { translate } = useContext(TranslationContext)

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

      if(!response.ok) {
        if (responseData.error) {
          throw new Error(responseData.error)
        }

        throw new Error(translate('form.error.endpoint_failure'))
      }

      setData(responseData)

      return responseData
    },
    [action, onSubmit]
  )

  const { execute, status, error } = useAsync(onSubmitHandler, false, [
    onSubmitHandler,
  ])

  useEffect(() => {
    if (onStatusChange) {
      onStatusChange(status)
    }
  }, [status])

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
          method={method}
          onSubmit={handleSubmit(execute)}
          noValidate={true}
          {...props}
        >
          {error && renderErrorMessage({ message: error } as FieldError)}

          {Object.keys(schema.fields).map((fieldName, key) => (
            <Fragment key={key}>
              {schema.fields[fieldName]?.spec?.meta?.hidden === true ? (
                <FormField
                  register={register(fieldName)}
                  schema={schema.fields[fieldName]}
                />
              ) : (
                <div
                  className={`form__group form__group--${fieldName} ${
                    fieldName in errors ? 'form__group--error' : ''
                  }`}
                >
                  <label
                    className="form__label"
                    htmlFor={`${name}__${fieldName}`}
                  >
                    <span
                      className="form__label-text"
                      dangerouslySetInnerHTML={{
                        __html: `${schema.fields[fieldName]?.spec?.label} ${
                          schema.fields[fieldName]?.required ? '*' : ''
                        }`,
                      }}
                    />

                    {fieldName in renderers ? (
                      renderers[fieldName](
                        register(fieldName),
                        errors[fieldName] as FieldError
                      )
                    ) : (
                      <>
                        <FormField
                          register={register(fieldName)}
                          schema={schema.fields[fieldName]}
                        />
                        {fieldName in errors &&
                          renderErrorMessage(errors[fieldName] as FieldError)}
                      </>
                    )}
                  </label>
                </div>
              )}
            </Fragment>
          ))}

          {renderSubmit()}
        </form>
      )}
    </>
  )
}

export default Form
