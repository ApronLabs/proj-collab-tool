'use client';

import { ArrowDown } from 'lucide-react';
import { AnnotationViewer } from './annotation-viewer';
import { getPageById } from '@/lib/page-registry';
import type { ScreenReferenceData, Annotation } from '@/lib/types';

interface FlowViewerProps {
  screenRefs: ScreenReferenceData[];
}

export function FlowViewer({ screenRefs }: FlowViewerProps) {
  if (screenRefs.length === 0) return null;

  const sorted = [...screenRefs].sort((a, b) => a.stepOrder - b.stepOrder);
  const isFlow = sorted.length > 1;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-900">
        {isFlow ? '재현 플로우' : '화면 참조'}
      </h3>

      {sorted.map((ref, index) => {
        const page = getPageById(ref.pageId);
        const annotations: Annotation[] = ref.annotations
          ? JSON.parse(ref.annotations)
          : [];

        return (
          <div key={ref.id}>
            <div className="border border-gray-200 rounded-md overflow-hidden">
              {/* Step header */}
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50">
                {isFlow && (
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold shrink-0">
                    {index + 1}
                  </span>
                )}
                <span className="text-sm font-medium text-gray-700">
                  {page?.name || ref.pageId}
                </span>
                {page && (
                  <span className="text-xs text-gray-400">{page.route}</span>
                )}
              </div>

              {/* Screenshot + annotations */}
              {ref.screenshotUrl && (
                <div className="p-2">
                  {annotations.length > 0 ? (
                    <AnnotationViewer imageUrl={ref.screenshotUrl} annotations={annotations} />
                  ) : (
                    <img
                      src={ref.screenshotUrl}
                      alt={page?.name || 'Screenshot'}
                      className="w-full rounded border border-gray-100"
                    />
                  )}
                </div>
              )}

              {/* Description */}
              {ref.description && (
                <div className="px-3 pb-2">
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{ref.description}</p>
                </div>
              )}
            </div>

            {/* Connector arrow */}
            {isFlow && index < sorted.length - 1 && (
              <div className="flex justify-center py-1">
                <ArrowDown className="h-5 w-5 text-blue-300" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
