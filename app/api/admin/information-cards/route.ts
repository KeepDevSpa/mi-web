import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Listar tarjetas informativas
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');

    const cards = await prisma.informationCard.findMany({
      where: page ? { page } : {},
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(cards);
  } catch (error) {
    console.error('Error fetching info cards:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// PUT: Editar tarjeta
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return new NextResponse('ID is required', { status: 400 });
    }

    const updated = await prisma.informationCard.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Error updating info card:', error);
    if (error.code === 'P2025') {
      return new NextResponse('Card not found', { status: 404 });
    }
    return new NextResponse('Failed to update card', { status: 500 });
  }
}

// POST: Crear tarjeta
export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.title || !data.description) {
      return new NextResponse('Title and description are required', { status: 400 });
    }

    const card = await prisma.informationCard.create({ data });
    return NextResponse.json(card);
  } catch (error) {
    console.error('Error creating info card:', error);
    return new NextResponse('Failed to create card', { status: 500 });
  }
}

// DELETE: Eliminar tarjeta
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new NextResponse('ID is required', { status: 400 });
    }

    await prisma.informationCard.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error('Error deleting info card:', error);
    if (error.code === 'P2025') {
      return new NextResponse('Card not found', { status: 404 });
    }
    return new NextResponse('Failed to delete card', { status: 500 });
  }
}