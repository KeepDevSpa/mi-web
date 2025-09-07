'use client';

import PricingCard from '@/components/ui/pricing-card';
import { InformationCard } from '@/components/ui/information-card';
import { FAQAccordionSafe } from '@/components/ui/faq-accordion-safe';
import ConversionTrigger from '@/components/ui/conversion-trigger';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Wifi, Phone, Shield, Check } from 'lucide-react';

interface PlanSpeed {
  id: string;
  label: string;
  price: number;
  originalPrice?: number;
}

interface PlanExtra {
  id: string;
  label: string;
  price: number;
  description?: string;
}

interface Plan {
  id: string;
  name: string;
  variant: "blue" | "lightgreen" | "golden" | "dark" | "purple" | "light" | "premium" | "vodafone" | "orange" | "movistar";
  page: string;
  subtitle?: string;
  currentPrice: number;
  originalPrice?: number;
  hasSpeedSelector?: boolean;
  speeds?: PlanSpeed[];
  extras?: PlanExtra[];
  features: string[];
  isPopular?: boolean;
  isModal?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FibraMovilPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener planes
        const res = await fetch('/api/admin/cards?page=fibra-movil');
        if (!res.ok) throw new Error('Error cargando planes');
        const data = await res.json();
        setPlans(data);

        // Obtener FAQs
        const faqRes = await fetch('/api/admin/faq-items?page=fibra-movil');
        if (faqRes.ok) {
          const faqData = await faqRes.json();
          setFaqs(faqData);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'Error cargando los datos');
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
            src="/fibra-movil-hero.webp"
            alt="Fibra y móvil"
            fill
            className="object-cover opacity-25"
            priority
          />
        </div>
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold text-white mb-6">
                Combina Fibra y Móvil
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Los mejores packs convergentes con fibra simétrica y líneas móviles con datos ilimitados.
              </p>
              <div className="flex gap-4">
                <a href="#planes" className="bg-white text-[#00aa00] px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition">
                  Ver packs
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
      <ConversionTrigger 
        title="¿Te ayudamos a elegir tu pack?"
        description="Nuestros expertos te ayudarán a encontrar el pack perfecto para tu hogar."
      />

      {/* Planes */}
      {plans.length > 0 && (
        <section id="planes" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Nuestros packs de Fibra y Móvil
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Elige el pack que mejor se adapte a tus necesidades. Todo en una sola factura.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <PricingCard
                  key={plan.id}
                  planName={plan.name}
                  subtitle={plan.subtitle}
                  price={plan.currentPrice}
                  originalPrice={plan.originalPrice}
                  variant={plan.variant}
                  hasSpeedSelector={plan.hasSpeedSelector}
                  speeds={plan.speeds}
                  extras={plan.extras}
                  features={plan.features}
                  isPopular={plan.isPopular}
                  ctaText={plan.ctaText}
                  ctaLink={plan.ctaLink}
                  isModal={plan.isModal}
                  page={plan.page}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ventajas */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir nuestros packs?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InformationCard
              title="Fibra simétrica real"
              description="Velocidad simétrica garantizada. La misma velocidad de subida y bajada."
              icon="Wifi"
            />
            <InformationCard
              title="Datos móviles ilimitados"
              description="Navega sin límites en tu móvil con la mejor cobertura 5G."
              icon="Phone"
            />
            <InformationCard
              title="Instalación premium"
              description="Instalación profesional gratuita en menos de 48h por técnicos certificados."
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
                Resolvemos tus dudas sobre nuestros packs de fibra y móvil.
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
