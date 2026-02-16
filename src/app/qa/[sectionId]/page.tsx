"use client";

import { useParams, useRouter } from "next/navigation";
import { QA_SECTIONS } from "../qa-data";
import { useQACheck } from "../use-qa-check";

export default function SectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const sectionId = params.sectionId as string;
  const { checks, loaded, toggle, checkAll, resetSection, getProgress } =
    useQACheck();

  const section = QA_SECTIONS.find((s) => s.id === sectionId);

  if (!loaded) {
    return (
      <div className="p-4 space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-5 w-32 bg-gray-100 rounded animate-pulse" />
            {Array.from({ length: 3 }).map((_, j) => (
              <div
                key={j}
                className="h-12 bg-gray-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (!section) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <p className="text-gray-500 mb-4">존재하지 않는 섹션입니다</p>
        <button
          onClick={() => router.push("/qa")}
          className="text-brand text-sm font-medium"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  const progress = getProgress(section);
  const pct =
    progress.total === 0
      ? 0
      : Math.round((progress.checked / progress.total) * 100);
  const isDone = progress.checked === progress.total;

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => router.push("/qa")}
              className="p-1 -ml-1 text-gray-500 hover:text-gray-900"
              aria-label="뒤로가기"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-900 truncate">
              {section.title}
            </h1>
          </div>
          {section.description && (
            <p className="text-xs text-gray-400 mb-2 ml-7">
              {section.description}
            </p>
          )}
          <div className="flex items-center gap-2 ml-7">
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${pct}%`,
                  backgroundColor: isDone ? "#00C851" : "#3182F6",
                }}
              />
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {progress.checked}/{progress.total}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex border-t border-gray-100 divide-x divide-gray-100">
          <button
            onClick={() => checkAll(section)}
            disabled={isDone}
            className="flex-1 py-2 text-xs font-medium text-brand hover:bg-blue-50 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors"
          >
            전체 체크
          </button>
          <button
            onClick={() => {
              if (window.confirm("이 섹션의 체크를 모두 초기화할까요?")) {
                resetSection(section);
              }
            }}
            disabled={progress.checked === 0}
            className="flex-1 py-2 text-xs font-medium text-gray-500 hover:bg-gray-50 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors"
          >
            초기화
          </button>
        </div>
      </div>

      {/* Checklist */}
      <div className="p-4 space-y-6">
        {section.subsections.map((sub) => {
          const subChecked = sub.items.filter((item) => checks[item.id]).length;
          const subDone = subChecked === sub.items.length;

          return (
            <div key={sub.id}>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-sm font-semibold text-gray-900">
                  {sub.title}
                </h2>
                {subDone ? (
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2.5 6L5 8.5L9.5 3.5"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                ) : (
                  <span className="text-xs text-gray-400">
                    {subChecked}/{sub.items.length}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                {sub.items.map((item) => {
                  const isChecked = !!checks[item.id];
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors active:bg-gray-50 ${
                        isChecked
                          ? "bg-green-50/50"
                          : "bg-white border border-gray-100"
                      }`}
                    >
                      <div
                        className={`shrink-0 mt-0.5 w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${
                          isChecked
                            ? "bg-brand border-brand"
                            : "border-gray-300"
                        }`}
                      >
                        {isChecked && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M2.5 6L5 8.5L9.5 3.5"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-sm leading-relaxed ${
                          isChecked
                            ? "text-gray-400 line-through"
                            : "text-gray-700"
                        }`}
                      >
                        {item.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
