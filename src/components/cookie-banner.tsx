import { Link } from 'gatsby'
import Cookies from 'js-cookie'
import React, { useContext, useRef, useState } from 'react'
import { CookiesContext, TranslationContext } from '../../context'
import { Button, Form } from '../../components'
import * as Yup from 'yup'
import SubmitButton from './form/submit-button'

const CookieBanner = ({
  allowCustomisation = true,
}: {
  allowCustomisation: boolean
}) => {
  const { cookiesAccepted, setCookiesAccepted, setTrackingCookiesAccepted } =
    useContext(CookiesContext)
  const { translate } = useContext(TranslationContext)
  const [animate, setAnimate] = useState<boolean>(false)

  const [formOpen, setFormOpen] = useState<boolean>(false)

  const openForm = () => {
    setFormOpen(true)
  }

  const accept = (necessary: boolean, tracking: boolean) => {
    setAnimate(true)
    setTimeout(() => {
      setCookiesAccepted(necessary)
      setTrackingCookiesAccepted(tracking)
    }, 800)
  }

  const acceptAll = () => {
    accept(true, true)
  }

  const submit = (data: { [key: string]: boolean }) => {
    accept(true, !!data.tracking)
  }

  const title = translate('cookie_banner.title', false)
  const text = translate('cookie_banner.text', false)
  const formText = translate('cookie_banner.form_text', false)
  const policyLabel =
    translate('cookie_banner.policy_link_label', false) || 'Cookie Policy'
  const customiseLabel =
    translate('cookie_banner.customise', false) || 'Customise'
  const acceptLabel =
    !allowCustomisation || formOpen
      ? translate('cookie_banner.accept', false) || 'Accept'
      : translate('cookie_banner.accept_all', false) || 'Accept All'

  const tracking = {
    title: translate('cookie_banner.tracking.title', false),
    description: translate('cookie_banner.tracking.description', false),
  }
  const necessary = {
    title: translate('cookie_banner.necessary.title', false),
    description: translate('cookie_banner.necessary.description', false),
  }

  const schema = Yup.object().shape({
    tracking: Yup.boolean().required().default(true).label(`
      ${tracking?.title ? `<strong>${tracking?.title}</strong>` : ''}
      ${tracking?.description ? `<p>${tracking?.description}</p>` : ''}
    `),
    necessary: Yup.boolean()
      .required()
      .default(true)
      .label(
        `
        ${necessary?.title ? `<strong>${necessary?.title}</strong>` : ''}
        ${necessary?.description ? `<p>${necessary?.description}</p>` : ''}
    `
      )
      .meta({ disabled: true }),
  })

  return (
    <>
      {!cookiesAccepted ? (
        <div
          className={`cookie-banner ${animate ? ' cookie-banner--hide' : ''} `}
        >
          <div className="cookie-banner__container container">
            <div className="cookie-banner__inner">
              {allowCustomisation && (
                <div className="cookie-banner__form" aria-hidden={!formOpen}>
                  {formText && (
                    <p className="cookie-banner__form-text">{formText}</p>
                  )}
                  <Form
                    className="cookie-banner__form"
                    schema={schema}
                    onSubmit={submit}
                    renderSubmit={() => <SubmitButton label={acceptLabel} />}
                    renderSuccessMessage={false}
                  />
                </div>
              )}
              <div className="cookie-banner__main">
                <div className="cookie-banner__message" aria-hidden={formOpen}>
                  {title && <h2 className="cookie-banner__title">{title}</h2>}
                  {text && (
                    <p className="cookie-banner__text">
                      {text}{' '}
                      <Link to="/legal/cookies-policy">{policyLabel}</Link>
                    </p>
                  )}
                </div>
                <div className="cookie-banner__buttons">
                  {allowCustomisation && !formOpen && (
                    <Button
                      onClick={openForm}
                      className="cookie-banner__reject button button__rounded button__rounded--black-fill"
                      label={customiseLabel}
                    />
                  )}
                  {!formOpen && (
                    <Button
                      onClick={acceptAll}
                      className="cookie-banner__agree button button__rounded button__rounded--black"
                      label={acceptLabel}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default CookieBanner
