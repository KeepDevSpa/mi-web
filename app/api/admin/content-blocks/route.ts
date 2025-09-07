// app/api/admin/content-blocks/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Obtener todos los bloques de contenido
export async function GET() {
  try {
  const blocks = await prisma.contentBlock.findMany({
    orderBy: [
      { pageId: 'asc' },    // ✅ Ordena por el ID de la página, no por el objeto
      { section: 'asc' },
      { order: 'asc' }
    ],
  });
    return NextResponse.json(blocks);
  } catch (error) {
    console.error('Error fetching content blocks:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POST: Crear un nuevo bloque de contenido
// POST: Crear un nuevo bloque de contenido
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Validación básica de campos obligatorios
    if (!body.page || !body.section) {
      return new NextResponse('page and section are required', { status: 400 });
    }
    const newBlock = await prisma.contentBlock.create({
      data: body,
    });
    return NextResponse.json(newBlock, { status: 201 });
  } catch (error) {
    console.error('Error creating content block:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// PUT: Actualizar un bloque de contenido
// PUT: Actualizar un bloque de contenido
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    if (!id) return new NextResponse('ID is required', { status: 400 });
    // Comprobar existencia antes de actualizar
    const existingBlock = await prisma.contentBlock.findUnique({ where: { id } });
    if (!existingBlock) {
      return new NextResponse('Content block not found', { status: 404 });
    }
    const updatedBlock = await prisma.contentBlock.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(updatedBlock);
  } catch (error) {
    console.error('Error updating content block:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// DELETE: Eliminar un bloque de contenido
// DELETE: Eliminar un bloque de contenido
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return new NextResponse('ID is required', { status: 400 });
    // Comprobar existencia antes de borrar
    const existingBlock = await prisma.contentBlock.findUnique({ where: { id } });
    if (!existingBlock) {
      return new NextResponse('Content block not found', { status: 404 });
    }
    await prisma.contentBlock.delete({
      where: { id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting content block:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}