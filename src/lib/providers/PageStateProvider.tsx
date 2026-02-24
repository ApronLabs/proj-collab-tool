'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { saveNavigationMeta } from '@/lib/utils/storageUtils';

interface PageStateContextType {
  isBack: boolean;
  previousPath: string | null;
  currentPath: string;
  markAsBack: () => void;
}

const PageStateContext = createContext<PageStateContextType>({
  isBack: false,
  previousPath: null,
  currentPath: '',
  markAsBack: () => {},
});

export function usePageStateContext() {
  return useContext(PageStateContext);
}

export function PageStateProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fullPath = searchParams.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname;

  const [isBack, setIsBack] = useState(false);
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  const prevFullPath = useRef(fullPath);
  const popStateTriggered = useRef(false);

  // 브라우저 뒤로가기/앞으로가기 감지
  useEffect(() => {
    const handlePopState = () => {
      popStateTriggered.current = true;
      setIsBack(true);
      saveNavigationMeta({
        from: prevFullPath.current,
        isBack: true,
        timestamp: Date.now(),
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 경로 변화 감지
  useEffect(() => {
    if (prevFullPath.current !== fullPath) {
      setPreviousPath(prevFullPath.current);

      if (!popStateTriggered.current) {
        setIsBack(false);
      }
      popStateTriggered.current = false;

      prevFullPath.current = fullPath;
    }
  }, [fullPath]);

  // 프로그래밍 방식 뒤로가기용 (BackButton에서 사용)
  const markAsBack = useCallback(() => {
    setIsBack(true);
    popStateTriggered.current = true;
  }, []);

  return (
    <PageStateContext.Provider
      value={{ isBack, previousPath, currentPath: fullPath, markAsBack }}
    >
      {children}
    </PageStateContext.Provider>
  );
}
