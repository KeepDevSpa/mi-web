"use client"

import { useEffect, useState } from "react"
import PricingCard from "@/components/ui/pricing-card"
import { getPageCardsFromLocalStorage } from "@/lib/admin-card-config"

type CardModel = {
  id: string
  name: string
  variant?: any
  isPopular?: boolean
  hasSpeedSelector?: boolean
  speeds?: Array<{ id: string; label: string; price: number; originalPrice?: number }>
  features?: string[]
  extras?: any[]
  rateTier?: number
  ctaText?: string
  isActive?: boolean
}

export default function AlarmPackagesClient() {
  const [cards, setCards] = useState<CardModel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updateKey, setUpdateKey] = useState(0)

  useEffect(() => {
    try {
      const stored = getPageCardsFromLocalStorage('alarmas')
      const active = (stored || []).filter((c: any) => c.isActive !== false)
      if (active.length > 0) {
        setCards(active)
      } else {
        const defaults: CardModel[] = [
          {
            id: 'alarmas-basic',
            name: 'Hogar Tranquilidad',
            variant: 'light',
            hasSpeedSelector: false,
            speeds: [{ id: 'alarmas-basic', label: 'Básico', price: 19.9, originalPrice: 43.9 }],
            features: [
              'Central de alarma',
              'Sirena interior',
              'Placa disuasoria',
              '2 detectores con cámara',
              'Detector de movimiento'
            ],
            extras: [],
            ctaText: '¡Lo quiero!',
            isPopular: false,
            rateTier: 1,
            isActive: true
          },
          {
            id: 'alarmas-plus',
            name: 'Hogar Tranquilidad +',
            variant: 'light',
            hasSpeedSelector: false,
            speeds: [{ id: 'alarmas-plus', label: 'Plus', price: 19.9, originalPrice: 49.9 }],
            features: [
              'Central de alarma',
              '2 Detectores con cámara',
              'Placa disuasoria',
              'Teclado',
              'Detector de movimiento',
              'Sirena interior',
              '3 TAGS',
              'Mando',
              'Detector magnético',
              'Cámara IP'
            ],
            extras: [],
            ctaText: '¡Lo quiero!',
            isPopular: false,
            rateTier: 2,
            isActive: true
          }
        ]
        setCards(defaults)
        // Bootstrap into localStorage so Admin can edit them
        try {
          const all = JSON.parse(localStorage.getItem('prisma-admin-cards') || '[]')
          const withoutAlarmas = all.filter((c: any) => c.page !== 'alarmas')
          const mapped = defaults.map(d => ({
            id: d.id,
            name: d.name,
            currentPrice: d.speeds?.[0]?.price || 0,
            originalPrice: d.speeds?.[0]?.originalPrice || 0,
            page: 'alarmas',
            variant: d.variant || 'light',
            hasSpeedSelector: Boolean(d.hasSpeedSelector),
            speeds: d.speeds || [],
            features: d.features || [],
            extras: d.extras || [],
            isPopular: Boolean(d.isPopular),
            ctaText: d.ctaText || '¡Lo quiero!',
            rateTier: d.rateTier || 1,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }))
          const merged = [...withoutAlarmas, ...mapped]
          localStorage.setItem('prisma-admin-cards', JSON.stringify(merged))
          try { window.dispatchEvent(new CustomEvent('localStorage-updated', { detail: { key: 'prisma-admin-cards' } })) } catch {}
        } catch {}
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500">Cargando...</div>
    )
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 scale-[0.9]">
      {cards.map((card, idx) => (
        <div
          key={`${card.id}-${updateKey}`}
          className="text-black max-w-sm"
          style={{ color: '#000000', ["--rate-text" as any]: '#000000' }}
        >
          <PricingCard
            variant={(card.variant as any) || 'light'}
            planName={card.name}
            hasSpeedSelector={Boolean(card.hasSpeedSelector)}
            speeds={(card.speeds || []).map(s => ({...s, price: Number(s.price), originalPrice: Number(s.originalPrice)}))}
            features={card.features || []}
            extras={card.extras || []}
            isPopular={Boolean(card.isPopular)}
            ctaText={card.ctaText || '¡Lo quiero!'}
            directPrice={card.speeds?.[0]?.price || 0}
            titleBgColor="#ff9306"
            leadFormTransparentBg
          >
            <div className="w-full flex justify-center p-3" style={{ backgroundColor: '#ebebeb' }}>
              <img
                src={idx === 0
                  ? "/segurma-kit-premium.png"
                  : "/Tranquilidad-Hogar-scaled-1-e1754033300190-1024x661.webp"}
                alt={idx === 0 ? "Hogar Tranquilidad" : "Hogar Tranquilidad +"}
                className="h-28 object-contain"
              />
            </div>
          </PricingCard>
        </div>
      ))}
    </div>
  )
}


