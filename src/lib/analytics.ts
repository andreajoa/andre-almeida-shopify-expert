type GtagEventParams = {
  event_category: string
  event_label?: string
  value?: number
}

type GtagFunction = (
  command: "event",
  action: string,
  params: GtagEventParams
) => void

declare global {
  interface Window {
    gtag?: GtagFunction
  }
}

export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window === "undefined") return
  if (!window.gtag) return

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  })
}

export const Analytics = {
  whatsappClick: (source: string) =>
    trackEvent("click", "WhatsApp", source),

  callScheduled: () =>
    trackEvent("schedule", "Call", "contact_page"),

  ctaClick: (label: string) =>
    trackEvent("click", "CTA", label),

  contactFormSubmit: () =>
    trackEvent("submit", "Contact_Form", "contact_page"),
}
