'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const OfferSummaryModal = dynamic(() => import('./offer-summary-modal'));

import { IconMap, CORPORATE_COLOR_CLASSES, getThemedIcon, IconName } from '@/lib/icon-config';
type CorporateColor = 'primary' | 'secondary' | 'white' | 'gray';

interface HighlightItem {
  icon: IconName;
  text: string;
  color: CorporateColor;
}

interface HeroProfesionalProps {
  title: string;
  subtitle: string;
  description: string;
  primaryCta: {
    text: string;
    href: string;
    offerId?: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
  heroImage?: string;
  highlights?: HighlightItem[];
  backgroundType?: 'image' | 'gradient' | 'solid';
  variant?: 'home' | 'fibra' | 'movil' | 'empresa';
  offerId?: string;
}

export default function HeroProfesional({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  heroImage = '/Hero-Banner.webp',
  highlights = [],
  backgroundType = 'image',
  variant = 'home',
}: HeroProfesionalProps) {
  const [showOfferModal, setShowOfferModal] = useState(false);

  const handleCtaClick = () => {
    if (primaryCta.offerId) {
      setShowOfferModal(true);
    } else if (primaryCta.href.startsWith('#') || primaryCta.href.startsWith('/')) {
      window.location.href = primaryCta.href;
    } else {
      window.open(primaryCta.href, '_blank');
    }
  };

  const handleContactClick = (offerName: string, price: number) => {
    setShowOfferModal(false);
    (window as any).showContactModal?.(offerName, price, '/contacto');
  };
  const getColors = (variant: string) => {
    switch (variant) {
      case 'fibra':
        return { primary: 'from-blue-600 to-cyan-600', accent: 'text-cyan-400' };
      case 'movil':
        return { primary: 'from-purple-600 to-pink-600', accent: 'text-pink-400' };
      case 'empresa':
        return { primary: 'from-gray-700 to-gray-900', accent: 'text-gray-300' };
      default:
        return { primary: 'from-green-600 to-blue-600', accent: 'text-green-400' };
    }
  };

  const colors = getColors(variant);

  return (
    <section className="relative h-[500px] w-full overflow-hidden">
      {/* Background Image */}
      {backgroundType === 'image' && (
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="Fondo del hero"
            fill
            className="object-cover"
            priority
            quality={80}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      )}

      {/* Background Gradient */}
      {backgroundType === 'gradient' && (
        <div className={`absolute inset-0 z-0 bg-gradient-to-br ${getColors(variant).primary}`}></div>
      )}

      {/* Contenido */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 items-center w-full px-6">
          <div className="text-white">
            {/* Subtítulo */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
              <span className={`w-2 h-2 rounded-full ${colors.accent}`}></span>
              <span className="text-sm font-semibold tracking-wide">{subtitle}</span>
            </div>

            {/* Título */}
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              {title}
            </h1>

            {/* Descripción */}
            <p className="text-lg mb-8 max-w-lg leading-relaxed opacity-90">
              {description}
            </p>

            {/* Highlights */}
            {highlights && highlights.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-8">
                {highlights.map((item: HighlightItem, i: number) => {
                  // Verificar que item.icon es una clave válida de IconMap
                  const isValidIcon = Object.keys(IconMap).includes(item.icon);
                  
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm font-medium"
                    >
                      {isValidIcon 
                        ? getThemedIcon(item.icon, item.color, 'w-5 h-5')
                        : <span className={`w-5 h-5 ${CORPORATE_COLOR_CLASSES[item.color]}`}></span>}
                      <span>{item.text}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              {primaryCta.offerId ? (
                <Button
                  size="lg"
                  onClick={() => setShowOfferModal(true)}
                  className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-6 rounded-full transition-all transform hover:scale-105 group"
                >
                  {primaryCta.text}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              ) : (
                <Link href={primaryCta.href}>
                  <Button
                    size="lg" 
                    className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-6 rounded-full transition-all transform hover:scale-105 group"
                  >
                    {primaryCta.text}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              )}
              <Link href={secondaryCta.href}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white bg-transparent font-bold px-8 py-6 rounded-full hover:bg-white hover:text-gray-900 transition-all"
                >
                  {secondaryCta.text}
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block"></div>
        </div>
      </div>

      {showOfferModal && primaryCta.offerId && (
        <OfferSummaryModal
          offerId={primaryCta.offerId}
          onClose={() => setShowOfferModal(false)}
          onContactClick={handleContactClick}
        />
      )}
    </section>
  );
}