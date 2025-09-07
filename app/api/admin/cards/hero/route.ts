import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const heroOffer = await prisma.pricingCard.findFirst({
      where: {
        isHeroOffer: true,
        isActive: true,
      },
      include: {
        speeds: true,
        extras: true,
      },
    });

    if (!heroOffer) {
      return NextResponse.json(null);
    }

    return NextResponse.json(heroOffer);
  } catch (error) {
    console.error('Error fetching hero offer:', error);
    return NextResponse.json({ error: 'Failed to fetch hero offer' }, { status: 500 });
  }
}