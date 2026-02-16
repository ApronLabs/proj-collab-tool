export type QAItem = {
  id: string;
  text: string;
};

export type QASubSection = {
  id: string;
  title: string;
  items: QAItem[];
};

export type QASection = {
  id: string;
  title: string;
  description?: string;
  subsections: QASubSection[];
};

export const QA_SECTIONS: QASection[] = [
  {
    id: "signup",
    title: "회원가입",
    description: "/signup",
    subsections: [
      {
        id: "signup-display",
        title: "화면 표시",
        items: [
          { id: "signup-1-1", text: "회원가입 페이지가 정상적으로 열리는가?" },
          { id: "signup-1-2", text: "이름, 이메일, 비밀번호, 비밀번호 확인, 전화번호 입력란이 보이는가?" },
          { id: "signup-1-3", text: '"회원가입" 버튼이 보이는가?' },
          { id: "signup-1-4", text: '"이미 계정이 있으신가요? 로그인" 링크가 보이는가?' },
        ],
      },
      {
        id: "signup-validation",
        title: "입력 검증",
        items: [
          { id: "signup-2-1", text: '모든 필드를 비워두고 "회원가입" 클릭 → 오류 메시지가 나오는가?' },
          { id: "signup-2-2", text: '비밀번호를 5자 이하로 입력 → "6자 이상" 관련 안내가 나오는가?' },
          { id: "signup-2-3", text: "비밀번호와 비밀번호 확인이 다를 때 → 불일치 안내가 나오는가?" },
          { id: "signup-2-4", text: "이미 가입된 이메일로 가입 시도 → 중복 안내가 나오는가?" },
        ],
      },
      {
        id: "signup-success",
        title: "정상 가입",
        items: [
          { id: "signup-3-1", text: '올바른 정보 입력 후 "회원가입" 클릭 → 성공 화면이 표시되는가?' },
          { id: "signup-3-2", text: "성공 후 로그인 페이지로 이동 가능한가?" },
        ],
      },
    ],
  },
  {
    id: "login",
    title: "로그인",
    description: "/login",
    subsections: [
      {
        id: "login-display",
        title: "화면 표시",
        items: [
          { id: "login-1-1", text: "로그인 페이지가 정상적으로 열리는가?" },
          { id: "login-1-2", text: "이메일, 비밀번호 입력란이 보이는가?" },
          { id: "login-1-3", text: '"로그인" 버튼이 보이는가?' },
          { id: "login-1-4", text: '"계정이 없으신가요? 회원가입" 링크가 보이는가?' },
        ],
      },
      {
        id: "login-validation",
        title: "입력 검증",
        items: [
          { id: "login-2-1", text: "이메일/비밀번호를 비워두고 로그인 클릭 → 오류 메시지가 나오는가?" },
          { id: "login-2-2", text: "잘못된 이메일로 로그인 → 오류 메시지가 나오는가?" },
          { id: "login-2-3", text: "올바른 이메일 + 잘못된 비밀번호 → 오류 메시지가 나오는가?" },
        ],
      },
      {
        id: "login-success",
        title: "정상 로그인",
        items: [
          { id: "login-3-1", text: "올바른 이메일/비밀번호로 로그인 → 대시보드로 이동하는가?" },
          { id: "login-3-2", text: "로그인 상태에서 /login 페이지 접속 → 대시보드로 자동 이동되는가?" },
          { id: "login-3-3", text: "로그인하지 않은 상태에서 /dashboard 접속 → 로그인 페이지로 이동되는가?" },
        ],
      },
    ],
  },
  {
    id: "onboarding",
    title: "온보딩 (첫 매장 등록)",
    description: "처음 가입 후 매장이 없는 사용자가 로그인했을 때",
    subsections: [
      {
        id: "onboarding-display",
        title: "화면 표시",
        items: [
          { id: "onboarding-1-1", text: "환영 화면이 표시되는가?" },
          { id: "onboarding-1-2", text: "서비스 주요 기능 안내가 보이는가?" },
          { id: "onboarding-1-3", text: '"시작하기" 또는 다음 단계 버튼이 있는가?' },
        ],
      },
      {
        id: "onboarding-input",
        title: "매장 정보 입력",
        items: [
          { id: "onboarding-2-1", text: "매장명 입력란이 보이는가? (필수)" },
          { id: "onboarding-2-2", text: "매장 유형, 주소, 전화번호 입력란이 보이는가? (선택)" },
          { id: "onboarding-2-3", text: "매장명을 비워두고 등록 시도 → 오류가 나오는가?" },
          { id: "onboarding-2-4", text: "매장명 입력 후 등록 → 대시보드로 이동하는가?" },
          { id: "onboarding-2-5", text: '등록 후 사용자 역할이 "사장님(owner)"으로 설정되는가?' },
        ],
      },
    ],
  },
  {
    id: "dashboard",
    title: "대시보드",
    description: "/dashboard",
    subsections: [
      {
        id: "dashboard-inventory",
        title: "재고 현황 카드",
        items: [
          { id: "dashboard-1-1", text: "전체 품목 수가 표시되는가?" },
          { id: "dashboard-1-2", text: "부족 품목 수가 표시되는가?" },
          { id: "dashboard-1-3", text: "월간 회전율이 표시되는가?" },
          { id: "dashboard-1-4", text: "부족률이 표시되는가? (20% 이상이면 빨간색, 10~20%면 주황색)" },
          { id: "dashboard-1-5", text: "카드 클릭하여 펼치기/접기가 되는가?" },
        ],
      },
      {
        id: "dashboard-timeline",
        title: "최근 타임라인",
        items: [
          { id: "dashboard-2-1", text: "최근 게시물이 최대 5개 표시되는가?" },
          { id: "dashboard-2-2", text: '"전체 보기" 클릭 → 타임라인 페이지로 이동하는가?' },
        ],
      },
      {
        id: "dashboard-staff",
        title: "직원 활동 현황",
        items: [
          { id: "dashboard-3-1", text: "오늘 활동한 직원 수가 표시되는가?" },
          { id: "dashboard-3-2", text: "참여율이 표시되는가?" },
          { id: "dashboard-3-3", text: "오늘의 활동 수(타임라인 글, 재고 변경, 품목 수정)가 표시되는가?" },
        ],
      },
    ],
  },
  {
    id: "inventory",
    title: "재고 관리",
    description: "/inventory",
    subsections: [
      {
        id: "inventory-display",
        title: "화면 표시",
        items: [
          { id: "inventory-1-1", text: "재고 목록이 카테고리별로 표시되는가?" },
          { id: "inventory-1-2", text: "상단에 통계 카드(입고, 출고, 발주, 부족)가 표시되는가?" },
          { id: "inventory-1-3", text: "검색창이 보이는가?" },
          { id: "inventory-1-4", text: "필터 탭(전체, 카테고리, 발주, 바코드 미등록, 입고 대기)이 보이는가?" },
          { id: "inventory-1-5", text: "일별/월별 통계 전환 버튼이 보이는가?" },
        ],
      },
      {
        id: "inventory-search",
        title: "검색",
        items: [
          { id: "inventory-2-1", text: "품목명으로 검색 → 해당 품목만 표시되는가?" },
          { id: "inventory-2-2", text: "브랜드명으로 검색 → 해당 품목만 표시되는가?" },
          { id: "inventory-2-3", text: "검색어 삭제 → 전체 목록으로 복귀하는가?" },
        ],
      },
      {
        id: "inventory-filter",
        title: "필터",
        items: [
          { id: "inventory-3-1", text: '"전체" 탭 → 모든 품목이 표시되는가?' },
          { id: "inventory-3-2", text: '"카테고리" 탭 → 카테고리 선택 버튼이 나타나는가?' },
          { id: "inventory-3-3", text: '"발주" 탭 → 안전재고 이하인 품목만 표시되는가?' },
          { id: "inventory-3-4", text: '"바코드 미등록" 탭 → 바코드 없는 품목만 표시되는가?' },
          { id: "inventory-3-5", text: '"입고 대기" 탭 → 발주 후 입고 대기 중인 품목만 표시되는가?' },
          { id: "inventory-3-6", text: "각 필터 탭에 해당 건수가 배지로 표시되는가?" },
        ],
      },
      {
        id: "inventory-quick",
        title: "빠른 재고 조정",
        items: [
          { id: "inventory-4-1", text: '품목 옆 "+" 버튼 클릭 → 재고가 1 증가하는가?' },
          { id: "inventory-4-2", text: '품목 옆 "-" 버튼 클릭 → 재고가 1 감소하는가?' },
          { id: "inventory-4-3", text: "재고 숫자를 직접 클릭 → 수량 직접 입력이 가능한가?" },
          { id: "inventory-4-4", text: '재고가 0일 때 "-" 버튼이 비활성화되는가?' },
          { id: "inventory-4-5", text: "조정 후 토스트 메시지가 나타나는가?" },
        ],
      },
      {
        id: "inventory-category",
        title: "카테고리 펼치기/접기",
        items: [
          { id: "inventory-5-1", text: "카테고리명 클릭 → 해당 카테고리가 펼쳐지거나 접히는가?" },
          { id: "inventory-5-2", text: '"모두 펼치기" 클릭 → 모든 카테고리가 펼쳐지는가?' },
          { id: "inventory-5-3", text: '"모두 접기" 클릭 → 모든 카테고리가 접히는가?' },
        ],
      },
      {
        id: "inventory-status",
        title: "재고 상태 표시",
        items: [
          { id: "inventory-6-1", text: "안전재고 이상인 품목 → 초록색 점이 표시되는가?" },
          { id: "inventory-6-2", text: "안전재고 이하인 품목 → 빨간색 점이 표시되는가?" },
          { id: "inventory-6-3", text: "입고 대기 중인 품목에 대기 표시가 되는가?" },
        ],
      },
      {
        id: "inventory-nav",
        title: "네비게이션",
        items: [
          { id: "inventory-7-1", text: "품목 행 클릭 → 품목 상세 페이지로 이동하는가?" },
          { id: "inventory-7-2", text: '"스캔" 버튼 클릭 → 바코드 스캔 화면이 열리는가?' },
          { id: "inventory-7-3", text: '"추가" 버튼 클릭 → 품목 추가 페이지로 이동하는가? (관리자만)' },
          { id: "inventory-7-4", text: '"발주 목록 복사" 버튼 → 클립보드에 복사되는가? (발주 필터 탭)' },
        ],
      },
    ],
  },
  {
    id: "item-add",
    title: "품목 추가",
    description: "/inventory/add (사장님/관리자만)",
    subsections: [
      {
        id: "item-add-display",
        title: "화면 표시",
        items: [
          { id: "item-add-1-1", text: "품목명, 브랜드, 카테고리, 발주처, 단위 등 입력 필드가 보이는가?" },
          { id: "item-add-1-2", text: "카테고리가 라디오 버튼 형태로 표시되는가?" },
          { id: "item-add-1-3", text: "단위 선택 옵션(개, kg, L, 박스, 팩, 봉)이 보이는가?" },
          { id: "item-add-1-4", text: '"취소", "등록" 버튼이 보이는가?' },
        ],
      },
      {
        id: "item-add-validation",
        title: "필수 입력 검증",
        items: [
          { id: "item-add-2-1", text: "품목명을 비우고 등록 → 오류 메시지가 나오는가?" },
          { id: "item-add-2-2", text: "발주처를 선택하지 않고 등록 → 오류 메시지가 나오는가?" },
        ],
      },
      {
        id: "item-add-supplier",
        title: "발주처 선택",
        items: [
          { id: "item-add-3-1", text: "드롭다운에 온라인 발주처(네이버, 쿠팡, 배민상회 등)가 표시되는가?" },
          { id: "item-add-3-2", text: "기존 등록된 발주처가 목록에 표시되는가?" },
          { id: "item-add-3-3", text: '"직접 입력" 선택 → 텍스트 입력란으로 전환되는가?' },
          { id: "item-add-3-4", text: "발주 방식(온라인, 카카오톡, 전화, 문자) 선택이 되는가?" },
        ],
      },
      {
        id: "item-add-barcode",
        title: "바코드",
        items: [
          { id: "item-add-4-1", text: "바코드 입력란에 직접 입력이 가능한가?" },
          { id: "item-add-4-2", text: '"스캔" 버튼 클릭 → 카메라가 열리는가?' },
          { id: "item-add-4-3", text: "바코드 입력 시 중복 체크가 실시간으로 되는가?" },
          { id: "item-add-4-4", text: "중복 바코드 → 빨간 X 표시와 기존 품목명이 나타나는가?" },
          { id: "item-add-4-5", text: "사용 가능한 바코드 → 초록 체크 표시가 나타나는가?" },
        ],
      },
      {
        id: "item-add-unit",
        title: "단위 수량",
        items: [
          { id: "item-add-5-1", text: '"단위당 수량" 입력란이 보이는가?' },
          { id: "item-add-5-2", text: "예시 텍스트(예: 1박스 = 12개)가 안내되는가?" },
        ],
      },
      {
        id: "item-add-submit",
        title: "등록",
        items: [
          { id: "item-add-6-1", text: '모든 필드 입력 후 "등록" 클릭 → 확인 다이얼로그가 나오는가?' },
          { id: "item-add-6-2", text: "확인 클릭 → 품목이 등록되고 재고 목록에 나타나는가?" },
          { id: "item-add-6-3", text: '"취소" 클릭 → 이전 페이지로 돌아가는가?' },
        ],
      },
    ],
  },
  {
    id: "item-detail",
    title: "품목 상세",
    description: "/inventory/[품목ID]",
    subsections: [
      {
        id: "item-detail-info",
        title: "기본 정보",
        items: [
          { id: "item-detail-1-1", text: "품목명, 브랜드, 카테고리, 단위, 안전재고가 표시되는가?" },
          { id: "item-detail-1-2", text: "바코드 이미지가 표시되는가? (등록된 경우)" },
          { id: "item-detail-1-3", text: '"수정" 버튼이 보이는가? (관리자만)' },
        ],
      },
      {
        id: "item-detail-edit",
        title: "품목 정보 수정 (관리자)",
        items: [
          { id: "item-detail-2-1", text: '"수정" 버튼 클릭 → 편집 모드로 전환되는가?' },
          { id: "item-detail-2-2", text: "품목명, 브랜드, 카테고리 등을 변경할 수 있는가?" },
          { id: "item-detail-2-3", text: "발주처 변경이 가능한가?" },
          { id: "item-detail-2-4", text: "바코드 변경이 가능한가? (중복 체크 포함)" },
          { id: "item-detail-2-5", text: "저장 후 변경 사항이 반영되는가?" },
        ],
      },
      {
        id: "item-detail-stock",
        title: "현재 재고",
        items: [
          { id: "item-detail-3-1", text: "현재 재고 수량이 크게 표시되는가?" },
          { id: "item-detail-3-2", text: "재고 상태에 따라 색상이 다르게 표시되는가? (안전: 초록, 부족: 빨강)" },
          { id: "item-detail-3-3", text: '"입고 +1" 버튼 클릭 → 재고가 1 증가하는가?' },
          { id: "item-detail-3-4", text: '"출고 -1" 버튼 클릭 → 재고가 1 감소하는가?' },
          { id: "item-detail-3-5", text: '재고 0일 때 "출고 -1" 버튼이 비활성화되는가?' },
        ],
      },
      {
        id: "item-detail-pending",
        title: "입고 대기 상태",
        items: [
          { id: "item-detail-4-1", text: '발주 후 입고 대기 중일 때 "입고 대기: X단위" 표시가 되는가?' },
          { id: "item-detail-4-2", text: '부분 입고 시 "부분 입고 (X/Y단위)" 경고가 표시되는가?' },
          { id: "item-detail-4-3", text: '부분 입고 시 "수동처리" 버튼이 나타나는가?' },
          { id: "item-detail-4-4", text: '재고 부족 + 대기 없음일 때 "발주하기" 버튼이 나타나는가?' },
        ],
      },
      {
        id: "item-detail-barcode",
        title: "바코드",
        items: [
          { id: "item-detail-5-1", text: "바코드 이미지가 CODE128 형식으로 표시되는가?" },
          { id: "item-detail-5-2", text: '"다운로드" 버튼 클릭 → PNG 이미지로 저장되는가?' },
          { id: "item-detail-5-3", text: '"수정" 버튼으로 바코드를 변경할 수 있는가?' },
        ],
      },
      {
        id: "item-detail-price",
        title: "가격 히스토리",
        items: [
          { id: "item-detail-6-1", text: "발주처별 가격 비교 테이블이 표시되는가?" },
          { id: "item-detail-6-2", text: "최신 가격, 평균 가격, 최저/최고 가격이 보이는가?" },
          { id: "item-detail-6-3", text: "최근 주문 이력(발주처, 날짜, 단가)이 표시되는가?" },
        ],
      },
      {
        id: "item-detail-batch",
        title: "배치 정보 (유통기한)",
        items: [
          { id: "item-detail-7-1", text: "배치별 잔여 수량이 표시되는가?" },
          { id: "item-detail-7-2", text: "유통기한 상태에 따라 색상이 구분되는가? (만료: 빨강, 임박: 노랑)" },
          { id: "item-detail-7-3", text: "D-day 배지가 표시되는가?" },
        ],
      },
      {
        id: "item-detail-history",
        title: "변경 이력",
        items: [
          { id: "item-detail-8-1", text: "최근 15건의 변경 이력이 표시되는가?" },
          { id: "item-detail-8-2", text: "입고/출고/조정/발주/취소 유형이 색상별로 구분되는가?" },
          { id: "item-detail-8-3", text: "취소 아이콘 클릭 → 해당 변경을 되돌릴 수 있는가? (권한 있는 경우)" },
        ],
      },
    ],
  },
  {
    id: "order",
    title: "발주 (주문)",
    description: "/inventory/[품목ID]/order",
    subsections: [
      {
        id: "order-display",
        title: "화면 표시",
        items: [
          { id: "order-1-1", text: "품목 정보(이름, 현재 재고, 안전재고)가 표시되는가?" },
          { id: "order-1-2", text: "발주 수량이 부족분만큼 자동 계산되어 있는가?" },
          { id: "order-1-3", text: "발주처, 발주 방식, 예상 입고일, 단가, 메모 필드가 보이는가?" },
        ],
      },
      {
        id: "order-quantity",
        title: "수량 조정",
        items: [
          { id: "order-2-1", text: '"+"/"-" 버튼으로 발주 수량을 조정할 수 있는가?' },
          { id: "order-2-2", text: "직접 숫자를 입력할 수 있는가?" },
          { id: "order-2-3", text: "단위(개, kg 등)가 올바르게 표시되는가?" },
        ],
      },
      {
        id: "order-supplier",
        title: "발주처 선택",
        items: [
          { id: "order-3-1", text: "온라인 발주처(네이버, 쿠팡, 배민상회)가 목록에 있는가?" },
          { id: "order-3-2", text: "기존 등록된 발주처가 목록에 있는가?" },
          { id: "order-3-3", text: '"직접 입력" 선택 시 텍스트 입력이 가능한가?' },
        ],
      },
      {
        id: "order-preview",
        title: "발주 문구 미리보기",
        items: [
          { id: "order-4-1", text: "발주 방식이 카카오톡/전화/문자일 때 발주 문구가 생성되는가?" },
          { id: "order-4-2", text: "품목명, 수량, 단가 등이 문구에 포함되는가?" },
          { id: "order-4-3", text: '"복사하기" 버튼 클릭 → 클립보드에 복사되는가?' },
          { id: "order-4-4", text: "복사 성공 시 토스트 메시지가 나타나는가?" },
        ],
      },
      {
        id: "order-complete",
        title: "발주 완료",
        items: [
          { id: "order-5-1", text: '"발주 완료" 클릭 → 발주가 등록되는가?' },
          { id: "order-5-2", text: '발주 후 해당 품목에 "입고 대기" 상태가 표시되는가?' },
          { id: "order-5-3", text: '"취소" 클릭 → 품목 상세 페이지로 돌아가는가?' },
        ],
      },
    ],
  },
  {
    id: "barcode-scan",
    title: "바코드 스캔",
    description: "/inventory/scan",
    subsections: [
      {
        id: "barcode-scan-result",
        title: "스캔 결과 (등록된 바코드)",
        items: [
          { id: "barcode-scan-1-1", text: "스캔 후 품목 정보(이름, 브랜드, 현재 재고)가 표시되는가?" },
          { id: "barcode-scan-1-2", text: "재고 상태 배지가 표시되는가?" },
          { id: "barcode-scan-1-3", text: '"입고" 버튼과 "출고" 버튼이 보이는가?' },
        ],
      },
      {
        id: "barcode-scan-inbound",
        title: "입고 처리",
        items: [
          { id: "barcode-scan-2-1", text: '"입고" 클릭 → 수량 조정 화면이 나타나는가?' },
          { id: "barcode-scan-2-2", text: '"+"/"-" 버튼으로 수량 조정이 되는가?' },
          { id: "barcode-scan-2-3", text: "직접 숫자 입력이 가능한가?" },
          { id: "barcode-scan-2-4", text: '"확인" 클릭 → 재고가 증가하고 성공 토스트가 나오는가?' },
        ],
      },
      {
        id: "barcode-scan-outbound",
        title: "출고 처리",
        items: [
          { id: "barcode-scan-3-1", text: '"출고" 클릭 → 수량 조정 화면이 나타나는가?' },
          { id: "barcode-scan-3-2", text: '"출고 후:" 남은 재고 미리보기가 표시되는가?' },
          { id: "barcode-scan-3-3", text: "안전재고 이하로 떨어질 경우 빨간 경고가 표시되는가?" },
          { id: "barcode-scan-3-4", text: "출고 수량이 현재 재고를 초과하지 못하는가?" },
          { id: "barcode-scan-3-5", text: '재고 0일 때 "출고" 버튼이 비활성화되는가?' },
        ],
      },
      {
        id: "barcode-scan-unknown",
        title: "미등록 바코드",
        items: [
          { id: "barcode-scan-4-1", text: "등록되지 않은 바코드 스캔 → 경고 메시지가 나타나는가?" },
          { id: "barcode-scan-4-2", text: '"새 품목으로 등록" 옵션이 제공되는가?' },
        ],
      },
    ],
  },
  {
    id: "barcode-print",
    title: "바코드 출력",
    description: "/inventory/barcode-print",
    subsections: [
      {
        id: "barcode-print-single",
        title: "단일 카테고리 출력",
        items: [
          { id: "barcode-print-1-1", text: "카테고리명과 품목 수가 표시되는가?" },
          { id: "barcode-print-1-2", text: "바코드가 3열 그리드로 표시되는가?" },
          { id: "barcode-print-1-3", text: "각 바코드 아래에 품목명이 표시되는가?" },
          { id: "barcode-print-1-4", text: '"다운로드" 버튼 → 개별 바코드 PNG 저장이 되는가?' },
          { id: "barcode-print-1-5", text: '"전체 다운로드" 버튼 → 모든 바코드가 저장되는가?' },
        ],
      },
      {
        id: "barcode-print-options",
        title: "출력 옵션",
        items: [
          { id: "barcode-print-2-1", text: '"인쇄" 버튼 클릭 → 옵션 모달이 나타나는가?' },
          { id: "barcode-print-2-2", text: '"전체 인쇄" 옵션이 있는가?' },
          { id: "barcode-print-2-3", text: '"수동 등록만 인쇄" 옵션이 있는가?' },
          { id: "barcode-print-2-4", text: '"스캔 등록만 인쇄" 옵션이 있는가?' },
          { id: "barcode-print-2-5", text: "각 옵션의 해당 건수가 표시되는가?" },
          { id: "barcode-print-2-6", text: "A4 용지에 맞게 인쇄되는가?" },
        ],
      },
      {
        id: "barcode-print-all",
        title: "전체 출력",
        items: [
          { id: "barcode-print-3-1", text: "모든 카테고리의 바코드가 카테고리별로 구분되어 표시되는가?" },
          { id: "barcode-print-3-2", text: "빈 카테고리는 생략되는가?" },
          { id: "barcode-print-3-3", text: "인쇄 시 페이지 구분이 올바른가?" },
        ],
      },
    ],
  },
  {
    id: "inventory-logs",
    title: "재고 변경 이력",
    description: "/inventory/logs",
    subsections: [
      {
        id: "inventory-logs-display",
        title: "화면 표시",
        items: [
          { id: "inventory-logs-1-1", text: "전체 변경 이력이 시간순으로 표시되는가?" },
          { id: "inventory-logs-1-2", text: "필터 탭(전체, 수량 변경, 정보 수정)이 보이는가?" },
        ],
      },
      {
        id: "inventory-logs-content",
        title: "이력 내용",
        items: [
          { id: "inventory-logs-2-1", text: "변경 유형 배지가 색상으로 구분되는가? (입고: 초록, 출고: 빨강, 조정: 노랑, 정보: 파랑)" },
          { id: "inventory-logs-2-2", text: "품목명이 표시되는가?" },
          { id: "inventory-logs-2-3", text: "변경한 사용자 이름이 표시되는가?" },
          { id: "inventory-logs-2-4", text: '변경 시간이 "M월 D일 HH:mm" 형식으로 표시되는가?' },
          { id: "inventory-logs-2-5", text: "수량 변경 시 변경량(+/- 값)이 표시되는가?" },
          { id: "inventory-logs-2-6", text: "정보 수정 시 변경 전→후 값이 표시되는가?" },
        ],
      },
      {
        id: "inventory-logs-filter",
        title: "필터",
        items: [
          { id: "inventory-logs-3-1", text: '"전체" → 모든 유형의 이력이 표시되는가?' },
          { id: "inventory-logs-3-2", text: '"수량 변경" → 입고/출고/조정만 표시되는가?' },
          { id: "inventory-logs-3-3", text: '"정보 수정" → 품목 정보 변경만 표시되는가?' },
        ],
      },
    ],
  },
  {
    id: "sort-order",
    title: "재고 순서 편집",
    description: "/inventory/sort-order",
    subsections: [
      {
        id: "sort-order-dnd",
        title: "드래그 앤 드롭",
        items: [
          { id: "sort-order-1-1", text: "카테고리 내 품목들이 드래그 가능한가?" },
          { id: "sort-order-1-2", text: "모바일에서 터치로 순서 변경이 가능한가?" },
          { id: "sort-order-1-3", text: "드래그 중 시각적 피드백이 있는가?" },
          { id: "sort-order-1-4", text: '순서 변경 후 "저장" 버튼이 활성화되는가?' },
        ],
      },
      {
        id: "sort-order-save",
        title: "저장/취소",
        items: [
          { id: "sort-order-2-1", text: '"저장" 클릭 → 변경된 순서가 저장되는가?' },
          { id: "sort-order-2-2", text: "저장 성공 시 토스트 메시지가 나타나는가?" },
          { id: "sort-order-2-3", text: '변경 후 "취소" 클릭 → 확인 다이얼로그가 나오는가?' },
          { id: "sort-order-2-4", text: "저장 후 재고 목록에서 변경된 순서로 표시되는가?" },
        ],
      },
    ],
  },
  {
    id: "calendar",
    title: "캘린더 (활동 기록)",
    description: "재고 관리 페이지 내 캘린더",
    subsections: [
      {
        id: "calendar-display",
        title: "캘린더 표시",
        items: [
          { id: "calendar-1-1", text: "캘린더가 월 단위로 표시되는가?" },
          { id: "calendar-1-2", text: "요일 헤더(일~토)가 표시되는가? (일: 빨강, 토: 파랑)" },
          { id: "calendar-1-3", text: "오늘 날짜에 링 표시가 있는가?" },
          { id: "calendar-1-4", text: "이전 달/다음 달 이동 버튼이 작동하는가?" },
        ],
      },
      {
        id: "calendar-activity",
        title: "활동 표시",
        items: [
          { id: "calendar-2-1", text: "활동이 있는 날짜에 색상 점이 표시되는가?" },
          { id: "calendar-2-2", text: "입고(초록), 출고(빨강), 발주(파랑), 수정(보라), 취소(회색) 점이 구분되는가?" },
          { id: "calendar-2-3", text: "범례가 하단에 표시되는가?" },
        ],
      },
      {
        id: "calendar-detail",
        title: "날짜 선택",
        items: [
          { id: "calendar-3-1", text: "날짜 클릭 → 해당 날의 활동 상세가 표시되는가?" },
          { id: "calendar-3-2", text: "품목별로 그룹화되어 표시되는가?" },
          { id: "calendar-3-3", text: "각 활동의 유형 배지(입고 N건, 출고 N건 등)가 보이는가?" },
          { id: "calendar-3-4", text: "수량 요약(+X단위, -X단위)이 표시되는가?" },
          { id: "calendar-3-5", text: "여러 활동이 있을 경우 펼치기 버튼으로 상세 내역을 볼 수 있는가?" },
          { id: "calendar-3-6", text: "같은 날짜 다시 클릭 → 상세가 닫히는가?" },
        ],
      },
    ],
  },
  {
    id: "suppliers",
    title: "발주처 관리",
    description: '/suppliers → "발주처 관리" 탭',
    subsections: [
      {
        id: "suppliers-list",
        title: "목록 표시",
        items: [
          { id: "suppliers-1-1", text: "등록된 발주처 목록이 카드 형태로 표시되는가?" },
          { id: "suppliers-1-2", text: "각 카드에 발주처명, 발주 채널 배지, 담당자명, 연락처가 보이는가?" },
          { id: "suppliers-1-3", text: "검색창에 발주처명을 입력하면 필터링되는가?" },
          { id: "suppliers-1-4", text: "발주처가 없을 때 빈 상태 안내가 나오는가?" },
        ],
      },
      {
        id: "suppliers-add",
        title: "발주처 추가",
        items: [
          { id: "suppliers-2-1", text: '"추가" 버튼 클릭 → 입력 모달이 열리는가?' },
          { id: "suppliers-2-2", text: "발주처명(필수), 담당자명, 연락처, 발주 채널, 메모 필드가 있는가?" },
          { id: "suppliers-2-3", text: "발주 채널(전화, 문자, 카카오톡, 전용앱) 중 선택 가능한가?" },
          { id: "suppliers-2-4", text: "등록 완료 후 목록에 추가되는가?" },
        ],
      },
      {
        id: "suppliers-edit",
        title: "발주처 수정",
        items: [
          { id: "suppliers-3-1", text: '카드의 "더보기(⋯)" 클릭 → "수정" 옵션이 보이는가?' },
          { id: "suppliers-3-2", text: '"수정" 클릭 → 기존 정보가 채워진 편집 모달이 열리는가?' },
          { id: "suppliers-3-3", text: "수정 후 저장 → 변경사항이 반영되는가?" },
        ],
      },
      {
        id: "suppliers-delete",
        title: "발주처 삭제",
        items: [
          { id: "suppliers-4-1", text: '"더보기(⋯)" → "삭제" 클릭 → 확인 다이얼로그가 나오는가?' },
          { id: "suppliers-4-2", text: '삭제 경고 메시지에 "연결된 품목의 발주처 정보가 해제됩니다"가 있는가?' },
          { id: "suppliers-4-3", text: "삭제 확인 → 목록에서 제거되는가?" },
        ],
      },
    ],
  },
  {
    id: "supplier-orders",
    title: "발주 내역",
    description: '/suppliers → "발주 내역" 탭',
    subsections: [
      {
        id: "supplier-orders-list",
        title: "목록 표시",
        items: [
          { id: "supplier-orders-1-1", text: "발주 내역이 날짜별로 그룹화되어 표시되는가?" },
          { id: "supplier-orders-1-2", text: '오늘 날짜에 "TODAY" 배지가 표시되는가?' },
          { id: "supplier-orders-1-3", text: "각 주문에 발주처명, 매칭 상태, 금액이 표시되는가?" },
          { id: "supplier-orders-1-4", text: "발주처별 색상 구분이 되는가? (배민/쿠팡/네이버 등)" },
        ],
      },
      {
        id: "supplier-orders-detail",
        title: "주문 상세 펼치기",
        items: [
          { id: "supplier-orders-2-1", text: "주문 카드 클릭 → 상세 내역이 펼쳐지는가?" },
          { id: "supplier-orders-2-2", text: "주문 품목 목록(품목명, 옵션, 개당 가격, 수량, 총액)이 보이는가?" },
          { id: "supplier-orders-2-3", text: "매칭된 품목과 미매칭 품목이 구분되는가?" },
          { id: "supplier-orders-2-4", text: "결제 방법 정보가 보이는가?" },
        ],
      },
      {
        id: "supplier-orders-match",
        title: "품목 매칭",
        items: [
          { id: "supplier-orders-3-1", text: '미매칭 품목의 "매칭" 버튼 클릭 → 매칭 모달이 열리는가?' },
          { id: "supplier-orders-3-2", text: "검색으로 재고 품목을 찾을 수 있는가? (이름, 브랜드, 바코드)" },
          { id: "supplier-orders-3-3", text: '품목 선택 후 "매칭 확정" → 매칭이 완료되는가?' },
          { id: "supplier-orders-3-4", text: '"자동 매칭 저장" 체크 시 → 다음에 같은 품목이 자동 매칭되는가?' },
          { id: "supplier-orders-3-5", text: '매칭 완료 시 "매칭완료" 배지가 초록색으로 변경되는가?' },
        ],
      },
      {
        id: "supplier-orders-receipt",
        title: "영수증 스캔",
        items: [
          { id: "supplier-orders-4-1", text: '"영수증 스캔" 클릭 → 카메라가 열리는가?' },
          { id: "supplier-orders-4-2", text: "영수증 촬영 후 OCR 결과가 표시되는가?" },
          { id: "supplier-orders-4-3", text: "OCR로 추출된 품목/가격/수량이 발주 내역에 추가되는가?" },
        ],
      },
      {
        id: "supplier-orders-email",
        title: "이메일 동기화",
        items: [
          { id: "supplier-orders-5-1", text: '"이메일 동기화" 클릭 → 동기화가 시작되는가?' },
          { id: "supplier-orders-5-2", text: "배민/쿠팡/네이버 주문 이메일이 파싱되어 발주 내역에 추가되는가?" },
        ],
      },
    ],
  },
  {
    id: "staff",
    title: "직원 관리",
    description: "/staff",
    subsections: [
      {
        id: "staff-all",
        title: "전체 직원 관리 (사장님만)",
        items: [
          { id: "staff-1-1", text: '사장님 계정으로 접속 시 "전체 직원 관리" 섹션이 보이는가?' },
          { id: "staff-1-2", text: "직원이 매장별로 그룹화되어 표시되는가?" },
          { id: "staff-1-3", text: '"매장 미지정" 그룹이 경고 색상으로 표시되는가?' },
          { id: "staff-1-4", text: "직원 카드 클릭 → 수정 페이지로 이동하는가?" },
          { id: "staff-1-5", text: "일반 직원 계정으로 접속 시 이 섹션이 보이지 않는가?" },
        ],
      },
      {
        id: "staff-current",
        title: "현재 매장 직원 목록",
        items: [
          { id: "staff-2-1", text: "현재 선택된 매장의 직원 목록이 표시되는가?" },
          { id: "staff-2-2", text: "직원별 이름, 이메일, 역할 배지(사장님/관리자/직원/알바)가 보이는가?" },
        ],
      },
      {
        id: "staff-edit",
        title: "직원 수정 (사장님만)",
        items: [
          { id: "staff-3-1", text: "직원 수정 페이지에서 직원 정보(이름, 이메일, 전화번호)가 표시되는가?" },
          { id: "staff-3-2", text: '소속 매장을 변경할 수 있는가? ("매장 미지정" 포함)' },
          { id: "staff-3-3", text: "역할(관리자/직원/알바)을 변경할 수 있는가?" },
          { id: "staff-3-4", text: '"저장" 클릭 → "직원 정보가 수정되었습니다" 메시지가 나오는가?' },
          { id: "staff-3-5", text: '"취소" 클릭 → 직원 목록으로 돌아가는가?' },
        ],
      },
    ],
  },
  {
    id: "schedule",
    title: "근무표",
    description: "/staff (주간 근무표 섹션)",
    subsections: [
      {
        id: "schedule-weekly",
        title: "주간 표시",
        items: [
          { id: "schedule-1-1", text: "이번 주 근무표가 기본으로 표시되는가?" },
          { id: "schedule-1-2", text: "요일별 날짜와 근무 스케줄이 표시되는가?" },
          { id: "schedule-1-3", text: '오늘 날짜에 "오늘" 배지가 있는가?' },
          { id: "schedule-1-4", text: "주말(토, 일)이 강조 표시되는가?" },
        ],
      },
      {
        id: "schedule-nav",
        title: "주간 이동",
        items: [
          { id: "schedule-2-1", text: '"이전 주" 클릭 → 지난주 근무표가 표시되는가?' },
          { id: "schedule-2-2", text: '"다음 주" 클릭 → 다음주 근무표가 표시되는가?' },
          { id: "schedule-2-3", text: '"이번 주" 클릭 → 현재 주로 돌아오는가?' },
        ],
      },
      {
        id: "schedule-add",
        title: "스케줄 추가 (관리자/사장님)",
        items: [
          { id: "schedule-3-1", text: '날짜 옆 "+" 버튼 클릭 → 스케줄 추가 페이지로 이동하는가?' },
          { id: "schedule-3-2", text: "선택한 날짜가 자동으로 채워져 있는가?" },
          { id: "schedule-3-3", text: "직원 선택 드롭다운에 현재 매장 직원이 표시되는가?" },
          { id: "schedule-3-4", text: "시작 시간(기본 09:00), 종료 시간(기본 18:00) 입력이 가능한가?" },
          { id: "schedule-3-5", text: "메모 입력이 가능한가? (예: 오픈 담당, 마감 담당)" },
          { id: "schedule-3-6", text: '"등록" 클릭 → "스케줄이 등록되었습니다" 메시지 후 직원 페이지로 이동하는가?' },
        ],
      },
      {
        id: "schedule-delete",
        title: "스케줄 삭제",
        items: [
          { id: "schedule-4-1", text: '스케줄의 "X" 버튼 클릭 → 삭제 확인 다이얼로그가 나오는가?' },
          { id: "schedule-4-2", text: "삭제 확인 → 근무표에서 제거되는가?" },
        ],
      },
    ],
  },
  {
    id: "chat",
    title: "채팅 (소통)",
    description: "/chat",
    subsections: [
      {
        id: "chat-channels",
        title: "채널 목록",
        items: [
          { id: "chat-1-1", text: "채널 목록이 표시되는가?" },
          { id: "chat-1-2", text: "각 채널에 이름, 최근 메시지 미리보기, 읽지 않은 메시지 수가 표시되는가?" },
          { id: "chat-1-3", text: "채널 클릭 → 해당 채널 채팅 화면으로 이동하는가?" },
        ],
      },
      {
        id: "chat-create",
        title: "채널 생성 (관리자/사장님)",
        items: [
          { id: "chat-2-1", text: "채널 생성 버튼 클릭 → 생성 모달이 열리는가?" },
          { id: "chat-2-2", text: "채널명 입력 후 생성 → 채널 목록에 추가되는가?" },
        ],
      },
      {
        id: "chat-messages",
        title: "메시지 송수신",
        items: [
          { id: "chat-3-1", text: "채널 입장 시 기존 메시지가 표시되는가?" },
          { id: "chat-3-2", text: "메시지 입력 후 전송 → 메시지가 화면에 나타나는가?" },
          { id: "chat-3-3", text: "새 메시지가 오면 자동으로 스크롤이 내려가는가?" },
          { id: "chat-3-4", text: "위로 스크롤 → 이전 메시지가 로드되는가? (무한 스크롤)" },
          { id: "chat-3-5", text: "날짜가 변경되는 지점에 날짜 구분선이 표시되는가?" },
        ],
      },
      {
        id: "chat-manage",
        title: "메시지 관리",
        items: [
          { id: "chat-4-1", text: '본인 메시지에 "수정" 옵션이 있는가?' },
          { id: "chat-4-2", text: '"수정" 클릭 → 메시지 수정이 가능한가?' },
          { id: "chat-4-3", text: '수정된 메시지에 "수정됨" 표시가 나타나는가?' },
          { id: "chat-4-4", text: '본인 메시지에 "삭제" 옵션이 있는가?' },
          { id: "chat-4-5", text: "관리자가 다른 사람 메시지를 삭제할 수 있는가?" },
        ],
      },
      {
        id: "chat-thread",
        title: "쓰레드 (답글)",
        items: [
          { id: "chat-5-1", text: '메시지의 "답글" 클릭 → 쓰레드 패널이 열리는가?' },
          { id: "chat-5-2", text: "원본 메시지가 상단에 표시되는가?" },
          { id: "chat-5-3", text: "쓰레드에 답글을 작성할 수 있는가?" },
        ],
      },
      {
        id: "chat-settings",
        title: "채널 관리 (관리자/사장님)",
        items: [
          { id: "chat-6-1", text: "채널 설정에서 채널명을 수정할 수 있는가?" },
          { id: "chat-6-2", text: "멤버 관리 모달에서 멤버를 추가/제거할 수 있는가?" },
          { id: "chat-6-3", text: "채널 삭제가 가능한가? (기본 채널은 삭제 불가)" },
        ],
      },
    ],
  },
  {
    id: "notifications",
    title: "알림",
    description: "/notifications",
    subsections: [
      {
        id: "notifications-display",
        title: "화면 표시",
        items: [
          { id: "notifications-1-1", text: "알림 목록이 표시되는가?" },
          { id: "notifications-1-2", text: '"읽지 않은 알림 X개" 카운트가 표시되는가?' },
          { id: "notifications-1-3", text: '"모두 읽음" 버튼이 있는가?' },
          { id: "notifications-1-4", text: '알림이 없을 때 "알림이 없습니다" 안내가 나오는가?' },
        ],
      },
      {
        id: "notifications-types",
        title: "알림 유형",
        items: [
          { id: "notifications-2-1", text: '태그 알림: "OOO님이 회원님을 태그했습니다" 형태로 표시되는가?' },
          { id: "notifications-2-2", text: "채팅 멘션: 채널명과 메시지 미리보기가 표시되는가?" },
          { id: "notifications-2-3", text: "시스템 알림: 부분입고, 재고 부족 등 알림이 표시되는가?" },
        ],
      },
      {
        id: "notifications-interaction",
        title: "알림 상호작용",
        items: [
          { id: "notifications-3-1", text: "읽지 않은 알림이 파란색 배경 + 파란 왼쪽 선으로 구분되는가?" },
          { id: "notifications-3-2", text: "알림 클릭 → 읽음 처리되는가?" },
          { id: "notifications-3-3", text: "태그 알림 클릭 → 타임라인으로 이동하는가?" },
          { id: "notifications-3-4", text: "채팅 멘션 클릭 → 해당 채널로 이동하는가?" },
          { id: "notifications-3-5", text: "시스템 알림 클릭 → 해당 재고/발주 페이지로 이동하는가?" },
          { id: "notifications-3-6", text: '"모두 읽음" 클릭 → 모든 알림이 읽음 처리되는가?' },
        ],
      },
    ],
  },
  {
    id: "timeline",
    title: "타임라인 / 활동 피드",
    description: "/timeline, /activity",
    subsections: [
      {
        id: "timeline-posts",
        title: "게시글",
        items: [
          { id: "timeline-1-1", text: "타임라인 게시글 목록이 표시되는가?" },
          { id: "timeline-1-2", text: "각 게시글에 작성자, 시간, 내용이 보이는가?" },
        ],
      },
      {
        id: "timeline-write",
        title: "게시글 작성",
        items: [
          { id: "timeline-2-1", text: "글 작성 입력란이 보이는가?" },
          { id: "timeline-2-2", text: "텍스트 입력이 가능한가?" },
          { id: "timeline-2-3", text: "이미지 첨부가 가능한가? (최대 5장)" },
          { id: "timeline-2-4", text: "5장 초과 시 안내 메시지가 나오는가?" },
          { id: "timeline-2-5", text: "5MB 초과 이미지가 자동 압축되는가?" },
          { id: "timeline-2-6", text: "첨부한 이미지 미리보기가 표시되는가?" },
          { id: "timeline-2-7", text: '이미지 "X" 클릭으로 삭제가 가능한가?' },
        ],
      },
      {
        id: "timeline-mention",
        title: "@멘션",
        items: [
          { id: "timeline-3-1", text: '"@" 입력 → 직원 목록 드롭다운이 나타나는가?' },
          { id: "timeline-3-2", text: "이름/이메일로 검색 필터링이 되는가?" },
          { id: "timeline-3-3", text: "키보드 화살표(↑↓)로 선택 가능한가?" },
          { id: "timeline-3-4", text: "Enter 또는 클릭으로 멘션이 완료되는가?" },
          { id: "timeline-3-5", text: "태그된 사용자가 하단에 파란 배지로 표시되는가?" },
          { id: "timeline-3-6", text: '배지의 "X"로 태그를 제거할 수 있는가?' },
        ],
      },
      {
        id: "timeline-comments",
        title: "댓글",
        items: [
          { id: "timeline-4-1", text: "게시글의 댓글 영역이 보이는가?" },
          { id: "timeline-4-2", text: "댓글 입력 후 전송 → 댓글이 추가되는가?" },
          { id: "timeline-4-3", text: "댓글에 작성자, 시간이 표시되는가?" },
          { id: "timeline-4-4", text: '본인 댓글의 "⋯" → "삭제" 클릭 → 삭제 확인 다이얼로그가 나오는가?' },
          { id: "timeline-4-5", text: "삭제 확인 → 댓글이 제거되는가?" },
          { id: "timeline-4-6", text: '댓글이 없을 때 "첫 번째 댓글을 작성해보세요" 안내가 나오는가?' },
        ],
      },
    ],
  },
  {
    id: "profile",
    title: "프로필",
    description: "/profile",
    subsections: [
      {
        id: "profile-info",
        title: "프로필 정보",
        items: [
          { id: "profile-1-1", text: "사용자 이메일과 이름이 표시되는가?" },
          { id: "profile-1-2", text: "현재 매장명이 표시되는가?" },
        ],
      },
      {
        id: "profile-hours",
        title: "영업시간 수정",
        items: [
          { id: "profile-2-1", text: '영업시간이 "HH:MM ~ HH:MM" 형식으로 표시되는가?' },
          { id: "profile-2-2", text: "연필 아이콘 클릭 → 편집 모드로 전환되는가?" },
          { id: "profile-2-3", text: "시작/종료 시간을 30분 단위로 선택할 수 있는가?" },
          { id: "profile-2-4", text: '"저장" 클릭 → 영업시간이 변경되는가?' },
          { id: "profile-2-5", text: '"취소" 클릭 → 원래 값으로 복귀하는가?' },
        ],
      },
      {
        id: "profile-push",
        title: "푸시 알림",
        items: [
          { id: "profile-3-1", text: "푸시 알림 상태(켜짐/꺼짐)가 표시되는가?" },
          { id: "profile-3-2", text: '"켜기" 클릭 → 브라우저 알림 권한 요청이 나오는가?' },
          { id: "profile-3-3", text: "권한 허용 후 알림이 활성화되는가?" },
          { id: "profile-3-4", text: '"테스트" 클릭 → 테스트 알림이 수신되는가?' },
          { id: "profile-3-5", text: '"끄기" 클릭 → 알림이 비활성화되는가?' },
        ],
      },
      {
        id: "profile-pwa",
        title: "PWA 설치 안내",
        items: [
          { id: "profile-4-1", text: "모바일(iOS)에서 Safari 홈 화면 추가 안내가 표시되는가?" },
          { id: "profile-4-2", text: "모바일(Android)에서 Chrome 홈 화면 추가 안내가 표시되는가?" },
          { id: "profile-4-3", text: "이미 PWA로 설치된 경우 안내가 표시되지 않는가?" },
        ],
      },
      {
        id: "profile-logout",
        title: "로그아웃",
        items: [
          { id: "profile-5-1", text: '"로그아웃" 버튼이 빨간색으로 표시되는가?' },
          { id: "profile-5-2", text: "클릭 → 로그인 페이지로 이동하는가?" },
          { id: "profile-5-3", text: "로그아웃 후 보호된 페이지 접근 시 로그인으로 리다이렉트되는가?" },
        ],
      },
    ],
  },
  {
    id: "store",
    title: "매장 선택 / 추가",
    description: "/store-select, /store-create",
    subsections: [
      {
        id: "store-select",
        title: "매장 선택",
        items: [
          { id: "store-1-1", text: "접근 가능한 매장 목록이 표시되는가?" },
          { id: "store-1-2", text: "현재 선택된 매장에 체크 표시가 있는가?" },
          { id: "store-1-3", text: "다른 매장 선택 → 매장이 전환되는가?" },
          { id: "store-1-4", text: "매장 전환 후 대시보드 데이터가 새 매장 기준으로 표시되는가?" },
          { id: "store-1-5", text: '사장님만 "+ 새 매장" 버튼이 보이는가?' },
        ],
      },
      {
        id: "store-create",
        title: "매장 추가 (사장님만)",
        items: [
          { id: "store-2-1", text: "매장명(필수), 유형, 주소, 전화번호, 영업시간 필드가 있는가?" },
          { id: "store-2-2", text: "매장명 없이 등록 시도 → 오류가 나오는가?" },
          { id: "store-2-3", text: "등록 완료 → 매장 목록에 추가되는가?" },
          { id: "store-2-4", text: '사장님이 아닌 계정 → "권한 없음" 메시지가 나오는가?' },
        ],
      },
    ],
  },
  {
    id: "common-ui",
    title: "공통 UI / 레이아웃",
    subsections: [
      {
        id: "common-header",
        title: "상단 헤더",
        items: [
          { id: "common-1-1", text: "데스크탑: 매장명이 헤더 왼쪽에 표시되는가?" },
          { id: "common-1-2", text: "데스크탑: 매장명 클릭 → 매장 선택 페이지로 이동하는가?" },
          { id: "common-1-3", text: "데스크탑: 알림 벨 아이콘에 읽지 않은 수가 배지로 표시되는가?" },
          { id: "common-1-4", text: "데스크탑: 벨 클릭 → 알림 팝오버가 나타나는가? (최대 5개)" },
          { id: "common-1-5", text: '데스크탑: "전체 보기" 클릭 → 알림 페이지로 이동하는가?' },
          { id: "common-1-6", text: "데스크탑: 사용자 아이콘 클릭 → 프로필로 이동하는가?" },
          { id: "common-1-7", text: "모바일: 알림 벨 아이콘이 보이는가?" },
          { id: "common-1-8", text: "모바일: 햄버거 메뉴 아이콘이 보이는가?" },
        ],
      },
      {
        id: "common-sidebar",
        title: "사이드바 (데스크탑)",
        items: [
          { id: "common-2-1", text: "왼쪽에 사이드바가 고정되어 표시되는가?" },
          { id: "common-2-2", text: "대시보드, 활동피드, 소통, 알림, 재고관리, 품목추가, 발주관리, 직원관리, 프로필 메뉴가 있는가?" },
          { id: "common-2-3", text: "현재 페이지에 해당하는 메뉴가 파란색으로 활성화되는가?" },
          { id: "common-2-4", text: "각 메뉴 클릭 → 해당 페이지로 이동하는가?" },
          { id: "common-2-5", text: '하단에 "로그아웃" 버튼이 있는가?' },
        ],
      },
      {
        id: "common-mobile-menu",
        title: "모바일 메뉴",
        items: [
          { id: "common-3-1", text: "햄버거 클릭 → 오른쪽에서 슬라이드 메뉴가 나타나는가?" },
          { id: "common-3-2", text: "프로필 정보(이름, 역할)가 상단에 표시되는가?" },
          { id: "common-3-3", text: "사이드바와 동일한 메뉴 항목이 있는가?" },
          { id: "common-3-4", text: "메뉴 항목 클릭 → 해당 페이지 이동 + 메뉴 닫힘이 되는가?" },
          { id: "common-3-5", text: "오버레이(어두운 배경) 클릭 → 메뉴가 닫히는가?" },
          { id: "common-3-6", text: '"X" 버튼 → 메뉴가 닫히는가?' },
          { id: "common-3-7", text: "직원/알바 계정에서 관리자 전용 메뉴가 숨겨지는가?" },
        ],
      },
      {
        id: "common-responsive",
        title: "반응형 레이아웃",
        items: [
          { id: "common-4-1", text: "모바일(~768px): 사이드바 숨김, 햄버거 메뉴 표시되는가?" },
          { id: "common-4-2", text: "데스크탑(768px~): 사이드바 표시, 햄버거 숨김되는가?" },
          { id: "common-4-3", text: "모든 페이지가 모바일에서 정상적으로 스크롤되는가?" },
        ],
      },
      {
        id: "common-permission",
        title: "권한별 접근 제어",
        items: [
          { id: "common-5-1", text: "사장님(owner): 모든 기능에 접근 가능한가?" },
          { id: "common-5-2", text: "관리자(manager): 품목 추가/수정, 스케줄 관리가 가능한가?" },
          { id: "common-5-3", text: "직원(staff): 재고 조정(+/-), 조회만 가능한가?" },
          { id: "common-5-4", text: "알바(part_time): 재고 조정(+/-), 조회만 가능한가?" },
          { id: "common-5-5", text: "권한 없는 기능에 접근 시 적절한 안내가 나오는가?" },
        ],
      },
    ],
  },
];

export function getTotalItemCount(sections?: QASection[]): number {
  const data = sections || QA_SECTIONS;
  return data.reduce(
    (total, section) =>
      total +
      section.subsections.reduce(
        (subTotal, sub) => subTotal + sub.items.length,
        0
      ),
    0
  );
}

export function getSectionItemCount(section: QASection): number {
  return section.subsections.reduce(
    (total, sub) => total + sub.items.length,
    0
  );
}

export function getSectionItemIds(section: QASection): string[] {
  return section.subsections.flatMap((sub) => sub.items.map((item) => item.id));
}
