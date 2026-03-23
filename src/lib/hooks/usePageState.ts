'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { usePathname } from 'next/navigation';
import { usePageStateContext } from '@/lib/providers/PageStateProvider';
import {
  saveSnapshot,
  loadSnapshot,
  clearSnapshot,
  type PageSnapshot,
} from '@/lib/utils/storageUtils';

interface UsePageStateOptions {
  defaultState: PageSnapshot;
  getExtraState?: () => Record<string, unknown>;
}

interface UsePageStateReturn {
  restoredState: PageSnapshot;
  isRestored: boolean;
  saveCurrentState: (state: Partial<PageSnapshot>) => void;
  clearSavedState: () => void;
}

export function usePageState({
  defaultState,
  getExtraState,
}: UsePageStateOptions): UsePageStateReturn {
  const pathname = usePathname();
  const { isBack } = usePageStateContext();
  const [restoredState, setRestoredState] = useState<PageSnapshot>(defaultState);
  const [isRestored, setIsRestored] = useState(false);
  const currentStateRef = useRef<PageSnapshot>(defaultState);
  const hasRestored = useRef(false);

  // 초기 마운트: 뒤로가기면 스냅샷 복원
  useEffect(() => {
    if (hasRestored.current) return;
    hasRestored.current = true;

    if (isBack) {
      const snapshot = loadSnapshot(pathname);
      if (snapshot) {
        setRestoredState(snapshot);
        setIsRestored(true);
        currentStateRef.current = snapshot;
        return;
      }
    }

    setRestoredState(defaultState);
    setIsRestored(false);
    currentStateRef.current = defaultState;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 의도적으로 의존성 비움 (초기 로드 1회만)

  // 현재 상태 수동 업데이트 & 저장
  const saveCurrentState = useCallback(
    (state: Partial<PageSnapshot>) => {
      const merged = { ...currentStateRef.current, ...state };

      if (getExtraState) {
        merged.extra = { ...merged.extra, ...getExtraState() };
      }

      if (typeof window !== 'undefined') {
        merged.scrollY = window.scrollY;
      }

      currentStateRef.current = merged;
      saveSnapshot(pathname, merged);
    },
    [pathname, getExtraState]
  );

  // 언마운트 시 자동 저장 (페이지 이동 포함)
  useEffect(() => {
    const handleBeforeLeave = () => {
      const state: PageSnapshot = { ...currentStateRef.current };

      if (getExtraState) {
        state.extra = { ...state.extra, ...getExtraState() };
      }

      if (typeof window !== 'undefined') {
        state.scrollY = window.scrollY;
      }

      saveSnapshot(pathname, state);
    };

    window.addEventListener('beforeunload', handleBeforeLeave);

    return () => {
      handleBeforeLeave();
      window.removeEventListener('beforeunload', handleBeforeLeave);
    };
  }, [pathname, getExtraState]);

  const clearSavedState = useCallback(() => {
    clearSnapshot(pathname);
  }, [pathname]);

  return { restoredState, isRestored, saveCurrentState, clearSavedState };
}
