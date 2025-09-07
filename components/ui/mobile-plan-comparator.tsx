'use client'

import { useState } from 'react'

interface MobilePlan {
  id: string
  name: string
  data: string
  minutes: string
  price: number
  originalPrice?: number
  features: string[]
  color: string
  isPopular?: boolean
  coverage: 'movistar' | 'orange' | 'vodafone' | 'all'
}

export default function MobilePlanComparator() {
  const [selectedCoverage, setSelectedCoverage] = useState<'all' | 'movistar' | 'orange' | 'vodafone'>('all')
  const [sortBy, setSortBy] = useState<'price' | 'data'>('price')

  const plans: MobilePlan[] = [
    {
      id: '1',
      name: 'Básico',
      data: '10GB',
      minutes: 'Ilimitadas',
      price: 8,
      originalPrice: 12,
      features: ['4G/5G', 'SMS ilimitados', 'Roaming UE'],
      color: '#00b300',
      coverage: 'all'
    },
    {
      id: '2', 
      name: 'Premium',
      data: '50GB',
      minutes: 'Ilimitadas', 
      price: 15,
      originalPrice: 20,
      features: ['5G Premium', 'Netflix incluido', 'Roaming UE', 'Hotspot'],
      color: '#00b300',
      isPopular: true,
      coverage: 'all'
    },
    {
      id: '3',
      name: 'Unlimited Pro',
      data: 'Ilimitados',
      minutes: 'Ilimitadas',
      price: 25,
      originalPrice: 35,
      features: ['5G Unlimited', 'Netflix + HBO', 'Roaming mundial', 'Hotspot ilimitado', 'Soporte premium'],
      color: '#00b300',
      coverage: 'all'
    },
    {
      id: '4',
      name: 'Movistar Red',
      data: '30GB',
      minutes: 'Ilimitadas',
      price: 18,
      features: ['Red Movistar', '5G', 'Roaming UE'],
      color: '#00b300',
      coverage: 'movistar'
    },
    {
      id: '5',
      name: 'Orange Plus',
      data: '40GB', 
      minutes: 'Ilimitadas',
      price: 20,
      features: ['Red Orange', '5G', 'TV incluida'],
      color: '#00b300',
      coverage: 'orange'
    },
    {
      id: '6',
      name: 'Vodafone Elite',
      data: '60GB',
      minutes: 'Ilimitadas', 
      price: 22,
      features: ['Red Vodafone', '5G+', 'One Number'],
      color: '#00b300',
      coverage: 'vodafone'
    }
  ]

  const filteredPlans = plans
    .filter(plan => selectedCoverage === 'all' || plan.coverage === selectedCoverage || plan.coverage === 'all')
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price
      // Para datos, convertimos a números para comparar
      const aData = a.data === 'Ilimitados' ? 999 : parseInt(a.data)
      const bData = b.data === 'Ilimitados' ? 999 : parseInt(b.data) 
      return bData - aData
    })

  const getCoverageIcon = (coverage: string) => {
    switch (coverage) {
      case 'movistar': return '🔵'
      case 'orange': return '🟠' 
      case 'vodafone': return '🔴'
      default: return '📡'
    }
  }

  const getCoverageName = (coverage: string) => {
    switch (coverage) {
      case 'movistar': return 'Red Movistar'
      case 'orange': return 'Red Orange'
      case 'vodafone': return 'Red Vodafone'
      default: return 'Todas las redes'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold mb-4">
          🔥 Comparador Exclusivo Prisma
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Encuentra la <span style={{ color: '#00b300' }}>mejor tarifa móvil</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Compara precios, datos y funcionalidades. Encuentra el plan perfecto para ti.
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          {/* Filtro por cobertura */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Cobertura preferida</label>
            <div className="flex flex-wrap gap-2">
              {(['all', 'movistar', 'orange', 'vodafone'] as const).map((coverage) => (
                <button
                  key={coverage}
                  onClick={() => setSelectedCoverage(coverage)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    selectedCoverage === coverage
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {getCoverageIcon(coverage)} {getCoverageName(coverage)}
                </button>
              ))}
            </div>
          </div>

          {/* Ordenar por */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Ordenar por</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'price' | 'data')}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="price">Precio (menor a mayor)</option>
              <option value="data">Datos (mayor a menor)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla comparativa */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <th className="px-6 py-4 text-left font-semibold">📱 Plan</th>
                <th className="px-6 py-4 text-center font-semibold">📊 Datos</th>
                <th className="px-6 py-4 text-center font-semibold">📞 Minutos</th>
                <th className="px-6 py-4 text-center font-semibold">💰 Precio</th>
                <th className="px-6 py-4 text-center font-semibold">🎯 Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPlans.map((plan, index) => (
                <tr 
                  key={plan.id} 
                  className={`hover:bg-gray-50 transition-colors ${
                    plan.isPopular ? 'bg-green-50 ring-2 ring-green-200' : ''
                  }`}
                >
                  {/* Plan Name */}
                  <td className="px-6 py-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold ${
                        plan.isPopular ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gray-400'
                      }`}>
                        {plan.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-gray-900">{plan.name}</h3>
                          {plan.isPopular && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                              MÁS POPULAR
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          {getCoverageIcon(plan.coverage)}
                          <span className="ml-1">{getCoverageName(plan.coverage)}</span>
                        </div>
                        <div className="mt-2">
                          {plan.features.slice(0, 2).map((feature) => (
                            <div key={feature} className="text-xs text-gray-500 flex items-center">
                              <span className="w-1 h-1 bg-green-400 rounded-full mr-2"></span>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Data */}
                  <td className="px-6 py-6 text-center">
                    <div className="text-2xl font-bold text-gray-900">{plan.data}</div>
                    <div className="text-sm text-gray-500">
                      {plan.data === 'Ilimitados' ? 'Sin restricciones' : 'Mensuales'}
                    </div>
                  </td>

                  {/* Minutes */}
                  <td className="px-6 py-6 text-center">
                    <div className="text-lg font-semibold text-gray-900">{plan.minutes}</div>
                    <div className="text-sm text-gray-500">Nacionales</div>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-6 text-center">
                    <div className="flex flex-col items-center">
                      {plan.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {plan.originalPrice}€
                        </span>
                      )}
                      <div className="text-3xl font-bold text-green-600">
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
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-xl'
                          : 'bg-gray-800 text-white hover:bg-gray-900'
                      }`}
                      onClick={() => {
                        // Aquí integrarías con tu sistema de leads
                        alert(`Plan ${plan.name} seleccionado por ${plan.price}€/mes`)
                      }}
                    >
                      {plan.isPopular ? '🚀 Contratar ya' : 'Más info'}
                    </button>
                    
                    {/* Features expandidas */}
                    {plan.features.length > 2 && (
                      <details className="mt-3 group">
                        <summary className="text-sm text-green-600 cursor-pointer hover:text-green-800">
                          Ver todas las características
                        </summary>
                        <div className="mt-2 text-sm text-gray-600 text-left">
                          {plan.features.slice(2).map((feature) => (
                            <div key={feature} className="flex items-center mt-1">
                              <span className="w-1 h-1 bg-green-400 rounded-full mr-2"></span>
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

      {/* Footer info */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>*Todos los precios incluyen IVA. Promociones por tiempo limitado.</p>
        <p className="mt-2">
          <span style={{ color: '#00aa00' }} className="font-semibold">Prisma Móvil</span> - 
          Transparencia total, sin sorpresas en tu factura
        </p>
      </div>
    </div>
  )
}
