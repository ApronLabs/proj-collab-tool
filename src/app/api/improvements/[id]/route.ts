import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUserIdFromRequest } from '@/lib/auth/session';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const improvement = await prisma.improvement.findUnique({
    where: { id },
    include: {
      createdBy: { select: { id: true, name: true, avatarUrl: true } },
      assignee: { select: { id: true, name: true, avatarUrl: true } },
      comments: {
        include: { user: { select: { id: true, name: true, avatarUrl: true } } },
        orderBy: { createdAt: 'asc' },
      },
      attachments: { orderBy: { createdAt: 'desc' } },
      githubLinks: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!improvement) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(improvement);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const { title, description, status, priority, repo, assigneeId } = body;

  const data: Record<string, unknown> = {};
  if (title !== undefined) data.title = title.trim();
  if (description !== undefined) data.description = description?.trim() || null;
  if (status !== undefined) {
    data.status = status;
    if (status === 'resolved') {
      data.resolvedAt = new Date();
    } else {
      data.resolvedAt = null;
    }
  }
  if (priority !== undefined) data.priority = priority;
  if (repo !== undefined) data.repo = repo || null;
  if (assigneeId !== undefined) data.assigneeId = assigneeId || null;

  const improvement = await prisma.improvement.update({
    where: { id },
    data,
    include: {
      createdBy: { select: { id: true, name: true, avatarUrl: true } },
      assignee: { select: { id: true, name: true, avatarUrl: true } },
    },
  });

  return NextResponse.json(improvement);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await prisma.improvement.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
