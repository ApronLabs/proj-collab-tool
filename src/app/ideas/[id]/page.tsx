'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ThumbsUp, Send, Trash2, Pencil, Check, X } from 'lucide-react';
import { useIdea, useUpdateIdea, useDeleteIdea, useAddIdeaComment, useToggleVote, useUploadIdeaAttachment, useAddIdeaYoutubeLink, useDeleteIdeaAttachment } from '@/lib/hooks/use-ideas';
import { Button, Card, Input } from '@/components/ui';
import { useAuth } from '@/components/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { MediaSection } from '@/components/media/media-section';
import { BackButton } from '@/components/BackButton';
import type { IdeaDetail, IdeaComment as IdeaCommentType } from '@/lib/types';

const STATUS_OPTIONS = [
  { value: 'proposed', label: '등록' },
  { value: 'in_progress', label: '진행중' },
  { value: 'on_hold', label: '보류' },
  { value: 're_request', label: '재요청' },
  { value: 'done', label: '완료' },
];

const DEV_STATUS_OPTIONS = [
  { value: '', label: '미설정' },
  { value: 'in_progress', label: '진행중' },
  { value: 'pr_submitted', label: 'PR개발중' },
  { value: 'done', label: '완료' },
];

export default function IdeaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const { data: idea, isLoading } = useIdea(id);
  const updateIdea = useUpdateIdea();
  const deleteIdea = useDeleteIdea();
  const addComment = useAddIdeaComment();
  const toggleVote = useToggleVote();
  const uploadAttachment = useUploadIdeaAttachment();
  const addYoutubeLink = useAddIdeaYoutubeLink();
  const deleteAttachment = useDeleteIdeaAttachment();

  const [comment, setComment] = useState('');
  const [editingTitle, setEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editingDesc, setEditingDesc] = useState(false);
  const [editDesc, setEditDesc] = useState('');

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!idea) {
    return <div className="text-center py-12 text-gray-500">아이디어를 찾을 수 없습니다</div>;
  }

  const handleStatusChange = async (status: string) => {
    await updateIdea.mutateAsync({ id, status });
    toast.success('상태가 변경되었습니다');
  };

  const handleDevStatusChange = async (devStatus: string) => {
    await updateIdea.mutateAsync({ id, devStatus: devStatus || null });
    toast.success('진행상태가 변경되었습니다');
  };

  const handleTitleSave = async () => {
    if (!editTitle.trim() || editTitle.trim() === idea.title) { setEditingTitle(false); return; }
    await updateIdea.mutateAsync({ id, title: editTitle.trim() });
    setEditingTitle(false);
    toast.success('제목이 수정되었습니다');
  };

  const handleDescSave = async () => {
    const val = editDesc.trim();
    if (val === (idea.description || '')) { setEditingDesc(false); return; }
    await updateIdea.mutateAsync({ id, description: val || null });
    setEditingDesc(false);
    toast.success('설명이 수정되었습니다');
  };

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await deleteIdea.mutateAsync(id);
    toast.success('삭제되었습니다');
    router.push('/ideas');
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    await addComment.mutateAsync({ ideaId: id, content: comment });
    setComment('');
    toast.success('댓글이 추가되었습니다');
  };

  const handleVote = async () => {
    try {
      await toggleVote.mutateAsync(id);
    } catch {
      toast.error('투표 실패');
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      await uploadAttachment.mutateAsync({ ideaId: id, file });
      toast.success('파일이 업로드되었습니다');
    } catch {
      toast.error('업로드에 실패했습니다');
    }
  };

  const handleAddYoutube = async (youtubeUrl: string, title?: string) => {
    try {
      await addYoutubeLink.mutateAsync({ ideaId: id, youtubeUrl, title });
      toast.success('YouTube 링크가 추가되었습니다');
    } catch {
      toast.error('추가에 실패했습니다');
    }
  };

  const handleDeleteAttachment = async (attachmentId: string) => {
    try {
      await deleteAttachment.mutateAsync({ ideaId: id, attachmentId });
      toast.success('삭제되었습니다');
    } catch {
      toast.error('삭제에 실패했습니다');
    }
  };

  const tagLinks = (idea.tagLinks || []) as Array<{ tag: { name: string; color: string } }>;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <BackButton
          fallbackPath="/ideas"
          label="목록으로"
          className="inline-flex items-center justify-center h-8 w-8 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
        >
          ←
        </BackButton>
        {editingTitle ? (
          <div className="flex-1 flex items-center gap-1">
            <input
              className="flex-1 text-lg font-bold text-gray-900 border border-brand rounded-md px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-brand"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleTitleSave(); if (e.key === 'Escape') setEditingTitle(false); }}
              autoFocus
            />
            <Button variant="ghost" size="icon-sm" onClick={handleTitleSave}><Check className="h-4 w-4 text-green-600" /></Button>
            <Button variant="ghost" size="icon-sm" onClick={() => setEditingTitle(false)}><X className="h-4 w-4 text-gray-400" /></Button>
          </div>
        ) : (
          <h1
            className="text-lg font-bold text-gray-900 flex-1 truncate cursor-pointer hover:text-brand group flex items-center gap-1"
            onClick={() => { setEditTitle(idea.title); setEditingTitle(true); }}
          >
            {idea.title}
            <Pencil className="h-3 w-3 text-gray-300 group-hover:text-brand shrink-0" />
          </h1>
        )}
        {user?.id === idea.createdBy.id && (
          <Button variant="ghost" size="icon-sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 text-error" />
          </Button>
        )}
      </div>

      {/* Meta */}
      <Card padding="compact">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">상태</label>
            <select
              value={idea.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="h-8 px-2 text-sm border border-gray-200 rounded-md bg-white"
            >
              {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">진행상태</label>
            <select
              value={idea.devStatus ?? ''}
              onChange={(e) => handleDevStatusChange(e.target.value)}
              className="h-8 px-2 text-sm border border-gray-200 rounded-md bg-white"
            >
              {DEV_STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">작성자</label>
            <span className="text-sm text-gray-700">{idea.createdBy.name}</span>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">생성일</label>
            <span className="text-sm text-gray-700">
              {formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true, locale: ko })}
            </span>
          </div>
          <div className="ml-auto">
            <Button
              variant={idea.hasVoted ? 'default' : 'outline'}
              size="sm"
              onClick={handleVote}
            >
              <ThumbsUp className="h-4 w-4" />
              {idea._count?.votes || 0}
            </Button>
          </div>
        </div>
        {tagLinks.length > 0 && (
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {tagLinks.map(({ tag }) => (
              <span
                key={tag.name}
                className="text-2xs px-1.5 py-0.5 rounded"
                style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </Card>

      {/* Description */}
      <Card>
        {editingDesc ? (
          <div className="space-y-2">
            <textarea
              className="w-full text-sm text-gray-700 border border-brand rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand resize-y min-h-[80px]"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              rows={4}
              autoFocus
            />
            <div className="flex gap-1 justify-end">
              <Button size="xs" onClick={handleDescSave}>저장</Button>
              <Button variant="ghost" size="xs" onClick={() => setEditingDesc(false)}>취소</Button>
            </div>
          </div>
        ) : (
          <div
            className="cursor-pointer hover:bg-gray-50 rounded-md p-1 -m-1 transition-colors group"
            onClick={() => { setEditDesc(idea.description || ''); setEditingDesc(true); }}
          >
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {idea.description || <span className="text-gray-400 italic">설명을 추가하세요...</span>}
            </p>
            <Pencil className="h-3 w-3 text-gray-300 group-hover:text-brand mt-1" />
          </div>
        )}
      </Card>

      {/* Media Section */}
      <MediaSection
        attachments={(idea as IdeaDetail).attachments || []}
        onUploadFile={handleFileUpload}
        onAddYoutubeLink={handleAddYoutube}
        onDelete={handleDeleteAttachment}
        isUploading={uploadAttachment.isPending}
      />

      {/* Comments */}
      <Card>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">댓글 ({idea.comments?.length || 0})</h3>
        <div className="space-y-3 mb-4">
          {((idea as IdeaDetail).comments || []).map((c: IdeaCommentType) => (
              <div key={c.id} className="flex gap-2">
                <div className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600 shrink-0">
                  {c.user.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="font-medium text-gray-700">{c.user.name}</span>
                    <span>{formatDistanceToNow(new Date(c.createdAt), { addSuffix: true, locale: ko })}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-0.5 whitespace-pre-wrap">{c.content}</p>
                </div>
              </div>
          ))}
        </div>

        <form onSubmit={handleComment} className="flex gap-2">
          <Input
            placeholder="댓글을 입력하세요..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            inputSize="sm"
          />
          <Button type="submit" size="sm" isLoading={addComment.isPending} disabled={!comment.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </Card>
    </div>
  );
}
