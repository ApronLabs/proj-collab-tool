import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUserIdFromRequest } from '@/lib/auth/session';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const comments = await prisma.ideaComment.findMany({
    where: { ideaId: id },
    include: { user: { select: { id: true, name: true, avatarUrl: true } } },
    orderBy: { createdAt: 'asc' },
  });

  return NextResponse.json(comments);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { content } = await request.json();

  if (!content?.trim()) {
    return NextResponse.json({ error: 'Content is required' }, { status: 400 });
  }

  const comment = await prisma.ideaComment.create({
    data: {
      ideaId: id,
      userId,
      content: content.trim(),
    },
    include: { user: { select: { id: true, name: true, avatarUrl: true } } },
  });

  return NextResponse.json(comment, { status: 201 });
}
