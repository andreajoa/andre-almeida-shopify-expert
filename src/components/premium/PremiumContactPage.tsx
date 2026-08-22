"use client"

import { FormEvent, useMemo, useState } from "react"
import Link from "next/link"
import { useLocale } from "next-intl"
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Check, Mail, MessageCircle } from "lucide-react"
import { getAvailableDates, getAvailableSlots } from "@/data/scheduling"
import { Analytics } from "@/lib/analytics"
import { SITE_CONFIG } from "@/lib/constants"

type SendState = "idle" | "sending" | "success" | "error"

const copy = {
  "pt-BR": {
    eyebrow: "CONTATO",
    title: "Conte o que você quer construir.",
    intro: "Você pode falar comigo diretamente pelo WhatsApp ou enviar os detalhes pelo formulário. As mensagens do formulário são encaminhadas para meu e-mail.",
    whatsapp: "Falar comigo no WhatsApp",
    emailLabel: "E-mail",
    formTab: "Enviar projeto",
    scheduleTab: "Agendar conversa",
    name: "Nome", email: "E-mail", phone: "Telefone / WhatsApp", company: "Empresa", service: "O que você precisa?", budget: "Faixa de investimento", message: "Conte sobre o projeto",
    services: ["Website para estabelecimento", "E-commerce próprio", "Shopify / E-commerce", "CRM e automação", "Growth e conversão", "IA e integrações", "Outro"],
    budgets: ["Ainda estou avaliando", "Até R$ 5 mil", "R$ 5 mil – R$ 10 mil", "R$ 10 mil – R$ 25 mil", "R$ 25 mil+"],
    privacy: "Autorizo o uso destes dados somente para retorno sobre meu contato.",
    submit: "Enviar para André", sending: "Enviando...", success: "Mensagem enviada e encaminhada por e-mail.", error: "Não foi possível confirmar o envio por e-mail. Use o WhatsApp abaixo ou tente novamente.",
    scheduleTitle: "Escolha uma data e um horário",
    scheduleText: "Depois de selecionar, informe seus dados. O agendamento também será enviado ao meu e-mail.",
    selected: "Horário selecionado", scheduleSubmit: "Confirmar conversa", scheduleSuccess: "Conversa registrada. Você receberá o retorno pelos dados informados.",
    back: "Voltar", previous: "Mês anterior", next: "Próximo mês",
    sideTitle: "Prefere ir direto ao ponto?", sideText: "O botão abaixo abre uma conversa comigo no WhatsApp com uma mensagem pronta sobre seu projeto.",
    response: "Canal direto para projetos e propostas.",
  },
  en: {
    eyebrow: "CONTACT",
    title: "Tell me what you want to build.",
    intro: "You can talk to me directly on WhatsApp or send the project details through the form. Form submissions are forwarded to my email.",
    whatsapp: "Talk to me on WhatsApp",
    emailLabel: "Email",
    formTab: "Send project",
    scheduleTab: "Schedule a call",
    name: "Name", email: "Email", phone: "Phone / WhatsApp", company: "Company", service: "What do you need?", budget: "Investment range", message: "Tell me about the project",
    services: ["Business website", "Owned ecommerce", "Shopify / Ecommerce", "CRM and automation", "Growth and conversion", "AI and integrations", "Other"],
    budgets: ["Still evaluating", "Up to US$ 1k", "US$ 1k – US$ 2k", "US$ 2k – US$ 5k", "US$ 5k+"],
    privacy: "I authorize the use of this data only to respond to my inquiry.",
    submit: "Send to Andre", sending: "Sending...", success: "Message sent and confirmed by email delivery service.", error: "Email delivery could not be confirmed. Use WhatsApp below or try again.",
    scheduleTitle: "Choose a date and time",
    scheduleText: "After selecting a slot, enter your details. The booking will also be sent to my email.",
    selected: "Selected time", scheduleSubmit: "Confirm conversation", scheduleSuccess: "Conversation registered. I will follow up using the details provided.",
    back: "Back", previous: "Previous month", next: "Next month",
    sideTitle: "Want to go straight to the point?", sideText: "The button below opens a WhatsApp conversation with me and a pre-filled project message.",
    response: "Direct channel for projects and proposals.",
  },
} as const

const inputClass = "w-full border-b border-[#c9c1b4] bg-transparent px-0 py-3 text-sm text-[#11110f] outline-none transition placeholder:text-[#9b958b] focus:border-[#11110f]"
const labelClass = "block text-[9px] font-semibold uppercase tracking-[0.14em] text-[#777168]"

export function PremiumContactPage() {
  const locale = useLocale() as "pt-BR" | "en"
  const lang = locale === "en" ? "en" : "pt-BR"
  const c = copy[lang]
  const [tab, setTab] = useState<"form" | "schedule">("form")
  const [state, setState] = useState<SendState>("idle")
  const [scheduleState, setScheduleState] = useState<SendState>("idle")
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", serviceType: "", budget: "", message: "", privacy: false })
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [scheduleForm, setScheduleForm] = useState({ name: "", email: "", phone: "", company: "", about: "" })

  const dates = useMemo(() => getAvailableDates(year, month), [year, month])
  const slots = useMemo(() => selectedDate ? getAvailableSlots(selectedDate).filter(slot => slot.available) : [], [selectedDate])
  const monthLabel = new Intl.DateTimeFormat(lang === "pt-BR" ? "pt-BR" : "en-US", { month: "long", year: "numeric" }).format(new Date(year, month, 1))
  const whatsappText = encodeURIComponent(lang === "pt-BR" ? "Olá André, vi seu site e quero conversar sobre um projeto." : "Hi Andre, I saw your website and want to discuss a project.")
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappText}`

  async function sendPayload(payload: Record<string, unknown>) {
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || !data.success) throw new Error(data.error || "Delivery failed")
    return data
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setState("sending")
    try {
      await sendPayload({ ...form, locale: lang, type: "contact" })
      Analytics.contactFormSubmit()
      setState("success")
    } catch {
      setState("error")
    }
  }

  async function handleSchedule(event: FormEvent) {
    event.preventDefault()
    if (!selectedDate || !selectedTime) return
    setScheduleState("sending")
    try {
      await sendPayload({
        ...scheduleForm,
        serviceType: lang === "pt-BR" ? "Conversa sobre projeto" : "Project conversation",
        budget: "",
        message: `${scheduleForm.about}\n\nDate: ${selectedDate}\nTime: ${selectedTime}`,
        locale: lang,
        type: "scheduled-call",
        selectedDate,
        selectedTime,
      })
      Analytics.callScheduled()
      setScheduleState("success")
    } catch {
      setScheduleState("error")
    }
  }

  function changeMonth(delta: number) {
    const next = new Date(year, month + delta, 1)
    setYear(next.getFullYear())
    setMonth(next.getMonth())
    setSelectedDate(null)
    setSelectedTime(null)
  }

  return (
    <div className="min-h-screen bg-[#f2efe8] pt-20 text-[#11110f]">
      <section className="border-b border-[#d4cec2] py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a7658]">{c.eyebrow}</p>
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.68fr_0.32fr] lg:items-end">
            <h1 className="max-w-5xl font-editorial text-[clamp(3.7rem,7vw,7.2rem)] leading-[0.88] tracking-[-0.055em]">{c.title}</h1>
            <p className="max-w-xl text-base leading-8 text-[#625e56]">{c.intro}</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.66fr_0.34fr] lg:gap-20 lg:px-10 xl:px-14">
          <div>
            <div className="mb-10 flex border-b border-[#cfc8bc]">
              <button type="button" onClick={() => setTab("form")} className={`relative min-h-12 px-5 text-[10px] font-semibold uppercase tracking-[0.13em] ${tab === "form" ? "text-[#11110f]" : "text-[#8b857a]"}`}>{c.formTab}{tab === "form" ? <span className="absolute inset-x-0 bottom-0 h-px bg-[#11110f]" /> : null}</button>
              <button type="button" onClick={() => setTab("schedule")} className={`relative min-h-12 px-5 text-[10px] font-semibold uppercase tracking-[0.13em] ${tab === "schedule" ? "text-[#11110f]" : "text-[#8b857a]"}`}>{c.scheduleTab}{tab === "schedule" ? <span className="absolute inset-x-0 bottom-0 h-px bg-[#11110f]" /> : null}</button>
            </div>

            {tab === "form" ? (
              state === "success" ? (
                <div className="border border-[#c9c1b4] bg-[#e7e2d8] p-8 sm:p-12"><Check className="h-8 w-8 text-[#8a7658]" /><h2 className="mt-7 font-editorial text-4xl">{c.success}</h2><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-3 border-b border-[#11110f] pb-2 text-[10px] font-semibold uppercase tracking-[0.14em]">{c.whatsapp}<ArrowUpRight className="h-4 w-4" /></a></div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid gap-8 sm:grid-cols-2"><div><label className={labelClass}>{c.name} *</label><input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} /></div><div><label className={labelClass}>{c.email} *</label><input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputClass} /></div></div>
                  <div className="grid gap-8 sm:grid-cols-2"><div><label className={labelClass}>{c.phone}</label><input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={inputClass} /></div><div><label className={labelClass}>{c.company}</label><input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className={inputClass} /></div></div>
                  <div className="grid gap-8 sm:grid-cols-2"><div><label className={labelClass}>{c.service} *</label><select required value={form.serviceType} onChange={e => setForm({ ...form, serviceType: e.target.value })} className={inputClass}><option value="">—</option>{c.services.map(item => <option key={item} value={item}>{item}</option>)}</select></div><div><label className={labelClass}>{c.budget}</label><select value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} className={inputClass}><option value="">—</option>{c.budgets.map(item => <option key={item} value={item}>{item}</option>)}</select></div></div>
                  <div><label className={labelClass}>{c.message} *</label><textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className={`${inputClass} resize-none`} /></div>
                  <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-[#746f66]"><input required type="checkbox" checked={form.privacy} onChange={e => setForm({ ...form, privacy: e.target.checked })} className="mt-1" />{c.privacy}</label>
                  {state === "error" ? <p role="alert" className="border-l-2 border-[#a34d3c] pl-4 text-sm leading-6 text-[#7d4035]">{c.error}</p> : null}
                  <button disabled={state === "sending"} className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#11110f] px-7 text-[10px] font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-60 sm:w-auto">{state === "sending" ? c.sending : c.submit}<ArrowUpRight className="h-4 w-4" /></button>
                </form>
              )
            ) : (
              <div>
                <h2 className="font-editorial text-4xl tracking-[-0.035em]">{c.scheduleTitle}</h2><p className="mt-4 max-w-xl text-sm leading-7 text-[#68635b]">{c.scheduleText}</p>
                {scheduleState === "success" ? <div className="mt-10 border border-[#c9c1b4] bg-[#e7e2d8] p-8"><Check className="h-7 w-7 text-[#8a7658]" /><p className="mt-5 font-editorial text-3xl">{c.scheduleSuccess}</p></div> : (
                  <>
                    <div className="mt-10 border-y border-[#cec7ba] py-5"><div className="flex items-center justify-between"><button type="button" onClick={() => changeMonth(-1)} aria-label={c.previous} className="p-2"><ArrowLeft className="h-4 w-4" /></button><p className="text-sm font-semibold capitalize">{monthLabel}</p><button type="button" onClick={() => changeMonth(1)} aria-label={c.next} className="p-2"><ArrowRight className="h-4 w-4" /></button></div><div className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-7">{dates.slice(0, 21).map(date => { const d = new Date(`${date}T12:00:00`); return <button type="button" key={date} onClick={() => { setSelectedDate(date); setSelectedTime(null) }} className={`min-h-14 border text-xs transition ${selectedDate === date ? "border-[#11110f] bg-[#11110f] text-white" : "border-[#cec7ba] hover:border-[#11110f]"}`}><span className="block text-[8px] uppercase text-current/60">{new Intl.DateTimeFormat(lang === "pt-BR" ? "pt-BR" : "en-US", { weekday: "short" }).format(d)}</span><span className="mt-1 block font-semibold">{d.getDate()}</span></button>})}</div></div>
                    {selectedDate ? <div className="mt-7 flex flex-wrap gap-2">{slots.map(slot => <button type="button" key={slot.time} onClick={() => setSelectedTime(slot.time)} className={`min-h-11 border px-5 text-xs ${selectedTime === slot.time ? "border-[#11110f] bg-[#11110f] text-white" : "border-[#cec7ba]"}`}>{slot.time}</button>)}</div> : null}
                    {selectedDate && selectedTime ? <form onSubmit={handleSchedule} className="mt-10 space-y-7 border-t border-[#cec7ba] pt-8"><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#8a7658]">{c.selected}: {selectedDate} · {selectedTime}</p><div className="grid gap-7 sm:grid-cols-2"><div><label className={labelClass}>{c.name} *</label><input required value={scheduleForm.name} onChange={e => setScheduleForm({ ...scheduleForm, name: e.target.value })} className={inputClass} /></div><div><label className={labelClass}>{c.email} *</label><input required type="email" value={scheduleForm.email} onChange={e => setScheduleForm({ ...scheduleForm, email: e.target.value })} className={inputClass} /></div></div><div className="grid gap-7 sm:grid-cols-2"><div><label className={labelClass}>{c.phone} *</label><input required value={scheduleForm.phone} onChange={e => setScheduleForm({ ...scheduleForm, phone: e.target.value })} className={inputClass} /></div><div><label className={labelClass}>{c.company}</label><input value={scheduleForm.company} onChange={e => setScheduleForm({ ...scheduleForm, company: e.target.value })} className={inputClass} /></div></div><div><label className={labelClass}>{c.message} *</label><textarea required rows={4} value={scheduleForm.about} onChange={e => setScheduleForm({ ...scheduleForm, about: e.target.value })} className={`${inputClass} resize-none`} /></div>{scheduleState === "error" ? <p role="alert" className="text-sm text-[#7d4035]">{c.error}</p> : null}<button disabled={scheduleState === "sending"} className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[#11110f] px-7 text-[10px] font-semibold uppercase tracking-[0.14em] text-white"><Calendar className="h-4 w-4" />{scheduleState === "sending" ? c.sending : c.scheduleSubmit}</button></form> : null}
                  </>
                )}
              </div>
            )}
          </div>

          <aside className="lg:border-l lg:border-[#d4cec2] lg:pl-10 xl:pl-14">
            <div className="sticky top-28 bg-[#11110f] p-7 text-white sm:p-9"><p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#c7b18d]">DIRECT CONTACT</p><h2 className="mt-6 font-editorial text-4xl leading-[0.98] tracking-[-0.04em]">{c.sideTitle}</h2><p className="mt-5 text-sm leading-7 text-white/55">{c.sideText}</p><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => Analytics.whatsappClick("contact_side")} className="mt-8 flex min-h-14 items-center justify-between rounded-full bg-[#f2efe8] px-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#11110f]"><span className="flex items-center gap-3"><MessageCircle className="h-4 w-4" />{c.whatsapp}</span><ArrowUpRight className="h-4 w-4" /></a><div className="mt-8 border-t border-white/15 pt-6"><p className="flex items-center gap-3 text-xs text-white/60"><Mail className="h-4 w-4 text-[#c7b18d]" />{SITE_CONFIG.email}</p><p className="mt-4 text-[9px] uppercase tracking-[0.13em] text-white/35">{c.response}</p></div></div>
          </aside>
        </div>
      </section>
    </div>
  )
}
