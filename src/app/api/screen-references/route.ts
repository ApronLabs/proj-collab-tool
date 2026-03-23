import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUserIdFromRequest } from '@/lib/auth/session';

export async function GET(request: NextRequest) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = request.nextUrl;
  const entityType = searchParams.get('entityType');
  const entityId = searchParams.get('entityId');

  if (!entityType || !entityId) {
    return NextResponse.json({ error: 'entityType and entityId are required' }, { status: 400 });
  }

  const refs = await prisma.screenReference.findMany({
    where: { entityType, entityId },
    orderBy: { stepOrder: 'asc' },
  });

  return NextResponse.json(refs);
}

export async function POST(request: NextRequest) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { entityType, entityId, stepOrder, pageId, screenshotUrl, annotations, description } = body;

  if (!entityType || !entityId || !pageId) {
    return NextResponse.json({ error: 'entityType, entityId, and pageId are required' }, { status: 400 });
  }

  const ref = await prisma.screenReference.create({
    data: {
      entityType,
      entityId,
      stepOrder: stepOrder ?? 0,
      pageId,
      screenshotUrl: screenshotUrl || null,
      annotations: annotations ? JSON.stringify(annotations) : null,
      description: description?.trim() || null,
    },
  });

  return NextResponse.json(ref, { status: 201 });
}
