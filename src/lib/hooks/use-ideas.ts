'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface IdeaFilters {
  status?: string;
  tag?: string;
}

async function fetchJson(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

export function useIdeas(filters?: IdeaFilters) {
  const params = new URLSearchParams();
  if (filters?.status) params.set('status', filters.status);
  if (filters?.tag) params.set('tag', filters.tag);

  return useQuery({
    queryKey: ['ideas', filters],
    queryFn: () => fetchJson(`/collab/api/ideas?${params}`),
  });
}

export function useIdea(id: string) {
  return useQuery({
    queryKey: ['idea', id],
    queryFn: () => fetchJson(`/collab/api/ideas/${id}`),
    enabled: !!id,
  });
}

export function useCreateIdea() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      fetchJson('/collab/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['ideas'] }),
  });
}

export function useUpdateIdea() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string } & Record<string, unknown>) =>
      fetchJson(`/collab/api/ideas/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['ideas'] });
      qc.invalidateQueries({ queryKey: ['idea', vars.id] });
    },
  });
}

export function useDeleteIdea() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetchJson(`/collab/api/ideas/${id}`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['ideas'] }),
  });
}

export function useAddIdeaComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ ideaId, content }: { ideaId: string; content: string }) =>
      fetchJson(`/collab/api/ideas/${ideaId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      }),
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ['idea', vars.ideaId] }),
  });
}

export function useToggleVote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (ideaId: string) =>
      fetchJson(`/collab/api/ideas/${ideaId}/votes`, { method: 'POST' }),
    onSuccess: (_, ideaId) => {
      qc.invalidateQueries({ queryKey: ['ideas'] });
      qc.invalidateQueries({ queryKey: ['idea', ideaId] });
    },
  });
}

export function useTags() {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () => fetchJson('/collab/api/tags'),
  });
}

export function useCreateTag() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string; color?: string }) =>
      fetchJson('/collab/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tags'] }),
  });
}
