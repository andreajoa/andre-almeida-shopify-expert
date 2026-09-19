export async function GET(
  request: Request,
  { params }: { params: Promise<{ index: string }> },
) {
  const { index } = await params
  const parsed = Number.parseInt(index, 10)

  if (!Number.isFinite(parsed) || parsed < 1 || parsed > 6) {
    return new Response("Not found", { status: 404 })
  }

  const filename = `banner-${String(parsed).padStart(2, "0")}.jpg`
  const target = new URL(`/email/banners/v3/${filename}`, request.url)

  return Response.redirect(target, 307)
}
