/**
 * @fileoverview Página de demostración de componentes del sistema de administración
 * 
 * Esta página muestra todos los componentes disponibles en el panel de administración
 * de Prisma Móvil, incluyendo ejemplos en vivo con datos reales de la base de datos.
 * 
 * Componentes demostrados:
 * - Hero: Secciones principales con banners y llamadas a la acción
 * - PricingCards: Tarjetas de precios dinámicas con selectores
 * - InformationCards: Tarjetas informativas para características
 * - ContentBlocks: Bloques de contenido flexible
 * - FAQ: Sistema de preguntas frecuentes
 * - CoverageCheck: Verificación de cobertura (global)
 * 
 * @author Prisma Móvil Team
 * @version 5.2.0
 * @since 2025-09-01
 */

// app/componentes-demo/page.tsx
import { PricingCard } from '@/components/ui/pricing-card'
import { InformationCard } from '@/components/ui/information-card'
// import { FAQAccordion } from '@/components/ui/faq-accordion'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

/**
 * Página de demostración de componentes administrativos
 * 
 * Esta función asíncrona renderiza todos los componentes disponibles en el sistema
 * de administración, obteniendo datos reales de la base de datos para mostrar
 * ejemplos funcionales de cada tipo de componente.
 * 
 * @returns {Promise<JSX.Element>} La página completa con ejemplos de todos los componentes
 * 
 * @example
 * // La página se renderiza automáticamente en la ruta /componentes-demo
 * // y muestra ejemplos de todos los componentes del admin
 */
export default async function ComponentesDemoPage() {
  // Obtención segura de datos de la base de datos con manejo de errores
  let samplePricingCards = [];
  let sampleInformationCards = [];
  let sampleFAQs = [];

  try {
    // Obtenemos algunas tarjetas de precios de ejemplo
    samplePricingCards = await prisma.pricingCard.findMany({
      where: { isActive: true },
      take: 3,
      include: { speeds: true, extras: true },
    });

    // Obtenemos tarjetas informativas activas
    sampleInformationCards = await prisma.informationCard.findMany({
      where: { isActive: true },
      take: 3,
    });

    // Obtenemos preguntas frecuentes para el demo
    sampleFAQs = await prisma.fAQItem.findMany({
      where: { isActive: true },
      take: 3,
    });
  } catch (error) {
    // Log del error con contexto específico
    console.error('[ComponentesDemoPage] Error al obtener datos de la base de datos:', {
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
      operation: 'fetchDemoData'
    });
    
    // Los arrays permanecen vacíos y se mostrarán placeholders
    // En una implementación completa, aquí se podría:
    // 1. Enviar error a servicio de monitoring (Sentry, LogRocket, etc.)
    // 2. Mostrar notificación al usuario
    // 3. Usar datos de cache o fallback
  }

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. HERO COMPONENT */}
      <section className="relative min-h-[500px] bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-green-400/20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-400">
            🎨 DEMO DE COMPONENTES
          </Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent">
            Todos los Componentes
            <br />
            <span className="text-green-400">del Sistema Admin</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Esta página demuestra todos los componentes disponibles en el sistema de administración de Prisma Móvil. 
            Cada sección muestra un componente diferente con datos reales de la base de datos.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-3 rounded-full">
            ¡Ver Componentes!
          </Button>
        </div>
      </section>

      {/* 2. PRICING CARDS COMPONENT */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800">
              💰 PRICING CARDS
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Componente: Tarjetas de Precios
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Muestra las diferentes tarifas y planes disponibles. Datos dinámicos desde la base de datos con selectores de velocidad y extras.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {samplePricingCards.length > 0 ? (
              samplePricingCards.map((card: any) => (
                <PricingCard 
                  key={card.id}
                  planName={card.name}
                  variant={card.variant}
                  hasSpeedSelector={card.hasSpeedSelector}
                  speeds={card.speeds}
                  features={typeof card.features === 'string' ? JSON.parse(card.features) : card.features}
                  extras={card.extras}
                  isPopular={card.isPopular}
                  ctaText={card.ctaText ?? 'Contratar'}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-gray-500">
                <p>No hay tarjetas de precios disponibles. Ve al panel admin para crear algunas.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. INFORMATION CARDS COMPONENT */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800">
              ℹ️ INFORMATION CARDS
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Componente: Tarjetas Informativas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Presenta información importante, ventajas, características o servicios de manera visual y atractiva.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sampleInformationCards.length > 0 ? (
              sampleInformationCards.map((card: any) => (
                <Card key={card.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center pb-4">
                    {card.imageUrl && (
                      <div className="relative w-16 h-16 mx-auto mb-4">
                        <Image
                          src={card.imageUrl}
                          alt={card.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-600 text-xl">{card.icon || '📋'}</span>
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center leading-relaxed">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-gray-500">
                <p>No hay tarjetas informativas disponibles. Ve al panel admin para crear algunas.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. CONTENT BLOCKS COMPONENT */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-800">
              📝 CONTENT BLOCKS
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Componente: Bloques de Contenido
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Secciones de contenido flexible para textos, imágenes y información estructurada.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                  🚀 Sobre Nuestros Servicios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  En Prisma Móvil ofrecemos las mejores soluciones de telecomunicaciones para hogares y empresas. 
                  Nuestros servicios incluyen fibra óptica de alta velocidad, planes móviles flexibles y 
                  televisión por internet con la mejor calidad.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Con más de 10 años de experiencia en el sector, nos comprometemos a brindar un servicio 
                  de excelencia con soporte técnico 24/7 y las mejores tarifas del mercado.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                  💡 Tecnología Innovadora
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Utilizamos la tecnología más avanzada para garantizar una experiencia excepcional. 
                  Nuestras redes de fibra óptica ofrecen velocidades de hasta 1Gb simétrico, 
                  perfectas para teletrabajo, streaming y gaming.
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>✅ Red 100% fibra óptica</li>
                  <li>✅ Cobertura 5G nacional</li>
                  <li>✅ Soporte técnico especializado</li>
                  <li>✅ Instalación gratuita</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. FAQ COMPONENT (Simplified version) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-100 text-yellow-800">
              ❓ FAQ
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Componente: Preguntas Frecuentes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sistema de acordeón para mostrar preguntas y respuestas de manera organizada.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {sampleFAQs.length > 0 ? (
              <div className="space-y-4">
                {sampleFAQs.map((faq: any, index: number) => (
                  <Card key={faq.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50">
                      <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                        <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                          {index + 1}
                        </span>
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No hay preguntas frecuentes disponibles. Ve al panel admin para crear algunas.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. COVERAGE CHECK COMPONENT - Ya está en el layout global */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-green-100 text-green-800">
            📍 COVERAGE CHECK
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Componente: Verificación de Cobertura
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Este componente está disponible globalmente en el layout. Los usuarios pueden verificar 
            la cobertura en su zona desde cualquier página. Se encuentra en la parte inferior de la página.
          </p>
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
            <div className="text-gray-800 mb-4">
              <strong>¡Mira hacia abajo! 👇</strong>
            </div>
            <p className="text-gray-600">
              El formulario de verificación de cobertura aparece automáticamente al final de cada página. 
              Permite a los usuarios introducir su código postal, teléfono y nombre para verificar 
              si nuestros servicios están disponibles en su área.
            </p>
          </div>
        </div>
      </section>

      {/* SUMMARY SECTION */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            🎯 Resumen de Componentes Disponibles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle className="text-green-400">Hero</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Sección principal con banner, título y call-to-action</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle className="text-blue-400">PricingCards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Tarjetas de precios con selectores de velocidad y extras</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle className="text-purple-400">InformationCards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Tarjetas informativas para características y ventajas</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle className="text-orange-400">ContentBlocks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Bloques de contenido flexible para textos e imágenes</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle className="text-yellow-400">FAQ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Acordeón de preguntas y respuestas frecuentes</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle className="text-green-400">CoverageCheck</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Formulario global de verificación de cobertura</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 p-6 bg-blue-900/30 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 text-blue-300">
              💼 Panel de Administración
            </h3>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Todos estos componentes pueden ser gestionados desde el panel de administración ubicado en 
              <span className="text-green-400 font-mono"> /admin</span>. 
              Desde ahí puedes crear, editar y organizar el contenido de cada página, 
              configurar qué componentes aparecen en cada sección, y gestionar todos los datos dinámicos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
