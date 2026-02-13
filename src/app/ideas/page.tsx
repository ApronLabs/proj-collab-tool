'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Lightbulb, CheckCircle2, Circle, ThumbsUp, MessageCircle } from 'lucide-react';
import { useIdeas, useToggleVote } from '@/lib/hooks/use-ideas';
import { Button, Card, SkeletonList } from '@/components/ui';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { toast } from 'sonner';
import type { IdeaListItem } from '@/lib/types';

const STATUS_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'proposed', label: '제안됨' },
  { value: 'discussing', label: '논의중' },
  { value: 'approved', label: '승인됨' },
  { value: 'in_progress', label: '진행중' },
  { value: 'done', label: '완료' },
  { value: 'rejected', label: '거절됨' },
];

const statusIcon = (status: string) => {
  switch (status) {
    case 'proposed': return <Lightbulb className="h-4 w-4 text-blue-500" />;
    case 'discussing': return <Lightbulb className="h-4 w-4 text-yellow-500" />;
    case 'approved': return <Lightbulb className="h-4 w-4 text-green-500" />;
    case 'in_progress': return <Lightbulb className="h-4 w-4 text-orange-500" />;
    case 'done': return <CheckCircle2 className="h-4 w-4 text-purple-500" />;
    case 'rejected': return <CheckCircle2 className="h-4 w-4 text-gray-400" />;
    default: return <Circle className="h-4 w-4 text-gray-400" />;
  }
};

const statusLabel = (status: string) => {
  const map: Record<string, { text: string; color: string }> = {
    proposed: { text: '제안됨', color: 'text-blue-600 bg-blue-50' },
    discussing: { text: '논의중', color: 'text-yellow-600 bg-yellow-50' },
    approved: { text: '승인됨', color: 'text-green-600 bg-green-50' },
    in_progress: { text: '진행중', color: 'text-orange-600 bg-orange-50' },
    done: { text: '완료', color: 'text-purple-600 bg-purple-50' },
    rejected: { text: '거절됨', color: 'text-gray-500 bg-gray-100' },
  };
  return map[status] || { text: status, color: 'text-gray-500 bg-gray-100' };
};

export default function IdeasPage() {
  const [status, setStatus] = useState('');
  const { data: ideas, isLoading } = useIdeas({ status: status || undefined });
  const toggleVote = useToggleVote();

  const handleVote = async (e: React.MouseEvent, ideaId: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await toggleVote.mutateAsync(ideaId);
    } catch {
      toast.error('투표 실패');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">아이디어 보드</h1>
        <Link href="/ideas/new">
          <Button size="sm">
            <Plus className="h-4 w-4" /> 새 아이디어
          </Button>
        </Link>
      </div>

      <div className="flex gap-1 flex-wrap">
        {STATUS_OPTIONS.map((o) => (
          <button
            key={o.value}
            onClick={() => setStatus(o.value)}
            className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
              status === o.value
                ? 'bg-brand text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <SkeletonList count={5} />
      ) : !ideas?.length ? (
        <Card className="text-center py-12">
          <p className="text-gray-500 text-sm">등록된 아이디어가 없습니다</p>
        </Card>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
          {(ideas as IdeaListItem[]).map((idea) => {
            const sl = statusLabel(idea.status);

            return (
              <Link key={idea.id} href={`/ideas/${idea.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                {statusIcon(idea.status)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 truncate">{idea.title}</span>
                    <span className={`text-2xs px-1.5 py-0.5 rounded font-medium shrink-0 ${sl.color}`}>{sl.text}</span>
                    {idea.tagLinks.map(({ tag }) => (
                      <span
                        key={tag.name}
                        className="text-2xs px-1.5 py-0.5 rounded font-medium shrink-0"
                        style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
                    <span>{idea.createdBy?.name}</span>
                    <span>{formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true, locale: ko })}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-xs text-gray-400">
                  <button
                    onClick={(e) => handleVote(e, idea.id)}
                    className={`flex items-center gap-1 ${
                      idea.hasVoted ? 'text-brand font-medium' : 'text-gray-400'
                    }`}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    {idea._count?.votes || 0}
                  </button>
                  {idea._count?.comments > 0 && (
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3.5 w-3.5" />
                      {idea._count.comments}
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
