import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUserIdFromRequest } from '@/lib/auth/session';

export async function GET(request: NextRequest) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const tags = await prisma.tag.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { ideaLinks: true } } },
  });

  return NextResponse.json(tags);
}

export async function POST(request: NextRequest) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name, color } = await request.json();

  if (!name?.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  const tag = await prisma.tag.create({
    data: { name: name.trim(), color: color || '#6B7684' },
  });

  return NextResponse.json(tag, { status: 201 });
}
