'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, ThumbsUp, MessageCircle } from 'lucide-react';
import { useIdeas, useToggleVote } from '@/lib/hooks/use-ideas';
import { Button, Badge, Card, SkeletonList } from '@/components/ui';
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

const statusBadge = (status: string) => {
  const map: Record<string, { variant: 'primary' | 'warning' | 'success' | 'error' | 'default'; label: string }> = {
    proposed: { variant: 'primary', label: '제안됨' },
    discussing: { variant: 'warning', label: '논의중' },
    approved: { variant: 'success', label: '승인됨' },
    in_progress: { variant: 'warning', label: '진행중' },
    done: { variant: 'success', label: '완료' },
    rejected: { variant: 'error', label: '거절됨' },
  };
  return map[status] || { variant: 'default' as const, label: status };
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(ideas as IdeaListItem[]).map((idea) => {
            const sb = statusBadge(idea.status);

            return (
              <Link key={idea.id} href={`/ideas/${idea.id}`}>
                <Card interactive className="h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge variant={sb.variant} size="sm">{sb.label}</Badge>
                    {idea.tagLinks.map(({ tag }) => (
                      <span
                        key={tag.name}
                        className="text-2xs px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">{idea.title}</h3>
                  {idea.description ? (
                    <p className="text-xs text-gray-500 line-clamp-2 mb-2">{idea.description}</p>
                  ) : null}
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="text-xs text-gray-500">
                      <span>{idea.createdBy?.name}</span>
                      <span className="mx-1">·</span>
                      <span>{formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true, locale: ko })}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => handleVote(e, idea.id)}
                        className={`flex items-center gap-1 text-xs ${
                          idea.hasVoted ? 'text-brand font-medium' : 'text-gray-400'
                        }`}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                        {idea._count?.votes || 0}
                      </button>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <MessageCircle className="h-3.5 w-3.5" />
                        {idea._count?.comments || 0}
                      </span>
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
