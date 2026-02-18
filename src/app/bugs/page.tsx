'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Filter, CircleDot, CheckCircle2, Circle, MessageSquare, Paperclip } from 'lucide-react';
import { useBugs } from '@/lib/hooks/use-bugs';
import { Button, Card, SkeletonList } from '@/components/ui';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { BugListItem } from '@/lib/types';

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

const statusBadge = (status: string) => {
  const map: Record<string, { icon: typeof CircleDot; text: string; color: string }> = {
    open: { icon: CircleDot, text: '등록', color: 'text-green-600 bg-green-50' },
    in_progress: { icon: CircleDot, text: '진행중', color: 'text-yellow-600 bg-yellow-50' },
    resolved: { icon: CheckCircle2, text: '완료', color: 'text-purple-600 bg-purple-50' },
  };
  const s = map[status] || { icon: Circle, text: status, color: 'text-gray-500 bg-gray-100' };
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-2xs px-1.5 py-0.5 rounded font-medium shrink-0 ${s.color}`}>
      <Icon className="h-3 w-3" />
      {s.text}
    </span>
  );
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
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
          {(bugs as BugListItem[]).map((bug) => {
            const pl = priorityLabel(bug.priority);

            return (
              <Link key={bug.id} href={`/bugs/${bug.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 truncate">{bug.title}</span>
                    {statusBadge(bug.status)}
                    <span className={`text-2xs px-1.5 py-0.5 rounded font-medium shrink-0 ${pl.color}`}>{pl.text}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
                    <span>{bug.createdBy?.name}</span>
                    <span>{formatDistanceToNow(new Date(bug.createdAt), { addSuffix: true, locale: ko })}</span>
                    {bug.repo && <span className="text-gray-400">{bug.repo.split('/')[1]}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-xs text-gray-400">
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
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
