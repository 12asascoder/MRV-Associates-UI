import type { IntakeKind } from '../lib/intake'

export const offices = {
  dubai: 'Level 24, Boulevard Plaza Tower 1, Downtown Dubai',
  abuDhabi: 'Al Maryah Island, Abu Dhabi Global Market (ADGM)',
}

export const registration = {
  tan: '28028312',
  auditor: 'MOEC-AUD-892131',
}

export type PracticeArea = {
  slug: string
  title: string
  summary: string
  footer: string
  icon: 'file' | 'trend' | 'receipt' | 'landmark' | 'shield' | 'link'
  domain: string
  covers: string[]
  note: string
  transactionSlug?: string
}

export const practiceAreas: PracticeArea[] = [
  {
    slug: 'corporate-tax',
    title: 'Corporate Tax & FTA Strategy',
    summary:
      'Full-lifecycle advisory for Federal Decree-Law No. 47: Qualifying Free Zone Person (QFZP) determinations, corporate tax registration, TP master & local documentation, and FTA audit defense.',
    footer: 'FTA Registered Agents',
    icon: 'file',
    domain: 'Corporate Tax & QFZP Regime',
    covers: [
      'Corporate tax positions under Federal Decree-Law No. 47 of 2022.',
      'Qualifying Free Zone Person determinations and the conditions that sit around qualifying income.',
      'Corporate tax registration and return-readiness workpapers.',
      'Transfer pricing master file and local file documentation.',
      'Representation support where a filing is examined by the Federal Tax Authority.',
    ],
    note: 'Scope, documents, and any filing position are agreed in an engagement letter. Nothing on this page is itself a tax opinion.',
    transactionSlug: 'fintech-qfzp',
  },
  {
    slug: 'ma-advisory',
    title: 'M&A Advisory & Valuation',
    summary:
      'Financial, tax, and regulatory due-diligence for high-stakes capital transactions, DCF/market multiples valuation, capital restructuring, and post-merger integration across GCC & Europe.',
    footer: 'Buy & Sell-side Mandates',
    icon: 'trend',
    domain: 'M&A Advisory & Valuation',
    covers: [
      'Financial, tax, and regulatory due diligence on buy-side and sell-side mandates.',
      'Valuation work using discounted cash flow and market-multiples approaches.',
      'Capital restructuring analysis alongside the transaction timetable.',
      'Post-merger integration support across GCC and European holding chains.',
    ],
    note: 'Valuations on this site are not opinions of value. A bank-ready report is produced only under a scoped engagement.',
  },
  {
    slug: 'vat',
    title: 'VAT & Indirect Tax Management',
    summary:
      'Precision UAE VAT compliance: Health-checks, automated return filing, cross-border supply chain indirect tax analysis, and resolution of disputed administrative penalties.',
    footer: 'Penalty Mitigation Support',
    icon: 'receipt',
    domain: 'VAT & Indirect Tax',
    covers: [
      'UAE VAT health-checks against Federal Decree-Law No. 8 of 2017 and its executive decisions.',
      'Return preparation and filing support.',
      'Cross-border supply-chain indirect tax analysis.',
      'Work on disputed administrative penalties, including voluntary disclosure where that route is appropriate.',
    ],
    note: 'Penalty outcomes depend on the facts, the filing history, and the authority’s decision. This page does not promise a reduction.',
    transactionSlug: 'supply-chain-fta',
  },
  {
    slug: 'family-governance',
    title: 'DIFC / ADGM Family Governance',
    summary:
      'Structuring robust asset preservation vehicles: DIFC Foundations, ADGM Special Purpose Vehicles (SPVs), family constitutions, and multi-generational cross-border succession covenants.',
    footer: 'Generational Institutional Shield',
    icon: 'landmark',
    domain: 'DIFC / ADGM Family Governance',
    covers: [
      'DIFC foundation structuring for asset preservation.',
      'ADGM special purpose vehicles used in holding and succession plans.',
      'Family constitutions that record how decisions are made across generations.',
      'Cross-border succession covenants coordinated with the tax and regulatory analysis.',
    ],
    note: 'Foundation and SPV registrations are completed with the relevant registrar. This page is not a formation filing.',
    transactionSlug: 'real-estate-holding',
  },
  {
    slug: 'audit',
    title: 'Statutory Audit & Assurance',
    summary:
      'Rigorous IFRS-compliant statutory audits, internal control attestation, forensic investigations, and banking compliance assurance trusted by UAE financial institutions.',
    footer: 'IFRS Standard Compliant',
    icon: 'shield',
    domain: 'Statutory Audit & Assurance',
    covers: [
      'Statutory audits prepared on an IFRS basis.',
      'Internal-control attestation.',
      'Forensic investigation support.',
      'Banking compliance assurance for regulated institutions.',
    ],
    note: 'An audit opinion is issued only after an accepted engagement and the completion of the required procedures.',
  },
  {
    slug: 'digital-assets',
    title: 'Digital Assets & VARA Structuring',
    summary:
      'Specialized advisory for Web3, tokenomics tax treatment, Virtual Assets Regulatory Authority (VARA) license structuring, and crypto treasury balance-sheet accounting.',
    footer: 'Dubai VARA Framework',
    icon: 'link',
    domain: 'Digital Assets & VARA',
    covers: [
      'Tax treatment analysis for tokenomics and Web3 operating models.',
      'Structuring support for a Virtual Assets Regulatory Authority licence application.',
      'Balance-sheet accounting for crypto treasury holdings.',
      'Coordination of the tax, accounting, and licensing questions on the same fact pattern.',
    ],
    note: 'VARA licensing decisions are made by the authority. This page does not indicate that a licence has been or will be granted.',
  },
]

export type Transaction = {
  slug: string
  category: string
  reference: string
  title: string
  metric: string
  metricValue: number
  metricKind: 'aed-million' | 'percent' | 'aed-zero'
  caption: string
  practiceSlug: string
}

export const transactions: Transaction[] = [
  {
    slug: 'fintech-qfzp',
    category: 'Fintech & Payments',
    reference: 'DIFC Innovation Hub',
    title: 'Cross-Border IP & QFZP Optimization for Series-D FinTech Unicorn',
    metric: 'AED 14.2M',
    metricValue: 14.2,
    metricKind: 'aed-million',
    caption: 'Annual net relief realized',
    practiceSlug: 'corporate-tax',
  },
  {
    slug: 'real-estate-holding',
    category: 'Family Governance',
    reference: 'ADGM Foundation',
    title: 'Dual ADGM-Mainland Holding Reorganization for AED 1.8B Real Estate Group',
    metric: '100% Ring-Fenced',
    metricValue: 100,
    metricKind: 'percent',
    caption: 'Succession covenants secured',
    practiceSlug: 'family-governance',
  },
  {
    slug: 'supply-chain-fta',
    category: 'Supply Chain',
    reference: 'JAFZA Free Zone',
    title: 'Comprehensive FTA Transfer Pricing Defense & Customs VAT Neutralization',
    metric: 'AED 0',
    metricValue: 0,
    metricKind: 'aed-zero',
    caption: 'Penalty assessment across 3 FTA audits',
    practiceSlug: 'vat',
  },
]

export const metrics = [
  {
    value: 'AED 45B+',
    target: 45,
    prefix: 'AED ',
    suffix: 'B+',
    decimals: 0,
    label: 'Assets advised & structured',
    copy: 'Spanning UAE mainland enterprises, sovereign balance sheets, and cross-border family offices.',
    tone: 'ink' as const,
  },
  {
    value: '99.8%',
    target: 99.8,
    prefix: '',
    suffix: '%',
    decimals: 1,
    label: 'Filing precision score',
    copy: 'Zero penal assessments incurred on primary client returns under Federal Tax Authority mandates.',
    tone: 'emerald' as const,
  },
  {
    value: '480+',
    target: 480,
    prefix: '',
    suffix: '+',
    decimals: 0,
    label: 'Institutional clients',
    copy: 'Active cross-border commercial groups and funds managed under continuous statutory tax assurance.',
    tone: 'ink' as const,
  },
  {
    value: '18+ Yrs',
    target: 18,
    prefix: '',
    suffix: '+ Yrs',
    decimals: 0,
    label: 'UAE market seniority',
    copy: 'Uninterrupted chartered practice in Dubai & Abu Dhabi across regulatory tax shifts.',
    tone: 'ink' as const,
  },
]

export const credentials = [
  {
    title: 'Federal Tax Authority',
    detail: 'FTA Registered Tax Agents',
    href: 'https://tax.gov.ae/',
  },
  {
    title: 'Ministry of Economy',
    detail: 'Registered Auditors (UAE)',
    href: 'https://www.moet.gov.ae/en/',
  },
  {
    title: 'DIFC Academy',
    detail: 'Registered Service Provider',
    href: 'https://www.difc.ae/',
  },
  {
    title: 'ADGM Courts',
    detail: 'Corporate Service Provider',
    href: 'https://www.adgm.com/',
  },
  {
    title: 'ICAEW Chartered',
    detail: 'Authorized Training Employer',
    href: 'https://www.icaew.com/',
  },
  {
    title: 'ACCA Global',
    detail: 'Platinum Approved Partner',
    href: 'https://www.accaglobal.com/',
  },
]

export const advisoryDomains = [
  'Corporate Tax & QFZP Regime',
  'M&A Advisory & Valuation',
  'VAT & Indirect Tax',
  'DIFC / ADGM Family Governance',
  'Statutory Audit & Assurance',
  'Digital Assets & VARA',
]

export const nav = [
  { id: 'practice', label: 'Practice Areas' },
  { id: 'transactions', label: 'Transactions' },
  { id: 'edge', label: 'Institutional Edge' },
  { id: 'credentials', label: 'Credentials' },
]

export const footerColumns = [
  {
    title: 'Advisory & Tax',
    links: [
      { label: 'Corporate Tax Compliance', to: '/services/corporate-tax' },
      { label: 'Qualifying Free Zone Advisory', to: '/services/corporate-tax' },
      { label: 'Transfer Pricing Documentation', to: '/services/corporate-tax#transfer-pricing' },
      { label: 'VAT Audits & Voluntary Disclosure', to: '/services/vat' },
      { label: 'Economic Substance Regulations (ESR)', to: '/services/corporate-tax#esr' },
      { label: 'Ultimate Beneficial Ownership (UBO)', to: '/services/corporate-tax#ubo' },
    ],
  },
  {
    title: 'Corporate Finance',
    links: [
      { label: 'Mergers & Acquisitions (M&A)', to: '/services/ma-advisory' },
      { label: 'Business Valuations', to: '/services/ma-advisory#valuation' },
      { label: 'DIFC / ADGM Foundation Setup', to: '/services/family-governance' },
      { label: 'VARA Virtual Asset Structuring', to: '/services/digital-assets' },
      { label: 'Statutory IFRS Auditing', to: '/services/audit' },
      { label: 'Due Diligence Reporting', to: '/services/ma-advisory#diligence' },
    ],
  },
  {
    title: 'Institutional',
    links: [
      { label: 'About Our Partners', to: '/about' },
      { label: 'Careers (ACA / ICAEW)', to: '/careers' },
      { label: 'Fiscal Insights Dispatch', to: '/insights' },
      { label: 'Press & Media Statements', to: '/press' },
      { label: 'Client Secure Vault', to: '/vault' },
      { label: 'Whistleblower Governance', to: '/whistleblower' },
    ],
  },
]

export const legalLinks = [
  { label: 'DIFC Data Protection Policy', to: '/legal/data-protection' },
  { label: 'Terms of Engagement', to: '/legal/terms' },
  { label: 'Regulatory Disclaimer', to: '/legal/disclaimer' },
  { label: 'Anti-Money Laundering (AML)', to: '/legal/aml' },
]

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; id?: string }
  | { type: 'ul'; items: string[] }

export type Article = {
  path: string
  eyebrow: string
  title: string
  lede: string
  blocks: ArticleBlock[]
}

export const articles: Record<string, Article> = {
  about: {
    path: '/about',
    eyebrow: 'Institutional',
    title: 'About our partners',
    lede: 'MRV Associates is a UAE chartered accountancy and multidisciplinary tax advisory practice. This page stays inside the description the firm publishes. It does not add partner biographies that the firm has not named.',
    blocks: [
      {
        type: 'p',
        text: 'The practice describes itself as registered with the UAE Ministry of Economy and the Federal Tax Authority. The footer of this site publishes Tax Agency Number (TAN) 28028312 and auditor licence MOEC-AUD-892131. Those identifiers should be confirmed with the relevant authority before they are relied upon.',
      },
      {
        type: 'p',
        text: 'Senior directors are described as veteran chartered accountants, former Big-4 partners, and corporate attorneys. The firm’s published position is that this background is used on multi-tier holding structures, transfer pricing files, valuations, and statutory audit opinions.',
      },
      {
        type: 'h2',
        text: 'Where the work is done',
      },
      {
        type: 'ul',
        items: [
          `Dubai headquarters: ${offices.dubai}.`,
          `Abu Dhabi office: ${offices.abuDhabi}.`,
          'Briefings are offered as a 45-minute session, in a DIFC office or as an encrypted virtual meeting.',
        ],
      },
      {
        type: 'p',
        text: 'A conversation with the firm begins through the confidential briefing form. Submitting that form records a request on this website’s intake endpoint. It does not open an engagement.',
      },
    ],
  },
  vault: {
    path: '/vault',
    eyebrow: 'Institutional',
    title: 'Client secure vault',
    lede: 'This public website does not host a client login, a document room, or a vault password.',
    blocks: [
      {
        type: 'p',
        text: 'Document exchange is arranged after an engagement is accepted and, where the matter requires it, after a mutual non-disclosure agreement. There is no username or password to enter on this page, and no control here will pretend to authenticate you.',
      },
      {
        type: 'p',
        text: 'If you need a briefing before that room exists, use the consultation form. If a room has already been issued to you, open the address your engagement team sent. Do not send documents through the public briefing form.',
      },
    ],
  },
  'data-protection': {
    path: '/legal/data-protection',
    eyebrow: 'Legal',
    title: 'DIFC data protection policy',
    lede: 'The firm describes client engagements as governed by Dubai International Financial Centre privacy standards. This page explains what this website itself does with information you type into it.',
    blocks: [
      {
        type: 'h2',
        text: 'What this website stores',
      },
      {
        type: 'p',
        text: 'Briefing requests, career notes, dispatch sign-ups, press enquiries, and whistleblower reports are sent to this site’s intake endpoint at /api/intake. A successful response means the submission was appended to a local intake record on the machine running the site, together with a reference number and the time it was received.',
      },
      {
        type: 'p',
        text: 'The endpoint does not send email, does not call a regulator, and does not place the information into a separate client vault. Do not include information you are not prepared to store in that local record.',
      },
      {
        type: 'h2',
        text: 'What an engagement would change',
      },
      {
        type: 'p',
        text: 'The marketing copy on the consultation panel says engagements are protected under a non-disclosure agreement and governed by DIFC privacy standards. That protection starts when an engagement is actually opened, not when a website form is stored. Ask for the NDA before discussing a live transaction in detail.',
      },
    ],
  },
  terms: {
    path: '/legal/terms',
    eyebrow: 'Legal',
    title: 'Terms of engagement',
    lede: 'Using this website does not create a client relationship, a duty of care, or an instruction to act before a regulator.',
    blocks: [
      {
        type: 'p',
        text: 'Pages, case figures, and the corporate tax simulator are published so a reader can understand the firm’s described practice. They are not an engagement letter. Work begins only when both sides accept a written scope.',
      },
      {
        type: 'p',
        text: 'The simulator applies an illustration of the 0% and 9% corporate tax schedule. It is not a return, an assessment, or advice on a Qualifying Free Zone Person position. Read the regulatory disclaimer before you rely on any figure.',
      },
      {
        type: 'ul',
        items: [
          'Do not send privileged or material non-public information through a public form.',
          'Credentials, licence numbers, and transaction figures are the firm’s published website content and should be verified independently where a decision depends on them.',
          'External links leave this site and are governed by the destination.',
        ],
      },
    ],
  },
  disclaimer: {
    path: '/legal/disclaimer',
    eyebrow: 'Legal',
    title: 'Regulatory disclaimer',
    lede: 'Nothing on this website is an official determination of the Federal Tax Authority, the DIFC, the ADGM, the Ministry of Economy, VARA, or any other authority.',
    blocks: [
      {
        type: 'p',
        text: 'Corporate tax in the UAE is imposed under Federal Decree-Law No. 47 of 2022 and the decisions issued under it. The widely published schedule is 0% on taxable income up to AED 375,000 and 9% above that threshold. Qualifying Free Zone Persons may have a 0% rate on qualifying income if the statutory conditions are met. Those conditions include substance, qualifying activities, and a de minimis test. Confirm the current text at tax.gov.ae before acting.',
      },
      {
        type: 'p',
        text: 'The simulator’s de minimis panel is an illustration. The statutory test is generally described as non-qualifying revenue not exceeding the lower of 5% of total revenue and AED 5 million. The panel also shows the verified state from the reference design when the qualifying activity rate is at least 70% and non-qualifying profit is within AED 5 million. That second screen is wider than the 5% test. It is labelled so it is not mistaken for an FTA clearance.',
      },
      {
        type: 'p',
        text: 'Registration claims on this site — FTA registered tax agent, Ministry of Economy auditor licence, DIFC and ADGM affiliations, ICAEW authorised training employer, and ACCA platinum approved partner — are reproduced from the firm’s own pages. Verify them with the authority named on each credential before you treat them as current.',
      },
    ],
  },
  aml: {
    path: '/legal/aml',
    eyebrow: 'Legal',
    title: 'Anti-money laundering',
    lede: 'MRV Associates describes its practice as subject to UAE anti-money laundering obligations. This page is a public statement of approach. It is not a compliance certificate.',
    blocks: [
      {
        type: 'p',
        text: 'Before an engagement is accepted, the firm expects to identify the client, the beneficial ownership of the entity or foundation, and the purpose of the instruction. Work that cannot be understood, or that would require the firm to misstate a filing, is not accepted.',
      },
      {
        type: 'p',
        text: 'A website form is not a customer due diligence file. Do not upload identity documents here. If you need to raise a concern about conduct connected to the firm, use the whistleblower page. That page stores a report on the same intake endpoint and explains the limit of what the endpoint does.',
      },
      {
        type: 'ul',
        items: [
          'Federal Tax Authority: tax.gov.ae',
          'DIFC: difc.ae',
          'ADGM: adgm.com',
          'Ministry of Economy & Tourism: moet.gov.ae',
        ],
      },
    ],
  },
}

export type FormField = {
  name: string
  label: string
  type: 'text' | 'email' | 'textarea' | 'select'
  required?: boolean
  placeholder?: string
  options?: string[]
  autoComplete?: string
}

export type FormPage = {
  kind: IntakeKind
  eyebrow: string
  title: string
  lede: string
  intro: string[]
  fields: FormField[]
  submitLabel: string
  successTitle: string
  successBody: string
}

export const formPages: Record<string, FormPage> = {
  careers: {
    kind: 'career',
    eyebrow: 'Careers',
    title: 'ACA and ICAEW pathways',
    lede: 'The firm publishes itself as an ICAEW authorised training employer. This form records an expression of interest. It does not create an application file with ICAEW or ACCA.',
    intro: [
      'Tell us the pathway you are pursuing and a short note on the work you want to do. A partner or hiring lead can only respond if someone reviews the stored record outside this website. The endpoint itself does not send email.',
    ],
    fields: [
      { name: 'name', label: 'Full name', type: 'text', required: true, autoComplete: 'name', placeholder: 'Your name' },
      { name: 'email', label: 'Email address', type: 'email', required: true, autoComplete: 'email', placeholder: 'name@email.com' },
      {
        name: 'pathway',
        label: 'Pathway',
        type: 'select',
        required: true,
        options: ['ACA / ICAEW', 'ACCA', 'Qualified hire', 'Other'],
      },
      {
        name: 'note',
        label: 'Note',
        type: 'textarea',
        placeholder: 'Qualification stage, office preference, or the practice you want to join.',
      },
    ],
    submitLabel: 'Record career interest',
    successTitle: 'Interest recorded',
    successBody:
      'The intake endpoint stored this note and issued the reference below. No email has been sent, and no training contract has been opened.',
  },
  insights: {
    kind: 'dispatch',
    eyebrow: 'Fiscal Insights',
    title: 'Fiscal Insights Dispatch',
    lede: 'A written note on UAE corporate tax, free zone status, and regulatory change. Joining the list records your address on this site. It does not send the first issue by itself.',
    intro: [
      'Use a corporate address if you have one. You can ask for the address to be removed by writing again through the press form with the subject “Remove dispatch address” and the reference you receive here.',
    ],
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true, autoComplete: 'name', placeholder: 'Your name' },
      {
        name: 'email',
        label: 'Email address',
        type: 'email',
        required: true,
        autoComplete: 'email',
        placeholder: 'name@enterprise.ae',
      },
      {
        name: 'interest',
        label: 'Primary interest',
        type: 'select',
        required: true,
        options: advisoryDomains,
      },
    ],
    submitLabel: 'Record dispatch address',
    successTitle: 'Address recorded',
    successBody:
      'The address is stored on the intake endpoint under the reference below. A dispatch has not been emailed.',
  },
  press: {
    kind: 'press',
    eyebrow: 'Press',
    title: 'Press and media statements',
    lede: 'Media enquiries are recorded here. The firm does not publish a general inbox on this site, and this form does not send a message to a newsroom.',
    intro: [
      'Include the outlet, the deadline, and the question. If the matter concerns a client, the firm will not comment on a confidential instruction.',
    ],
    fields: [
      { name: 'name', label: 'Your name', type: 'text', required: true, autoComplete: 'name' },
      { name: 'email', label: 'Email address', type: 'email', required: true, autoComplete: 'email' },
      { name: 'outlet', label: 'Outlet', type: 'text', required: true, placeholder: 'Publication or broadcaster' },
      {
        name: 'enquiry',
        label: 'Enquiry',
        type: 'textarea',
        required: true,
        placeholder: 'Deadline, question, and whether the request is for background or for attribution.',
      },
    ],
    submitLabel: 'Record media enquiry',
    successTitle: 'Enquiry recorded',
    successBody:
      'The intake endpoint stored this enquiry. It has not been forwarded to a mailbox. Keep the reference if you follow up.',
  },
  whistleblower: {
    kind: 'whistleblower',
    eyebrow: 'Governance',
    title: 'Whistleblower governance',
    lede: 'Use this page to record a concern about conduct connected to MRV Associates. The report is stored on the website intake endpoint. Submitting it does not notify a regulator.',
    intro: [
      'You may leave your name blank. Write enough for the concern to be understood. Do not include passwords, identity-document images, or a client’s confidential files.',
      'Where the concern belongs with an authority, contact that authority through the channel it publishes. Official sites are linked from the credentials section and the AML page.',
    ],
    fields: [
      { name: 'name', label: 'Name (optional)', type: 'text', placeholder: 'Leave blank if you prefer' },
      { name: 'email', label: 'Email (optional)', type: 'email', placeholder: 'Only if you want a reply path' },
      {
        name: 'report',
        label: 'Report',
        type: 'textarea',
        required: true,
        placeholder: 'What happened, when, and who inside the firm it concerns.',
      },
    ],
    submitLabel: 'Record governance report',
    successTitle: 'Report recorded',
    successBody:
      'The report is stored on this site’s intake endpoint under the reference below. A regulator has not been notified by this action.',
  },
}
