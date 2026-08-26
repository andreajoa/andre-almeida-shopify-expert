import "server-only"
import { Resend } from "resend"

const ENDPOINT = process.env.RESEND_WEBHOOK_ENDPOINT || "https://andre-almeida.online/api/webhooks/resend"
const EVENTS = [
  "email.scheduled","email.sent","email.delivered","email.delivery_delayed","email.opened",
  "email.clicked","email.bounced","email.complained","email.failed","email.suppressed",
]

let cachedSecret = ""

function itemsFrom(value: unknown): Array<Record<string, unknown>> {
  if (!value || typeof value !== "object") return []
  const obj = value as Record<string, unknown>
  const list = Array.isArray(obj.data) ? obj.data : Array.isArray(value) ? value : []
  return list.filter((v): v is Record<string, unknown> => Boolean(v) && typeof v === "object")
}

export async function ensureResendWebhook() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { ok:false as const, reason:"RESEND_API_KEY missing", secret:"" }
  try {
    const headers = { Authorization:`Bearer ${apiKey}`, "Content-Type":"application/json" }
    const listResponse = await fetch("https://api.resend.com/webhooks", { headers, cache:"no-store" })
    const listJson = listResponse.ok ? await listResponse.json() as unknown : null
    let hook = itemsFrom(listJson).find(item => String(item.endpoint || "") === ENDPOINT)

    if (!hook) {
      const created = await fetch("https://api.resend.com/webhooks", {
        method:"POST", headers,
        body:JSON.stringify({ endpoint:ENDPOINT, events:EVENTS }),
        cache:"no-store",
      })
      if (!created.ok) return { ok:false as const, reason:`webhook create ${created.status}`, secret:"" }
      hook = await created.json() as Record<string, unknown>
    }

    const id = String(hook.id || "")
    let secret = String(hook.signing_secret || "")
    if (!secret && id) {
      const detail = await fetch(`https://api.resend.com/webhooks/${encodeURIComponent(id)}`, { headers, cache:"no-store" })
      if (detail.ok) {
        const json = await detail.json() as Record<string, unknown>
        secret = String(json.signing_secret || "")
      }
    }
    if (secret) cachedSecret = secret
    return { ok:Boolean(id && secret), id, secret, endpoint:ENDPOINT }
  } catch (error) {
    return { ok:false as const, reason:error instanceof Error ? error.message : "webhook setup failed", secret:"" }
  }
}

export async function verifyResendWebhook(payload: string, headers: { id:string; timestamp:string; signature:string }) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error("RESEND_API_KEY missing")
  let secret = process.env.RESEND_WEBHOOK_SECRET || cachedSecret
  if (!secret) secret = (await ensureResendWebhook()).secret
  if (!secret) throw new Error("Resend webhook signing secret unavailable")
  const resend = new Resend(apiKey)
  return resend.webhooks.verify({ payload, headers, webhookSecret:secret })
}
