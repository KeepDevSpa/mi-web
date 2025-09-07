import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Datos de las tarjetas de la versión anterior
const oldPricingCards = [
  // Fibra Page Cards
  {
    id: 'fibra-evolution',
    name: 'Fibra Evolution',
    currentPrice: 20,
    originalPrice: 35,
    page: 'fibra',
    variant: 'lightgreen',
    hasSpeedSelector: false,
    speeds: [{ id: '600mb', label: '600 Mb', price: 20, originalPrice: 35 }],
    features: [
      'Fibra óptica simétrica 600Mb',
      'Router WiFi 6',
      'Instalación gratis',
      'Sin permanencia'
    ],
    extras: [
      { id: 'tv', label: 'Añade Prisma TV por 8€', price: 8, description: 'Más de 100 canales' },
      { id: 'seguridad', label: 'Añade Seguridad Hogar por 12€', price: 12, description: 'Sistema de alarmas' }
    ],
    isPopular: true,
    ctaText: '¡Lo quiero!',
    rateTier: 1,
    isActive: true
  },
  {
    id: 'fibra-premium',
    name: 'Fibra Premium',
    currentPrice: 30,
    originalPrice: 45,
    page: 'fibra',
    variant: 'golden',
    hasSpeedSelector: false,
    speeds: [{ id: '1gb', label: '1 Gb', price: 30, originalPrice: 45 }],
    features: [
      'Fibra óptica simétrica 1Gb',
      'Router WiFi 6 avanzado',
      'Instalación gratis',
      'Sin permanencia',
      'Soporte prioritario'
    ],
    extras: [
      { id: 'tv', label: 'Añade Prisma TV por 8€', price: 8, description: 'Más de 100 canales' },
      { id: 'seguridad', label: 'Añade Seguridad Hogar por 12€', price: 12, description: 'Sistema de alarmas' },
      { id: 'cloud', label: 'Añade Cloud Storage por 8€', price: 8, description: '500 GB de almacenamiento' }
    ],
    isPopular: false,
    ctaText: '¡Lo quiero!',
    rateTier: 2,
    isActive: true
  },
  {
    id: 'fibra-gaming',
    name: 'Fibra Gaming',
    currentPrice: 40,
    originalPrice: 55,
    page: 'fibra',
    variant: 'blue',
    hasSpeedSelector: false,
    speeds: [{ id: '2gb', label: '2 Gb', price: 40, originalPrice: 55 }],
    features: [
      'Fibra óptica simétrica 2Gb',
      'Router Gaming WiFi 6E',
      'Instalación gratis',
      'Sin permanencia',
      'Soporte 24/7',
      'Prioridad en red'
    ],
    extras: [
      { id: 'tv', label: 'Añade Prisma TV por 8€', price: 8, description: 'Más de 100 canales' },
      { id: 'seguridad', label: 'Añade Seguridad Hogar por 12€', price: 12, description: 'Sistema de alarmas' },
      { id: 'cloud', label: 'Añade Cloud Storage por 8€', price: 8, description: '500 GB de almacenamiento' }
    ],
    isPopular: false,
    ctaText: '¡Lo quiero!',
    rateTier: 3,
    isActive: true
  },

  // Móvil Page Cards
  {
    id: 'movil-5',
    name: 'Móvil 5',
    currentPrice: 15,
    originalPrice: 25,
    page: 'movil',
    variant: 'dark',
    hasSpeedSelector: false,
    speeds: [{ id: '5gb', label: '5 GB', price: 15, originalPrice: 25 }],
    features: [
      'Datos 5G/4G+',
      'Llamadas ilimitadas',
      'SMS ilimitados',
      'Cobertura nacional',
      'App Prisma'
    ],
    extras: [
      { id: 'tv', label: 'Añade Prisma TV por 8€', price: 8, description: 'Más de 100 canales' },
      { id: 'seguridad', label: 'Añade Seguridad Hogar por 12€', price: 12, description: 'Sistema de alarmas' }
    ],
    isPopular: false,
    ctaText: '¡Lo quiero!',
    rateTier: 1,
    isActive: true
  },
  {
    id: 'movil-20',
    name: 'Móvil 20',
    currentPrice: 20,
    originalPrice: 30,
    page: 'movil',
    variant: 'medium',
    hasSpeedSelector: false,
    speeds: [{ id: '20gb', label: '20 GB', price: 20, originalPrice: 30 }],
    features: [
      'Datos 5G/4G+',
      'Llamadas ilimitadas',
      'SMS ilimitados',
      'Cobertura nacional',
      'App Prisma',
      'Sin permanencia'
    ],
    extras: [
      { id: 'tv', label: 'Añade Prisma TV por 8€', price: 8, description: 'Más de 100 canales' },
      { id: 'seguridad', label: 'Añade Seguridad Hogar por 12€', price: 12, description: 'Sistema de alarmas' }
    ],
    isPopular: true,
    ctaText: '¡Lo quiero!',
    rateTier: 2,
    isActive: true
  },
  {
    id: 'movil-60',
    name: 'Móvil 60',
    currentPrice: 25,
    originalPrice: 35,
    page: 'movil',
    variant: 'lightblue',
    hasSpeedSelector: false,
    speeds: [{ id: '60gb', label: '60 GB', price: 25, originalPrice: 35 }],
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
      { id: 'tv', label: 'Añade Prisma TV por 8€', price: 8, description: 'Más de 100 canales' },
      { id: 'seguridad', label: 'Añade Seguridad Hogar por 12€', price: 12, description: 'Sistema de alarmas' }
    ],
    isPopular: false,
    ctaText: '¡Lo quiero!',
    rateTier: 3,
    isActive: true
  },
  {
    id: 'movil-ilimitada',
    name: 'Móvil Ilimitada',
    currentPrice: 30,
    originalPrice: 45,
    page: 'movil',
    variant: 'lightgreen',
    hasSpeedSelector: false,
    speeds: [{ id: 'ilimitada', label: 'GB Ilimitados', price: 30, originalPrice: 45 }],
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
      { id: 'tv', label: 'Añade Prisma TV por 8€', price: 8, description: 'Más de 100 canales' },
      { id: 'seguridad', label: 'Añade Seguridad Hogar por 12€', price: 12, description: 'Sistema de alarmas' }
    ],
    isPopular: false,
    ctaText: '¡Lo quiero!',
    rateTier: 4,
    isActive: true
  },

  // Fibra-Móvil Page Cards
  {
    id: 'todo-evolution-20',
    name: 'Todo Evolution 20',
    currentPrice: 18,
    originalPrice: 30,
    page: 'fibra-movil',
    variant: 'lightgreen',
    hasSpeedSelector: true,
    speeds: [
      { id: '600mb-20gb', label: '600 MB + 20GB', price: 18, originalPrice: 30 },
      { id: '800mb-20gb', label: '800 MB + 20GB', price: 22, originalPrice: 35 },
      { id: '1gb-20gb', label: '1 GB + 20GB', price: 26, originalPrice: 40 }
    ],
    features: [
      'Fibra óptica simétrica',
      'Móvil con datos',
      'Router WiFi 6',
      'Instalación gratis',
      'Sin permanencia'
    ],
    extras: [
      { id: 'linea-20gb', label: 'Línea adicional 20GB', price: 7, description: 'Segunda línea móvil' },
      { id: 'landline', label: 'Línea fija', price: 6, description: 'Llamadas nacionales incluidas' },
      { id: 'tv', label: 'Prisma TV', price: 0, description: 'Más de 100 canales gratis' }
    ],
    isPopular: true,
    ctaText: '¡Lo quiero!',
    rateTier: 1,
    isActive: true
  },
  {
    id: 'todo-evolution-60',
    name: 'Todo Evolution 60',
    currentPrice: 27,
    originalPrice: 45,
    page: 'fibra-movil',
    variant: 'golden',
    hasSpeedSelector: true,
    speeds: [
      { id: '800mb-60gb', label: '800 MB + 60GB', price: 27, originalPrice: 45 },
      { id: '1gb-60gb', label: '1 GB + 60GB', price: 31, originalPrice: 50 },
      { id: '2gb-60gb', label: '2 GB + 60GB', price: 35, originalPrice: 55 }
    ],
    features: [
      'Fibra óptica simétrica',
      'Móvil con 60GB',
      'Router WiFi 6 avanzado',
      'Instalación gratis',
      'Sin permanencia',
      'Soporte prioritario'
    ],
    extras: [
      { id: 'linea-60gb', label: 'Línea adicional 60GB', price: 11, description: 'Segunda línea móvil' },
      { id: 'landline', label: 'Línea fija', price: 6, description: 'Llamadas nacionales incluidas' },
      { id: 'tv', label: 'Prisma TV', price: 0, description: 'Más de 100 canales gratis' }
    ],
    isPopular: false,
    ctaText: '¡Lo quiero!',
    rateTier: 2,
    isActive: true
  },
  {
    id: 'todo-evolution-ilimitada',
    name: 'Todo Evolution Ilimitada',
    currentPrice: 35,
    originalPrice: 55,
    page: 'fibra-movil',
    variant: 'blue',
    hasSpeedSelector: true,
    speeds: [
      { id: '1gb-ilimitada', label: '1 GB + Ilimitada', price: 35, originalPrice: 55 },
      { id: '2gb-ilimitada', label: '2 GB + Ilimitada', price: 39, originalPrice: 60 },
      { id: '5gb-ilimitada', label: '5 GB + Ilimitada', price: 43, originalPrice: 65 }
    ],
    features: [
      'Fibra óptica simétrica',
      'Móvil con datos ilimitados',
      'Router WiFi 6E Gaming',
      'Instalación gratis',
      'Sin permanencia',
      'Soporte 24/7',
      'Prioridad en red'
    ],
    extras: [
      { id: 'linea-ilimitada', label: 'Línea adicional Ilimitada', price: 20, description: 'Segunda línea móvil' },
      { id: 'leisure', label: 'Prisma Leisure', price: 5, description: 'Ocio y entretenimiento' }
    ],
    isPopular: false,
    ctaText: '¡Lo quiero!',
    rateTier: 3,
    isActive: true
  }
];

async function main() {
  console.log('🚀 Iniciando migración de PricingCards...');

  try {
    // Primero, limpiar las tarjetas existentes si las hay
    await prisma.speed.deleteMany({});
    await prisma.extra.deleteMany({});
    await prisma.pricingCard.deleteMany({});

    console.log('✅ Base de datos limpia');

    // Migrar cada tarjeta
    for (const oldCard of oldPricingCards) {
      console.log(`📦 Migrando: ${oldCard.name}`);
      
      // Crear la tarjeta principal
      const pricingCard = await prisma.pricingCard.create({
        data: {
          id: oldCard.id,
          name: oldCard.name,
          page: oldCard.page,
          currentPrice: oldCard.currentPrice,
          originalPrice: oldCard.originalPrice,
          variant: oldCard.variant,
          hasSpeedSelector: oldCard.hasSpeedSelector,
          features: oldCard.features,
          isPopular: oldCard.isPopular || false,
          ctaText: oldCard.ctaText,
          rateTier: oldCard.rateTier || 1,
          isActive: oldCard.isActive !== false,
          isHeroOffer: false
        }
      });

      // Crear las velocidades
      for (const speed of oldCard.speeds) {
        await prisma.speed.create({
          data: {
            id: `${pricingCard.id}-${speed.id}`, // Hacer ID único
            label: speed.label,
            price: speed.price,
            originalPrice: speed.originalPrice,
            pricingCardId: pricingCard.id
          }
        });
      }

      // Crear los extras
      for (const extra of oldCard.extras) {
        await prisma.extra.create({
          data: {
            id: `${pricingCard.id}-${extra.id}`, // Hacer ID único
            label: extra.label,
            price: extra.price,
            description: extra.description,
            pricingCardId: pricingCard.id
          }
        });
      }

      console.log(`✅ ${oldCard.name} migrada correctamente`);
    }

    console.log('🎉 Migración completada exitosamente!');
    console.log(`📊 Total de tarjetas migradas: ${oldPricingCards.length}`);

    // Mostrar estadísticas
    const fibra = oldPricingCards.filter(c => c.page === 'fibra').length;
    const movil = oldPricingCards.filter(c => c.page === 'movil').length;
    const fibraMovil = oldPricingCards.filter(c => c.page === 'fibra-movil').length;
    
    console.log(`📈 Estadísticas:`);
    console.log(`   - Fibra: ${fibra} tarjetas`);
    console.log(`   - Móvil: ${movil} tarjetas`);
    console.log(`   - Fibra + Móvil: ${fibraMovil} tarjetas`);

  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error('💥 Error fatal:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
