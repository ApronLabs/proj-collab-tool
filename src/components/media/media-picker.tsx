'use client';

import { useState, useRef, useEffect } from 'react';
import { Paperclip, Youtube, X, Plus, Clipboard } from 'lucide-react';
import { Button } from '@/components/ui';
import { extractYouTubeId } from './youtube-embed';

export interface PendingFile {
  file: File;
  preview: string;
}

export interface PendingYoutube {
  url: string;
}

interface MediaPickerProps {
  files: PendingFile[];
  youtubeLinks: PendingYoutube[];
  onAddFiles: (files: PendingFile[]) => void;
  onRemoveFile: (index: number) => void;
  onAddYoutube: (link: PendingYoutube) => void;
  onRemoveYoutube: (index: number) => void;
}

export function MediaPicker({
  files,
  youtubeLinks,
  onAddFiles,
  onRemoveFile,
  onAddYoutube,
  onRemoveYoutube,
}: MediaPickerProps) {
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles: PendingFile[] = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const preview = file.type.startsWith('image/')
        ? URL.createObjectURL(file)
        : '';
      newFiles.push({ file, preview });
    }
    onAddFiles(newFiles);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddYoutube = () => {
    if (!youtubeUrl.trim()) return;
    onAddYoutube({ url: youtubeUrl.trim() });
    setYoutubeUrl('');
    setShowYoutubeInput(false);
  };

  const handlePaste = (e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    const imageFiles: PendingFile[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          const ext = file.type.split('/')[1] || 'png';
          const namedFile = new File([file], `pasted-image-${Date.now()}.${ext}`, { type: file.type });
          imageFiles.push({
            file: namedFile,
            preview: URL.createObjectURL(namedFile),
          });
        }
      }
    }
    if (imageFiles.length > 0) {
      e.preventDefault();
      onAddFiles(imageFiles);
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handler = (e: Event) => handlePaste(e as ClipboardEvent);
    el.addEventListener('paste', handler);
    return () => el.removeEventListener('paste', handler);
  });

  return (
    <div ref={containerRef} tabIndex={0} className="space-y-3 outline-none focus:ring-2 focus:ring-brand/20 rounded-md p-1 -m-1">
      {/* Paste hint */}
      <p className="text-xs text-gray-400">Ctrl+V (Cmd+V) 로 클립보드 이미지를 바로 붙여넣을 수 있습니다</p>

      {/* Preview area */}
      {(files.length > 0 || youtubeLinks.length > 0) && (
        <div className="space-y-2">
          {/* Image previews */}
          {files.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {files.map((f, i) => (
                <div key={i} className="relative group">
                  {f.preview ? (
                    <img
                      src={f.preview}
                      alt={f.file.name}
                      className="w-full h-20 object-cover rounded-md border border-gray-200"
                    />
                  ) : (
                    <div className="w-full h-20 flex items-center justify-center bg-gray-50 rounded-md border border-gray-200 text-xs text-gray-500 px-1 truncate">
                      {f.file.name}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => onRemoveFile(i)}
                    className="absolute top-1 right-1 h-5 w-5 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* YouTube link previews */}
          {youtubeLinks.map((yt, i) => {
            const videoId = extractYouTubeId(yt.url);
            return (
              <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md border border-gray-200">
                {videoId && (
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                    alt="YouTube thumbnail"
                    className="w-20 h-14 object-cover rounded"
                  />
                )}
                <span className="flex-1 text-sm text-gray-700 truncate">{yt.url}</span>
                <button
                  type="button"
                  onClick={() => onRemoveYoutube(i)}
                  className="text-gray-400 hover:text-error shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf,.txt,.log"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="h-4 w-4" /> 파일 첨부
        </Button>
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() => setShowYoutubeInput(!showYoutubeInput)}
        >
          <Youtube className="h-4 w-4" /> YouTube
        </Button>
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
            type="button"
            onClick={handleAddYoutube}
            disabled={!youtubeUrl.trim()}
          >
            <Plus className="h-4 w-4" /> 추가
          </Button>
        </div>
      )}
    </div>
  );
}
