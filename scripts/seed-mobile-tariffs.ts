import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedMobileTariffs() {
  try {
    // Limpiar datos existentes
    await prisma.mobileTariff.deleteMany()

    // Tarifas de Elección
    const eleccionTariffs = [
      {
        type: 'eleccion',
        name: 'Móvil Elección',
        subtitle: '75 GB',
        dataAmount: '75 GB',
        price: 9.95,
        features: [
          '75 GB de datos 5G/4G+',
          'Llamadas ilimitadas',
          'SMS ilimitados',
          'Cobertura nacional',
          'App Prisma'
        ],
        isPopular: true,
        hasOperatorChoice: true,
        order: 1
      },
      {
        type: 'eleccion',
        name: 'Móvil Elección',
        subtitle: '150 GB',
        dataAmount: '150 GB',
        price: 11.95,
        features: [
          '150 GB de datos 5G/4G+',
          'Llamadas ilimitadas',
          'SMS ilimitados',
          'Cobertura nacional',
          'App Prisma'
        ],
        hasOperatorChoice: true,
        order: 2
      },
      {
        type: 'eleccion',
        name: 'Móvil Elección',
        subtitle: 'Ilimitada',
        dataAmount: 'Ilimitada',
        price: 19.95,
        features: [
          'Datos 5G/4G+ ilimitados',
          'Llamadas ilimitadas',
          'SMS ilimitados',
          'Cobertura nacional',
          'App Prisma'
        ],
        hasOperatorChoice: true,
        order: 3
      }
    ]

    // Tarifas VIP
    const vipTariffs = [
      {
        type: 'vip',
        name: 'Móvil VIP',
        subtitle: '30 GB',
        dataAmount: '30 GB',
        price: 11.95,
        features: [
          '30 GB de datos',
          'Llamadas ilimitadas',
          'SMS ilimitados',
          'Doble cobertura (+Orange y Movistar)'
        ],
        hasOperatorChoice: false,
        order: 1
      },
      {
        type: 'vip',
        name: 'Móvil VIP',
        subtitle: '120 GB',
        dataAmount: '120 GB',
        price: 16.95,
        features: [
          '120 GB de datos',
          'Llamadas ilimitadas',
          'SMS ilimitados',
          'Doble cobertura (+Orange y Movistar)'
        ],
        isPopular: true,
        isHighlighted: true,
        hasOperatorChoice: false,
        order: 2
      },
      {
        type: 'vip',
        name: 'Móvil VIP',
        subtitle: 'Ilimitada',
        dataAmount: 'Ilimitada',
        price: 24.95,
        features: [
          'Datos ilimitados',
          'Llamadas ilimitadas',
          'SMS ilimitados',
          'Doble cobertura (+Orange y Movistar)'
        ],
        hasOperatorChoice: false,
        order: 3
      }
    ]

    // Crear las tarifas
    for (const tariff of [...eleccionTariffs, ...vipTariffs]) {
      await prisma.mobileTariff.create({
        data: tariff
      })
    }

    console.log('✅ Mobile tariffs seeded successfully!')

  } catch (error) {
    console.error('❌ Error seeding mobile tariffs:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedMobileTariffs()
