'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface ImprovementFilters {
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

export function useImprovements(filters?: ImprovementFilters) {
  const params = new URLSearchParams();
  if (filters?.status) params.set('status', filters.status);
  if (filters?.priority) params.set('priority', filters.priority);
  if (filters?.repo) params.set('repo', filters.repo);

  return useQuery({
    queryKey: ['improvements', filters],
    queryFn: () => fetchJson(`/collab/api/improvements?${params}`),
  });
}

export function useImprovement(id: string) {
  return useQuery({
    queryKey: ['improvement', id],
    queryFn: () => fetchJson(`/collab/api/improvements/${id}`),
    enabled: !!id,
  });
}

export function useCreateImprovement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      fetchJson('/collab/api/improvements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['improvements'] }),
  });
}

export function useUpdateImprovement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string } & Record<string, unknown>) =>
      fetchJson(`/collab/api/improvements/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['improvements'] });
      qc.invalidateQueries({ queryKey: ['improvement', vars.id] });
    },
  });
}

export function useDeleteImprovement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetchJson(`/collab/api/improvements/${id}`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['improvements'] }),
  });
}

export function useAddImprovementComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ improvementId, content }: { improvementId: string; content: string }) =>
      fetchJson(`/collab/api/improvements/${improvementId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      }),
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ['improvement', vars.improvementId] }),
  });
}

export function useUploadImprovementAttachment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ improvementId, file }: { improvementId: string; file: File }) => {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`/collab/api/improvements/${improvementId}/attachments`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      return res.json();
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ['improvement', vars.improvementId] }),
  });
}

export function useAddImprovementYoutubeLink() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ improvementId, youtubeUrl, title }: { improvementId: string; youtubeUrl: string; title?: string }) =>
      fetchJson(`/collab/api/improvements/${improvementId}/attachments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ youtubeUrl, title }),
      }),
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ['improvement', vars.improvementId] }),
  });
}

export function useDeleteImprovementAttachment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ improvementId, attachmentId }: { improvementId: string; attachmentId: string }) =>
      fetchJson(`/collab/api/improvements/${improvementId}/attachments?attachmentId=${attachmentId}`, { method: 'DELETE' }),
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ['improvement', vars.improvementId] }),
  });
}

export function useLinkImprovementGithub() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ improvementId, ...data }: { improvementId: string } & Record<string, unknown>) =>
      fetchJson(`/collab/api/improvements/${improvementId}/github`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ['improvement', vars.improvementId] }),
  });
}

export function useUnlinkImprovementGithub() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ improvementId, linkId }: { improvementId: string; linkId: string }) =>
      fetchJson(`/collab/api/improvements/${improvementId}/github?linkId=${linkId}`, { method: 'DELETE' }),
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ['improvement', vars.improvementId] }),
  });
}
