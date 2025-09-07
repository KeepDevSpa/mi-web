'use client'

import { useState, useEffect } from 'react'
import { PricingCard } from '@/components/ui/pricing-card'
import HeroProfesional from '@/components/ui/hero-profesional'
import Footer from '@/components/footer'
import { Shield, Users, Zap } from 'lucide-react'

interface CardData {
  id: string
  planName: string
  variant: string
  hasSpeedSelector: boolean
  speeds: Array<{
    id: string
    label: string
    price: number
    originalPrice?: number
  }>
  features: string[]
  extras: Array<{
    id: string
    label: string
    price: number
    description?: string
  }>
  isPopular: boolean
  ctaText: string
}

export default function ProfesionalHomePage() {
  const [cards, setCards] = useState<CardData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/admin/cards?isHeroOffer=true')
        if (response.ok) {
          const data = await response.json()
          const transformedCards = data.map((card: any) => ({
            id: card.id,
            planName: card.name,
            variant: card.variant,
            hasSpeedSelector: card.hasSpeedSelector,
            speeds: card.speeds || [],
            features: Array.isArray(card.features) ? card.features : JSON.parse(card.features || '[]'),
            extras: card.extras || [],
            isPopular: card.isPopular || false,
            ctaText: card.ctaText || 'Contratar ahora'
          }))
          setCards(transformedCards)
        }
      } catch (error) {
        console.error('Error fetching cards:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCards()
  }, [])
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroProfesional
        title="La conexión que realmente te cuida"
        subtitle="EXPERIENCIA PREMIUM PRISMA"
        description="En Prisma no vendemos tarifas. Creamos experiencias premium con tecnología de vanguardia y atención humana real. Porque lo importante para nosotros eres tú."
        primaryCta={{
          text: "Descubre la experiencia Prisma",
          href: "/profesional/fibra-movil",
          icon: <span>🌟</span>
        }}
        secondaryCta={{
          text: "Hablar con un humano real",
          href: "/profesional/contacto",
          icon: <span>💬</span>
        }}
        heroImage="/Hero-Banner.webp"
        backgroundType="image"
        variant="home"
        highlights={[
          {
            icon: <Shield className="w-5 h-5" />,
            text: "Tecnología certificada",
            color: "text-blue-400"
          },
          {
            icon: <Users className="w-5 h-5" />,
            text: "Soporte 24/7 humano",
            color: "text-purple-400"
          },
          {
            icon: <Zap className="w-5 h-5" />,
            text: "Instalación profesional",
            color: "text-cyan-400"
          }
        ]}
      />

      {/* Pricing Cards Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestras Experiencias Premium
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cada plan está diseñado para ofrecerte la mejor experiencia. Tecnología de vanguardia, 
              atención humana y la tranquilidad de estar en buenas manos.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando experiencias premium...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cards.map((plan) => (
                <PricingCard
                  key={plan.id}
                  variant={plan.variant as any}
                  planName={plan.planName}
                  hasSpeedSelector={plan.hasSpeedSelector}
                  speeds={plan.speeds}
                  features={plan.features}
                  extras={plan.extras}
                  isPopular={plan.isPopular}
                  ctaText={plan.ctaText}
                />
              ))}
            </div>
          )}

          {cards.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Estamos preparando las mejores experiencias para ti.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
