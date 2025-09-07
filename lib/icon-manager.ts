// lib/icon-manager.ts
import React from 'react'
import { 
  Wifi, Zap, Shield, Users, Phone, Home, Building, 
  Smartphone, Monitor, CheckCircle, Star, ArrowRight,
  Heart, Award, Clock, Headphones, Settings, Globe
} from 'lucide-react'

export interface IconOption {
  id: string
  name: string
  component: any
  category: 'connectivity' | 'support' | 'technology' | 'business' | 'general'
}

export const availableIcons: IconOption[] = [
  // Connectivity
  { id: 'wifi', name: 'WiFi', component: Wifi, category: 'connectivity' },
  { id: 'zap', name: 'Velocidad', component: Zap, category: 'connectivity' },
  { id: 'globe', name: 'Red Global', component: Globe, category: 'connectivity' },
  { id: 'smartphone', name: 'Móvil', component: Smartphone, category: 'connectivity' },
  
  // Support
  { id: 'users', name: 'Equipo', component: Users, category: 'support' },
  { id: 'phone', name: 'Teléfono', component: Phone, category: 'support' },
  { id: 'headphones', name: 'Soporte', component: Headphones, category: 'support' },
  { id: 'heart', name: 'Cuidado', component: Heart, category: 'support' },
  
  // Technology
  { id: 'shield', name: 'Seguridad', component: Shield, category: 'technology' },
  { id: 'monitor', name: 'Tecnología', component: Monitor, category: 'technology' },
  { id: 'settings', name: 'Configuración', component: Settings, category: 'technology' },
  
  // Business
  { id: 'building', name: 'Empresa', component: Building, category: 'business' },
  { id: 'home', name: 'Hogar', component: Home, category: 'business' },
  
  // General
  { id: 'check-circle', name: 'Verificado', component: CheckCircle, category: 'general' },
  { id: 'star', name: 'Destacado', component: Star, category: 'general' },
  { id: 'arrow-right', name: 'Avanzar', component: ArrowRight, category: 'general' },
  { id: 'award', name: 'Premio', component: Award, category: 'general' },
  { id: 'clock', name: 'Tiempo', component: Clock, category: 'general' }
]

export function getIconComponent(iconId: string) {
  const icon = availableIcons.find(i => i.id === iconId)
  return icon?.component || CheckCircle
}

export function getIconsByCategory(category?: string) {
  if (!category) return availableIcons
  return availableIcons.filter(icon => icon.category === category)
}

// Interfaz para elementos multimedia
export interface MediaItem {
  type: 'icon' | 'image'
  value: string // iconId para iconos, URL para imágenes
  alt?: string
  className?: string
  size?: number
}
