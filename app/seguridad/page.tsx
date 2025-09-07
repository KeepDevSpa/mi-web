"use client";

import { useState, useEffect } from "react";
import PricingCard  from "@/components/ui/pricing-card";
import { InformationCard } from '@/components/ui/information-card';
import { FAQAccordionSafe } from '@/components/ui/faq-accordion-safe';
import ConversionTrigger from '@/components/ui/conversion-trigger';
import Image from 'next/image';

/**
 * Página de seguridad con estructura homogénea
 * ESTRUCTURA: Hero → ConversionTrigger → PriceCards → InformationCards → ValuesPrisma → FAQ
 */
export default function SeguridadPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seguridadCards, setSeguridadCards] = useState<any[]>([]);
  const [informationCards, setInformationCards] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Cargar tarjetas de seguridad
        const cardsResponse = await fetch('/api/admin/cards?page=seguridad');
        if (cardsResponse.ok) {
          const cardsData = await cardsResponse.json();
          setSeguridadCards(cardsData);
        }

        // Cargar información cards
        const infoResponse = await fetch('/api/admin/information-cards?page=seguridad');
        if (infoResponse.ok) {
          const infoData = await infoResponse.json();
          setInformationCards(infoData.filter((card: any) => card.isActive));
        }

        // Cargar FAQs
        const faqResponse = await fetch('/api/admin/faq-items?page=seguridad');
        if (faqResponse.ok) {
          const faqData = await faqResponse.json();
          setFaqs(faqData.filter((faq: any) => faq.isActive));
        }

        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Error de conexión');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-red-600">
          <p>Error al cargar la página: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative h-[500px] bg-gradient-to-r from-black/50 to-black/30">
        <div className="absolute inset-0">
          <Image
            src="/security-system-technician.png"
            alt="Técnico instalando sistema de seguridad"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        </div>
        <div className="relative z-10 flex items-center h-full">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Consultoría en{" "}
                <span className="text-[#ffc100]">Seguridad</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Analizamos tus necesidades y te recomendamos la solución de seguridad perfecta para tu hogar.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-gradient-to-r from-[#475569]/20 to-[#ffc100]/20 backdrop-blur-sm border border-[#ffc100]/30 rounded-lg px-4 py-2">
                  <span className="text-[#ffc100] font-semibold">Análisis Gratuito</span>
                </div>
                <div className="bg-[#475569]/20 backdrop-blur-sm border border-[#475569]/30 rounded-lg px-4 py-2">
                  <span className="text-white font-semibold">Recomendación Experta</span>
                </div>
                <div className="bg-[#ffc100]/20 backdrop-blur-sm border border-[#ffc100]/30 rounded-lg px-4 py-2">
                  <span className="text-[#ffc100] font-semibold">Solución Personalizada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONVERSION TRIGGER (Gatillo Mental) */}
      <ConversionTrigger
        title="¿No sabes qué tipo de seguridad necesitas realmente?"
        description="Más de 15,000 familias ya han descubierto su solución perfecta con nuestro análisis gratuito."
        highlight="Te evaluamos sin compromiso y te recomendamos exactamente lo que necesitas."
        serviceColor="seguridad"
      />

      {/* 3. PRICE CARDS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#475569] mx-auto mb-4"></div>
              <p className="text-zinc-500">Cargando paquetes de seguridad...</p>
            </div>
          ) : seguridadCards.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Nuestras Áreas de Especialización
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Tras analizar tus necesidades, te orientamos hacia la solución que mejor se adapta a tu situación específica.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {seguridadCards.map((card) => (
                  <PricingCard
                    key={card.id}
                    variant={card.variant as any}
                    planName={card.name}
                    isPopular={card.isPopular}
                    hasSpeedSelector={card.hasSpeedSelector}
                    speeds={card.speeds?.map((s: any) => ({ ...s, price: Number(s.price), originalPrice: Number(s.originalPrice) })) || []}
                    features={card.features || []}
                    extras={card.extras || []}
                    rateTier={card.rateTier as 1 | 2 | 3}
                    ctaText={card.ctaText || '¡Quiero protección!'}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-gray-600">
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Solicita tu Análisis Gratuito
              </h3>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Evaluamos tus necesidades específicas y te recomendamos la solución perfecta entre:
              </p>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                <div className="bg-gradient-to-br from-[#475569]/10 to-[#ffc100]/10 rounded-lg p-6 border border-gray-200">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#475569] flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Hogar Digital Seguro</h4>
                  <p className="text-sm text-gray-600">Alarmas inteligentes y monitoreo 24/7</p>
                </div>
                <div className="bg-gradient-to-br from-[#ffc100]/10 to-[#475569]/10 rounded-lg p-6 border border-gray-200">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#ffc100] flex items-center justify-center">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Control Parental</h4>
                  <p className="text-sm text-gray-600">Protección digital avanzada para menores</p>
                </div>
                <div className="bg-gradient-to-br from-[#475569]/10 to-[#ffc100]/10 rounded-lg p-6 border border-gray-200">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#475569] flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Ciberseguridad</h4>
                  <p className="text-sm text-gray-600">Protección contra amenazas digitales</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. INFORMATION CARDS */}
      {informationCards.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ¿Por qué nuestro método de consultoría funciona?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                No vendemos productos estándar. Analizamos tu situación específica y te orientamos hacia la protección que realmente necesitas.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {informationCards.map((card) => (
                <InformationCard
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. PARTNERS MARQUEE */}
      <section className="py-12 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Trabajamos con las mejores empresas de seguridad
            </h2>
            <p className="text-gray-600">
              Partners oficiales para garantizar la máxima calidad en cada instalación
            </p>
          </div>
          
          {/* Marquee Container */}
          <div className="relative">
            <div className="flex overflow-hidden">
              <div className="flex animate-marquee whitespace-nowrap">
                {/* First set of logos */}
                <div className="mx-16 flex items-center">
                  <img src="/logos/securitas-direct.svg" alt="Securitas Direct" className="h-20 grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
                <div className="mx-16 flex items-center">
                  <img src="/logos/prosegur.svg" alt="Prosegur" className="h-20 grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
                <div className="mx-16 flex items-center">
                  <img src="/logos/adt.svg" alt="ADT" className="h-20 grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
                <div className="mx-16 flex items-center">
                  <img src="/logos/segurma.svg" alt="Segurma" className="h-20 grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
                <div className="mx-16 flex items-center">
                  <img src="/logos/acacio.svg" alt="Acacio" className="h-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-60" />
                </div>
                <div className="mx-16 flex items-center">
                  <img src="/logos/sicor.svg" alt="Sicor" className="h-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-60" />
                </div>
                <div className="mx-16 flex items-center">
                  <img src="/logos/3d-alarmas.svg" alt="3D Alarmas" className="h-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-60" />
                </div>
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="flex animate-marquee whitespace-nowrap" aria-hidden="true">
                <div className="mx-16 flex items-center">
                  <img src="/logos/securitas-direct.svg" alt="Securitas Direct" className="h-20 grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
                <div className="mx-16 flex items-center">
                  <img src="/logos/prosegur.svg" alt="Prosegur" className="h-20 grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
                <div className="mx-16 flex items-center">
                  <img src="/logos/adt.svg" alt="ADT" className="h-20 grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
                <div className="mx-16 flex items-center">
                  <img src="/logos/segurma.svg" alt="Segurma" className="h-20 grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
                <div className="mx-16 flex items-center">
                  <img src="/logos/acacio.svg" alt="Acacio" className="h-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-60" />
                </div>
                <div className="mx-16 flex items-center">
                  <img src="/logos/sicor.svg" alt="Sicor" className="h-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-60" />
                </div>
                <div className="mx-16 flex items-center">
                  <img src="/logos/3d-alarmas.svg" alt="3D Alarmas" className="h-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-60" />
                </div>
              </div>
            </div>
            
            {/* Gradient overlays for smooth edges */}
            <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
            <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              <span className="opacity-60">En negociaciones:</span> Acacio, Sicor, 3D Alarmas
            </p>
          </div>
        </div>
      </section>

      {/* FORMULARIO ESPECIALIZADO DE SEGURIDAD */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Solicita tu Consultoría Personalizada
              </h2>
              <p className="text-lg text-gray-600">
                Cuéntanos tus necesidades y te recomendaremos la solución de seguridad perfecta
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#475569]/5 to-[#ffc100]/5 rounded-2xl p-8 border border-gray-200">
              <form className="space-y-6">
                {/* Datos de contacto */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#475569] focus:border-transparent transition-all"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Teléfono de contacto *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#475569] focus:border-transparent transition-all"
                      placeholder="Tu teléfono"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#475569] focus:border-transparent transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#475569] focus:border-transparent transition-all"
                      placeholder="28001"
                    />
                  </div>
                </div>

                {/* Tipos de seguridad */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-4">
                    ¿Qué tipo de protección necesitas? *
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:border-[#475569] hover:bg-[#475569]/5 transition-all cursor-pointer">
                      <input type="checkbox" className="mt-1 text-[#475569] focus:ring-[#475569]" />
                      <div>
                        <span className="font-medium text-gray-900">Protección robos - Segunda vivienda</span>
                        <p className="text-sm text-gray-600 mt-1">Alarmas y monitoreo para vivienda vacacional</p>
                      </div>
                    </label>

                    <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:border-[#475569] hover:bg-[#475569]/5 transition-all cursor-pointer">
                      <input type="checkbox" className="mt-1 text-[#475569] focus:ring-[#475569]" />
                      <div>
                        <span className="font-medium text-gray-900">Protección robos - Vivienda principal</span>
                        <p className="text-sm text-gray-600 mt-1">Seguridad completa para tu hogar habitual</p>
                      </div>
                    </label>

                    <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:border-[#475569] hover:bg-[#475569]/5 transition-all cursor-pointer">
                      <input type="checkbox" className="mt-1 text-[#475569] focus:ring-[#475569]" />
                      <div>
                        <span className="font-medium text-gray-900">Seguridad Digital</span>
                        <p className="text-sm text-gray-600 mt-1">Protección contra amenazas cibernéticas</p>
                      </div>
                    </label>

                    <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:border-[#475569] hover:bg-[#475569]/5 transition-all cursor-pointer">
                      <input type="checkbox" className="mt-1 text-[#475569] focus:ring-[#475569]" />
                      <div>
                        <span className="font-medium text-gray-900">Control Parental</span>
                        <p className="text-sm text-gray-600 mt-1">Protección digital para menores</p>
                      </div>
                    </label>

                    <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:border-[#475569] hover:bg-[#475569]/5 transition-all cursor-pointer md:col-span-2">
                      <input type="checkbox" className="mt-1 text-[#475569] focus:ring-[#475569]" />
                      <div>
                        <span className="font-medium text-gray-900">Protección de robos - Negocio</span>
                        <p className="text-sm text-gray-600 mt-1">Seguridad comercial y empresarial</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Comentarios adicionales */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Comentarios adicionales
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#475569] focus:border-transparent transition-all"
                    placeholder="Cuéntanos más detalles sobre tu situación o necesidades específicas..."
                  ></textarea>
                </div>

                {/* Botón de envío */}
                <div className="text-center pt-6">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#475569] to-[#475569]/80 text-white px-8 py-4 rounded-lg font-semibold hover:from-[#475569]/90 hover:to-[#475569]/70 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Solicitar Consultoría Gratuita</span>
                    </span>
                  </button>
                  <p className="text-sm text-gray-500 mt-3">
                    Te contactaremos en menos de 24h para hacer tu análisis personalizado
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      {faqs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Preguntas Frecuentes sobre Consultoría de Seguridad
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Resolvemos tus dudas sobre nuestro proceso de análisis y recomendación personalizada.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <FAQAccordionSafe items={faqs} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
