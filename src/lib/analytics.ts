/* eslint-disable @typescript-eslint/no-explicit-any */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window === "undefined") return
  if (!(window as any).gtag) return

  ;(window as any).gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
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
