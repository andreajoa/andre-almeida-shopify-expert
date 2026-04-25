export interface Service {
  id: string
  category: string
  titleKey: string
  descriptionKey: string
  icon: string
  features: string[]
  priceRange: {
    min: number
    max: number
    currency: string
    period?: string
  }
  timeline: string
  ctaKey: string
}

export interface Project {
  id: string
  title: string
  niche: string
  nicheKey: string
  challenge: string
  solution: string[]
  technologies: string[]
  results: string[]
  images: string[]
  featured: boolean
  link?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar?: string
}

export interface BlogPost {
  id: string
  slug: string
  titleKey: string
  excerptKey: string
  category: string
  date: string
  readTime: string
  image: string
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  serviceType: string
  niche?: string
  budget: string
  message: string
  privacyAccepted: boolean
}

export type Locale = 'en' | 'pt-BR'
export type Currency = 'USD' | 'BRL' | 'GBP' | 'CAD' | 'AUD'
