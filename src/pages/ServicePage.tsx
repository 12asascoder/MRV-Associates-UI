import { Link, useParams } from 'react-router-dom'
import { Meta } from '../components/Meta'
import { Shell } from '../components/Reveal'
import { practiceAreas, transactions } from '../content/site'
import { useBriefing } from '../hooks/useBriefing'

export function ServicePage() {
  const { slug } = useParams()
  const area = practiceAreas.find((item) => item.slug === slug)
  const { openBriefing } = useBriefing()

  if (!area) {
    return (
      <Shell className="py-24">
        <h1 className="font-serif text-4xl">Practice area not found</h1>
        <Link to="/#practice" className="mt-4 inline-block text-blue">
          Return to practice areas
        </Link>
      </Shell>
    )
  }

  const related = transactions.filter((item) => item.practiceSlug === area.slug || item.slug === area.transactionSlug)

  return (
    <>
      <Meta title={`${area.title} | MNV Associates`} description={area.summary} />
      <section className="border-b border-line bg-mist">
        <Shell className="py-16 lg:py-20">
          <p className="eyebrow">Practice Area</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight font-medium text-ink sm:text-5xl">{area.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate">{area.summary}</p>
        </Shell>
      </section>
      <Shell className="grid gap-12 py-16 lg:grid-cols-[1.3fr_0.7fr]">
        <article className="space-y-8">
          <section>
            <h2 className="font-serif text-3xl font-medium">What this engagement covers</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate">
              {area.covers.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          {area.slug === 'corporate-tax' ? (
            <>
              <section id="transfer-pricing">
                <h2 className="font-serif text-3xl font-medium">Transfer pricing documentation</h2>
                <p className="mt-3 text-sm leading-6 text-slate">
                  The practice prepares master and local files where the group’s transactions require them. The file is built from the client’s own ledgers and agreements. This page does not supply a template that can be filed on its own.
                </p>
              </section>
              <section id="esr">
                <h2 className="font-serif text-3xl font-medium">Economic substance</h2>
                <p className="mt-3 text-sm leading-6 text-slate">
                  Economic substance reporting sits beside the corporate tax analysis for holding, leasing, and headquarters activities. The work is to test the activity against the current rules, not to assume an exemption.
                </p>
              </section>
              <section id="ubo">
                <h2 className="font-serif text-3xl font-medium">Ultimate beneficial ownership</h2>
                <p className="mt-3 text-sm leading-6 text-slate">
                  UBO registers are maintained with the relevant registrar. The firm coordinates the ownership narrative with the tax and foundation work so the same persons are described consistently.
                </p>
              </section>
            </>
          ) : null}
          {area.slug === 'ma-advisory' ? (
            <>
              <section id="valuation">
                <h2 className="font-serif text-3xl font-medium">Business valuations</h2>
                <p className="mt-3 text-sm leading-6 text-slate">
                  Valuation work uses discounted cash flow and market multiples, with the tax basis of the assets stated separately from enterprise value. A figure becomes a deliverable only inside an accepted mandate.
                </p>
              </section>
              <section id="diligence">
                <h2 className="font-serif text-3xl font-medium">Due diligence reporting</h2>
                <p className="mt-3 text-sm leading-6 text-slate">
                  Reports separate financial findings, tax exposures, and regulatory consents. They are written for a buyer, a seller, or a lender named in the engagement letter.
                </p>
              </section>
            </>
          ) : null}
          {related.length ? (
            <section>
              <h2 className="font-serif text-3xl font-medium">Published reference</h2>
              <div className="mt-4 space-y-4">
                {related.map((item) => (
                  <article key={item.slug} id={item.slug} className="gloss-card rounded-2xl border border-line p-5">
                    <p className="font-mono text-[11px] tracking-[0.14em] text-blue uppercase">
                      {item.category} · {item.reference}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl font-medium">{item.title}</h3>
                    <p className="mt-3 font-serif text-3xl">{item.metric}</p>
                    <p className="mt-2 text-xs tracking-[0.14em] text-emerald uppercase">{item.caption}</p>
                    <p className="mt-3 text-sm leading-6 text-slate">
                      This is the reference published on the firm’s track record. No further client, figure, or outcome is added here.
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
          <p className="text-sm leading-6 text-slate">{area.note}</p>
        </article>
        <aside className="gloss-panel h-fit rounded-2xl p-6 text-white lg:sticky lg:top-28">
          <p className="font-mono text-[10px] tracking-[0.16em] text-white/60 uppercase">{area.footer}</p>
          <h2 className="mt-3 font-serif text-3xl font-medium">Brief a partner on this practice</h2>
          <p className="mt-3 text-sm leading-6 text-white/70">
            The consultation form opens with this advisory domain selected. Sending it stores a request. It does not reserve a meeting.
          </p>
          <button type="button" className="btn btn-blue mt-6 w-full" onClick={() => openBriefing({ domain: area.domain, scope: `Practice area: ${area.title}` })}>
            Schedule Briefing
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </button>
          <Link to="/#practice" className="mt-4 block text-center text-sm text-white/70 hover:text-white">
            All practice areas
          </Link>
        </aside>
      </Shell>
    </>
  )
}
