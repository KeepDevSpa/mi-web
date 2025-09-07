import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Listar posts del blog
export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: 'desc' } });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POST: Crear un nuevo post
export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data.title || !data.content) {
      return new NextResponse('Title and content are required', { status: 400 });
    }
    const post = await prisma.blogPost.create({ data });
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating blog post:', error);
    return new NextResponse('Failed to create blog post', { status: 500 });
  }
}

// PUT: Editar un post
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) {
      return new NextResponse('ID is required', { status: 400 });
    }
    const updated = await prisma.blogPost.update({
      where: { id: data.id },
      data,
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return new NextResponse('Failed to update blog post', { status: 500 });
  }
}

// DELETE: Eliminar un post
export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) {
      return new NextResponse('ID is required', { status: 400 });
    }
    await prisma.blogPost.delete({ where: { id: data.id } });
    return new NextResponse('Blog post deleted', { status: 200 });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return new NextResponse('Failed to delete blog post', { status: 500 });
  }
}
