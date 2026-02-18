'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { ScreenReferenceData, Annotation } from '@/lib/types';

async function fetchJson(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

export function useScreenReferences(entityType: string, entityId: string) {
  return useQuery<ScreenReferenceData[]>({
    queryKey: ['screen-references', entityType, entityId],
    queryFn: () =>
      fetchJson(`/collab/api/screen-references?entityType=${entityType}&entityId=${entityId}`),
    enabled: !!entityType && !!entityId,
  });
}

export function useCreateScreenReference() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      entityType: string;
      entityId: string;
      stepOrder?: number;
      pageId: string;
      screenshotUrl?: string | null;
      annotations?: Annotation[];
      description?: string;
    }) =>
      fetchJson('/collab/api/screen-references', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({
        queryKey: ['screen-references', variables.entityType, variables.entityId],
      });
    },
  });
}

export function useDeleteScreenReference() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, entityType, entityId }: { id: string; entityType: string; entityId: string }) =>
      fetchJson(`/collab/api/screen-references/${id}`, { method: 'DELETE' }),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({
        queryKey: ['screen-references', variables.entityType, variables.entityId],
      });
    },
  });
}

export function useCaptureScreenshot() {
  return useMutation<{ screenshotUrl: string; pageId: string }, Error, { pageId: string }>({
    mutationFn: (data) =>
      fetchJson('/collab/api/screenshots/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
  });
}
