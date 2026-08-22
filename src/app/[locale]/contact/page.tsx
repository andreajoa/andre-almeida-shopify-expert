"use client"

import { useMemo, useState } from "react"
import { useLocale } from "next-intl"
import { ArrowLeft, ArrowRight, Calendar, Check, Mail, MessageCircle } from "lucide-react"
import { getAvailableDates, getAvailableSlots } from "@/data/scheduling"
import { SITE_CONFIG } from "@/lib/constants"
import { Analytics } from "@/lib/analytics"

type FormState = "idle" | "sending" | "success" | "error"

export default function ContactPage() {
  const locale = useLocale()
  const isPt = locale !== "en"
  const lang = isPt ? "pt-BR" : "en"
  const [tab, setTab] = useState<"form" | "schedule">("form")
  const [formState, setFormState] = useState<FormState>("idle")
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", serviceType: "", budget: "", message: "", privacy: false })
  const [calMonth, setCalMonth] = useState(new Date().getMonth())
  const [calYear, setCalYear] = useState(new Date().getFullYear())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [scheduleState, setScheduleState] = useState<"idle" | "details" | "sending" | "success" | "error">("idle")
  const [scheduleData, setScheduleData] = useState({ name: "", email: "", phone: "", company: "", website: "", serviceType: "", about: "" })

  const availableDates = useMemo(() => getAvailableDates(calYear, calMonth), [calYear, calMonth])
  const timeSlots = useMemo(() => selectedDate ? getAvailableSlots(selectedDate) : [], [selectedDate])
  const months = isPt ? ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"] : ["January","February","March","April","May","June","July","August","September","October","November","December"]
  const services = isPt ? ["Website para empresa", "E-commerce próprio", "Shopify", "SEO / GEO / Autoridade", "CRM / Analytics", "E-mail marketing", "Automação / IA", "Venda de livros online", "Outro"] : ["Business website", "Owned ecommerce", "Shopify", "SEO / GEO / Authority", "CRM / Analytics", "Email marketing", "Automation / AI", "Book sales website", "Other"]
  const budgets = isPt ? ["Até R$ 3 mil", "R$ 3 mil – R$ 7 mil", "R$ 7 mil – R$ 15 mil", "R$ 15 mil – R$ 30 mil", "Acima de R$ 30 mil", "Ainda não defini"] : ["Up to $1k", "$1k – $3k", "$3k – $7k", "$7k – $15k", "$15k+", "Not defined yet"]
  const whatsapp = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(isPt ? "Olá André, vi seu site e quero conversar sobre um projeto." : "Hi Andre, I saw your website and want to discuss a project.")}`

  const input = "w-full border-b border-[#cfc8bc] bg-transparent px-0 py-3 text-sm text-[#11110f] placeholder:text-[#99938a] focus:border-[#11110f] focus:outline-none"
  const label = "block text-[9px] font-semibold uppercase tracking-[.15em] text-[#77736b]"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormState("sending")
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...formData, locale: lang, type: "contact" }) })
      if (res.ok) { setFormState("success"); Analytics.contactFormSubmit() } else setFormState("error")
    } catch { setFormState("error") }
  }

  async function handleScheduleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return
    setScheduleState("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: scheduleData.name,
          email: scheduleData.email,
          phone: scheduleData.phone,
          company: scheduleData.company,
          serviceType: scheduleData.serviceType,
          budget: "",
          message: `${isPt ? "CALL AGENDADA" : "SCHEDULED CALL"}\n${isPt ? "Data" : "Date"}: ${selectedDate}\n${isPt ? "Horário" : "Time"}: ${selectedTime}\nWebsite: ${scheduleData.website}\n\n${isPt ? "Sobre o projeto" : "About the project"}:\n${scheduleData.about}`,
          locale: lang,
          type: "scheduled-call",
          selectedDate,
          selectedTime,
        }),
      })
      if (res.ok) { setScheduleState("success"); Analytics.callScheduled() } else setScheduleState("error")
    } catch { setScheduleState("error") }
  }

  const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1) } else setCalMonth(m => m - 1) }
  const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1) } else setCalMonth(m => m + 1) }

  return <main className="bg-[#f2efe8] text-[#11110f]">
    <section className="border-b border-[#d4cec2] px-5 pb-20 pt-36 sm:px-8 md:pb-28 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1500px]"><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#77736b]">{isPt ? "CONTATO · NOVOS PROJETOS" : "CONTACT · NEW PROJECTS"}</p><div className="mt-8 grid gap-12 lg:grid-cols-[.68fr_.32fr] lg:items-end"><h1 className="font-editorial text-[clamp(3.5rem,7vw,7.5rem)] leading-[.88] tracking-[-.05em]">{isPt ? "Conte o que precisa mudar. Eu ajudo a definir" : "Tell me what needs to change. I will help define"} <span className="italic text-[#5f6559]">{isPt ? "o que construir." : "what to build."}</span></h1><div><p className="text-base leading-8 text-[#625e56]">{isPt ? "Você pode enviar os detalhes pelo formulário, escolher um horário para uma conversa ou falar diretamente pelo WhatsApp." : "Send project details through the form, choose a call time or talk directly through WhatsApp."}</p><a href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => Analytics.whatsappClick("contact_hero")} className="mt-7 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#11110f] px-7 text-[10px] font-semibold uppercase tracking-[.14em] text-white"><MessageCircle className="h-4 w-4"/>{isPt ? "Falar no WhatsApp" : "Talk on WhatsApp"}</a></div></div></div></section>

    <section className="px-5 py-20 sm:px-8 md:py-28 lg:px-10 xl:px-14"><div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[.32fr_.68fr] lg:gap-20"><aside><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#77736b]">{isPt ? "ESCOLHA O CANAL" : "CHOOSE A CHANNEL"}</p><div className="mt-8 space-y-2"><button type="button" onClick={() => setTab("form")} className={`flex min-h-14 w-full items-center justify-between border px-5 text-left text-[10px] font-semibold uppercase tracking-[.13em] ${tab === "form" ? "border-[#11110f] bg-[#11110f] text-white" : "border-[#cfc8bc]"}`}><span className="flex items-center gap-3"><Mail className="h-4 w-4"/>{isPt ? "Enviar projeto" : "Send project"}</span><ArrowRight className="h-4 w-4"/></button><button type="button" onClick={() => setTab("schedule")} className={`flex min-h-14 w-full items-center justify-between border px-5 text-left text-[10px] font-semibold uppercase tracking-[.13em] ${tab === "schedule" ? "border-[#11110f] bg-[#11110f] text-white" : "border-[#cfc8bc]"}`}><span className="flex items-center gap-3"><Calendar className="h-4 w-4"/>{isPt ? "Agendar conversa" : "Schedule a call"}</span><ArrowRight className="h-4 w-4"/></button></div><div className="mt-10 border-t border-[#d4cec2] pt-7"><p className="text-[9px] font-semibold uppercase tracking-[.15em] text-[#77736b]">E-mail</p><a href={`mailto:${SITE_CONFIG.email}`} className="mt-2 block font-editorial text-2xl">{SITE_CONFIG.email}</a><p className="mt-7 text-[9px] font-semibold uppercase tracking-[.15em] text-[#77736b]">{isPt ? "Atendimento" : "Service area"}</p><p className="mt-2 text-sm leading-6 text-[#625e56]">{isPt ? "Todo o Brasil · projetos internacionais" : "Brazil · international projects"}</p></div></aside>

      <div>
        {tab === "form" ? <div>{formState === "success" ? <div className="border border-[#cfc8bc] p-10 sm:p-14"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#11110f] text-white"><Check className="h-5 w-5"/></span><h2 className="mt-8 font-editorial text-4xl">{isPt ? "Mensagem recebida." : "Message received."}</h2><p className="mt-4 max-w-xl text-sm leading-7 text-[#625e56]">{isPt ? "Os dados foram enviados pelo formulário. Vou analisar o contexto do projeto antes de responder." : "Your details were submitted. I will review the project context before replying."}</p></div> : <form onSubmit={handleSubmit} className="border-y border-[#d4cec2] py-2"><div className="grid gap-x-8 md:grid-cols-2"><div className="py-5"><label className={label}>{isPt?"Nome":"Name"} *</label><input required className={input} value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} placeholder={isPt?"Seu nome":"Your name"}/></div><div className="py-5"><label className={label}>E-mail *</label><input type="email" required className={input} value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} placeholder="email@empresa.com"/></div><div className="py-5"><label className={label}>{isPt?"Telefone / WhatsApp":"Phone / WhatsApp"}</label><input className={input} value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} placeholder="+55..."/></div><div className="py-5"><label className={label}>{isPt?"Empresa / Marca":"Company / Brand"}</label><input className={input} value={formData.company} onChange={e=>setFormData({...formData,company:e.target.value})}/></div><div className="py-5"><label className={label}>{isPt?"O que você precisa?":"What do you need?"} *</label><select required className={input} value={formData.serviceType} onChange={e=>setFormData({...formData,serviceType:e.target.value})}><option value="">{isPt?"Selecione":"Select"}</option>{services.map(x=><option key={x} value={x}>{x}</option>)}</select></div><div className="py-5"><label className={label}>{isPt?"Faixa de investimento":"Budget range"}</label><select className={input} value={formData.budget} onChange={e=>setFormData({...formData,budget:e.target.value})}><option value="">{isPt?"Selecione":"Select"}</option>{budgets.map(x=><option key={x} value={x}>{x}</option>)}</select></div></div><div className="py-5"><label className={label}>{isPt?"Conte sobre o projeto":"Tell me about the project"} *</label><textarea required rows={6} className={`${input} resize-none`} value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})} placeholder={isPt?"O que você vende, como funciona hoje e o que precisa melhorar?":"What do you sell, how does it work today and what needs to improve?"}/></div><label className="flex items-start gap-3 py-5 text-xs leading-5 text-[#77736b]"><input type="checkbox" required checked={formData.privacy} onChange={e=>setFormData({...formData,privacy:e.target.checked})} className="mt-1"/><span>{isPt ? "Autorizo o uso dessas informações para responder a esta solicitação, conforme a política de privacidade." : "I authorize the use of this information to respond to this request according to the privacy policy."}</span></label>{formState === "error" ? <p className="mb-4 text-sm text-red-700">{isPt ? "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp." : "Could not send right now. Try again or use WhatsApp."}</p> : null}<button type="submit" disabled={formState === "sending"} className="mb-5 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#11110f] px-7 text-[10px] font-semibold uppercase tracking-[.14em] text-white disabled:opacity-50">{formState === "sending" ? (isPt?"Enviando...":"Sending...") : (isPt?"Enviar informações":"Send details")}<ArrowRight className="h-4 w-4"/></button></form>}</div> :
        <div>{scheduleState === "success" ? <div className="border border-[#cfc8bc] p-10 sm:p-14"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#11110f] text-white"><Check className="h-5 w-5"/></span><h2 className="mt-8 font-editorial text-4xl">{isPt ? "Conversa solicitada." : "Call requested."}</h2><p className="mt-4 text-sm leading-7 text-[#625e56]">{selectedDate} · {selectedTime}</p></div> : scheduleState === "details" || scheduleState === "sending" || scheduleState === "error" ? <form onSubmit={handleScheduleSubmit} className="border-y border-[#d4cec2] py-5"><div className="mb-7 flex items-center justify-between border-b border-[#d4cec2] pb-5"><div><p className={label}>{isPt?"Horário escolhido":"Selected time"}</p><p className="mt-2 font-editorial text-2xl">{selectedDate} · {selectedTime}</p></div><button type="button" onClick={()=>setScheduleState("idle")} className="text-[9px] font-semibold uppercase tracking-[.13em] text-[#77736b]">{isPt?"Alterar":"Change"}</button></div><div className="grid gap-x-8 md:grid-cols-2"><div className="py-4"><label className={label}>{isPt?"Nome":"Name"} *</label><input required className={input} value={scheduleData.name} onChange={e=>setScheduleData({...scheduleData,name:e.target.value})}/></div><div className="py-4"><label className={label}>E-mail *</label><input type="email" required className={input} value={scheduleData.email} onChange={e=>setScheduleData({...scheduleData,email:e.target.value})}/></div><div className="py-4"><label className={label}>{isPt?"Telefone":"Phone"} *</label><input required className={input} value={scheduleData.phone} onChange={e=>setScheduleData({...scheduleData,phone:e.target.value})}/></div><div className="py-4"><label className={label}>{isPt?"Empresa":"Company"}</label><input className={input} value={scheduleData.company} onChange={e=>setScheduleData({...scheduleData,company:e.target.value})}/></div><div className="py-4"><label className={label}>Website</label><input className={input} value={scheduleData.website} onChange={e=>setScheduleData({...scheduleData,website:e.target.value})}/></div><div className="py-4"><label className={label}>{isPt?"Serviço":"Service"} *</label><select required className={input} value={scheduleData.serviceType} onChange={e=>setScheduleData({...scheduleData,serviceType:e.target.value})}><option value="">{isPt?"Selecione":"Select"}</option>{services.map(x=><option key={x} value={x}>{x}</option>)}</select></div></div><div className="py-4"><label className={label}>{isPt?"Contexto do projeto":"Project context"} *</label><textarea required rows={5} className={`${input} resize-none`} value={scheduleData.about} onChange={e=>setScheduleData({...scheduleData,about:e.target.value})}/></div>{scheduleState === "error" ? <p className="mb-4 text-sm text-red-700">{isPt?"Não foi possível agendar agora. Tente novamente.":"Could not schedule right now. Try again."}</p>:null}<button type="submit" disabled={scheduleState === "sending"} className="mt-4 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#11110f] px-7 text-[10px] font-semibold uppercase tracking-[.14em] text-white disabled:opacity-50">{scheduleState === "sending"?(isPt?"Enviando...":"Sending..."):(isPt?"Confirmar solicitação":"Confirm request")}<ArrowRight className="h-4 w-4"/></button></form> : <div><div className="flex items-center justify-between border-y border-[#d4cec2] py-5"><button type="button" onClick={prevMonth} className="flex h-10 w-10 items-center justify-center border border-[#cfc8bc]" aria-label={isPt?"Mês anterior":"Previous month"}><ArrowLeft className="h-4 w-4"/></button><h2 className="font-editorial text-3xl">{months[calMonth]} {calYear}</h2><button type="button" onClick={nextMonth} className="flex h-10 w-10 items-center justify-center border border-[#cfc8bc]" aria-label={isPt?"Próximo mês":"Next month"}><ArrowRight className="h-4 w-4"/></button></div><div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">{availableDates.map(date=><button type="button" key={date} onClick={()=>{setSelectedDate(date);setSelectedTime(null)}} className={`min-h-12 border px-3 text-xs ${selectedDate===date?"border-[#11110f] bg-[#11110f] text-white":"border-[#cfc8bc] hover:border-[#11110f]"}`}>{date}</button>)}</div>{selectedDate ? <div className="mt-8 border-t border-[#d4cec2] pt-7"><p className={label}>{isPt?"Horários disponíveis":"Available times"}</p><div className="mt-4 flex flex-wrap gap-2">{timeSlots.map(time=><button type="button" key={time} onClick={()=>setSelectedTime(time)} className={`min-h-11 border px-4 text-xs ${selectedTime===time?"border-[#11110f] bg-[#11110f] text-white":"border-[#cfc8bc]"}`}>{time}</button>)}</div>{selectedTime ? <button type="button" onClick={()=>setScheduleState("details")} className="mt-7 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#11110f] px-7 text-[10px] font-semibold uppercase tracking-[.14em] text-white">{isPt?"Continuar":"Continue"}<ArrowRight className="h-4 w-4"/></button>:null}</div>:null}</div>}</div>}
      </div>
    </div></section>
  </main>
}
