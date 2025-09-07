// app/api/admin/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = cookies();
    cookieStore.delete('prisma-admin-auth');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}