// app/api/admin/hero-config/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET: Listar todas las configuraciones
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');

    const configs = await prisma.heroConfig.findMany({
      where: page ? { page } : undefined,
      orderBy: { page: 'asc' },
    });
    return NextResponse.json(configs);
  } catch (error) {
    console.error('Error fetching hero config:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// POST: Crear una nueva configuración
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Si se activa, desactivar otras de la misma página
    if (data.isActive) {
      await prisma.heroConfig.updateMany({
        where: {
          page: data.page,
          NOT: { id: data.id },
        },
        data: { isActive: false },
      });
    }

    const config = await prisma.heroConfig.create({ data });
    return NextResponse.json(config, { status: 201 });
  } catch (error) {
    console.error('Error creating hero config:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// PUT: Actualizar una configuración
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json({ error: 'ID es requerido' }, { status: 400 });
    }

    // Si se activa, desactivar otras de la misma página
    if (updateData.isActive) {
      await prisma.heroConfig.updateMany({
        where: {
          page: updateData.page,
          NOT: { id },
        },
        data: { isActive: false },
      });
    }

    const config = await prisma.heroConfig.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(config);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Configuración no encontrada' }, { status: 404 });
    }
    console.error('Error updating hero config:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// DELETE: Eliminar una configuración
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID es requerido' }, { status: 400 });
    }

    await prisma.heroConfig.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Configuración no encontrada' }, { status: 404 });
    }
    console.error('Error deleting hero config:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}