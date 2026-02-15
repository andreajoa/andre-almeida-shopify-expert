import { NextRequest, NextResponse } from "next/server"

// Store messages in memory (resets on deploy, but we get notifications)
const messages: any[] = []

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const msg = {
      id: `msg_${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      company: data.company || "",
      serviceType: data.serviceType || "",
      budget: data.budget || "",
      message: data.message,
      locale: data.locale || "en",
      date: data.selectedDate || "",
      time: data.selectedTime || "",
      type: data.type || "contact",
      createdAt: new Date().toISOString(),
    }

    // Save in memory
    messages.unshift(msg)

    // Log to Vercel (visible in Vercel Dashboard > Logs)
    console.log("📩 NEW CONTACT MESSAGE:", JSON.stringify(msg, null, 2))

    // Send WhatsApp notification (opens link for you)
    // You'll see this in Vercel logs too
    console.log(`📱 WhatsApp: https://wa.me/5511992598585?text=${encodeURIComponent(
      `🔔 New Lead!\nName: ${msg.name}\nEmail: ${msg.email}\nPhone: ${msg.phone}\nService: ${msg.serviceType}\nBudget: ${msg.budget}\nMessage: ${msg.message}`
    )}`)

    return NextResponse.json({ success: true, id: msg.id })
  } catch (error) {
    console.error("Contact error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// GET - View all messages (your private dashboard)
export async function GET(req: NextRequest) {
  const authKey = req.headers.get("x-auth-key")
  const urlKey = req.nextUrl.searchParams.get("key")
  
  // Simple auth - change this key to something only you know
  if (authKey !== "andre2025" && urlKey !== "andre2025") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({ 
    total: messages.length,
    messages 
  })
}
