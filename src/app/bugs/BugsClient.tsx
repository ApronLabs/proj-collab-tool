'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Plus, Filter, CircleDot, CheckCircle2, Circle, MessageSquare, Paperclip } from 'lucide-react';
import { useBugs } from '@/lib/hooks/use-bugs';
import { Button, Card, SkeletonList } from '@/components/ui';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { BugListItem } from '@/lib/types';
import { usePageState } from '@/lib/hooks/usePageState';
import { useHistoryManager } from '@/lib/hooks/useHistoryManager';
import { useScrollRestore } from '@/lib/hooks/useScrollRestore';

const STATUS_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'open', label: '등록' },
  { value: 'in_progress', label: '진행중' },
  { value: 'resolved', label: '완료' },
];

const PRIORITY_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'critical', label: '긴급' },
  { value: 'high', label: '높음' },
  { value: 'medium', label: '보통' },
  { value: 'low', label: '낮음' },
];

const statusIcon = (status: string) => {
  switch (status) {
    case 'open': return <CircleDot className="h-4 w-4 text-green-500" />;
    case 'in_progress': return <CircleDot className="h-4 w-4 text-yellow-500" />;
    case 'resolved': return <CheckCircle2 className="h-4 w-4 text-purple-500" />;
    default: return <Circle className="h-4 w-4 text-gray-400" />;
  }
};

const priorityLabel = (p: string) => {
  const map: Record<string, { text: string; color: string }> = {
    critical: { text: '긴급', color: 'text-red-600 bg-red-50' },
    high: { text: '높음', color: 'text-orange-600 bg-orange-50' },
    medium: { text: '보통', color: 'text-blue-600 bg-blue-50' },
    low: { text: '낮음', color: 'text-gray-500 bg-gray-100' },
  };
  return map[p] || { text: p, color: 'text-gray-500 bg-gray-100' };
};

const devStatusBadge = (s: string | null) => {
  if (!s) return null;
  const map: Record<string, { text: string; color: string }> = {
    in_progress: { text: '진행중', color: 'text-yellow-700 bg-yellow-50' },
    pr_submitted: { text: 'PR개발중', color: 'text-blue-700 bg-blue-50' },
    done: { text: '완료', color: 'text-green-700 bg-green-50' },
  };
  return map[s] || null;
};

export default function BugsClient() {
  const { navigateToWithMark } = useHistoryManager();

  // --- 1) 페이지 상태 복원 ---
  const { restoredState, isRestored, saveCurrentState } = usePageState({
    defaultState: {
      filters: { status: '', priority: '' },
      extra: { showFilter: false },
    },
  });

  // --- 2) 로컬 상태 (복원된 값 또는 기본값) ---
  const [status, setStatus] = useState(restoredState.filters?.status ?? '');
  const [priority, setPriority] = useState(restoredState.filters?.priority ?? '');
  const [showFilter, setShowFilter] = useState(
    (restoredState.extra?.showFilter as boolean) ?? false
  );

  // --- 3) 스크롤 복원 ---
  useScrollRestore({
    targetScrollY: isRestored ? restoredState.scrollY : null,
    delay: 200,
  });

  const { data: bugs, isLoading } = useBugs({
    status: status || undefined,
    priority: priority || undefined,
  });

  // --- 4) 상태 변경 시마다 스냅샷 업데이트 ---
  useEffect(() => {
    saveCurrentState({
      filters: { status, priority },
      extra: { showFilter },
    });
  }, [status, priority, showFilter, saveCurrentState]);

  // --- 5) 아이템 클릭 핸들러 ---
  const handleItemClick = useCallback(
    (id: string) => {
      navigateToWithMark(`/bugs/${id}`, id);
    },
    [navigateToWithMark]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">버그 트래커</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" onClick={() => setShowFilter(!showFilter)}>
            <Filter className="h-4 w-4" />
          </Button>
          <Link href="/bugs/new">
            <Button size="sm">
              <Plus className="h-4 w-4" /> 새 버그
            </Button>
          </Link>
        </div>
      </div>

      {showFilter && (
        <Card padding="compact" className="flex flex-wrap gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">상태</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-8 px-2 text-sm border border-gray-200 rounded-md bg-white"
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">우선순위</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="h-8 px-2 text-sm border border-gray-200 rounded-md bg-white"
            >
              {PRIORITY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </Card>
      )}

      {isLoading ? (
        <SkeletonList count={5} />
      ) : !bugs?.length ? (
        <Card className="text-center py-12">
          <p className="text-gray-500 text-sm">등록된 버그가 없습니다</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {(bugs as BugListItem[]).map((bug) => {
            const pl = priorityLabel(bug.priority);
            const ds = devStatusBadge(bug.devStatus);
            const isLastClicked = bug.id === restoredState.lastClickedItemId;

            return (
              <button
                key={bug.id}
                onClick={() => handleItemClick(bug.id)}
                className={`w-full text-left rounded-lg border transition-colors px-4 py-4 space-y-2.5 ${
                  isLastClicked
                    ? 'bg-brand/5 border-brand/30'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {/* 상단: 상태 아이콘 + 제목 + 뱃지들 */}
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 shrink-0">{statusIcon(bug.status)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-sm font-semibold text-gray-900 break-words">{bug.title}</span>
                      <span className={`text-2xs px-1.5 py-0.5 rounded font-medium shrink-0 ${pl.color}`}>{pl.text}</span>
                      {ds && <span className={`text-2xs px-1.5 py-0.5 rounded font-medium shrink-0 ${ds.color}`}>{ds.text}</span>}
                    </div>
                  </div>
                </div>

                {/* 설명 미리보기 */}
                {bug.description && (
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 pl-6.5">
                    {bug.description}
                  </p>
                )}

                {/* 하단: 메타 정보 */}
                <div className="flex items-center justify-between pl-6.5">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="font-medium text-gray-500">{bug.createdBy?.name}</span>
                    <span>{formatDistanceToNow(new Date(bug.createdAt), { addSuffix: true, locale: ko })}</span>
                    {bug.repo && (
                      <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">
                        {bug.repo.split('/')[1] ?? bug.repo}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    {bug._count?.comments > 0 && (
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3.5 w-3.5" />
                        {bug._count.comments}
                      </span>
                    )}
                    {bug._count?.attachments > 0 && (
                      <span className="flex items-center gap-1">
                        <Paperclip className="h-3.5 w-3.5" />
                        {bug._count.attachments}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
