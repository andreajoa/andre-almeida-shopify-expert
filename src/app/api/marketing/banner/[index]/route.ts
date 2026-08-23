import { EMAIL_BANNERS } from "@/lib/marketing/email-banners"

export const runtime = "nodejs"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ index: string }> },
) {
  const { index } = await params
  const parsed = Number.parseInt(index, 10)

  if (!Number.isFinite(parsed) || parsed < 1 || parsed > EMAIL_BANNERS.length) {
    return new Response("Not found", { status: 404 })
  }

  const image = Buffer.from(EMAIL_BANNERS[parsed - 1], "base64")

  return new Response(image, {
    status: 200,
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Length": String(image.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  })
}
