/**
 * Script para crear datos de ejemplo de selectores de página
 * Inserta selectores para las páginas móvil y fibra-movil
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Insertando datos de ejemplo de selectores de página...');

  // Selectores para la página móvil
  const movilSelectors = [
    {
      page: 'movil',
      key: 'basico',
      title: 'Planes Básicos',
      subtitle: 'Para uso moderado',
      description: 'Perfectos para llamadas y uso básico de internet',
      order: 1,
      isActive: true
    },
    {
      page: 'movil',
      key: 'premium',
      title: 'Planes Premium',
      subtitle: 'Para usuarios intensivos',
      description: 'Máximo rendimiento con datos ilimitados',
      order: 2,
      isActive: true
    }
  ];

  // Selectores para la página fibra-movil (ya tiene los 3 que están en el código)
  const fibraMovilSelectors = [
    {
      page: 'fibra-movil',
      key: 'fibra',
      title: 'Velocidad Fibra Óptica',
      subtitle: 'Fibra sin límites',
      description: 'Conexiones de alta velocidad con diferentes opciones',
      order: 1,
      isActive: true
    },
    {
      page: 'fibra-movil',
      key: 'contenido',
      title: 'Selección Contenido',
      subtitle: 'Máximo contenido más flexibilidad',
      description: 'Incluye plataformas de streaming y televisión',
      order: 2,
      isActive: true
    },
    {
      page: 'fibra-movil',
      key: 'vip',
      title: 'Selección Fibra Óptica VIP',
      subtitle: 'Máximo Fibra Óptica premium',
      description: 'Servicios profesionales con soporte dedicado',
      order: 3,
      isActive: true
    }
  ];

  try {
    // Insertar selectores para móvil
    console.log('📱 Creando selectores para página móvil...');
    for (const selector of movilSelectors) {
      await prisma.pageSelector.upsert({
        where: {
          page_key: {
            page: selector.page,
            key: selector.key
          }
        },
        update: selector,
        create: selector
      });
      console.log(`  ✅ Selector "${selector.title}" creado para página móvil`);
    }

    // Insertar selectores para fibra-movil
    console.log('🌐 Creando selectores para página fibra-movil...');
    for (const selector of fibraMovilSelectors) {
      await prisma.pageSelector.upsert({
        where: {
          page_key: {
            page: selector.page,
            key: selector.key
          }
        },
        update: selector,
        create: selector
      });
      console.log(`  ✅ Selector "${selector.title}" creado para página fibra-movil`);
    }

    // Actualizar algunas pricing cards existentes para asociarlas con selectores
    console.log('💳 Actualizando pricing cards existentes...');
    
    // Buscar tarjetas de móvil existentes y asignar selectores
    const movilCards = await prisma.pricingCard.findMany({
      where: { page: 'movil' },
      orderBy: { rateTier: 'asc' }
    });

    if (movilCards.length > 0) {
      // Asignar la primera mitad a "basico" y la segunda a "premium"
      const mid = Math.ceil(movilCards.length / 2);
      
      for (let i = 0; i < movilCards.length; i++) {
        const selectorKey = i < mid ? 'basico' : 'premium';
        await prisma.pricingCard.update({
          where: { id: movilCards[i].id },
          data: { selectorKey }
        });
        console.log(`  ✅ Card "${movilCards[i].name}" asignada al selector "${selectorKey}"`);
      }
    }

    console.log('\n🎉 ¡Datos de ejemplo insertados correctamente!');
    console.log('\n📝 Resumen:');
    console.log(`  • ${movilSelectors.length} selectores para página móvil`);
    console.log(`  • ${fibraMovilSelectors.length} selectores para página fibra-movil`);
    console.log(`  • ${movilCards.length} tarjetas de móvil actualizadas`);
    
  } catch (error) {
    console.error('❌ Error insertando datos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error('❌ Error ejecutando script:', e);
    process.exit(1);
  });
