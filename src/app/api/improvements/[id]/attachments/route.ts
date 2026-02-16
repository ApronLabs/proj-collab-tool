import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUserIdFromRequest } from '@/lib/auth/session';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const contentType = request.headers.get('content-type') || '';

  // YouTube link
  if (contentType.includes('application/json')) {
    const { youtubeUrl, title } = await request.json();
    if (!youtubeUrl) {
      return NextResponse.json({ error: 'youtubeUrl is required' }, { status: 400 });
    }
    const attachment = await prisma.improvementAttachment.create({
      data: {
        improvementId: id,
        fileName: title || 'YouTube 영상',
        fileUrl: youtubeUrl,
        fileSize: null,
        mimeType: 'youtube/link',
      },
    });
    return NextResponse.json(attachment, { status: 201 });
  }

  // File upload
  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = path.extname(file.name) || '.png';
  const fileName = `${uuidv4()}${ext}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'improvements');
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, fileName), buffer);

  const fileUrl = `/collab/uploads/improvements/${fileName}`;

  const attachment = await prisma.improvementAttachment.create({
    data: {
      improvementId: id,
      fileName: file.name,
      fileUrl,
      fileSize: buffer.length,
      mimeType: file.type || null,
    },
  });

  return NextResponse.json(attachment, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const attachmentId = searchParams.get('attachmentId');
  if (!attachmentId) {
    return NextResponse.json({ error: 'attachmentId is required' }, { status: 400 });
  }

  const attachment = await prisma.improvementAttachment.findUnique({ where: { id: attachmentId } });
  if (!attachment) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  // Delete file from disk (skip for YouTube links)
  if (attachment.mimeType !== 'youtube/link') {
    const filePath = path.join(process.cwd(), 'public', attachment.fileUrl.replace('/collab/', ''));
    try {
      await unlink(filePath);
    } catch {
      // File may already be deleted
    }
  }

  await prisma.improvementAttachment.delete({ where: { id: attachmentId } });
  return NextResponse.json({ success: true });
}
