export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string
  company: string
  serviceType: string
  budget: string
  message: string
  locale: string
  createdAt: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  readTime: string
  image: string
  relatedService: string
  relatedServiceLink: string
}

export interface TimeSlot {
  time: string
  available: boolean
}

export type Locale = "en" | "pt-BR" | "es"
export type Currency = "USD" | "BRL" | "EUR"
