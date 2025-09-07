// app/api/admin/check-auth/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';

export async function GET() {
  // Solo verifica si existe la config
  const config = await prisma.adminConfig.findUnique({
    where: { key: 'admin-password-hash' },
  });
  return NextResponse.json({ success: !!config });
}

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    const config = await prisma.adminConfig.findUnique({
      where: { key: 'admin-password-hash' },
    });

    if (!config) {
      return NextResponse.json({ error: 'No configurado' }, { status: 500 });
    }

    const isValid = await compare(password, config.value);
    if (isValid) {
      const cookieStore = cookies();
      cookieStore.set('prisma-admin-auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 24 horas
        path: '/',
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}