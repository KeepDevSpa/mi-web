import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET: Listar tarifas
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');

    const cards = await prisma.pricingCard.findMany({
      where: page ? { page } : {},
      orderBy: { rateTier: 'asc' },
      include: {
        speeds: true,
        extras: true,
      },
    });

    return NextResponse.json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POST: Crear una nueva tarifa
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.name || !data.currentPrice) {
      return new NextResponse('Name and currentPrice are required', { status: 400 });
    }

    const { id, ...createData } = data;

    // Aseguramos que los precios sean números
    const currentPrice = typeof createData.currentPrice === 'string' 
      ? parseFloat(createData.currentPrice) 
      : createData.currentPrice;

    const originalPrice = createData.originalPrice 
      ? (typeof createData.originalPrice === 'string' 
          ? parseFloat(createData.originalPrice) 
          : createData.originalPrice)
      : null;

    // Crear la tarifa
    const card = await prisma.pricingCard.create({
      data: {
        ...createData,
        currentPrice,
        originalPrice,
        speeds: createData.hasSpeedSelector && createData.speeds
          ? {
              create: createData.speeds.map((s: any) => ({
                id: s.id || `speed-${Date.now()}-${Math.random()}`,
                label: s.label,
                price: typeof s.price === 'string' ? parseFloat(s.price) : s.price,
                originalPrice: s.originalPrice ? (typeof s.originalPrice === 'string' ? parseFloat(s.originalPrice) : s.originalPrice) : null,
              })),
            }
          : {
              create: []
            },
        extras: createData.extras
          ? {
              create: createData.extras.map((e: any) => ({
                id: e.id || `extra-${Date.now()}-${Math.random()}`,
                label: e.label,
                price: typeof e.price === 'string' ? parseFloat(e.price) : e.price,
              })),
            }
          : {
              create: []
            },
      },
    });

    return NextResponse.json(card, { status: 201 });
  } catch (error: any) {
    console.error('Error creating card:', error);
    return new NextResponse('Failed to create card', { status: 500 });
  }
}

// PUT: Actualizar tarifa
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, speeds, extras, ...updateData } = data;

    if (!id) {
      return new NextResponse('ID is required', { status: 400 });
    }

    const updated = await prisma.pricingCard.update({
      where: { id },
      data: {
        ...updateData,
        speeds: speeds !== undefined
          ? {
              deleteMany: {},
              create: speeds.map((s: any) => ({
                id: s.id || `speed-${Date.now()}-${Math.random()}`,
                label: s.label,
                price: typeof s.price === 'string' ? parseFloat(s.price) : s.price,
                originalPrice: s.originalPrice ? (typeof s.originalPrice === 'string' ? parseFloat(s.originalPrice) : s.originalPrice) : null,
              })),
            }
          : undefined,
        extras: extras !== undefined
          ? {
              deleteMany: {},
              create: extras.map((e: any) => ({
                id: e.id || `extra-${Date.now()}-${Math.random()}`,
                label: e.label,
                price: typeof e.price === 'string' ? parseFloat(e.price) : e.price,
                description: e.description || null,
              })),
            }
          : undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Error updating card:', error);
    if (error.code === 'P2025') {
      return new NextResponse('Card not found', { status: 404 });
    }
    return new NextResponse('Failed to update card', { status: 500 });
  }
}

// DELETE: Eliminar una tarifa
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new NextResponse('ID is required', { status: 400 });
    }

    await prisma.pricingCard.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error('Error deleting card:', error);
    if (error.code === 'P2025') {
      return new NextResponse('Card not found', { status: 404 });
    }
    return new NextResponse('Failed to delete card', { status: 500 });
  }
}