'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowRight, Circle, Square, Type, Trash2, Palette } from 'lucide-react';
import { Button } from '@/components/ui';
import type { Annotation, AnnotationType } from '@/lib/types';

const COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#FFFFFF'];
const DEFAULT_COLOR = '#EF4444';

interface AnnotationEditorProps {
  imageUrl: string;
  annotations: Annotation[];
  onChange: (annotations: Annotation[]) => void;
}

type DrawState =
  | { mode: 'idle' }
  | { mode: 'drawing'; startX: number; startY: number; currentX: number; currentY: number }
  | { mode: 'selected'; annotationId: string };

export function AnnotationEditor({ imageUrl, annotations, onChange }: AnnotationEditorProps) {
  const [tool, setTool] = useState<AnnotationType>('arrow');
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [showColors, setShowColors] = useState(false);
  const [drawState, setDrawState] = useState<DrawState>({ mode: 'idle' });
  const [textInput, setTextInput] = useState('');
  const [textPosition, setTextPosition] = useState<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getSvgPoint = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100,
    };
  }, []);

  const handlePointerDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (tool === 'text') {
        const pt = getSvgPoint(e);
        setTextPosition(pt);
        setTextInput('');
        return;
      }
      const pt = getSvgPoint(e);
      setDrawState({ mode: 'drawing', startX: pt.x, startY: pt.y, currentX: pt.x, currentY: pt.y });
    },
    [tool, getSvgPoint]
  );

  const handlePointerMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (drawState.mode !== 'drawing') return;
      e.preventDefault();
      const pt = getSvgPoint(e);
      setDrawState((prev) => {
        if (prev.mode !== 'drawing') return prev;
        return { ...prev, currentX: pt.x, currentY: pt.y };
      });
    },
    [drawState.mode, getSvgPoint]
  );

  const handlePointerUp = useCallback(() => {
    if (drawState.mode !== 'drawing') return;

    const { startX, startY, currentX, currentY } = drawState;
    const dx = Math.abs(currentX - startX);
    const dy = Math.abs(currentY - startY);

    // Ignore tiny drags
    if (dx < 1 && dy < 1) {
      setDrawState({ mode: 'idle' });
      return;
    }

    const id = `ann-${Date.now()}`;
    let newAnnotation: Annotation;

    if (tool === 'arrow') {
      newAnnotation = {
        id,
        type: 'arrow',
        x: startX,
        y: startY,
        color,
        props: { endX: currentX, endY: currentY },
      };
    } else if (tool === 'circle') {
      const cx = (startX + currentX) / 2;
      const cy = (startY + currentY) / 2;
      const radius = Math.sqrt(dx * dx + dy * dy) / 2;
      newAnnotation = {
        id,
        type: 'circle',
        x: cx,
        y: cy,
        color,
        props: { radius },
      };
    } else {
      // rect
      newAnnotation = {
        id,
        type: 'rect',
        x: Math.min(startX, currentX),
        y: Math.min(startY, currentY),
        color,
        props: { width: dx, height: dy },
      };
    }

    onChange([...annotations, newAnnotation]);
    setDrawState({ mode: 'idle' });
  }, [drawState, tool, color, annotations, onChange]);

  const handleTextSubmit = useCallback(() => {
    if (!textInput.trim() || !textPosition) return;
    const id = `ann-${Date.now()}`;
    const newAnnotation: Annotation = {
      id,
      type: 'text',
      x: textPosition.x,
      y: textPosition.y,
      color,
      props: { content: textInput.trim() },
    };
    onChange([...annotations, newAnnotation]);
    setTextPosition(null);
    setTextInput('');
  }, [textInput, textPosition, color, annotations, onChange]);

  const handleDelete = useCallback(
    (id: string) => {
      onChange(annotations.filter((a) => a.id !== id));
      if (drawState.mode === 'selected' && drawState.annotationId === id) {
        setDrawState({ mode: 'idle' });
      }
    },
    [annotations, onChange, drawState]
  );

  const handleAnnotationClick = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDrawState({ mode: 'selected', annotationId: id });
  }, []);

  // Close text input on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setTextPosition(null);
        setDrawState({ mode: 'idle' });
      }
      if (e.key === 'Enter' && textPosition) {
        handleTextSubmit();
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (drawState.mode === 'selected') {
          handleDelete(drawState.annotationId);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [textPosition, handleTextSubmit, drawState, handleDelete]);

  const tools: { type: AnnotationType; icon: React.ReactNode; label: string }[] = [
    { type: 'arrow', icon: <ArrowRight className="h-4 w-4" />, label: '화살표' },
    { type: 'circle', icon: <Circle className="h-4 w-4" />, label: '원' },
    { type: 'rect', icon: <Square className="h-4 w-4" />, label: '사각형' },
    { type: 'text', icon: <Type className="h-4 w-4" />, label: '텍스트' },
  ];

  return (
    <div ref={containerRef} className="space-y-2">
      {/* Toolbar */}
      <div className="flex items-center gap-1 flex-wrap">
        {tools.map((t) => (
          <button
            key={t.type}
            type="button"
            onClick={() => {
              setTool(t.type);
              setTextPosition(null);
              setDrawState({ mode: 'idle' });
            }}
            className={`flex items-center gap-1 px-2 py-1.5 text-xs rounded-md border transition-colors ${
              tool === t.type
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
            title={t.label}
          >
            {t.icon}
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}

        <div className="w-px h-6 bg-gray-200 mx-1" />

        {/* Color picker */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowColors(!showColors)}
            className="flex items-center gap-1 px-2 py-1.5 text-xs rounded-md border border-gray-200 bg-white hover:bg-gray-50"
          >
            <div className="h-3 w-3 rounded-full border border-gray-300" style={{ backgroundColor: color }} />
            <Palette className="h-3 w-3 text-gray-400" />
          </button>
          {showColors && (
            <div className="absolute top-full left-0 mt-1 flex gap-1 p-1.5 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setColor(c);
                    setShowColors(false);
                  }}
                  className={`h-6 w-6 rounded-full border-2 transition-transform ${
                    color === c ? 'border-blue-500 scale-110' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Delete selected */}
        {drawState.mode === 'selected' && (
          <button
            type="button"
            onClick={() => handleDelete(drawState.annotationId)}
            className="flex items-center gap-1 px-2 py-1.5 text-xs rounded-md border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
          >
            <Trash2 className="h-3 w-3" /> 삭제
          </button>
        )}
      </div>

      {/* Canvas area */}
      <div className="relative border border-gray-200 rounded-md overflow-hidden bg-gray-100 select-none touch-none">
        <img
          src={imageUrl}
          alt="Screenshot"
          className="w-full block"
          draggable={false}
        />
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          style={{ cursor: tool === 'text' ? 'text' : 'crosshair' }}
        >
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
            </marker>
          </defs>

          {/* Existing annotations */}
          {annotations.map((ann) => (
            <g
              key={ann.id}
              onClick={(e) => handleAnnotationClick(e, ann.id)}
              style={{ cursor: 'pointer' }}
              opacity={drawState.mode === 'selected' && drawState.annotationId === ann.id ? 1 : 0.85}
            >
              {ann.type === 'arrow' && (
                <line
                  x1={ann.x}
                  y1={ann.y}
                  x2={ann.props.endX as number}
                  y2={ann.props.endY as number}
                  stroke={ann.color}
                  strokeWidth="0.5"
                  markerEnd="url(#arrowhead)"
                  style={{ color: ann.color }}
                />
              )}
              {ann.type === 'circle' && (
                <circle
                  cx={ann.x}
                  cy={ann.y}
                  r={ann.props.radius as number}
                  fill="none"
                  stroke={ann.color}
                  strokeWidth="0.4"
                />
              )}
              {ann.type === 'rect' && (
                <rect
                  x={ann.x}
                  y={ann.y}
                  width={ann.props.width as number}
                  height={ann.props.height as number}
                  fill="none"
                  stroke={ann.color}
                  strokeWidth="0.4"
                />
              )}
              {ann.type === 'text' && (
                <text
                  x={ann.x}
                  y={ann.y}
                  fill={ann.color}
                  fontSize="3"
                  fontWeight="bold"
                  style={{ paintOrder: 'stroke', stroke: 'rgba(0,0,0,0.5)', strokeWidth: '0.3px' }}
                >
                  {ann.props.content as string}
                </text>
              )}
              {/* Selection indicator */}
              {drawState.mode === 'selected' && drawState.annotationId === ann.id && (
                <>
                  {ann.type === 'circle' && (
                    <circle
                      cx={ann.x}
                      cy={ann.y}
                      r={(ann.props.radius as number) + 0.5}
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="0.2"
                      strokeDasharray="1"
                    />
                  )}
                  {ann.type === 'rect' && (
                    <rect
                      x={(ann.x as number) - 0.3}
                      y={(ann.y as number) - 0.3}
                      width={(ann.props.width as number) + 0.6}
                      height={(ann.props.height as number) + 0.6}
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="0.2"
                      strokeDasharray="1"
                    />
                  )}
                </>
              )}
            </g>
          ))}

          {/* Drawing preview */}
          {drawState.mode === 'drawing' && (
            <>
              {tool === 'arrow' && (
                <line
                  x1={drawState.startX}
                  y1={drawState.startY}
                  x2={drawState.currentX}
                  y2={drawState.currentY}
                  stroke={color}
                  strokeWidth="0.5"
                  strokeDasharray="1"
                  markerEnd="url(#arrowhead)"
                  style={{ color }}
                />
              )}
              {tool === 'circle' && (() => {
                const cx = (drawState.startX + drawState.currentX) / 2;
                const cy = (drawState.startY + drawState.currentY) / 2;
                const dx = Math.abs(drawState.currentX - drawState.startX);
                const dy = Math.abs(drawState.currentY - drawState.startY);
                const r = Math.sqrt(dx * dx + dy * dy) / 2;
                return (
                  <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="0.4" strokeDasharray="1" />
                );
              })()}
              {tool === 'rect' && (
                <rect
                  x={Math.min(drawState.startX, drawState.currentX)}
                  y={Math.min(drawState.startY, drawState.currentY)}
                  width={Math.abs(drawState.currentX - drawState.startX)}
                  height={Math.abs(drawState.currentY - drawState.startY)}
                  fill="none"
                  stroke={color}
                  strokeWidth="0.4"
                  strokeDasharray="1"
                />
              )}
            </>
          )}
        </svg>

        {/* Text input overlay */}
        {textPosition && (
          <div
            className="absolute z-10"
            style={{
              left: `${textPosition.x}%`,
              top: `${textPosition.y}%`,
              transform: 'translate(-4px, -12px)',
            }}
          >
            <input
              autoFocus
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onBlur={handleTextSubmit}
              placeholder="텍스트 입력..."
              className="h-6 px-1 text-xs border border-blue-400 rounded bg-white shadow-sm min-w-[80px]"
            />
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400">
        도구를 선택한 뒤 드래그하여 그리세요. 클릭하여 선택 후 Delete로 삭제할 수 있습니다.
      </p>
    </div>
  );
}
