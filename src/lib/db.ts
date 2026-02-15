import { promises as fs } from "fs"
import path from "path"

interface ContactMessage {
  id: string; name: string; email: string; phone: string; company: string; serviceType: string; budget: string; message: string; locale: string; createdAt: string
}

const DB_PATH = path.join(process.cwd(), "data", "messages.json")

async function ensureDb() {
  const dir = path.dirname(DB_PATH)
  try { await fs.access(dir) } catch { await fs.mkdir(dir, { recursive: true }) }
  try { await fs.access(DB_PATH) } catch { await fs.writeFile(DB_PATH, "[]") }
}

export async function getMessages(): Promise<ContactMessage[]> {
  await ensureDb()
  const data = await fs.readFile(DB_PATH, "utf-8")
  return JSON.parse(data)
}

export async function saveMessage(msg: Omit<ContactMessage, "id" | "createdAt">): Promise<ContactMessage> {
  await ensureDb()
  const messages = await getMessages()
  const newMsg: ContactMessage = { ...msg, id: `msg_${Date.now()}`, createdAt: new Date().toISOString() }
  messages.unshift(newMsg)
  await fs.writeFile(DB_PATH, JSON.stringify(messages, null, 2))
  return newMsg
}
