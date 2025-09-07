import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Actualizar el schema
    await prisma.$executeRaw`
      DROP TABLE IF EXISTS HeroConfig;
    `;

    // Ejecutar las migraciones
    console.log('✅ Schema actualizado');

    // Actualizar los precios de las tarjetas para asegurarnos que no son 0
    const cards = await prisma.pricingCard.findMany({
      where: {
        currentPrice: 0
      }
    });

    for (const card of cards) {
      await prisma.pricingCard.update({
        where: { id: card.id },
        data: {
          currentPrice: 29.99, // Precio base por defecto
          originalPrice: 39.99 // Precio original por defecto
        }
      });
    }
    console.log(`✅ ${cards.length} tarjetas actualizadas con precios por defecto`);

  } catch (error) {
    console.error('❌ Error en la migración:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
