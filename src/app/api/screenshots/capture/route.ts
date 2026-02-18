import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromRequest } from '@/lib/auth/session';
import { getPageById } from '@/lib/page-registry';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = process.env.CAPTURE_BASE_URL || 'https://no-sim.co.kr';

// Simple mutex to prevent concurrent captures on memory-constrained EC2
let isCapturing = false;

export async function POST(request: NextRequest) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { pageId } = await request.json();
  if (!pageId) {
    return NextResponse.json({ error: 'pageId is required' }, { status: 400 });
  }

  const page = getPageById(pageId);
  if (!page) {
    return NextResponse.json({ error: 'Unknown page' }, { status: 400 });
  }

  if (isCapturing) {
    return NextResponse.json({ error: 'Another capture is in progress, please wait' }, { status: 429 });
  }

  isCapturing = true;

  try {
    // Dynamic import to avoid bundling issues
    const puppeteer = await import('puppeteer-core');

    // Find chromium executable
    const execPaths = [
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium',
      '/usr/bin/google-chrome',
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    ];

    let executablePath = '';
    const { existsSync } = await import('fs');
    for (const p of execPaths) {
      if (existsSync(p)) {
        executablePath = p;
        break;
      }
    }

    if (!executablePath) {
      return NextResponse.json({ error: 'No Chrome/Chromium found on server' }, { status: 500 });
    }

    const browser = await puppeteer.default.launch({
      executablePath,
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--single-process',
      ],
    });

    const browserPage = await browser.newPage();
    await browserPage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

    const captureUrl = `${BASE_URL}${page.route}`;
    await browserPage.goto(captureUrl, { waitUntil: 'networkidle2', timeout: 15000 });

    // Wait a bit for animations/rendering
    await new Promise((r) => setTimeout(r, 1000));

    const screenshot = await browserPage.screenshot({ type: 'png', fullPage: false });
    await browser.close();

    // Save to disk
    const fileName = `${pageId}-${uuidv4().slice(0, 8)}.png`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'screenshots');
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, fileName), screenshot);

    const screenshotUrl = `/collab/uploads/screenshots/${fileName}`;

    return NextResponse.json({ screenshotUrl, pageId });
  } catch (err) {
    console.error('Screenshot capture error:', err);
    return NextResponse.json(
      { error: 'Failed to capture screenshot' },
      { status: 500 }
    );
  } finally {
    isCapturing = false;
  }
}
