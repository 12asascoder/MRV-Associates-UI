import fs from 'node:fs'
import path from 'node:path'
import { randomBytes } from 'node:crypto'
import type { IncomingMessage, ServerResponse } from 'node:http'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'

type IntakeFields = Record<string, string>

type IntakeBody = {
  kind?: string
  website?: string
  openedAt?: number
  fields?: IntakeFields
}

const KINDS = new Set(['briefing', 'career', 'dispatch', 'press', 'whistleblower'])

const REQUIRED: Record<string, string[]> = {
  briefing: ['name', 'email', 'entity', 'domain'],
  career: ['name', 'email', 'pathway'],
  dispatch: ['email'],
  press: ['name', 'email', 'outlet', 'enquiry'],
  whistleblower: ['report'],
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    let size = 0
    req.on('data', (chunk: Buffer) => {
      size += chunk.length
      if (size > 32_000) {
        reject(new Error('Payload too large'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

function send(res: ServerResponse, status: number, body: unknown) {
  if (res.writableEnded) return
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

function clean(value: string) {
  let result = ''
  for (const char of value) {
    const code = char.charCodeAt(0)
    if (code === 9 || code === 10 || code === 13 || code >= 32) result += char
  }
  return result.trim()
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 160
}

function intakePlugin(): Plugin {
  const hits = new Map<string, number[]>()

  const handle = async (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === 'OPTIONS') {
      send(res, 204, {})
      return
    }
    if (req.method !== 'POST') {
      send(res, 405, { ok: false, error: 'Use POST for this intake endpoint.' })
      return
    }

    const ip = req.socket.remoteAddress ?? 'local'
    const now = Date.now()
    const recent = (hits.get(ip) ?? []).filter((stamp) => now - stamp < 10 * 60 * 1000)
    if (recent.length >= 8) {
      send(res, 429, {
        ok: false,
        error: 'Too many submissions from this connection. Wait a few minutes and try again.',
      })
      return
    }

    let parsed: IntakeBody
    try {
      parsed = JSON.parse(await readBody(req)) as IntakeBody
    } catch {
      send(res, 400, { ok: false, error: 'The intake endpoint could not read this request.' })
      return
    }

    if (typeof parsed.website === 'string' && parsed.website.trim() !== '') {
      send(res, 400, { ok: false, error: 'The request could not be accepted.' })
      return
    }

    if (typeof parsed.openedAt !== 'number' || now - parsed.openedAt < 1200 || parsed.openedAt > now + 5000) {
      send(res, 400, {
        ok: false,
        error: 'Review the form briefly before dispatching the request.',
      })
      return
    }

    const kind = parsed.kind ?? ''
    if (!KINDS.has(kind)) {
      send(res, 400, { ok: false, error: 'Unknown submission type.' })
      return
    }

    const source = parsed.fields ?? {}
    const fields: IntakeFields = {}
    for (const [key, value] of Object.entries(source)) {
      if (typeof value !== 'string' || key.length > 40) continue
      fields[key] = clean(value).slice(0, 4000)
    }

    for (const key of REQUIRED[kind] ?? []) {
      if (!fields[key]) {
        send(res, 400, { ok: false, error: `Missing required field: ${key}.` })
        return
      }
    }

    const emailKeys = ['email']
    for (const key of emailKeys) {
      if (fields[key] && !validEmail(fields[key])) {
        send(res, 400, { ok: false, error: 'Enter a valid email address.' })
        return
      }
    }

    const reference = `MNV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${randomBytes(3).toString('hex').toUpperCase()}`
    const record = {
      reference,
      kind,
      fields,
      receivedAt: new Date().toISOString(),
    }

    try {
      const directory = path.resolve(process.cwd(), 'data')
      fs.mkdirSync(directory, { recursive: true })
      fs.appendFileSync(path.join(directory, 'intake.jsonl'), `${JSON.stringify(record)}\n`, 'utf8')
    } catch {
      send(res, 500, {
        ok: false,
        error: 'The intake endpoint could not store this request. Nothing was accepted.',
      })
      return
    }

    recent.push(now)
    hits.set(ip, recent)
    send(res, 200, {
      ok: true,
      reference,
      receivedAt: record.receivedAt,
    })
  }

  return {
    name: 'MNV-intake',
    configureServer(server) {
      server.middlewares.use('/api/intake', (req, res) => {
        void handle(req, res)
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/intake', (req, res) => {
        void handle(req, res)
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), intakePlugin()],
})
