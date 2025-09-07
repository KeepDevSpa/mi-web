import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET: Listar FAQs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');

    const faqs = await prisma.fAQItem.findMany({
      where: page ? { page } : {},
      orderBy: { id: 'asc' },
    });

    return NextResponse.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POST: Crear FAQ
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.question || !data.answer) {
      return new NextResponse('Question and answer are required', { status: 400 });
    }

    const faq = await prisma.fAQItem.create({ data });
    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return new NextResponse('Failed to create FAQ', { status: 500 });
  }
}

// PUT: Editar FAQ
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return new NextResponse('ID is required', { status: 400 });
    }

    const updated = await prisma.fAQItem.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Error updating FAQ:', error);
    if (error.code === 'P2025') {
      return new NextResponse('FAQ not found', { status: 404 });
    }
    return new NextResponse('Failed to update FAQ', { status: 500 });
  }
}

// DELETE: Eliminar FAQ
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new NextResponse('ID is required', { status: 400 });
    }

    await prisma.fAQItem.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error('Error deleting FAQ:', error);
    if (error.code === 'P2025') {
      return new NextResponse('FAQ not found', { status: 404 });
    }
    return new NextResponse('Failed to delete FAQ', { status: 500 });
  }
}