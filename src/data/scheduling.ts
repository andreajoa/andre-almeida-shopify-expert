export interface TimeSlot { time: string; available: boolean }

export function getAvailableSlots(dateStr: string): TimeSlot[] {
  const slots: TimeSlot[] = [
    { time: "09:00", available: true },
    { time: "11:00", available: true },
    { time: "14:00", available: true },
    { time: "16:00", available: true },
  ]
  const seed = dateStr.split("").reduce((a, c) => a + c.charCodeAt(0), 0)
  const busy1 = seed % 4
  const busy2 = (seed + 2) % 4
  return slots.map((s, i) => ({ ...s, available: i !== busy1 && i !== busy2 }))
}

export function getAvailableDates(year: number, month: number): string[] {
  const dates: string[] = []
  const days = new Date(year, month + 1, 0).getDate()
  for (let d = 1; d <= days; d++) {
    const date = new Date(year, month, d)
    const day = date.getDay()
    if (day >= 1 && day <= 5 && date >= new Date()) {
      dates.push(`${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`)
    }
  }
  return dates
}
