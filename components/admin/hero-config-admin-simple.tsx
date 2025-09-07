'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Plus, X, Save } from 'lucide-react'

interface HeroHighlight {
  icon: string
  text: string
  color: string
}

interface HeroConfig {
  id?: string
  variant: 'home' | 'fibra' | 'movil' | 'empresas'
  title: string
  subtitle: string
  description: string
  primaryCtaText: string
  primaryCtaHref: string
  secondaryCtaText: string
  secondaryCtaHref: string
  heroImage: string
  backgroundType: 'gradient' | 'image'
  highlights: HeroHighlight[]
  isActive: boolean
}

export default function HeroConfigAdminSimple() {
  const [config, setConfig] = useState<HeroConfig>({
    variant: 'home',
    title: 'La conexión que realmente te cuida',
    subtitle: 'EXPERIENCIA PREMIUM PRISMA',
    description: 'En Prisma no vendemos tarifas. Creamos experiencias premium con tecnología de vanguardia y atención humana real. Porque lo importante para nosotros eres tú.',
    primaryCtaText: 'Descubre la experiencia Prisma',
    primaryCtaHref: '/profesional/fibra-movil',
    secondaryCtaText: 'Hablar con un humano real',
    secondaryCtaHref: '/profesional/contacto',
    heroImage: '/Hero-Banner.webp',
    backgroundType: 'image',
    highlights: [
      { icon: '🛡️', text: 'Tecnología certificada', color: 'text-blue-400' },
      { icon: '👥', text: 'Soporte 24/7 humano', color: 'text-purple-400' },
      { icon: '⚡', text: 'Instalación profesional', color: 'text-cyan-400' }
    ],
    isActive: true
  })

  const [newHighlight, setNewHighlight] = useState<HeroHighlight>({
    icon: '',
    text: '',
    color: 'text-blue-400'
  })

  const addHighlight = () => {
    if (newHighlight.icon && newHighlight.text) {
      setConfig(prev => ({
        ...prev,
        highlights: [...prev.highlights, { ...newHighlight }]
      }))
      setNewHighlight({ icon: '', text: '', color: 'text-blue-400' })
    }
  }

  const removeHighlight = (index: number) => {
    setConfig(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }))
  }

  const handleSave = async () => {
    try {
      console.log('Guardando configuración:', config)
      // Aquí implementarías la llamada a la API para guardar
      alert('Configuración guardada (demo)')
    } catch (error) {
      console.error('Error guardando:', error)
      alert('Error al guardar')
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Configuración de Hero</span>
          <Badge variant="outline">Demo</Badge>
        </CardTitle>
        <CardDescription>
          Gestiona el contenido del hero section de tu sitio profesional
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Variant Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="variant">Variante</Label>
            <select 
              value={config.variant} 
              onChange={(e) => setConfig(prev => ({ ...prev, variant: e.target.value as any }))}
              className="w-full p-2 border rounded"
            >
              <option value="home">Home</option>
              <option value="fibra">Fibra</option>
              <option value="movil">Móvil</option>
              <option value="empresas">Empresas</option>
            </select>
          </div>
          <div>
            <Label htmlFor="backgroundType">Tipo de fondo</Label>
            <select 
              value={config.backgroundType} 
              onChange={(e) => setConfig(prev => ({ ...prev, backgroundType: e.target.value as any }))}
              className="w-full p-2 border rounded"
            >
              <option value="gradient">Degradado</option>
              <option value="image">Imagen</option>
            </select>
          </div>
        </div>

        {/* Text Fields */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Título principal</Label>
            <Input
              id="title"
              value={config.title}
              onChange={(e) => setConfig(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Ej: La conexión que realmente te cuida"
            />
          </div>
          <div>
            <Label htmlFor="subtitle">Subtítulo</Label>
            <Input
              id="subtitle"
              value={config.subtitle}
              onChange={(e) => setConfig(prev => ({ ...prev, subtitle: e.target.value }))}
              placeholder="Ej: EXPERIENCIA PREMIUM PRISMA"
            />
          </div>
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={config.description}
              onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descripción del hero..."
              rows={3}
            />
          </div>
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>CTA Primario</Label>
            <Input
              value={config.primaryCtaText}
              onChange={(e) => setConfig(prev => ({ ...prev, primaryCtaText: e.target.value }))}
              placeholder="Texto del botón"
            />
            <Input
              value={config.primaryCtaHref}
              onChange={(e) => setConfig(prev => ({ ...prev, primaryCtaHref: e.target.value }))}
              placeholder="URL del enlace"
            />
          </div>
          <div className="space-y-2">
            <Label>CTA Secundario</Label>
            <Input
              value={config.secondaryCtaText}
              onChange={(e) => setConfig(prev => ({ ...prev, secondaryCtaText: e.target.value }))}
              placeholder="Texto del botón"
            />
            <Input
              value={config.secondaryCtaHref}
              onChange={(e) => setConfig(prev => ({ ...prev, secondaryCtaHref: e.target.value }))}
              placeholder="URL del enlace"
            />
          </div>
        </div>

        {/* Hero Image */}
        <div>
          <Label htmlFor="heroImage">Imagen de hero</Label>
          <Input
            id="heroImage"
            value={config.heroImage}
            onChange={(e) => setConfig(prev => ({ ...prev, heroImage: e.target.value }))}
            placeholder="/hero-image.jpg"
          />
        </div>

        {/* Highlights */}
        <div>
          <Label>Highlights</Label>
          <div className="space-y-3">
            {/* Current highlights */}
            <div className="space-y-2">
              {config.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <span className="text-sm font-medium">{highlight.icon}</span>
                  <span className="flex-1">{highlight.text}</span>
                  <Badge variant="secondary">{highlight.color}</Badge>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeHighlight(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Add new highlight */}
            <div className="grid grid-cols-12 gap-2 p-3 border-2 border-dashed rounded">
              <div className="col-span-2">
                <Input
                  value={newHighlight.icon}
                  onChange={(e) => setNewHighlight(prev => ({ ...prev, icon: e.target.value }))}
                  placeholder="🌟"
                />
              </div>
              <div className="col-span-6">
                <Input
                  value={newHighlight.text}
                  onChange={(e) => setNewHighlight(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="Texto del highlight"
                />
              </div>
              <div className="col-span-3">
                <select 
                  value={newHighlight.color} 
                  onChange={(e) => setNewHighlight(prev => ({ ...prev, color: e.target.value }))}
                  className="w-full p-2 border rounded text-sm"
                >
                  <option value="text-blue-400">Azul</option>
                  <option value="text-green-400">Verde</option>
                  <option value="text-purple-400">Morado</option>
                  <option value="text-pink-400">Rosa</option>
                  <option value="text-orange-400">Naranja</option>
                  <option value="text-cyan-400">Cian</option>
                  <option value="text-red-400">Rojo</option>
                  <option value="text-yellow-400">Amarillo</option>
                </select>
              </div>
              <div className="col-span-1">
                <Button type="button" variant="outline" size="sm" onClick={addHighlight}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="p-4 bg-gray-50 rounded border">
          <h3 className="font-medium mb-3">Vista previa</h3>
          <div className="text-sm space-y-2">
            <div><strong>Variante:</strong> {config.variant}</div>
            <div><strong>Título:</strong> {config.title}</div>
            <div><strong>Subtítulo:</strong> {config.subtitle}</div>
            <div><strong>CTA Principal:</strong> {config.primaryCtaText} → {config.primaryCtaHref}</div>
            <div><strong>Highlights:</strong> {config.highlights.length} elementos</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Guardar configuración
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
