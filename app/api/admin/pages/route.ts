// app/api/admin/pages/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET: Obtener todas las páginas o una página específica por slug
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    let pages;
    if (slug) {
      // Buscar una página específica por slug
      pages = await prisma.page.findMany({
        where: {
          slug: slug,
        },
        orderBy: { slug: 'asc' },
      });
    } else {
      // Obtener todas las páginas
      pages = await prisma.page.findMany({
        orderBy: { slug: 'asc' },
      });
    }

    return NextResponse.json(pages);
  } catch (error) {
    console.error('Error fetching pages:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POST: Crear una nueva página
// POST: Crear una nueva página
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Validación básica de campos obligatorios
    if (!body.slug || !body.title) {
      return new NextResponse('slug and title are required', { status: 400 });
    }
    const newPage = await prisma.page.create({
      data: body,
    });
    return NextResponse.json(newPage, { status: 201 });
  } catch (error) {
    console.error('Error creating page:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// PUT: Actualizar una página
// PUT: Actualizar una página
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    if (!id) return new NextResponse('ID is required', { status: 400 });
    // Comprobar existencia antes de actualizar
    const existingPage = await prisma.page.findUnique({ where: { id } });
    if (!existingPage) {
      return new NextResponse('Page not found', { status: 404 });
    }
    const updatedPage = await prisma.page.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(updatedPage);
  } catch (error) {
    console.error('Error updating page:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// DELETE: Eliminar una página
// DELETE: Eliminar una página
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return new NextResponse('ID is required', { status: 400 });
    // Comprobar existencia antes de borrar
    const existingPage = await prisma.page.findUnique({ where: { id } });
    if (!existingPage) {
      return new NextResponse('Page not found', { status: 404 });
    }
    await prisma.page.delete({
      where: { id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting page:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}