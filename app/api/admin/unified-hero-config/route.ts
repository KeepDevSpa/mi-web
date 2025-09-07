import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/unified-hero-config
// Obtener todas las configuraciones o filtrar por página
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get('page');

    const query = page 
      ? { where: { page } } 
      : {};
      
    // Use raw query since model might not be generated yet
    let configs;
    if (page) {
      configs = await prisma.$queryRaw`SELECT * FROM "UnifiedHeroConfig" WHERE "page" = ${page} ORDER BY "page" ASC`;
    } else {
      configs = await prisma.$queryRaw`SELECT * FROM "UnifiedHeroConfig" ORDER BY "page" ASC`;
    }
    
    return NextResponse.json(configs);
  } catch (error) {
    console.error('Error obteniendo configuraciones de hero:', error);
    return NextResponse.json({ error: 'Error obteniendo configuraciones' }, { status: 500 });
  }
}

// POST /api/admin/unified-hero-config
// Crear una nueva configuración
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { 
      page, title, highlightedText, description, image, variant,
      primaryCta, secondaryCta, highlights, showButtons,
      contentPosition, titleLayout, overlayOpacity, textSize, isActive 
    } = data;
    
    const config = await prisma.$executeRaw`
      INSERT INTO "UnifiedHeroConfig" (
        "id", "page", "title", "highlightedText", "description", "image", 
        "variant", "primaryCta", "secondaryCta", "highlights", 
        "showButtons", "contentPosition", "titleLayout", "overlayOpacity", 
        "textSize", "isActive", "createdAt", "updatedAt"
      ) VALUES (
        ${crypto.randomUUID()}, ${page}, ${title}, ${highlightedText}, ${description}, ${image}, 
        ${variant}, ${JSON.stringify(primaryCta)}, ${JSON.stringify(secondaryCta)}, ${JSON.stringify(highlights)}, 
        ${showButtons}, ${contentPosition}, ${titleLayout}, ${overlayOpacity}, 
        ${textSize}, ${isActive}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      )
    `;
    
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creando configuración de hero:', error);
    return NextResponse.json({ error: 'Error creando configuración' }, { status: 500 });
  }
}

// PUT /api/admin/unified-hero-config
// Actualizar una configuración existente
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { 
      id, page, title, highlightedText, description, image, variant,
      primaryCta, secondaryCta, highlights, showButtons,
      contentPosition, titleLayout, overlayOpacity, textSize, isActive 
    } = data;
    
    if (!id) {
      return NextResponse.json({ error: 'ID no proporcionado' }, { status: 400 });
    }
    
    await prisma.$executeRaw`
      UPDATE "UnifiedHeroConfig" SET
        "page" = ${page},
        "title" = ${title},
        "highlightedText" = ${highlightedText},
        "description" = ${description},
        "image" = ${image},
        "variant" = ${variant},
        "primaryCta" = ${JSON.stringify(primaryCta)},
        "secondaryCta" = ${JSON.stringify(secondaryCta)},
        "highlights" = ${JSON.stringify(highlights)},
        "showButtons" = ${showButtons},
        "contentPosition" = ${contentPosition},
        "titleLayout" = ${titleLayout},
        "overlayOpacity" = ${overlayOpacity},
        "textSize" = ${textSize},
        "isActive" = ${isActive},
        "updatedAt" = CURRENT_TIMESTAMP
      WHERE "id" = ${id}
    `;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error actualizando configuración de hero:', error);
    return NextResponse.json({ error: 'Error actualizando configuración' }, { status: 500 });
  }
}

// DELETE /api/admin/unified-hero-config
// Eliminar una configuración
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID no proporcionado' }, { status: 400 });
    }
    
    await prisma.$executeRaw`DELETE FROM "UnifiedHeroConfig" WHERE "id" = ${id}`;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error eliminando configuración de hero:', error);
    return NextResponse.json({ error: 'Error eliminando configuración' }, { status: 500 });
  }
}
