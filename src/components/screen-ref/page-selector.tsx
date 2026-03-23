'use client';

import { useState } from 'react';
import { Monitor, Camera, Loader2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui';
import { PAGE_REGISTRY, PAGE_CATEGORIES, type PageEntry } from '@/lib/page-registry';
import { useCaptureScreenshot } from '@/lib/hooks/use-screen-references';

interface PageSelectorProps {
  selectedPageId: string | null;
  screenshotUrl: string | null;
  onSelect: (pageId: string) => void;
  onScreenshotCaptured: (url: string) => void;
}

export function PageSelector({
  selectedPageId,
  screenshotUrl,
  onSelect,
  onScreenshotCaptured,
}: PageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const capture = useCaptureScreenshot();

  const selectedPage = PAGE_REGISTRY.find((p) => p.id === selectedPageId);

  const handleSelect = (page: PageEntry) => {
    onSelect(page.id);
    setIsOpen(false);
  };

  const handleCapture = async () => {
    if (!selectedPageId) return;
    try {
      const result = await capture.mutateAsync({ pageId: selectedPageId });
      onScreenshotCaptured(result.screenshotUrl);
    } catch {
      // error handled by mutation
    }
  };

  return (
    <div className="space-y-2">
      {/* Page selector dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between h-11 px-4 text-sm border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Monitor className="h-4 w-4 text-gray-400" />
            {selectedPage ? (
              <span className="text-gray-900">{selectedPage.name}</span>
            ) : (
              <span className="text-gray-400">화면을 선택하세요</span>
            )}
          </span>
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-y-auto">
            {PAGE_CATEGORIES.map((category) => {
              const pages = PAGE_REGISTRY.filter((p) => p.category === category);
              if (pages.length === 0) return null;
              return (
                <div key={category}>
                  <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 bg-gray-50 sticky top-0">
                    {category}
                  </div>
                  {pages.map((page) => (
                    <button
                      key={page.id}
                      type="button"
                      onClick={() => handleSelect(page)}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 transition-colors ${
                        selectedPageId === page.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {page.name}
                      <span className="text-xs text-gray-400 ml-2">{page.route}</span>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Capture button */}
      {selectedPageId && (
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCapture}
            disabled={capture.isPending}
          >
            {capture.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Camera className="h-4 w-4" />
            )}
            {capture.isPending ? '캡처 중...' : '화면 캡처'}
          </Button>
          {capture.isError && (
            <span className="text-xs text-red-500">캡처 실패: {capture.error.message}</span>
          )}
        </div>
      )}

      {/* Screenshot preview */}
      {screenshotUrl && (
        <div className="relative border border-gray-200 rounded-md overflow-hidden">
          <img
            src={screenshotUrl}
            alt={selectedPage?.name || 'Screenshot'}
            className="w-full max-h-[400px] object-contain bg-gray-50"
          />
        </div>
      )}
    </div>
  );
}
