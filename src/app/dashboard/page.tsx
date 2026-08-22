import type { Metadata } from "next"
import { DashboardClient } from "@/components/dashboard/DashboardClient"

export const metadata: Metadata = {
  title:"Dashboard | André Almeida",
  description:"Painel privado de analytics, CRM e e-mail marketing.",
  robots:{ index:false, follow:false, nocache:true },
}

export default function DashboardPage() {
  return <DashboardClient />
}
