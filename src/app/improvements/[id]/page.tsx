'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ArrowLeft, Send, Github, Trash2, ExternalLink } from 'lucide-react';
import { useImprovement, useUpdateImprovement, useDeleteImprovement, useAddImprovementComment, useUploadImprovementAttachment, useAddImprovementYoutubeLink, useDeleteImprovementAttachment, useUnlinkImprovementGithub } from '@/lib/hooks/use-improvements';
import { Button, Card, Input } from '@/components/ui';
import { useAuth } from '@/components/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { MediaSection } from '@/components/media/media-section';
import Link from 'next/link';
import type { ImprovementDetail, ImprovementComment as ImprovementCommentType, ImprovementGithubLink } from '@/lib/types';

const STATUS_OPTIONS = [
  { value: 'open', label: '등록' },
  { value: 'in_progress', label: '진행중' },
  { value: 'resolved', label: '완료' },
];

const PRIORITY_OPTIONS = [
  { value: 'low', label: '낮음' },
  { value: 'medium', label: '보통' },
  { value: 'high', label: '높음' },
  { value: 'critical', label: '긴급' },
];

export default function ImprovementDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const { data: improvement, isLoading } = useImprovement(id);
  const updateImprovement = useUpdateImprovement();
  const deleteImprovement = useDeleteImprovement();
  const addComment = useAddImprovementComment();
  const uploadAttachment = useUploadImprovementAttachment();
  const addYoutubeLink = useAddImprovementYoutubeLink();
  const deleteAttachment = useDeleteImprovementAttachment();
  const unlinkGithub = useUnlinkImprovementGithub();

  const [comment, setComment] = useState('');

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (!improvement) {
    return <div className="text-center py-12 text-gray-500">항목을 찾을 수 없습니다</div>;
  }

  const handleStatusChange = async (status: string) => {
    await updateImprovement.mutateAsync({ id, status });
    toast.success('상태가 변경되었습니다');
  };

  const handlePriorityChange = async (priority: string) => {
    await updateImprovement.mutateAsync({ id, priority });
    toast.success('우선순위가 변경되었습니다');
  };

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await deleteImprovement.mutateAsync(id);
    toast.success('삭제되었습니다');
    router.push('/improvements');
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    await addComment.mutateAsync({ improvementId: id, content: comment });
    setComment('');
    toast.success('댓글이 추가되었습니다');
  };

  const handleFileUpload = async (file: File) => {
    try {
      await uploadAttachment.mutateAsync({ improvementId: id, file });
      toast.success('파일이 업로드되었습니다');
    } catch {
      toast.error('업로드에 실패했습니다');
    }
  };

  const handleAddYoutube = async (youtubeUrl: string, title?: string) => {
    try {
      await addYoutubeLink.mutateAsync({ improvementId: id, youtubeUrl, title });
      toast.success('YouTube 링크가 추가되었습니다');
    } catch {
      toast.error('추가에 실패했습니다');
    }
  };

  const handleDeleteAttachment = async (attachmentId: string) => {
    try {
      await deleteAttachment.mutateAsync({ improvementId: id, attachmentId });
      toast.success('삭제되었습니다');
    } catch {
      toast.error('삭제에 실패했습니다');
    }
  };

  const handleUnlinkGithub = async (linkId: string) => {
    await unlinkGithub.mutateAsync({ improvementId: id, linkId });
    toast.success('GitHub 연결이 해제되었습니다');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Link href="/improvements">
          <Button variant="ghost" size="icon-sm"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <h1 className="text-lg font-bold text-gray-900 flex-1 truncate">{improvement.title}</h1>
        {user?.id === improvement.createdBy.id && (
          <Button variant="ghost" size="icon-sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 text-error" />
          </Button>
        )}
      </div>

      {/* Status & Priority */}
      <Card padding="compact">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1">상태</label>
            <select
              value={improvement.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="h-8 px-2 text-sm border border-gray-200 rounded-md bg-white"
            >
              {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">우선순위</label>
            <select
              value={improvement.priority}
              onChange={(e) => handlePriorityChange(e.target.value)}
              className="h-8 px-2 text-sm border border-gray-200 rounded-md bg-white"
            >
              {PRIORITY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">작성자</label>
            <span className="text-sm text-gray-700">{improvement.createdBy.name}</span>
          </div>
          {improvement.repo && (
            <div>
              <label className="text-xs text-gray-500 block mb-1">레포</label>
              <span className="text-sm text-gray-700">{improvement.repo}</span>
            </div>
          )}
          <div>
            <label className="text-xs text-gray-500 block mb-1">생성일</label>
            <span className="text-sm text-gray-700">
              {formatDistanceToNow(new Date(improvement.createdAt), { addSuffix: true, locale: ko })}
            </span>
          </div>
        </div>
      </Card>

      {/* Description */}
      {improvement.description && (
        <Card>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{improvement.description}</p>
        </Card>
      )}

      {/* GitHub Links */}
      {improvement.githubLinks?.length > 0 && (
        <Card>
          <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
            <Github className="h-4 w-4" /> GitHub 연결
          </h3>
          <div className="space-y-2">
            {(improvement as ImprovementDetail).githubLinks.map((link: ImprovementGithubLink) => (
              <div key={link.id} className="flex items-center justify-between text-sm">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline flex items-center gap-1"
                >
                  {link.githubType === 'pr' ? 'PR' : 'Issue'} #{link.number}: {link.title}
                  <ExternalLink className="h-3 w-3" />
                </a>
                <Button variant="ghost" size="xs" onClick={() => handleUnlinkGithub(link.id)}>
                  해제
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Media Section */}
      <MediaSection
        attachments={(improvement as ImprovementDetail).attachments || []}
        onUploadFile={handleFileUpload}
        onAddYoutubeLink={handleAddYoutube}
        onDelete={handleDeleteAttachment}
        isUploading={uploadAttachment.isPending}
      />

      {/* Comments */}
      <Card>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">댓글 ({improvement.comments?.length || 0})</h3>
        <div className="space-y-3 mb-4">
          {((improvement as ImprovementDetail).comments || []).map((c: ImprovementCommentType) => (
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
