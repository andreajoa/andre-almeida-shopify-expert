import { NextResponse } from "next/server"
import { getMessages } from "@/lib/db"

export async function GET() {
  try {
    const messages = await getMessages()
    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json({ error: "Failed to load" }, { status: 500 })
  }
}
