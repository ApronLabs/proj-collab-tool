import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUserIdFromRequest } from '@/lib/auth/session';

export async function GET(request: NextRequest) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = request.nextUrl;
  const status = searchParams.get('status');
  const priority = searchParams.get('priority');
  const repo = searchParams.get('repo');

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (repo) where.repo = repo;

  const improvements = await prisma.improvement.findMany({
    where,
    include: {
      createdBy: { select: { id: true, name: true, avatarUrl: true } },
      assignee: { select: { id: true, name: true, avatarUrl: true } },
      githubLinks: { select: { id: true, githubType: true, number: true, title: true, url: true, state: true }, orderBy: { createdAt: 'desc' } },
      _count: { select: { comments: true, attachments: true, githubLinks: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(improvements);
}

export async function POST(request: NextRequest) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { title, description, priority, repo, assigneeId } = body;

  if (!title?.trim()) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  const improvement = await prisma.improvement.create({
    data: {
      title: title.trim(),
      description: description?.trim() || null,
      priority: priority || 'medium',
      repo: repo || null,
      createdById: userId,
      assigneeId: assigneeId || null,
    },
    include: {
      createdBy: { select: { id: true, name: true, avatarUrl: true } },
      assignee: { select: { id: true, name: true, avatarUrl: true } },
    },
  });

  return NextResponse.json(improvement, { status: 201 });
}
