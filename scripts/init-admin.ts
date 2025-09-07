// scripts/init-admin.ts
import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const password = 'Pass1234';
  const hashedPassword = await hash(password, 10);

  const result = await prisma.adminConfig.upsert({
    where: { key: 'admin-password-hash' },
    update: { value: hashedPassword },
    create: {
      key: 'admin-password-hash',
      value: hashedPassword
    },
  });

  console.log('✅ Contraseña de admin inicializada:', result);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });