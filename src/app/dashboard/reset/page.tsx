import type { Metadata } from "next"
import { DashboardResetForm } from "@/components/dashboard/DashboardResetForm"

export const metadata: Metadata = {
  title:"Redefinir senha | Dashboard André Almeida",
  robots:{index:false,follow:false,nocache:true},
}

export default async function DashboardResetPage({searchParams}:{searchParams:Promise<{token?:string}>}) {
  const params=await searchParams
  const token=typeof params.token==="string"?params.token:""
  return <main className="min-h-screen bg-[#11110f] px-5 py-12 text-[#f2efe8] sm:px-8"><div className="mx-auto flex min-h-[80svh] max-w-lg items-center"><DashboardResetForm token={token}/></div></main>
}
