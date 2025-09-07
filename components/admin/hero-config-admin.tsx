'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { availableIcons } from '@/lib/icon-manager'
import { Plus, Trash2, Save, Eye } from 'lucide-react'

interface HeroConfig {
  id?: string
  page: string
  title: string
  subtitle: string
  description: string
  primaryCta: {
    text: string
    href: string
    icon: string
  }
  secondaryCta: {
    text: string
    href: string
    icon: string
  }
  heroImage: string
  backgroundType: 'gradient' | 'image' | 'solid'
  variant: 'home' | 'fibra' | 'movil' | 'empresas'
  highlights: Array<{
    icon: string
    text: string
    color: string
  }>
  isActive: boolean
}

const defaultHeroConfig: HeroConfig = {
  page: 'home',
  title: 'La conexión que realmente te cuida',
  subtitle: 'EXPERIENCIA PREMIUM PRISMA',
  description: 'En Prisma no vendemos tarifas. Creamos experiencias premium con tecnología de vanguardia y atención humana real.',
  primaryCta: {
    text: 'Descubre la experiencia Prisma',
    href: '/fibra-movil',
    icon: 'star'
  },
  secondaryCta: {
    text: 'Hablar con un humano real',
    href: '/contacto',
    icon: 'phone'
  },
  heroImage: '/Hero-Banner.webp',
  backgroundType: 'image',
  variant: 'home',
  highlights: [
    {
      icon: 'shield',
      text: 'Tecnología certificada',
      color: 'text-blue-400'
    },
    {
      icon: 'users',
      text: 'Soporte 24/7 humano',
      color: 'text-purple-400'
    },
    {
      icon: 'zap',
      text: 'Instalación profesional',
      color: 'text-cyan-400'
    }
  ],
  isActive: true
}

export default function HeroConfigAdmin() {
  const [configs, setConfigs] = useState<HeroConfig[]>([])
  const [selectedConfig, setSelectedConfig] = useState<HeroConfig>(defaultHeroConfig)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchConfigs()
  }, [])

  const fetchConfigs = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/hero-config')
      if (response.ok) {
        const data = await response.json()
        if (Array.isArray(data)) {
          setConfigs(data)
        } else {
          setConfigs([data])
        }
      }
    } catch (error) {
      console.error('Error fetching configs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveConfig = async () => {
    try {
      setIsSaving(true)
      const method = selectedConfig.id ? 'PUT' : 'POST'
      const response = await fetch('/api/admin/hero-config', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedConfig),
      })

      if (response.ok) {
        await fetchConfigs()
        alert('Configuración guardada correctamente')
      } else {
        alert('Error al guardar la configuración')
      }
    } catch (error) {
      console.error('Error saving config:', error)
      alert('Error al guardar la configuración')
    } finally {
      setIsSaving(false)
    }
  }

  const addHighlight = () => {
    setSelectedConfig({
      ...selectedConfig,
      highlights: [
        ...selectedConfig.highlights,
        { icon: 'check-circle', text: '', color: 'text-blue-400' }
      ]
    })
  }

  const removeHighlight = (index: number) => {
    setSelectedConfig({
      ...selectedConfig,
      highlights: selectedConfig.highlights.filter((_, i) => i !== index)
    })
  }

  const updateHighlight = (index: number, field: string, value: string) => {
    const updated = [...selectedConfig.highlights]
    updated[index] = { ...updated[index], [field]: value }
    setSelectedConfig({ ...selectedConfig, highlights: updated })
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gestión de Hero Sections
        </h1>
        <p className="text-gray-600">
          Configura los hero sections para cada página de la web
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
                  value={selectedConfig.page} 
                  onChange={(e) => setSelectedConfig({...selectedConfig, page: e.target.value})}
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
                  value={selectedConfig.title}
                  onChange={(e) => setSelectedConfig({...selectedConfig, title: e.target.value})}
                />
              </div>

              <div>
                <Label>Subtítulo</Label>
                <Input
                  value={selectedConfig.subtitle}
                  onChange={(e) => setSelectedConfig({...selectedConfig, subtitle: e.target.value})}
                />
              </div>

              <div>
                <Label>Descripción</Label>
                <Textarea
                  value={selectedConfig.description}
                  onChange={(e) => setSelectedConfig({...selectedConfig, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div>
                <Label>Imagen de Hero</Label>
                <Input
                  value={selectedConfig.heroImage}
                  onChange={(e) => setSelectedConfig({...selectedConfig, heroImage: e.target.value})}
                  placeholder="/hero-image.jpg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tipo de Fondo</Label>
                  <Select 
                    value={selectedConfig.backgroundType} 
                    onValueChange={(value: any) => setSelectedConfig({...selectedConfig, backgroundType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gradient">Gradiente</SelectItem>
                      <SelectItem value="image">Imagen</SelectItem>
                      <SelectItem value="solid">Sólido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Variante</Label>
                  <Select 
                    value={selectedConfig.variant} 
                    onValueChange={(value: any) => setSelectedConfig({...selectedConfig, variant: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="fibra">Fibra</SelectItem>
                      <SelectItem value="movil">Móvil</SelectItem>
                      <SelectItem value="empresas">Empresas</SelectItem>
                    </SelectContent>
                  </Select>
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
                    value={selectedConfig.primaryCta.text}
                    onChange={(e) => setSelectedConfig({
                      ...selectedConfig,
                      primaryCta: {...selectedConfig.primaryCta, text: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <Label>CTA Principal - Enlace</Label>
                  <Input
                    value={selectedConfig.primaryCta.href}
                    onChange={(e) => setSelectedConfig({
                      ...selectedConfig,
                      primaryCta: {...selectedConfig.primaryCta, href: e.target.value}
                    })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>CTA Secundario - Texto</Label>
                  <Input
                    value={selectedConfig.secondaryCta.text}
                    onChange={(e) => setSelectedConfig({
                      ...selectedConfig,
                      secondaryCta: {...selectedConfig.secondaryCta, text: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <Label>CTA Secundario - Enlace</Label>
                  <Input
                    value={selectedConfig.secondaryCta.href}
                    onChange={(e) => setSelectedConfig({
                      ...selectedConfig,
                      secondaryCta: {...selectedConfig.secondaryCta, href: e.target.value}
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Highlights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Highlights
                <Button onClick={addHighlight} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Añadir
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedConfig.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                  <Select 
                    value={highlight.icon} 
                    onValueChange={(value) => updateHighlight(index, 'icon', value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableIcons.map((icon) => (
                        <SelectItem key={icon.id} value={icon.id}>
                          {icon.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Input
                    value={highlight.text}
                    onChange={(e) => updateHighlight(index, 'text', e.target.value)}
                    placeholder="Texto del highlight"
                    className="flex-1"
                  />
                  
                  <Select 
                    value={highlight.color} 
                    onValueChange={(value) => updateHighlight(index, 'color', value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text-blue-400">Azul</SelectItem>
                      <SelectItem value="text-purple-400">Púrpura</SelectItem>
                      <SelectItem value="text-cyan-400">Cian</SelectItem>
                      <SelectItem value="text-green-400">Verde</SelectItem>
                      <SelectItem value="text-yellow-400">Amarillo</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    onClick={() => removeHighlight(index)} 
                    size="sm" 
                    variant="outline"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button onClick={saveConfig} disabled={isSaving} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Guardando...' : 'Guardar Configuración'}
            </Button>
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Vista Previa
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
                {selectedConfig.backgroundType === 'image' && (
                  <img 
                    src={selectedConfig.heroImage} 
                    alt="Hero" 
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                  />
                )}
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 mb-4 text-sm">
                    {selectedConfig.subtitle}
                  </div>
                  
                  <h1 className="text-2xl font-bold mb-3">
                    {selectedConfig.title}
                  </h1>
                  
                  <p className="text-sm opacity-90 mb-4">
                    {selectedConfig.description}
                  </p>
                  
                  <div className="flex gap-2 mb-4">
                    <div className="bg-blue-600 text-xs px-3 py-1 rounded-full">
                      {selectedConfig.primaryCta.text}
                    </div>
                    <div className="border border-white text-xs px-3 py-1 rounded-full">
                      {selectedConfig.secondaryCta.text}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedConfig.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-1 bg-white/10 rounded px-2 py-1 text-xs">
                        <span>●</span>
                        <span>{highlight.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuraciones Guardadas</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-gray-500">Cargando...</p>
              ) : (
                <div className="space-y-2">
                  {configs.map((config) => (
                    <div 
                      key={config.id} 
                      className="flex items-center justify-between p-2 border rounded cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedConfig(config)}
                    >
                      <div>
                        <div className="font-medium">{config.page}</div>
                        <div className="text-sm text-gray-500">{config.title}</div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {config.isActive ? 'Activo' : 'Inactivo'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
