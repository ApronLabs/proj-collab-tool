'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bug, Lightbulb, Settings2, ClipboardCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '../auth-context';

const NAV_ITEMS = [
  { href: '/bugs', label: '버그', icon: Bug },
  { href: '/improvements', label: '추가 및 개선', icon: Settings2 },
  { href: '/ideas', label: '아이디어', icon: Lightbulb },
  { href: '/qa', label: 'QA 테스트', icon: ClipboardCheck },
];

export function Header() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-[200] bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/bugs" className="text-lg font-bold text-gray-900">
            Collab
          </Link>
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const isActive = pathname.startsWith(`/collab${href}`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-brand/10 text-brand'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {user && (
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-brand/10 flex items-center justify-center text-xs font-medium text-brand">
                {user.name[0]}
              </div>
              <span className="text-sm text-gray-700 hidden sm:block">{user.name}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
