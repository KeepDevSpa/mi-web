export interface Speed {
  id: string
  label: string
  price: number
  originalPrice: number
}

export interface Extra {
  id: string
  label: string
  price: number
  description: string
}

export interface Plan {
  id: string
  variant: 'dark' | 'medium' | 'golden' | 'blue' | 'light' | 'lightgreen' | 'lightblue'
  planName: string
  isPopular: boolean
  hasSpeedSelector: boolean
  speeds: Speed[]
  features: string[]
  extras: Extra[]
  rateTier: number
  ctaText: string
  onCtaClick: () => void
}

export interface PlanConfig {
  title: string
  subtitle: string
  plans: Plan[]
}

export const homeConfigs: Record<string, PlanConfig> = {
  featured: {
    title: 'Planes Destacados',
    subtitle: 'Las mejores ofertas para tu hogar',
    plans: [
      {
        id: 'home-fibra-evolution',
        variant: 'lightgreen',
        planName: 'Fibra Evolution',
        isPopular: false,
        hasSpeedSelector: false,
        speeds: [
          { id: '600', label: '600 MB', price: 15, originalPrice: 25 }
        ],
        features: [
          'Fibra óptica simétrica 600Mb',
          'Router WiFi 6',
          'Instalación gratis',
          'Soporte 24/7'
        ],
        extras: [
          { id: 'home-tv', label: 'Añade Prisma TV por 8€', price: 8, description: 'Más de 100 canales' },
          { id: 'home-seguridad', label: 'Añade Seguridad Hogar por 12€', price: 12, description: 'Sistema de alarmas' }
        ],
        rateTier: 1,
        ctaText: '¡Lo quiero!',
        onCtaClick: undefined
      },
      {
        id: 'home-fibra-estandar',
        variant: 'dark',
        planName: 'Fibra Estándar',
        isPopular: true,
        hasSpeedSelector: false,
        speeds: [
          { id: '1gb', label: '1 GB', price: 20, originalPrice: 30 }
        ],
        features: [
          'Fibra óptica simétrica 1Gb',
          'Router WiFi 6',
          'Instalación gratis',
          'Soporte 24/7',
          'Sin permanencia'
        ],
        extras: [
          { id: 'home-tv', label: 'Añade Prisma TV por 8€', price: 8, description: 'Más de 100 canales' },
          { id: 'home-seguridad', label: 'Añade Seguridad Hogar por 12€', price: 12, description: 'Sistema de alarmas' }
        ],
        rateTier: 2,
        ctaText: '¡Lo quiero!',
        onCtaClick: undefined
      },
      {
        id: 'home-fibra-premium',
        variant: 'golden',
        planName: 'Fibra Premium',
        isPopular: false,
        hasSpeedSelector: false,
        speeds: [
          { id: '2gb', label: '2 GB', price: 25, originalPrice: 35 }
        ],
        features: [
          'Fibra óptica simétrica 2Gb',
          'Router WiFi 6 avanzado',
          'Instalación gratis',
          'Soporte 24/7',
          'Sin permanencia',
          'Prioridad en red'
        ],
        extras: [
          { id: 'home-tv', label: 'Añade Prisma TV por 8€', price: 8, description: 'Más de 100 canales' },
          { id: 'home-seguridad', label: 'Añade Seguridad Hogar por 12€', price: 12, description: 'Sistema de alarmas' },
          { id: 'home-cloud', label: 'Añade Cloud Storage por 8€', price: 8, description: '500 GB de almacenamiento' }
        ],
        rateTier: 3,
        ctaText: '¡Lo quiero!',
        onCtaClick: undefined
      }
    ]
  }
}
