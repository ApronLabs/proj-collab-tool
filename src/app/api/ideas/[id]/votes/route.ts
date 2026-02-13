import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUserIdFromRequest } from '@/lib/auth/session';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  // Toggle vote
  const existing = await prisma.ideaVote.findUnique({
    where: { ideaId_userId: { ideaId: id, userId } },
  });

  if (existing) {
    await prisma.ideaVote.delete({ where: { id: existing.id } });
    return NextResponse.json({ voted: false });
  }

  await prisma.ideaVote.create({
    data: { ideaId: id, userId },
  });

  return NextResponse.json({ voted: true });
}
