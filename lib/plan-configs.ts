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
  onCtaClick?: () => void
}

export interface PlanConfig {
  title: string
  subtitle: string
  plans: Plan[]
}

export const planConfigs: Record<string, PlanConfig> = {
  todo: {
    title: 'Tarifa Todo',
    subtitle: '1 línea de móvil',
    plans: [
      {
        id: 'evolution',
        variant: 'lightgreen',
        planName: 'Todo Evolution ilimitada',
        isPopular: true,
        hasSpeedSelector: true,
        speeds: [
          { id: '20gb', label: '20 GB', price: 27, originalPrice: 45 },
          { id: '60gb', label: '60 GB', price: 27, originalPrice: 45 },
          { id: 'ilimitada', label: 'Ilimitada', price: 27, originalPrice: 45 }
        ],
        features: [
          'Fibra óptica simétrica 600Mb',
          'Router WiFi 6',
          'Línea móvil con velocidad 5G',
          'Llamadas ilimitadas',
          'Instalación gratis'
        ],
        extras: [
          { id: 'linea-20gb', label: 'Añade una segunda línea por 7€', price: 7, description: 'Añade una línea adicional' },
          { id: 'linea-60gb', label: 'Añade una segunda línea por 7€', price: 7, description: 'Añade una línea adicional' },
          { id: 'linea-ilimitada', label: 'Añade una segunda línea por 7€', price: 7, description: 'Añade una línea adicional' }
        ],
        rateTier: 1,
        ctaText: '¡Lo quiero!',
        onCtaClick: undefined
      },
      {
        id: 'pro',
        variant: 'dark',
        planName: 'Todo Pro ilimitada',
        isPopular: false,
        hasSpeedSelector: true,
        speeds: [
          { id: '20gb', label: '20 GB', price: 30, originalPrice: 50 },
          { id: '60gb', label: '60 GB', price: 30, originalPrice: 50 },
          { id: 'ilimitada', label: 'Ilimitada', price: 30, originalPrice: 50 }
        ],
        features: [
          'Fibra óptica simétrica 1Gb',
          'Router WiFi 6',
          'Línea móvil GB ilimitados con velocidad 5G',
          'Llamadas ilimitadas'
        ],
        extras: [
          { id: 'linea-20gb', label: 'Añade una segunda línea por 7€', price: 7, description: 'Añade una línea adicional' },
          { id: 'landline', label: 'Añade una línea fija por solo 0€', price: 0, description: 'Tarifa Fijo sin minutos' },
          { id: 'tv', label: 'Añade Prisma TV por 5€ Ahora 0€', price: 0, description: 'Ahora gratis' }
        ],
        rateTier: 2,
        ctaText: '¡Lo quiero!',
        onCtaClick: undefined
      },
      {
        id: 'master',
        variant: 'golden',
        planName: 'Todo Master ilimitada',
        isPopular: false,
        hasSpeedSelector: true,
        speeds: [
          { id: '20gb', label: '20 GB', price: 57, originalPrice: 57 },
          { id: '60gb', label: '60 GB', price: 57, originalPrice: 57 },
          { id: 'ilimitada', label: 'Ilimitada', price: 57, originalPrice: 57 }
        ],
        features: [
          'Fibra óptica 10Gb',
          'Router WiFi 6',
          'Línea móvil con velocidad 5G',
          'Llamadas ilimitadas',
          'Instalación gratis'
        ],
        extras: [
          { id: 'linea-20gb', label: 'Añade una segunda línea por 7€', price: 7, description: 'Añade una línea adicional' },
          { id: 'linea-60gb', label: 'Añade una segunda línea por 7€', price: 7, description: 'Añade una línea adicional' },
          { id: 'linea-ilimitada', label: 'Añade una segunda línea por 7€', price: 7, description: 'Añade una línea adicional' }
        ],
        rateTier: 3,
        ctaText: '¡Lo quiero!',
        onCtaClick: undefined
      },
      // Demo card removed from fibra-movil page
    ]
  },
  familiar: {
    title: 'Tarifa Todo Familiar',
    subtitle: 'Hasta 3 líneas de móvil con descuentos especiales para familias',
    plans: [
      {
        id: 'evolution-familiar',
        variant: 'lightgreen',
        planName: 'Todo Evolution Familiar',
        isPopular: true,
        hasSpeedSelector: true,
        speeds: [
          { id: '20gb', label: '20 GB', price: 25, originalPrice: 40 },
          { id: '60gb', label: '60 GB', price: 25, originalPrice: 40 },
          { id: 'ilimitada', label: 'Ilimitada', price: 25, originalPrice: 40 }
        ],
        features: [
          'Fibra óptica simétrica 600Mb',
          'Router WiFi 6',
          'Línea móvil con velocidad 5G',
          'Llamadas ilimitadas',
          'Instalación gratis',
          'Descuento familiar aplicado'
        ],
        extras: [
          { id: 'linea-20gb', label: 'Añade una segunda línea por 5€', price: 5, description: 'Añade una línea adicional' },
          { id: 'linea-60gb', label: 'Añade una tercera línea por 5€', price: 5, description: 'Añade una línea adicional' }
        ],
        rateTier: 1,
        ctaText: '¡Lo quiero!',
        onCtaClick: undefined
      },
      {
        id: 'pro-familiar',
        variant: 'dark',
        planName: 'Todo Pro Familiar',
        isPopular: false,
        hasSpeedSelector: true,
        speeds: [
          { id: '20gb', label: '20 GB', price: 28, originalPrice: 45 },
          { id: '60gb', label: '60 GB', price: 28, originalPrice: 45 },
          { id: 'ilimitada', label: 'Ilimitada', price: 28, originalPrice: 45 }
        ],
        features: [
          'Fibra óptica simétrica 1Gb',
          'Router WiFi 6',
          'Línea móvil GB ilimitados con velocidad 5G',
          'Llamadas ilimitadas',
          'Descuento familiar aplicado'
        ],
        extras: [
          { id: 'linea-20gb', label: 'Añade una segunda línea por 5€', price: 5, description: 'Añade una línea adicional' },
          { id: 'linea-60gb', label: 'Añade una tercera línea por 5€', price: 5, description: 'Añade una línea adicional' },
          { id: 'landline', label: 'Añade una línea fija por solo 0€', price: 0, description: 'Tarifa Fijo sin minutos' },
          { id: 'tv', label: 'Añade Prisma TV por 3€ Ahora 0€', price: 0, description: 'Ahora gratis' },
          { id: 'seguridad', label: 'Añade Seguridad Hogar por 8€', price: 8, description: 'Protección familiar' }
        ],
        rateTier: 2,
        ctaText: '¡Lo quiero!',
        onCtaClick: undefined
      },
      {
        id: 'master-familiar',
        variant: 'golden',
        planName: 'Todo Master Familiar',
        isPopular: false,
        hasSpeedSelector: true,
        speeds: [
          { id: '20gb', label: '20 GB', price: 52, originalPrice: 65 },
          { id: '60gb', label: '60 GB', price: 52, originalPrice: 65 },
          { id: 'ilimitada', label: 'Ilimitada', price: 52, originalPrice: 65 }
        ],
        features: [
          'Fibra óptica 10Gb',
          'Router WiFi 6',
          'Línea móvil con velocidad 5G',
          'Llamadas ilimitadas',
          'Instalación gratis',
          'Descuento familiar aplicado'
        ],
        extras: [
          { id: 'linea-20gb', label: 'Añade una segunda línea por 5€', price: 5, description: 'Añade una línea adicional' },
          { id: 'linea-60gb', label: 'Añade una tercera línea por 5€', price: 5, description: 'Añade una línea adicional' },
          { id: 'linea-ilimitada', label: 'Añade una cuarta línea por 5€', price: 5, description: 'Añade una línea adicional' }
        ],
        rateTier: 3,
        ctaText: '¡Lo quiero!',
        onCtaClick: undefined
      }
    ]
  },
  internacional: {
    title: 'Tarifa Todo Internacional',
    subtitle: '1 línea + 1.000 minutos internacionales',
    plans: [
      {
        id: 'evolution-internacional',
        variant: 'lightgreen',
        planName: 'Todo Evolution Internacional',
        isPopular: true,
        hasSpeedSelector: true,
        speeds: [
          { id: '20gb', label: '20 GB', price: 32, originalPrice: 50 },
          { id: '60gb', label: '60 GB', price: 32, originalPrice: 50 },
          { id: 'ilimitada', label: 'Ilimitada', price: 32, originalPrice: 50 }
        ],
        features: [
          'Fibra óptica simétrica 600Mb',
          'Router WiFi 6',
          'Línea móvil con velocidad 5G',
          'Llamadas ilimitadas',
          'Instalación gratis',
          '1.000 minutos internacionales incluidos'
        ],
        extras: [
          { id: 'linea-20gb', label: 'Añade una segunda línea por 8€', price: 8, description: 'Añade una línea adicional' },
          { id: 'linea-60gb', label: 'Añade una segunda línea por 8€', price: 8, description: 'Añade una línea adicional' },
          { id: 'linea-ilimitada', label: 'Añade una segunda línea por 8€', price: 8, description: 'Añade una línea adicional' },
          { id: 'internacional-plus', label: 'Añade 500 min. internacionales por 3€', price: 3, description: 'Minutos adicionales' }
        ],
        rateTier: 1,
        ctaText: '¡Lo quiero!',
        onCtaClick: undefined
      },
      {
        id: 'pro-internacional',
        variant: 'dark',
        planName: 'Todo Pro Internacional',
        isPopular: false,
        hasSpeedSelector: true,
        speeds: [
          { id: '20gb', label: '20 GB', price: 38, originalPrice: 58 },
          { id: '60gb', label: '60 GB', price: 38, originalPrice: 58 },
          { id: 'ilimitada', label: 'Ilimitada', price: 38, originalPrice: 58 }
        ],
        features: [
          'Fibra óptica simétrica 1Gb',
          'Router WiFi 6',
          'Línea móvil GB ilimitados con velocidad 5G',
          'Llamadas ilimitadas',
          '1.000 minutos internacionales incluidos'
        ],
        extras: [
          { id: 'linea-20gb', label: 'Añade una segunda línea por 8€', price: 8, description: 'Añade una línea adicional' },
          { id: 'linea-60gb', label: 'Añade una segunda línea por 8€', price: 8, description: 'Añade una línea adicional' },
          { id: 'landline', label: 'Añade una línea fija por solo 0€', price: 0, description: 'Tarifa Fijo sin minutos' },
          { id: 'tv', label: 'Añade Prisma TV por 5€ Ahora 0€', price: 0, description: 'Ahora gratis' },
          { id: 'internacional-plus', label: 'Añade 500 min. internacionales por 3€', price: 3, description: 'Minutos adicionales' },
          { id: 'roaming', label: 'Añade Roaming Europa por 5€', price: 5, description: 'Datos en Europa' }
        ],
        rateTier: 2,
        ctaText: '¡Lo quiero!',
        onCtaClick: undefined
      },
      {
        id: 'master-internacional',
        variant: 'golden',
        planName: 'Todo Master Internacional',
        isPopular: false,
        hasSpeedSelector: true,
        speeds: [
          { id: '20gb', label: '20 GB', price: 65, originalPrice: 75 },
          { id: '60gb', label: '60 GB', price: 65, originalPrice: 75 },
          { id: 'ilimitada', label: 'Ilimitada', price: 65, originalPrice: 75 }
        ],
        features: [
          'Fibra óptica 10Gb',
          'Router WiFi 6',
          'Línea móvil con velocidad 5G',
          'Llamadas ilimitadas',
          'Instalación gratis',
          '1.000 minutos internacionales incluidos'
        ],
        extras: [
          { id: 'linea-20gb', label: 'Añade una segunda línea por 8€', price: 8, description: 'Añade una línea adicional' },
          { id: 'linea-60gb', label: 'Añade una segunda línea por 8€', price: 8, description: 'Añade una línea adicional' },
          { id: 'linea-ilimitada', label: 'Añade una segunda línea por 8€', price: 8, description: 'Añade una línea adicional' },
          { id: 'internacional-plus', label: 'Añade 500 min. internacionales por 3€', price: 3, description: 'Minutos adicionales' },
          { id: 'roaming', label: 'Añade Roaming Mundial por 8€', price: 8, description: 'Datos en todo el mundo' }
        ],
        rateTier: 3,
        ctaText: '¡Lo quiero!',
        onCtaClick: undefined
      }
    ]
  }
}
