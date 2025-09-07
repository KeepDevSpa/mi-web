import Link from 'next/link'
import ProfessionalNav from '@/components/ui/professional-nav'
import ProfessionalFooter from '@/components/ui/professional-footer'

export default function ComparadoresPage() {
  const comparadores = [
    {
      title: 'Comparador Móvil',
      description: 'Encuentra el plan móvil perfecto comparando datos, minutos y precios',
      icon: '📱',
      color: 'from-green-500 to-emerald-600',
      href: '/comparador-movil',
      features: ['5G incluido', 'Datos ilimitados', 'Roaming UE', 'Netflix gratis']
    },
    {
      title: 'Comparador Fibra',
      description: 'Compara velocidades de fibra óptica y encuentra tu conexión ideal',
      icon: '🌐',
      color: 'from-blue-500 to-blue-600',
      href: '/comparador-fibra',
      features: ['Hasta 1Gb simétrico', 'WiFi 6 incluido', 'Instalación gratis', 'Soporte 24h']
    },
    {
      title: 'Comparador TV',
      description: 'Descubre todos los planes de televisión con Netflix, HBO y más',
      icon: '📺',
      color: 'from-purple-500 to-purple-600',
      href: '/comparador-tv',
      features: ['200+ canales', '4K Ultra HD', 'Plataformas incluidas', 'Sin permanencia']
    }
  ]

  const stats = [
    { value: '10k+', label: 'Clientes satisfechos', icon: '😊' },
    { value: '99%', label: 'Cobertura nacional', icon: '📡' },
    { value: '24/7', label: 'Atención al cliente', icon: '💬' },
    { value: '0€', label: 'Coste oculto', icon: '✅' }
  ]

  return (
    <div className="min-h-screen bg-white">
      <ProfessionalNav />
      
      {/* Hero section */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Comparadores <span className="text-green-400">Prisma</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            La herramienta más completa para comparar planes de móvil, fibra y TV. 
            Transparencia total, sin sorpresas.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparadores grid */}
      <section className="py-20 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {comparadores.map((comparador) => (
              <div key={comparador.title} className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Header con gradiente */}
                <div className={`bg-gradient-to-r ${comparador.color} p-8 text-white text-center`}>
                  <div className="text-6xl mb-4">{comparador.icon}</div>
                  <h2 className="text-2xl font-bold mb-2">{comparador.title}</h2>
                  <p className="text-white/90">{comparador.description}</p>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="font-semibold text-gray-900 mb-4">Características destacadas:</h3>
                  <ul className="space-y-2 mb-8">
                    {comparador.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={comparador.href}
                    className={`block w-full text-center py-4 px-6 bg-gradient-to-r ${comparador.color} text-white font-semibold rounded-xl hover:shadow-lg transition-all transform group-hover:scale-105`}
                  >
                    Comparar planes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose our comparators */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              ¿Por qué usar nuestros comparadores?
            </h2>
            <p className="text-xl text-gray-600">
              La forma más inteligente de elegir tu plan perfecto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transparencia Total</h3>
              <p className="text-gray-600">
                Precios reales sin letra pequeña ni sorpresas en la factura
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Datos Actualizados</h3>
              <p className="text-gray-600">
                Información en tiempo real de precios, ofertas y disponibilidad
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Filtros Inteligentes</h3>
              <p className="text-gray-600">
                Encuentra exactamente lo que buscas con filtros avanzados
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mejor Precio Garantizado</h3>
              <p className="text-gray-600">
                Si encuentras mejor precio, te lo igualamos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">
            ¿Necesitas ayuda para decidir?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Nuestros expertos te ayudan a encontrar la combinación perfecta para tus necesidades
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              💬 Hablar con un experto
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-green-600 transition-all"
            >
              📅 Agendar consulta gratis
            </Link>
          </div>
        </div>
      </section>

      <ProfessionalFooter />
    </div>
  )
}

export const metadata = {
  title: 'Comparadores de Planes - Prisma Móvil',
  description: 'Compara planes de móvil, fibra y TV. Encuentra las mejores ofertas con transparencia total.',
}
