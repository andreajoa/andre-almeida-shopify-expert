"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Mail, MessageCircle, Clock, MapPin, Calendar, ChevronDown } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SITE_CONFIG } from "@/lib/constants"

export default function ContactPage() {
  const t = useTranslations()
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "",
    serviceType: "", niche: "", budget: "", message: "", privacy: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("sending")
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500))
    setFormState("success")
  }

  const serviceOptions = [
    "storeDev", "headless", "migration", "customApps", "performance",
    "audit", "facebookAds", "tiktokAds", "cro", "email",
    "landingPages", "instagram", "adCreatives", "automation", "ai", "other",
  ]

  const budgetOptions = ["under2k", "2k5k", "5k10k", "10k25k", "25kPlus", "notSure"]

  return (
    <div className="pt-24">
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("contact.title")}</h1>
            <p className="text-lg text-slate-400">{t("contact.subtitle")}</p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <AnimatedSection className="lg:col-span-3">
              <Card variant="gradient">
                {formState === "success" ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">✅</div>
                    <p className="text-white text-lg font-medium">{t("contact.form.success")}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">{t("contact.form.name")} *</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder={t("contact.form.namePlaceholder")} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">{t("contact.form.email")} *</label>
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder={t("contact.form.emailPlaceholder")} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">{t("contact.form.phone")}</label>
                        <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder={t("contact.form.phonePlaceholder")} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">{t("contact.form.company")}</label>
                        <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder={t("contact.form.companyPlaceholder")} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">{t("contact.form.serviceType")} *</label>
                        <select required value={formData.serviceType} onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none">
                          <option value="" className="bg-slate-900">{t("contact.form.serviceTypePlaceholder")}</option>
                          {serviceOptions.map((opt) => (
                            <option key={opt} value={opt} className="bg-slate-900">{t(`contact.serviceOptions.${opt}`)}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">{t("contact.form.budget")}</label>
                        <select value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none">
                          <option value="" className="bg-slate-900">{t("contact.form.budgetPlaceholder")}</option>
                          {budgetOptions.map((opt) => (
                            <option key={opt} value={opt} className="bg-slate-900">{t(`contact.budgetOptions.${opt}`)}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">{t("contact.form.message")} *</label>
                      <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder={t("contact.form.messagePlaceholder")} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none" />
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" required checked={formData.privacy} onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })} className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-indigo-500" />
                      <span className="text-sm text-slate-400">{t("contact.form.privacy")}</span>
                    </label>

                    <Button type="submit" variant="primary" size="lg" className="w-full" disabled={formState === "sending"}>
                      {formState === "sending" ? t("contact.form.sending") : t("contact.form.submit")}
                    </Button>
                  </form>
                )}
              </Card>
            </AnimatedSection>

            {/* Sidebar */}
            <AnimatedSection delay={0.2} className="lg:col-span-2 space-y-6">
              <Card variant="glass">
                <h3 className="text-lg font-bold text-white mb-6">{t("contact.info.title")}</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-indigo-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-500">{t("contact.info.email")}</p>
                      <a href={`mailto:${SITE_CONFIG.email}`} className="text-white hover:text-indigo-400 transition-colors">{SITE_CONFIG.email}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-500">{t("contact.info.whatsapp")}</p>
                      <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-white hover:text-emerald-400 transition-colors">+55 11 99259-8585</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-500">{t("contact.info.responseTime")}</p>
                      <p className="text-white">{t("contact.info.responseValue")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-500">{t("contact.info.location")}</p>
                      <p className="text-white">{t("contact.info.locationValue")}</p>
                      <p className="text-slate-500 text-sm">{t("contact.info.international")}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* FAQ */}
              <Card variant="glass">
                <h3 className="text-lg font-bold text-white mb-6">{t("contact.faq.title")}</h3>
                <div className="space-y-4">
                  {["1", "2", "3", "4"].map((n) => (
                    <div key={n}>
                      <p className="text-sm font-medium text-white mb-1">{t(`contact.faq.q${n}`)}</p>
                      <p className="text-sm text-slate-400">{t(`contact.faq.a${n}`)}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
