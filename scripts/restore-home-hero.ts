import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function restoreHomeHero() {
  try {
    // Primero, verificamos si ya existe una configuración activa para el home
    const existingConfig = await prisma.heroConfig.findFirst({
      where: {
        page: 'home',
        isActive: true
      }
    });

    if (!existingConfig) {
      // Si no existe, creamos una nueva configuración por defecto
      await prisma.heroConfig.create({
        data: {
          page: 'home',
          isActive: true,
          title: 'Tu Hogar Conectado al Futuro',
          subtitle: 'Internet, Móvil y TV en una sola factura',
          description: 'Disfruta de la mejor conexión con fibra de alta velocidad, líneas móviles ilimitadas y televisión en calidad 4K.',
          variant: 'default',
          backgroundType: 'gradient',
          highlights: JSON.stringify([
            'Fibra hasta 1Gb simétrico',
            'Móvil con datos ilimitados',
            'TV con +200 canales en 4K'
          ]),
          primaryCta: JSON.stringify({
            text: 'Ver ofertas',
            href: '#ofertas',
            variant: 'default'
          }),
          secondaryCta: JSON.stringify({
            text: 'Contactar',
            href: '/contacto',
            variant: 'outline'
          }),
          heroImage: '/hero-home.webp'
        }
      });
      console.log('✅ Configuración del hero del home restaurada con éxito');
    } else {
      console.log('ℹ️ Ya existe una configuración activa para el hero del home');
    }

    // Asegurarnos de que otras configuraciones de home están desactivadas
    await prisma.heroConfig.updateMany({
      where: {
        page: 'home',
        NOT: { id: existingConfig?.id },
        isActive: true
      },
      data: { isActive: false }
    });

  } catch (error) {
    console.error('❌ Error restaurando el hero del home:', error);
  } finally {
    await prisma.$disconnect();
  }
}

restoreHomeHero();
