import MobilePlanComparator from '@/components/ui/mobile-plan-comparator'
import ProfessionalNav from '@/components/ui/professional-nav'
import ProfessionalFooter from '@/components/ui/professional-footer'
import ConnectionMessage from '@/components/ui/connection-message'

export default function ComparadorMovilPage() {
  return (
    <div className="min-h-screen bg-white">
      <ProfessionalNav />
      
      {/* Hero section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
            Comparador de Tarifas Móvil
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Encuentra el plan perfecto comparando precios, datos y características en tiempo real
          </p>
        </div>
      </div>

      {/* Main comparator */}
      <div className="-mt-6 relative z-10">
        <MobilePlanComparator />
      </div>

      {/* Connection message */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ConnectionMessage service="movil" variant="connection" />
        </div>
      </section>

      {/* Why choose us section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              ¿Por qué elegir Prisma Móvil?
            </h2>
            <p className="text-xl text-gray-600">
              Más que un operador, tu aliado en conectividad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mejor Calidad-Precio</h3>
              <p className="text-gray-600">
                Tarifas justas sin sorpresas. Comparamos con la competencia para ofrecerte siempre el mejor precio.
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cobertura Nacional</h3>
              <p className="text-gray-600">
                99% de cobertura 4G/5G en España. Utilizamos las mejores redes para garantizar tu conexión.
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Atención Real</h3>
              <p className="text-gray-600">
                Soporte 24/7 con personas reales. Nada de chatbots, hablamos tu idioma.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProfessionalFooter />
    </div>
  )
}

export const metadata = {
  title: 'Comparador Tarifas Móvil - Prisma Móvil',
  description: 'Compara planes móviles, precios y características. Encuentra la mejor tarifa móvil con Prisma Móvil.',
}
