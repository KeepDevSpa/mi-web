import FibraPlanComparator from '@/components/ui/fibra-plan-comparator'
import ProfessionalNav from '@/components/ui/professional-nav'
import ProfessionalFooter from '@/components/ui/professional-footer'
import ConnectionMessage from '@/components/ui/connection-message'

export default function ComparadorFibraPage() {
  return (
    <div className="min-h-screen bg-white">
      <ProfessionalNav />
      
      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
            Comparador de Fibra Óptica
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Encuentra la velocidad perfecta para tu hogar. Fibra simétrica real garantizada.
          </p>
        </div>
      </div>

      {/* Main comparator */}
      <div className="-mt-6 relative z-10">
        <FibraPlanComparator />
      </div>

      {/* Connection message */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ConnectionMessage service="fibra" variant="connection" />
        </div>
      </section>

      {/* Speed test section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-8">
            ¿Qué velocidad necesitas realmente?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-bold mb-2">Uso Básico</h3>
              <div className="text-2xl font-bold text-blue-600 mb-2">300Mb</div>
              <p className="text-gray-600 text-sm">
                Navegación, redes sociales, email y streaming básico para 1-2 personas
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl ring-2 ring-blue-300">
              <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-xl font-bold mb-2">Familia Conectada</h3>
              <div className="text-2xl font-bold text-blue-600 mb-2">600Mb</div>
              <p className="text-gray-600 text-sm">
                Múltiples dispositivos, streaming 4K, videojuegos online y trabajo desde casa
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold mb-2">Profesional/Gamer</h3>
              <div className="text-2xl font-bold text-blue-600 mb-2">1Gb</div>
              <p className="text-gray-600 text-sm">
                Teletrabajo intensivo, gaming profesional, streaming y descargas masivas
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
  title: 'Comparador Fibra Óptica - Prisma Móvil',
  description: 'Compara planes de fibra óptica, velocidades y precios. Encuentra la mejor conexión para tu hogar.',
}
