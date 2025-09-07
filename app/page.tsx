'use client';

import { useState, useEffect } from 'react';
import  PricingCard  from '@/components/ui/pricing-card';
import HeroProfesional from '@/components/ui/hero-profesional';
import { InformationCard } from '@/components/ui/information-card';
import { FAQAccordionSafe } from '@/components/ui/faq-accordion-safe';
import ConversionTrigger from '@/components/ui/conversion-trigger';
import { Shield, Users, Zap, Phone, Tv, Lock, Wifi, Settings, Clock, MapPin, Mail, ArrowRight } from 'lucide-react';
import { formatPriceWithLabel } from '@/lib/utils';
import PageContent from '@/components/page-content';

export default function HomePage() {
  const [cards, setCards] = useState<Array<{
    id: string;
    variant: string;
    planName: string;
    subtitle?: string;
    price: number;
    originalPrice?: number | null;
    isPopular: boolean;
    hasSpeedSelector: boolean;
    speeds: Array<{ id: string; label: string; price: number; originalPrice?: number }>;
    features: string[];
    extras: any[];
    ctaText: string;
    ctaLink: string;
    isModal: boolean;
    page: string;
  }>>([]);
  const [heroConfig, setHeroConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // Cargar tarifas principales
        const cardsRes = await fetch('/api/admin/cards');
        if (cardsRes.ok) {
          const data = await cardsRes.json();
          
          // Filtrar solo las tarifas asignadas a 'home'
          const homeCards = data.filter((card: any) => card.page === 'home');
          
          const transformed = homeCards.map((card: any) => ({
            id: card.id,
            variant: card.variant,
            planName: card.name,
            subtitle: card.subtitle,
            price: card.currentPrice,
            originalPrice: card.originalPrice || null,
            isPopular: card.isPopular || false,
            hasSpeedSelector: card.hasSpeedSelector,
            speeds: card.speeds?.map((s: any) => ({
              ...s,
              price: typeof s.price === 'string' ? parseFloat(s.price) : s.price
            })) || [],
            features: Array.isArray(card.features) ? card.features : JSON.parse(card.features || '[]'),
            extras: card.extras || [],
            ctaText: card.ctaText || 'Contratar ahora',
            ctaLink: card.ctaLink || '/contacto',
            isModal: card.isModal || false,
            page: card.page,
          }));
          
          setCards(transformed);
        }

        // Cargar configuración del hero
        const heroRes = await fetch('/api/admin/hero-config?page=home');
        if (heroRes.ok) {
          const data = await heroRes.json();
          const activeHero = Array.isArray(data)
            ? data.find((c: any) => c.isActive)
            : (data.isActive ? data : null);
          
          if (activeHero) {
            // Ensure highlights is properly parsed if it exists
            const parsedConfig = {
              ...activeHero,
              highlights: activeHero.highlights ? (
                typeof activeHero.highlights === 'string' 
                  ? JSON.parse(activeHero.highlights)
                  : activeHero.highlights
              ) : [],
              primaryCta: typeof activeHero.primaryCta === 'string' 
                ? JSON.parse(activeHero.primaryCta) 
                : activeHero.primaryCta,
              secondaryCta: typeof activeHero.secondaryCta === 'string' 
                ? JSON.parse(activeHero.secondaryCta) 
                : activeHero.secondaryCta,
            };
            setHeroConfig(parsedConfig);
          }
        }
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* === Hero Profesional === */}
      {heroConfig ? (
        <HeroProfesional
          title={heroConfig.title}
          subtitle={heroConfig.subtitle}
          description={heroConfig.description}
          primaryCta={heroConfig.primaryCta}
          secondaryCta={heroConfig.secondaryCta}
          heroImage={heroConfig.heroImage}
          highlights={heroConfig.highlights}
          backgroundType={heroConfig.backgroundType}
          variant={heroConfig.variant}
        />
      ) : (
        <div className="h-96 bg-gradient-to-r from-green-900 to-green-600 flex items-center justify-center">
          <p className="text-white text-xl">Cargando hero...</p>
        </div>
      )}

      {/* === Ofertas Principales === */}
      {cards.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#00aa00]"></div>
                <p className="mt-2 text-gray-600">Cargando ofertas especiales...</p>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cards.map((plan) => {
                    // Asegurar que el plan tenga una variante definida
                    const planWithVariant = {
                      ...plan,
                      variant: plan.variant || 'blue' // Usar 'blue' como fallback
                    };
                    
                    return (
                      <PricingCard
                        key={plan.id}
                        variant={planWithVariant.variant as any}
                        planName={plan.planName}
                        subtitle={plan.subtitle}
                        price={plan.price}
                        originalPrice={plan.originalPrice}
                        hasSpeedSelector={plan.hasSpeedSelector}
                        speeds={plan.speeds}
                        features={plan.features}
                        extras={plan.extras}
                        isPopular={plan.isPopular}
                        isVIP={plan.variant === 'golden' || (typeof plan.planName === 'string' && plan.planName.toLowerCase().includes('vip'))}
                        isPremium={plan.variant === 'premium' || (typeof plan.planName === 'string' && plan.planName.toLowerCase().includes('premium'))}
                        ctaText={plan.ctaText}
                        ctaLink={plan.ctaLink}
                        isModal={plan.isModal}
                        page={plan.page}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* === Ventajas de Prisma === */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Ventajas de contratar Prisma
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InformationCard
              title="Atención humana real"
              description="Sin bots ni esperas. Atención personalizada con personas reales que realmente te escuchan y te ayudan."
              icon="Phone"
            />
            <InformationCard
              title="Red móvil 5G ultrarrápida"
              description="Navega, juega y trabaja con la máxima velocidad y estabilidad de nuestra red 5G de última generación."
              icon="Zap"
            />
            <InformationCard
              title="Fibra simétrica hasta 1Gb"
              description="Velocidades simétricas reales que garantizan la misma velocidad de subida y bajada para toda tu familia."
              icon="Wifi"
            />
            <InformationCard
              title="Instalación premium gratuita"
              description="Instalación profesional sin coste adicional por nuestro equipo técnico especializado en menos de 48 horas."
              icon="Settings"
            />
            <InformationCard
              title="Prisma TV en 4K"
              description="Más de 200 canales en calidad 4K con Netflix, HBO y las mejores plataformas incluidas desde el primer día."
              icon="Tv"
            />
            <InformationCard
              title="Área de cliente premium"
              description="Gestiona todos tus servicios online 24/7 con nuestra plataforma intuitiva y consulta tus facturas al instante."
              icon="Lock"
            />
          </div>
        </div>
      </section>

      {/* === Servicios Habituales === */}
      <ConversionTrigger 
        title="¿Listo para unirte a Prisma?"
        description="Descubre por qué más de 10,000 clientes ya confían en nosotros"
      />

      {/* === Más Servicios === */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Más que telecomunicaciones
            </h2>
            <p className="text-xl text-gray-600">
              Descubre todos nuestros servicios
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InformationCard
              title="Móvil"
              description="5G ultrarrápido con datos ilimitados y las mejores tarifas del mercado."
              icon="Phone"
            />
            <InformationCard
              title="Fibra Óptica"
              description="Velocidades simétricas hasta 1Gb con instalación gratuita y WiFi 6."
              icon="Wifi"
            />
            <InformationCard
              title="Prisma TV"
              description="Televisión en 4K con Netflix, HBO y más plataformas incluidas."
              icon="Tv"
            />
          </div>
        </div>
      </section>

      <PageContent />
      {/* === FAQ === */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Preguntas frecuentes
          </h2>
          <FAQAccordionSafe
            items={[
              {
                id: 'permanencia',
                question: '¿Sin permanencia? ¿En serio?',
                answer: 'Sí. Confiamos tanto en nuestro servicio que no necesitamos atarte con permanencia. Si no estás satisfecho, puedes irte cuando quieras.'
              },
              {
                id: 'atencion',
                question: '¿Cómo es la atención al cliente?',
                answer: '100% humana. Nada de bots. Hablas con una persona real que te escucha, entiende tu caso y te ayuda.'
              },
              {
                id: 'cobertura',
                question: '¿Qué pasa si no tengo cobertura?',
                answer: 'Te ayudamos a encontrar la mejor solución. Si no podemos darte servicio, te recomendamos la mejor alternativa sin cobrarte nada.'
              }
            ]}
          />
        </div>
      </section>
    </div>
  );
}