import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const heroConfigs = [
  {
    page: 'home',
    title: 'La conexión que realmente te cuida',
    subtitle: 'EXPERIENCIA PREMIUM PRISMA',
    description: 'En Prisma no vendemos tarifas. Creamos experiencias premium con tecnología de vanguardia y atención humana real.',
    primaryCta: JSON.stringify({
      text: 'Descubre la experiencia Prisma',
      href: '/fibra-movil',
      icon: 'star'
    }),
    secondaryCta: JSON.stringify({
      text: 'Hablar con un humano real',
      href: '/contacto',
      icon: 'phone'
    }),
    heroImage: '/Hero-Banner.webp',
    backgroundType: 'image',
    variant: 'home',
    highlights: JSON.stringify([
      { icon: '🛡️', text: 'Tecnología certificada', color: 'text-blue-400' },
      { icon: '👥', text: 'Atención humana real', color: 'text-green-400' },
      { icon: '⚡', text: 'Velocidad garantizada', color: 'text-yellow-400' }
    ]),
    isActive: true
  },
  {
    page: 'fibra',
    title: 'Internet de alta velocidad',
    subtitle: 'FIBRA ÓPTICA PREMIUM',
    description: 'Disfruta de la mejor conexión con nuestra fibra óptica de última generación.',
    primaryCta: JSON.stringify({
      text: 'Ver tarifas de fibra',
      href: '/fibra',
      icon: 'wifi'
    }),
    secondaryCta: JSON.stringify({
      text: 'Comprobar cobertura',
      href: '#coverage',
      icon: 'map-pin'
    }),
    heroImage: '/fibra-hero.webp',
    backgroundType: 'image',
    variant: 'fibra',
    highlights: JSON.stringify([
      { icon: '🚀', text: 'Hasta 1000Mb', color: 'text-green-400' },
      { icon: '📡', text: 'WiFi 6', color: 'text-blue-400' },
      { icon: '🔒', text: 'Seguridad avanzada', color: 'text-purple-400' }
    ]),
    isActive: true
  },
  {
    page: 'movil',
    title: 'Libertad sin límites',
    subtitle: 'MÓVIL CON 5G',
    description: 'La mejor cobertura móvil con tecnología 5G y planes adaptados a ti.',
    primaryCta: JSON.stringify({
      text: 'Ver tarifas móviles',
      href: '/movil',
      icon: 'phone'
    }),
    secondaryCta: JSON.stringify({
      text: 'Consultar cobertura',
      href: '#coverage',
      icon: 'map-pin'
    }),
    heroImage: '/movil-hero.webp',
    backgroundType: 'image',
    variant: 'movil',
    highlights: JSON.stringify([
      { icon: '📱', text: '5G incluido', color: 'text-pink-400' },
      { icon: '💬', text: 'Apps ilimitadas', color: 'text-purple-400' },
      { icon: '🌍', text: 'Roaming incluido', color: 'text-blue-400' }
    ]),
    isActive: true
  },
  {
    page: 'empresa',
    title: 'Soluciones empresariales',
    subtitle: 'PRISMA EMPRESAS',
    description: 'Tecnología avanzada y soporte dedicado para hacer crecer tu negocio.',
    primaryCta: JSON.stringify({
      text: 'Ver soluciones',
      href: '/empresa',
      icon: 'briefcase'
    }),
    secondaryCta: JSON.stringify({
      text: 'Contactar con ventas',
      href: '/empresa/contacto',
      icon: 'phone'
    }),
    heroImage: '/empresa-hero.webp',
    backgroundType: 'image',
    variant: 'empresas',
    highlights: JSON.stringify([
      { icon: '🏢', text: 'Soporte 24/7', color: 'text-orange-400' },
      { icon: '📊', text: 'IP fija gratis', color: 'text-blue-400' },
      { icon: '🔐', text: 'Seguridad empresarial', color: 'text-green-400' }
    ]),
    isActive: true
  }
];

async function main() {
  for (const config of heroConfigs) {
    await prisma.heroConfig.upsert({
      where: { page: config.page },
      update: config,
      create: config,
    });
  }

  console.log('✅ Configuración de heros inicializada');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
