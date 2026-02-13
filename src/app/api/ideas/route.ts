import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUserIdFromRequest } from '@/lib/auth/session';

export async function GET(request: NextRequest) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = request.nextUrl;
  const status = searchParams.get('status');
  const tag = searchParams.get('tag');

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (tag) {
    where.tagLinks = { some: { tag: { name: tag } } };
  }

  const ideas = await prisma.idea.findMany({
    where,
    include: {
      createdBy: { select: { id: true, name: true, avatarUrl: true } },
      tagLinks: { include: { tag: true } },
      _count: { select: { comments: true, votes: true } },
      votes: userId ? { where: { userId }, select: { id: true } } : false,
    },
    orderBy: { createdAt: 'desc' },
  });

  const result = ideas.map((idea) => ({
    ...idea,
    hasVoted: idea.votes && idea.votes.length > 0,
    votes: undefined,
  }));

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { title, description, tagIds } = body;

  if (!title?.trim()) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  const idea = await prisma.idea.create({
    data: {
      title: title.trim(),
      description: description?.trim() || null,
      createdById: userId,
      ...(tagIds?.length
        ? { tagLinks: { create: tagIds.map((tagId: string) => ({ tagId })) } }
        : {}),
    },
    include: {
      createdBy: { select: { id: true, name: true, avatarUrl: true } },
      tagLinks: { include: { tag: true } },
      _count: { select: { comments: true, votes: true } },
    },
  });

  return NextResponse.json(idea, { status: 201 });
}
