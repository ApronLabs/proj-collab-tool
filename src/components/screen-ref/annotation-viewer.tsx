'use client';

import type { Annotation } from '@/lib/types';

interface AnnotationViewerProps {
  imageUrl: string;
  annotations: Annotation[];
}

export function AnnotationViewer({ imageUrl, annotations }: AnnotationViewerProps) {
  return (
    <div className="relative border border-gray-200 rounded-md overflow-hidden bg-gray-100">
      <img
        src={imageUrl}
        alt="Screenshot"
        className="w-full block"
        draggable={false}
      />
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <marker id="arrowhead-view" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
          </marker>
        </defs>

        {annotations.map((ann) => (
          <g key={ann.id} opacity={0.85}>
            {ann.type === 'arrow' && (
              <line
                x1={ann.x}
                y1={ann.y}
                x2={ann.props.endX as number}
                y2={ann.props.endY as number}
                stroke={ann.color}
                strokeWidth="0.5"
                markerEnd="url(#arrowhead-view)"
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
          </g>
        ))}
      </svg>
    </div>
  );
}
