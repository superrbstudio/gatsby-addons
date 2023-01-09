import React from 'react'
import { AnySchema } from 'yup'
import { UseFormRegister, FieldValues } from 'react-hook-form'

interface Props {
  register: UseFormRegister<FieldValues>
  schema: AnySchema<any>
}

const FormField = ({ register, schema }: Props) => {
  console.log(schema)

  return (
    <>
      {schema?._whitelist?.list?.size > 0 ? (
        <select className="form__control form__control--select" {...register}>
          {schema?.spec?.meta?.placeholder ? (
            <option value="">{schema?.spec?.meta?.placeholder}</option>
          ) : null}
          {[...schema?._whitelist?.list?.entries()].map(([value, label]) => (
            <option value={value}>{label}</option>
          ))}
        </select>
      ) : (
        <>
          {schema?.spec?.meta?.textarea === true ? (
            <textarea
              className="form__control"
              {...register}
              placeholder={schema?.spec?.meta?.placeholder}
            />
          ) : schema?.type === 'boolean' ? (
            <input
              type="checkbox"
              className="form__control form__control--checkbox"
              {...register}
            />
          ) : (
            <input
              className="form__control"
              {...register}
              placeholder={schema?.spec?.meta?.placeholder || null}
            />
          )}
        </>
      )}
    </>
  )
}

export default FormField
