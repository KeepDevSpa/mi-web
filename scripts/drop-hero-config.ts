import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$executeRawUnsafe('DROP TABLE IF EXISTS HeroConfig;');
    console.log('✅ Tabla HeroConfig eliminada');
  } catch (error) {
    console.error('Error al eliminar la tabla:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);
