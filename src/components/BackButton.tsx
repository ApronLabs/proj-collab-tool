'use client';

import { useHistoryManager } from '@/lib/hooks/useHistoryManager';

interface BackButtonProps {
  fallbackPath?: string;
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

export function BackButton({
  fallbackPath = '/',
  label = '뒤로가기',
  className,
  children,
}: BackButtonProps) {
  const { goBack } = useHistoryManager();

  return (
    <button
      type="button"
      onClick={() => goBack(fallbackPath)}
      className={className}
      aria-label={label}
    >
      {children ?? `← ${label}`}
    </button>
  );
}
