'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-3 sm:p-6">
      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={onClose} />
      <div
        ref={modalRef}
        className={cn(
          'relative w-full sm:max-w-md bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)]',
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 shrink-0">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>,
    document.body
  );
}
