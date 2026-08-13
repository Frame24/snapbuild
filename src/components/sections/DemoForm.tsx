import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { CheckIcon } from '../ui/CheckIcon'
import { Button } from '../ui/Button'
import { useReveal } from '../../hooks/useReveal'
import {
  DEMO_POINTS,
  DEMO_ROLES,
  EMPTY_DEMO_FIELDS,
  validateDemo,
  type DemoErrors,
  type DemoFields,
} from '../../content/demoForm'
import styles from './DemoForm.module.css'

const FIELD_LABELS: Record<keyof DemoFields, string> = {
  name: 'Имя',
  email: 'Email',
  company: 'Компания',
  phone: 'Телефон',
  role: 'Роль',
  message: 'Задача',
}

export function DemoForm() {
  const sectionRef = useReveal<HTMLElement>()
  const baseId = useId()
  const [fields, setFields] = useState<DemoFields>(EMPTY_DEMO_FIELDS)
  const [errors, setErrors] = useState<DemoErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [sentTo, setSentTo] = useState<string | null>(null)
  const timerRef = useRef(0)

  const setField = <K extends keyof DemoFields>(key: K, value: DemoFields[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateDemo(fields)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      setSentTo(fields.email.trim())
      setSubmitting(false)
    }, 520)
  }

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current)
  }, [])

  const reset = () => {
    setFields(EMPTY_DEMO_FIELDS)
    setErrors({})
    setSentTo(null)
  }

  const fieldId = (key: keyof DemoFields) => `${baseId}-${key}`
  const errorId = (key: keyof DemoFields) => `${baseId}-${key}-error`

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} reveal`}
      id="demo"
      aria-labelledby="demo-title"
    >
      <div className={styles.layout}>
        <div className={styles.intro}>
          <h2 className={styles.title} id="demo-title">
            Запросите демо
          </h2>
          <p className={styles.subtitle}>
            Покажем, как ваша дизайн-система становится законом для сайтов,
            баннеров, видео и презентаций
          </p>
          <ul className={styles.points}>
            {DEMO_POINTS.map((point) => (
              <li key={point} className={styles.point}>
                <span className={styles.check} aria-hidden="true">
                  <CheckIcon size={16} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.card}>
          {sentTo ? (
            <div className={styles.success} role="status" aria-live="polite">
              <span className={styles.successMark} aria-hidden="true">
                <CheckIcon size={22} />
              </span>
              <h3 className={styles.successTitle}>Заявка отправлена</h3>
              <p className={styles.successText}>
                Напишем на {sentTo} в ближайший рабочий день. Если письмо не
                пришло, проверьте спам или напишите на hey@snapbuild.ru.
              </p>
              <Button type="button" onClick={reset}>
                Отправить ещё одну
              </Button>
            </div>
          ) : (
            <form className={styles.form} noValidate onSubmit={onSubmit}>
              <div className={styles.row}>
                <Field
                  id={fieldId('name')}
                  errorId={errorId('name')}
                  label={FIELD_LABELS.name}
                  error={errors.name}
                >
                  <input
                    id={fieldId('name')}
                    className={styles.input}
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={fields.name}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? errorId('name') : undefined}
                    onChange={(event) => setField('name', event.target.value)}
                  />
                </Field>
                <Field
                  id={fieldId('email')}
                  errorId={errorId('email')}
                  label={FIELD_LABELS.email}
                  error={errors.email}
                >
                  <input
                    id={fieldId('email')}
                    className={styles.input}
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={fields.email}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? errorId('email') : undefined
                    }
                    onChange={(event) => setField('email', event.target.value)}
                  />
                </Field>
              </div>

              <div className={styles.row}>
                <Field
                  id={fieldId('company')}
                  errorId={errorId('company')}
                  label={FIELD_LABELS.company}
                  error={errors.company}
                >
                  <input
                    id={fieldId('company')}
                    className={styles.input}
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={fields.company}
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={
                      errors.company ? errorId('company') : undefined
                    }
                    onChange={(event) => setField('company', event.target.value)}
                  />
                </Field>
                <Field
                  id={fieldId('phone')}
                  errorId={errorId('phone')}
                  label={`${FIELD_LABELS.phone} (необязательно)`}
                  error={errors.phone}
                >
                  <input
                    id={fieldId('phone')}
                    className={styles.input}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={fields.phone}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={
                      errors.phone ? errorId('phone') : undefined
                    }
                    onChange={(event) => setField('phone', event.target.value)}
                  />
                </Field>
              </div>

              <Field
                id={fieldId('role')}
                errorId={errorId('role')}
                label={FIELD_LABELS.role}
                error={errors.role}
              >
                <select
                  id={fieldId('role')}
                  className={styles.select}
                  name="role"
                  value={fields.role}
                  aria-invalid={Boolean(errors.role)}
                  aria-describedby={errors.role ? errorId('role') : undefined}
                  onChange={(event) => setField('role', event.target.value)}
                >
                  <option value="">Выберите роль</option>
                  {DEMO_ROLES.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                id={fieldId('message')}
                errorId={errorId('message')}
                label={`${FIELD_LABELS.message} (необязательно)`}
                error={errors.message}
              >
                <textarea
                  id={fieldId('message')}
                  className={styles.textarea}
                  name="message"
                  rows={4}
                  value={fields.message}
                  onChange={(event) => setField('message', event.target.value)}
                />
              </Field>

              <div className={styles.actions}>
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Отправляем...' : 'Отправить заявку'}
                </Button>
                <p className={styles.legal}>
                  Нажимая кнопку, вы соглашаетесь с{' '}
                  <a
                    href="https://snapbuild.ru/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    политикой конфиденциальности
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({
  id,
  errorId,
  label,
  error,
  children,
}: {
  id: string
  errorId: string
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <label className={styles.field} htmlFor={id}>
      <span className={styles.label}>{label}</span>
      {children}
      {error ? (
        <span className={styles.error} id={errorId} role="alert">
          {error}
        </span>
      ) : null}
    </label>
  )
}
