import { NextRequest, NextResponse } from 'next/server'
import { mkdirSync, writeFileSync, existsSync } from 'fs'
import path from 'path'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const file = form.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    // 20 MB limit per file
    const MAX_BYTES = 20 * 1024 * 1024
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'File too large (max 20MB)' }, { status: 413 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true })
    }

    const timePrefix = Date.now()
    const safeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, '_')
    const filename = `${timePrefix}-${safeName}`
    const outPath = path.join(uploadsDir, filename)
    writeFileSync(outPath, buffer)

    const url = `/uploads/${filename}`
    return NextResponse.json({ url })
  } catch (err) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}


