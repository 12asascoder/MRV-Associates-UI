export type IntakeKind = 'briefing' | 'career' | 'dispatch' | 'press' | 'whistleblower'

export type IntakeResult = {
  reference: string
  receivedAt: string
}

export async function submitIntake(
  kind: IntakeKind,
  fields: Record<string, string>,
  openedAt: number,
  honeypot: string,
): Promise<IntakeResult> {
  let response: Response
  try {
    response = await fetch('/api/intake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, fields, openedAt, website: honeypot }),
    })
  } catch {
    throw new Error('The intake endpoint could not be reached. The request was not recorded.')
  }

  const data = (await response.json().catch(() => null)) as
    | { ok?: boolean; reference?: string; receivedAt?: string; error?: string }
    | null

  if (!response.ok || !data?.ok || !data.reference || !data.receivedAt) {
    throw new Error(data?.error || 'The intake endpoint did not accept this request. Nothing was recorded.')
  }

  return { reference: data.reference, receivedAt: data.receivedAt }
}
