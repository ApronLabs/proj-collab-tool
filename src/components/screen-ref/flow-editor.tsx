'use client';

import { useState } from 'react';
import { Plus, ChevronUp, ChevronDown, Trash2, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui';
import { Textarea } from '@/components/ui/textarea';
import { PageSelector } from './page-selector';
import { AnnotationEditor } from './annotation-editor';
import type { Annotation, PendingScreenRef } from '@/lib/types';

interface FlowEditorProps {
  steps: PendingScreenRef[];
  onChange: (steps: PendingScreenRef[]) => void;
}

export function FlowEditor({ steps, onChange }: FlowEditorProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const addStep = () => {
    const newStep: PendingScreenRef = {
      pageId: '',
      stepOrder: steps.length,
      screenshotUrl: null,
      annotations: [],
      description: '',
    };
    onChange([...steps, newStep]);
    setExpandedStep(steps.length);
  };

  const removeStep = (index: number) => {
    const updated = steps.filter((_, i) => i !== index).map((s, i) => ({ ...s, stepOrder: i }));
    onChange(updated);
    if (expandedStep === index) setExpandedStep(null);
    else if (expandedStep !== null && expandedStep > index) setExpandedStep(expandedStep - 1);
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= steps.length) return;
    const updated = [...steps];
    [updated[index], updated[target]] = [updated[target], updated[index]];
    onChange(updated.map((s, i) => ({ ...s, stepOrder: i })));
    setExpandedStep(target);
  };

  const updateStep = (index: number, partial: Partial<PendingScreenRef>) => {
    const updated = steps.map((s, i) => (i === index ? { ...s, ...partial } : s));
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div key={index}>
          {/* Step card */}
          <div className="border border-gray-200 rounded-md overflow-hidden">
            {/* Step header */}
            <button
              type="button"
              onClick={() => setExpandedStep(expandedStep === index ? null : index)}
              className="w-full flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold shrink-0">
                {index + 1}
              </span>
              <span className="flex-1 text-sm text-gray-700 truncate">
                {step.pageId
                  ? `${step.description || step.pageId}`
                  : '화면을 선택하세요'}
              </span>
              <div className="flex items-center gap-0.5 shrink-0">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); moveStep(index, 'up'); }}
                  disabled={index === 0}
                  className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); moveStep(index, 'down'); }}
                  disabled={index === steps.length - 1}
                  className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeStep(index); }}
                  className="p-0.5 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </button>

            {/* Step content (expanded) */}
            {expandedStep === index && (
              <div className="p-3 space-y-3 border-t border-gray-200">
                <PageSelector
                  selectedPageId={step.pageId || null}
                  screenshotUrl={step.screenshotUrl}
                  onSelect={(pageId) => updateStep(index, { pageId })}
                  onScreenshotCaptured={(url) => updateStep(index, { screenshotUrl: url })}
                />

                {step.screenshotUrl && (
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">어노테이션</label>
                    <AnnotationEditor
                      imageUrl={step.screenshotUrl}
                      annotations={step.annotations}
                      onChange={(annotations) => updateStep(index, { annotations })}
                    />
                  </div>
                )}

                <Textarea
                  label="설명"
                  placeholder="이 단계에 대한 설명을 입력하세요"
                  value={step.description}
                  onChange={(e) => updateStep(index, { description: e.target.value })}
                  rows={2}
                />
              </div>
            )}
          </div>

          {/* Connector arrow between steps */}
          {index < steps.length - 1 && (
            <div className="flex justify-center py-1">
              <ArrowDown className="h-4 w-4 text-gray-300" />
            </div>
          )}
        </div>
      ))}

      <Button type="button" variant="outline" size="sm" onClick={addStep} className="w-full">
        <Plus className="h-4 w-4" /> 단계 추가
      </Button>
    </div>
  );
}
