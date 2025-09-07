import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Listar testimonios
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POST: Crear un nuevo testimonio
export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data.author || !data.content) {
      return new NextResponse('Author and content are required', { status: 400 });
    }
    const testimonial = await prisma.testimonial.create({ data });
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return new NextResponse('Failed to create testimonial', { status: 500 });
  }
}

// PUT: Editar un testimonio
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) {
      return new NextResponse('ID is required', { status: 400 });
    }
    const updated = await prisma.testimonial.update({
      where: { id: data.id },
      data,
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return new NextResponse('Failed to update testimonial', { status: 500 });
  }
}

// DELETE: Eliminar un testimonio
export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) {
      return new NextResponse('ID is required', { status: 400 });
    }
    await prisma.testimonial.delete({ where: { id: data.id } });
    return new NextResponse('Testimonial deleted', { status: 200 });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return new NextResponse('Failed to delete testimonial', { status: 500 });
  }
}
