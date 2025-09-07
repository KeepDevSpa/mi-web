"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Calculator, Phone, Upload, FileText, TrendingDown, Clock } from "lucide-react"

interface EnergiaFormData {
  name: string
  phone: string
  email: string
  location: string
  currentCompany: string
  message: string
}

export default function EnergiaForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState<EnergiaFormData>({
    name: "",
    phone: "",
    email: "",
    location: "",
    currentCompany: "",
    message: ""
  })

  const handleInputChange = (field: keyof EnergiaFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'energia-form',
          priority: 'high',
          subject: `Consulta Energía Solar - ${formData.name}`
        })
      })

      if (response.ok) {
        setShowSuccess(true)
        setFormData({
          name: "", phone: "", email: "", location: "", 
          currentCompany: "", message: ""
        })
        setTimeout(() => setShowSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (showSuccess) {
    return (
      <section className="py-16 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-green-200 bg-green-50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-2">¡Solicitud Recibida!</h3>
              <p className="text-green-700">
                Nuestro equipo de especialistas energéticos analizará tus facturas de luz y gas y se pondrá en contacto contigo en las próximas 24 horas con las mejores opciones de ahorro disponibles.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-r from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
              <Calculator className="w-4 h-4 mr-2" />
              Comparativa Gratuita
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Compara tus <span className="text-orange-600">Tarifas de Energía</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Te ayudamos a encontrar las mejores tarifas de luz y gas para tu hogar o negocio. ¡Sube tu última factura y te calculamos el ahorro!
            </p>
          </div>

          <Card className="border-orange-200 shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Información Personal */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-orange-600" />
                      Información de Contacto
                    </h3>
                    
                    <div>
                      <Label htmlFor="name">Nombre completo *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Tu nombre completo"
                        required
                        className="border-orange-200 focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="600 123 456"
                        required
                        className="border-orange-200 focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="tu@email.com"
                        className="border-orange-200 focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="location">Ubicación *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="Ciudad, Provincia"
                        required
                        className="border-orange-200 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  {/* Información de Factura */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-orange-600" />
                      Tu Factura Actual
                    </h3>

                    <div>
                      <Label htmlFor="currentCompany">Compañía actual (luz/gas)</Label>
                      <Input
                        id="currentCompany"
                        value={formData.currentCompany}
                        onChange={(e) => handleInputChange("currentCompany", e.target.value)}
                        placeholder="ej: Iberdrola, Endesa, Naturgy, Repsol..."
                        className="border-orange-200 focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bill-upload">Sube tu última factura (luz y/o gas) *</Label>
                      <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-orange-300 border-dashed rounded-lg hover:border-orange-400 transition-colors">
                        <div className="space-y-2 text-center">
                          <Upload className="mx-auto h-12 w-12 text-orange-400" />
                          <div className="text-sm text-gray-600">
                            <label
                              htmlFor="bill-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                            >
                              <span>Subir factura</span>
                              <input id="bill-upload" name="bill-upload" type="file" accept=".pdf,.jpg,.png" className="sr-only" />
                            </label>
                            <p className="pl-1">o arrastra y suelta</p>
                          </div>
                          <p className="text-xs text-gray-500">PDF, PNG, JPG hasta 10MB</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex">
                        <Calculator className="h-5 w-5 text-orange-400 mt-0.5 mr-2" />
                        <div className="text-sm">
                          <h4 className="font-medium text-orange-800">¿Por qué necesitamos tu factura?</h4>
                          <p className="text-orange-700 mt-1">
                            Con tu factura de luz y/o gas podemos calcular exactamente cuánto ahorrarías con las mejores tarifas del mercado.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Comentarios adicionales</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Cuéntanos si tienes alguna preferencia o duda sobre tus tarifas de luz y gas"
                    className="border-orange-200 focus:border-orange-500 min-h-20"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-8 py-3 text-lg font-semibold"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Calculando ahorro...
                      </>
                    ) : (
                      <>
                        <TrendingDown className="w-5 h-5 mr-2" />
                        Calcular mi Ahorro
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-gray-500 text-center">
                    Comparativa gratuita y sin compromiso
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-orange-100">
                  <div className="text-center">
                    <Calculator className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Comparativa Gratuita</p>
                    <p className="text-xs text-gray-600">Sin compromiso</p>
                  </div>
                  <div className="text-center">
                    <TrendingDown className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Mejores Tarifas</p>
                    <p className="text-xs text-gray-600">Luz y gas</p>
                  </div>
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Gestión Completa</p>
                    <p className="text-xs text-gray-600">Nos encargamos de todo</p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
