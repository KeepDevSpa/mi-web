'use client'

import { useState } from 'react'

interface TVPlan {
  id: string
  name: string
  channels: number
  categories: string[]
  price: number
  originalPrice?: number
  features: string[]
  platforms: string[]
  color: string
  isPopular?: boolean
  quality: '4K' | 'HD' | 'Full HD'
  devices: number
}

export default function TVPlanComparator() {
  const [filterByQuality, setFilterByQuality] = useState<'all' | '4K' | 'HD'>('all')
  const [sortBy, setSortBy] = useState<'price' | 'channels'>('price')
  const [showOnlyPopular, setShowOnlyPopular] = useState(false)

  const plans: TVPlan[] = [
    {
      id: '1',
      name: 'PrismaTV Essential',
      channels: 80,
      categories: ['Generalistas', 'Noticias', 'Infantil'],
      price: 12,
      originalPrice: 18,
      features: ['Grabación en la nube', 'Pausa y rebobina', 'Guía EPG avanzada'],
      platforms: ['Smart TV', 'Móvil', 'Tablet'],
      color: '#9333ea',
      quality: 'HD',
      devices: 2
    },
    {
      id: '2', 
      name: 'PrismaTV Premium',
      channels: 150,
      categories: ['Todo Essential +', 'Deportes', 'Cine', 'Series', 'Documentales'],
      price: 18,
      originalPrice: 25,
      features: ['Todo Essential +', '4K Ultra HD', 'Netflix incluido', 'Amazon Prime', 'Grabación múltiple'],
      platforms: ['Smart TV', 'Móvil', 'Tablet', 'PC', 'Chromecast'],
      color: '#9333ea',
      isPopular: true,
      quality: '4K',
      devices: 4
    },
    {
      id: '3',
      name: 'PrismaTV Ultimate',
      channels: 200,
      categories: ['Todo Premium +', 'Deportes Premium', 'Cine exclusivo', 'Series internacionales'],
      price: 28,
      originalPrice: 40,
      features: ['Todo Premium +', 'HBO Max incluido', 'Disney+ incluido', 'Paramount+ incluido', 'Sin anuncios'],
      platforms: ['Todas las plataformas', 'Apple TV', 'Fire TV', 'Android TV'],
      color: '#9333ea',
      quality: '4K',
      devices: 6
    },
    {
      id: '4',
      name: 'PrismaTV Sport',
      channels: 120,
      categories: ['Deportes premium', 'LaLiga', 'Champions', 'Fútbol internacional'],
      price: 35,
      features: ['Todos los deportes', 'Multiview deportivo', 'Repeticiones instantáneas', 'Estadísticas en vivo'],
      platforms: ['Smart TV', 'Móvil', 'Tablet'],
      color: '#9333ea',
      quality: '4K',
      devices: 3
    },
    {
      id: '5',
      name: 'PrismaTV Kids',
      channels: 60,
      categories: ['Infantil exclusivo', 'Educativo', 'Disney', 'Cartoon Network'],
      price: 8,
      originalPrice: 12,
      features: ['Control parental avanzado', 'Sin publicidad', 'Contenido educativo', 'Perfiles por edad'],
      platforms: ['Smart TV', 'Tablet', 'Móvil'],
      color: '#9333ea',
      quality: 'HD',
      devices: 3
    }
  ]

  const filteredPlans = plans
    .filter(plan => filterByQuality === 'all' || plan.quality === filterByQuality)
    .filter(plan => !showOnlyPopular || plan.isPopular)
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price
      return b.channels - a.channels
    })

  const getQualityIcon = (quality: string) => {
    switch (quality) {
      case '4K': return '💎'
      case 'Full HD': return '🔷'
      default: return '📺'
    }
  }

  const getPlatformIcons = (platforms: string[]) => {
    const icons: { [key: string]: string } = {
      'Smart TV': '📺',
      'Móvil': '📱', 
      'Tablet': '💻',
      'PC': '🖥️',
      'Chromecast': '📡',
      'Apple TV': '🍎',
      'Fire TV': '🔥',
      'Android TV': '🤖'
    }
    return platforms.slice(0, 3).map(platform => icons[platform] || '📱').join(' ')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold mb-4">
          📺 Comparador PrismaTV
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Encuentra tu <span style={{ color: '#9333ea' }}>entretenimiento perfecto</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Compara canales, plataformas y precios. La mejor experiencia de televisión.
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          {/* Filtro por calidad */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Calidad de imagen</label>
            <div className="flex flex-wrap gap-2">
              {(['all', '4K', 'HD'] as const).map((quality) => (
                <button
                  key={quality}
                  onClick={() => setFilterByQuality(quality)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    filterByQuality === quality
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {quality === 'all' ? '🎬 Todas' : `${getQualityIcon(quality)} ${quality}`}
                </button>
              ))}
            </div>
          </div>

          {/* Filtros adicionales */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="onlyPopular"
                checked={showOnlyPopular}
                onChange={(e) => setShowOnlyPopular(e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="onlyPopular" className="text-sm font-semibold text-gray-700">
                Solo más populares
              </label>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'price' | 'channels')}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="price">Precio (menor a mayor)</option>
              <option value="channels">Canales (mayor a menor)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla comparativa */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <th className="px-6 py-4 text-left font-semibold">📺 Plan TV</th>
                <th className="px-6 py-4 text-center font-semibold">📊 Canales</th>
                <th className="px-6 py-4 text-center font-semibold">💎 Calidad</th>
                <th className="px-6 py-4 text-center font-semibold">📱 Dispositivos</th>
                <th className="px-6 py-4 text-center font-semibold">💰 Precio</th>
                <th className="px-6 py-4 text-center font-semibold">🎯 Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPlans.map((plan, index) => (
                <tr 
                  key={plan.id} 
                  className={`hover:bg-gray-50 transition-colors ${
                    plan.isPopular ? 'bg-purple-50 ring-2 ring-purple-200' : ''
                  }`}
                >
                  {/* Plan Name */}
                  <td className="px-6 py-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold ${
                        plan.isPopular ? 'bg-gradient-to-r from-purple-500 to-purple-600' : 'bg-gray-400'
                      }`}>
                        📺
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-gray-900">{plan.name}</h3>
                          {plan.isPopular && (
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold">
                              MÁS POPULAR
                            </span>
                          )}
                        </div>
                        <div className="mt-2">
                          {plan.categories.slice(0, 2).map((category) => (
                            <div key={category} className="text-xs text-gray-500 flex items-center">
                              <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                              {category}
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 text-xs text-gray-400">
                          {getPlatformIcons(plan.platforms)}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Channels */}
                  <td className="px-6 py-6 text-center">
                    <div className="text-2xl font-bold text-purple-600">{plan.channels}</div>
                    <div className="text-sm text-gray-500">canales</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {plan.categories.length} categorías
                    </div>
                  </td>

                  {/* Quality */}
                  <td className="px-6 py-6 text-center">
                    <div className="text-2xl mb-1">{getQualityIcon(plan.quality)}</div>
                    <div className="text-lg font-semibold text-gray-900">{plan.quality}</div>
                    <div className="text-sm text-gray-500">Ultra calidad</div>
                  </td>

                  {/* Devices */}
                  <td className="px-6 py-6 text-center">
                    <div className="text-2xl font-bold text-gray-900">{plan.devices}</div>
                    <div className="text-sm text-gray-500">dispositivos</div>
                    <div className="text-xs text-green-600 mt-1">✅ Simultáneos</div>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-6 text-center">
                    <div className="flex flex-col items-center">
                      {plan.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {plan.originalPrice}€
                        </span>
                      )}
                      <div className="text-3xl font-bold text-purple-600">
                        {plan.price}€
                      </div>
                      <span className="text-sm text-gray-600">*al mes</span>
                      {plan.originalPrice && (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold mt-1">
                          Ahorra {plan.originalPrice - plan.price}€
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-6 text-center">
                    <button 
                      className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                        plan.isPopular
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-xl'
                          : 'bg-gray-800 text-white hover:bg-gray-900'
                      }`}
                      onClick={() => {
                        alert(`${plan.name} seleccionado - ${plan.channels} canales por ${plan.price}€/mes`)
                      }}
                    >
                      {plan.isPopular ? '🚀 Contratar ya' : 'Más info'}
                    </button>
                    
                    {/* Features expandidas */}
                    <details className="mt-3 group">
                      <summary className="text-sm text-purple-600 cursor-pointer hover:text-purple-800">
                        Ver características completas
                      </summary>
                      <div className="mt-2 text-sm text-gray-600 text-left">
                        {plan.features.map((feature) => (
                          <div key={feature} className="flex items-center mt-1">
                            <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                            {feature}
                          </div>
                        ))}
                        <div className="mt-3 pt-2 border-t border-gray-100">
                          <div className="text-xs font-semibold text-gray-700 mb-1">Plataformas compatibles:</div>
                          {plan.platforms.map((platform) => (
                            <div key={platform} className="text-xs text-gray-500">• {platform}</div>
                          ))}
                        </div>
                      </div>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info adicional */}
      <div className="mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            🎬 La experiencia PrismaTV que no encontrarás en otros lados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl mb-2">📱</div>
              <h4 className="font-semibold text-gray-900">Multiplataforma</h4>
              <p className="text-sm text-gray-600">Ve donde quieras, cuando quieras, en cualquier dispositivo</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">☁️</div>
              <h4 className="font-semibold text-gray-900">Grabación en Nube</h4>
              <p className="text-sm text-gray-600">Graba y almacena tus programas favoritos sin límites</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold text-gray-900">Recomendaciones IA</h4>
              <p className="text-sm text-gray-600">Descubre contenido que realmente te gusta</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🚫</div>
              <h4 className="font-semibold text-gray-900">Sin Permanencia</h4>
              <p className="text-sm text-gray-600">Cambia o cancela cuando quieras, sin penalizaciones</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>*Todos los precios incluyen IVA. Contenido sujeto a disponibilidad de los proveedores.</p>
        <p className="mt-2">
          <span style={{ color: '#9333ea' }} className="font-semibold">PrismaTV</span> - 
          El entretenimiento sin límites que buscabas
        </p>
      </div>
    </div>
  )
}
