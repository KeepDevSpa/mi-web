import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const reqPath = formData.get('path') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Ensure the path is within public directory
    const uploadDir = join(process.cwd(), reqPath || 'public');
    if (!uploadDir.startsWith(join(process.cwd(), 'public'))) {
      return NextResponse.json({ error: 'Invalid upload path' }, { status: 400 });
    }

    // Get the file as buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Create full file path
    const filename = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
    const filepath = join(uploadDir, filename);

    // Write the file
    await writeFile(filepath, buffer);

    return NextResponse.json({ 
      success: true,
      path: filepath.replace(process.cwd(), '').replace(/\\/g, '/'),
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
