'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, CircleDot, CheckCircle2, Circle, MessageSquare, Paperclip, Github } from 'lucide-react';
import { useBugs } from '@/lib/hooks/use-bugs';
import { Button, Card, SkeletonList } from '@/components/ui';
import { format } from 'date-fns';
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

const STATUS_MAP: Record<string, { icon: typeof CircleDot; text: string; color: string }> = {
  open: { icon: CircleDot, text: '등록', color: 'text-green-600 bg-green-50' },
  in_progress: { icon: CircleDot, text: '진행중', color: 'text-yellow-600 bg-yellow-50' },
  resolved: { icon: CheckCircle2, text: '완료', color: 'text-purple-600 bg-purple-50' },
};

const PRIORITY_MAP: Record<string, { text: string; color: string }> = {
  critical: { text: '긴급', color: 'text-red-600 bg-red-50' },
  high: { text: '높음', color: 'text-orange-600 bg-orange-50' },
  medium: { text: '보통', color: 'text-blue-600 bg-blue-50' },
  low: { text: '낮음', color: 'text-gray-500 bg-gray-100' },
};

function formatDate(dateStr: string) {
  return format(new Date(dateStr), 'M/d (EEE)', { locale: ko });
}

export default function BugsPage() {
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  const { data: bugs, isLoading } = useBugs({
    status: status || undefined,
    priority: priority || undefined,
  });

  const hasActiveFilter = status || priority;

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
        {hasActiveFilter && (
          <button
            onClick={() => { setStatus(''); setPriority(''); }}
            className="px-2 py-1 text-xs text-red-500 hover:text-red-700"
          >
            초기화
          </button>
        )}
      </div>

      {isLoading ? (
        <SkeletonList count={5} />
      ) : !bugs?.length ? (
        <Card className="text-center py-12">
          <p className="text-gray-500 text-sm">등록된 버그가 없습니다</p>
        </Card>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
          {(bugs as BugListItem[]).map((bug) => {
            const sl = STATUS_MAP[bug.status] || { icon: Circle, text: bug.status, color: 'text-gray-500 bg-gray-100' };
            const pl = PRIORITY_MAP[bug.priority] || { text: bug.priority, color: 'text-gray-500 bg-gray-100' };
            const StatusIcon = sl.icon;

            return (
              <div key={bug.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                <Link href={`/bugs/${bug.id}`} className="block">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium text-gray-900">{bug.title}</span>
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
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      진행상태:
                      <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded font-medium ${sl.color}`}>
                        <StatusIcon className="h-3 w-3" />{sl.text}
                      </span>
                    </span>
                    <span className="flex items-center gap-1">
                      우선순위:
                      <span className={`inline-flex px-1.5 py-0.5 rounded font-medium ${pl.color}`}>{pl.text}</span>
                    </span>
                    <span>등록: {formatDate(bug.createdAt)}</span>
                    {bug.resolvedAt && (
                      <span>완료: {formatDate(bug.resolvedAt)}</span>
                    )}
                    <span className="text-gray-400">{bug.createdBy?.name}</span>
                  </div>
                </Link>
                {/* GitHub Links */}
                {bug.githubLinks?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
