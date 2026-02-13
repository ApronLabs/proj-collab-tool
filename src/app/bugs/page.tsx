'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Filter } from 'lucide-react';
import { useBugs } from '@/lib/hooks/use-bugs';
import { Button, Badge, Card, SkeletonList } from '@/components/ui';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { BugListItem } from '@/lib/types';

const STATUS_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'open', label: '열림' },
  { value: 'in_progress', label: '진행중' },
  { value: 'resolved', label: '해결됨' },
  { value: 'closed', label: '닫힘' },
];

const PRIORITY_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'critical', label: '긴급' },
  { value: 'high', label: '높음' },
  { value: 'medium', label: '보통' },
  { value: 'low', label: '낮음' },
];

const statusBadge = (status: string) => {
  const map: Record<string, { variant: 'success' | 'warning' | 'error' | 'primary' | 'default'; label: string }> = {
    open: { variant: 'error', label: '열림' },
    in_progress: { variant: 'warning', label: '진행중' },
    resolved: { variant: 'success', label: '해결됨' },
    closed: { variant: 'default', label: '닫힘' },
  };
  return map[status] || { variant: 'default' as const, label: status };
};

const priorityBadge = (priority: string) => {
  const map: Record<string, { variant: 'error' | 'warning' | 'primary' | 'default'; label: string }> = {
    critical: { variant: 'error', label: '긴급' },
    high: { variant: 'warning', label: '높음' },
    medium: { variant: 'primary', label: '보통' },
    low: { variant: 'default', label: '낮음' },
  };
  return map[priority] || { variant: 'default' as const, label: priority };
};

export default function BugsPage() {
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const { data: bugs, isLoading } = useBugs({
    status: status || undefined,
    priority: priority || undefined,
  });

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
            const sb = statusBadge(bug.status);
            const pb = priorityBadge(bug.priority);

            return (
              <Link key={bug.id} href={`/bugs/${bug.id}`}>
                <Card interactive padding="compact" className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={pb.variant} size="sm">{pb.label}</Badge>
                      <Badge variant={sb.variant} size="sm">{sb.label}</Badge>
                      {bug.repo ? (
                        <span className="text-2xs text-gray-400 truncate">{bug.repo}</span>
                      ) : null}
                    </div>
                    <p className="text-sm font-medium text-gray-900 truncate">{bug.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span>{bug.createdBy?.name}</span>
                      <span>·</span>
                      <span>{formatDistanceToNow(new Date(bug.createdAt), { addSuffix: true, locale: ko })}</span>
                      {bug._count?.comments > 0 ? <span>· 댓글 {bug._count.comments}</span> : null}
                      {bug._count?.attachments > 0 ? <span>· 첨부 {bug._count.attachments}</span> : null}
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
