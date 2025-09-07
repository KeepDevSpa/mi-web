// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ====================
  // 📺 PRISMA TV
  // ====================

  // TV Básico
  const tvBasic = await prisma.pricingCard.upsert({
    where: { id: 'tv-basic' },
    update: {},
    create: {
      id: 'tv-basic',
      name: 'TV Básico (TDT)',
      page: 'prisma-tv',
      currentPrice: 3.00,
      variant: 'purple',
      hasSpeedSelector: false,
      features: ['Canales básicos de TDT', 'HD Quality', 'Multi dispositivo'],
      isPopular: false,
      ctaText: 'Contratar TV Básico',
      rateTier: 1,
      isActive: true,
    },
  });

  await prisma.extra.createMany({
    data: [
      {
        pricingCardId: tvBasic.id,
        label: 'Añade TV Hot por 6€',
        price: 6,
        description: 'Cine y series premium',
      },
      {
        pricingCardId: tvBasic.id,
        label: 'Añade TV Internacional por 3€',
        price: 3,
        description: 'Canales internacionales',
      },
      {
        pricingCardId: tvBasic.id,
        label: 'Añade TV Primera RFEF por 3€',
        price: 3,
        description: 'Fútbol español',
      },
    ],
  });

  // TV Deportes
  const tvDeportes = await prisma.pricingCard.upsert({
    where: { id: 'tv-deportes' },
    update: {},
    create: {
      id: 'tv-deportes',
      name: 'TV Deportes',
      page: 'prisma-tv',
      currentPrice: 9.00,
      variant: 'purple',
      hasSpeedSelector: false,
      features: ['Canales deportivos premium', 'HD Quality', 'Fútbol, F1, NBA', 'Multi dispositivo'],
      isPopular: true,
      ctaText: 'Contratar TV Deportes',
      rateTier: 2,
      isActive: true,
    },
  });

  await prisma.extra.createMany({
    data: [
      {
        pricingCardId: tvDeportes.id,
        label: 'Añade TV Hot por 6€',
        price: 6,
        description: 'Cine y series premium',
      },
      {
        pricingCardId: tvDeportes.id,
        label: 'Añade TV Internacional por 3€',
        price: 3,
        description: 'Canales internacionales',
      },
      {
        pricingCardId: tvDeportes.id,
        label: 'Añade TV Primera RFEF por 3€',
        price: 3,
        description: 'Fútbol español',
      },
    ],
  });

  // TV Total
  const tvTotal = await prisma.pricingCard.upsert({
    where: { id: 'tv-total' },
    update: {},
    create: {
      id: 'tv-total',
      name: 'TV Total',
      page: 'prisma-tv',
      currentPrice: 18.00,
      variant: 'purple',
      hasSpeedSelector: false,
      features: ['Todos los canales', 'HD Quality', 'Cine, deportes, internacional', 'Multi dispositivo'],
      isPopular: true,
      ctaText: 'Contratar TV Total',
      rateTier: 3,
      isActive: true,
    },
  });

  await prisma.extra.createMany({
    data: [
      {
        pricingCardId: tvTotal.id,
        label: 'Añade TV Hot por 6€',
        price: 6,
        description: 'Cine y series premium',
      },
      {
        pricingCardId: tvTotal.id,
        label: 'Añade TV Internacional por 3€',
        price: 3,
        description: 'Canales internacionales',
      },
      {
        pricingCardId: tvTotal.id,
        label: 'Añade TV Primera RFEF por 3€',
        price: 3,
        description: 'Fútbol español',
      },
    ],
  });

  // ====================
  // 📱 MÓVIL
  // ====================

  // Móvil Elección
  const movilEleccion = await prisma.pricingCard.upsert({
    where: { id: 'movil-eleccion' },
    update: {},
    create: {
      id: 'movil-eleccion',
      name: 'Móvil Elección',
      page: 'movil',
      selectorKey: 'eleccion',
      currentPrice: 7.95,
      originalPrice: 19.95,
      variant: 'blue',
      hasSpeedSelector: true,
      speeds: {
        create: [
          { id: '35gb', label: '35 GB', price: 7.95, originalPrice: 19.95 },
          { id: '75gb', label: '75 GB', price: 9.95, originalPrice: 24.95 },
          { id: '150gb', label: '150 GB', price: 11.95, originalPrice: 29.95 },
          { id: 'ilimitados', label: 'GB Ilimitados', price: 19.95, originalPrice: 39.95 },
        ],
      },
      features: ['Elige tu operador', '5G/4G+', 'Llamadas ilimitadas', 'SMS ilimitados', 'Cobertura nacional'],
      isPopular: true,
      ctaText: 'Elegir Operador',
      rateTier: 1,
      isActive: true,
      hasOperatorChoice: true,
    },
  });

  await prisma.extra.createMany({
    data: [
      {
        pricingCardId: movilEleccion.id,
        label: 'Añade Prisma TV por 8€',
        price: 8,
        description: 'Más de 100 canales',
      },
      {
        pricingCardId: movilEleccion.id,
        label: 'Añade Seguridad Hogar por 12€',
        price: 12,
        description: 'Sistema de alarmas',
      },
    ],
  });

  // Móvil VIP
  const movilVip = await prisma.pricingCard.upsert({
    where: { id: 'movil-vip' },
    update: {},
    create: {
      id: 'movil-vip',
      name: 'Móvil VIP',
      page: 'movil',
      selectorKey: 'vip',
      currentPrice: 11.95,
      originalPrice: 24.95,
      variant: 'golden',
      hasSpeedSelector: true,
      speeds: {
        create: [
        { id: '30gb', label: '30 GB', price: 11.95, originalPrice: 24.95 },
        { id: '80gb', label: '80 GB', price: 14.95, originalPrice: 29.95 },
        { id: '120gb', label: '120 GB', price: 16.95, originalPrice: 34.95 },
        { id: 'ilimitados', label: 'GB Ilimitados', price: 24.95, originalPrice: 49.95 },
      ],
      },
      features: ['Doble cobertura (Movistar + Orange)', '5G/4G+', 'Llamadas ilimitadas', 'SMS ilimitados', 'Soporte VIP 24/7'],
      isPopular: true,
      ctaText: 'Contratar VIP',
      rateTier: 2,
      isActive: true,
      isVIP: true,
    },
  });

  await prisma.extra.createMany({
    data: [
      {
        pricingCardId: movilVip.id,
        label: 'Añade Prisma TV por 8€',
        price: 8,
        description: 'Más de 100 canales',
      },
      {
        pricingCardId: movilVip.id,
        label: 'Añade Seguridad Hogar por 12€',
        price: 12,
        description: 'Sistema de alarmas',
      },
    ],
  });

  // ====================
  // 🌐 FIBRA
  // ====================

  // Fibra Plus
  const fibraPlus = await prisma.pricingCard.upsert({
    where: { id: 'fibra-Plus' },
    update: {},
    create: {
      id: 'fibra-Plus',
      name: 'Fibra Plus',
      page: 'fibra',
      selectorKey: 'plus',
      currentPrice: 25.95,
      originalPrice: 39.95,
      variant: 'lightgreen',
      hasSpeedSelector: true,
      speeds: {
        create: [
        { id: '300', label: '300 Mb', price: 25.95, originalPrice: 39.95 },
        { id: '600', label: '600 Mb', price: 28.95, originalPrice: 44.95 },
        { id: '1000', label: '1000 Mb', price: 31.95, originalPrice: 49.95 },
      ],
      },
      features: ['Fibra óptica simétrica', 'Router WiFi 6', 'Instalación gratis', 'Soporte 24/7'],
      isPopular: true,
      ctaText: 'Contratar Fibra Plus',
      rateTier: 1,
      isActive: true,
    },
  });

  await prisma.extra.createMany({
    data: [
      {
        pricingCardId: fibraPlus.id,
        label: 'Añade Prisma TV por 8€',
        price: 8,
        description: 'Más de 100 canales',
      },
      {
        pricingCardId: fibraPlus.id,
        label: 'Añade Seguridad Hogar por 12€',
        price: 12,
        description: 'Sistema de alarmas',
      },
    ],
  });

  // Fibra VIP
  const fibraVip = await prisma.pricingCard.upsert({
    where: { id: 'fibra-VIP' },
    update: {},
    create: {
      id: 'fibra-VIP',
      name: 'Fibra VIP',
      page: 'fibra',
      selectorKey: 'vip',
      currentPrice: 34.95,
      originalPrice: 59.95,
      variant: 'golden',
      hasSpeedSelector: true,
      speeds: [
        { id: '300', label: '300 Mb', price: 34.95, originalPrice: 59.95 },
        { id: '600', label: '600 Mb', price: 42.95, originalPrice: 69.95 },
        { id: '1000', label: '1000 Mb', price: 50.95, originalPrice: 79.95 },
      ],
      features: ['Fibra óptica simétrica premium', 'Router WiFi 6 Pro', 'Instalación prioritaria', 'Soporte VIP 24/7', 'IP estática'],
      isPopular: true,
      ctaText: 'Contratar Fibra VIP',
      rateTier: 2,
      isActive: true,
      isVIP: true,
    },
  });

  await prisma.extra.createMany({
    data: [
      {
        pricingCardId: fibraVip.id,
        label: 'Añade Prisma TV por 8€',
        price: 8,
        description: 'Más de 100 canales',
      },
      {
        pricingCardId: fibraVip.id,
        label: 'Añade Seguridad Hogar por 12€',
        price: 12,
        description: 'Sistema de alarmas',
      },
    ],
  });

  // ====================
  // 🔗 FIBRA-MÓVIL
  // ====================

  // Esencia Elección
  const prismaEleccion = await prisma.pricingCard.upsert({
    where: { id: 'prisma-eleccion' },
    update: {},
    create: {
      id: 'prisma-eleccion',
      name: 'Esencia Elección',
      page: 'fibra-movil',
      selectorKey: 'eleccion',
      currentPrice: 35.90,
      originalPrice: 59.90,
      variant: 'lightgreen',
      hasSpeedSelector: true,
      speeds: {
        create: [
        { id: '300-75', label: 'Fibra 300 + Móvil 75GB', price: 35.90, originalPrice: 59.90 },
        { id: '300-150', label: 'Fibra 300 + Móvil 150GB', price: 37.90, originalPrice: 62.90 },
        { id: '300-ilimitados', label: 'Fibra 300 + Móvil Ilimitados', price: 45.90, originalPrice: 79.90 },
        { id: '600-75', label: 'Fibra 600 + Móvil 75GB', price: 38.90, originalPrice: 64.90 },
        { id: '600-150', label: 'Fibra 600 + Móvil 150GB', price: 40.90, originalPrice: 67.90 },
        { id: '600-ilimitados', label: 'Fibra 600 + Móvil Ilimitados', price: 48.90, originalPrice: 84.90 },
        { id: '1000-75', label: 'Fibra 1000 + Móvil 75GB', price: 41.90, originalPrice: 69.90 },
        { id: '1000-150', label: 'Fibra 1000 + Móvil 150GB', price: 43.90, originalPrice: 72.90 },
        { id: '1000-ilimitados', label: 'Fibra 1000 + Móvil Ilimitados', price: 51.90, originalPrice: 89.90 },
      ],
      },
      features: ['Fibra óptica simétrica', 'Línea móvil con 5G', 'Router WiFi 6', 'Instalación gratis'],
      isPopular: true,
      ctaText: 'Elegir Operador',
      rateTier: 1,
      isActive: true,
      hasOperatorChoice: true,
    },
  });

  await prisma.extra.createMany({
    data: [
      {
        pricingCardId: prismaEleccion.id,
        label: 'Añade Prisma TV por 8€',
        price: 8,
        description: 'Más de 100 canales',
      },
      {
        pricingCardId: prismaEleccion.id,
        label: 'Añade Seguridad Hogar por 12€',
        price: 12,
        description: 'Sistema de alarmas',
      },
    ],
  });

  // VIP Elección
  const vipEleccion = await prisma.pricingCard.upsert({
    where: { id: 'vip-eleccion' },
    update: {},
    create: {
      id: 'vip-eleccion',
      name: 'VIP Elección',
      page: 'fibra-movil',
      selectorKey: 'vip',
      currentPrice: 44.90,
      originalPrice: 79.90,
      variant: 'golden',
      hasSpeedSelector: true,
      speeds: {
        create: [
        { id: '300-75', label: 'Fibra 300 + Móvil 75GB', price: 44.90, originalPrice: 79.90 },
        { id: '300-150', label: 'Fibra 300 + Móvil 150GB', price: 46.90, originalPrice: 82.90 },
        { id: '300-ilimitados', label: 'Fibra 300 + Móvil Ilimitados', price: 54.90, originalPrice: 99.90 },
        { id: '600-75', label: 'Fibra 600 + Móvil 75GB', price: 52.90, originalPrice: 89.90 },
        { id: '600-150', label: 'Fibra 600 + Móvil 150GB', price: 54.90, originalPrice: 92.90 },
        { id: '600-ilimitados', label: 'Fibra 600 + Móvil Ilimitados', price: 62.90, originalPrice: 109.90 },
        { id: '1000-75', label: 'Fibra 1000 + Móvil 75GB', price: 60.90, originalPrice: 99.90 },
        { id: '1000-150', label: 'Fibra 1000 + Móvil 150GB', price: 62.90, originalPrice: 102.90 },
        { id: '1000-ilimitados', label: 'Fibra 1000 + Móvil Ilimitados', price: 70.90, originalPrice: 119.90 },
      ],
      },
      features: ['Fibra óptica simétrica premium', 'Línea móvil con doble cobertura', 'Router WiFi 6 Pro', 'Instalación prioritaria', 'Soporte VIP 24/7'],
      isPopular: true,
      ctaText: 'Contratar VIP',
      rateTier: 2,
      isActive: true,
      isVIP: true,
    },
  });

  await prisma.extra.createMany({
    data: [
      {
        pricingCardId: vipEleccion.id,
        label: 'Añade Prisma TV por 8€',
        price: 8,
        description: 'Más de 100 canales',
      },
      {
        pricingCardId: vipEleccion.id,
        label: 'Añade Seguridad Hogar por 12€',
        price: 12,
        description: 'Sistema de alarmas',
      },
    ],
  });

  // Esencia VIP
  const prismaFusion = await prisma.pricingCard.upsert({
    where: { id: 'prisma-fusion' },
    update: {},
    create: {
      id: 'prisma-fusion',
      name: 'Esencia VIP',
      page: 'fibra-movil',
      selectorKey: 'fusion',
      currentPrice: 40.90,
      originalPrice: 69.90,
      variant: 'dark',
      hasSpeedSelector: true,
      speeds: {
        create: [
        { id: '300-80', label: 'Fibra 300 + Móvil 80GB', price: 40.90, originalPrice: 69.90 },
        { id: '300-120', label: 'Fibra 300 + Móvil 120GB', price: 42.90, originalPrice: 72.90 },
        { id: '300-ilimitados', label: 'Fibra 300 + Móvil Ilimitados', price: 50.90, originalPrice: 89.90 },
        { id: '600-80', label: 'Fibra 600 + Móvil 80GB', price: 43.90, originalPrice: 74.90 },
        { id: '600-120', label: 'Fibra 600 + Móvil 120GB', price: 45.90, originalPrice: 77.90 },
        { id: '600-ilimitados', label: 'Fibra 600 + Móvil Ilimitados', price: 53.90, originalPrice: 94.90 },
        { id: '1000-80', label: 'Fibra 1000 + Móvil 80GB', price: 46.90, originalPrice: 79.90 },
        { id: '1000-120', label: 'Fibra 1000 + Móvil 120GB', price: 48.90, originalPrice: 82.90 },
        { id: '1000-ilimitados', label: 'Fibra 1000 + Móvil Ilimitados', price: 56.90, originalPrice: 99.90 },
      ],
      },
      features: ['Fibra óptica simétrica', 'Línea móvil con 5G', 'Router WiFi 6', 'Instalación gratis'],
      isPopular: true,
      ctaText: 'Contratar Esencia VIP',
      rateTier: 3,
      isActive: true,
      isVIP: true,
    },
  });

  await prisma.extra.createMany({
    data: [
      {
        pricingCardId: prismaFusion.id,
        label: 'Añade Prisma TV por 8€',
        price: 8,
        description: 'Más de 100 canales',
      },
      {
        pricingCardId: prismaFusion.id,
        label: 'Añade Seguridad Hogar por 12€',
        price: 12,
        description: 'Sistema de alarmas',
      },
    ],
  });

  // VIP Fusion
  const vipFusion = await prisma.pricingCard.upsert({
    where: { id: 'vip-fusion' },
    update: {},
    create: {
      id: 'vip-fusion',
      name: 'VIP Fusion',
      page: 'fibra-movil',
      selectorKey: 'fusion',
      currentPrice: 49.90,
      originalPrice: 89.90,
      variant: 'golden',
      hasSpeedSelector: true,
      speeds: {
        create: [
        { id: '300-80', label: 'Fibra 300 + Móvil 80GB', price: 49.90, originalPrice: 89.90 },
        { id: '300-120', label: 'Fibra 300 + Móvil 120GB', price: 51.90, originalPrice: 92.90 },
        { id: '300-ilimitados', label: 'Fibra 300 + Móvil Ilimitados', price: 59.90, originalPrice: 109.90 },
        { id: '600-80', label: 'Fibra 600 + Móvil 80GB', price: 57.90, originalPrice: 99.90 },
        { id: '600-120', label: 'Fibra 600 + Móvil 120GB', price: 59.90, originalPrice: 102.90 },
        { id: '600-ilimitados', label: 'Fibra 600 + Móvil Ilimitados', price: 67.90, originalPrice: 119.90 },
        { id: '1000-80', label: 'Fibra 1000 + Móvil 80GB', price: 65.90, originalPrice: 109.90 },
        { id: '1000-120', label: 'Fibra 1000 + Móvil 120GB', price: 67.90, originalPrice: 112.90 },
        { id: '1000-ilimitados', label: 'Fibra 1000 + Móvil Ilimitados', price: 75.90, originalPrice: 129.90 },
      ],
      },
      features: ['Fibra óptica simétrica premium', 'Línea móvil con doble cobertura', 'Router WiFi 6 Pro', 'Instalación prioritaria', 'Soporte VIP 24/7'],
      isPopular: true,
      ctaText: 'Contratar VIP Fusion',
      rateTier: 4,
      isActive: true,
      isVIP: true,
    },
  });

  await prisma.extra.createMany({
    data: [
      {
        pricingCardId: vipFusion.id,
        label: 'Añade Prisma TV por 8€',
        price: 8,
        description: 'Más de 100 canales',
      },
      {
        pricingCardId: vipFusion.id,
        label: 'Añade Seguridad Hogar por 12€',
        price: 12,
        description: 'Sistema de alarmas',
      },
    ],
  });

  // ====================
  // 🏠 HERO OFFER
  // ====================

  await prisma.pricingCard.upsert({
    where: { id: 'home' },
    update: {},
    create: {
      id: 'home',
      name: 'Fibra 1000 + Movil Ilimitadas',
      page: 'home',
      currentPrice: 34.95,
      originalPrice: 59.95,
      variant: 'blue',
      hasSpeedSelector: false,
      speeds: {
        create: [{ id: '1000-ilimitados', label: '1000 Mb + GB Ilimitados', price: 34.95, originalPrice: 59.95 }],
      },
      features: ['Fibra óptica simétrica 1000Mb', 'Línea móvil con velocidad 5G', 'Llamadas ilimitadas', 'Router WiFi 6', 'Instalación gratis'],
      isPopular: true,
      ctaText: '¡Lo quiero!',
      rateTier: 1,
      isActive: true,
      isHeroOffer: true,
    },
  });

  console.log('✅ Todas las tarifas y extras han sido creadas correctamente.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });