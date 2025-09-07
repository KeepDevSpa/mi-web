'use client';

import PricingCard from '@/components/ui/pricing-card';
import { InformationCard } from '@/components/ui/information-card';
import { FAQAccordionSafe } from '@/components/ui/faq-accordion-safe';
import ConversionTrigger from '@/components/ui/conversion-trigger';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Phone, Zap, Shield, Check } from 'lucide-react';

export default function MovilPage() {
  const [mobileTariffs, setMobileTariffs] = useState({
    eleccion: [],
    vip: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener tarifas
        const res = await fetch('/api/admin/cards?page=movil');
        if (!res.ok) throw new Error('Error cargando tarifas');
        const data = await res.json();
        
        setMobileTariffs({
          eleccion: data.filter(t => !t.isPremium && !t.isVIP),
          vip: data.filter(t => t.isPremium || t.isVIP)
        });

        // Obtener FAQs
        const faqRes = await fetch('/api/admin/faq-items?page=movil');
        if (faqRes.ok) {
          const faqData = await faqRes.json();
          setFaqs(faqData);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00aa00]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-[#00aa00]/90 to-[#00aa00]/70">
        <div className="absolute inset-0">
          <Image
            src="/movil-hero.webp"
            alt="Tarifas móviles"
            fill
            className="object-cover opacity-25"
            priority
          />
        </div>
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold text-white mb-6">
                Las mejores tarifas móviles
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Navega sin límites con nuestras tarifas móviles. Datos ilimitados, minutos ilimitados y las mejores coberturas.
              </p>
              <div className="flex gap-4">
                <a href="#planes" className="bg-white text-[#00aa00] px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition">
                  Ver planes
                </a>
                <a href="#contacto" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                  Contactar
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Trigger */}
      <ConversionTrigger />

      {/* Tarifas Móviles de Elección */}
      {mobileTariffs.eleccion.length > 0 && (
        <section id="planes" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Elige tu plan móvil
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Tenemos el plan perfecto para ti. Elige entre nuestras tarifas móviles y disfruta de la mejor cobertura.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mobileTariffs.eleccion.map((plan) => (
                <PricingCard
                  key={plan.id}
                  {...plan}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tarifas VIP */}
      {mobileTariffs.vip.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-[#00aa00] font-semibold text-sm uppercase tracking-wider">Premium</span>
              <h2 className="text-4xl font-bold text-gray-900 mb-4 mt-2">
                Planes VIP
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Descubre nuestros planes premium con beneficios exclusivos.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mobileTariffs.vip.map((plan) => (
                <PricingCard
                  key={plan.id}
                  {...plan}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ventajas */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir nuestras tarifas móviles?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InformationCard
              title="Datos ilimitados reales"
              description="Navega sin preocuparte por los datos. Sin letra pequeña, sin restricciones."
              icon="Zap"
            />
            <InformationCard
              title="Mejor cobertura 5G"
              description="Disfruta de la máxima velocidad con nuestra cobertura 5G de última generación."
              icon="Signal"
            />
            <InformationCard
              title="Sin permanencia"
              description="Libertad total. Sin ataduras ni compromisos. Cancela cuando quieras."
              icon="Shield"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Preguntas frecuentes
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Resolvemos tus dudas sobre nuestras tarifas móviles.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <FAQAccordionSafe items={faqs} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
