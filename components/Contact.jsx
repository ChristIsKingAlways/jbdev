'use client'

/**
 * Contact section: mailto + POST /api/contact form with client validation.
 * BEM block: contact (see Contact.module.css). Form shell uses global .glass--form.
 */

import { useId, useState } from 'react'
import { useInView } from '@/hooks/useInView'
import styles from './Contact.module.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const [ref, visible] = useInView({ threshold: 0.12, once: true })
  const formId = useId()
  const [pending, setPending] = useState(false)
  const [status, setStatus] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    const nextErrors = {}
    if (!name) nextErrors.name = 'Name is required.'
    if (!email) nextErrors.email = 'Email is required.'
    else if (!EMAIL_REGEX.test(email)) nextErrors.email = 'Enter a valid email address.'
    if (!message) nextErrors.message = 'Message is required.'

    setFieldErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus({ type: 'error', text: 'Please fix the fields below.' })
      return
    }

    setStatus(null)
    setPending(true)
    ;(async () => {
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        })
        const payload = await res.json().catch(() => ({}))
        if (!res.ok) {
          setStatus({ type: 'error', text: payload.error ?? 'Something went wrong. Try again.' })
          return
        }
        setStatus({ type: 'success', text: payload.message ?? 'Message sent. I will get back to you soon.' })
        form.reset()
        setFieldErrors({})
      } catch {
        setStatus({ type: 'error', text: 'Network error. Check your connection and try again.' })
      } finally {
        setPending(false)
      }
    })()
  }

  return (
    <section
      id="contact"
      className={styles.contact}
      aria-labelledby="contact-heading"
      ref={ref}
    >
      <div className={styles.contact__inner}>
        <div className={styles.contact__copy}>
          <p className={styles.contact__eyebrow}>Contact</p>
          <h2 id="contact-heading" className={styles.contact__title}>
            Let&apos;s work together
          </h2>
          <p className={styles.contact__sub}>Have a project in mind? I&apos;d love to hear about it.</p>

          <a href="mailto:Jordan@duodynamicsit.com" className={styles.contact__mail}>
            Jordan@duodynamicsit.com
          </a>

          <div
            className={`${styles.contact__reveal} ${visible ? styles['contact__reveal--visible'] : ''}`}
          >
            <form
              id={formId}
              className={`${styles.contact__form} glass glass--form`}
              onSubmit={handleSubmit}
              noValidate
              aria-describedby={status ? `${formId}-status` : undefined}
            >
              <div className={styles.contact__field}>
                <label className={styles.contact__label} htmlFor={`${formId}-name`}>
                  Name
                </label>
                <input
                  id={`${formId}-name`}
                  className={styles.contact__input}
                  name="name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={fieldErrors.name ? 'true' : undefined}
                  aria-describedby={fieldErrors.name ? `${formId}-name-err` : undefined}
                />
                {fieldErrors.name ? (
                  <span id={`${formId}-name-err`} className={styles.contact__error} role="alert">
                    {fieldErrors.name}
                  </span>
                ) : null}
              </div>

              <div className={styles.contact__field}>
                <label className={styles.contact__label} htmlFor={`${formId}-email`}>
                  Email
                </label>
                <input
                  id={`${formId}-email`}
                  className={styles.contact__input}
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={fieldErrors.email ? 'true' : undefined}
                  aria-describedby={fieldErrors.email ? `${formId}-email-err` : undefined}
                />
                {fieldErrors.email ? (
                  <span id={`${formId}-email-err`} className={styles.contact__error} role="alert">
                    {fieldErrors.email}
                  </span>
                ) : null}
              </div>

              <div className={styles.contact__field}>
                <label className={styles.contact__label} htmlFor={`${formId}-message`}>
                  Message
                </label>
                <textarea
                  id={`${formId}-message`}
                  className={styles.contact__textarea}
                  name="message"
                  rows={5}
                  aria-invalid={fieldErrors.message ? 'true' : undefined}
                  aria-describedby={fieldErrors.message ? `${formId}-message-err` : undefined}
                />
                {fieldErrors.message ? (
                  <span id={`${formId}-message-err`} className={styles.contact__error} role="alert">
                    {fieldErrors.message}
                  </span>
                ) : null}
              </div>

              <p className={styles.contact__hint}>Submissions are validated client- and server-side.</p>

              {status ? (
                <p
                  id={`${formId}-status`}
                  className={`${styles.contact__status} ${status.type === 'success' ? styles['contact__status--success'] : styles['contact__status--error']}`}
                  role="status"
                  aria-live="polite"
                >
                  {status.text}
                </p>
              ) : null}

              <button type="submit" className={styles.contact__submit} disabled={pending}>
                {pending ? 'Sending…' : 'Send message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
