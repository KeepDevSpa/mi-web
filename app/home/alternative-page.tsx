'use client';

import { HeroHome } from '@/components/ui/hero-home';
import InstallationTimeline from '@/components/ui/installation-timeline';
import VentajasDiferenciales from '@/components/ui/ventajas-diferenciales';
import TestimoniosAvanzados from '@/components/ui/testimonios-avanzados';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CoverageCheck from '@/components/coverage-check';
import { useEffect, useState } from 'react';

export default function AlternativeHomePage() {
  const [heroConfig, setHeroConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener la configuración del Hero
        const heroRes = await fetch('/api/admin/hero-config?page=home');
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
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <HeroHome 
        title={heroConfig?.title || "Descubre Nuestra"}
        highlightedText={heroConfig?.subtitle || "Nueva Fibra + Móvil"}
        description={heroConfig?.description || "Conectividad de alta velocidad con los mejores precios y sin permanencia. Disfruta de Internet y móvil sin límites."}
        image={heroConfig?.heroImage || "/home-hero.webp"}
        variant={heroConfig?.variant || "default"}
        primaryCta={heroConfig?.primaryCta || {
          text: "Ver ofertas",
          href: "#ofertas"
        }}
        secondaryCta={heroConfig?.secondaryCta || {
          text: "Comprobar cobertura",
          href: "#coverage-form"
        }}
        highlights={heroConfig?.highlights || [
          { text: "Fibra hasta 1Gbps", className: "bg-gradient-to-r from-[#00aa00]/60 to-[#008800]/60 hover:from-[#00aa00]/80 hover:to-[#008800]/80 backdrop-blur-md transition" },
          { text: "Móvil con 5G", className: "bg-gradient-to-r from-[#0066cc]/60 to-[#0055aa]/60 hover:from-[#0066cc]/80 hover:to-[#0055aa]/80 backdrop-blur-md transition" },
          { text: "Sin permanencia", className: "bg-gradient-to-r from-amber-500/60 to-amber-600/60 hover:from-amber-500/80 hover:to-amber-600/80 backdrop-blur-md transition" }
        ]}
        showButtons={heroConfig?.showButtons !== false}
      />

      {/* Coverage Check Form */}
      <div id="coverage-form">
        <CoverageCheck />
      </div>

      {/* Installation Timeline */}
      <InstallationTimeline 
        totalInstallations={1071}
        averageDays={5}
        showStats={true}
      />

      {/* Ventajas Diferenciales */}
      <VentajasDiferenciales 
        showStats={true}
        animateOnScroll={true}
      />

      {/* Testimonios Avanzados */}
      <TestimoniosAvanzados />

    </div>
  );
}
