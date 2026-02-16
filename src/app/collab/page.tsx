"use client";

import { useRouter } from "next/navigation";
import { QA_SECTIONS, getSectionItemCount } from "./qa-data";
import { useQACheck } from "./use-qa-check";

function ProgressBar({ checked, total }: { checked: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((checked / total) * 100);
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${pct}%`,
            backgroundColor: pct === 100 ? "#00C851" : "#3182F6",
          }}
        />
      </div>
      <span className="text-xs text-gray-500 whitespace-nowrap w-10 text-right">
        {pct}%
      </span>
    </div>
  );
}

export default function CollabPage() {
  const router = useRouter();
  const { getProgress, resetAll, loaded } = useQACheck();

  if (!loaded) {
    return (
      <div className="p-4 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-20 bg-gray-100 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  const totalProgress = getProgress();

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg font-semibold text-gray-900">
            QA 테스트 가이드
          </h1>
          {totalProgress.checked > 0 && (
            <button
              onClick={() => {
                if (window.confirm("모든 체크를 초기화할까요?")) {
                  resetAll();
                }
              }}
              className="text-xs text-gray-500 hover:text-error px-2 py-1 rounded"
            >
              전체 초기화
            </button>
          )}
        </div>
        <ProgressBar
          checked={totalProgress.checked}
          total={totalProgress.total}
        />
        <p className="text-xs text-gray-500 mt-1">
          {totalProgress.checked}/{totalProgress.total}개 완료
        </p>
      </div>

      {/* Section List */}
      <div className="p-4 space-y-2">
        {QA_SECTIONS.map((section, idx) => {
          const progress = getProgress(section);
          const itemCount = getSectionItemCount(section);
          const isDone = progress.checked === progress.total;

          return (
            <button
              key={section.id}
              onClick={() => router.push(`/collab/${section.id}`)}
              className="w-full text-left bg-white border border-gray-200 rounded-lg p-4 hover:border-brand active:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs text-gray-400 font-medium">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium text-gray-900 text-sm truncate">
                    {section.title}
                  </span>
                </div>
                {isDone ? (
                  <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                    완료
                  </span>
                ) : progress.checked > 0 ? (
                  <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {progress.checked}/{itemCount}
                  </span>
                ) : (
                  <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-500">
                    {itemCount}개
                  </span>
                )}
              </div>
              {section.description && (
                <p className="text-xs text-gray-400 mb-2 ml-6">
                  {section.description}
                </p>
              )}
              <div className="ml-6">
                <ProgressBar
                  checked={progress.checked}
                  total={progress.total}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
