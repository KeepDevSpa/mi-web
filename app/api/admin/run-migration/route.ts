import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

// POST /api/admin/run-migration
// Ejecutar migración manualmente
export async function POST(req: NextRequest) {
  try {
    // Primero intentamos crear la tabla directamente
    try {
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "UnifiedHeroConfig" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "page" TEXT NOT NULL,
          "title" TEXT NOT NULL,
          "highlightedText" TEXT,
          "description" TEXT,
          "image" TEXT,
          "variant" TEXT NOT NULL DEFAULT 'default',
          "primaryCta" TEXT,
          "secondaryCta" TEXT,
          "highlights" TEXT,
          "showButtons" BOOLEAN NOT NULL DEFAULT true,
          "contentPosition" TEXT NOT NULL DEFAULT 'left',
          "titleLayout" TEXT NOT NULL DEFAULT 'stacked',
          "overlayOpacity" REAL NOT NULL DEFAULT 0.4,
          "textSize" TEXT NOT NULL DEFAULT 'medium',
          "isActive" BOOLEAN NOT NULL DEFAULT true,
          "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" DATETIME NOT NULL
        );
      `;

      // Crear índice único en la columna page
      await prisma.$executeRaw`
        CREATE UNIQUE INDEX IF NOT EXISTS "UnifiedHeroConfig_page_key" ON "UnifiedHeroConfig"("page");
      `;

      // Reiniciar el cliente de Prisma para que reconozca los cambios
      await prisma.$disconnect();
      
      return NextResponse.json({ 
        success: true, 
        message: 'Migración ejecutada con éxito' 
      });
    } catch (error) {
      console.error('Error ejecutando migración SQL:', error);
      return NextResponse.json({ error: 'Error ejecutando migración' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error ejecutando migración:', error);
    return NextResponse.json({ error: 'Error ejecutando migración' }, { status: 500 });
  }
}
