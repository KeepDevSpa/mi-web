import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌟 Creando datos de ejemplo para las nuevas secciones...');

  try {
    // Crear ventajas de ejemplo
    await prisma.advantage.createMany({
      data: [
        {
          title: '5G Ultra Rápido',
          content: 'Velocidad de conexión sin precedentes con la tecnología 5G más avanzada',
          imageUrl: '/5g-network.png',
          order: 1,
          isActive: true
        },
        {
          title: 'Cobertura Nacional',
          content: 'La mejor cobertura en toda España, llegamos donde otros no pueden',
          imageUrl: '/conexion-internet.jpg',
          order: 2,
          isActive: true
        },
        {
          title: 'Soporte 24/7',
          content: 'Asistencia técnica disponible las 24 horas, todos los días del año',
          imageUrl: '/happy-customer-service-rep.png',
          order: 3,
          isActive: true
        },
        {
          title: 'Sin Permanencia',
          content: 'Total libertad para cambiar cuando quieras, sin penalizaciones',
          imageUrl: '/opening-protect.png',
          order: 4,
          isActive: true
        }
      ]
    });

    // Crear pasos del proceso
    await prisma.processStep.createMany({
      data: [
        {
          title: 'Consulta tu Cobertura',
          content: 'Verifica que tenemos cobertura en tu zona introduciendo tu código postal',
          imageUrl: '/wifi-router-home-setup.png',
          order: 1,
          isActive: true
        },
        {
          title: 'Elige tu Plan',
          content: 'Selecciona el plan que mejor se adapte a tus necesidades y presupuesto',
          imageUrl: '/mobile-portability.png',
          order: 2,
          isActive: true
        },
        {
          title: 'Configuración',
          content: 'Nuestros técnicos se encargan de toda la instalación y configuración',
          imageUrl: '/security-system-technician.png',
          order: 3,
          isActive: true
        },
        {
          title: 'Disfruta tu Servicio',
          content: 'Empieza a disfrutar de la mejor conexión desde el primer día',
          imageUrl: '/enjoy.jpg',
          order: 4,
          isActive: true
        }
      ]
    });

    // Crear servicios
    await prisma.service.createMany({
      data: [
        {
          title: 'Fibra Óptica',
          description: 'Internet ultra rápido y estable para tu hogar u oficina',
          imageUrl: '/conexion-internet.jpg',
          price: 29.90,
          isActive: true
        },
        {
          title: 'Móvil 5G',
          description: 'La mejor red móvil de España con tecnología 5G',
          imageUrl: '/5g-network.png',
          price: 19.90,
          isActive: true
        },
        {
          title: 'Prisma TV',
          description: 'Entretenimiento sin límites con más de 100 canales',
          imageUrl: '/prismatv-preview.jpg',
          price: 15.90,
          isActive: true
        },
        {
          title: 'Seguridad Hogar',
          description: 'Sistema completo de alarmas y videovigilancia',
          imageUrl: '/smart-home-security.png',
          price: 24.90,
          isActive: true
        }
      ]
    });

    // Crear entradas del blog
    await prisma.blogPost.createMany({
      data: [
        {
          title: 'Llega el 5G a España: Todo lo que necesitas saber',
          excerpt: 'Descubre las ventajas de la nueva red 5G y cómo va a cambiar tu experiencia móvil para siempre.',
          content: 'El 5G ha llegado para revolucionar las comunicaciones móviles. Con velocidades hasta 20 veces superiores al 4G, latencia ultra baja y capacidad para conectar millones de dispositivos, el 5G abre un mundo de posibilidades...',
          slug: 'llega-5g-espana',
          imageUrl: '/5g-network.png',
          isPublished: true
        },
        {
          title: 'Cómo elegir el mejor plan de fibra para tu hogar',
          excerpt: 'Guía completa para seleccionar la velocidad de fibra que realmente necesitas según tu uso.',
          content: 'Elegir el plan de fibra adecuado es crucial para tener una buena experiencia de internet. Factores como el número de dispositivos conectados, el tipo de contenido que consumes y el trabajo desde casa determinan tus necesidades...',
          slug: 'elegir-plan-fibra-hogar',
          imageUrl: '/wifi-router-home-setup.png',
          isPublished: true
        },
        {
          title: 'Teletrabajo: Optimiza tu conexión desde casa',
          excerpt: 'Consejos profesionales para mejorar tu productividad trabajando desde casa.',
          content: 'El teletrabajo ha llegado para quedarse. Una buena conexión a internet es fundamental para mantener la productividad y la comunicación con tu equipo...',
          slug: 'teletrabajo-optimiza-conexion',
          imageUrl: '/home-office-remote-work.png',
          isPublished: true
        }
      ]
    });

    // Crear preguntas frecuentes
    await prisma.fAQItem.createMany({
      data: [
        {
          question: '¿Cómo puedo cambiarme a Prisma?',
          answer: 'Es muy sencillo. Solo tienes que contactar con nosotros y nos encargamos de todo el proceso, incluyendo la portabilidad de tu número y la instalación sin coste.',
          category: 'general',
          order: 1,
          isActive: true
        },
        {
          question: '¿Qué velocidad de fibra necesito?',
          answer: 'Depende del uso que hagas. Para navegación básica, 100 Mbps son suficientes. Para familias numerosas, streaming 4K o trabajo remoto, recomendamos 600 Mbps o más.',
          category: 'fibra',
          order: 2,
          isActive: true
        },
        {
          question: '¿Tienen cobertura 5G en mi zona?',
          answer: 'Puedes consultar la cobertura 5G en nuestra web introduciendo tu código postal. Estamos expandiendo constantemente nuestra red 5G por toda España.',
          category: 'movil',
          order: 3,
          isActive: true
        },
        {
          question: '¿Cuánto cuesta la instalación?',
          answer: 'La instalación de fibra es completamente gratuita. Nuestros técnicos especializados se encargan de todo sin coste adicional.',
          category: 'fibra',
          order: 4,
          isActive: true
        },
        {
          question: '¿Puedo mantener mi número de teléfono?',
          answer: 'Sí, puedes mantener tu número actual. Nos encargamos gratuitamente de todo el proceso de portabilidad.',
          category: 'movil',
          order: 5,
          isActive: true
        }
      ]
    });

    console.log('✅ Datos de ejemplo creados correctamente');
    
    // Mostrar estadísticas
    const ventajas = await prisma.advantage.count();
    const pasos = await prisma.processStep.count();
    const servicios = await prisma.service.count();
    const blog = await prisma.blogPost.count();
    const faqs = await prisma.fAQItem.count();
    
    console.log('📊 Estadísticas de datos creados:');
    console.log(`   - Ventajas: ${ventajas}`);
    console.log(`   - Pasos del proceso: ${pasos}`);
    console.log(`   - Servicios: ${servicios}`);
    console.log(`   - Posts del blog: ${blog}`);
    console.log(`   - FAQs: ${faqs}`);

  } catch (error) {
    console.error('❌ Error:', error);
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
