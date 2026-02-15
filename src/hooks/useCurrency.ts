"use client"

import { useState, useEffect, useCallback } from "react"
import type { Currency } from "@/types"

const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  BRL: 5.65,
  GBP: 0.79,
  CAD: 1.36,
  AUD: 1.53,
}

export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>("USD")

  useEffect(() => {
    const saved = localStorage.getItem("preferred_currency") as Currency
    if (saved && EXCHANGE_RATES[saved]) {
      setCurrency(saved)
    }
  }, [])

  const changeCurrency = useCallback((newCurrency: Currency) => {
    setCurrency(newCurrency)
    localStorage.setItem("preferred_currency", newCurrency)
  }, [])

  const convert = useCallback(
    (amountInUSD: number): number => {
      return Math.round(amountInUSD * EXCHANGE_RATES[currency])
    },
    [currency]
  )

  const format = useCallback(
    (amountInUSD: number): string => {
      const converted = convert(amountInUSD)
      const localeMap: Record<Currency, string> = {
        USD: "en-US",
        BRL: "pt-BR",
        GBP: "en-GB",
        CAD: "en-CA",
        AUD: "en-AU",
      }
      return new Intl.NumberFormat(localeMap[currency], {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(converted)
    },
    [currency, convert]
  )

  return { currency, changeCurrency, convert, format }
}
