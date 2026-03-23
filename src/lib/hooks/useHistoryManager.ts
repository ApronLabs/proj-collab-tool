'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { usePageStateContext } from '@/lib/providers/PageStateProvider';
import { saveSnapshot, type PageSnapshot } from '@/lib/utils/storageUtils';

export function useHistoryManager() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { markAsBack } = usePageStateContext();

  const currentFullPath = searchParams.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname;

  /**
   * 일반 페이지 이동 (히스토리에 쌓임)
   */
  const navigateTo = useCallback(
    (path: string, options?: { scroll?: boolean }) => {
      router.push(path, { scroll: options?.scroll ?? true });
    },
    [router]
  );

  /**
   * 목록에서 아이템 클릭 시 사용 — 클릭한 아이템 ID를 현재 스냅샷에 기록
   */
  const navigateToWithMark = useCallback(
    (path: string, lastClickedItemId: string) => {
      const currentSnapshot: Partial<PageSnapshot> = {
        lastClickedItemId,
        scrollY: typeof window !== 'undefined' ? window.scrollY : 0,
      };
      saveSnapshot(currentFullPath, currentSnapshot);
      router.push(path, { scroll: true });
    },
    [router, currentFullPath]
  );

  /**
   * 현재 페이지 교체 (히스토리에 안 쌓임) — 탭/필터/정렬 변경 등
   */
  const replaceWith = useCallback(
    (path: string) => {
      router.replace(path, { scroll: false });
    },
    [router]
  );

  /**
   * 뒤로가기
   */
  const goBack = useCallback(
    (fallbackPath: string = '/') => {
      markAsBack();

      if (typeof window !== 'undefined' && window.history.length > 1) {
        router.back();
      } else {
        router.replace(fallbackPath);
      }
    },
    [router, markAsBack]
  );

  /**
   * URL 쿼리 파라미터 변경 (히스토리에 안 쌓임)
   */
  const updateQuery = useCallback(
    (params: Record<string, string | null>) => {
      const current = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === '') {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      });

      const query = current.toString();
      const newPath = query ? `${pathname}?${query}` : pathname;
      router.replace(newPath, { scroll: false });
    },
    [pathname, searchParams, router]
  );

  return {
    navigateTo,
    navigateToWithMark,
    replaceWith,
    goBack,
    updateQuery,
    currentPath: currentFullPath,
  };
}
