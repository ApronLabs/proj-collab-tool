import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromRequest } from '@/lib/auth/session';
import { octokit, parseRepo } from '@/lib/github';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { bugId, repo, title, body } = await request.json();

  if (!repo || !title) {
    return NextResponse.json({ error: 'repo and title are required' }, { status: 400 });
  }

  const { owner, repo: repoName } = parseRepo(repo);

  const { data: issue } = await octokit.rest.issues.create({
    owner,
    repo: repoName,
    title,
    body: body || '',
    labels: ['bug'],
  });

  // If bugId provided, link it
  if (bugId) {
    await prisma.bugGithubLink.create({
      data: {
        bugId,
        githubType: 'issue',
        repo,
        number: issue.number,
        title: issue.title,
        url: issue.html_url,
        state: issue.state,
      },
    });
  }

  return NextResponse.json({
    number: issue.number,
    title: issue.title,
    url: issue.html_url,
    state: issue.state,
  }, { status: 201 });
}
