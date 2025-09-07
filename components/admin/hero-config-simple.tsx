'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Save } from 'lucide-react'

export default function HeroConfigAdminSimple() {
  const [config, setConfig] = useState({
    page: 'home',
    title: 'La conexión que realmente te cuida',
    subtitle: 'EXPERIENCIA PREMIUM PRISMA',
    description: 'En Prisma no vendemos tarifas. Creamos experiencias premium con tecnología de vanguardia y atención humana real.',
    primaryCtaText: 'Descubre la experiencia Prisma',
    primaryCtaHref: '/fibra-movil',
    secondaryCtaText: 'Hablar con un humano real',
    secondaryCtaHref: '/contacto',
    heroImage: '/Hero-Banner.webp',
    backgroundType: 'image',
    variant: 'home'
  })

  const [isSaving, setIsSaving] = useState(false)

  const saveConfig = async () => {
    try {
      setIsSaving(true)
      // En una implementación real, aquí haríamos el POST a la API
      console.log('Guardando configuración:', config)
      
      // Simular guardado
      setTimeout(() => {
        alert('Configuración guardada correctamente')
        setIsSaving(false)
      }, 1000)
      
    } catch (error) {
      console.error('Error saving config:', error)
      alert('Error al guardar la configuración')
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gestión de Hero Section
        </h1>
        <p className="text-gray-600">
          Configura el hero section principal de la web
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración Básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Página</Label>
                <select 
                  value={config.page} 
                  onChange={(e) => setConfig({...config, page: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="home">Home</option>
                  <option value="fibra">Fibra</option>
                  <option value="movil">Móvil</option>
                  <option value="empresa">Empresas</option>
                  <option value="prisma-tv">PrismaTV</option>
                </select>
              </div>

              <div>
                <Label>Título</Label>
                <Input
                  value={config.title}
                  onChange={(e) => setConfig({...config, title: e.target.value})}
                />
              </div>

              <div>
                <Label>Subtítulo</Label>
                <Input
                  value={config.subtitle}
                  onChange={(e) => setConfig({...config, subtitle: e.target.value})}
                />
              </div>

              <div>
                <Label>Descripción</Label>
                <Textarea
                  value={config.description}
                  onChange={(e) => setConfig({...config, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div>
                <Label>Imagen de Hero</Label>
                <Input
                  value={config.heroImage}
                  onChange={(e) => setConfig({...config, heroImage: e.target.value})}
                  placeholder="/hero-image.jpg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tipo de Fondo</Label>
                  <select 
                    value={config.backgroundType} 
                    onChange={(e) => setConfig({...config, backgroundType: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="gradient">Gradiente</option>
                    <option value="image">Imagen</option>
                    <option value="solid">Sólido</option>
                  </select>
                </div>

                <div>
                  <Label>Variante</Label>
                  <select 
                    value={config.variant} 
                    onChange={(e) => setConfig({...config, variant: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="home">Home</option>
                    <option value="fibra">Fibra</option>
                    <option value="movil">Móvil</option>
                    <option value="empresas">Empresas</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTAs */}
          <Card>
            <CardHeader>
              <CardTitle>Botones de Acción (CTAs)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>CTA Principal - Texto</Label>
                  <Input
                    value={config.primaryCtaText}
                    onChange={(e) => setConfig({...config, primaryCtaText: e.target.value})}
                  />
                </div>
                <div>
                  <Label>CTA Principal - Enlace</Label>
                  <Input
                    value={config.primaryCtaHref}
                    onChange={(e) => setConfig({...config, primaryCtaHref: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>CTA Secundario - Texto</Label>
                  <Input
                    value={config.secondaryCtaText}
                    onChange={(e) => setConfig({...config, secondaryCtaText: e.target.value})}
                  />
                </div>
                <div>
                  <Label>CTA Secundario - Enlace</Label>
                  <Input
                    value={config.secondaryCtaHref}
                    onChange={(e) => setConfig({...config, secondaryCtaHref: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button onClick={saveConfig} disabled={isSaving} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Guardando...' : 'Guardar Configuración'}
            </Button>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vista Previa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-6 text-white min-h-[400px] relative overflow-hidden">
                {config.backgroundType === 'image' && (
                  <img 
                    src={config.heroImage} 
                    alt="Hero" 
                    className="absolute inset-0 w-full h-full object-cover opacity-50 rounded-lg"
                  />
                )}
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 mb-4 text-sm">
                    {config.subtitle}
                  </div>
                  
                  <h1 className="text-2xl font-bold mb-3">
                    {config.title}
                  </h1>
                  
                  <p className="text-sm opacity-90 mb-4">
                    {config.description}
                  </p>
                  
                  <div className="flex gap-2 mb-4">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-xs px-3 py-1 rounded-full">
                      {config.primaryCtaText}
                    </div>
                    <div className="border border-white text-xs px-3 py-1 rounded-full">
                      {config.secondaryCtaText}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1 bg-white/10 rounded px-2 py-1 text-xs">
                      <span>🛡️</span>
                      <span>Tecnología certificada</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/10 rounded px-2 py-1 text-xs">
                      <span>👥</span>
                      <span>Soporte 24/7 humano</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/10 rounded px-2 py-1 text-xs">
                      <span>⚡</span>
                      <span>Instalación profesional</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Información del Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Página:</span>
                  <span className="font-medium">{config.page}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Variante:</span>
                  <span className="font-medium">{config.variant}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tipo de fondo:</span>
                  <span className="font-medium">{config.backgroundType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Estado:</span>
                  <span className="font-medium text-green-600">Activo</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
