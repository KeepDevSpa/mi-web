// v5/components/ui/hero-section.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import CoverageCheck from "@/components/coverage-check"; // Asumimos que este componente existe
import { PricingCard, Speed, Extra } from '@/lib/types'; // Asumimos que tienes un archivo de tipos

// Definimos el tipo de la oferta que recibiremos
type HeroOffer = (PricingCard & { speeds: Speed[]; extras: Extra[] }) | null;

interface HeroSectionProps {
  heroOffer: HeroOffer;
}

export const HeroSection = ({ heroOffer }: HeroSectionProps) => {
  const [showCoverage, setShowCoverage] = useState(false);

  const handleHeroCtaClick = () => {
    if (heroOffer) {
      setShowCoverage(true);
    }
  };

  return (
    <>
      <section
        className="relative h-[500px] w-full cursor-pointer overflow-hidden"
        onClick={handleHeroCtaClick}
      >
        <Image
          src="/pool-selfie-hero.jpeg"
          alt="Chicos en piscina haciéndose un selfie"
          fill
          style={{ objectFit: 'cover' }}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        {/* Aquí podrías añadir texto sobre la imagen si quisieras */}
      </section>

      {/* El formulario de cobertura se mostrará aquí cuando showCoverage sea true */}
      {showCoverage && (
        <section className="py-16 px-4 bg-gray-50" id="coverage-form">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {heroOffer ? `Consigue tu ${heroOffer.name}` : '¿Estás en nuestra zona de cobertura?'}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Compruébalo ahora mismo introduciendo tus datos.
            </p>
            <CoverageCheck onClose={() => setShowCoverage(false)} selectedOffer={heroOffer?.name} />
          </div>
        </section>
      )}
    </>
  );
};