'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { usePageStateContext } from '@/lib/providers/PageStateProvider';
import {
  saveScrollPosition,
  loadScrollPosition,
} from '@/lib/utils/storageUtils';

interface ScrollRestoreOptions {
  targetScrollY?: number | null;
  delay?: number;
  enabled?: boolean;
}

export function useScrollRestore({
  targetScrollY = null,
  delay = 100,
  enabled = true,
}: ScrollRestoreOptions = {}) {
  const pathname = usePathname();
  const { isBack } = usePageStateContext();
  const prevPathname = useRef(pathname);
  const hasRestored = useRef(false);

  // 브라우저 기본 스크롤 복원 비활성화
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // 페이지 전환 시 이전 페이지 스크롤 저장
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      saveScrollPosition(prevPathname.current, window.scrollY);
      prevPathname.current = pathname;
    }
  }, [pathname]);

  // 뒤로가기 시 스크롤 복원
  useEffect(() => {
    if (!enabled || !isBack || hasRestored.current) return;
    hasRestored.current = true;

    const scrollTarget = targetScrollY ?? loadScrollPosition(pathname);

    if (scrollTarget !== null && scrollTarget > 0) {
      const timer = setTimeout(() => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: scrollTarget, behavior: 'instant' });
        });
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [enabled, isBack, targetScrollY, pathname, delay]);

  // 새 페이지 진입 시 맨 위로
  useEffect(() => {
    if (!isBack && !hasRestored.current) {
      window.scrollTo(0, 0);
    }
  }, [isBack]);
}
