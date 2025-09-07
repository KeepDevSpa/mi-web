// app/api/admin/login/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs'; // Asegúrate de tener bcryptjs instalado

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2a$10$somesamplehash'; // Hash de 'M0rth0r0n$'

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    const isValidPassword = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

    if (isValidPassword) {
      const cookieStore = cookies();
      cookieStore.set('prisma-admin-auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 24 horas
        path: '/',
      });
      return NextResponse.json({ success: true });
    } else {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}