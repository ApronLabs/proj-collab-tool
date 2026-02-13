import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUserIdFromRequest } from '@/lib/auth/session';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { githubType, repo, number, title, url, state } = await request.json();

  if (!githubType || !repo || !number || !url) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const link = await prisma.bugGithubLink.create({
    data: {
      bugId: id,
      githubType,
      repo,
      number,
      title: title || null,
      url,
      state: state || null,
    },
  });

  return NextResponse.json(link, { status: 201 });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = request.nextUrl;
  const linkId = searchParams.get('linkId');
  if (!linkId) return NextResponse.json({ error: 'linkId required' }, { status: 400 });

  await prisma.bugGithubLink.delete({ where: { id: linkId } });
  return NextResponse.json({ success: true });
}
