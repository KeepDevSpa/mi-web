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
  variant: 'dark' | 'medium' | 'golden' | 'blue' | 'light' | 'lightgreen' | 'lightblue' | 'purple'
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

export const demoConfigs: Record<string, PlanConfig> = {
  variants: {
    title: 'PricingCard Component Demo',
    subtitle: 'Explore all the different variants and configurations',
    plans: [
      {
        id: 'demo-fibra-basica',
        variant: 'dark',
        planName: 'Fibra Básica',
        isPopular: false,
        hasSpeedSelector: true,
        speeds: [
          { id: 'demo-600', label: '600 MB', price: 25, originalPrice: 35 },
          { id: 'demo-1gb', label: '1 GB', price: 30, originalPrice: 40 },
          { id: 'demo-2gb', label: '2 GB', price: 35, originalPrice: 45 }
        ],
        features: [
          'Fibra simétrica',
          'Instalación gratis',
          'Router incluido',
          'Soporte 24/7'
        ],
        extras: [],
        rateTier: 1,
        ctaText: 'Contratar',
        onCtaClick: () => alert('¡Has seleccionado Fibra Básica!')
      },
      {
        id: 'demo-fibra-estandar',
        variant: 'medium',
        planName: 'Fibra Estándar',
        isPopular: true,
        hasSpeedSelector: true,
        speeds: [
          { id: 'demo-600', label: '600 MB', price: 25, originalPrice: 35 },
          { id: 'demo-1gb', label: '1 GB', price: 30, originalPrice: 40 },
          { id: 'demo-2gb', label: '2 GB', price: 35, originalPrice: 45 }
        ],
        features: [
          'Fibra simétrica',
          'Instalación gratis',
          'Router incluido',
          'Soporte 24/7'
        ],
        extras: [],
        rateTier: 2,
        ctaText: '¡Lo quiero!',
        onCtaClick: () => alert('¡Has seleccionado Fibra Estándar!')
      },
      {
        id: 'demo-fibra-premium',
        variant: 'golden',
        planName: 'Fibra Premium',
        isPopular: false,
        hasSpeedSelector: true,
        speeds: [
          { id: 'demo-600', label: '600 MB', price: 25, originalPrice: 35 },
          { id: 'demo-1gb', label: '1 GB', price: 30, originalPrice: 40 },
          { id: 'demo-2gb', label: '2 GB', price: 35, originalPrice: 45 }
        ],
        features: [
          'Fibra simétrica',
          'Instalación gratis',
          'Router premium incluido',
          'Soporte 24/7',
          'Garantía extendida',
          'Sin permanencia'
        ],
        extras: [
          { id: 'demo-tv', label: 'Añade Prisma TV por 8€ Ahora 0€', price: 0, description: 'Más de 100 canales' },
          { id: 'demo-seguridad', label: 'Añade Seguridad Hogar por 12€', price: 12, description: 'Sistema de alarmas' },
          { id: 'demo-cloud', label: 'Añade Cloud Storage por 8€', price: 8, description: '500 GB de almacenamiento' }
        ],
        rateTier: 3,
        ctaText: 'Contratar Premium',
        onCtaClick: () => alert('¡Has seleccionado Fibra Premium!')
      },
      {
        id: 'demo-fibra-purple',
        variant: 'purple',
        planName: 'Fibra Purple',
        isPopular: true,
        hasSpeedSelector: true,
        speeds: [
          { id: 'demo-600', label: '600 MB', price: 28, originalPrice: 38 },
          { id: 'demo-1gb', label: '1 GB', price: 33, originalPrice: 43 },
          { id: 'demo-2gb', label: '2 GB', price: 38, originalPrice: 48 }
        ],
        features: [
          'Fibra simétrica',
          'Instalación gratis',
          'Router premium incluido',
          'Soporte 24/7',
          'Garantía extendida',
          'Sin permanencia',
          'Prioridad en red'
        ],
        extras: [
          { id: 'demo-tv', label: 'Añade Prisma TV por 8€ Ahora 0€', price: 0, description: 'Más de 100 canales' },
          { id: 'demo-seguridad', label: 'Añade Seguridad Hogar por 12€', price: 12, description: 'Sistema de alarmas' },
          { id: 'demo-cloud', label: 'Añade Cloud Storage por 8€', price: 8, description: '500 GB de almacenamiento' }
        ],
        rateTier: 3,
        ctaText: '¡Lo quiero!',
        onCtaClick: () => alert('¡Has seleccionado Fibra Purple!')
      }
    ]
  }
}
