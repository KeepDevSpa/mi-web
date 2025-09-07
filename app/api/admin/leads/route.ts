// app/api/admin/leads/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Obtener todos los leads
export async function GET() {
  try {
    // Usar 'createdAt' en lugar de 'timestamp'
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' } // <-- CORREGIDO AQUÍ
    });
    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POST: Crear un nuevo lead
// POST: Crear un nuevo lead
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Validación básica de campos obligatorios
    if (!body.name || !body.phone) {
      return new NextResponse('name and phone are required', { status: 400 });
    }
    const newLead = await prisma.lead.create({
      data: body,
    });
    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// PUT: Actualizar un lead (por ejemplo, cambiar su estado)
// PUT: Actualizar un lead
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    if (!id) return new NextResponse('ID is required', { status: 400 });
    // Comprobar existencia antes de actualizar
    const existingLead = await prisma.lead.findUnique({ where: { id } });
    if (!existingLead) {
      return new NextResponse('Lead not found', { status: 404 });
    }
    const updatedLead = await prisma.lead.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(updatedLead);
  } catch (error) {
    console.error('Error updating lead:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// DELETE: Eliminar un lead
// DELETE: Eliminar un lead
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return new NextResponse('ID is required', { status: 400 });
    // Comprobar existencia antes de borrar
    const existingLead = await prisma.lead.findUnique({ where: { id } });
    if (!existingLead) {
      return new NextResponse('Lead not found', { status: 404 });
    }
    await prisma.lead.delete({
      where: { id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}