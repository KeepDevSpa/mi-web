'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function EnergiaForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoVivienda: '',
    superficie: '',
    consumoMensual: '',
    facturaActual: '',
    tipoInteres: [] as string[],
    horarios: '',
    comentarios: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleInteresChange = (interes: string) => {
    setFormData(prev => ({
      ...prev,
      tipoInteres: prev.tipoInteres.includes(interes) 
        ? prev.tipoInteres.filter(t => t !== interes)
        : [...prev.tipoInteres, interes]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error al enviar:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">⚡</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Solicitud enviada!</h2>
          <p className="text-gray-600 mb-6">
            Gracias por tu interés. Un experto en energía se pondrá en contacto contigo en las próximas 24 horas para realizar tu auditoría energética gratuita.
          </p>
          <Button 
            onClick={() => {
              setIsSubmitted(false)
              setStep(1)
              setFormData({
                nombre: '', email: '', telefono: '', tipoVivienda: '', superficie: '',
                consumoMensual: '', facturaActual: '', tipoInteres: [], horarios: '', comentarios: ''
              })
            }}
            className="bg-[#ea580c] hover:bg-[#c2410c] text-white"
          >
            Nueva consulta
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white">
        <CardTitle className="text-center">
          ⚡ Auditoría Energética Gratuita
        </CardTitle>
        <div className="text-center text-sm opacity-90">
          Paso {step} de 3 - Descubre cómo ahorrar en tu factura eléctrica
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-white/20 rounded-full h-2 mt-4">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={handleSubmit}>
          {/* Paso 1: Información personal */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Información de contacto
                </h3>
                <p className="text-gray-600">
                  Necesitamos estos datos para contactarte con los resultados
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre *
                  </label>
                  <Input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono *
                </label>
                <Input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                  placeholder="600 123 456"
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button 
                  type="button" 
                  onClick={nextStep}
                  disabled={!formData.nombre || !formData.email || !formData.telefono}
                  className="bg-[#ea580c] hover:bg-[#c2410c] text-white"
                >
                  Continuar →
                </Button>
              </div>
            </div>
          )}

          {/* Paso 2: Información de la vivienda */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Información de tu vivienda
                </h3>
                <p className="text-gray-600">
                  Esto nos ayuda a personalizar las recomendaciones
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de vivienda *
                  </label>
                  <select
                    value={formData.tipoVivienda}
                    onChange={(e) => handleInputChange('tipoVivienda', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                    required
                  >
                    <option value="">Selecciona...</option>
                    <option value="piso">Piso/Apartamento</option>
                    <option value="casa-adosada">Casa adosada</option>
                    <option value="casa-individual">Casa individual</option>
                    <option value="local">Local comercial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Superficie aproximada *
                  </label>
                  <select
                    value={formData.superficie}
                    onChange={(e) => handleInputChange('superficie', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                    required
                  >
                    <option value="">Selecciona...</option>
                    <option value="menos-50">Menos de 50m²</option>
                    <option value="50-80">50-80m²</option>
                    <option value="80-120">80-120m²</option>
                    <option value="120-200">120-200m²</option>
                    <option value="mas-200">Más de 200m²</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consumo mensual (kWh) *
                  </label>
                  <Input
                    type="number"
                    value={formData.consumoMensual}
                    onChange={(e) => handleInputChange('consumoMensual', e.target.value)}
                    placeholder="ej. 300"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Lo encontrarás en tu factura eléctrica
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Factura mensual aproximada *
                  </label>
                  <select
                    value={formData.facturaActual}
                    onChange={(e) => handleInputChange('facturaActual', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                    required
                  >
                    <option value="">Selecciona...</option>
                    <option value="menos-50">Menos de 50€</option>
                    <option value="50-100">50-100€</option>
                    <option value="100-150">100-150€</option>
                    <option value="150-200">150-200€</option>
                    <option value="mas-200">Más de 200€</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between">
                <Button 
                  type="button" 
                  onClick={prevStep}
                  variant="outline"
                >
                  ← Atrás
                </Button>
                <Button 
                  type="button" 
                  onClick={nextStep}
                  disabled={!formData.tipoVivienda || !formData.superficie || !formData.consumoMensual || !formData.facturaActual}
                  className="bg-[#ea580c] hover:bg-[#c2410c] text-white"
                >
                  Continuar →
                </Button>
              </div>
            </div>
          )}

          {/* Paso 3: Intereses y finalización */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  ¿Qué soluciones te interesan?
                </h3>
                <p className="text-gray-600">
                  Selecciona todas las que te resulten interesantes
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'solar', label: '☀️ Paneles solares para autoconsumo', desc: 'Genera tu propia energía' },
                  { id: 'led', label: '💡 Iluminación LED inteligente', desc: 'Reduce el consumo de iluminación' },
                  { id: 'smart', label: '🏠 Domótica y Smart Home', desc: 'Automatiza y optimiza tu consumo' },
                  { id: 'aislamiento', label: '🌡️ Mejora del aislamiento', desc: 'Climatización más eficiente' },
                  { id: 'tarifa', label: '📊 Optimización de tarifa eléctrica', desc: 'Encuentra la tarifa ideal' },
                  { id: 'baterias', label: '🔋 Baterías de almacenamiento', desc: 'Almacena energía para cuando la necesites' }
                ].map((interes) => (
                  <label key={interes.id} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.tipoInteres.includes(interes.id)}
                      onChange={() => handleInteresChange(interes.id)}
                      className="mt-1 rounded text-[#ea580c] focus:ring-[#ea580c]"
                    />
                    <div>
                      <div className="font-medium text-gray-800">{interes.label}</div>
                      <div className="text-sm text-gray-600">{interes.desc}</div>
                    </div>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mejor horario para contactarte
                </label>
                <select
                  value={formData.horarios}
                  onChange={(e) => handleInputChange('horarios', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                >
                  <option value="">Sin preferencia</option>
                  <option value="mañana">Mañanas (9h-14h)</option>
                  <option value="tarde">Tardes (14h-18h)</option>
                  <option value="noche">Noches (18h-21h)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comentarios adicionales
                </label>
                <textarea
                  value={formData.comentarios}
                  onChange={(e) => handleInputChange('comentarios', e.target.value)}
                  placeholder="¿Hay algo específico que te gustaría consultar?"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                  rows={3}
                />
              </div>

              <div className="flex justify-between">
                <Button 
                  type="button" 
                  onClick={prevStep}
                  variant="outline"
                >
                  ← Atrás
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting || formData.tipoInteres.length === 0}
                  className="bg-[#ea580c] hover:bg-[#c2410c] text-white min-w-[120px]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Enviando...</span>
                    </div>
                  ) : (
                    'Solicitar auditoría ⚡'
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
