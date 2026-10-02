import { Download } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Meta } from '../components/Meta'
import { Shell } from '../components/Reveal'

export function TaxBrief() {
  return (
    <>
      <Meta
        title="UAE 2025 Corporate Tax Brief | MRV Associates"
        description="A short briefing note on the UAE corporate tax schedule, qualifying free zone treatment, and the limits of the illustrative simulator."
      />
      <section className="border-b border-line bg-mist">
        <Shell className="py-16 lg:py-20">
          <p className="eyebrow">UAE 2025 Tax Brief</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight font-medium text-ink sm:text-5xl">
            Corporate tax and qualifying free zone notes
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate">
            This note summarises rules that are already public. It is not a memorandum, a filing position, or a substitute for the text published by the Federal Tax Authority.
          </p>
          <a className="btn btn-blue mt-8" href="/briefs/mrv-uae-2025-tax-brief.html" download="MRV-UAE-2025-Corporate-Tax-Brief.html">
            <Download className="h-4 w-4" aria-hidden="true" />
            Download the brief
          </a>
        </Shell>
      </section>
      <Shell className="max-w-3xl py-16">
        <article className="space-y-8 text-[15px] leading-7 text-[#314158]">
          <section>
            <h2 className="font-serif text-3xl font-medium text-ink">The schedule</h2>
            <p className="mt-3">
              Federal Decree-Law No. 47 of 2022 introduced federal corporate tax for financial years starting on or after 1 June 2023. The published rate structure used throughout this site is 0% on taxable income up to AED 375,000 and 9% on taxable income above that amount. Confirm the current Cabinet threshold at tax.gov.ae.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-3xl font-medium text-ink">Qualifying Free Zone Persons</h2>
            <p className="mt-3">
              A Qualifying Free Zone Person may apply 0% to qualifying income where the statutory conditions are met, and 9% to taxable income that is not qualifying income. Conditions discussed in public FTA material include adequate substance, qualifying activities, and a de minimis limit on non-qualifying revenue. The de minimis limit is generally described as the lower of 5% of total revenue and AED 5 million.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-3xl font-medium text-ink">What the simulator is doing</h2>
            <p className="mt-3">
              The homepage simulator applies the 0% / 9% schedule to profit, treats the qualifying-activity share as taxed at 0%, and applies the AED 375,000 band to the remaining profit. On AED 5,000,000 at a 75% qualifying rate, that arithmetic produces AED 78,750 of illustrated tax, AED 416,250 of mainland tax, and AED 337,500 of illustrated relief. The verified de minimis state at those inputs uses a 70% planning screen so the reference design remains visible. It is wider than the 5% statutory test.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-3xl font-medium text-ink">What this note will not do</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>It does not decide free zone status.</li>
              <li>It does not compute a return, a penalty, or a transfer pricing adjustment.</li>
              <li>It does not replace the FTA, DIFC, ADGM, or Ministry texts linked from the credentials section.</li>
            </ul>
          </section>
          <p>
            For a scoped conversation, use the{' '}
            <Link to="/#briefing" className="font-semibold text-blue">
              executive briefing form
            </Link>
            . Submitting it stores a request. It does not open an engagement.
          </p>
        </article>
      </Shell>
    </>
  )
}
