import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IntakeForm } from '../components/IntakeForm'
import { Meta } from '../components/Meta'
import { Shell } from '../components/Reveal'
import { articles, formPages } from '../content/site'

function Frame({ eyebrow, title, lede, children }: { eyebrow: string; title: string; lede: string; children: ReactNode }) {
  return (
    <>
      <section className="border-b border-line bg-mist">
        <Shell className="py-16 lg:py-20">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight font-medium text-ink sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate">{lede}</p>
        </Shell>
      </section>
      <Shell className="grid gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr]">{children}</Shell>
    </>
  )
}

export function ArticlePage({ id }: { id: string }) {
  const article = articles[id]
  if (!article) return null
  return (
    <>
      <Meta title={`${article.title} | MRV Associates`} description={article.lede} />
      <Frame eyebrow={article.eyebrow} title={article.title} lede={article.lede}>
        <article className="space-y-6 text-[15px] leading-7 text-[#314158]">
          {article.blocks.map((block, index) => {
            if (block.type === 'h2') {
              return (
                <h2 key={block.text} id={block.id} className="pt-2 font-serif text-3xl font-medium text-ink">
                  {block.text}
                </h2>
              )
            }
            if (block.type === 'ul') {
              return (
                <ul key={index} className="list-disc space-y-2 pl-5">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )
            }
            return <p key={index}>{block.text}</p>
          })}
          <Link to="/#briefing" className="inline-block font-semibold text-blue">
            Schedule a briefing
          </Link>
        </article>
        <aside className="h-fit rounded-2xl border border-line bg-mist p-6 text-sm leading-6 text-slate">
          <p className="font-mono text-[10px] tracking-[0.16em] text-blue uppercase">Verify</p>
          <p className="mt-3">
            Licence numbers and affiliations on this site are the firm’s published text. Confirm them with the authority named on the credential before you rely on them.
          </p>
          <Link to="/legal/disclaimer" className="mt-4 inline-block font-semibold text-blue">
            Regulatory disclaimer
          </Link>
        </aside>
      </Frame>
    </>
  )
}

export function FormPageView({ id }: { id: string }) {
  const page = formPages[id]
  if (!page) return null
  return (
    <>
      <Meta title={`${page.title} | MRV Associates`} description={page.lede} />
      <Frame eyebrow={page.eyebrow} title={page.title} lede={page.lede}>
        <div className="space-y-4 text-[15px] leading-7 text-[#314158]">
          {page.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <IntakeForm page={page} />
      </Frame>
    </>
  )
}

export function LegalPage() {
  const { slug } = useParams()
  const article = slug ? articles[slug] : undefined
  if (!article) {
    return (
      <Shell className="py-24">
        <h1 className="font-serif text-4xl">Page not found</h1>
      </Shell>
    )
  }
  return <ArticlePage id={slug ?? ''} />
}

export function NotFound() {
  return (
    <Shell className="py-24">
      <Meta title="Page not found | MRV Associates" description="This address is not part of the MRV Associates site." />
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-serif text-5xl font-medium">This page is not on the site.</h1>
      <Link to="/" className="mt-6 inline-block font-semibold text-blue">
        Return home
      </Link>
    </Shell>
  )
}
