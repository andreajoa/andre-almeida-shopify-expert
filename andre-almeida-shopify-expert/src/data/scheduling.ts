import type { TimeSlot } from "@/types"

export function getAvailableSlots(dateStr: string): TimeSlot[] {
  const slots: TimeSlot[] = [
    { time: "09:00", available: true },
    { time: "11:00", available: true },
    { time: "14:00", available: true },
    { time: "16:00", available: true },
  ]

  const seed = dateStr.split("").reduce((a, c) => a + c.charCodeAt(0), 0)
  const busyIndex1 = seed % 4
  const busyIndex2 = (seed + 2) % 4

  return slots.map((slot, i) => ({
    ...slot,
    available: i !== busyIndex1 && i !== busyIndex2,
  }))
}

export function getAvailableDates(year: number, month: number): string[] {
  const dates: string[] = []
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d)
    const day = date.getDay()
    if (day >= 1 && day <= 5) {
      const str = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`
      if (date >= new Date()) {
        dates.push(str)
      }
    }
  }
  return dates
}
