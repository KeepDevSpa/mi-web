"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import CoverageCheck from "@/components/coverage-check"
import { Play, Tv, Film, Trophy, CheckCircle, Smartphone, Monitor, Shield, Clock } from "lucide-react"
import Footer from "@/components/footer"
import Header from "@/components/header"
import PageContent from "@/components/page-content"
import TopContactBar from "@/components/top-contact-bar"
import Image from 'next/image'
import Link from 'next/link'
import PricingCard from "@/components/ui/pricing-card"
import { useState, useEffect } from "react"
import { EnhancedHero } from "@/components/ui/enhanced-hero"

// Define el tipo de tarifa
interface AdminPricingCard {
  id: string
  name: string
  page: string
  currentPrice: number
  originalPrice: number
  variant: 'dark' | 'medium' | 'golden' | 'blue' | 'light' | 'lightgreen' | 'lightblue' | 'purple'
  hasSpeedSelector: boolean
  speeds: Array<{ id: string; label: string; price: number; originalPrice?: number }>
  features: string[]
  extras: any[]
  isPopular: boolean
  ctaText: string
  rateTier?: number
  isActive: boolean
}

export default function PrismaTV() {
  const [cards, setCards] = useState<AdminPricingCard[]>([])

  useEffect(() => {
    fetch('/api/admin/cards?page=prisma-tv')
      .then(r => r.json())
      .then(data => setCards(data.filter((c: AdminPricingCard) => c.isActive)))
      .catch(console.error)
  }, [])

  const channels = [
    'Canales Generalistas',
    'Cine y Series',
    'Canales Regionales',
    'Canales Locales',
    'Canales Internacionales',
    'Deportes',
    'Música',
    'Infantil',
    'Estilo de Vida',
    'Documental',
    'Caza y Pesca',
    'Religioso',
    'Cine Adultos'
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <EnhancedHero
        variant="prismatv"
        logo="/logo_prismatv.png"
        logoWidth={300}
        logoHeight={100}
        title="¡Bienvenido a"
        highlightedText="la TV de Prisma!"
        description="Disfruta con PrismaTV de los mejores canales. Más de 100 canales premium disponibles a través de la web, Smart TV y móvil."
        videoSrc="/PrismaTV.mp4"
        videoPreviewImage="/prismatv-preview.jpg"
        videoLoop={true}
        videoMuted={true}
        videoAutoplay={true}
        contentPosition="left"
        titleLayout="stacked"
        textSize="large"
        page="prisma-tv"
        highlights={[
          { text: "HD y 4K", style: "badge", className: "bg-blue-600/60 backdrop-blur-md" },
          { text: "Smart TV", style: "badge", className: "bg-green-600/60 backdrop-blur-md" },
          { text: "Multi-dispositivo", style: "badge", className: "bg-purple-600/60 backdrop-blur-md" }
        ]}
      />

      {/* Paquetes de TV en promoción */}
      <section className="py-16 bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Paquetes de Prisma TV en promoción: Inicial, diversión y total.
          </h2>
          <p className="text-lg text-gray-400 max-w-4xl mx-auto">
            Descubre las mejores ofertas en paquetes de PrismaTV y disfruta de fútbol, películas, series y documentales populares. Accede desde tu ordenador, Smart TV o dispositivos móviles, donde quieras y cuando quieras. ¡Vive el mejor entretenimiento con Prisma TV!
          </p>
        </div>
      </section>
      
      {/* Contenido principal */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.length > 0 ? (
              cards.map((card) => (
                <PricingCard
                  key={card.id}
                  variant={card.variant}
                  planName={card.name}
                  hasSpeedSelector={card.hasSpeedSelector}
                  speeds={card.speeds}
                  features={card.features}
                  extras={card.extras}
                  rateTier={card.rateTier ?? 1}
                  isPopular={card.isPopular}
                  ctaText={card.ctaText || 'Más info'}
                  directPrice={card.speeds?.[0]?.price || 0}
                  onCtaClick={() => {
                    // Opcional: abrir modal o formulario
                  }}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-gray-500">
                Cargando tarifas... Si no aparecen, ve al panel de administración y crea al menos una tarifa para la página <strong>prisma-tv</strong>.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Dónde ver Prisma TV */}
      <section className="py-16 text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">¿Dónde ver PrismaTV?</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          Disfruta de la mejor televisión desde cualquier lugar y en cualquier dispositivo. Solo necesitas una conexión a internet.
        </p>
        <div className="flex justify-center mb-12">
          <Image
            src="/PrismaTV-infografia.png"
            alt="Infografía de dispositivos"
            width={1200}
            height={500}
            className="w-full max-w-5xl h-auto"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center">
            <h4 className="text-xl font-semibold mb-2">En tu Smart TV o móvil</h4>
            <p className="text-gray-600 mb-4">Busca nuestra aplicación en Google Play, APP Store, Samsung SmartTV y LG Smart TV.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Image src="/tv-google-300x100.jpg" alt="Google Play" width={120} height={40} />
              <Image src="/tv-apple-300x100.jpg" alt="App Store" width={120} height={40} />
              <Image src="/lg-smart-tv.jpg" alt="LG Smart TV" width={120} height={40} />
              <Image src="/samsung-smart-tv.jpg" alt="Samsung Smart TV" width={120} height={40} />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="text-xl font-semibold mb-2">Convierte tu TV en Smart TV</h4>
            <p className="text-gray-600 mb-4">Si tu televisor no es Smart TV, no te preocupes, descarga nuestra aplicación en tu Fire TV o Google Chromecast.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Image src="/tv-firetv-300x100.jpg" alt="Fire TV" width={120} height={40} />
              <Image src="/google-chromecast.jpg" alt="Google Chromecast" width={120} height={40} />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="text-xl font-semibold mb-2">O accede desde tu PC</h4>
            <p className="text-gray-600 mb-4">Conéctate desde tu portátil o PC con tu usuario al servicio online y accede a PrismaTV vía web.</p>
            <Link href="/player" passHref>
              <Button variant="outline">Ir a PrismaTV Online</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Características de la TV */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">¿Cómo es nuestra TV?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Multidispositivo</h4>
              <p className="text-gray-600">Puedes ver PrismaTV en hasta 2 dispositivos simultáneamente.</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Control parental</h4>
              <p className="text-gray-600">Función de control parental para la protección de los menores.</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">TV en diferido</h4>
              <p className="text-gray-600">Podrás ver contenidos de hasta cinco días atrás.</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}