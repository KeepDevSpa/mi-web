'use client'

import { useState } from 'react'

interface FibraPlan {
  id: string
  name: string
  speed: string
  uploadSpeed: string
  price: number
  originalPrice?: number
  features: string[]
  color: string
  isPopular?: boolean
  installation: 'free' | 'paid'
  router: string
}

export default function FibraPlanComparator() {
  const [sortBy, setSortBy] = useState<'price' | 'speed'>('price')
  const [showOnlyFree, setShowOnlyFree] = useState(false)

  const plans: FibraPlan[] = [
    {
      id: '1',
      name: 'Fibra Essential',
      speed: '300Mb',
      uploadSpeed: '300Mb',
      price: 25,
      originalPrice: 35,
      features: ['Simétrica real', 'Router WiFi 6', 'Instalación gratuita', 'Soporte 24h'],
      color: '#0066cc',
      installation: 'free',
      router: 'WiFi 6'
    },
    {
      id: '2', 
      name: 'Fibra Premium',
      speed: '600Mb',
      uploadSpeed: '600Mb', 
      price: 30,
      originalPrice: 45,
      features: ['Simétrica premium', 'Router WiFi 6 Pro', 'Instalación gratuita', 'Soporte prioritario', 'Netflix incluido'],
      color: '#0066cc',
      isPopular: true,
      installation: 'free',
      router: 'WiFi 6 Pro'
    },
    {
      id: '3',
      name: 'Fibra Ultra',
      speed: '1Gb',
      uploadSpeed: '1Gb',
      price: 40,
      originalPrice: 60,
      features: ['Gigabit simétrico', 'Router WiFi 6E', 'Instalación express gratis', 'Soporte VIP', 'Netflix + HBO', 'IP fija gratis'],
      color: '#0066cc',
      installation: 'free',
      router: 'WiFi 6E'
    },
    {
      id: '4',
      name: 'Fibra Business',
      speed: '1Gb',
      uploadSpeed: '1Gb',
      price: 65,
      features: ['Empresas', 'SLA garantizado', 'Soporte 24/7', 'IP fija incluida', 'Backup 4G'],
      color: '#0066cc',
      installation: 'free',
      router: 'Business Pro'
    }
  ]

  const filteredPlans = plans
    .filter(plan => !showOnlyFree || plan.installation === 'free')
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price
      // Para velocidad, convertimos a números
      const aSpeed = parseInt(a.speed.replace('Gb', '000').replace('Mb', ''))
      const bSpeed = parseInt(b.speed.replace('Gb', '000').replace('Mb', ''))
      return bSpeed - aSpeed
    })

  const getSpeedIcon = (speed: string) => {
    if (speed.includes('1Gb')) return '🚀'
    if (parseInt(speed) >= 600) return '⚡'
    return '📶'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
          💡 Comparador Fibra Óptica
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Encuentra la <span style={{ color: '#0066cc' }}>fibra perfecta</span> para tu hogar
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Compara velocidades, precios y características. Fibra simétrica real garantizada.
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          {/* Filtro instalación */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="freeInstallation"
              checked={showOnlyFree}
              onChange={(e) => setShowOnlyFree(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="freeInstallation" className="text-sm font-semibold text-gray-700">
              Solo instalación gratuita
            </label>
          </div>

          {/* Ordenar por */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Ordenar por</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'price' | 'speed')}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="price">Precio (menor a mayor)</option>
              <option value="speed">Velocidad (mayor a menor)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla comparativa */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <th className="px-6 py-4 text-left font-semibold">🏠 Plan Fibra</th>
                <th className="px-6 py-4 text-center font-semibold">📶 Velocidad</th>
                <th className="px-6 py-4 text-center font-semibold">📡 Router</th>
                <th className="px-6 py-4 text-center font-semibold">🔧 Instalación</th>
                <th className="px-6 py-4 text-center font-semibold">💰 Precio</th>
                <th className="px-6 py-4 text-center font-semibold">🎯 Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPlans.map((plan, index) => (
                <tr 
                  key={plan.id} 
                  className={`hover:bg-gray-50 transition-colors ${
                    plan.isPopular ? 'bg-blue-50 ring-2 ring-blue-200' : ''
                  }`}
                >
                  {/* Plan Name */}
                  <td className="px-6 py-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold ${
                        plan.isPopular ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gray-400'
                      }`}>
                        {getSpeedIcon(plan.speed)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-gray-900">{plan.name}</h3>
                          {plan.isPopular && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                              MÁS VENDIDA
                            </span>
                          )}
                        </div>
                        <div className="mt-2">
                          {plan.features.slice(0, 2).map((feature) => (
                            <div key={feature} className="text-xs text-gray-500 flex items-center">
                              <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Speed */}
                  <td className="px-6 py-6 text-center">
                    <div className="text-2xl font-bold text-blue-600">{plan.speed}</div>
                    <div className="text-sm text-gray-500">
                      ↕️ {plan.uploadSpeed} subida
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Simétrica real</div>
                  </td>

                  {/* Router */}
                  <td className="px-6 py-6 text-center">
                    <div className="text-lg font-semibold text-gray-900">{plan.router}</div>
                    <div className="text-sm text-green-600">✅ Incluido gratis</div>
                  </td>

                  {/* Installation */}
                  <td className="px-6 py-6 text-center">
                    <div className={`text-lg font-semibold ${
                      plan.installation === 'free' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {plan.installation === 'free' ? '🆓 Gratis' : '💶 60€'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {plan.installation === 'free' ? 'Sin coste adicional' : 'Técnico especializado'}
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-6 text-center">
                    <div className="flex flex-col items-center">
                      {plan.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {plan.originalPrice}€
                        </span>
                      )}
                      <div className="text-3xl font-bold text-blue-600">
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
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-xl'
                          : 'bg-gray-800 text-white hover:bg-gray-900'
                      }`}
                      onClick={() => {
                        alert(`Plan ${plan.name} seleccionado - ${plan.speed} por ${plan.price}€/mes`)
                      }}
                    >
                      {plan.isPopular ? '🚀 Contratar ya' : 'Más info'}
                    </button>
                    
                    {/* Features expandidas */}
                    {plan.features.length > 2 && (
                      <details className="mt-3 group">
                        <summary className="text-sm text-blue-600 cursor-pointer hover:text-blue-800">
                          Ver todas las características
                        </summary>
                        <div className="mt-2 text-sm text-gray-600 text-left">
                          {plan.features.slice(2).map((feature) => (
                            <div key={feature} className="flex items-center mt-1">
                              <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </details>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info adicional */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            🏆 ¿Por qué elegir nuestra fibra óptica?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-semibold text-gray-900">Velocidad Real</h4>
              <p className="text-sm text-gray-600">La velocidad que contratas es la que recibes, garantizada 24/7</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔧</div>
              <h4 className="font-semibold text-gray-900">Instalación Profesional</h4>
              <p className="text-sm text-gray-600">Técnicos especializados, instalación limpia y rápida</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💬</div>
              <h4 className="font-semibold text-gray-900">Soporte Real</h4>
              <p className="text-sm text-gray-600">Atención técnica 24h con personas reales, no chatbots</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>*Todos los precios incluyen IVA. Velocidades simétricas reales garantizadas.</p>
        <p className="mt-2">
          <span style={{ color: '#0066cc' }} className="font-semibold">Prisma Fibra</span> - 
          La conexión que tu hogar necesita
        </p>
      </div>
    </div>
  )
}
