import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromRequest } from '@/lib/auth/session';
import { octokit, getConfiguredRepos, parseRepo } from '@/lib/github';

export async function GET(request: NextRequest) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = request.nextUrl;
  const repoFilter = searchParams.get('repo');
  const state = (searchParams.get('state') || 'open') as 'open' | 'closed' | 'all';

  const repos = repoFilter ? [repoFilter] : getConfiguredRepos();
  const results = [];

  for (const fullName of repos) {
    const { owner, repo } = parseRepo(fullName);
    try {
      const { data } = await octokit.rest.pulls.list({
        owner,
        repo,
        state,
        per_page: 30,
        sort: 'updated',
      });
      const prs = data.map((pr) => ({
        id: pr.id,
        number: pr.number,
        title: pr.title,
        state: pr.merged_at ? 'merged' : pr.state,
        url: pr.html_url,
        repo: fullName,
        labels: pr.labels.map((l) => l.name),
        createdAt: pr.created_at,
        updatedAt: pr.updated_at,
        user: pr.user?.login,
      }));
      results.push(...prs);
    } catch (err) {
      console.error(`Failed to fetch PRs for ${fullName}:`, err);
    }
  }

  return NextResponse.json(results);
}
