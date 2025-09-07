// app/api/admin/change-password/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { compare, hash } from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { currentPassword, newPassword } = await request.json();

    // Verificar que la contraseña actual es correcta
    const config = await prisma.adminConfig.findUnique({
      where: { key: 'admin-password-hash' },
    });

    if (!config) {
      return NextResponse.json({ error: 'Configuración no encontrada' }, { status: 404 });
    }

    const isValid = await compare(currentPassword, config.value);
    if (!isValid) {
      return NextResponse.json({ error: 'Contraseña actual incorrecta' }, { status: 401 });
    }

    // Hashear la nueva contraseña
    const hashedPassword = await hash(newPassword, 10);

    // ✅ CORREGIDO: Se añade "data"
    await prisma.adminConfig.update({
      where: { key: 'admin-password-hash' },
      data: { value: hashedPassword },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error cambiando contraseña:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}