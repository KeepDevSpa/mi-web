import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌟 Creando datos de ejemplo para las nuevas secciones...');

  // Crear ventajas de ejemplo
  await prisma.advantage.createMany({
    data: [
      {
        title: '5G Ultra Rápido',
        content: 'Velocidad de conexión sin precedentes',
        imageUrl: '/5g-network.png',
        order: 1,
        isActive: true
      },
      {
        title: 'Cobertura Nacional',
        content: 'La mejor cobertura en toda España',
        imageUrl: '/conexion-internet.jpg',
        order: 2,
        isActive: true
      },
      {
        title: 'Soporte 24/7',
        content: 'Asistencia técnica disponible siempre',
        imageUrl: '/happy-customer-service-rep.png',
        order: 3,
        isActive: true
      }
    ]
  });

  // Crear pasos del proceso
  await prisma.processStep.createMany({
    data: [
      {
        title: 'Consulta tu Cobertura',
        content: 'Verifica que tenemos cobertura en tu zona',
        imageUrl: '/coverage-check.png',
        order: 1,
        isActive: true
      },
      {
        title: 'Elige tu Plan',
        content: 'Selecciona el plan que mejor se adapte a ti',
        imageUrl: '/mobile-portability.png',
        order: 2,
        isActive: true
      },
      {
        title: 'Activa tu Servicio',
        content: 'Configuramos todo para que empieces a disfrutar',
        imageUrl: '/wifi-router-home-setup.png',
        order: 3,
        isActive: true
      }
    ]
  });

  // Crear servicios
  await prisma.service.createMany({
    data: [
      {
        title: 'Fibra Óptica',
        description: 'Internet ultra rápido para tu hogar',
        imageUrl: '/conexion-internet.jpg',
        price: 29.90,
        isActive: true
      },
      {
        title: 'Móvil 5G',
        description: 'La mejor red móvil de España',
        imageUrl: '/5g-network.png',
        price: 19.90,
        isActive: true
      },
      {
        title: 'TV Premium',
        description: 'Entretenimiento sin límites',
        imageUrl: '/prismatv-preview.jpg',
        price: 15.90,
        isActive: true
      }
    ]
  });

  // Crear entradas del blog
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'Llega el 5G a España: Todo lo que necesitas saber',
        excerpt: 'Descubre las ventajas de la nueva red 5G y cómo cambiar tu experiencia móvil.',
        content: 'El 5G ha llegado para revolucionar las comunicaciones...',
        slug: 'llega-5g-espana',
        imageUrl: '/5g-network.png',
        isPublished: true
      },
      {
        title: 'Cómo elegir el mejor plan de fibra para tu hogar',
        excerpt: 'Guía completa para seleccionar la velocidad de fibra que necesitas.',
        content: 'Elegir el plan de fibra adecuado es crucial...',
        slug: 'elegir-plan-fibra-hogar',
        imageUrl: '/wifi-router-home-setup.png',
        isPublished: true
      }
    ]
  });

  // Crear preguntas frecuentes
  await prisma.fAQItem.createMany({
    data: [
      {
        question: '¿Cómo puedo cambiarme a Prisma?',
        answer: 'Es muy sencillo. Solo tienes que contactar con nosotros y nos encargamos de todo el proceso, incluyendo la portabilidad de tu número.',
        category: 'general',
        order: 1,
        isActive: true
      },
      {
        question: '¿Qué velocidad de fibra necesito?',
        answer: 'Depende del uso que hagas. Para navegación básica, 100 Mbps son suficientes. Para familias numerosas o trabajo remoto, recomendamos 600 Mbps o más.',
        category: 'fibra',
        order: 2,
        isActive: true
      },
      {
        question: '¿Tienen cobertura 5G en mi zona?',
        answer: 'Puedes consultar la cobertura 5G en nuestra web introduciendo tu código postal. Estamos expandiendo constantemente nuestra red.',
        category: 'movil',
        order: 3,
        isActive: true
      }
    ]
  });

  console.log('✅ Datos de ejemplo creados correctamente');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
