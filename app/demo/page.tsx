'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

export default function DemoPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white text-zinc-800">
      {/* Hero Section - Siguiendo el patrón visual de /movil y /prisma-tv */}
      <section className="relative h-[500px] bg-gradient-to-r from-black/50 to-black/30">
        <div className="absolute inset-0">
          <Image
            src="/Hero-Banner.webp"
            alt="Descubre la experiencia Prisma"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <Badge variant="secondary" className="bg-blue-100/20 text-white border-white/30 mb-4">
              ✨ EXPERIENCIA PRISMA
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Encuentra el plan perfecto
              <span className="block text-blue-300">para ti</span>
            </h1>
            <p className="text-xl text-zinc-300 max-w-lg mb-8">
              No perdamos tiempo. Te ayudamos a encontrar exactamente lo que necesitas 
              con la calidad que mereces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                asChild
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-xl transition-all"
              >
                <a href="#servicios">Ver servicios</a>
              </Button>
              <Button 
                variant="outline"
                size="lg"
                asChild
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all"
              >
                <a href="tel:915691382">Hablar con especialista</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Selector de Servicios - Con el estilo visual coherente */}
      <section id="servicios" className="py-16 bg-zinc-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Qué necesitas?
            </h2>
            <p className="text-lg text-zinc-300 max-w-4xl mx-auto">
              Elige el servicio que mejor se adapte a tus necesidades. Cada opción está diseñada para ofrecerte la mejor experiencia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fibra + Móvil - Estilo coherente con otras páginas */}
            <div className="bg-white text-zinc-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 p-8 text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">📱🌐</span>
                  </div>
                  <h3 className="text-2xl font-bold">
                    Fibra + Móvil
                  </h3>
                  <p className="text-blue-100 text-sm mt-2">
                    La combinación perfecta
                  </p>
                </div>
              </div>
              <div className="p-8">
                <p className="text-zinc-600 mb-6 leading-relaxed">
                  Internet ultra rápido en casa y datos ilimitados en el móvil. Todo en una sola factura.
                </p>
                <div className="mb-6">
                  <div className="text-3xl font-bold text-blue-600">Desde 49€</div>
                  <div className="text-sm text-zinc-500">mes</div>
                </div>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  <Link href="/fibra-movil">Ver Planes Combo</Link>
                </Button>
              </div>
            </div>

            {/* Solo Fibra */}
            <div className="bg-white text-zinc-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="h-48 bg-gradient-to-br from-green-500 to-blue-500 relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 p-8 text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🌐</span>
                  </div>
                  <h3 className="text-2xl font-bold">
                    Solo Fibra
                  </h3>
                  <p className="text-green-100 text-sm mt-2">
                    Velocidad pura
                  </p>
                </div>
              </div>
              <div className="p-8">
                <p className="text-zinc-600 mb-6 leading-relaxed">
                  Fibra simétrica de hasta 1Gbps con WiFi 6 incluido. Perfecta para hogares y empresas.
                </p>
                <div className="mb-6">
                  <div className="text-3xl font-bold text-green-600">Desde 29€</div>
                  <div className="text-sm text-zinc-500">mes</div>
                </div>
                <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                  <Link href="/fibra">Ver Planes Fibra</Link>
                </Button>
              </div>
            </div>

            {/* Solo Móvil */}
            <div className="bg-white text-zinc-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500 relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 p-8 text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h3 className="text-2xl font-bold">
                    Solo Móvil
                  </h3>
                  <p className="text-purple-100 text-sm mt-2">
                    Libertad total
                  </p>
                </div>
              </div>
              <div className="p-8">
                <p className="text-zinc-600 mb-6 leading-relaxed">
                  Datos ilimitados reales, 5G y la mejor cobertura nacional. Sin sorpresas.
                </p>
                <div className="mb-6">
                  <div className="text-3xl font-bold text-purple-600">Desde 19€</div>
                  <div className="text-sm text-zinc-500">mes</div>
                </div>
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                  <Link href="/movil">Ver Planes Móvil</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Adicionales - Siguiendo el patrón visual */}
      <section className="py-16 bg-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Servicios Adicionales
            </h2>
            <p className="text-lg text-purple-200 max-w-4xl mx-auto">
              Completa tu experiencia Prisma con nuestros servicios premium diseñados para cuidar de ti y tu familia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* PrismaTV */}
            <div className="bg-white text-zinc-800 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">📺</span>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  PrismaTV
                </h3>
                <p className="text-zinc-600 text-sm mb-6 leading-relaxed">
                  Televisión premium con contenido 4K, canales internacionales y streaming integrado.
                </p>
                <Button asChild variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                  <Link href="/prisma-tv">Más información</Link>
                </Button>
              </div>
            </div>

            {/* Seguridad */}
            <div className="bg-white text-zinc-800 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Seguridad
                </h3>
                <p className="text-zinc-600 text-sm mb-6 leading-relaxed">
                  Soluciones integrales de seguridad: alarmas, ciberseguridad y control parental.
                </p>
                <Button asChild variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                  <Link href="/seguridad">Más información</Link>
                </Button>
              </div>
            </div>

            {/* Energía */}
            <div className="bg-white text-zinc-800 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Energía Verde
                </h3>
                <p className="text-zinc-600 text-sm mb-6 leading-relaxed">
                  Electricidad 100% renovable con tarifas transparentes y sin sorpresas.
                </p>
                <Button asChild variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                  <Link href="/energia">Más información</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos - Con el estilo visual coherente */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mb-4">
              ¿Por qué somos la mejor opción?
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              No somos una operadora más. Somos el cambio que necesita el sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4 p-6 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-colors">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🌟</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-800 mb-2">Experiencia Premium</h3>
                <p className="text-zinc-600 leading-relaxed">
                  No vendemos tarifas baratas, creamos experiencias que realmente cuidan de ti.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-colors">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🤝</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-800 mb-2">Atención Humana Real</h3>
                <p className="text-zinc-600 leading-relaxed">
                  Personas reales disponibles 24/7 para resolver cualquier duda o problema.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-colors">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">⚡</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-800 mb-2">Tecnología Avanzada</h3>
                <p className="text-zinc-600 leading-relaxed">
                  Fibra FTTH, 5G real y equipos WiFi 6 para la mejor experiencia de conectividad.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-colors">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">💎</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-800 mb-2">Precio Justo</h3>
                <p className="text-zinc-600 leading-relaxed">
                  Sin letra pequeña, sin compromisos abusivos. Pagas por calidad, no por marketing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final - Siguiendo el patrón visual de zinc-900 */}
      <section className="bg-zinc-900 py-16 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Tienes dudas? Hablemos
          </h2>
          <p className="text-xl mb-8 text-zinc-300">
            Nuestros especialistas están listos para ayudarte a encontrar el plan perfecto
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              asChild
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-xl px-8"
            >
              <a href="tel:915691382">Llama gratis: 915691382</a>
            </Button>
            <Button 
              variant="outline"
              size="lg"
              asChild
              className="border-white text-white hover:bg-white hover:text-zinc-900 px-8"
            >
              <Link href="/blog">Más información</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
