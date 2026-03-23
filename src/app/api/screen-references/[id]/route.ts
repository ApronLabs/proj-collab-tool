import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUserIdFromRequest } from '@/lib/auth/session';

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  const ref = await prisma.screenReference.findUnique({ where: { id } });
  if (!ref) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await prisma.screenReference.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
