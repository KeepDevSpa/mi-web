"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Smartphone, Wifi, Clock, TrendingDown, Star, Globe } from "lucide-react";

interface HeroDigitalProps {
  className?: string;
}

export function HeroDigital({ className }: HeroDigitalProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 47,
    seconds: 30
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

  const ventajasDigitales = [
    {
      icon: <TrendingDown className="w-5 h-5" />,
      titulo: "50% más barato",
      descripcion: "Sin locales caros = Más ahorro para ti",
      color: "text-green-500"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      titulo: "Contratas en 3 minutos",
      descripcion: "Lo que otros tardan semanas",
      color: "text-blue-500"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      titulo: "Disponible 24/7",
      descripcion: "Porque Internet no cierra nunca",
      color: "text-purple-500"
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      titulo: "100% desde tu móvil",
      descripcion: "Todo en la palma de tu mano",
      color: "text-orange-500"
    }
  ];

  const planes = [
    {
      id: "combo-digital",
      nombre: "COMBO FUTURO",
      etiqueta: "¡SÚPER DIGITAL!",
      descripcion: "Fibra 600Mb + Móvil 60GB",
      precioAntes: 65,
      precioAhora: 19,
      descuento: 71,
      beneficios: [
        "🚀 Fibra 600Mb reales (no marketing)",
        "📱 60GB que se acumulan (¡genial!)",
        "📞 Llamadas ilimitadas España",
        "🤖 Soporte IA + humano 24/7",
        "⚡ Activación automática",
        "📊 App con control total",
        "🔄 Cambios instantáneos"
      ],
      destacado: true,
      emoji: "🚀"
    }
  ];

  const [planSeleccionado] = useState(planes[0]);

  return (
    <section className={`min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden ${className}`}>
      {/* Elementos decorativos digitales */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
      </div>
      
      {/* Badge de urgencia */}
      <div className="absolute top-6 right-6 z-20">
        <Badge variant="destructive" className="animate-pulse bg-red-500 text-white px-4 py-2 text-sm font-bold">
          <Clock className="w-4 h-4 mr-2" />
          Oferta acaba en {timeLeft.hours}h {timeLeft.minutes}m
        </Badge>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* Columna izquierda - Propuesta digital */}
          <div className="text-white space-y-8">
            
            {/* Badge principal */}
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-black px-4 py-2 text-sm">
                🚀 100% DIGITAL • 0% COMPLICACIONES
              </Badge>
              
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-black leading-tight">
                  El operador que
                  <span className="block text-yellow-400 animate-pulse">
                    NO NECESITA 
                  </span>
                  <span className="block text-white">
                    locales para ser
                  </span>
                  <span className="block text-green-400 text-5xl md:text-7xl">
                    GENIAL 🚀
                  </span>
                </h1>
                
                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-6 border border-green-400/30">
                  <p className="text-xl md:text-2xl font-bold text-green-300 mb-2">
                    💰 100% Digital = 50% más barato
                  </p>
                  <p className="text-lg text-white/90">
                    Sin alquileres caros, sin personal innecesario. 
                    <strong>Todo el ahorro para ti.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Ventajas del modelo digital */}
            <div className="grid md:grid-cols-2 gap-4">
              {ventajasDigitales.map((ventaja, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all">
                  <div className="flex items-start space-x-3">
                    <div className={`${ventaja.color} mt-1`}>
                      {ventaja.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">{ventaja.titulo}</h3>
                      <p className="text-sm text-white/80">{ventaja.descripcion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Proceso digital express */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4 text-center">
                ⚡ Tu operadora en 3 pasos (no semanas)
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2 font-bold">1</div>
                  <div className="font-bold">ELIGE</div>
                  <div className="text-white/80">Tu tarifa ideal</div>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2 font-bold">2</div>
                  <div className="font-bold">CONFIRMA</div>
                  <div className="text-white/80">Datos básicos</div>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2 font-bold">3</div>
                  <div className="font-bold">¡LISTO!</div>
                  <div className="text-white/80">Ya eres Prisma</div>
                </div>
              </div>
            </div>

            {/* Testimonial digital */}
            <div className="bg-blue-500/20 rounded-lg p-4 border-l-4 border-blue-400">
              <div className="flex items-start space-x-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div>
                  <p className="text-white text-sm italic">
                    "Lo contraté desde el sofá en pijama a las 23h. En 4 minutos tenía 
                    <strong> todo listo</strong>. Esto sí es el futuro."
                  </p>
                  <p className="text-blue-300 text-xs mt-1">- Carlos M., Barcelona (contratación digital)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Tarifa destacada */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-white mb-2">
                🎯 La tarifa más inteligente
              </h2>
              <p className="text-purple-100 text-lg">
                Diseñada por IA, aprobada por humanos
              </p>
            </div>

            {/* Tarjeta principal */}
            <Card className="relative overflow-hidden ring-4 ring-yellow-400 shadow-2xl transform hover:scale-105 transition-all">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-400 to-orange-400 text-black px-4 py-1 font-black text-sm">
                🔥 SÚPER OFERTA
              </div>
              
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="text-5xl mb-3">{planSeleccionado.emoji}</div>
                  <h3 className="text-2xl font-black text-purple-600 mb-2">
                    {planSeleccionado.nombre}
                  </h3>
                  <p className="text-lg font-bold text-orange-600 mb-1">
                    {planSeleccionado.etiqueta}
                  </p>
                  <p className="text-gray-600 mb-6">{planSeleccionado.descripcion}</p>
                  
                  {/* Precios con impacto */}
                  <div className="mb-8">
                    <div className="flex items-center justify-center space-x-4 mb-3">
                      <span className="text-2xl line-through text-red-400 font-bold">
                        {planSeleccionado.precioAntes}€/mes
                      </span>
                      <div className="text-6xl font-black text-green-600">
                        {planSeleccionado.precioAhora}€
                      </div>
                      <span className="text-lg text-gray-600">/mes</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Badge variant="destructive" className="bg-red-500 text-white font-bold">
                        -{planSeleccionado.descuento}% ¡BRUTAL!
                      </Badge>
                      <span className="text-sm text-green-600 font-bold">
                        Ahorras {planSeleccionado.precioAntes - planSeleccionado.precioAhora}€/mes
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lista de beneficios */}
                <div className="space-y-3 mb-8">
                  {planSeleccionado.beneficios.map((beneficio, index) => (
                    <div key={index} className="flex items-start text-sm">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{beneficio}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs digitales */}
                <div className="space-y-4">
                  <Button 
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-black py-4 text-lg shadow-xl transform hover:scale-105 transition-all"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    ¡ACTÍVALO EN 3 CLICS! 🚀
                  </Button>
                  
                  <div className="grid md:grid-cols-2 gap-2">
                    <Button 
                      variant="outline"
                      className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold text-sm"
                    >
                      <Wifi className="w-4 h-4 mr-1" />
                      Ver cobertura
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-sm"
                    >
                      💬 Chat directo
                    </Button>
                  </div>
                </div>

                {/* Garantías digitales */}
                <div className="text-center mt-8 text-xs text-gray-500 space-y-1">
                  <p>✅ Contratación 100% online • ✅ Sin permanencia • ✅ Prueba 15 días gratis</p>
                  <p className="font-bold text-green-600">🚀 Activación automática en minutos</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Barra de estadísticas digitales */}
        <div className="mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <h3 className="text-center text-white text-xl font-bold mb-6">
              🏆 El futuro de las telecomunicaciones, hoy
            </h3>
            <div className="grid md:grid-cols-4 gap-8 text-white text-center">
              <div>
                <div className="text-3xl font-black text-green-400 mb-2">3 min</div>
                <div className="text-sm">Tiempo medio de contratación</div>
              </div>
              <div>
                <div className="text-3xl font-black text-blue-400 mb-2">24/7</div>
                <div className="text-sm">Disponibilidad total</div>
              </div>
              <div>
                <div className="text-3xl font-black text-yellow-400 mb-2">50%</div>
                <div className="text-sm">Más barato que tradicionales</div>
              </div>
              <div>
                <div className="text-3xl font-black text-purple-400 mb-2">99.9%</div>
                <div className="text-sm">Satisfacción digital</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
