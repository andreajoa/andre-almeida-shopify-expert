"use client"

import { useState } from "react"
import Link from "next/link"

export default function DashboardForgotPage() {
  const [state,setState]=useState<"idle"|"sending"|"sent"|"error">("idle")

  async function requestReset() {
    setState("sending")
    try {
      const response=await fetch("/api/dashboard",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"request_reset"})})
      if(!response.ok) throw new Error()
      setState("sent")
    } catch { setState("error") }
  }

  return <main className="min-h-screen bg-[#11110f] px-5 py-12 text-[#f2efe8] sm:px-8">
    <div className="mx-auto flex min-h-[80svh] max-w-lg items-center">
      <section className="w-full border border-white/15 bg-[#171714] p-6 sm:p-10">
        <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-[#c7b18d]">PRIVATE COMMAND CENTER</p>
        <h1 className="mt-6 font-editorial text-5xl leading-none tracking-[-.045em] sm:text-6xl">Redefinir acesso.</h1>
        <p className="mt-5 text-sm leading-7 text-white/55">Um link único será enviado ao e-mail administrativo configurado no website. Ele expira em 20 minutos.</p>
        {state==="sent" ? <div className="mt-8 border border-[#c7b18d]/30 bg-[#c7b18d]/10 p-5 text-sm leading-6">Link enviado. Verifique a caixa de entrada do e-mail administrativo.</div> : <button type="button" onClick={requestReset} disabled={state==="sending"} className="mt-8 w-full rounded-full bg-[#f2efe8] px-6 py-4 text-[10px] font-bold uppercase tracking-[.15em] text-[#11110f] disabled:opacity-50">{state==="sending"?"Enviando...":"Enviar link de redefinição"}</button>}
        {state==="error" && <p className="mt-4 text-sm text-[#e5a487]">Não foi possível enviar o link agora.</p>}
        <Link href="/dashboard" className="mt-6 inline-block text-[9px] font-semibold uppercase tracking-[.14em] text-white/50 hover:text-white">Voltar ao login</Link>
      </section>
    </div>
  </main>
}
