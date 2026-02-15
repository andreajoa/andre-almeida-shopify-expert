export const SITE_CONFIG = {
  name: "Andre Almeida",
  url: "https://andre-almeida.online",
  whatsapp: "5511992598585",
  email: "contact@andre-almeida.online",
}

export const PRICES: Record<string, Record<string, { min: number; max: number }>> = {
  "store-development": {
    BRL: { min: 1800, max: 5500 },
    USD: { min: 800, max: 2500 },
    EUR: { min: 750, max: 2300 },
  },
  "headless-hydrogen": {
    BRL: { min: 5500, max: 15000 },
    USD: { min: 2500, max: 6000 },
    EUR: { min: 2300, max: 5500 },
  },
  "store-migration": {
    BRL: { min: 1200, max: 4500 },
    USD: { min: 600, max: 2000 },
    EUR: { min: 550, max: 1800 },
  },
  "custom-apps": {
    BRL: { min: 2500, max: 9000 },
    USD: { min: 1200, max: 4000 },
    EUR: { min: 1100, max: 3700 },
  },
  "performance": {
    BRL: { min: 800, max: 2500 },
    USD: { min: 400, max: 1200 },
    EUR: { min: 350, max: 1100 },
  },
  "store-audit": {
    BRL: { min: 400, max: 1200 },
    USD: { min: 200, max: 500 },
    EUR: { min: 180, max: 450 },
  },
  "ads-management": {
    BRL: { min: 1200, max: 3500 },
    USD: { min: 500, max: 1500 },
    EUR: { min: 450, max: 1400 },
  },
  "cro": {
    BRL: { min: 1500, max: 4000 },
    USD: { min: 600, max: 1800 },
    EUR: { min: 550, max: 1600 },
  },
  "email-marketing": {
    BRL: { min: 1000, max: 3000 },
    USD: { min: 500, max: 1500 },
    EUR: { min: 450, max: 1400 },
  },
  "landing-pages": {
    BRL: { min: 600, max: 1800 },
    USD: { min: 300, max: 800 },
    EUR: { min: 280, max: 750 },
  },
  "redesign": {
    BRL: { min: 3000, max: 8000 },
    USD: { min: 1500, max: 3500 },
    EUR: { min: 1400, max: 3200 },
  },
  "brand-identity": {
    BRL: { min: 1500, max: 4000 },
    USD: { min: 700, max: 2000 },
    EUR: { min: 650, max: 1800 },
  },
  "automation": {
    BRL: { min: 1200, max: 4500 },
    USD: { min: 600, max: 2000 },
    EUR: { min: 550, max: 1800 },
  },
  "ai-integration": {
    BRL: { min: 2500, max: 8000 },
    USD: { min: 1200, max: 3500 },
    EUR: { min: 1100, max: 3200 },
  },
}

export function formatPrice(amount: number, currency: string): string {
  const config: Record<string, { locale: string; curr: string }> = {
    BRL: { locale: "pt-BR", curr: "BRL" },
    USD: { locale: "en-US", curr: "USD" },
    EUR: { locale: "es-ES", curr: "EUR" },
  }
  const c = config[currency] || config.USD
  return new Intl.NumberFormat(c.locale, {
    style: "currency",
    currency: c.curr,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getCurrencyForLocale(locale: string): string {
  if (locale === "pt-BR") return "BRL"
  if (locale === "es") return "EUR"
  return "USD"
}
