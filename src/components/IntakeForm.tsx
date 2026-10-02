import { useState, type FormEvent } from 'react'
import type { FormField, FormPage } from '../content/site'
import { submitIntake } from '../lib/intake'

export function IntakeForm({ page }: { page: FormPage }) {
  const openedAt = useState(() => Date.now())[0]
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(page.fields.map((field) => [field.name, field.options?.[0] ?? ''])),
  )
  const [honeypot, setHoneypot] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [receipt, setReceipt] = useState<{ reference: string; receivedAt: string } | null>(null)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const next: Record<string, string> = {}
    for (const field of page.fields) {
      const value = (values[field.name] ?? '').trim()
      if (field.required && !value) next[field.name] = `Enter ${field.label.toLowerCase()}.`
      if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        next[field.name] = 'Enter a valid email address.'
      }
    }
    setErrors(next)
    if (Object.keys(next).length) return
    if (Date.now() - openedAt < 1200) {
      setStatus('error')
      setMessage('Review the form briefly before submitting.')
      return
    }
    setStatus('loading')
    setMessage('')
    try {
      const result = await submitIntake(page.kind, values, openedAt, honeypot)
      setReceipt(result)
      setStatus('idle')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'The request was not recorded.')
    }
  }

  if (receipt) {
    return (
      <div className="gloss-card rounded-2xl border border-line p-6" role="status">
        <h2 className="font-serif text-3xl font-medium text-ink">{page.successTitle}</h2>
        <p className="mt-3 text-sm leading-6 text-slate">{page.successBody}</p>
        <p className="mt-4 text-sm">
          Reference <strong className="tabular">{receipt.reference}</strong>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="gloss-card rounded-2xl border border-line p-6">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor={`${page.kind}-website`}>Website</label>
        <input id={`${page.kind}-website`} tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
      </div>
      <div className="grid gap-4">
        {page.fields.map((field) => (
          <FormControl
            key={field.name}
            field={field}
            value={values[field.name] ?? ''}
            error={errors[field.name]}
            onChange={(value) => setValues((current) => ({ ...current, [field.name]: value }))}
          />
        ))}
      </div>
      {status === 'error' ? (
        <p className="mt-4 text-sm text-[#8d2d2d]" role="alert">
          {message}
        </p>
      ) : null}
      <button type="submit" className="btn btn-blue mt-5" disabled={status === 'loading'}>
        {status === 'loading' ? 'Recording' : page.submitLabel}
      </button>
      <p className="mt-3 text-xs leading-5 text-muted">
        This form writes to the site intake endpoint only. A success message means the record was stored, not that an email was sent.
      </p>
    </form>
  )
}

function FormControl({
  field,
  value,
  error,
  onChange,
}: {
  field: FormField
  value: string
  error?: string
  onChange: (value: string) => void
}) {
  const id = `intake-${field.name}`
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block font-mono text-[10px] tracking-[0.14em] text-[#70809a] uppercase">{field.label}</span>
      {field.type === 'textarea' ? (
        <textarea id={id} className="field min-h-28" placeholder={field.placeholder} value={value} aria-invalid={Boolean(error)} onChange={(event) => onChange(event.target.value)} />
      ) : field.type === 'select' ? (
        <select id={id} className="field" value={value} onChange={(event) => onChange(event.target.value)}>
          {field.options?.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={field.type}
          className="field"
          autoComplete={field.autoComplete}
          placeholder={field.placeholder}
          value={value}
          aria-invalid={Boolean(error)}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {error ? <span className="mt-1 block text-xs text-[#8d2d2d]">{error}</span> : null}
    </label>
  )
}
