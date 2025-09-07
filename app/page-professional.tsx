'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HeroProfesional from "@/components/ui/hero-profesional";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga para efectos visuales
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const heroConfig = {
    title: "La operadora que realmente",
    subtitle: "te cuida",
    description: "En Prisma no vendemos tarifas. Creamos experiencias premium con tecnología de vanguardia y atención humana real. Porque lo importante para nosotros eres tú.",
    primaryCta: {
      text: "Descubre la experiencia Prisma",
      href: "/demo"
    },
    secondaryCta: {
      text: "Hablar con un humano real",
      href: "tel:915691382"
    },
    backgroundType: "image" as const,
    backgroundImage: "/pool-selfie-hero.jpeg",
    highlights: [
      { icon: "🌟", text: "Experiencia premium", color: "blue" },
      { icon: "🤝", text: "Atención humana real", color: "green" },
      { icon: "⚡", text: "Tecnología de vanguardia", color: "purple" },
      { icon: "💎", text: "Precio justo por calidad", color: "yellow" }
    ]
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Cargando experiencia Prisma...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Principal */}
      <HeroProfesional {...heroConfig} />

      {/* Sección de Propuesta de Valor */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              ¿Por qué somos diferentes?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No somos una operadora más. Somos el cambio que necesita el sector de las telecomunicaciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Diferenciador 1: Experiencia Premium */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🌟</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Experiencia Premium
              </h3>
              <p className="text-gray-600 mb-6">
                No vendemos tarifas baratas. Creamos experiencias que realmente cuidan de ti y tu familia.
              </p>
              <ul className="text-left space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Instalación profesional sin prisa
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Equipos de última generación
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Configuración personalizada
                </li>
              </ul>
            </div>

            {/* Diferenciador 2: Atención Humana */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Atención Humana Real
              </h3>
              <p className="text-gray-600 mb-6">
                Nada de robots ni sistemas automáticos. Personas reales que entienden tus necesidades.
              </p>
              <ul className="text-left space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Soporte 24/7 con personas reales
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Técnicos especializados
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Respuesta inmediata
                </li>
              </ul>
            </div>

            {/* Diferenciador 3: Tecnología */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Tecnología de Vanguardia
              </h3>
              <p className="text-gray-600 mb-6">
                Invertimos en la mejor infraestructura para que disfrutes de velocidades reales.
              </p>
              <ul className="text-left space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Fibra FTTH 100% simétrica
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  5G de última generación
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  WiFi 6 incluido
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Servicios Principales */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Todo lo que necesitas para estar conectado con la mejor calidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Fibra y Móvil Combo */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl">📱</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Fibra + Móvil</h3>
                  <p className="text-blue-600 font-semibold">La combinación perfecta</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Velocidad extrema en casa y datos ilimitados en el móvil. Todo en una sola factura con el mejor precio.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-blue-600">Desde 49€/mes</div>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <a href="/fibra-movil">Ver Planes</a>
                </Button>
              </div>
            </div>

            {/* Solo Fibra */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl">🌐</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Solo Fibra</h3>
                  <p className="text-green-600 font-semibold">Velocidad pura</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Fibra óptica simétrica con velocidades de hasta 1Gbps. Perfecta para hogares y empresas.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-green-600">Desde 29€/mes</div>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <a href="/fibra">Ver Planes</a>
                </Button>
              </div>
            </div>

            {/* Solo Móvil */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl">📱</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Solo Móvil</h3>
                  <p className="text-purple-600 font-semibold">Libertad total</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Planes móviles con datos ilimitados reales, 5G incluido y la mejor cobertura nacional.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-purple-600">Desde 19€/mes</div>
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <a href="/movil">Ver Planes</a>
                </Button>
              </div>
            </div>

            {/* Servicios Adicionales */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl">⭐</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Servicios Plus</h3>
                  <p className="text-yellow-600 font-semibold">Completa tu experiencia</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                TV Premium, Seguridad integral y Energía verde. Todo con la calidad Prisma.
              </p>
              <div className="flex space-x-2">
                <Button asChild variant="outline" size="sm">
                  <a href="/prisma-tv">PrismaTV</a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href="/seguridad">Seguridad</a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href="/energia">Energía</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Confianza */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Miles de familias ya confían en Prisma
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            No solo ofrecemos servicios, creamos relaciones duraderas basadas en la confianza y la calidad
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfacción del cliente</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Soporte disponible</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">50k+</div>
              <div className="text-gray-600">Clientes satisfechos</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 px-8">
              <a href="/demo">Conoce nuestros planes</a>
            </Button>
            <Button variant="outline" size="lg" asChild className="px-8">
              <a href="tel:915691382">Llama ahora: 915691382</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 py-20 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Preparado para la experiencia Prisma?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Da el paso hacia una operadora que realmente te cuida. Tu tranquilidad no tiene precio.
          </p>
          <Button 
            size="lg"
            asChild
            className="bg-white text-blue-900 hover:bg-gray-100 px-12 py-4 text-xl font-bold"
          >
            <a href="/demo">Empezar ahora</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
