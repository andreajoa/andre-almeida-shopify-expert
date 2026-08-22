"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

type TrackEvent = "pageview" | "click" | "heartbeat" | "whatsapp" | "form_submit" | "email_capture"
type Geo = { country?: string; region?: string; city?: string; locale?: string }

declare global {
  interface Window {
    __aaTrack?: (eventType: TrackEvent, extra?: Record<string, unknown>) => void
    __aaSessionId?: string
  }
}

const SESSION_KEY = "aa_session_id"

function sessionId() {
  const existing = localStorage.getItem(SESSION_KEY)
  if (existing && existing.length >= 10) return existing
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  const id = `aa_${Array.from(bytes).map(v=>v.toString(16).padStart(2,"0")).join("")}`
  localStorage.setItem(SESSION_KEY, id)
  return id
}

function acquisition() {
  const params = new URLSearchParams(window.location.search)
  const utmSource = params.get("utm_source")
  const utmMedium = params.get("utm_medium")
  const utmCampaign = params.get("utm_campaign")
  if (utmSource) return { source:utmSource, medium:utmMedium || "campaign", campaign:utmCampaign || "" }
  if (params.get("gclid")) return { source:"google", medium:"cpc", campaign:utmCampaign || "" }
  if (params.get("fbclid")) return { source:"meta", medium:"social", campaign:utmCampaign || "" }
  if (document.referrer) {
    try {
      const host = new URL(document.referrer).hostname.replace(/^www\./,"")
      if (host && host !== window.location.hostname.replace(/^www\./,"")) return { source:host, medium:"referral", campaign:"" }
    } catch { /* ignore */ }
  }
  return { source:"direct", medium:"none", campaign:"" }
}

function textOf(el: Element | null) {
  if (!el) return ""
  const value = (el.getAttribute("aria-label") || el.textContent || el.getAttribute("title") || "").replace(/\s+/g," ").trim()
  return value.slice(0, 180)
}

export function VisitorTracker() {
  const pathname = usePathname()
  const startedAt = useRef(0)
  const geo = useRef<Geo>({})
  const currentPath = useRef("")
  const source = useRef({ source:"direct", medium:"none", campaign:"" })

  useEffect(() => {
    if (window.location.pathname.startsWith("/dashboard")) return
    const sid = sessionId()
    window.__aaSessionId = sid
    currentPath.current = window.location.pathname
    startedAt.current = Date.now()
    source.current = acquisition()
    fetch("/api/geo", { cache:"no-store" }).then(r=>r.ok?r.json():{}).then(v=>{ geo.current=v || {} }).catch(()=>{})

    const send = (eventType: TrackEvent, extra: Record<string, unknown> = {}, beacon=false) => {
      const payload = {
        sessionId:sid,
        eventType,
        path:currentPath.current || window.location.pathname,
        durationSeconds:Math.max(0,Math.round((Date.now()-startedAt.current)/1000)),
        locale:geo.current.locale || document.documentElement.lang || "",
        country:geo.current.country || "",
        region:geo.current.region || "",
        city:geo.current.city || "",
        referrer:document.referrer || "",
        ...source.current,
        ...extra,
      }
      const body = JSON.stringify(payload)
      if (beacon && navigator.sendBeacon) {
        navigator.sendBeacon("/api/track", new Blob([body], { type:"application/json" }))
        return
      }
      fetch("/api/track", { method:"POST", headers:{"Content-Type":"application/json"}, body, keepalive:true }).catch(()=>{})
    }
    window.__aaTrack = (eventType, extra={}) => send(eventType, extra)

    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a,button,[role='button']") : null
      if (!target) return
      const href = target instanceof HTMLAnchorElement ? target.href : target.getAttribute("data-href") || ""
      const isWhatsApp = /wa\.me|whatsapp\.com/i.test(href)
      send(isWhatsApp ? "whatsapp" : "click", { element:textOf(target), href })
    }
    const onPageHide = () => send("heartbeat", { metadata:{ reason:"pagehide" } }, true)
    const onVisibility = () => { if (document.visibilityState === "hidden") send("heartbeat", { metadata:{ reason:"hidden" } }, true) }
    document.addEventListener("click", onClick, true)
    window.addEventListener("pagehide", onPageHide)
    document.addEventListener("visibilitychange", onVisibility)
    const timer = window.setInterval(()=>send("heartbeat", { metadata:{ reason:"interval" } }), 15_000)

    return () => {
      document.removeEventListener("click", onClick, true)
      window.removeEventListener("pagehide", onPageHide)
      document.removeEventListener("visibilitychange", onVisibility)
      window.clearInterval(timer)
      delete window.__aaTrack
    }
  }, [])

  useEffect(() => {
    if (pathname.startsWith("/dashboard")) return
    currentPath.current = pathname
    startedAt.current = Date.now()
    const timer = window.setTimeout(()=>window.__aaTrack?.("pageview", { path:pathname }), 250)
    return () => window.clearTimeout(timer)
  }, [pathname])

  return null
}
