import { Lock } from 'lucide-react'
import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { advisoryDomains, offices } from '../content/site'
import { useBriefing } from '../hooks/useBriefing'
import { submitIntake } from '../lib/intake'
import { cx } from '../lib/cx'
import { Reveal, Shell } from './Reveal'

type Errors = Partial<Record<'name' | 'email' | 'entity' | 'domain' | 'scope', string>>

const highlights = [
  '45-Minute Dedicated Corporate Tax Assessment',
  'QFZP Qualifying Free Zone Eligibility Pre-Audit',
  'Choice of DIFC Physical Office or End-to-End Encrypted Virtual Session',
]

export function Consultation() {
  const { prefill } = useBriefing()
  const openedAt = useState(() => Date.now())[0]
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [entity, setEntity] = useState('')
  const [domain, setDomain] = useState(advisoryDomains[0])
  const [scope, setScope] = useState('')
  const [nda, setNda] = useState(true)
  const [honeypot, setHoneypot] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [receipt, setReceipt] = useState<{ reference: string; receivedAt: string } | null>(null)
  const [appliedToken, setAppliedToken] = useState<number | null>(null)
  const errorId = useId()

  if (prefill && prefill.token !== appliedToken) {
    setAppliedToken(prefill.token)
    setDomain(prefill.domain)
    if (prefill.scope) setScope(prefill.scope)
    setReceipt(null)
  }

  const validate = () => {
    const next: Errors = {}
    if (name.trim().length < 2) next.name = 'Enter the executive’s full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Enter a valid corporate email address.'
    if (entity.trim().length < 2) next.entity = 'Enter the entity, fund, or family office.'
    if (!domain) next.domain = 'Select an advisory domain.'
    if (scope.length > 2000) next.scope = 'Keep the scope under 2,000 characters.'
    return next
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0]
      document.getElementById(`briefing-${first}`)?.focus()
      return
    }
    if (Date.now() - openedAt < 1200) {
      setStatus('error')
      setMessage('Review the form briefly before dispatching the request.')
      return
    }
    setStatus('loading')
    setMessage('')
    try {
      const result = await submitIntake(
        'briefing',
        {
          name: name.trim(),
          email: email.trim(),
          entity: entity.trim(),
          domain,
          scope: scope.trim(),
          nda: nda ? 'yes' : 'no',
        },
        openedAt,
        honeypot,
      )
      setReceipt(result)
      setStatus('idle')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'The request was not recorded.')
    }
  }

  return (
    <section id="briefing" className="bg-white py-16 lg:py-20" aria-labelledby="briefing-heading">
      <Shell>
        <Reveal>
          <div className="rounded-[28px] bg-cloud px-6 py-10 sm:px-10 lg:px-12 lg:py-12">
            <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
              <div>
                <p className="eyebrow">Confidential Partner Consultation</p>
                <h2 id="briefing-heading" tabIndex={-1} className="mt-4 font-serif text-4xl leading-[1.12] font-medium tracking-tight text-ink outline-none sm:text-[2.7rem]">
                  Schedule an Executive Tax & Advisory Briefing
                </h2>
                <p className="mt-5 text-[15px] leading-7 text-slate">
                  Engage directly with an MNV Senior Partner. All engagements are protected under strict Non-Disclosure Agreements (NDA) and governed by Dubai International Financial Centre (DIFC) privacy standards.
                </p>
                <ul className="mt-6 space-y-3">
                  {highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-[#24324a]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-[#d5deea] pt-5 text-sm leading-6 text-slate">
                  <p>
                    <span className="font-semibold text-ink">Dubai Headquarters:</span> {offices.dubai}
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold text-ink">Abu Dhabi Office:</span> {offices.abuDhabi}
                  </p>
                </div>
              </div>

              <div className="gloss-card rounded-2xl border border-[#e6ebf2] p-5 sm:p-7">
                {receipt ? (
                  <div role="status">
                    <p className="eyebrow">Request received</p>
                    <h3 className="mt-3 font-serif text-3xl font-medium text-ink">Confidential briefing request stored</h3>
                    <p className="mt-4 text-sm leading-6 text-slate">
                      The intake endpoint recorded this request. It has not been emailed to a partner, and it has not opened an engagement. Keep the reference if you follow up.
                    </p>
                    <dl className="mt-5 space-y-2 rounded-xl bg-mist px-4 py-4 text-sm">
                      <div className="flex justify-between gap-4">
                        <dt className="text-slate">Reference</dt>
                        <dd className="font-semibold tabular">{receipt.reference}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-slate">Received</dt>
                        <dd className="tabular">{new Date(receipt.receivedAt).toLocaleString()}</dd>
                      </div>
                    </dl>
                    <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate">
                      <li>NDA preference on this request: {nda ? 'mutual NDA requested before the call' : 'NDA not requested on the form'}.</li>
                      <li>Transaction detail should wait until that NDA, or an engagement letter, is actually in place.</li>
                      <li>The simulator figures, if you included them, are illustrations and not a filing position.</li>
                    </ol>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} noValidate>
                    <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                      <label htmlFor="company-website">Company website</label>
                      <input id="company-website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Executive full name" id="briefing-name" error={errors.name} errorId={errorId}>
                        <input id="briefing-name" className="field" autoComplete="name" placeholder="e.g. Tariq Al-Mansoor" value={name} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${errorId}-name` : undefined} onChange={(event) => setName(event.target.value)} />
                      </Field>
                      <Field label="Corporate email address" id="briefing-email" error={errors.email} errorId={errorId}>
                        <input id="briefing-email" type="email" className="field" autoComplete="email" placeholder="name@enterprise.ae" value={email} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? `${errorId}-email` : undefined} onChange={(event) => setEmail(event.target.value)} />
                      </Field>
                      <Field label="Entity / fund / family office" id="briefing-entity" error={errors.entity} errorId={errorId}>
                        <input id="briefing-entity" className="field" autoComplete="organization" placeholder="e.g. Apex Global Capital" value={entity} aria-invalid={Boolean(errors.entity)} aria-describedby={errors.entity ? `${errorId}-entity` : undefined} onChange={(event) => setEntity(event.target.value)} />
                      </Field>
                      <Field label="Advisory domain" id="briefing-domain" error={errors.domain} errorId={errorId}>
                        <select id="briefing-domain" className="field" value={domain} aria-invalid={Boolean(errors.domain)} onChange={(event) => setDomain(event.target.value)}>
                          {advisoryDomains.map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </select>
                      </Field>
                    </div>
                    <div className="mt-4">
                      <Field label="Context / transaction scope (optional)" id="briefing-scope" error={errors.scope} errorId={errorId}>
                        <textarea id="briefing-scope" className="field min-h-24 resize-y" placeholder="Specify estimated transaction scale, Free Zone status, or key deadlines..." value={scope} aria-invalid={Boolean(errors.scope)} onChange={(event) => setScope(event.target.value)} />
                      </Field>
                    </div>
                    <label className="mt-4 flex items-start gap-3 text-sm leading-6 text-[#24324a]">
                      <input type="checkbox" className="mt-1 h-4 w-4 accent-blue" checked={nda} onChange={(event) => setNda(event.target.checked)} />
                      Request mutual DIFC-standard Mutual Non-Disclosure Agreement (NDA) prior to call
                    </label>
                    {status === 'error' ? (
                      <p className="mt-4 rounded-lg border border-[#f0d0d0] bg-[#fff6f6] px-3 py-2 text-sm text-[#8d2d2d]" role="alert">
                        {message}
                      </p>
                    ) : null}
                    <button type="submit" className="btn btn-blue mt-5 w-full" disabled={status === 'loading'}>
                      <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                      {status === 'loading' ? 'Dispatching request' : 'Dispatch Confidential Briefing Request'}
                    </button>
                    <p className="mt-3 text-xs leading-5 text-muted">
                      Submissions are stored by this site’s intake endpoint. They are not emailed automatically, and a stored request is not an accepted engagement.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Shell>
    </section>
  )
}

function Field({
  label,
  id,
  error,
  errorId,
  children,
}: {
  label: string
  id: string
  error?: string
  errorId: string
  children: ReactNode
}) {
  const key = id.replace('briefing-', '')
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-2 block font-mono text-[10px] tracking-[0.14em] text-[#70809a] uppercase">{label}</span>
      {children}
      {error ? (
        <span id={`${errorId}-${key}`} className={cx('mt-1 block text-xs text-[#8d2d2d]')}>
          {error}
        </span>
      ) : null}
    </label>
  )
}
