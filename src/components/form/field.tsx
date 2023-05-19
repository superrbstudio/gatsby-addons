import React from 'react'
import { AnySchema } from 'yup'
import { UseFormRegisterReturn } from 'react-hook-form'
import { paramCase } from 'change-case'

interface Props {
  register: UseFormRegisterReturn<string>
  schema: AnySchema<any>
  id?: string
}

const FormField = ({ register, schema, id }: Props) => {
  const fieldProps = {
    ...register,
    ...(id ? { id } : {}),
  }

  return (
    <>
      {schema?._whitelist?.list?.size > 0 ? (
        <select className="form__control form__control--select" {...register}>
          {schema?.spec?.meta?.placeholder ? (
            <option value="" key={'placeholder'}>
              {schema?.spec?.meta?.placeholder}
            </option>
          ) : null}
          {[...schema?._whitelist?.list?.entries()].map(
            ([value, label], key) => (
              <option value={value as string} key={key}>
                {label as string}
              </option>
            )
          )}
        </select>
      ) : (
        <>
          {schema?.spec?.meta?.textarea === true ? (
            <textarea
              className="form__control"
              placeholder={schema?.spec?.meta?.placeholder}
              {...fieldProps}
            />
          ) : schema?.type === 'boolean' ? (
            <input
              type="checkbox"
              className="form__control form__control--checkbox"
              {...fieldProps}
            />
          ) : schema?.spec?.meta?.hidden === true ? (
            <input
              type="hidden"
              className="form__control form__control--hidden"
              value={schema?.spec?.default}
              {...fieldProps}
            />
          ) : schema?.type === 'mixed' ? (
            <input
              className="form__control form__control--mixed"
              type="file"
              value={schema?.spec?.default}
              {...fieldProps}
            />
          ) : (
            <input
              className="form__control"
              placeholder={schema?.spec?.meta?.placeholder || null}
              {...fieldProps}
            />
          )}
        </>
      )}
    </>
  )
}

export default FormField
