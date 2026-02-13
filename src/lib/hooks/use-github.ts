'use client';

import { useQuery, useMutation } from '@tanstack/react-query';

async function fetchJson(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}

export function useGithubIssues(repo?: string, state: string = 'open') {
  const params = new URLSearchParams({ state });
  if (repo) params.set('repo', repo);

  return useQuery({
    queryKey: ['github-issues', repo, state],
    queryFn: () => fetchJson(`/collab/api/github/issues?${params}`),
    staleTime: 60 * 1000,
  });
}

export function useGithubPRs(repo?: string, state: string = 'open') {
  const params = new URLSearchParams({ state });
  if (repo) params.set('repo', repo);

  return useQuery({
    queryKey: ['github-prs', repo, state],
    queryFn: () => fetchJson(`/collab/api/github/prs?${params}`),
    staleTime: 60 * 1000,
  });
}

export function useCreateGithubIssue() {
  return useMutation({
    mutationFn: (data: { bugId?: string; repo: string; title: string; body?: string }) =>
      fetchJson('/collab/api/github/create-issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
  });
}
