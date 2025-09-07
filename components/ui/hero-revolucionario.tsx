'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Clock, Wifi, Smartphone, Phone, Star, ArrowRight, Gift } from 'lucide-react';

interface HeroOfferProps {
  title?: string;
  subtitle?: string;
  originalPrice?: number;
  currentPrice?: number;
  discount?: number;
  timeLeft?: string;
  benefits?: string[];
  ctaText?: string;
  urgency?: boolean;
  backgroundImage?: string;
}

const HeroRevolucionario = ({
  title = "FIBRA GO + MÓVIL 60GB",
  subtitle = "La conexión que realmente necesitas",
  originalPrice = 45,
  currentPrice = 28,
  discount = 38,
  timeLeft = "Solo hasta el 15 de Septiembre",
  benefits = [
    "Fibra 600Mb simétrica",
    "Router WiFi 6 incluido", 
    "60GB con velocidad 5G",
    "Llamadas ilimitadas"
  ],
  ctaText = "¡LO QUIERO!",
  urgency = true,
  backgroundImage = "/Hero-Banner.webp"
}: HeroOfferProps) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 7,
    hours: 14,
    minutes: 23
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        }
        return prev;
      });
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const scrollToCoverage = () => {
    const coverageSection = document.getElementById('coverage-form');
    if (coverageSection) {
      coverageSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Urgency Banner */}
      {urgency && (
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-2 px-4 text-center font-semibold animate-pulse">
          <div className="flex items-center justify-center gap-2 text-sm">
            <Clock size={16} />
            <span>🔥 {timeLeft} - Termina en: {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m</span>
          </div>
        </div>
      )}

      {/* Main Hero Section */}
      <section className="relative min-h-[700px] overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Familia feliz conectada"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/70 to-blue-700/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Content */}
            <div className="text-white space-y-8">
              
              {/* Main Headlines */}
              <div className="space-y-4">
                <Badge className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-base font-bold">
                  🏆 OFERTA LIMITADA - {discount}% DESCUENTO
                </Badge>
                
                <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                  {title}
                </h1>
                
                <p className="text-xl lg:text-2xl text-blue-100 font-medium">
                  {subtitle}
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-lg p-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      {index === 0 && <Wifi size={16} />}
                      {index === 1 && <Wifi size={16} />}
                      {index === 2 && <Smartphone size={16} />}
                      {index === 3 && <Phone size={16} />}
                    </div>
                    <span className="font-semibold text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Extra Benefits */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-green-300">
                  <Gift size={20} />
                  <span className="font-semibold">Instalación GRATIS (valorada en 90€)</span>
                </div>
                <div className="flex items-center gap-2 text-blue-300">
                  <Clock size={20} />
                  <span className="font-semibold">Conectado en menos de 5 días</span>
                </div>
                <div className="flex items-center gap-2 text-purple-300">
                  <Star size={20} />
                  <span className="font-semibold">3 meses de Prisma TV gratis</span>
                </div>
              </div>

            </div>

            {/* Right Column - Pricing Card */}
            <div className="lg:justify-self-center">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto transform hover:scale-105 transition-all duration-300">
                
                {/* Pricing Header */}
                <div className="text-center mb-6">
                  <Badge className="bg-red-100 text-red-800 px-3 py-1 text-sm font-bold mb-3">
                    AHORRA {discount}%
                  </Badge>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-3xl line-through text-gray-400">{originalPrice}€</span>
                      <Badge variant="destructive" className="text-xs">
                        -{discount}%
                      </Badge>
                    </div>
                    <div className="text-6xl font-black text-blue-600">
                      {currentPrice}€
                      <span className="text-lg text-gray-600">/mes</span>
                    </div>
                    <p className="text-gray-600 text-sm">Sin permanencia • Sin letra pequeña</p>
                  </div>
                </div>

                {/* Quick Benefits */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-700">Fibra simétrica</span>
                    <span className="font-bold text-blue-600">600Mb</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-700">Datos móviles</span>
                    <span className="font-bold text-blue-600">60GB 5G</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-700">Llamadas</span>
                    <span className="font-bold text-blue-600">Ilimitadas</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-700">Instalación</span>
                    <span className="font-bold text-green-600">GRATIS</span>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="space-y-4">
                  <Button 
                    onClick={scrollToCoverage}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-black text-lg py-4 rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    {ctaText}
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold"
                  >
                    Ver más tarifas
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t text-center">
                  <div className="flex items-center justify-center gap-1 text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600">
                    Más de 10.000 clientes satisfechos
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-orange-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
        
      </section>
    </div>
  );
};

export default HeroRevolucionario;
