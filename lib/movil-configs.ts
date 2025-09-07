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

export const movilConfigs: Record<string, PlanConfig> = {
  mobile: {
    title: 'Tarifas Móviles',
    subtitle: 'Elige la tarifa móvil que mejor se adapte a ti',
    plans: [
      {
        id: 'movil-5',
        variant: 'dark',
        planName: 'Móvil 5',
        isPopular: false,
        hasSpeedSelector: false,
        speeds: [
          { id: 'movil-5gb', label: '5 GB', price: 15, originalPrice: 25 }
        ],
        features: [
          'Datos 5G/4G+',
          'Llamadas ilimitadas',
          'SMS ilimitados',
          'Cobertura nacional',
          'App Prisma'
        ],
        extras: [
          { id: 'movil-tv', label: 'Añade Prisma TV por 8€', price: 8, description: 'Más de 100 canales' },
          { id: 'movil-seguridad', label: 'Añade Seguridad Hogar por 12€', price: 12, description: 'Sistema de alarmas' }
        ],
        rateTier: 1,
        ctaText: '¡Lo quiero!',
        onCtaClick: undefined
      },
      {
        id: 'movil-20',
        variant: 'medium',
        planName: 'Móvil 20',
        isPopular: true,
        hasSpeedSelector: false,
        speeds: [
          { id: 'movil-20gb', label: '20 GB', price: 20, originalPrice: 30 }
        ],
        features: [
          'Datos 5G/4G+',
          'Llamadas ilimitadas',
          'SMS ilimitados',
          'Cobertura nacional',
          'App Prisma',
          'Sin permanencia'
        ],
        extras: [
          { id: 'movil-tv', label: 'Añade Prisma TV por 8€', price: 8, description: 'Más de 100 canales' },
          { id: 'movil-seguridad', label: 'Añade Seguridad Hogar por 12€', price: 12, description: 'Sistema de alarmas' }
        ],
        rateTier: 2,
        ctaText: '¡Lo quiero!',
        onCtaClick: undefined
      },
      {
        id: 'movil-60',
        variant: 'lightblue',
        planName: 'Móvil 60',
        isPopular: true,
        hasSpeedSelector: false,
        speeds: [
          { id: 'movil-60gb', label: '60 GB', price: 25, originalPrice: 35 }
        ],
        features: [
          'Datos 5G/4G+',
          'Llamadas ilimitadas',
          'SMS ilimitados',
          'Cobertura nacional',
          'App Prisma',
          'Sin permanencia',
          'Soporte prioritario'
        ],
        extras: [
          { id: 'movil-tv', label: 'Añade Prisma TV por 8€', price: 8, description: 'Más de 100 canales' },
          { id: 'movil-seguridad', label: 'Añade Seguridad Hogar por 12€', price: 12, description: 'Sistema de alarmas' }
        ],
        rateTier: 3,
        ctaText: '¡Lo quiero!',
        onCtaClick: undefined
      },
      {
        id: 'movil-ilimitada',
        variant: 'lightgreen',
        planName: 'Móvil Ilimitada',
        isPopular: false,
        hasSpeedSelector: false,
        speeds: [
          { id: 'movil-ilimitada', label: 'GB Ilimitados', price: 30, originalPrice: 45 }
        ],
        features: [
          'Datos 5G/4G+ ilimitados',
          'Llamadas ilimitadas',
          'SMS ilimitados',
          'Cobertura nacional',
          'App Prisma',
          'Sin permanencia',
          'Soporte 24/7',
          'Prioridad en red'
        ],
        extras: [
          { id: 'movil-tv', label: 'Añade Prisma TV por 8€', price: 8, description: 'Más de 100 canales' },
          { id: 'movil-seguridad', label: 'Añade Seguridad Hogar por 12€', price: 12, description: 'Sistema de alarmas' }
        ],
        rateTier: 4,
        ctaText: '¡Lo quiero!',
        onCtaClick: undefined
      }
    ]
  }
}
