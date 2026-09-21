import { readFile } from "node:fs/promises"
import path from "node:path"

export const runtime = "nodejs"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ index: string }> },
) {
  const { index } = await params
  const parsed = Number.parseInt(index, 10)

  if (!Number.isFinite(parsed) || parsed < 1 || parsed > 6) {
    return new Response("Not found", { status: 404 })
  }

  // parsed is a validated integer in 1..6, so the path cannot be traversed.
  const filename = `banner-${String(parsed).padStart(2, "0")}.jpg`
  const filePath = path.join(
    process.cwd(),
    "public",
    "email",
    "banners",
    "v3",
    filename,
  )

  try {
    const file = await readFile(filePath)

    // Mail clients (Gmail image proxy, Outlook) fetch <img> without following
    // redirects reliably, so the bytes are returned inline instead of a 3xx.
    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Length": String(file.byteLength),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch {
    return new Response("Not found", { status: 404 })
  }
}
