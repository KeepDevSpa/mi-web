// app/api/admin/faqs/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Obtener todas las FAQs
export async function GET() {
  try {
    // ✅ CORRECCIÓN: Cambiado de 'fAQ' a 'FAQItem' para que coincida con el schema.prisma
    const faqs = await prisma.FAQItem.findMany({
      orderBy: [
        { page: 'asc' },
        { order: 'asc' }
      ],
    });
    return NextResponse.json(faqs);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POST: Crear una nueva FAQ
// POST: Crear una nueva FAQ
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Validación básica de campos obligatorios
    if (!body.question || !body.answer) {
      return new NextResponse('question and answer are required', { status: 400 });
    }
    const newFaq = await prisma.fAQ.create({
      data: body,
    });
    return NextResponse.json(newFaq, { status: 201 });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// PUT: Actualizar una FAQ
// PUT: Actualizar una FAQ
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    if (!id) return new NextResponse('ID is required', { status: 400 });
    // Comprobar existencia antes de actualizar
    const existingFaq = await prisma.fAQ.findUnique({ where: { id } });
    if (!existingFaq) {
      return new NextResponse('FAQ not found', { status: 404 });
    }
    const updatedFaq = await prisma.fAQ.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(updatedFaq);
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// DELETE: Eliminar una FAQ
// DELETE: Eliminar una FAQ
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return new NextResponse('ID is required', { status: 400 });
    // Comprobar existencia antes de borrar
    const existingFaq = await prisma.fAQ.findUnique({ where: { id } });
    if (!existingFaq) {
      return new NextResponse('FAQ not found', { status: 404 });
    }
    await prisma.fAQ.delete({
      where: { id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}