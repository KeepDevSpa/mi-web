"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Timer, Zap, Heart, Star, TrendingDown } from "lucide-react";

interface HeroDisruptivoProps {
  className?: string;
}

export function HeroDisruptivo({ className }: HeroDisruptivoProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 23,
    seconds: 45
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const ofertas = [
    {
      id: "combo",
      titulo: "COMBO LOCO",
      subtitulo: "¡Se nos ha ido la olla con esta oferta!",
      descripcion: "Fibra 600Mb + Móvil 60GB + Llamadas ilimitadas",
      precioOriginal: 65,
      precioActual: 19,
      descuento: 71,
      beneficios: [
        "🚀 Fibra 600Mb simétrica REAL",
        "📱 60GB que se ACUMULAN (¡genial!)",
        "📞 Llamadas sin límite",
        "📺 3 meses Prisma TV gratis",
        "🔧 Instalación REGALADA (vale 90€)",
        "⚡ Conectado en 3 días o menos"
      ],
      destacado: true,
      emoji: "🤯"
    },
    {
      id: "fibra",
      titulo: "FIBRA PEPINO",
      subtitulo: "¿600Mb por esto? ¡Que fantasía!",
      descripcion: "Solo fibra, pero qué fibra más maja",
      precioOriginal: 45,
      precioActual: 22,
      descuento: 51,
      beneficios: [
        "🚀 600Mb reales (no de esos fake)",
        "📶 Router WiFi 6 incluido",
        "🛠️ Soporte humano 24/7",
        "🏪 Tiendas físicas (¡tocamos tierra!)"
      ],
      destacado: false,
      emoji: "🥒"
    },
    {
      id: "movil",
      titulo: "MÓVIL BESTIAL",
      subtitulo: "60GB acumulables, ¡no es coña!",
      descripcion: "Para que no te quedes sin gigas nunca más",
      precioOriginal: 25,
      precioActual: 12,
      descuento: 52,
      beneficios: [
        "📱 60GB que NO se pierden",
        "5️⃣ 5G de verdad (no 4G+)",
        "🌍 Roaming UE incluido",
        "💬 WhatsApp ilimitado"
      ],
      destacado: false,
      emoji: "📱"
    }
  ];

  const [ofertaSeleccionada, setOfertaSeleccionada] = useState(ofertas[0]);

  return (
    <section className={`min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 relative overflow-hidden ${className}`}>
      {/* Elementos decorativos */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>
      
      {/* Indicador de urgencia flotante */}
      <div className="absolute top-4 right-4 z-20">
        <Badge variant="destructive" className="animate-pulse bg-red-500 text-white px-4 py-2">
          <Timer className="w-4 h-4 mr-2" />
          ¡Solo quedan {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m!
        </Badge>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Columna izquierda - Copy principal */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <Badge className="bg-yellow-400 text-black font-bold px-3 py-1">
                🔥 OFERTA VIRAL - Solo 48h
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-black leading-tight">
                ¡Se nos ha ido
                <span className="text-yellow-400 block animate-bounce">
                  LA OLLA! 🤯
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-purple-100 font-medium">
                Fibra + Móvil desde <span className="line-through text-red-300">65€</span> 
                <span className="text-yellow-400 font-black text-4xl ml-2">19€/mes</span>
              </p>
              
              <div className="flex items-center space-x-2 text-green-300">
                <TrendingDown className="w-6 h-6" />
                <span className="text-lg font-bold">-71% de descuento (¡No es broma!)</span>
              </div>
            </div>

            {/* Propuesta de valor única */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Heart className="w-6 h-6 mr-2 text-red-400" />
                ¿Por qué nos eligen? (Y no se van nunca)
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "🏪 Tiendas físicas (tocamos tierra)",
                  "🤖 Cero bots, solo humanos majos", 
                  "📡 Red propia 5G (no alquilada)",
                  "⚡ Instalación en 3 días o gratis",
                  "💰 Sin permanencia (libertad total)",
                  "🛡️ Velocidad garantizada o reembolso"
                ].map((item, index) => (
                  <div key={index} className="flex items-center text-white/90">
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial rápido */}
            <div className="bg-green-500/20 rounded-lg p-4 border-l-4 border-green-400">
              <div className="flex items-start space-x-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div>
                  <p className="text-white text-sm italic">
                    "Venía de Movistar pagando 65€. Con Prisma pago 19€ y va mejor. 
                    <strong>No me lo podía creer.</strong>"
                  </p>
                  <p className="text-green-300 text-xs mt-1">- María G., Madrid</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Selector de ofertas */}
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Elige tu tarifa pepino 🥒
              </h2>
              <p className="text-purple-100">
                (Todas incluyen instalación gratis y soporte humano)
              </p>
            </div>

            {/* Tabs de ofertas */}
            <div className="flex space-x-2 mb-6">
              {ofertas.map((oferta) => (
                <button
                  key={oferta.id}
                  onClick={() => setOfertaSeleccionada(oferta)}
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                    ofertaSeleccionada.id === oferta.id
                      ? "bg-white text-purple-600 shadow-lg"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {oferta.emoji} {oferta.titulo}
                </button>
              ))}
            </div>

            {/* Tarjeta de oferta seleccionada */}
            <Card className={`relative overflow-hidden transition-all duration-300 ${
              ofertaSeleccionada.destacado ? "ring-4 ring-yellow-400 shadow-2xl" : ""
            }`}>
              {ofertaSeleccionada.destacado && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-black px-3 py-1 font-bold text-xs">
                  MÁS POPULAR
                </div>
              )}
              
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">{ofertaSeleccionada.emoji}</div>
                  <h3 className="text-2xl font-black mb-1">{ofertaSeleccionada.titulo}</h3>
                  <p className="text-lg text-purple-600 font-bold mb-2">
                    {ofertaSeleccionada.subtitulo}
                  </p>
                  <p className="text-gray-600 mb-4">{ofertaSeleccionada.descripcion}</p>
                  
                  {/* Precios */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center space-x-3 mb-2">
                      <span className="text-2xl line-through text-gray-400">
                        {ofertaSeleccionada.precioOriginal}€/mes
                      </span>
                      <span className="text-5xl font-black text-purple-600">
                        {ofertaSeleccionada.precioActual}€
                      </span>
                      <span className="text-lg text-gray-600">/mes</span>
                    </div>
                    <Badge variant="destructive" className="bg-red-500 text-white">
                      -{ofertaSeleccionada.descuento}% ¡BRUTAL!
                    </Badge>
                  </div>
                </div>

                {/* Beneficios */}
                <div className="space-y-3 mb-8">
                  {ofertaSeleccionada.beneficios.map((beneficio, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>{beneficio}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-black py-4 text-lg shadow-lg transform hover:scale-105 transition-all"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    ¡LO QUIERO YA! 
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold"
                  >
                    Háblame, que no muerdo 😊
                  </Button>
                </div>

                {/* Garantía */}
                <div className="text-center mt-6 text-sm text-gray-500">
                  <p>✅ Sin permanencia • ✅ Instalación gratis • ✅ 30 días de prueba</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Barra inferior de confianza */}
        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="grid md:grid-cols-3 gap-6 text-white">
              <div>
                <div className="text-2xl font-bold text-yellow-400 mb-1">+15.000</div>
                <div className="text-sm">Clientes que no se van</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400 mb-1">⚡ 3 días</div>
                <div className="text-sm">Media de instalación</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400 mb-1">98.7%</div>
                <div className="text-sm">Satisfacción (¡casi perfecto!)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
