import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Listar leads de contacto
export async function GET() {
  try {
    const leads = await prisma.contactLead.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching contact leads:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POST: Crear un nuevo lead de contacto
export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data.name || !data.email || !data.message) {
      return new NextResponse('Name, email and message are required', { status: 400 });
    }
    const lead = await prisma.contactLead.create({ data });
    return NextResponse.json(lead);
  } catch (error) {
    console.error('Error creating contact lead:', error);
    return new NextResponse('Failed to create contact lead', { status: 500 });
  }
}

// DELETE: Eliminar un lead de contacto
export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) {
      return new NextResponse('ID is required', { status: 400 });
    }
    await prisma.contactLead.delete({ where: { id: data.id } });
    return new NextResponse('Contact lead deleted', { status: 200 });
  } catch (error) {
    console.error('Error deleting contact lead:', error);
    return new NextResponse('Failed to delete contact lead', { status: 500 });
  }
}
