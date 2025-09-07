import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const pricingCards = await prisma.pricingCard.findMany({
      include: {
        speeds: true,
        extras: true,
      },
      orderBy: [
        { rateTier: 'asc' },
        { name: 'asc' }
      ]
    });

    return NextResponse.json(pricingCards);
  } catch (error) {
    console.error('Error fetching pricing cards:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pricing cards' },
      { status: 500 }
    );
  }
}
