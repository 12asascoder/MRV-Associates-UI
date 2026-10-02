import { Link } from 'react-router-dom'
import { footerColumns, legalLinks, registration } from '../content/site'

export function Footer() {
  return (
    <footer className="bg-navy text-[#b7c3d8]">
      <div className="mx-auto grid max-w-[1160px] gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1fr] lg:px-8 lg:py-20">
        <div>
          <p className="flex items-center gap-2.5 text-[15px] tracking-[0.16em] text-white">
            <span className="font-bold">MNV</span>
            <span className="h-3.5 w-px bg-white/30" aria-hidden="true" />
            <span className="font-medium">ASSOCIATES</span>
          </p>
          <p className="mt-5 max-w-xs text-sm leading-6">
            MNV Associates is a leading UAE chartered accountancy and multidisciplinary tax advisory practice registered with the UAE Ministry of Economy and Federal Tax Authority.
          </p>
          <p className="mt-6 text-sm leading-6">
            Tax Agency Number (TAN): {registration.tan}
            <br />
            Auditor License: {registration.auditor}
          </p>
        </div>
        {footerColumns.map((column) => (
          <div key={column.title}>
            <p className="text-[12px] font-semibold tracking-[0.16em] text-white uppercase">{column.title}</p>
            <ul className="mt-5 space-y-3 text-sm">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="link-line text-[#b7c3d8] hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1160px] flex-col gap-4 px-6 py-6 text-xs text-[#8ea0bb] sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 MNV Associates Chartered Accountants. All rights reserved.</p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Legal">
            {legalLinks.map((link) => (
              <Link key={link.to} to={link.to} className="link-line hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
