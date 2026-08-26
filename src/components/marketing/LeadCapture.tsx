"use client"

import { FormEvent, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { ArrowRight, Check, X } from "lucide-react"

const CAPTURED_KEY = "aa_marketing_captured"

export function LeadCapture() {
  const pathname = usePathname()
  const isPt = !pathname.startsWith("/en")
  const blocked = pathname.startsWith("/dashboard") || pathname.startsWith("/unsubscribe")
  const [open,setOpen] = useState(false)
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [consent,setConsent] = useState(false)
  const [state,setState] = useState<"idle"|"sending"|"success"|"error">("idle")

  useEffect(()=>{
    if (blocked || localStorage.getItem(CAPTURED_KEY)==="1") return
    const timer = window.setTimeout(()=>setOpen(true), 38_000)
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max > 0 && window.scrollY / max > .62) { setOpen(true); window.removeEventListener("scroll",onScroll) }
    }
    window.addEventListener("scroll",onScroll,{passive:true})
    return ()=>{ window.clearTimeout(timer); window.removeEventListener("scroll",onScroll) }
  },[blocked])

  if (blocked || (typeof window !== "undefined" && localStorage.getItem(CAPTURED_KEY)==="1" && state!=="success")) return null

  async function submit(e:FormEvent) {
    e.preventDefault()
    if (!consent) return
    setState("sending")
    try {
      const params = new URLSearchParams(window.location.search)
      const ref = document.referrer
      let source = params.get("utm_source") || "direct"
      if (source === "direct" && ref) { try { source = new URL(ref).hostname.replace(/^www\./,"") } catch {} }
      const response = await fetch("/api/marketing/subscribe", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          name,email,consent:true,
          sessionId:window.__aaSessionId || localStorage.getItem("aa_session_id") || "",
          locale:isPt?"pt-BR":"en-US",
          source,
          medium:params.get("utm_medium") || "",
          campaign:params.get("utm_campaign") || "",
          path:window.location.pathname,
          referrer:ref,
        }),
      })
      if (!response.ok) throw new Error()
      localStorage.setItem(CAPTURED_KEY,"1")
      window.__aaTrack?.("email_capture",{element:"lead_capture_modal"})
      setState("success")
    } catch { setState("error") }
  }

  return <>
    {!open && <button type="button" onClick={()=>setOpen(true)} className="fixed bottom-5 left-4 z-[58] max-w-[calc(100vw-88px)] rounded-full border border-[#cfc8bc] bg-[#fffdf8]/95 px-4 py-3 text-[9px] font-semibold uppercase tracking-[.13em] text-[#11110f] shadow-[0_10px_35px_rgba(17,17,15,.12)] backdrop-blur sm:bottom-7 sm:left-7 sm:px-5">{isPt?"Receber diagnóstico digital":"Get a digital growth audit"}</button>}
    {open && <div className="fixed inset-0 z-[80] flex items-end bg-[#11110f]/40 p-0 backdrop-blur-[2px] sm:items-center sm:justify-center sm:p-5" onMouseDown={e=>{if(e.target===e.currentTarget)setOpen(false)}}>
      <div className="relative max-h-[92svh] w-full overflow-y-auto border border-[#d4cec2] bg-[#f2efe8] p-6 shadow-2xl sm:max-w-[620px] sm:p-9">
        <button type="button" aria-label={isPt?"Fechar":"Close"} onClick={()=>setOpen(false)} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#cfc8bc]"><X className="h-4 w-4"/></button>
        {state==="success" ? <div className="py-8 sm:py-12"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#11110f] text-white"><Check className="h-5 w-5"/></span><h2 className="mt-7 font-editorial text-4xl leading-none tracking-[-.04em] sm:text-5xl">{isPt?"Pronto. Agora a conversa continua com contexto.":"Done. Now the conversation continues with context."}</h2><p className="mt-5 max-w-lg text-sm leading-7 text-[#625e56]">{isPt?"Você entrou na sequência de análises sobre website, automação, autoridade, CRM, e-commerce e conversão. Pode cancelar a qualquer momento.":"You are now in the analysis sequence on websites, automation, authority, CRM, ecommerce and conversion. You can unsubscribe at any time."}</p><button type="button" onClick={()=>setOpen(false)} className="mt-7 rounded-full bg-[#11110f] px-6 py-3 text-[10px] font-semibold uppercase tracking-[.14em] text-white">{isPt?"Continuar no site":"Continue browsing"}</button></div> : <form onSubmit={submit}>
          <p className="pr-12 text-[9px] font-semibold uppercase tracking-[.18em] text-[#77736b]">{isPt?"ANÁLISE · AUTOMAÇÃO · AUTORIDADE":"GROWTH · AUTOMATION · AUTHORITY"}</p>
          <h2 className="mt-6 max-w-xl font-editorial text-[clamp(2.7rem,9vw,4.5rem)] leading-[.9] tracking-[-.05em]">{isPt?"30 ideias para fazer sua presença digital trabalhar melhor.":"30 ideas to make your digital presence work harder."}</h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#625e56]">{isPt?"Uma sequência curta e estratégica sobre website, e-commerce, automação, CRM, SEO/GEO e autoridade — construída para mostrar onde negócios digitais normalmente perdem conversão.":"A concise strategic sequence on websites, ecommerce, automation, CRM, SEO/GEO and authority — built around the places digital businesses usually lose conversion."}</p>
          <div className="mt-7 grid gap-5 sm:grid-cols-2"><label className="text-[9px] font-semibold uppercase tracking-[.13em] text-[#77736b]">{isPt?"Nome":"Name"}<input value={name} onChange={e=>setName(e.target.value)} className="mt-2 w-full border-b border-[#cfc8bc] bg-transparent py-3 text-sm normal-case tracking-normal outline-none focus:border-[#11110f]" placeholder={isPt?"Seu nome":"Your name"}/></label><label className="text-[9px] font-semibold uppercase tracking-[.13em] text-[#77736b]">E-mail<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full border-b border-[#cfc8bc] bg-transparent py-3 text-sm normal-case tracking-normal outline-none focus:border-[#11110f]" placeholder="email@empresa.com"/></label></div>
          <label className="mt-6 flex items-start gap-3 text-[11px] leading-5 text-[#666259]"><input required type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} className="mt-1"/><span>{isPt?"Quero receber esta sequência e outras análises relevantes por e-mail. Sei que posso cancelar quando quiser.":"I want to receive this sequence and relevant analysis by email. I know I can unsubscribe at any time."}</span></label>
          {state==="error" && <p className="mt-4 text-sm text-red-700">{isPt?"Não foi possível concluir agora. Tente novamente.":"We could not complete this right now. Please try again."}</p>}
          <button disabled={state==="sending"} className="mt-7 inline-flex min-h-13 items-center gap-3 rounded-full bg-[#11110f] px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[.14em] text-white disabled:opacity-50">{state==="sending"?(isPt?"Ativando...":"Starting..."):(isPt?"Quero receber a sequência":"Send me the sequence")}<ArrowRight className="h-4 w-4"/></button>
        </form>}
      </div>
    </div>}
  </>
}
