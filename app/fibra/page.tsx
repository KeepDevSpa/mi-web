"use client";

import { useState, useEffect } from "react";
import  PricingCard  from "@/components/ui/pricing-card";
import { InformationCard } from '@/components/ui/information-card';
import { FAQAccordionSafe } from '@/components/ui/faq-accordion-safe';
import ConversionTrigger from '@/components/ui/conversion-trigger';
import { PriceDisplay } from '@/components/ui/price-display';
import Image from 'next/image';

/**
 * Página de fibra con estructura homogénea y tarjetas personalizables desde admin
 * ESTRUCTURA: Hero → ConversionTrigger → PriceCards → InformationCards → FAQ
 */
export default function FibraPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fibraCards, setFibraCards] = useState<any[]>([]);
  const [informationCards, setInformationCards] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Cargar tarjetas de fibra
        const cardsResponse = await fetch('/api/admin/cards?page=fibra');
        if (cardsResponse.ok) {
          const cardsData = await cardsResponse.json();
          setFibraCards(cardsData);
        }

        // Cargar información cards
        const infoResponse = await fetch('/api/admin/information-cards?page=fibra');
        if (infoResponse.ok) {
          const infoData = await infoResponse.json();
          setInformationCards(infoData.filter((card: any) => card.isActive));
        }

        // Cargar FAQs
        const faqResponse = await fetch('/api/admin/faq-items?page=fibra');
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

  // Contenido hardcoded según la imagen proporcionada - Fibra
  const hardcodedFibraCards = [
    {
      id: 'fibra-plus',
      name: 'Fibra Plus',
      subtitle: 'Buen servicio de fibra para tu hogar',
      variant: 'medium',
      features: [
        'Fibra óptica simétrica',
        'Router WiFi 6 incluido',
        'Instalación gratuita',
        'Soporte técnico 24/7',
        'Sin permanencia'
      ],
      speeds: [
        { id: '300mb', label: '300Mb', price: 29.95 },
        { id: '600mb', label: '600Mb', price: 31.95 },
        { id: '1000mb', label: '1000Mb', price: 33.95 }
      ],
      extras: [
        {
          id: 'linea-movil',
          label: 'Añade una línea móvil desde 5€',
          price: 5,
          description: 'Línea móvil adicional'
        },
        {
          id: 'tv-basico',
          label: 'Añade TV básico',
          price: 8,
          description: 'Paquete básico de televisión'
        }
      ],
      ctaText: '¡Lo quiero!',
      showHeaderSelectors: false,
      hasSpeedSelector: true
    },
    {
      id: 'fibra-vip',
      name: 'Fibra VIP',
      subtitle: 'Servicio Semiprofesional',
      variant: 'golden',
      features: [
        'Fibra óptica simétrica premium',
        'Router WiFi 6 Pro incluido',
        'Instalación gratuita prioritaria',
        'Soporte técnico premium 24/7',
        'Sin permanencia',
        'IP estática incluida'
      ],
      speeds: [
        { id: '300mb-vip', label: '300Mb', price: 49.95 },
        { id: '600mb-vip', label: '600Mb', price: 56.95 },
        { id: '1000mb-vip', label: '1000Mb', price: 64.95 }
      ],
      extras: [
        {
          id: 'linea-movil-premium',
          label: 'Añade línea móvil premium',
          price: 15,
          description: 'Línea móvil con datos ilimitados'
        },
        {
          id: 'cloud-storage-pro',
          label: 'Añade Cloud Storage Pro',
          price: 12,
          description: '1TB de almacenamiento en la nube'
        },
        {
          id: 'tv-premium',
          label: 'Añade TV Premium',
          price: 20,
          description: 'Todos los canales + deportes'
        }
      ],
      ctaText: '¡Lo quiero!',
      isPopular: true,
      showHeaderSelectors: false,
      hasSpeedSelector: true
    }
  ];

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
            src="/conexion-internet.jpg"
            alt="Hombre joven disfrutando de la conexión de fibra óptica"
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
                ¿Qué tarifa de <br />
                <span className="text-[#ffc600]">Fibra</span> <br />
                es para ti?
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Nuestra conexión de alta velocidad <br />
                con la tarifa de fibra que mejor se adapte a tus necesidades.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 3. PRICE CARDS PERSONALIZADAS CON ESTRUCTURA ADMIN */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Encuentra tu tarifa de Fibra
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Las tarifas de Fibra de Prisma te ofrecen la mejor conexión a internet para tu hogar o empresa.
            </p>
          </div>

          {/* Cards usando el componente PricingCard personalizable desde admin */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {hardcodedFibraCards.map((card) => {
                // Asegurarse de que cada tarjeta tenga una variante definida
                const cardWithVariant = {
                  ...card,
                  variant: card.variant || 'blue' // Usar 'blue' como fallback
                };
                
                return (
                  <PricingCard
                    key={card.id}
                    variant={cardWithVariant.variant as any}
                    planName={card.name}
                    subtitle={card.subtitle}
                    isPopular={card.isPopular}
                    isVIP={card.variant === 'golden' || card.name.toLowerCase().includes('vip')}
                    isPremium={card.variant === 'premium' || card.name.toLowerCase().includes('premium')}
                    hasSpeedSelector={card.hasSpeedSelector}
                    speeds={card.speeds}
                    features={card.features}
                    extras={card.extras}
                    ctaText={card.ctaText}
                    price={card.speeds && card.speeds.length > 0 ? card.speeds[0].price : 0}
                  />
                );
              })}
            </div>
          </div>

          {/* Información oficial de la API (tarjetas dinámicas desde admin) */}
          {fibraCards.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {fibraCards.map((card) => {
                  // Asegurarse de que cada tarjeta tenga una variante definida
                  const cardWithVariant = {
                    ...card,
                    variant: card.variant || 'blue' // Usar 'blue' como fallback
                  };
                  
                  return (
                    <PricingCard
                      key={card.id}
                      variant={cardWithVariant.variant as any}
                      planName={card.name}
                      isPopular={card.isPopular}
                      isVIP={card.isVIP}
                      isPremium={card.isPremium}
                      hasSpeedSelector={card.hasSpeedSelector}
                      speeds={card.speeds?.map((s: any) => ({ ...s, price: Number(s.price), originalPrice: Number(s.originalPrice) })) || []}
                      features={card.features || []}
                      extras={card.extras || []}
                      ctaText={card.ctaText || '¡Quiero fibra!'}
                      hasCoverageSelector={card.hasCoverageSelector}
                      coverages={card.coverages || []}
                      hasDataSelector={card.hasDataSelector}
                      dataOptions={card.dataOptions || []}
                      price={card.currentPrice || (card.speeds && card.speeds.length > 0 ? Number(card.speeds[0].price) : 0)}
                    />
                  );
                })}
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
                ¿Por qué elegir nuestra Fibra Óptica?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Tecnología punta, instalación profesional y el mejor servicio técnico del sector.
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

      {/* 5. FAQ SECTION */}
      {faqs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Preguntas Frecuentes sobre Fibra
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Resolvemos todas tus dudas sobre velocidad, instalación y funcionamiento.
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
