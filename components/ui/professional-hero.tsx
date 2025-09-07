'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ConnectionMessage from './connection-message'

interface HeroService {
  name: string
  color: string
  gradient: string
  headline: string
  subheadline: string
  benefits: string[]
  ctaPrimary: string
  ctaSecondary: string
  href: string
  image: string
  stats: { value: string; label: string }[]
}

export default function ProfessionalHero() {
  const [activeService, setActiveService] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const services: HeroService[] = [
    {
      name: 'Móvil',
      color: '#00b300',
      gradient: 'from-green-500 to-emerald-600',
      headline: 'Conectividad sin límites',
      subheadline: 'Planes móviles diseñados para tu estilo de vida. Cobertura nacional, datos ilimitados y las mejores tarifas.',
      benefits: ['5G gratis', 'Datos ilimitados', 'Roaming incluido', 'Netflix gratis'],
      ctaPrimary: 'Ver planes móvil',
      ctaSecondary: 'Comprobar cobertura',
      href: '/movil',
      image: '/chica_con_movil.webp',
      stats: [
        { value: '99%', label: 'Cobertura nacional' },
        { value: '24/7', label: 'Atención al cliente' },
        { value: '5G', label: 'Red más rápida' }
      ]
    },
    {
      name: 'Fibra',
      color: '#0066cc',
      gradient: 'from-blue-500 to-blue-700',
      headline: 'Velocidad que marca la diferencia',
      subheadline: 'Fibra óptica simétrica hasta 1Gb. Instalación gratuita y WiFi 6 incluido para toda la familia.',
      benefits: ['Hasta 1Gb simétrico', 'WiFi 6 gratis', 'Instalación gratuita', 'Soporte 24h'],
      ctaPrimary: 'Ver planes fibra',
      ctaSecondary: 'Test de velocidad',
      href: '/fibra',
      image: '/wifi-router-home-setup.png',
      stats: [
        { value: '1GB', label: 'Velocidad máxima' },
        { value: '0€', label: 'Instalación' },
        { value: 'WiFi 6', label: 'Última tecnología' }
      ]
    },
    {
      name: 'Convergente',
      color: '#00a699',
      gradient: 'from-teal-500 to-cyan-600',
      headline: 'Todo en uno, todo conectado',
      subheadline: 'Fibra + Móvil con descuentos exclusivos. La mejor experiencia de conectividad para tu hogar y familia.',
      benefits: ['Fibra 600Mb + 5G', 'Descuento del 20%', 'Netflix incluido', 'Líneas adicionales'],
      ctaPrimary: 'Ver convergente',
      ctaSecondary: 'Calcular ahorro',
      href: '/fibra-movil',
      image: '/home-y-fibraymovil.png',
      stats: [
        { value: '20%', label: 'Ahorro combinado' },
        { value: '4 líneas', label: 'Hasta 4 móviles' },
        { value: '600Mb', label: 'Fibra incluida' }
      ]
    }
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length)
    }, 8000) // Cambia cada 8 segundos
    return () => clearInterval(interval)
  }, [services.length])

  const currentService = services[activeService]

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background con gradiente dinámico */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br transition-all duration-1000 ${currentService.gradient}`}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Navegación de servicios */}
      <div className="absolute top-24 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-2">
            {services.map((service, index) => (
              <button
                key={service.name}
                onClick={() => setActiveService(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  index === activeService
                    ? 'bg-white/20 text-white backdrop-blur-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {service.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div className={`text-white transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              {/* Badge de servicio */}
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <div 
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: currentService.color }}
                />
                {currentService.name}
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
                {currentService.headline}
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
                {currentService.subheadline}
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {currentService.benefits.map((benefit, index) => (
                  <div key={benefit} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white/90">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href={currentService.href}
                  className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 hover:shadow-2xl text-center"
                >
                  {currentService.ctaPrimary}
                </Link>
                <Link
                  href={currentService.href}
                  className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-gray-900 transition-all text-center"
                >
                  {currentService.ctaSecondary}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex space-x-8">
                {currentService.stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Imagen/Visual */}
            <div className={`relative transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="relative">
                <img
                  src={currentService.image}
                  alt={currentService.name}
                  className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay con información adicional */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-white font-semibold mb-2">
                      ¿Por qué elegir {currentService.name}?
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-8 h-8 bg-green-500 rounded-full border-2 border-white" />
                        ))}
                      </div>
                      <span className="text-white/90 text-sm">+10k clientes satisfechos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicadores de progreso */}
      <div className="absolute bottom-6 left-0 right-0 z-20">
        <div className="flex justify-center space-x-2">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveService(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeService ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mensaje de conexión flotante */}
      <div className="absolute bottom-20 right-6 max-w-sm hidden lg:block">
        <ConnectionMessage 
          service={currentService.name.toLowerCase() as any} 
          variant="conversion" 
        />
      </div>
    </div>
  )
}
