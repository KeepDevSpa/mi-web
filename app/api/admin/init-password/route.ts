// app/api/admin/init-password/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // Hashear la contraseña
    const hashedPassword = await hash(password, 10);

    // Crear el registro en la base de datos
    await prisma.adminConfig.create({
      data: {
        key: 'admin-password-hash',
        value: hashedPassword,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error initializing password:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}