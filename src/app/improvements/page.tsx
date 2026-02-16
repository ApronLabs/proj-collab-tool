'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Filter, CircleDot, CheckCircle2, Circle, MessageSquare, Paperclip } from 'lucide-react';
import { useImprovements } from '@/lib/hooks/use-improvements';
import { Button, Card, SkeletonList } from '@/components/ui';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { ImprovementListItem } from '@/lib/types';

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

export default function ImprovementsPage() {
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const { data: improvements, isLoading } = useImprovements({
    status: status || undefined,
    priority: priority || undefined,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">추가 및 개선</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" onClick={() => setShowFilter(!showFilter)}>
            <Filter className="h-4 w-4" />
          </Button>
          <Link href="/improvements/new">
            <Button size="sm">
              <Plus className="h-4 w-4" /> 새 항목
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
      ) : !improvements?.length ? (
        <Card className="text-center py-12">
          <p className="text-gray-500 text-sm">등록된 항목이 없습니다</p>
        </Card>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
          {(improvements as ImprovementListItem[]).map((item) => {
            const pl = priorityLabel(item.priority);

            return (
              <Link key={item.id} href={`/improvements/${item.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                {statusIcon(item.status)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 truncate">{item.title}</span>
                    <span className={`text-2xs px-1.5 py-0.5 rounded font-medium shrink-0 ${pl.color}`}>{pl.text}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
                    <span>{item.createdBy?.name}</span>
                    <span>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true, locale: ko })}</span>
                    {item.repo && <span className="text-gray-400">{item.repo.split('/')[1]}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-xs text-gray-400">
                  {item._count?.comments > 0 && (
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3.5 w-3.5" />
                      {item._count.comments}
                    </span>
                  )}
                  {item._count?.attachments > 0 && (
                    <span className="flex items-center gap-1">
                      <Paperclip className="h-3.5 w-3.5" />
                      {item._count.attachments}
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
