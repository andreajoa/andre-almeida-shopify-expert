import { NextRequest, NextResponse } from "next/server"
import { saveMessage } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }
    const saved = await saveMessage({
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      company: data.company || "",
      serviceType: data.serviceType || "",
      budget: data.budget || "",
      message: data.message,
      locale: data.locale || "en",
    })
    return NextResponse.json({ success: true, id: saved.id })
  } catch (error) {
    console.error("Contact error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
