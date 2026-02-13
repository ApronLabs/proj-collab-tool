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
      const { data } = await octokit.rest.issues.listForRepo({
        owner,
        repo,
        state,
        per_page: 30,
        sort: 'updated',
      });
      // Filter out pull requests (GitHub API returns PRs as issues)
      const issues = data
        .filter((item) => !item.pull_request)
        .map((issue) => ({
          id: issue.id,
          number: issue.number,
          title: issue.title,
          state: issue.state,
          url: issue.html_url,
          repo: fullName,
          labels: issue.labels.map((l) => (typeof l === 'string' ? l : l.name)),
          createdAt: issue.created_at,
          updatedAt: issue.updated_at,
          user: issue.user?.login,
        }));
      results.push(...issues);
    } catch (err) {
      console.error(`Failed to fetch issues for ${fullName}:`, err);
    }
  }

  return NextResponse.json(results);
}
