// prisma/check-cards.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkCards() {
  try {
    const cards = await prisma.pricingCard.findMany({
      orderBy: { page: 'asc' },
    });

    console.log(`\n✅ Total de tarifas encontradas: ${cards.length}\n`);
    
    cards.forEach((card, index) => {
      console.log(`${index + 1}. ${card.name}`);
      console.log(`   Página: ${card.page}`);
      console.log(`   Precio: ${card.currentPrice}€`);
      console.log(`   Activa: ${card.isActive}`);
      console.log(`   Hero: ${card.isHeroOffer}`);
      console.log(`   Selector: ${card.selectorKey || '—'}`);
      console.log('---');
    });
  } catch (error) {
    console.error('Error al leer tarifas:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCards();