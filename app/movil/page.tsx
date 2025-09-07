'use client';

import PricingCard from '@/components/ui/pricing-card';
import { InformationCard } from '@/components/ui/information-card';
import { FAQAccordionSafe } from '@/components/ui/faq-accordion-safe';
import ConversionTrigger from '@/components/ui/conversion-trigger';
import { useState, useEffect } from 'react';
import { Phone, Zap, Shield, Check } from 'lucide-react';
import { EnhancedHero } from '@/components/ui/enhanced-hero';

export default function MovilPage() {
  const [mobileTariffs, setMobileTariffs] = useState<{
    eleccion: any[];
    vip: any[];
  }>({
    eleccion: [],
    vip: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [heroConfig, setHeroConfig] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener tarifas
        const res = await fetch('/api/admin/cards?page=movil');
        if (!res.ok) throw new Error('Error cargando tarifas');
        const data = await res.json();
        
        console.log('Tariffs loaded:', data);
        // Filtrar solo las tarjetas activas y guardar todas juntas
        const activeTariffs = data.filter((t: any) => t.isActive !== false);
        
        // Ordenamos primero las normales y luego las VIP/Premium
        const sortedTariffs = [
          ...activeTariffs.filter((t: any) => !t.isPremium && !t.isVIP),
          ...activeTariffs.filter((t: any) => t.isPremium || t.isVIP)
        ];
        
        setMobileTariffs({
          eleccion: sortedTariffs,
          vip: []
        });

        // Obtener FAQs
        const faqRes = await fetch('/api/admin/faq-items?page=movil');
        if (faqRes.ok) {
          const faqData = await faqRes.json();
          setFaqs(faqData);
        }

        // Obtener la configuración del Hero
        const heroRes = await fetch('/api/admin/hero-config?page=movil');
        if (heroRes.ok) {
          const heroData = await heroRes.json();
          // Tomamos la primera configuración activa o cualquiera si no hay ninguna activa
          const activeConfig = heroData.find((config: any) => config.isActive) || heroData[0];
          if (activeConfig) {
            setHeroConfig(activeConfig);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setError(error instanceof Error ? error.message : 'Error desconocido');
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
      <EnhancedHero 
        title={heroConfig?.title || "Las Mejores Tarifas"}
        highlightedText={heroConfig?.subtitle || "de Móvil"}
        description={heroConfig?.description || "Habla y navega a máxima velocidad 5G con nuestros planes de gigas ilimitados."}
        image={heroConfig?.heroImage || "/movil-hero.webp"}
        variant={heroConfig?.variant || "default"}
        primaryCta={{
          text: heroConfig?.primaryCta?.text || "Ver planes",
          href: heroConfig?.primaryCta?.href || "#planes",
          style: "secondary"
        }}
        secondaryCta={{
          text: heroConfig?.secondaryCta?.text || "Contactar",
          href: heroConfig?.secondaryCta?.href || "#contacto",
          style: "outline"
        }}
        highlights={heroConfig?.highlights || [
          { text: "5G Ultra Rápido", style: "badge", className: "bg-gradient-to-r from-[#00aa00]/60 to-[#008800]/60 hover:from-[#00aa00]/80 hover:to-[#008800]/80 backdrop-blur-md transition" },
          { text: "Llamadas ilimitadas", style: "badge", className: "bg-gradient-to-r from-[#0066cc]/60 to-[#0055aa]/60 hover:from-[#0066cc]/80 hover:to-[#0055aa]/80 backdrop-blur-md transition" },
          { text: "Datos Sin Límite", style: "badge", className: "bg-gradient-to-r from-amber-500/60 to-amber-600/60 hover:from-amber-500/80 hover:to-amber-600/80 backdrop-blur-md transition" }
        ]}
        showButtons={heroConfig?.showButtons !== false}
      />

      {/* Conversion Trigger */}
      <ConversionTrigger 
        title="¿Necesitas ayuda para elegir tu tarifa?"
        description="Nuestros expertos te ayudarán a encontrar la tarifa perfecta para ti."
      />

      {/* Todas las Tarifas Móviles */}
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
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {mobileTariffs.eleccion.map((plan) => {
                  // Asegurarse de que cada plan tenga una variante definida
                  const planWithVariant = {
                    ...plan,
                    variant: plan.variant || 'blue' // Usar 'blue' como fallback si no hay variante
                  };
                  
                  console.log('Rendering plan:', { 
                    id: plan.id, 
                    name: plan.name, 
                    variant: planWithVariant.variant
                  });
                  
                  return (
                    <PricingCard
                      key={plan.id}
                      {...planWithVariant}
                      isVIP={plan.isVIP}
                      isPremium={plan.isPremium}
                    />
                  );
                })}
              </div>
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
              icon="Wifi"
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
