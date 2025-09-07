import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

interface TariffData {
  category: string;
  name: string;
  type: string;
  tariffType: string;
  dataAmount: string;
  speed: number;
  price: number;
  slug: string;
  displayName: string;
  productType: string;
}

const tariffsData: TariffData[] = [
  // Tarifas móviles Elección
  {
    category: 'Elección',
    name: 'Móvil Elección 35GB',
    type: 'movil',
    tariffType: 'Elección',
    dataAmount: '35 GB',
    speed: 0,
    price: 7.95,
    slug: 'movil-eleccion',
    displayName: 'Móvil Elección 35GB',
    productType: 'movil'
  },
  {
    category: 'Elección',
    name: 'Móvil Elección 75GB',
    type: 'movil',
    tariffType: 'Elección',
    dataAmount: '75 GB',
    speed: 0,
    price: 9.95,
    slug: 'movil-eleccion',
    displayName: 'Móvil Elección 75GB',
    productType: 'movil'
  },
  {
    category: 'Elección',
    name: 'Móvil Elección 150GB',
    type: 'movil',
    tariffType: 'Elección',
    dataAmount: '150 GB',
    speed: 0,
    price: 11.95,
    slug: 'movil-eleccion',
    displayName: 'Móvil Elección 150GB',
    productType: 'movil'
  },
  {
    category: 'Elección',
    name: 'Móvil Elección Ilimitados',
    type: 'movil',
    tariffType: 'Elección',
    dataAmount: 'Ilimitados',
    speed: 0,
    price: 19.95,
    slug: 'movil-eleccion',
    displayName: 'Móvil Elección GB Ilimitados',
    productType: 'movil'
  }
];

async function importTariffs() {
  try {
    // Limpiar tarifas existentes
    await prisma.mobileTariff.deleteMany({
      where: {
        type: 'eleccion'
      }
    });

    // Insertar nuevas tarifas
    for (const tariff of tariffsData) {
      await prisma.mobileTariff.create({
        data: {
          id: uuidv4(),
          name: tariff.name,
          subtitle: `${tariff.dataAmount}`,
          type: tariff.tariffType.toLowerCase(),
          dataAmount: tariff.dataAmount,
          price: tariff.price,
          features: JSON.stringify([
            `${tariff.dataAmount} de datos 5G/4G+`,
            'Llamadas ilimitadas',
            'SMS ilimitados',
            'Cobertura nacional',
            'Roaming incluido'
          ]),
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          order: 1
        }
      });
    }

    console.log('Tarifas importadas correctamente');
  } catch (error) {
    console.error('Error importando tarifas:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importTariffs();
