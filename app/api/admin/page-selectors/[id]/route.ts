/**
 * API Route para gestionar un selector de página específico
 * Permite obtener, actualizar y eliminar selectores individuales
 */

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/admin/page-selectors/[id]
 * Obtiene un selector de página específico por ID
 * 
 * @param request - Request object
 * @param params - Parámetros de la ruta con el ID
 * @returns Selector de página específico
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const selector = await prisma.pageSelector.findUnique({
      where: { id: params.id }
    });

    if (!selector) {
      return NextResponse.json(
        { error: 'Selector no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(selector);
  } catch (error) {
    console.error('Error fetching page selector:', error);
    return NextResponse.json(
      { error: 'Error al obtener el selector' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/page-selectors/[id]
 * Actualiza un selector de página específico
 * 
 * @param request - Request con los datos actualizados en el body
 * @param params - Parámetros de la ruta con el ID
 * @returns Selector actualizado
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const selector = await prisma.pageSelector.update({
      where: { id: params.id },
      data: {
        page: body.page,
        key: body.key,
        title: body.title,
        subtitle: body.subtitle || null,
        description: body.description || null,
        order: body.order || 0,
        isActive: body.isActive ?? true
      }
    });

    return NextResponse.json(selector);
  } catch (error) {
    console.error('Error updating page selector:', error);
    
    // Error de registro no encontrado
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Selector no encontrado' },
        { status: 404 }
      );
    }
    
    // Error de clave única duplicada
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Ya existe un selector con esa clave para esta página' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error al actualizar el selector' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/page-selectors/[id]
 * Elimina un selector de página específico
 * 
 * @param request - Request object
 * @param params - Parámetros de la ruta con el ID
 * @returns Confirmación de eliminación
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.pageSelector.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting page selector:', error);
    
    // Error de registro no encontrado
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Selector no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error al eliminar el selector' },
      { status: 500 }
    );
  }
}
