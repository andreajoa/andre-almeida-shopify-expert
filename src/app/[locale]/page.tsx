import { HeroSection } from "@/components/home/HeroSection"
import { PainPointsSection } from "@/components/home/PainPointsSection"
import { ServicesOverview } from "@/components/home/ServicesOverview"
import { PortfolioHighlights } from "@/components/home/PortfolioHighlights"
import { LatestRealProjects } from "@/components/home/LatestRealProjects"
import { Testimonials } from "@/components/home/Testimonials"
import { ProcessSection } from "@/components/home/ProcessSection"
import { FAQSection } from "@/components/home/FAQSection"
import { CTASection } from "@/components/home/CTASection"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PainPointsSection />
      <ServicesOverview />
      <PortfolioHighlights />
      <LatestRealProjects />
      <Testimonials />
      <ProcessSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
