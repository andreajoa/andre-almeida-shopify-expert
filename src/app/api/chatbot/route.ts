import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // If OpenAI key is configured, use it
    if (process.env.OPENAI_API_KEY) {
      // OpenAI integration would go here
      return NextResponse.json({
        message: "I'm Andre's AI assistant. How can I help you with your Shopify project today?",
      })
    }

    // Default response without AI
    return NextResponse.json({
      message: "Thanks for your message! For the best experience, please contact us via WhatsApp at +55 11 99259-8585 or schedule a call through our contact page.",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process" }, { status: 500 })
  }
}
