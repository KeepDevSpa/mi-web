// app/api/energia/leads/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const data = {
      name: formData.get('name') as string,
      lastname: formData.get('lastname') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      invoice: formData.get('invoice') as File,
      timestamp: new Date().toISOString(),
      status: 'new'
    }

    // Guardar en base de datos
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        lastname: data.lastname,
        phone: data.phone,
        email: data.email,
        invoiceUrl: data.invoice ? `/uploads/${data.invoice.name}` : null,
        status: data.status
      }
    })

    return NextResponse.json({ success: true, lead })
  } catch (error) {
    console.error('Error saving lead:', error)
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
  }
}