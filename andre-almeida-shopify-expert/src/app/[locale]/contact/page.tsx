"use client"
import { useState, useMemo } from "react"
import { useTranslations, useLocale } from "next-intl"
import { Mail, MessageCircle, Clock, MapPin, ChevronLeft, ChevronRight, Calendar, Check } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SITE_CONFIG } from "@/lib/constants"
import { getAvailableSlots, getAvailableDates } from "@/data/scheduling"

export default function ContactPage() {
  const t = useTranslations("contact")
  const tSvc = useTranslations("serviceOptions")
  const tBud = useTranslations("budgetOptions")
  const locale = useLocale()
  const [formState, setFormState] = useState<"idle"|"sending"|"success"|"error">("idle")
  const [formData, setFormData] = useState({ name:"",email:"",phone:"",company:"",serviceType:"",budget:"",message:"",privacy:false })
  const [tab, setTab] = useState<"form"|"schedule">("form")
  const [calMonth, setCalMonth] = useState(new Date().getMonth())
  const [calYear, setCalYear] = useState(new Date().getFullYear())
  const [selectedDate, setSelectedDate] = useState<string|null>(null)
  const [selectedTime, setSelectedTime] = useState<string|null>(null)
  const [scheduleState, setScheduleState] = useState<"idle"|"success">("idle")

  const availDates = useMemo(() => getAvailableDates(calYear, calMonth), [calYear, calMonth])
  const timeSlots = useMemo(() => selectedDate ? getAvailableSlots(selectedDate) : [], [selectedDate])

  const monthNames: Record<string, string[]> = {
    en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    "pt-BR": ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
    es: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
  }
  const dayNames: Record<string, string[]> = {
    en: ["Mon","Tue","Wed","Thu","Fri"],
    "pt-BR": ["Seg","Ter","Qua","Qui","Sex"],
    es: ["Lun","Mar","Mié","Jue","Vie"],
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, locale }),
      })
      if (res.ok) setFormState("success")
      else setFormState("error")
    } catch { setFormState("error") }
  }

  const handleSchedule = async () => {
    if (!selectedDate || !selectedTime) return
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Call Booking",
        email: "booking@schedule",
        phone: "",
        company: "",
        serviceType: "scheduled-call",
        budget: "",
        message: `Call scheduled for ${selectedDate} at ${selectedTime}`,
        locale,
      }),
    })
    setScheduleState("success")
  }

  const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y-1) } else setCalMonth(m => m-1) }
  const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y+1) } else setCalMonth(m => m+1) }

  const svcOptions = ["sd","hh","sm","ca","po","sa","fa","ta","cro","em","lp","ig","ac","au","ai","ot"]
  const budOptions = ["u2","2_5","5_10","10_25","25p","ns"]

  return (
    <div className="pt-24">
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("title")}</h1>
            <p className="text-lg text-slate-400">{t("subtitle")}</p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-5 gap-12">
            <AnimatedSection className="lg:col-span-3">
              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                <button onClick={() => setTab("form")} className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all cursor-pointer ${tab==="form" ? "bg-indigo-600 text-white" : "bg-white/5 text-slate-400 hover:bg-white/10"}`}>
                  <Mail className="w-4 h-4 inline mr-2" />{t("submit")}
                </button>
                <button onClick={() => setTab("schedule")} className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all cursor-pointer ${tab==="schedule" ? "bg-indigo-600 text-white" : "bg-white/5 text-slate-400 hover:bg-white/10"}`}>
                  <Calendar className="w-4 h-4 inline mr-2" />{t("orSchedule")}
                </button>
              </div>

              {tab === "form" ? (
                <Card variant="gradient">
                  {formState === "success" ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-emerald-400" /></div>
                      <p className="text-white text-lg font-medium">{t("success")}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        <div><label className="block text-sm font-medium text-slate-300 mb-2">{t("name")} *</label>
                          <input type="text" required value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} placeholder={t("namePh")} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" /></div>
                        <div><label className="block text-sm font-medium text-slate-300 mb-2">{t("email")} *</label>
                          <input type="email" required value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} placeholder={t("emailPh")} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" /></div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-5">
                        <div><label className="block text-sm font-medium text-slate-300 mb-2">{t("phone")}</label>
                          <input type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} placeholder={t("phonePh")} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" /></div>
                        <div><label className="block text-sm font-medium text-slate-300 mb-2">{t("company")}</label>
                          <input type="text" value={formData.company} onChange={e=>setFormData({...formData,company:e.target.value})} placeholder={t("companyPh")} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" /></div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-5">
                        <div><label className="block text-sm font-medium text-slate-300 mb-2">{t("service")} *</label>
                          <select required value={formData.serviceType} onChange={e=>setFormData({...formData,serviceType:e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none">
                            <option value="" className="bg-slate-900">{t("servicePh")}</option>
                            {svcOptions.map(o => <option key={o} value={o} className="bg-slate-900">{tSvc(o)}</option>)}
                          </select></div>
                        <div><label className="block text-sm font-medium text-slate-300 mb-2">{t("budget")}</label>
                          <select value={formData.budget} onChange={e=>setFormData({...formData,budget:e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none">
                            <option value="" className="bg-slate-900">{t("budgetPh")}</option>
                            {budOptions.map(o => <option key={o} value={o} className="bg-slate-900">{tBud(o)}</option>)}
                          </select></div>
                      </div>
                      <div><label className="block text-sm font-medium text-slate-300 mb-2">{t("message")} *</label>
                        <textarea required rows={5} value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})} placeholder={t("messagePh")} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none" /></div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" required checked={formData.privacy} onChange={e=>setFormData({...formData,privacy:e.target.checked})} className="mt-1 w-4 h-4 rounded" />
                        <span className="text-sm text-slate-400">{t("privacy")}</span>
                      </label>
                      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={formState==="sending"}>
                        {formState==="sending" ? t("sending") : t("submit")}
                      </Button>
                    </form>
                  )}
                </Card>
              ) : (
                <Card variant="gradient">
                  {scheduleState === "success" ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-emerald-400" /></div>
                      <p className="text-white text-lg font-medium">{t("scheduleSuccess")}</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Calendar */}
                      <div>
                        <h3 className="text-white font-medium mb-4">{t("selectDate")}</h3>
                        <div className="flex items-center justify-between mb-4">
                          <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 cursor-pointer"><ChevronLeft className="w-5 h-5" /></button>
                          <span className="text-white font-medium">{(monthNames[locale] || monthNames.en)[calMonth]} {calYear}</span>
                          <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 cursor-pointer"><ChevronRight className="w-5 h-5" /></button>
                        </div>
                        <div className="grid grid-cols-5 gap-2 mb-2">
                          {(dayNames[locale] || dayNames.en).map(d => <div key={d} className="text-center text-xs text-slate-500 py-1">{d}</div>)}
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                          {availDates.slice(0,20).map(date => {
                            const day = parseInt(date.split("-")[2])
                            const isSelected = selectedDate === date
                            return (
                              <button key={date} onClick={() => { setSelectedDate(date); setSelectedTime(null) }}
                                className={`py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${isSelected ? "bg-indigo-600 text-white" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}>
                                {day}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Time Slots */}
                      {selectedDate && (
                        <div>
                          <h3 className="text-white font-medium mb-4">{t("selectTime")}</h3>
                          <div className="grid grid-cols-2 gap-3">
                            {timeSlots.map(slot => (
                              <button key={slot.time} disabled={!slot.available}
                                onClick={() => slot.available && setSelectedTime(slot.time)}
                                className={`py-3 rounded-xl text-sm font-medium transition-all ${
                                  !slot.available ? "bg-red-500/10 text-red-400/50 cursor-not-allowed line-through" :
                                  selectedTime === slot.time ? "bg-indigo-600 text-white cursor-pointer" :
                                  "bg-white/5 text-slate-300 hover:bg-white/10 cursor-pointer"
                                }`}>
                                {slot.time} {!slot.available ? `(${t("booked")})` : ""}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedDate && selectedTime && (
                        <Button onClick={handleSchedule} variant="primary" size="lg" className="w-full">
                          {t("scheduleCall")} — {selectedDate} {selectedTime}
                        </Button>
                      )}
                    </div>
                  )}
                </Card>
              )}
            </AnimatedSection>

            {/* Sidebar */}
            <AnimatedSection delay={0.2} className="lg:col-span-2 space-y-6">
              <Card variant="glass">
                <h3 className="text-lg font-bold text-white mb-6">{t("info")}</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3"><Mail className="w-5 h-5 text-indigo-400 mt-0.5" /><div><p className="text-sm text-slate-500">{t("email" as any)}</p><a href={`mailto:${SITE_CONFIG.email}`} className="text-white hover:text-indigo-400 transition-colors">{SITE_CONFIG.email}</a></div></div>
                  <div className="flex items-start gap-3"><MessageCircle className="w-5 h-5 text-emerald-400 mt-0.5" /><div><p className="text-sm text-slate-500">WhatsApp</p><a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-white hover:text-emerald-400 transition-colors">+55 11 99259-8585</a></div></div>
                  <div className="flex items-start gap-3"><Clock className="w-5 h-5 text-purple-400 mt-0.5" /><div><p className="text-sm text-slate-500">{t("responseTime")}</p><p className="text-white">{t("responseValue")}</p></div></div>
                  <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-orange-400 mt-0.5" /><div><p className="text-sm text-slate-500">{t("location")}</p><p className="text-white">{t("locationValue")}</p><p className="text-slate-500 text-sm">{t("international")}</p></div></div>
                </div>
              </Card>
              <Card variant="glass">
                <h3 className="text-lg font-bold text-white mb-6">{t("faq")}</h3>
                <div className="space-y-4">
                  {["1","2","3"].map(n => (
                    <div key={n}><p className="text-sm font-medium text-white mb-1">{t(`q${n}`)}</p><p className="text-sm text-slate-400">{t(`a${n}`)}</p></div>
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
