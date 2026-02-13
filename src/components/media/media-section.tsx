'use client';

import { useState, useRef, useEffect } from 'react';
import { Paperclip, Youtube, X, Plus, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui/card';
import { YouTubeEmbed } from './youtube-embed';
interface Attachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number | null;
  mimeType: string | null;
  createdAt: string;
}

interface MediaSectionProps {
  attachments: Attachment[];
  onUploadFile: (file: File) => Promise<void>;
  onAddYoutubeLink: (youtubeUrl: string, title?: string) => Promise<void>;
  onDelete: (attachmentId: string) => Promise<void>;
  isUploading?: boolean;
}

export function MediaSection({ attachments, onUploadFile, onAddYoutubeLink, onDelete, isUploading }: MediaSectionProps) {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);
  const [isAddingYoutube, setIsAddingYoutube] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageAttachments = attachments.filter((a) => a.mimeType?.startsWith('image/'));
  const youtubeAttachments = attachments.filter((a) => a.mimeType === 'youtube/link');
  const otherAttachments = attachments.filter(
    (a) => !a.mimeType?.startsWith('image/') && a.mimeType !== 'youtube/link'
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await onUploadFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddYoutube = async () => {
    if (!youtubeUrl.trim()) return;
    setIsAddingYoutube(true);
    try {
      await onAddYoutubeLink(youtubeUrl.trim());
      setYoutubeUrl('');
      setShowYoutubeInput(false);
    } finally {
      setIsAddingYoutube(false);
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            e.preventDefault();
            const ext = file.type.split('/')[1] || 'png';
            const namedFile = new File([file], `pasted-image-${Date.now()}.${ext}`, { type: file.type });
            onUploadFile(namedFile);
            return;
          }
        }
      }
    };

    el.addEventListener('paste', handlePaste);
    return () => el.removeEventListener('paste', handlePaste);
  });

  return (
    <div ref={containerRef} tabIndex={0} className="space-y-3 outline-none">
      {/* Images */}
      {imageAttachments.length > 0 && (
        <Card>
          <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
            <ImageIcon className="h-4 w-4" /> 이미지
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {imageAttachments.map((att) => (
              <div key={att.id} className="relative group">
                <a
                  href={att.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md overflow-hidden border border-gray-200 hover:border-brand transition-colors"
                >
                  <img src={att.fileUrl} alt={att.fileName} className="w-full h-24 object-cover" />
                </a>
                <button
                  onClick={() => onDelete(att.id)}
                  className="absolute top-1 right-1 h-5 w-5 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* YouTube */}
      {youtubeAttachments.length > 0 && (
        <Card>
          <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
            <Youtube className="h-4 w-4" /> YouTube
          </h3>
          <div className="space-y-3">
            {youtubeAttachments.map((att) => (
              <div key={att.id} className="relative group">
                <YouTubeEmbed url={att.fileUrl} title={att.fileName} />
                <button
                  onClick={() => onDelete(att.id)}
                  className="absolute top-2 right-2 h-6 w-6 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Other files */}
      {otherAttachments.length > 0 && (
        <Card>
          <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
            <Paperclip className="h-4 w-4" /> 파일
          </h3>
          <div className="space-y-1">
            {otherAttachments.map((att) => (
              <div key={att.id} className="flex items-center justify-between text-sm group">
                <a
                  href={att.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline truncate"
                >
                  {att.fileName}
                </a>
                <button
                  onClick={() => onDelete(att.id)}
                  className="text-gray-400 hover:text-error opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf,.txt,.log"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          isLoading={isUploading}
        >
          <Paperclip className="h-4 w-4" /> 파일 첨부
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowYoutubeInput(!showYoutubeInput)}
        >
          <Youtube className="h-4 w-4" /> YouTube
        </Button>
        <span className="text-xs text-gray-400 ml-1">Ctrl+V로 이미지 붙여넣기</span>
      </div>

      {/* YouTube URL input */}
      {showYoutubeInput && (
        <div className="flex gap-2">
          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="YouTube URL을 입력하세요"
            className="flex-1 h-8 px-3 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddYoutube();
              }
            }}
          />
          <Button
            size="sm"
            onClick={handleAddYoutube}
            disabled={!youtubeUrl.trim()}
            isLoading={isAddingYoutube}
          >
            <Plus className="h-4 w-4" /> 추가
          </Button>
        </div>
      )}
    </div>
  );
}
