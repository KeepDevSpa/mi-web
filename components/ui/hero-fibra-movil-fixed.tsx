'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface HeroFibraMovilProps {
  title?: string;
  highlightedText?: string;
  description?: string;
  image?: string;
  className?: string;
  variant?: 'default' | 'green' | 'light' | 'dark' | 'accent';
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  highlights?: Array<{
    icon?: string;
    text: string;
    color?: string;
    className?: string;
  }>;
  showButtons?: boolean;
}

export function HeroFibraMovil({ 
  title = "Descubre nuestros",
  highlightedText = "productos VIP",
  description = "Combina nuestra conexión de alta velocidad con la tarifa móvil que mejor se adapte a tus necesidades.",
  image = "/fibra-movil-hero.webp",
  className,
  variant = 'default',
  primaryCta = {
    text: "Ver packs",
    href: "#planes"
  },
  secondaryCta = {
    text: "Contactar",
    href: "#contacto"
  },
  highlights = [],
  showButtons = true
}: HeroFibraMovilProps) {
  const variants = {
    default: {
      bg: "bg-gradient-to-r from-gray-800 to-gray-900",
      text: "text-white",
      highlight: "text-[#00aa00]",
      description: "text-white/90"
    },
    green: {
      bg: "bg-gradient-to-r from-[#00aa00]/90 to-[#00aa00]/70",
      text: "text-white",
      highlight: "text-[#ffc600]",
      description: "text-white/90"
    },
    light: {
      bg: "bg-gradient-to-r from-gray-50 to-gray-100",
      text: "text-gray-900",
      highlight: "text-[#00aa00]",
      description: "text-gray-700"
    },
    dark: {
      bg: "bg-gradient-to-r from-gray-900 to-gray-800",
      text: "text-white",
      highlight: "text-[#00aa00]",
      description: "text-gray-300"
    },
    accent: {
      bg: "bg-gradient-to-r from-[#0066cc]/90 to-[#0066cc]/70",
      text: "text-white",
      highlight: "text-[#ffc600]",
      description: "text-white/90"
    }
  };
  
  // Asegurar que variant sea uno de los valores válidos
  const safeVariant = variants[variant] ? variant : 'default';
  
  return (
    <section className={cn("relative h-[500px]", variants[safeVariant].bg, className)}>
      {image && (
        <div className="absolute inset-0">
          <Image
            src={image.startsWith('/') ? image : `/${image}`}
            alt="Fibra y móvil"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
      )}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className={cn("text-4xl md:text-5xl font-bold mb-2", variants[safeVariant].text)}>
              <div dangerouslySetInnerHTML={{ __html: title }} />
            </h1>
            <h2 className={cn("text-4xl md:text-5xl font-bold mb-6", variants[safeVariant].highlight)}>
              <div dangerouslySetInnerHTML={{ __html: highlightedText }} />
            </h2>
            <p className={cn("text-xl mb-8", variants[safeVariant].description)}>
              {description}
            </p>
            
            {/* Highlights */}
            {highlights && highlights.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-8">
                {highlights.map((highlight, idx) => (
                  <div 
                    key={idx} 
                    className={cn(
                      "px-3 py-1.5 rounded-full text-white text-sm font-medium shadow-sm backdrop-blur-md flex items-center", 
                      highlight.className || "bg-[#00aa00]/60 hover:bg-[#00aa00]/80 transition"
                    )}
                  >
                    {highlight.icon && (
                      <span className="mr-1.5" dangerouslySetInnerHTML={{ __html: highlight.icon }} />
                    )}
                    <span>{highlight.text}</span>
                  </div>
                ))}
              </div>
            )}
            
            {/* Botones CTA */}
            {showButtons && (
              <div className="flex gap-4">
                <a 
                  href={primaryCta.href} 
                  className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition"
                >
                  {primaryCta.text}
                </a>
                <a 
                  href={secondaryCta.href} 
                  className="bg-[#00aa00] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#009900] transition"
                >
                  {secondaryCta.text}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
