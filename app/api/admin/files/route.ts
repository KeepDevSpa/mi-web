import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // Get the path from query parameters
    const reqPath = new URL(request.url).searchParams.get('path') || '/public';
    
    // Ensure the path is within public directory
    const fullPath = path.join(process.cwd(), reqPath);
    if (!fullPath.startsWith(path.join(process.cwd(), 'public'))) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    // Read directory contents
    const contents = await fs.readdir(fullPath, { withFileTypes: true });
    
    // Filter and format contents
    const files = contents
      .filter(dirent => dirent.isFile() || dirent.isDirectory())
      .map(dirent => dirent.name);

    return NextResponse.json(files);
  } catch (error) {
    console.error('Error reading directory:', error);
    return NextResponse.json({ error: 'Failed to read directory' }, { status: 500 });
  }
}
