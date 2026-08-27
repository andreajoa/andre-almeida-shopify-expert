declare global {
  interface Window {
    gtag?: (
      command: "event",
      action: string,
      params?: Record<string, string | number | undefined>
    ) => void
  }
}

export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window === "undefined" || !window.gtag) return

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
