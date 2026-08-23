export const MARKETING_DATA_API_URL = "https://ep-weathered-frog-a6q20598.apirest.us-west-2.aws.neon.tech/neondb/rest/v1"

export type RpcPayload = Record<string, unknown>

export function vercelDataToken(headers: Headers) {
  return headers.get("x-vercel-oidc-token") || process.env.VERCEL_OIDC_TOKEN || ""
}

export async function marketingRpc<T = unknown>(fn: string, payload: RpcPayload, bearerToken?: string | null): Promise<T> {
  const token = bearerToken || process.env.VERCEL_OIDC_TOKEN || ""
  if (!token) throw new Error(`Marketing data API ${fn} missing server OIDC token`)

  const response = await fetch(`${MARKETING_DATA_API_URL}/rpc/${fn}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  })

  const text = await response.text()
  let data: unknown = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text
  }

  if (!response.ok) {
    throw new Error(`Marketing data API ${fn} failed (${response.status}): ${typeof data === "string" ? data : JSON.stringify(data)}`)
  }

  return data as T
}

export function safeMarketingLocale(value?: string | null) {
  return value?.toLowerCase().startsWith("en") ? "en-US" : "pt-BR"
}
