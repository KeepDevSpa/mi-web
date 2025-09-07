import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Listar selectores
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');

    const selectors = await prisma.pageSelector.findMany({
      where: page ? { page } : {},
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(selectors);
  } catch (error) {
    console.error('Error fetching selectors:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POST: Crear selector
export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.page || !data.key || !data.title) {
      return new NextResponse('Page, key, and title are required', { status: 400 });
    }

    const selector = await prisma.pageSelector.create({ data });
    return NextResponse.json(selector);
  } catch (error) {
    console.error('Error creating selector:', error);
    return new NextResponse('Failed to create selector', { status: 500 });
  }
}

// PUT: Editar selector
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return new NextResponse('ID is required', { status: 400 });
    }

    const updated = await prisma.pageSelector.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Error updating selector:', error);
    if (error.code === 'P2025') {
      return new NextResponse('Selector not found', { status: 404 });
    }
    return new NextResponse('Failed to update selector', { status: 500 });
  }
}

// DELETE: Eliminar selector
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new NextResponse('ID is required', { status: 400 });
    }

    await prisma.pageSelector.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error('Error deleting selector:', error);
    if (error.code === 'P2025') {
      return new NextResponse('Selector not found', { status: 404 });
    }
    return new NextResponse('Failed to delete selector', { status: 500 });
  }
}