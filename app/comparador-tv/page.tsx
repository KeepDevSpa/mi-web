import TVPlanComparator from '@/components/ui/tv-plan-comparator'
import ProfessionalNav from '@/components/ui/professional-nav'
import ProfessionalFooter from '@/components/ui/professional-footer'
import ConnectionMessage from '@/components/ui/connection-message'

export default function ComparadorTVPage() {
  return (
    <div className="min-h-screen bg-white">
      <ProfessionalNav />
      
      {/* Hero section */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
            Comparador PrismaTV
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Descubre todos los planes de entretenimiento. Netflix, HBO, Disney+ y mucho más.
          </p>
        </div>
      </div>

      {/* Main comparator */}
      <div className="-mt-6 relative z-10">
        <TVPlanComparator />
      </div>

      {/* Connection message */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ConnectionMessage service="tv" variant="connection" />
        </div>
      </section>

      {/* Platforms showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Plataformas incluidas según tu plan
            </h2>
            <p className="text-xl text-gray-600">
              Acceso directo a las mejores plataformas de streaming
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <h3 className="font-semibold text-gray-900">Netflix</h3>
              <p className="text-sm text-gray-600">Incluido desde Premium</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">HBO</span>
              </div>
              <h3 className="font-semibold text-gray-900">HBO Max</h3>
              <p className="text-sm text-gray-600">Ultimate</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">D+</span>
              </div>
              <h3 className="font-semibold text-gray-900">Disney+</h3>
              <p className="text-sm text-gray-600">Ultimate</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <h3 className="font-semibold text-gray-900">Prime Video</h3>
              <p className="text-sm text-gray-600">Premium+</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">P+</span>
              </div>
              <h3 className="font-semibold text-gray-900">Paramount+</h3>
              <p className="text-sm text-gray-600">Ultimate</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">🎬</span>
              </div>
              <h3 className="font-semibold text-gray-900">Y más...</h3>
              <p className="text-sm text-gray-600">Según plan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Devices compatibility */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Compatible con todos tus dispositivos
            </h2>
            <p className="text-xl text-gray-600">
              Disfruta donde quieras, cuando quieras
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-4xl mb-4">📺</div>
              <h3 className="text-xl font-bold mb-3">Smart TV</h3>
              <p className="text-gray-600">Samsung, LG, Sony, Android TV, Apple TV y más</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-3">Móviles y Tablets</h3>
              <p className="text-gray-600">iOS, Android, Windows. Aplicación nativa optimizada</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-bold mb-3">PC y Portátiles</h3>
              <p className="text-gray-600">Windows, Mac, Linux. Navegador web o app dedicada</p>
            </div>
          </div>
        </div>
      </section>

      <ProfessionalFooter />
    </div>
  )
}

export const metadata = {
  title: 'Comparador PrismaTV - Prisma Móvil',
  description: 'Compara planes de televisión, canales y plataformas de streaming. Encuentra tu entretenimiento perfecto.',
}
