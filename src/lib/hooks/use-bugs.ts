'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface BugFilters {
  status?: string;
  priority?: string;
  repo?: string;
}

async function fetchJson(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

export function useBugs(filters?: BugFilters) {
  const params = new URLSearchParams();
  if (filters?.status) params.set('status', filters.status);
  if (filters?.priority) params.set('priority', filters.priority);
  if (filters?.repo) params.set('repo', filters.repo);

  return useQuery({
    queryKey: ['bugs', filters],
    queryFn: () => fetchJson(`/collab/api/bugs?${params}`),
  });
}

export function useBug(id: string) {
  return useQuery({
    queryKey: ['bug', id],
    queryFn: () => fetchJson(`/collab/api/bugs/${id}`),
    enabled: !!id,
  });
}

export function useCreateBug() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      fetchJson('/collab/api/bugs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['bugs'] }),
  });
}

export function useUpdateBug() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string } & Record<string, unknown>) =>
      fetchJson(`/collab/api/bugs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['bugs'] });
      qc.invalidateQueries({ queryKey: ['bug', vars.id] });
    },
  });
}

export function useDeleteBug() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetchJson(`/collab/api/bugs/${id}`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['bugs'] }),
  });
}

export function useAddBugComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ bugId, content }: { bugId: string; content: string }) =>
      fetchJson(`/collab/api/bugs/${bugId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      }),
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ['bug', vars.bugId] }),
  });
}

export function useUploadBugAttachment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ bugId, file }: { bugId: string; file: File }) => {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`/collab/api/bugs/${bugId}/attachments`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      return res.json();
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ['bug', vars.bugId] }),
  });
}

export function useLinkBugGithub() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ bugId, ...data }: { bugId: string } & Record<string, unknown>) =>
      fetchJson(`/collab/api/bugs/${bugId}/github`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ['bug', vars.bugId] }),
  });
}

export function useUnlinkBugGithub() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ bugId, linkId }: { bugId: string; linkId: string }) =>
      fetchJson(`/collab/api/bugs/${bugId}/github?linkId=${linkId}`, { method: 'DELETE' }),
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ['bug', vars.bugId] }),
  });
}
