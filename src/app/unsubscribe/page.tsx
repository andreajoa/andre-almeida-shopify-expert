"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function UnsubscribePage() {
  const params = useSearchParams()
  const token = params.get("token") || ""
  const lang = params.get("lang") === "en" ? "en" : "pt-BR"
  const isPt = lang !== "en"
  const [state, setState] = useState<"working"|"done"|"error">(token ? "working" : "error")

  useEffect(() => {
    if (!token) return
    fetch(`/api/marketing/unsubscribe?token=${encodeURIComponent(token)}`, { method:"POST" })
      .then(r => { if (!r.ok) throw new Error(); setState("done") })
      .catch(() => setState("error"))
  }, [token])

  return <main className="min-h-screen bg-[#f2efe8] px-5 py-24 text-[#11110f] sm:px-8">
    <div className="mx-auto max-w-2xl border border-[#d4cec2] bg-[#fffdf8] p-8 sm:p-12">
      <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#77736b]">ANDRÉ ALMEIDA · EMAIL</p>
      <h1 className="mt-7 font-editorial text-5xl leading-[.95] tracking-[-.04em] sm:text-6xl">{state === "working" ? (isPt?"Processando...":"Processing...") : state === "done" ? (isPt?"E-mails cancelados.":"Emails cancelled.") : (isPt?"Não foi possível concluir.":"We could not complete this request.")}</h1>
      <p className="mt-6 text-sm leading-7 text-[#625e56]">{state === "done" ? (isPt?"Você não receberá novos e-mails desta sequência. Mensagens que já tenham sido processadas pelo provedor podem ainda chegar.":"You will not receive new emails from this sequence. Messages already processed by the provider may still arrive.") : state === "error" ? (isPt?"O link pode ter expirado ou estar incompleto.":"The link may be incomplete or invalid.") : (isPt?"Estamos cancelando a sequência e os envios futuros agendados.":"We are cancelling the sequence and future scheduled messages.")}</p>
      <Link href={`/${lang}`} className="mt-8 inline-flex rounded-full bg-[#11110f] px-6 py-3 text-[10px] font-semibold uppercase tracking-[.14em] text-white">{isPt?"Voltar ao site":"Back to website"}</Link>
    </div>
  </main>
}
