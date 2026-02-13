'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCreateIdea, useTags } from '@/lib/hooks/use-ideas';
import { Button, Input, Card } from '@/components/ui';
import { Textarea } from '@/components/ui/textarea';

export default function NewIdeaPage() {
  const router = useRouter();
  const createIdea = useCreateIdea();
  const { data: tags } = useTags();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const idea = await createIdea.mutateAsync({
        title,
        description,
        tagIds: selectedTags,
      });
      toast.success('아이디어가 등록되었습니다');
      router.push(`/ideas/${idea.id}`);
    } catch {
      toast.error('등록에 실패했습니다');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-4">새 아이디어</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="제목"
            placeholder="아이디어 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Textarea
            label="설명"
            placeholder="아이디어에 대해 자세히 설명해주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
          />

          {tags?.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">태그</label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: { id: string; name: string; color: string }) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors border ${
                      selectedTags.includes(tag.id)
                        ? 'border-brand bg-brand/10 text-brand'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={() => router.back()}>
              취소
            </Button>
            <Button type="submit" isLoading={createIdea.isPending}>
              등록
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
