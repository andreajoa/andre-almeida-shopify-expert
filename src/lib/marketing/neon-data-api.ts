export const MARKETING_DATA_API_URL = "https://ep-weathered-frog-a6q20598.apirest.us-west-2.aws.neon.tech/neondb/rest/v1"

export type RpcPayload = Record<string, unknown>

type VercelRequestContext = {
  headers?: Record<string, string | undefined>
}

const VERCEL_REQUEST_CONTEXT = Symbol.for("@vercel/request-context")

function cleanToken(value: string | null | undefined) {
  return String(value || "").trim()
}

function runtimeOidcToken() {
  try {
    const runtime = globalThis as unknown as Record<symbol, { get?: () => VercelRequestContext } | undefined>
    return cleanToken(runtime[VERCEL_REQUEST_CONTEXT]?.get?.()?.headers?.["x-vercel-oidc-token"])
  } catch {
    return ""
  }
}

/**
 * Resolve the Vercel OIDC token from the runtime request context first.
 * Vercel rotates OIDC credentials, so request-context credentials must take
 * precedence over request headers and environment fallbacks.
 */
export function vercelDataToken(headers?: Headers | null) {
  return (
    runtimeOidcToken() ||
    cleanToken(headers?.get("x-vercel-oidc-token")) ||
    cleanToken(process.env.VERCEL_OIDC_TOKEN)
  )
}

async function dataApiRequest(fn: string, payload: RpcPayload, token: string) {
  return fetch(`${MARKETING_DATA_API_URL}/rpc/${fn}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  })
}

export async function marketingRpc<T = unknown>(fn: string, payload: RpcPayload, bearerToken?: string | null): Promise<T> {
  let token = cleanToken(bearerToken) || vercelDataToken()
  if (!token) throw new Error(`Marketing data API ${fn} missing server OIDC token`)

  let response = await dataApiRequest(fn, payload, token)

  // If a caller handed us an older token, prefer the current runtime token and
  // retry exactly once. This prevents a rotated Vercel OIDC token from turning
  // lead capture/dashboard requests into intermittent 5xx failures.
  if (response.status === 401 || response.status === 403) {
    const currentRuntimeToken = vercelDataToken()
    if (currentRuntimeToken && currentRuntimeToken !== token) {
      token = currentRuntimeToken
      response = await dataApiRequest(fn, payload, token)
    }
  }

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
