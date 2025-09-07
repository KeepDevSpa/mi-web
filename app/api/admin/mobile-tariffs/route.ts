import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET: Listar tarifas móviles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'eleccion' o 'vip'

    const where = type ? { type } : {};

    const tariffs = await prisma.mobileTariff.findMany({
      where,
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(tariffs);
  } catch (error) {
    console.error('Error fetching mobile tariffs:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POST: Crear nueva tarifa móvil
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.price) {
      return new NextResponse('Name and price are required', { status: 400 });
    }

    const newTariff = await prisma.mobileTariff.create({
      data: {
        ...body,
        id: body.id || String(Date.now()),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(newTariff);
  } catch (error) {
    console.error('Error creating mobile tariff:', error);
    return new NextResponse('Failed to create mobile tariff', { status: 500 });
  }
}

// PUT: Actualizar tarifa móvil
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return new NextResponse('ID is required', { status: 400 });
    }

    const updated = await prisma.mobileTariff.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating mobile tariff:', error);
    return new NextResponse('Failed to update mobile tariff', { status: 500 });
  }
}

// DELETE: Eliminar tarifa móvil (soft delete)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new NextResponse('ID is required', { status: 400 });
    }

    const deleted = await prisma.mobileTariff.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error('Error deleting mobile tariff:', error);
    return new NextResponse('Failed to delete mobile tariff', { status: 500 });
  }
}