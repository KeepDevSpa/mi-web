'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import React, { useRef, useEffect, useState } from 'react';

interface CTAButton {
  text: string;
  href: string;
  style?: 'primary' | 'secondary' | 'outline' | 'link';
  icon?: string;
}

interface Highlight {
  icon?: string;
  text: string;
  color?: string;
  className?: string;
  style?: 'pill' | 'icon' | 'badge';
}

export interface EnhancedHeroProps {
  title?: string;
  highlightedText?: string;
  description?: string;
  image?: string;
  videoSrc?: string;
  videoType?: string;
  videoLoop?: boolean;
  videoMuted?: boolean;
  videoAutoplay?: boolean;
  className?: string;
  variant?: string;
  primaryCta?: CTAButton;
  secondaryCta?: CTAButton;
  highlights?: Highlight[];
  showButtons?: boolean;
  contentPosition?: 'left' | 'center' | 'right';
  titleLayout?: 'inline' | 'stacked' | 'separated';
  overlayOpacity?: number;
  textSize?: 'small' | 'medium' | 'large';
  page?: string;
  logo?: string;
  logoWidth?: number;
  logoHeight?: number;
  imageAlt?: string;
  videoPreviewImage?: string;
}

// Define los estilos de las variantes
const VARIANTS = {
  default: {
    bg: "bg-gradient-to-r from-gray-900 to-gray-800",
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
    highlight: "text-[#ffc600]",
    description: "text-gray-300"
  },
  accent: {
    bg: "bg-gradient-to-r from-[#0066cc]/90 to-[#0066cc]/70",
    text: "text-white",
    highlight: "text-[#ffc600]",
    description: "text-white/90"
  },
  security: {
    bg: "bg-gradient-to-r from-gray-900 to-gray-800",
    text: "text-white",
    highlight: "text-[#ffd700]",
    description: "text-white/90"
  },
  energy: {
    bg: "bg-gradient-to-r from-gray-900 to-gray-800",
    text: "text-white",
    highlight: "text-[#ff7e00]",
    description: "text-white/90"
  },
  prismatv: {
    bg: "bg-gray-900",
    text: "text-white",
    highlight: "text-[#00aa00]",
    description: "text-gray-300"
  }
};

// Estilos para los botones
const BUTTON_STYLES = {
  primary: "bg-[#00aa00] text-white hover:bg-[#009900]",
  secondary: "bg-white text-gray-900 hover:bg-white/90",
  outline: "border-2 border-white text-white hover:bg-white/10",
  link: "text-white underline hover:text-white/80"
};

// Estilos para los highlights
const HIGHLIGHT_STYLES = {
  pill: "px-4 py-2 rounded-full font-medium shadow-sm backdrop-blur-md",
  icon: "flex items-center gap-2",
  badge: "px-3 py-1.5 rounded-full text-sm font-medium shadow-sm backdrop-blur-md"
};

export function EnhancedHero({ 
  title = "",
  highlightedText = "",
  description = "",
  image = "",
  videoSrc = "",
  videoType = "video/mp4",
  videoLoop = true,
  videoMuted = true,
  videoAutoplay = true,
  className = "",
  variant = 'default',
  primaryCta,
  secondaryCta,
  highlights = [],
  showButtons = true,
  contentPosition = 'left',
  titleLayout = 'stacked',
  overlayOpacity = 0.4,
  textSize = 'medium',
  page = 'generic',
  logo = "",
  logoWidth = 300,
  logoHeight = 100,
  imageAlt = "",
  videoPreviewImage = ""
}: EnhancedHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Asegurar que variant sea uno de los valores válidos
  const safeVariant = VARIANTS[variant as keyof typeof VARIANTS] ? variant : 'default';
  const variantStyle = VARIANTS[safeVariant as keyof typeof VARIANTS];
  
  // Configurar posición del contenido
  const contentPositionClasses = {
    left: "justify-start text-left",
    center: "justify-center text-center",
    right: "justify-end text-right",
  };

  // Configurar tamaño del texto
  const textSizeClasses = {
    small: "text-3xl md:text-4xl",
    medium: "text-4xl md:text-5xl",
    large: "text-5xl md:text-6xl",
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement && videoSrc) {
      videoElement.addEventListener('play', () => setIsVideoPlaying(true));
      videoElement.addEventListener('pause', () => setIsVideoPlaying(false));
      videoElement.addEventListener('loadeddata', () => setVideoLoaded(true));
      
      return () => {
        videoElement.removeEventListener('play', () => setIsVideoPlaying(true));
        videoElement.removeEventListener('pause', () => setIsVideoPlaying(false));
        videoElement.removeEventListener('loadeddata', () => setVideoLoaded(true));
      };
    }
  }, [videoSrc]);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => console.error("Error playing video:", e));
      }
    }
  };
  
  // Renderizar el título según el layout seleccionado
  const renderTitle = () => {
    switch (titleLayout) {
      case 'inline':
        return (
          <h1 className={cn(textSizeClasses[textSize], "font-bold mb-6", variantStyle.text)}>
            <span dangerouslySetInnerHTML={{ __html: title }} />{" "}
            <span className={variantStyle.highlight} dangerouslySetInnerHTML={{ __html: highlightedText }} />
          </h1>
        );
      case 'separated':
        return (
          <>
            <h1 className={cn(textSizeClasses[textSize], "font-bold mb-2", variantStyle.text)}>
              <span dangerouslySetInnerHTML={{ __html: title }} />
            </h1>
            <h2 className={cn(textSizeClasses[textSize], "font-bold mb-6", variantStyle.highlight)}>
              <span dangerouslySetInnerHTML={{ __html: highlightedText }} />
            </h2>
          </>
        );
      default: // stacked
        return (
          <h1 className={cn(textSizeClasses[textSize], "font-bold mb-6", variantStyle.text)}>
            <div dangerouslySetInnerHTML={{ __html: title }} />
            <div className={variantStyle.highlight} dangerouslySetInnerHTML={{ __html: highlightedText }} />
          </h1>
        );
    }
  };
  
  // Renderizar los highlights según el estilo seleccionado
  const renderHighlights = () => {
    if (!highlights || highlights.length === 0) return null;
    
    return (
      <div className="flex flex-wrap gap-4 mb-8">
        {highlights.map((highlight, idx) => {
          const style = highlight.style || 'pill';
          const baseClass = HIGHLIGHT_STYLES[style];
          const bgClass = highlight.className || "bg-[#00aa00]/60 hover:bg-[#00aa00]/80 transition";
          
          return (
            <div key={idx} className={cn(baseClass, bgClass)}>
              {highlight.icon && (
                <span className="mr-2" dangerouslySetInnerHTML={{ __html: highlight.icon }} />
              )}
              <span>{highlight.text}</span>
            </div>
          );
        })}
      </div>
    );
  };
  
  // Renderizar botones CTA
  const renderButtons = () => {
    if (!showButtons) return null;
    
    return (
      <div className="flex flex-wrap gap-4">
        {primaryCta && (
          <a 
            href={primaryCta.href} 
            className={cn(
              "px-8 py-3 rounded-lg font-semibold transition",
              BUTTON_STYLES[primaryCta.style || 'primary']
            )}
          >
            {primaryCta.icon && (
              <span className="mr-2" dangerouslySetInnerHTML={{ __html: primaryCta.icon }} />
            )}
            {primaryCta.text}
          </a>
        )}
        {secondaryCta && (
          <a 
            href={secondaryCta.href} 
            className={cn(
              "px-8 py-3 rounded-lg font-semibold transition",
              BUTTON_STYLES[secondaryCta.style || 'outline']
            )}
          >
            {secondaryCta.icon && (
              <span className="mr-2" dangerouslySetInnerHTML={{ __html: secondaryCta.icon }} />
            )}
            {secondaryCta.text}
          </a>
        )}
      </div>
    );
  };

  // Renderizar el logo si existe
  const renderLogo = () => {
    if (!logo) return null;
    
    return (
      <div className="mb-4">
        <Image
          src={logo.startsWith('/') ? logo : `/${logo}`}
          alt="Logo"
          width={logoWidth}
          height={logoHeight}
          className={cn("h-auto w-auto", contentPosition === 'center' ? 'mx-auto' : contentPosition === 'left' ? 'mx-0' : 'ml-auto')}
          priority
        />
      </div>
    );
  };

  // Renderizar el contenido de video o imagen
  const renderMedia = () => {
    if (videoSrc) {
      return (
        <div className="md:w-1/2">
          <div 
            className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-700 cursor-pointer"
            onClick={handleVideoClick}
          >
            {/* Imagen de precarga para el video */}
            {videoPreviewImage && (
              <div className={`absolute inset-0 bg-black flex items-center justify-center transition-opacity duration-500 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}>
                <Image
                  src={videoPreviewImage.startsWith('/') ? videoPreviewImage : `/${videoPreviewImage}`}
                  alt={imageAlt || "Video preview"}
                  fill
                  className="object-cover"
                  quality={100}
                />
              </div>
            )}

            {/* Video */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
              <video 
                ref={videoRef}
                src={videoSrc.startsWith('/') ? videoSrc : `/${videoSrc}`}
                autoPlay={videoAutoplay}
                loop={videoLoop}
                muted={videoMuted}
                playsInline
                className="w-full h-full object-cover"
                onLoadedData={() => setVideoLoaded(true)}
                onError={() => console.error("Error loading video")}
              />
            </div>
          </div>
        </div>
      );
    } else if (image) {
      console.log("Rendering image in EnhancedHero:", image);
      const imagePath = image.startsWith('/') ? image : `/${image}`;
      console.log("Final image path:", imagePath);
      return (
        <div className="absolute inset-0">
          <Image
            src={imagePath}
            alt={imageAlt || title}
            fill
            className="object-cover"
            style={{ opacity: overlayOpacity }}
            priority
            onError={(e) => console.error("Error loading image:", e)}
          />
        </div>
      );
    }
    
    return null;
  };

  return (
    <section 
      className={cn(
        videoSrc ? "py-12 md:py-20" : "relative h-[600px]", // Aumentamos la altura de 500px a 600px
        variantStyle.bg, 
        className
      )}
      data-page={page}
    >
      {!videoSrc && renderMedia()}
      
      <div className={cn("relative h-full flex items-center", videoSrc ? "" : "")}>
        <div className={cn("container mx-auto px-4", videoSrc ? "md:flex md:items-center md:gap-8" : "")}>
          <div className={cn(
            videoSrc ? "md:w-1/2 text-center md:text-left mb-8 md:mb-0" : "flex", 
            !videoSrc ? contentPositionClasses[contentPosition] : "", 
            !videoSrc ? "w-full" : ""
          )}>
            <div className={cn(
              !videoSrc ? "max-w-3xl" : "",
              !videoSrc && contentPosition === 'center' ? 'text-center' : ''
            )}>
              {renderLogo()}
              {renderTitle()}
              
              {description && (
                <p className={cn("text-xl mb-8", variantStyle.description)}>
                  {description}
                </p>
              )}
              
              {renderHighlights()}
              {renderButtons()}
            </div>
          </div>
          
          {videoSrc && renderMedia()}
        </div>
      </div>
    </section>
  );
}
