// lib/fibra-configs.ts
import { AdminPricingCard } from "@/lib/types";

export const fibraCards: AdminPricingCard[] = [
  // Ejemplo 1: Tarifa con selector de velocidad y 1 extra mostrado
  {
    id: 'fibra-basica',
    name: 'Fibra Básica',
    variant: 'medium',
    isPopular: false,
    price: 20,
    originalPrice: 30,
    features: ['Fibra óptica simétrica 1Gb', 'Router WiFi 6', 'Instalación gratis'],
    hasSpeedSelector: true,
    speeds: [
      { id: '1gb', label: '1 Gb', price: 20, originalPrice: 30 },
    ],
    extras: [
      { id: 'tv', label: 'Añade Prisma TV', price: 3, description: 'Más de 100 canales' },
      // Puedes tener más extras definidos aquí, pero solo se mostrará 1
    ],
    extraOptionsCount: 1, // Solo mostrará el primer extra
    ctaText: '¡Lo quiero!',
    rateTier: 1,
  },
  // Ejemplo 2: Tarifa con 3 extras mostrados
  {
    id: 'prisma-esencia-300',
    name: 'Prisma Esencia 300',
    variant: 'dark',
    isPopular: true,
    price: 35,
    originalPrice: 39,
    features: ['Fibra óptica simétrica 300Mb', 'Router WiFi 6', 'Línea móvil con velocidad 5G', 'Llamadas ilimitadas', 'Instalación gratis'],
    hasSpeedSelector: true,
    speeds: [
      { id: '300mb', label: '300 Mb', price: 35, originalPrice: 39 },
    ],
    extras: [
      { id: 'linea-adicional', label: 'Añade líneas adicionales', price: 7, description: 'Añade una segunda línea por 7€' },
      { id: 'segunda-linea', label: 'Segunda línea por 7€', price: 7, description: 'Añade una segunda línea por 7€' },
      { id: 'basic-tv', label: 'Basic TV', price: 0, description: 'TV básica gratuita' },
    ],
    extraOptionsCount: 3, // Mostrará los 3 extras
    ctaText: '¡Lo quiero!',
    rateTier: 1,
  },
  // Ejemplo 3: Tarifa sin extras ni selector
  {
    id: 'fibra-simple',
    name: 'Fibra Simple',
    variant: 'light',
    isPopular: false,
    price: 25,
    features: ['Fibra óptica 500Mb', 'Router básico', 'Instalación estándar'],
    hasSpeedSelector: false,
    speeds: [
      { id: '500mb', label: '500 Mb', price: 25 },
    ],
    extras: [],
    extraOptionsCount: 0, // No mostrará extras
    ctaText: 'Contratar',
    rateTier: 1,
  },
];
