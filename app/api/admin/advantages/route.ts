import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // ✅ Importación correcta

export async function GET() {
  try {
    const advantages = await prisma.advantage.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(advantages);
  } catch (error) {
    console.error('Error fetching advantages:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data.title || !data.content) {
      return new NextResponse('Title and content are required', { status: 400 });
    }
    const advantage = await prisma.advantage.create({ data });
    return NextResponse.json(advantage);
  } catch (error) {
    console.error('Error creating advantage:', error);
    return new NextResponse('Failed to create advantage', { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) {
      return new NextResponse('ID is required', { status: 400 });
    }
    const updated = await prisma.advantage.update({
      where: { id: data.id },
      data,
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating advantage:', error);
    return new NextResponse('Failed to update advantage', { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return new NextResponse('ID is required', { status: 400 });
    }
    await prisma.advantage.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting advantage:', error);
    return new NextResponse('Failed to delete advantage', { status: 500 });
  }
}