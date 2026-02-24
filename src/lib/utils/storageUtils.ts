const SNAPSHOT_PREFIX = 'page_snapshot_';
const SCROLL_PREFIX = 'page_scroll_';
const NAVIGATION_KEY = 'page_nav_meta';

function safeGet(key: string): string | null {
  try {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  try {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(key, value);
  } catch {}
}

function safeRemove(key: string) {
  try {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(key);
  } catch {}
}

// --- 페이지 스냅샷 ---
export interface PageSnapshot {
  tab?: string;
  filters?: Record<string, string>;
  sort?: string;
  searchQuery?: string;
  page?: number;
  scrollY?: number;
  lastClickedItemId?: string | null;
  modalState?: { isOpen: boolean; type?: string; data?: unknown } | null;
  formDraft?: Record<string, unknown> | null;
  extra?: Record<string, unknown>;
  savedAt?: number;
}

export function saveSnapshot(pathname: string, snapshot: PageSnapshot) {
  const key = `${SNAPSHOT_PREFIX}${pathname}`;
  safeSet(key, JSON.stringify({ ...snapshot, savedAt: Date.now() }));
}

export function loadSnapshot(pathname: string): PageSnapshot | null {
  const key = `${SNAPSHOT_PREFIX}${pathname}`;
  const raw = safeGet(key);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as PageSnapshot;

    // 30분 이상 지난 스냅샷은 무효
    if (parsed.savedAt && Date.now() - parsed.savedAt > 30 * 60 * 1000) {
      safeRemove(key);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearSnapshot(pathname: string) {
  safeRemove(`${SNAPSHOT_PREFIX}${pathname}`);
}

// --- 스크롤 위치 ---
export function saveScrollPosition(pathname: string, y: number) {
  safeSet(`${SCROLL_PREFIX}${pathname}`, String(y));
}

export function loadScrollPosition(pathname: string): number | null {
  const raw = safeGet(`${SCROLL_PREFIX}${pathname}`);
  return raw ? parseInt(raw, 10) : null;
}

export function clearScrollPosition(pathname: string) {
  safeRemove(`${SCROLL_PREFIX}${pathname}`);
}

// --- 네비게이션 메타 ---
export interface NavigationMeta {
  from: string;
  isBack: boolean;
  timestamp: number;
}

export function saveNavigationMeta(meta: NavigationMeta) {
  safeSet(NAVIGATION_KEY, JSON.stringify(meta));
}

export function loadNavigationMeta(): NavigationMeta | null {
  const raw = safeGet(NAVIGATION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
