"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"

export function DashboardResetForm({token}:{token:string}) {
  const [password,setPassword]=useState("")
  const [confirm,setConfirm]=useState("")
  const [state,setState]=useState<"idle"|"sending"|"done"|"error">("idle")
  const [message,setMessage]=useState("")

  async function submit(e:FormEvent){
    e.preventDefault()
    if(password.length<12){setState("error");setMessage("Use pelo menos 12 caracteres.");return}
    if(password!==confirm){setState("error");setMessage("As senhas não coincidem.");return}
    setState("sending");setMessage("")
    try{
      const response=await fetch("/api/dashboard",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"reset_password",token,password})})
      const body=await response.json().catch(()=>({}))
      if(!response.ok||body.ok!==true) throw new Error(body.reason||body.error||"reset failed")
      setPassword("");setConfirm("");setState("done")
    }catch(error){setState("error");setMessage(error instanceof Error&&error.message==="invalid_or_expired"?"Este link expirou ou já foi utilizado.":"Não foi possível redefinir a senha.")}
  }

  if(state==="done") return <div className="w-full border border-white/15 bg-[#171714] p-6 sm:p-10"><p className="text-[9px] font-semibold uppercase tracking-[.2em] text-[#c7b18d]">PRIVATE COMMAND CENTER</p><h1 className="mt-6 font-editorial text-5xl leading-none tracking-[-.045em] sm:text-6xl">Senha definida.</h1><p className="mt-5 text-sm leading-7 text-white/55">Todas as sessões anteriores foram encerradas. O próximo acesso já usa a nova senha.</p><Link href="/dashboard" className="mt-8 inline-flex rounded-full bg-[#f2efe8] px-6 py-4 text-[10px] font-bold uppercase tracking-[.15em] text-[#11110f]">Entrar no dashboard</Link></div>

  return <form onSubmit={submit} className="w-full border border-white/15 bg-[#171714] p-6 sm:p-10"><p className="text-[9px] font-semibold uppercase tracking-[.2em] text-[#c7b18d]">PRIVATE COMMAND CENTER</p><h1 className="mt-6 font-editorial text-5xl leading-none tracking-[-.045em] sm:text-6xl">Crie sua nova senha.</h1><p className="mt-5 text-sm leading-7 text-white/55">Use no mínimo 12 caracteres. Ao concluir, todas as sessões antigas serão invalidadas.</p><label className="mt-8 block text-[9px] font-semibold uppercase tracking-[.15em] text-white/45">Nova senha<input autoFocus required minLength={12} type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-3 w-full border-b border-white/25 bg-transparent py-4 text-base normal-case tracking-normal outline-none focus:border-[#c7b18d]"/></label><label className="mt-5 block text-[9px] font-semibold uppercase tracking-[.15em] text-white/45">Confirmar senha<input required minLength={12} type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} className="mt-3 w-full border-b border-white/25 bg-transparent py-4 text-base normal-case tracking-normal outline-none focus:border-[#c7b18d]"/></label>{state==="error"&&<p className="mt-4 text-sm text-[#e5a487]">{message}</p>}<button disabled={state==="sending"||!token} className="mt-8 w-full rounded-full bg-[#f2efe8] px-6 py-4 text-[10px] font-bold uppercase tracking-[.15em] text-[#11110f] disabled:opacity-50">{state==="sending"?"Salvando...":"Definir nova senha"}</button></form>
}
