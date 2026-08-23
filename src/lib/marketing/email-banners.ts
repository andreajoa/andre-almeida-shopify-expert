import { EMAIL_BANNER_01, EMAIL_BANNER_02 } from "@/lib/marketing/email-assets/banner-set-1"
import { EMAIL_BANNER_03, EMAIL_BANNER_04 } from "@/lib/marketing/email-assets/banner-set-2"
import { EMAIL_BANNER_05, EMAIL_BANNER_06 } from "@/lib/marketing/email-assets/banner-set-3"

export const EMAIL_BANNERS = [
  EMAIL_BANNER_01,
  EMAIL_BANNER_02,
  EMAIL_BANNER_03,
  EMAIL_BANNER_04,
  EMAIL_BANNER_05,
  EMAIL_BANNER_06,
] as const

export function emailBannerForSequence(index: number) {
  return EMAIL_BANNERS[(Math.max(1, index) - 1) % EMAIL_BANNERS.length]
}
