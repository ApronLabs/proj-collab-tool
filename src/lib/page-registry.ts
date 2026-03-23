export type PageEntry = {
  id: string;
  name: string;
  route: string;
  category: string;
};

const BASE_URL = 'https://no-sim.co.kr';

export const PAGE_CATEGORIES = [
  '인증',
  '메인',
  '재고',
  '발주',
  '직원',
  '소통',
  '설정',
] as const;

export const PAGE_REGISTRY: PageEntry[] = [
  // 인증
  { id: 'signup', name: '회원가입', route: '/signup', category: '인증' },
  { id: 'login', name: '로그인', route: '/login', category: '인증' },

  // 메인
  { id: 'onboarding', name: '온보딩', route: '/onboarding', category: '메인' },
  { id: 'dashboard', name: '대시보드', route: '/dashboard', category: '메인' },

  // 재고
  { id: 'inventory', name: '재고 관리', route: '/inventory', category: '재고' },
  { id: 'item-add', name: '품목 추가', route: '/inventory/add', category: '재고' },
  { id: 'item-detail', name: '품목 상세', route: '/inventory/[id]', category: '재고' },
  { id: 'barcode-scan', name: '바코드 스캔', route: '/inventory/scan', category: '재고' },
  { id: 'barcode-print', name: '바코드 출력', route: '/inventory/barcode-print', category: '재고' },
  { id: 'inventory-logs', name: '재고 변경 이력', route: '/inventory/logs', category: '재고' },
  { id: 'sort-order', name: '재고 순서 편집', route: '/inventory/sort-order', category: '재고' },
  { id: 'calendar', name: '캘린더', route: '/inventory/calendar', category: '재고' },

  // 발주
  { id: 'suppliers', name: '발주처 관리', route: '/suppliers', category: '발주' },
  { id: 'supplier-orders', name: '발주 내역', route: '/suppliers/orders', category: '발주' },
  { id: 'order', name: '발주 (주문)', route: '/inventory/[id]/order', category: '발주' },

  // 직원
  { id: 'staff', name: '직원 관리', route: '/staff', category: '직원' },
  { id: 'schedule', name: '근무표', route: '/staff/schedule', category: '직원' },

  // 소통
  { id: 'chat', name: '채팅', route: '/chat', category: '소통' },
  { id: 'timeline', name: '타임라인', route: '/timeline', category: '소통' },
  { id: 'notifications', name: '알림', route: '/notifications', category: '소통' },

  // 설정
  { id: 'profile', name: '프로필', route: '/profile', category: '설정' },
  { id: 'store-select', name: '매장 선택', route: '/store-select', category: '설정' },
  { id: 'store-create', name: '매장 추가', route: '/store-create', category: '설정' },
];

export function getPageById(id: string): PageEntry | undefined {
  return PAGE_REGISTRY.find((p) => p.id === id);
}

export function getPagesByCategory(category: string): PageEntry[] {
  return PAGE_REGISTRY.filter((p) => p.category === category);
}

export function getCaptureUrl(pageId: string): string {
  const page = getPageById(pageId);
  if (!page) return '';
  return `${BASE_URL}${page.route}`;
}
