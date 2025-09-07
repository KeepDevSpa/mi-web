import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Listar pasos del proceso de contratación
export async function GET() {
  try {
    const steps = await prisma.processStep.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(steps);
  } catch (error) {
    console.error('Error fetching process steps:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POST: Crear un nuevo paso
export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data.title || !data.content) {
      return new NextResponse('Title and content are required', { status: 400 });
    }
    const step = await prisma.processStep.create({ data });
    return NextResponse.json(step);
  } catch (error) {
    console.error('Error creating process step:', error);
    return new NextResponse('Failed to create process step', { status: 500 });
  }
}

// PUT: Editar un paso
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) {
      return new NextResponse('ID is required', { status: 400 });
    }
    const updated = await prisma.processStep.update({
      where: { id: data.id },
      data,
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating process step:', error);
    return new NextResponse('Failed to update process step', { status: 500 });
  }
}

// DELETE: Eliminar un paso
export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) {
      return new NextResponse('ID is required', { status: 400 });
    }
    await prisma.processStep.delete({ where: { id: data.id } });
    return new NextResponse('Process step deleted', { status: 200 });
  } catch (error) {
    console.error('Error deleting process step:', error);
    return new NextResponse('Failed to delete process step', { status: 500 });
  }
}
