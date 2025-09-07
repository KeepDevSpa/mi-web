import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Listar servicios
export async function GET() {
  try {
    const services = await prisma.service.findMany({ orderBy: { createdAt: 'asc' } });
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POST: Crear un nuevo servicio
export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data.title || !data.content) {
      return new NextResponse('Title and content are required', { status: 400 });
    }
    const service = await prisma.service.create({ data });
    return NextResponse.json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    return new NextResponse('Failed to create service', { status: 500 });
  }
}

// PUT: Editar un servicio
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) {
      return new NextResponse('ID is required', { status: 400 });
    }
    const updated = await prisma.service.update({
      where: { id: data.id },
      data,
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating service:', error);
    return new NextResponse('Failed to update service', { status: 500 });
  }
}

// DELETE: Eliminar un servicio
export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) {
      return new NextResponse('ID is required', { status: 400 });
    }
    await prisma.service.delete({ where: { id: data.id } });
    return new NextResponse('Service deleted', { status: 200 });
  } catch (error) {
    console.error('Error deleting service:', error);
    return new NextResponse('Failed to delete service', { status: 500 });
  }
}
