'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Plus, CircleDot, CheckCircle2, Circle, PauseCircle, RotateCcw, MessageSquare, Paperclip, Github } from 'lucide-react';
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
  { value: 'on_hold', label: '보류' },
  { value: 're_request', label: '재요청' },
  { value: 'resolved', label: '완료' },
];

const SERVICE_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'nosim', label: '노심' },
  { value: 'collab', label: '협업도구' },
  { value: 'barcode', label: '바코드' },
  { value: 'saleskeeper', label: '매출지킴이' },
];

const SERVICE_MAP: Record<string, { text: string; color: string }> = {
  nosim: { text: '노심', color: 'text-blue-600 bg-blue-50' },
  collab: { text: '협업도구', color: 'text-green-600 bg-green-50' },
  barcode: { text: '바코드', color: 'text-orange-600 bg-orange-50' },
  saleskeeper: { text: '매출지킴이', color: 'text-pink-600 bg-pink-50' },
};

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
    case 'on_hold': return <PauseCircle className="h-4 w-4 text-orange-500" />;
    case 're_request': return <RotateCcw className="h-4 w-4 text-red-500" />;
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
      filters: { status: '', priority: '', service: '' },
    },
  });

  // --- 2) 로컬 상태 (복원된 값 또는 기본값) ---
  const [status, setStatus] = useState(restoredState.filters?.status ?? '');
  const [priority, setPriority] = useState(restoredState.filters?.priority ?? '');
  const [service, setService] = useState(restoredState.filters?.service ?? '');

  // --- 3) 스크롤 복원 ---
  useScrollRestore({
    targetScrollY: isRestored ? restoredState.scrollY : null,
    delay: 200,
  });

  const { data: bugs, isLoading } = useBugs({
    status: status || undefined,
    priority: priority || undefined,
    service: service || undefined,
  });

  // --- 4) 상태 변경 시마다 스냅샷 업데이트 ---
  useEffect(() => {
    saveCurrentState({
      filters: { status, priority, service },
    });
  }, [status, priority, service, saveCurrentState]);

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
        <Link href="/bugs/new">
          <Button size="sm">
            <Plus className="h-4 w-4" /> 새 버그
          </Button>
        </Link>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1">
          {STATUS_OPTIONS.map((o) => (
            <button
              key={o.value}
              onClick={() => setStatus(status === o.value ? '' : o.value)}
              className={`px-2.5 py-1 text-xs rounded-full font-medium transition-colors ${
                status === o.value
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
        <span className="text-gray-300">|</span>
        <div className="flex items-center gap-1">
          {PRIORITY_OPTIONS.map((o) => (
            <button
              key={o.value}
              onClick={() => setPriority(priority === o.value ? '' : o.value)}
              className={`px-2.5 py-1 text-xs rounded-full font-medium transition-colors ${
                priority === o.value
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
        <span className="text-gray-300">|</span>
        <div className="flex items-center gap-1">
          {SERVICE_OPTIONS.map((o) => (
            <button
              key={o.value}
              onClick={() => setService(service === o.value ? '' : o.value)}
              className={`px-2.5 py-1 text-xs rounded-full font-medium transition-colors ${
                service === o.value
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

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
                      {bug.service && SERVICE_MAP[bug.service] && (
                        <span className={`text-2xs px-1.5 py-0.5 rounded font-medium shrink-0 ${SERVICE_MAP[bug.service].color}`}>{SERVICE_MAP[bug.service].text}</span>
                      )}
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

                {/* GitHub Links */}
                {bug.githubLinks?.length > 0 && (
                  <div className="flex flex-wrap gap-2 pl-6.5">
                    {bug.githubLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-md bg-gray-900 text-white hover:bg-gray-700 transition-colors"
                      >
                        <Github className="h-3 w-3" />
                        {link.githubType === 'pr' ? 'PR' : 'Issue'} #{link.number}
                      </a>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
