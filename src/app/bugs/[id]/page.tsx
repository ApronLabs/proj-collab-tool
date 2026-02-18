'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ArrowLeft, Send, Github, Trash2, ExternalLink } from 'lucide-react';
import { useBug, useUpdateBug, useDeleteBug, useAddBugComment, useUploadBugAttachment, useAddBugYoutubeLink, useDeleteBugAttachment, useUnlinkBugGithub } from '@/lib/hooks/use-bugs';
import { useScreenReferences } from '@/lib/hooks/use-screen-references';
import { Button, Card, Input } from '@/components/ui';
import { useAuth } from '@/components/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { MediaSection } from '@/components/media/media-section';
import { FlowViewer } from '@/components/screen-ref/flow-viewer';
import Link from 'next/link';
import type { BugDetail, BugComment as BugCommentType, BugGithubLink } from '@/lib/types';

const STATUS_OPTIONS = [
  { value: 'open', label: '등록' },
  { value: 'in_progress', label: '진행중' },
  { value: 'on_hold', label: '보류' },
  { value: 're_request', label: '재요청' },
  { value: 'resolved', label: '완료' },
];

const PRIORITY_OPTIONS = [
  { value: 'low', label: '낮음' },
  { value: 'medium', label: '보통' },
  { value: 'high', label: '높음' },
  { value: 'critical', label: '긴급' },
];

export default function BugDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const { data: bug, isLoading } = useBug(id);
  const updateBug = useUpdateBug();
  const deleteBug = useDeleteBug();
  const addComment = useAddBugComment();
  const uploadAttachment = useUploadBugAttachment();
  const addYoutubeLink = useAddBugYoutubeLink();
  const deleteAttachment = useDeleteBugAttachment();
  const unlinkGithub = useUnlinkBugGithub();
  const { data: screenRefs } = useScreenReferences('bug', id);

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

  if (!bug) {
    return <div className="text-center py-12 text-gray-500">버그를 찾을 수 없습니다</div>;
  }

  const handleStatusChange = async (status: string) => {
    await updateBug.mutateAsync({ id, status });
    toast.success('상태가 변경되었습니다');
  };

  const handlePriorityChange = async (priority: string) => {
    await updateBug.mutateAsync({ id, priority });
    toast.success('우선순위가 변경되었습니다');
  };

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await deleteBug.mutateAsync(id);
    toast.success('삭제되었습니다');
    router.push('/bugs');
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    await addComment.mutateAsync({ bugId: id, content: comment });
    setComment('');
    toast.success('댓글이 추가되었습니다');
  };

  const handleFileUpload = async (file: File) => {
    try {
      await uploadAttachment.mutateAsync({ bugId: id, file });
      toast.success('파일이 업로드되었습니다');
    } catch {
      toast.error('업로드에 실패했습니다');
    }
  };

  const handleAddYoutube = async (youtubeUrl: string, title?: string) => {
    try {
      await addYoutubeLink.mutateAsync({ bugId: id, youtubeUrl, title });
      toast.success('YouTube 링크가 추가되었습니다');
    } catch {
      toast.error('추가에 실패했습니다');
    }
  };

  const handleDeleteAttachment = async (attachmentId: string) => {
    try {
      await deleteAttachment.mutateAsync({ bugId: id, attachmentId });
      toast.success('삭제되었습니다');
    } catch {
      toast.error('삭제에 실패했습니다');
    }
  };

  const handleUnlinkGithub = async (linkId: string) => {
    await unlinkGithub.mutateAsync({ bugId: id, linkId });
    toast.success('GitHub 연결이 해제되었습니다');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Link href="/bugs">
          <Button variant="ghost" size="icon-sm"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <h1 className="text-lg font-bold text-gray-900 flex-1 truncate">{bug.title}</h1>
        {user?.id === bug.createdBy.id && (
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
              value={bug.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="h-8 px-2 text-sm border border-gray-200 rounded-md bg-white"
            >
              {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">우선순위</label>
            <select
              value={bug.priority}
              onChange={(e) => handlePriorityChange(e.target.value)}
              className="h-8 px-2 text-sm border border-gray-200 rounded-md bg-white"
            >
              {PRIORITY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">작성자</label>
            <span className="text-sm text-gray-700">{bug.createdBy.name}</span>
          </div>
          {bug.repo && (
            <div>
              <label className="text-xs text-gray-500 block mb-1">레포</label>
              <span className="text-sm text-gray-700">{bug.repo}</span>
            </div>
          )}
          <div>
            <label className="text-xs text-gray-500 block mb-1">생성일</label>
            <span className="text-sm text-gray-700">
              {formatDistanceToNow(new Date(bug.createdAt), { addSuffix: true, locale: ko })}
            </span>
          </div>
        </div>
      </Card>

      {/* Description */}
      {bug.description && (
        <Card>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{bug.description}</p>
        </Card>
      )}

      {/* Screen References / Flow */}
      {screenRefs && screenRefs.length > 0 && (
        <Card>
          <FlowViewer screenRefs={screenRefs} />
        </Card>
      )}

      {/* GitHub Links */}
      {bug.githubLinks?.length > 0 && (
        <Card>
          <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
            <Github className="h-4 w-4" /> GitHub 연결
          </h3>
          <div className="space-y-2">
            {(bug as BugDetail).githubLinks.map((link: BugGithubLink) => (
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
        attachments={(bug as BugDetail).attachments || []}
        onUploadFile={handleFileUpload}
        onAddYoutubeLink={handleAddYoutube}
        onDelete={handleDeleteAttachment}
        isUploading={uploadAttachment.isPending}
      />

      {/* Comments */}
      <Card>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">댓글 ({bug.comments?.length || 0})</h3>
        <div className="space-y-3 mb-4">
          {((bug as BugDetail).comments || []).map((c: BugCommentType) => (
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
