"use client"

import { useTranslations } from "next-intl"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"

export default function BlogPage() {
  const t = useTranslations()

  const posts = [
    { title: "Shopify vs Shopify Plus: When to Upgrade?", category: "Shopify", date: "Jan 2025", readTime: "8 min" },
    { title: "10 Performance Optimizations Every Shopify Store Needs", category: "Performance", date: "Dec 2024", readTime: "12 min" },
    { title: "Headless Commerce: Is It Right for Your Brand?", category: "Development", date: "Nov 2024", readTime: "10 min" },
    { title: "Facebook Ads for Ecommerce: Complete 2025 Guide", category: "Marketing", date: "Oct 2024", readTime: "15 min" },
    { title: "How to Optimize Shopify Product Pages for Conversions", category: "CRO", date: "Sep 2024", readTime: "9 min" },
    { title: "Email Marketing Automation: 7 Essential Flows", category: "Marketing", date: "Aug 2024", readTime: "11 min" },
  ]

  return (
    <div className="pt-24">
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("nav.blog")}</h1>
            <p className="text-lg text-slate-400">Shopify Insights & Ecommerce Tips</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <Card variant="gradient" className="cursor-pointer">
                  <div className="h-40 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-3xl opacity-30">📝</span>
                  </div>
                  <Badge variant="indigo" className="mb-3">{post.category}</Badge>
                  <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime} read</span>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
