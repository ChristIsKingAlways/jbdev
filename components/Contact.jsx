'use client'

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
      className={styles.section}
      aria-labelledby="contact-heading"
      ref={ref}
    >
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Contact</p>
          <h2 id="contact-heading" className={styles.title}>
            Let&apos;s work together
          </h2>
          <p className={styles.sub}>Have a project in mind? I&apos;d love to hear about it.</p>

          <a href="mailto:Jordan@duodynamicsit.com" className={styles.mail}>
            Jordan@duodynamicsit.com
          </a>

          <div className={`${styles.reveal} ${visible ? styles.revealVisible : ''}`}>
            <form
              id={formId}
              className={`${styles.form} glass-surface glass-surface--form`}
              onSubmit={handleSubmit}
              noValidate
              aria-describedby={status ? `${formId}-status` : undefined}
            >
              <div className={styles.field}>
                <label className={styles.label} htmlFor={`${formId}-name`}>
                  Name
                </label>
                <input
                  id={`${formId}-name`}
                  className={styles.input}
                  name="name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={fieldErrors.name ? 'true' : undefined}
                  aria-describedby={fieldErrors.name ? `${formId}-name-err` : undefined}
                />
                {fieldErrors.name ? (
                  <span id={`${formId}-name-err`} className={styles.error} role="alert">
                    {fieldErrors.name}
                  </span>
                ) : null}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor={`${formId}-email`}>
                  Email
                </label>
                <input
                  id={`${formId}-email`}
                  className={styles.input}
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={fieldErrors.email ? 'true' : undefined}
                  aria-describedby={fieldErrors.email ? `${formId}-email-err` : undefined}
                />
                {fieldErrors.email ? (
                  <span id={`${formId}-email-err`} className={styles.error} role="alert">
                    {fieldErrors.email}
                  </span>
                ) : null}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor={`${formId}-message`}>
                  Message
                </label>
                <textarea
                  id={`${formId}-message`}
                  className={styles.textarea}
                  name="message"
                  rows={5}
                  aria-invalid={fieldErrors.message ? 'true' : undefined}
                  aria-describedby={fieldErrors.message ? `${formId}-message-err` : undefined}
                />
                {fieldErrors.message ? (
                  <span id={`${formId}-message-err`} className={styles.error} role="alert">
                    {fieldErrors.message}
                  </span>
                ) : null}
              </div>

              <p className={styles.hint}>Submissions are validated client- and server-side.</p>

              {status ? (
                <p
                  id={`${formId}-status`}
                  className={`${styles.status} ${status.type === 'success' ? styles.statusSuccess : styles.statusError}`}
                  role="status"
                  aria-live="polite"
                >
                  {status.text}
                </p>
              ) : null}

              <button type="submit" className={styles.submit} disabled={pending}>
                {pending ? 'Sending…' : 'Send message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
