'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCreateImprovement, useUploadImprovementAttachment, useAddImprovementYoutubeLink } from '@/lib/hooks/use-improvements';
import { useCreateScreenReference } from '@/lib/hooks/use-screen-references';
import { useCreateGithubIssue } from '@/lib/hooks/use-github';
import { Button, Input, Card } from '@/components/ui';
import { Textarea } from '@/components/ui/textarea';
import { MediaPicker, type PendingFile, type PendingYoutube } from '@/components/media/media-picker';
import { FlowEditor } from '@/components/screen-ref/flow-editor';
import { Monitor } from 'lucide-react';
import type { PendingScreenRef } from '@/lib/types';

const REPOS = ['ApronLabs/apronlabs-pwa', 'ApronLabs/barcode-scanner'];
const PRIORITIES = [
  { value: 'low', label: '낮음' },
  { value: 'medium', label: '보통' },
  { value: 'high', label: '높음' },
  { value: 'critical', label: '긴급' },
];

export default function NewImprovementPage() {
  const router = useRouter();
  const createImprovement = useCreateImprovement();
  const uploadAttachment = useUploadImprovementAttachment();
  const addYoutubeLink = useAddImprovementYoutubeLink();
  const createGithubIssue = useCreateGithubIssue();
  const createScreenRef = useCreateScreenReference();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [repo, setRepo] = useState('');
  const [createGithub, setCreateGithub] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [pendingYoutubeLinks, setPendingYoutubeLinks] = useState<PendingYoutube[]>([]);
  const [screenRefSteps, setScreenRefSteps] = useState<PendingScreenRef[]>([]);
  const [showScreenRef, setShowScreenRef] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      const improvement = await createImprovement.mutateAsync({ title, description, priority, repo });

      // Upload files, YouTube links, and screen references in parallel
      await Promise.all([
        ...pendingFiles.map((f) => uploadAttachment.mutateAsync({ improvementId: improvement.id, file: f.file })),
        ...pendingYoutubeLinks.map((yt) => addYoutubeLink.mutateAsync({ improvementId: improvement.id, youtubeUrl: yt.url })),
        ...screenRefSteps
          .filter((s) => s.pageId)
          .map((s) =>
            createScreenRef.mutateAsync({
              entityType: 'improvement',
              entityId: improvement.id,
              stepOrder: s.stepOrder,
              pageId: s.pageId,
              screenshotUrl: s.screenshotUrl,
              annotations: s.annotations.length > 0 ? s.annotations : undefined,
              description: s.description,
            })
          ),
      ]);

      if (createGithub && repo) {
        await createGithubIssue.mutateAsync({
          bugId: improvement.id,
          repo,
          title,
          body: description || '',
        });
      }

      toast.success('항목이 등록되었습니다');
      router.push(`/improvements/${improvement.id}`);
    } catch {
      toast.error('등록에 실패했습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-4">새 추가/개선 항목 등록</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="제목"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Textarea
            label="설명"
            placeholder="추가 또는 개선 사항에 대해 자세히 설명해주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">미디어</label>
            <MediaPicker
              files={pendingFiles}
              youtubeLinks={pendingYoutubeLinks}
              onAddFiles={(newFiles) => setPendingFiles((prev) => [...prev, ...newFiles])}
              onRemoveFile={(i) => setPendingFiles((prev) => prev.filter((_, idx) => idx !== i))}
              onAddYoutube={(link) => setPendingYoutubeLinks((prev) => [...prev, link])}
              onRemoveYoutube={(i) => setPendingYoutubeLinks((prev) => prev.filter((_, idx) => idx !== i))}
            />
          </div>

          {/* Screen Reference Section */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-gray-700">화면 참조 / 재현 플로우</label>
              <Button
                type="button"
                variant={showScreenRef ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setShowScreenRef(!showScreenRef);
                  if (!showScreenRef && screenRefSteps.length === 0) {
                    setScreenRefSteps([{
                      pageId: '',
                      stepOrder: 0,
                      screenshotUrl: null,
                      annotations: [],
                      description: '',
                    }]);
                  }
                }}
              >
                <Monitor className="h-4 w-4" />
                {showScreenRef ? '접기' : '화면 참조 추가'}
              </Button>
            </div>
            {showScreenRef && (
              <FlowEditor steps={screenRefSteps} onChange={setScreenRefSteps} />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">우선순위</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full h-11 px-4 text-base border border-gray-200 rounded-md bg-white focus:ring-2 focus:ring-brand focus:border-transparent"
              >
                {PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">레포지토리</label>
              <select
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                className="w-full h-11 px-4 text-base border border-gray-200 rounded-md bg-white focus:ring-2 focus:ring-brand focus:border-transparent"
              >
                <option value="">선택 안함</option>
                {REPOS.map((r) => (
                  <option key={r} value={r}>{r.split('/')[1]}</option>
                ))}
              </select>
            </div>
          </div>

          {repo && (
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={createGithub}
                onChange={(e) => setCreateGithub(e.target.checked)}
                className="rounded border-gray-300"
              />
              GitHub Issue도 동시에 생성
            </label>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={() => router.back()}>
              취소
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              등록
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
