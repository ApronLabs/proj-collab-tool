import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUserIdFromRequest } from '@/lib/auth/session';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const idea = await prisma.idea.findUnique({
    where: { id },
    include: {
      createdBy: { select: { id: true, name: true, avatarUrl: true } },
      comments: {
        include: { user: { select: { id: true, name: true, avatarUrl: true } } },
        orderBy: { createdAt: 'asc' },
      },
      tagLinks: { include: { tag: true } },
      _count: { select: { votes: true } },
      votes: userId ? { where: { userId }, select: { id: true } } : false,
    },
  });

  if (!idea) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({
    ...idea,
    hasVoted: idea.votes && idea.votes.length > 0,
    votes: undefined,
  });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const { title, description, status, tagIds } = body;

  const data: Record<string, unknown> = {};
  if (title !== undefined) data.title = title.trim();
  if (description !== undefined) data.description = description?.trim() || null;
  if (status !== undefined) data.status = status;

  if (tagIds !== undefined) {
    await prisma.ideaTagLink.deleteMany({ where: { ideaId: id } });
    if (tagIds.length > 0) {
      data.tagLinks = { create: tagIds.map((tagId: string) => ({ tagId })) };
    }
  }

  const idea = await prisma.idea.update({
    where: { id },
    data,
    include: {
      createdBy: { select: { id: true, name: true, avatarUrl: true } },
      tagLinks: { include: { tag: true } },
      _count: { select: { comments: true, votes: true } },
    },
  });

  return NextResponse.json(idea);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await prisma.idea.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
