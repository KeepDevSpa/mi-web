"use client";

import { useState, useEffect } from "react";
import { PricingCard } from "@/components/ui/pricing-card";
import { InformationCard } from '@/components/ui/information-card';
import { FAQAccordionSafe } from '@/components/ui/faq-accordion-safe';
import ConversionTrigger from '@/components/ui/conversion-trigger';
import EnergiaForm from '@/components/energia-form';
import Image from 'next/image';

/**
 * Página de energía con estructura homogénea
 * ESTRUCTURA: Hero → ConversionTrigger → PriceCards → InformationCards → ValuesPrisma → FAQ
 */
export default function EnergiaPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [energiaCards, setEnergiaCards] = useState<any[]>([]);
  const [informationCards, setInformationCards] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Cargar tarjetas de energía
        const cardsResponse = await fetch('/api/admin/cards?page=energia');
        if (cardsResponse.ok) {
          const cardsData = await cardsResponse.json();
          setEnergiaCards(cardsData);
        }

        // Cargar información cards
        const infoResponse = await fetch('/api/admin/information-cards?page=energia');
        if (infoResponse.ok) {
          const infoData = await infoResponse.json();
          setInformationCards(infoData.filter((card: any) => card.isActive));
        }

        // Cargar FAQs
        const faqResponse = await fetch('/api/admin/faq-items?page=energia');
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
            src="/home-office-remote-work.png"
            alt="Oficina en casa con energía eficiente"
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
                Energía{" "}
                <span className="text-[#ea580c]">Inteligente</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Ahorra hasta un 30% en tu factura eléctrica con nuestras soluciones energéticas sostenibles.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-gradient-to-r from-[#ea580c]/20 to-[#ffc100]/20 backdrop-blur-sm border border-[#ea580c]/30 rounded-lg px-4 py-2">
                  <span className="text-[#ea580c] font-semibold">100% Renovable</span>
                </div>
                <div className="bg-[#ea580c]/20 backdrop-blur-sm border border-[#ea580c]/30 rounded-lg px-4 py-2">
                  <span className="text-[#ea580c] font-semibold">Autoconsumo</span>
                </div>
                <div className="bg-[#ffc100]/20 backdrop-blur-sm border border-[#ffc100]/30 rounded-lg px-4 py-2">
                  <span className="text-[#ffc100] font-semibold">Baterías Incluidas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONVERSION TRIGGER (Gatillo Mental) */}
      <ConversionTrigger
        title="¿Cansado de facturas de luz cada vez más altas?"
        description="Más de 8,000 hogares ya han mejorado su factura gracias a nuestro servicio de intermediación energética, donde conseguimos ahorros significativos a nuestros clientes."
        highlight="Te hacemos la comparativa sin compromiso y si estás interesado nos encargamos de todos los trámites para que tengas tu oferta activa lo antes posible."
        serviceColor="energia"
      />

      {/* 3. PRICE CARDS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ea580c] mx-auto mb-4"></div>
              <p className="text-zinc-500">Cargando soluciones energéticas...</p>
            </div>
          ) : energiaCards.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Nuestras Soluciones Energéticas
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Autoconsumo solar, baterías inteligentes y sistemas de gestión energética avanzados.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {energiaCards.map((card) => (
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
                    ctaText={card.ctaText || '¡Quiero ahorrar!'}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-gray-600">
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Próximamente nuevas soluciones energéticas
              </h3>
              <p className="text-gray-500">
                Estamos preparando las mejores opciones de autoconsumo y energía renovable.
              </p>
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
                ¿Por qué elegir nuestras Soluciones Energéticas?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Tecnología solar avanzada, instalación certificada y máximo rendimiento garantizado.
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
                Preguntas Frecuentes sobre Energía Solar
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Resolvemos todas tus dudas sobre autoconsumo, instalación y rentabilidad.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <FAQAccordionSafe items={faqs} />
            </div>
          </div>
        </section>
      )}

      {/* Formulario de Energía */}
      <EnergiaForm />
    </div>
  );
}
