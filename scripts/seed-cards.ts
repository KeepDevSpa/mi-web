// scripts/seed-cards.ts
import { prisma } from '@/lib/db'

async function main() {
  const cards = [
    {
      id: 'home-fibra-movil',
      name: 'Fibra y Móvil',
      page: 'home',
		currentPrice: 34.95,
		originalPrice: 69.95,
		variant: 'lightgreen',
		hasSpeedSelector: false,
      speeds: [
        {
          id: '1000',
          label: '1000 MB',
          price: 34.95,
          originalPrice: 69.95,
        },
      ],
      features: [
        'Fibra óptica simétrica 1000Mb',
        'Línea móvil GB Ilimitados',
        'Llamadas ilimitadas',
        'Router WiFi 6',
      ],
      extras: [],
      isPopular: true,
      ctaText: '¡Lo quiero!',
      rateTier: 2,
      isActive: true,
      isHeroOffer: true,
    },
    {
      id: 'home-fibra',
      name: 'Fibra',
		page: 'home',
		currentPrice: 39.95,
		originalPrice: 49.95,
		variant: 'dark',
		hasSpeedSelector: false,
      speeds: [
        {
          id: '1000',
          label: '1000 MB',
          price: 39.95,
          originalPrice: 49.95,
        },
      ],
      features: [
        'Fibra óptica simétrica 1000Mb',
        'Router WiFi 6',
        'Instalación gratis',
        'Soporte 24/7',
      ],
      extras: [
        {
          id: 'tv',
          label: 'Añade Prisma TV por 3€',
          price: 3,
          description: 'Más de 100 canales',
        },
        {
          id: 'seguridad',
          label: 19.95,
          description: 'Precio durante los 4 primeros meses',
        },
      ],
      isPopular: false,
      ctaText: '¡Lo quiero!',
      rateTier: 1,
      isActive: true,
      isHeroOffer: false,
    },
    {
      id: 'home-movil',
      name: 'Móvil',
      page: 'home',
      currentPrice: 19.95,
      originalPrice: 22.95,
      variant: 'blue',
      hasSpeedSelector: false,
      speeds: [
        {
          id: '300gb',
          label: 'GB Ilimitados',
          price: 19.95,
          originalPrice: 22.95,
        },
      ],
      features: ['GB Ilimitados con velocidad 5G', 'Llamadas ilimitadas'],
      extras: [
        {
          id: 'tv',
          label: 'Añade Prisma TV por 3€',
          price: 3,
          description: 'Más de 100 canales',
        },
        {
          id: 'seguridad',
          label: 'Añade Seguridad Hogar por 19.95€',
          price: 19.95,
          description: 'Precio durante los 4 primeros meses',
        },
      ],
      isPopular: false,
      ctaText: '¡Lo quiero!',
      rateTier: 1,
      isActive: true,
      isHeroOffer: false,
    },
  ]

  for (const card of cards) {
    await prisma.pricingCard.upsert({
      where: { id: card.id },
      update: card,
      create: card,
    })
  }

  console.log('✅ Tarifas insertadas correctamente')
}

main()
  .catch((e) => {
    console.error('❌ Error al insertar tarifas:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })