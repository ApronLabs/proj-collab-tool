import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUserIdFromRequest } from '@/lib/auth/session';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = path.extname(file.name) || '.png';
  const fileName = `${uuidv4()}${ext}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'bugs');
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, fileName), buffer);

  const fileUrl = `/collab/uploads/bugs/${fileName}`;

  const attachment = await prisma.bugAttachment.create({
    data: {
      bugId: id,
      fileName: file.name,
      fileUrl,
      fileSize: buffer.length,
      mimeType: file.type || null,
    },
  });

  return NextResponse.json(attachment, { status: 201 });
}
