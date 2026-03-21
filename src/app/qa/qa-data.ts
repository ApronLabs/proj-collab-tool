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
  service?: string; // 'nosim' | 'collab' | 'barcode' | 'saleskeeper'
  subsections: QASubSection[];
};

export const QA_SECTIONS: QASection[] = [
  // ─────────────────────────────────────────────
  // 인증 플로우
  // ─────────────────────────────────────────────
  {
    id: "signup",
    title: "회원가입",
    description: "/signup",
    subsections: [
      {
        id: "signup-role-select",
        title: "역할 선택 화면",
        items: [
          { id: "signup-0-1", text: "회원가입 페이지가 정상적으로 열리는가?" },
          { id: "signup-0-2", text: '"회원가입" 타이틀이 표시되는가?' },
          { id: "signup-0-3", text: '"어떤 역할로 가입하시겠어요?" 안내 문구가 보이는가?' },
          { id: "signup-0-4", text: '"사장님" 버튼(Building2 아이콘 + "새 매장을 등록하고 관리합니다")이 보이는가?' },
          { id: "signup-0-5", text: '"직원" 버튼(Users 아이콘 + "기존 매장에 직원으로 참여합니다")이 보이는가?' },
          { id: "signup-0-6", text: '상단에 "로그인으로" 링크가 보이는가?' },
        ],
      },
      {
        id: "signup-owner-step1",
        title: "사장님 가입 — 1단계: 기본 정보 (1/4)",
        items: [
          { id: "signup-o1-1", text: "진행률 표시(1/4)가 보이는가?" },
          { id: "signup-o1-2", text: '"이름" 입력란이 보이는가?' },
          { id: "signup-o1-3", text: '"전화번호" 입력란이 보이는가? (010-XXXX-XXXX 자동 포맷)' },
          { id: "signup-o1-4", text: "이름 2자 미만 입력 시 → 다음 버튼이 비활성화되는가?" },
          { id: "signup-o1-5", text: "전화번호 미완성 시 → 다음 버튼이 비활성화되는가?" },
          { id: "signup-o1-6", text: '올바르게 입력 후 "다음" 클릭 → 2단계로 이동하는가?' },
        ],
      },
      {
        id: "signup-owner-step2",
        title: "사장님 가입 — 2단계: 사업자 정보 (2/4)",
        items: [
          { id: "signup-o2-1", text: "진행률 표시(2/4)가 보이는가?" },
          { id: "signup-o2-2", text: '"사업자등록번호" 입력란(000-00-00000)과 "사업자 확인" 버튼이 보이는가?' },
          { id: "signup-o2-3", text: "사업자 확인 클릭 → 스피너가 표시되는가?" },
          { id: "signup-o2-4", text: '유효한 번호 → 초록 체크 "계속사업자 확인됨" 표시가 나오는가?' },
          { id: "signup-o2-5", text: "유효하지 않은 번호 → 빨간 오류 메시지가 나오는가?" },
          { id: "signup-o2-6", text: '"상호명 (매장명)" 필수 입력란이 보이는가?' },
          { id: "signup-o2-7", text: '"대표자명" 선택 입력란이 보이는가?' },
          { id: "signup-o2-8", text: '"업태/업종 선택" 드롭다운(배달음식점, 레스토랑, 카페, 바/주점, 소매업, 편의점, 기타)이 보이는가?' },
          { id: "signup-o2-9", text: "사업자번호 미인증 또는 상호명 비어있으면 → 다음 버튼이 비활성화되는가?" },
          { id: "signup-o2-10", text: '올바르게 입력 후 "다음" 클릭 → 3단계로 이동하는가?' },
        ],
      },
      {
        id: "signup-owner-step3",
        title: "사장님 가입 — 3단계: 사업장 정보 (3/4)",
        items: [
          { id: "signup-o3-1", text: "진행률 표시(3/4)가 보이는가?" },
          { id: "signup-o3-2", text: '"사업장 주소" 선택 입력란이 보이는가?' },
          { id: "signup-o3-3", text: '"매장 전화번호" 선택 입력란이 보이는가? (자동 포맷)' },
          { id: "signup-o3-4", text: "사업자등록증 사본 업로드 영역(📤 점선 버튼)이 보이는가?" },
          { id: "signup-o3-5", text: "파일 선택 시 .jpg, .jpeg, .png, .pdf만 허용되는가? (최대 10MB)" },
          { id: "signup-o3-6", text: '업로드 완료 → 초록 박스에 파일명 + "업로드 완료" + 삭제 버튼이 보이는가?' },
          { id: "signup-o3-7", text: "사업자등록증 미업로드 시 → 다음 버튼이 비활성화되는가?" },
          { id: "signup-o3-8", text: '올바르게 입력 후 "다음" 클릭 → 4단계로 이동하는가?' },
        ],
      },
      {
        id: "signup-owner-step4",
        title: "사장님 가입 — 4단계: 계정 정보 (4/4)",
        items: [
          { id: "signup-o4-1", text: "진행률 표시(4/4)가 보이는가?" },
          { id: "signup-o4-2", text: '"이메일" 필수 입력란이 보이는가?' },
          { id: "signup-o4-3", text: '"비밀번호" 입력란(눈 아이콘 토글)이 보이는가?' },
          { id: "signup-o4-4", text: "비밀번호 아래 실시간 규칙 체크 박스가 보이는가? (영문, 숫자, 특수문자, 최소 길이)" },
          { id: "signup-o4-5", text: "각 규칙 충족 시 ✓, 미충족 시 ✗ 표시가 실시간 변경되는가?" },
          { id: "signup-o4-6", text: '"비밀번호 확인" 입력란이 보이는가?' },
          { id: "signup-o4-7", text: '비밀번호 불일치 → 빨간색 "비밀번호가 일치하지 않습니다" 표시되는가?' },
          { id: "signup-o4-8", text: '비밀번호 일치 → 초록색 "비밀번호가 일치합니다" 표시되는가?' },
          { id: "signup-o4-9", text: "모든 조건 미충족 시 → \"가입 완료\" 버튼이 비활성화되는가?" },
          { id: "signup-o4-10", text: '"가입 완료" 버튼(골드 그라디언트)이 보이는가?' },
          { id: "signup-o4-11", text: '하단에 "로그인" 링크가 보이는가?' },
          { id: "signup-o4-12", text: "이미 가입된 이메일로 가입 시도 → 중복 오류가 나오는가?" },
        ],
      },
      {
        id: "signup-owner-complete",
        title: "사장님 가입 — 완료",
        items: [
          { id: "signup-o5-1", text: '성공 아이콘 + "가입이 완료되었습니다! 환영합니다." 메시지가 표시되는가?' },
          { id: "signup-o5-2", text: "1.2초 후 /profile?setup=true로 자동 이동하는가?" },
        ],
      },
      {
        id: "signup-staff-step1",
        title: "직원 가입 — 1단계: 매장 확인 (1/2)",
        items: [
          { id: "signup-s1-1", text: "진행률 표시(1/2)가 보이는가?" },
          { id: "signup-s1-2", text: '"사업자등록번호 (000-00-00000)" 입력란이 보이는가?' },
          { id: "signup-s1-3", text: '"매장 확인" 버튼이 보이는가?' },
          { id: "signup-s1-4", text: "매장 확인 클릭 → 스피너가 표시되는가?" },
          { id: "signup-s1-5", text: '존재하는 매장 → "매장 확인: [매장명]" 성공 박스가 표시되는가?' },
          { id: "signup-s1-6", text: "존재하지 않는 매장 → 오류 메시지가 표시되는가?" },
          { id: "signup-s1-7", text: "매장 확인 후 다음 단계로 이동하는가?" },
        ],
      },
      {
        id: "signup-staff-step2",
        title: "직원 가입 — 2단계: 기본 정보 및 계정 (2/2)",
        items: [
          { id: "signup-s2-1", text: "진행률 표시(2/2)가 보이는가?" },
          { id: "signup-s2-2", text: '상단 안내 박스 "소속 매장: [매장명]"(틸 배경)이 보이는가?' },
          { id: "signup-s2-3", text: '"이름" 필수 입력란이 보이는가?' },
          { id: "signup-s2-4", text: '"전화번호 (선택)" 입력란이 보이는가?' },
          { id: "signup-s2-5", text: '"이메일" 필수 입력란이 보이는가?' },
          { id: "signup-s2-6", text: '"비밀번호" 입력란(눈 아이콘 + 규칙 체크)이 보이는가?' },
          { id: "signup-s2-7", text: '"비밀번호 확인" 입력란(일치 여부 표시)이 보이는가?' },
          { id: "signup-s2-8", text: '"가입 신청" 버튼이 보이는가?' },
          { id: "signup-s2-9", text: '하단에 "로그인" 링크가 보이는가?' },
        ],
      },
      {
        id: "signup-staff-complete",
        title: "직원 가입 — 완료",
        items: [
          { id: "signup-s3-1", text: '자동 승인 시 → "가입 완료!" 메시지 + /dashboard로 자동 이동하는가?' },
          { id: "signup-s3-2", text: '승인 대기 시 → "승인 대기 중" + "사장님이 가입을 승인하면 로그인할 수 있습니다" 메시지가 표시되는가?' },
          { id: "signup-s3-3", text: "승인 대기 시 → /login 링크가 보이는가?" },
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
          { id: "login-1-2", text: "틸 도어 아이콘 로고(120px)와 \"노심\" 타이틀이 보이는가?" },
          { id: "login-1-3", text: '"로그인" 타이틀이 보이는가?' },
          { id: "login-1-4", text: '"이메일" 입력란이 보이는가?' },
          { id: "login-1-5", text: '"비밀번호" 입력란(눈 아이콘 토글)이 보이는가?' },
          { id: "login-1-6", text: '"자동로그인" 체크박스(틸 색상)가 보이는가?' },
          { id: "login-1-7", text: '"로그인" 버튼(골드 그라디언트)이 보이는가?' },
          { id: "login-1-8", text: '"또는" 구분선이 보이는가?' },
          { id: "login-1-9", text: '"회원가입" 버튼(외곽선, UserPlus 아이콘)이 보이는가?' },
          { id: "login-1-10", text: '하단에 "비밀번호 찾기", "이메일 찾기" 링크가 보이는가?' },
        ],
      },
      {
        id: "login-validation",
        title: "입력 검증",
        items: [
          { id: "login-2-1", text: "이메일/비밀번호를 비워두고 로그인 클릭 → 오류 메시지가 나오는가?" },
          { id: "login-2-2", text: "잘못된 이메일로 로그인 → 빨간 알림 박스에 오류가 표시되는가?" },
          { id: "login-2-3", text: "올바른 이메일 + 잘못된 비밀번호 → 오류 메시지가 나오는가?" },
          { id: "login-2-4", text: "로그인 버튼 클릭 시 스피너가 표시되는가?" },
        ],
      },
      {
        id: "login-success",
        title: "정상 로그인",
        items: [
          { id: "login-3-1", text: "올바른 이메일/비밀번호로 로그인 → 대시보드로 이동하는가?" },
          { id: "login-3-2", text: "로그인 상태에서 /login 접속 → 대시보드로 자동 이동되는가?" },
          { id: "login-3-3", text: "미로그인 상태에서 보호된 페이지 접속 → 로그인으로 리다이렉트되는가?" },
          { id: "login-3-4", text: "자동로그인 체크 후 로그인 → 브라우저 재시작 후에도 로그인 유지되는가?" },
        ],
      },
    ],
  },
  {
    id: "forgot-password",
    title: "비밀번호 찾기",
    description: "/forgot-password",
    subsections: [
      {
        id: "forgot-pw-step1",
        title: "1단계: 이메일 입력",
        items: [
          { id: "forgot-pw-1-1", text: '"비밀번호 찾기" 타이틀 + "가입하신 이메일을 입력해주세요." 안내가 보이는가?' },
          { id: "forgot-pw-1-2", text: '"로그인으로 돌아가기" 링크가 보이는가?' },
          { id: "forgot-pw-1-3", text: '"이메일" 입력란(우측 Mail 아이콘)이 보이는가?' },
          { id: "forgot-pw-1-4", text: '"인증코드 발송" 버튼이 보이는가?' },
          { id: "forgot-pw-1-5", text: "등록된 이메일 입력 후 발송 클릭 → 2단계로 이동하는가?" },
          { id: "forgot-pw-1-6", text: "미등록 이메일 입력 → 오류 메시지가 나오는가?" },
        ],
      },
      {
        id: "forgot-pw-step2",
        title: "2단계: 인증코드 확인",
        items: [
          { id: "forgot-pw-2-1", text: '"이메일로 전송된 인증코드를 입력해주세요." 안내가 보이는가?' },
          { id: "forgot-pw-2-2", text: '"[이메일]으로 전송됨" 텍스트와 카운트다운 타이머(MM:SS, 골드색)가 보이는가?' },
          { id: "forgot-pw-2-3", text: '"인증코드 6자리" 입력란(숫자만, 가운데 정렬)이 보이는가?' },
          { id: "forgot-pw-2-4", text: "6자리 미입력 또는 타이머 만료 시 → \"인증 확인\" 버튼이 비활성화되는가?" },
          { id: "forgot-pw-2-5", text: '타이머 만료 시 → "인증코드가 만료되었습니다. 재발송해주세요." 빨간 텍스트가 보이는가?' },
          { id: "forgot-pw-2-6", text: '"인증코드 재발송" 링크가 보이는가?' },
          { id: "forgot-pw-2-7", text: "올바른 코드 입력 → 3단계로 이동하는가?" },
          { id: "forgot-pw-2-8", text: "잘못된 코드 입력 → 오류 메시지가 나오는가?" },
        ],
      },
      {
        id: "forgot-pw-step3",
        title: "3단계: 새 비밀번호 설정",
        items: [
          { id: "forgot-pw-3-1", text: '"새로운 비밀번호를 설정해주세요." 안내가 보이는가?' },
          { id: "forgot-pw-3-2", text: '"새 비밀번호 (6자 이상)" 입력란(눈 아이콘)이 보이는가?' },
          { id: "forgot-pw-3-3", text: '"비밀번호 확인" 입력란(눈 아이콘)이 보이는가?' },
          { id: "forgot-pw-3-4", text: '불일치 → 빨간색 "일치하지 않음", 일치 → 초록색 "일치합니다" 실시간 표시되는가?' },
          { id: "forgot-pw-3-5", text: '"비밀번호 변경" 버튼(골드 그라디언트)이 보이는가?' },
        ],
      },
      {
        id: "forgot-pw-step4",
        title: "4단계: 완료",
        items: [
          { id: "forgot-pw-4-1", text: '초록 원 체크 아이콘 + "비밀번호가 변경되었습니다" 메시지가 표시되는가?' },
          { id: "forgot-pw-4-2", text: '"새 비밀번호로 로그인해주세요." 안내가 보이는가?' },
          { id: "forgot-pw-4-3", text: '"로그인하러 가기" 버튼 클릭 → 로그인 페이지로 이동하는가?' },
          { id: "forgot-pw-4-4", text: "변경된 비밀번호로 로그인이 정상 동작하는가?" },
        ],
      },
    ],
  },
  // ─────────────────────────────────────────────
  // 온보딩
  // ─────────────────────────────────────────────
  {
    id: "onboarding",
    title: "온보딩 (발주처 등록)",
    description: "첫 가입 후 진입하는 발주처 설정 플로우 (3단계 + 완료)",
    subsections: [
      {
        id: "onboarding-step1",
        title: "1단계: 환영 화면",
        items: [
          { id: "onboarding-1-1", text: '🎉 아이콘 + "[사용자명], 환영합니다!" 타이틀이 보이는가?' },
          { id: "onboarding-1-2", text: '"매출지킴이에 오신 것을 환영합니다." 안내가 보이는가?' },
          { id: "onboarding-1-3", text: '"발주처를 등록하면" 안내 카드(✓ 3개 항목)가 보이는가?' },
          { id: "onboarding-1-4", text: '"발주처 등록하기" 버튼(chevron right)이 보이는가?' },
          { id: "onboarding-1-5", text: '"나중에 하기" 텍스트 링크가 보이는가?' },
          { id: "onboarding-1-6", text: '"나중에 하기" 클릭 → 대시보드로 이동하는가?' },
          { id: "onboarding-1-7", text: '"발주처 등록하기" 클릭 → 2단계로 이동하는가?' },
        ],
      },
      {
        id: "onboarding-step2",
        title: "2단계: 인터넷 발주처 (2/3)",
        items: [
          { id: "onboarding-2-1", text: "진행률 표시(▓▓░ 2/3)가 보이는가?" },
          { id: "onboarding-2-2", text: '"인터넷 발주처" 타이틀 + "전용 앱이나 온라인으로 발주하는 거래처를 등록하세요." 안내가 보이는가?' },
          { id: "onboarding-2-3", text: "발주처 카드(흰색, 테두리)에 \"발주처 1\" 라벨이 보이는가?" },
          { id: "onboarding-2-4", text: '각 카드에 "발주처 이름 (필수)", "담당자명 (선택)", "담당자 연락처 (선택)" 필드가 있는가?' },
          { id: "onboarding-2-5", text: '"+ 발주처 추가" 버튼으로 카드를 추가할 수 있는가?' },
          { id: "onboarding-2-6", text: "2개 이상일 때 휴지통(Trash2) 아이콘으로 삭제할 수 있는가?" },
          { id: "onboarding-2-7", text: '"건너뛰기" 버튼(외곽선)이 보이는가?' },
          { id: "onboarding-2-8", text: '"다음" 버튼(채움, 스피너)이 보이는가?' },
        ],
      },
      {
        id: "onboarding-step3",
        title: "3단계: 카카오/문자 발주처 (3/3)",
        items: [
          { id: "onboarding-3-1", text: "진행률 표시(▓▓▓ 3/3)가 보이는가?" },
          { id: "onboarding-3-2", text: '"카카오 / 문자 발주처" 타이틀이 보이는가?' },
          { id: "onboarding-3-3", text: '각 카드에 "발주처 이름 (필수)", "담당자명", "담당자 연락처" 필드가 있는가?' },
          { id: "onboarding-3-4", text: '채널 타입 토글 버튼("카카오톡" | "문자(SMS)")이 보이는가?' },
          { id: "onboarding-3-5", text: '"+ 발주처 추가" 버튼이 동작하는가?' },
          { id: "onboarding-3-6", text: '"건너뛰기", "완료" 버튼이 보이는가?' },
        ],
      },
      {
        id: "onboarding-complete",
        title: "완료 화면",
        items: [
          { id: "onboarding-4-1", text: '에메랄드 원 체크 아이콘 + "설정 완료!" 타이틀이 보이는가?' },
          { id: "onboarding-4-2", text: '"이제 매출지킴이를 시작할 수 있습니다." 안내가 보이는가?' },
          { id: "onboarding-4-3", text: '"대시보드 시작하기" 클릭 → 대시보드로 이동하는가?' },
        ],
      },
    ],
  },
  // ─────────────────────────────────────────────
  // 메인 기능 — 대시보드
  // ─────────────────────────────────────────────
  {
    id: "dashboard",
    title: "대시보드",
    description: "/dashboard",
    subsections: [
      {
        id: "dashboard-search",
        title: "검색바 / 바코드 스캔",
        items: [
          { id: "dashboard-1-1", text: '상단에 "품목명 또는 바코드 입력" 검색창이 보이는가?' },
          { id: "dashboard-1-2", text: "검색창 우측에 카메라/스캔 아이콘 버튼이 보이는가?" },
          { id: "dashboard-1-3", text: "스캔 아이콘 클릭 → 바코드 스캐너(전체 화면 오버레이)가 열리는가?" },
          { id: "dashboard-1-4", text: "품목명 검색 → 실시간 검색 결과가 표시되는가?" },
          { id: "dashboard-1-5", text: "검색 결과에서 품목 클릭 → 품목 상세 페이지로 이동하는가?" },
          { id: "dashboard-1-6", text: "검색 결과에서 재고 +/- 버튼이 동작하는가?" },
        ],
      },
      {
        id: "dashboard-default",
        title: "기본 화면 (검색 없을 때)",
        items: [
          { id: "dashboard-2-1", text: "스캐너 카드(퀵 액세스)가 보이는가?" },
          { id: "dashboard-2-2", text: '"오늘 할 일" 섹션이 표시되는가?' },
          { id: "dashboard-2-3", text: '"최근 활동" 섹션이 표시되는가?' },
        ],
      },
    ],
  },
  // ─────────────────────────────────────────────
  // 메인 기능 — 재고
  // ─────────────────────────────────────────────
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
          { id: "inventory-1-2", text: "상단에 검색바가 보이는가?" },
          { id: "inventory-1-3", text: '뷰 모드 탭(전체, 카테고리, 안전재고 이하, 바코드 없음, 발주 대기, 미분류 발주, 비활성화)이 보이는가?' },
          { id: "inventory-1-4", text: "필터 버튼, 정렬 버튼이 보이는가?" },
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
        title: "뷰 모드 필터",
        items: [
          { id: "inventory-3-1", text: '"전체" → 모든 품목이 표시되는가?' },
          { id: "inventory-3-2", text: '"카테고리" → 카테고리 필터 버튼이 나타나고 선택 시 해당 카테고리만 표시되는가?' },
          { id: "inventory-3-3", text: '"안전재고 이하" → 부족 품목만 표시되는가?' },
          { id: "inventory-3-4", text: '"바코드 없음" → 바코드 미등록 품목만 표시되는가?' },
          { id: "inventory-3-5", text: '"발주 대기" → 입고 대기 중인 품목만 표시되는가?' },
          { id: "inventory-3-6", text: '"미분류 발주" → 미분류 발주 품목만 표시되는가?' },
          { id: "inventory-3-7", text: '"비활성화" → 비활성 품목만 표시되는가?' },
        ],
      },
      {
        id: "inventory-item-row",
        title: "품목 행 표시",
        items: [
          { id: "inventory-4-1", text: "각 품목에 품목명, 브랜드, 현재 재고 수량+단위가 표시되는가?" },
          { id: "inventory-4-2", text: "재고 상태 배지(안전/부족)가 색상으로 구분되는가?" },
          { id: "inventory-4-3", text: "카테고리 라벨이 표시되는가?" },
          { id: "inventory-4-4", text: "+/- 빠른 조정 버튼이 동작하는가?" },
          { id: "inventory-4-5", text: '재고가 0일 때 "-" 버튼이 비활성화되는가?' },
          { id: "inventory-4-6", text: "조정 후 토스트 메시지가 나타나는가?" },
          { id: "inventory-4-7", text: "품목 행 클릭 → 품목 상세 페이지로 이동하는가?" },
        ],
      },
      {
        id: "inventory-shortcuts",
        title: "하단 단축 버튼",
        items: [
          { id: "inventory-5-1", text: '"바코드 스캔" 링크가 보이는가?' },
          { id: "inventory-5-2", text: '"품목 추가" 버튼(/inventory/add)이 보이는가?' },
          { id: "inventory-5-3", text: '"바코드 인쇄" 링크가 보이는가?' },
          { id: "inventory-5-4", text: '"재고 순서 편집" 링크가 보이는가?' },
          { id: "inventory-5-5", text: '"재고 변경 이력" 링크가 보이는가?' },
          { id: "inventory-5-6", text: '"달력 보기" 링크가 보이는가?' },
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
        id: "item-add-header",
        title: "헤더",
        items: [
          { id: "item-add-0-1", text: '뒤로가기 버튼 + "품목 등록" 타이틀이 보이는가?' },
          { id: "item-add-0-2", text: "미분류 발주에서 진입 시 → 주황색 안내 박스가 표시되는가?" },
        ],
      },
      {
        id: "item-add-name-brand",
        title: "품목명 / 브랜드",
        items: [
          { id: "item-add-1-1", text: '"품목명 *" 필수 입력란이 보이는가?' },
          { id: "item-add-1-2", text: '"브랜드" 선택 입력란(브랜드명)이 보이는가?' },
        ],
      },
      {
        id: "item-add-category",
        title: "카테고리",
        items: [
          { id: "item-add-2-1", text: '"카테고리" 라벨 아래 가로 스크롤 pill 버튼이 보이는가?' },
          { id: "item-add-2-2", text: "pill 버튼 탭으로 카테고리를 선택할 수 있는가?" },
          { id: "item-add-2-3", text: '"+ 추가" pill(점선 테두리) 클릭 → 인라인 입력으로 새 카테고리를 추가할 수 있는가?' },
        ],
      },
      {
        id: "item-add-supplier",
        title: "발주처 / 발주 방식",
        items: [
          { id: "item-add-3-1", text: '"🏢 발주처 *" 필수 드롭다운이 보이는가?' },
          { id: "item-add-3-2", text: '드롭다운 옵션 그룹: "온라인 주문"(네이버, 쿠팡, 배민상회, 기타)이 보이는가?' },
          { id: "item-add-3-3", text: '드롭다운 옵션 그룹: "저장된 발주처"(등록된 발주처 목록)가 보이는가?' },
          { id: "item-add-3-4", text: '"✏️ 직접 입력" 선택 → 텍스트 입력란 + "← 목록에서 선택" 링크로 전환되는가?' },
          { id: "item-add-3-5", text: '"🛒 발주 방식" 선택 드롭다운(선택 안 함, 온라인 주문, 카카오톡, 전화주문, 문자주문)이 보이는가?' },
          { id: "item-add-3-6", text: '"카카오톡/전화/문자 주문 시 발주 내역을 복사할 수 있습니다" 안내가 보이는가?' },
        ],
      },
      {
        id: "item-add-unit",
        title: "단위 / 단위 환산 설정",
        items: [
          { id: "item-add-4-1", text: "단위 pill 버튼(개, kg, L, 박스, 팩, 봉)이 보이는가?" },
          { id: "item-add-4-2", text: '"1[단위] 구성" 회색 박스 섹션이 보이는가?' },
          { id: "item-add-4-3", text: '"낱개 수" 행: 숫자 입력 + "개" 단위가 보이는가?' },
          { id: "item-add-4-4", text: '"재고 반영" 행: 숫자 입력 + 단위 드롭다운이 보이는가?' },
          { id: "item-add-4-5", text: '"재고 단위" pill 버튼(개, kg, L, 박스, 팩, 봉, + 직접입력)이 보이는가?' },
          { id: "item-add-4-6", text: '직접입력 선택 → "단위명 입력 (예: 소박스)" 텍스트 입력란이 보이는가?' },
          { id: "item-add-4-7", text: '단위수량 ≥ 2일 때 미리보기 "낱개 X개 들이 → 재고 Y[단위]"가 표시되는가?' },
          { id: "item-add-4-8", text: '"예: 생수 1박스에 20개 들어있고..." 도움말이 보이는가?' },
        ],
      },
      {
        id: "item-add-stock",
        title: "재고 정보",
        items: [
          { id: "item-add-5-1", text: '"현재 재고" 입력란 + 단위가 보이는가? (2열 그리드)' },
          { id: "item-add-5-2", text: '"안전재고" 입력란 + 단위가 보이는가?' },
          { id: "item-add-5-3", text: '"현재 매장에 있는 수량을 입력하면 초기 재고로 등록됩니다" 안내가 보이는가?' },
        ],
      },
      {
        id: "item-add-memo-url",
        title: "메모 / 구매 URL",
        items: [
          { id: "item-add-6-1", text: '"메모" 텍스트 영역(2행)이 보이는가?' },
          { id: "item-add-6-2", text: '"구매 URL" 입력란(ExternalLink 아이콘)이 보이는가?' },
          { id: "item-add-6-3", text: '"URL 추가" 링크로 URL을 여러 개 추가할 수 있는가?' },
          { id: "item-add-6-4", text: "X 버튼으로 추가된 URL을 삭제할 수 있는가?" },
          { id: "item-add-6-5", text: '"발주 시 바로 이동할 구매 페이지 URL (선택)" 안내가 보이는가?' },
        ],
      },
      {
        id: "item-add-barcode",
        title: "바코드",
        items: [
          { id: "item-add-7-1", text: '"📦 바코드" 입력란("바코드 스캔 또는 직접 입력")이 보이는가?' },
          { id: "item-add-7-2", text: '"📷 스캔" 버튼(파란색) 클릭 → 카메라가 열리는가?' },
          { id: "item-add-7-3", text: "바코드 입력 시 스피너(중복 체크 중)가 표시되는가?" },
          { id: "item-add-7-4", text: '사용 가능 바코드 → 초록 체크 표시가 나타나는가?' },
          { id: "item-add-7-5", text: '중복 바코드 → 빨간 알림 + "이미 등록됨: [품목명]" 오류가 나오는가?' },
          { id: "item-add-7-6", text: '"+ 바코드 추가"로 여러 바코드를 등록할 수 있는가?' },
          { id: "item-add-7-7", text: '"# 바코드 없는 상품" 클릭 → 자동 생성 바코드 "다음 순번: [번호]"가 표시되는가?' },
        ],
      },
      {
        id: "item-add-submit",
        title: "등록 / 취소",
        items: [
          { id: "item-add-8-1", text: '"취소" 버튼(외곽선, 좌측)과 "등록" 버튼(채움, 우측)이 2열로 보이는가?' },
          { id: "item-add-8-2", text: "품목명 비어있으면 → 오류 메시지가 나오는가?" },
          { id: "item-add-8-3", text: "등록 클릭 → 스피너 표시 후 품목이 생성되는가?" },
          { id: "item-add-8-4", text: "등록 성공 → 재고 목록에 새 품목이 나타나는가?" },
          { id: "item-add-8-5", text: '"취소" 클릭 → 이전 페이지로 돌아가는가?' },
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
        id: "item-detail-header",
        title: "헤더",
        items: [
          { id: "item-detail-0-1", text: "뒤로가기 버튼 + 품목명(수정 연필 아이콘)이 보이는가?" },
          { id: "item-detail-0-2", text: "브랜드명이 표시되는가? (등록된 경우)" },
          { id: "item-detail-0-3", text: "재고 상태 배지(안전/부족)가 표시되는가?" },
        ],
      },
      {
        id: "item-detail-stock",
        title: "① 현재 재고",
        items: [
          { id: "item-detail-1-1", text: "현재 재고 수량이 크게 표시되는가?" },
          { id: "item-detail-1-2", text: "단위 라벨이 표시되는가?" },
          { id: "item-detail-1-3", text: "안전재고 수준이 표시되는가?" },
          { id: "item-detail-1-4", text: "+/- 빠른 조정 버튼이 동작하는가?" },
          { id: "item-detail-1-5", text: "시각적 재고 바가 표시되는가?" },
        ],
      },
      {
        id: "item-detail-info",
        title: "② 상품 정보",
        items: [
          { id: "item-detail-2-1", text: "바코드(복사 버튼 포함)가 표시되는가?" },
          { id: "item-detail-2-2", text: "단위, 카테고리가 표시되는가?" },
          { id: "item-detail-2-3", text: "발주처명 + 링크가 표시되는가?" },
          { id: "item-detail-2-4", text: "구매 URL(ExternalLink 아이콘, 클릭 가능)이 표시되는가? (등록된 경우)" },
        ],
      },
      {
        id: "item-detail-order-info",
        title: "③ 발주 정보",
        items: [
          { id: "item-detail-3-1", text: "기본 발주처 타입이 표시되는가?" },
          { id: "item-detail-3-2", text: "최근 발주일, 수량, 가격이 표시되는가?" },
          { id: "item-detail-3-3", text: "발주처별 가격 비교(최신, 평균, 최저, 최고)가 표시되는가?" },
        ],
      },
      {
        id: "item-detail-batch",
        title: "④ 재고 배치 (유통기한)",
        items: [
          { id: "item-detail-4-1", text: "배치 카드에 잔여 수량이 표시되는가?" },
          { id: "item-detail-4-2", text: "유통기한 + 만료까지 남은 일수가 표시되는가?" },
          { id: "item-detail-4-3", text: "유통기한 상태에 따라 색상이 구분되는가? (만료: 빨강, 임박: 노랑)" },
          { id: "item-detail-4-4", text: "입고일(received date)이 표시되는가?" },
          { id: "item-detail-4-5", text: "발주처 타입이 표시되는가?" },
        ],
      },
      {
        id: "item-detail-price-history",
        title: "⑤ 가격 이력",
        items: [
          { id: "item-detail-5-1", text: "펼치기/접기가 가능한 가격 이력 섹션이 있는가?" },
          { id: "item-detail-5-2", text: "타임라인 형태로 가격 항목(발주처, 단가, 수량, 총액, 날짜)이 표시되는가?" },
        ],
      },
      {
        id: "item-detail-log",
        title: "⑥ 재고 로그",
        items: [
          { id: "item-detail-6-1", text: "시간순 재고 변경 이력이 표시되는가?" },
          { id: "item-detail-6-2", text: "유형(입고/출고), 수량, 시간, 사용자가 표시되는가?" },
        ],
      },
      {
        id: "item-detail-status",
        title: "⑦ 상태 관리",
        items: [
          { id: "item-detail-7-1", text: '"비활성화" / "활성화" 토글 버튼이 보이는가?' },
          { id: "item-detail-7-2", text: "비활성화 시 재고 목록에서 숨겨지는가?" },
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
          { id: "order-1-1", text: "품목 정보(이름, 바코드, 현재 재고)가 표시되는가?" },
          { id: "order-1-2", text: "발주처 드롭다운(기본 발주처 미리 선택됨)이 보이는가?" },
          { id: "order-1-3", text: "발주 방식 드롭다운이 보이는가?" },
          { id: "order-1-4", text: "발주 수량 입력(+/- 버튼)이 보이는가?" },
          { id: "order-1-5", text: "단위 환산 정보가 표시되는가? (해당 시)" },
        ],
      },
      {
        id: "order-submit",
        title: "발주 완료",
        items: [
          { id: "order-2-1", text: "저장/발주 버튼이 보이는가?" },
          { id: "order-2-2", text: '발주 완료 → 해당 품목에 "입고 대기" 상태가 표시되는가?' },
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
        id: "barcode-scan-display",
        title: "화면 표시",
        items: [
          { id: "barcode-scan-0-1", text: '뒤로가기 + "바코드 스캔" 타이틀이 보이는가?' },
        ],
      },
      {
        id: "barcode-scan-result",
        title: "스캔 결과 (등록된 바코드)",
        items: [
          { id: "barcode-scan-1-1", text: "품목 카드(품목명, 브랜드, 현재 재고, 카테고리, 발주처)가 표시되는가?" },
          { id: "barcode-scan-1-2", text: '3가지 액션 버튼("입고", "출고", "발주 수령")이 보이는가?' },
        ],
      },
      {
        id: "barcode-scan-inbound",
        title: "입고 처리",
        items: [
          { id: "barcode-scan-2-1", text: '"입고" 클릭 → 수량 선택 화면(큰 숫자 + /-  버튼)이 나타나는가?' },
          { id: "barcode-scan-2-2", text: "직접 숫자 입력이 가능한가?" },
          { id: "barcode-scan-2-3", text: '"입고 완료" 클릭 → 재고가 증가하고 성공 토스트가 나오는가?' },
        ],
      },
      {
        id: "barcode-scan-outbound",
        title: "출고 처리",
        items: [
          { id: "barcode-scan-3-1", text: '"출고" 클릭 → 수량 선택 화면이 나타나는가?' },
          { id: "barcode-scan-3-2", text: "출고 수량이 현재 재고를 초과하지 못하는가?" },
          { id: "barcode-scan-3-3", text: '"출고 완료" 클릭 → 재고가 감소하고 성공 토스트가 나오는가?' },
        ],
      },
      {
        id: "barcode-scan-receive",
        title: "발주 수령",
        items: [
          { id: "barcode-scan-4-1", text: "입고 대기 중인 발주가 있을 때 → 발주 수령 섹션이 보이는가?" },
          { id: "barcode-scan-4-2", text: "발주 수량, 입고 수량, 잔여 수량이 표시되는가?" },
          { id: "barcode-scan-4-3", text: "단위 환산 정보가 표시되는가? (해당 시)" },
          { id: "barcode-scan-4-4", text: '"수령 완료" 클릭 → 입고 처리가 완료되는가?' },
        ],
      },
      {
        id: "barcode-scan-unknown",
        title: "미등록 바코드",
        items: [
          { id: "barcode-scan-5-1", text: "등록되지 않은 바코드 스캔 → 경고 메시지가 나타나는가?" },
          { id: "barcode-scan-5-2", text: '"새 품목으로 등록" 옵션이 제공되는가?' },
        ],
      },
    ],
  },
  {
    id: "barcode-print",
    title: "바코드 인쇄",
    description: "/inventory/barcode-print",
    subsections: [
      {
        id: "barcode-print-display",
        title: "화면 표시",
        items: [
          { id: "barcode-print-1-1", text: '뒤로가기 + "바코드 인쇄" 타이틀이 보이는가?' },
          { id: "barcode-print-1-2", text: '필터 탭("전체", "수동 등록", "스캔 등록")이 보이는가?' },
          { id: "barcode-print-1-3", text: "각 탭에 해당 건수가 표시되는가?" },
        ],
      },
      {
        id: "barcode-print-list",
        title: "바코드 목록",
        items: [
          { id: "barcode-print-2-1", text: "품목별 바코드가 목록으로 표시되는가?" },
          { id: "barcode-print-2-2", text: "체크박스로 인쇄할 항목을 선택/해제할 수 있는가?" },
          { id: "barcode-print-2-3", text: "필터 탭 전환 시 해당 바코드만 표시되는가?" },
        ],
      },
      {
        id: "barcode-print-action",
        title: "인쇄",
        items: [
          { id: "barcode-print-3-1", text: "인쇄 버튼 클릭 → 인쇄 미리보기 모달이 열리는가?" },
          { id: "barcode-print-3-2", text: "바코드 라벨 크기 선택이 가능한가?" },
          { id: "barcode-print-3-3", text: "인쇄 또는 PDF 다운로드가 가능한가?" },
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
          { id: "inventory-logs-1-1", text: '"재고 변경 이력" 타이틀이 보이는가?' },
          { id: "inventory-logs-1-2", text: "기간 필터 버튼이 보이는가?" },
        ],
      },
      {
        id: "inventory-logs-content",
        title: "이력 내용",
        items: [
          { id: "inventory-logs-2-1", text: "날짜별로 그룹화되어 표시되는가? (오늘, 어제 등)" },
          { id: "inventory-logs-2-2", text: "각 항목에 시간(HH:MM), 활동 유형, 품목명이 표시되는가?" },
          { id: "inventory-logs-2-3", text: "변경 수량이 표시되는가?" },
          { id: "inventory-logs-2-4", text: "변경한 사용자 이름이 표시되는가?" },
          { id: "inventory-logs-2-5", text: "동일 품목 연속 변경(30분 이내)이 하나로 묶여 표시되는가?" },
          { id: "inventory-logs-2-6", text: "묶인 항목의 총 변경량이 요약 표시되는가?" },
          { id: "inventory-logs-2-7", text: "묶인 항목을 펼쳐 개별 내역을 볼 수 있는가?" },
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
        id: "sort-order-category",
        title: "카테고리 순서",
        items: [
          { id: "sort-order-1-1", text: '"재고 순서 편집" 타이틀 + 저장 버튼이 보이는가?' },
          { id: "sort-order-1-2", text: "가로 스크롤 카테고리 칩에 GripVertical 아이콘이 있는가?" },
          { id: "sort-order-1-3", text: "카테고리 칩을 드래그하여 순서를 변경할 수 있는가?" },
        ],
      },
      {
        id: "sort-order-items",
        title: "품목 순서",
        items: [
          { id: "sort-order-2-1", text: "선택된 카테고리 아래 품목 행(GripVertical 아이콘)이 보이는가?" },
          { id: "sort-order-2-2", text: "품목 행을 드래그하여 순서를 변경할 수 있는가?" },
          { id: "sort-order-2-3", text: "모바일에서 터치로 순서 변경이 가능한가?" },
          { id: "sort-order-2-4", text: "드래그 중 시각적 피드백이 있는가?" },
          { id: "sort-order-2-5", text: "순서 변경 후 저장 → 재고 목록에 반영되는가?" },
        ],
      },
    ],
  },
  {
    id: "calendar",
    title: "캘린더 (재고 활동)",
    description: "재고 관리 페이지 내 미니 캘린더",
    subsections: [
      {
        id: "calendar-display",
        title: "캘린더 표시",
        items: [
          { id: "calendar-1-1", text: "미니 캘린더가 월 단위로 표시되는가?" },
          { id: "calendar-1-2", text: "이전 달/다음 달 이동 버튼이 작동하는가?" },
          { id: "calendar-1-3", text: "활동이 있는 날짜에 시각적 표시(점, 색상)가 되는가?" },
          { id: "calendar-1-4", text: "날짜 클릭 → 해당 날의 활동 상세가 표시되는가?" },
          { id: "calendar-1-5", text: "활동 건수가 표시되는가?" },
        ],
      },
    ],
  },
  // ─────────────────────────────────────────────
  // 메인 기능 — 발주처
  // ─────────────────────────────────────────────
  {
    id: "suppliers",
    title: "발주처 관리",
    description: "/suppliers (발주처 탭)",
    subsections: [
      {
        id: "suppliers-list",
        title: "목록 표시",
        items: [
          { id: "suppliers-1-1", text: "검색바가 보이는가?" },
          { id: "suppliers-1-2", text: "발주처 추가 버튼이 보이는가?" },
          { id: "suppliers-1-3", text: "발주처 카드에 이름, 담당자, 연락처, 채널 배지(전화/문자/카카오톡/전용앱)가 보이는가?" },
          { id: "suppliers-1-4", text: "연결된 품목 수가 표시되는가?" },
          { id: "suppliers-1-5", text: "발주처가 없을 때 빈 상태 안내가 나오는가?" },
        ],
      },
      {
        id: "suppliers-crud",
        title: "추가 / 수정 / 삭제",
        items: [
          { id: "suppliers-2-1", text: "추가 → 이름(필수), 담당자, 연락처, 채널, 메모 입력이 가능한가?" },
          { id: "suppliers-2-2", text: "수정(연필) 클릭 → 기존 정보가 채워진 편집 화면이 열리는가?" },
          { id: "suppliers-2-3", text: "삭제(휴지통) 클릭 → 확인 다이얼로그가 나오는가?" },
          { id: "suppliers-2-4", text: "삭제 확인 → 목록에서 제거되는가?" },
        ],
      },
    ],
  },
  {
    id: "supplier-orders",
    title: "발주 내역",
    description: "/suppliers (발주 내역 탭)",
    subsections: [
      {
        id: "supplier-orders-list",
        title: "목록 표시",
        items: [
          { id: "supplier-orders-1-1", text: "날짜별 필터(오늘, 어제 등)가 보이는가?" },
          { id: "supplier-orders-1-2", text: "발주처별, 상태별 필터가 가능한가?" },
          { id: "supplier-orders-1-3", text: "날짜별로 주문이 그룹화되어 표시되는가?" },
          { id: "supplier-orders-1-4", text: "각 주문에 발주처명, 주문번호, 상태 배지, 금액, 품목 수가 표시되는가?" },
        ],
      },
      {
        id: "supplier-orders-detail",
        title: "주문 상세",
        items: [
          { id: "supplier-orders-2-1", text: "주문 카드 클릭 → 상세 내역이 펼쳐지는가?" },
          { id: "supplier-orders-2-2", text: "품목별 이름, 단가, 수량, 소계가 표시되는가?" },
          { id: "supplier-orders-2-3", text: "매칭 상태(미매칭/매칭완료/자동매칭)가 구분되는가?" },
          { id: "supplier-orders-2-4", text: "수정/삭제 옵션이 있는가?" },
        ],
      },
      {
        id: "supplier-orders-match",
        title: "품목 매칭",
        items: [
          { id: "supplier-orders-3-1", text: '미매칭 품목의 "매칭" 버튼 클릭 → 매칭 모달이 열리는가?' },
          { id: "supplier-orders-3-2", text: "검색으로 재고 품목을 찾을 수 있는가? (이름, 브랜드, 바코드)" },
          { id: "supplier-orders-3-3", text: '품목 선택 후 "매칭 확정" → 매칭이 완료되는가?' },
          { id: "supplier-orders-3-4", text: "자동 매칭 저장 옵션이 있는가?" },
        ],
      },
      {
        id: "supplier-orders-receiving",
        title: "입고 처리",
        items: [
          { id: "supplier-orders-4-1", text: "매칭된 주문의 입고 처리가 가능한가?" },
          { id: "supplier-orders-4-2", text: "입고 수량을 주문 수량과 다르게 입력할 수 있는가?" },
          { id: "supplier-orders-4-3", text: "부분 입고 시 상태가 변경되는가?" },
          { id: "supplier-orders-4-4", text: "입고 담당자가 기록되는가?" },
        ],
      },
      {
        id: "supplier-orders-receipt",
        title: "영수증 스캔",
        items: [
          { id: "supplier-orders-5-1", text: "영수증 스캔 버튼(카메라 아이콘)이 보이는가?" },
          { id: "supplier-orders-5-2", text: "카메라로 영수증 촬영이 가능한가?" },
          { id: "supplier-orders-5-3", text: "OCR 결과(품목/가격/수량)가 표시되는가?" },
          { id: "supplier-orders-5-4", text: "수동 편집이 가능한가?" },
          { id: "supplier-orders-5-5", text: "확인 → 발주 내역에 추가되는가?" },
        ],
      },
    ],
  },
  // ─────────────────────────────────────────────
  // 메인 기능 — 직원 / 근무
  // ─────────────────────────────────────────────
  {
    id: "staff",
    title: "직원 관리",
    description: "/staff",
    subsections: [
      {
        id: "staff-list",
        title: "직원 목록",
        items: [
          { id: "staff-1-1", text: "검색바가 보이는가?" },
          { id: "staff-1-2", text: '"직원 초대" 버튼이 보이는가?' },
          { id: "staff-1-3", text: "직원 카드에 이름, 이메일, 역할 배지(사장님/관리자/직원/알바, 색상+아이콘)가 보이는가?" },
          { id: "staff-1-4", text: "수정(연필) / 삭제(휴지통) 버튼이 보이는가?" },
          { id: "staff-1-5", text: "다중 매장 시 매장별 소속이 표시되는가?" },
        ],
      },
      {
        id: "staff-invite",
        title: "직원 초대",
        items: [
          { id: "staff-2-1", text: "초대 모달에 이메일 입력란이 보이는가?" },
          { id: "staff-2-2", text: "역할 드롭다운이 보이는가?" },
          { id: "staff-2-3", text: "매장 선택이 가능한가? (다중 매장 시)" },
          { id: "staff-2-4", text: "초대 버튼 클릭 → 초대가 전송되는가?" },
        ],
      },
      {
        id: "staff-edit",
        title: "직원 수정",
        items: [
          { id: "staff-3-1", text: "수정 모달에 이름, 이메일(읽기 전용), 역할, 매장 배정이 보이는가?" },
          { id: "staff-3-2", text: "역할 변경이 가능한가?" },
          { id: "staff-3-3", text: "매장 배정 변경이 가능한가?" },
          { id: "staff-3-4", text: "저장 → 변경 사항이 반영되는가?" },
        ],
      },
      {
        id: "staff-pending",
        title: "대기 중인 직원",
        items: [
          { id: "staff-4-1", text: "가입 승인 대기 직원 목록(이름, 이메일, 신청일)이 표시되는가?" },
          { id: "staff-4-2", text: "승인 버튼 클릭 → 직원이 활성화되는가?" },
          { id: "staff-4-3", text: "거절 버튼 클릭 → 신청이 거부되는가?" },
        ],
      },
      {
        id: "staff-preregister",
        title: "사전 등록 (사장님만)",
        items: [
          { id: "staff-5-1", text: "사전 등록 섹션이 사장님에게만 보이는가?" },
          { id: "staff-5-2", text: "이름, 전화번호, 역할 입력이 가능한가?" },
          { id: "staff-5-3", text: "추가 버튼 클릭 → 사전 등록 목록에 추가되는가?" },
          { id: "staff-5-4", text: "사전 등록된 직원이 실제 가입 시 자동 연결되는가?" },
        ],
      },
    ],
  },
  {
    id: "schedule",
    title: "근무표",
    description: "/staff 내 근무표 섹션",
    subsections: [
      {
        id: "schedule-display",
        title: "주간 표시",
        items: [
          { id: "schedule-1-1", text: "이번 주(월~일) 근무표가 표시되는가?" },
          { id: "schedule-1-2", text: "각 날짜에 직원명, 시작~종료 시간이 표시되는가?" },
          { id: "schedule-1-3", text: "메모가 있으면 표시되는가?" },
        ],
      },
      {
        id: "schedule-nav",
        title: "주간 이동",
        items: [
          { id: "schedule-2-1", text: "이전 주 / 다음 주 이동 버튼이 동작하는가?" },
        ],
      },
      {
        id: "schedule-add",
        title: "스케줄 추가 (관리자/사장님)",
        items: [
          { id: "schedule-3-1", text: "날짜 선택(Date picker)이 보이는가?" },
          { id: "schedule-3-2", text: "직원 선택 드롭다운이 보이는가?" },
          { id: "schedule-3-3", text: "시작/종료 시간(30분 단위)을 선택할 수 있는가?" },
          { id: "schedule-3-4", text: "메모 텍스트 영역이 보이는가?" },
          { id: "schedule-3-5", text: "저장 → 근무표에 추가되는가?" },
        ],
      },
      {
        id: "schedule-delete",
        title: "스케줄 삭제",
        items: [
          { id: "schedule-4-1", text: "삭제 버튼 → 확인 다이얼로그가 나오는가?" },
          { id: "schedule-4-2", text: "확인 → 근무표에서 제거되는가?" },
        ],
      },
    ],
  },
  // ─────────────────────────────────────────────
  // 메인 기능 — 소통
  // ─────────────────────────────────────────────
  {
    id: "chat",
    title: "채팅 (소통)",
    description: "/chat (타임라인 기능 포함)",
    subsections: [
      {
        id: "chat-channels",
        title: "채널 목록",
        items: [
          { id: "chat-1-1", text: "채널 목록이 표시되는가?" },
          { id: "chat-1-2", text: "각 채널에 이름, 최근 메시지 미리보기, 읽지 않은 수, 시간이 표시되는가?" },
          { id: "chat-1-3", text: "채널 클릭 → 해당 채팅 화면으로 이동하는가?" },
        ],
      },
      {
        id: "chat-create",
        title: "채널 생성 (관리자/사장님)",
        items: [
          { id: "chat-2-1", text: "채널 생성 버튼 → 모달이 열리는가?" },
          { id: "chat-2-2", text: "채널명 입력, 설명, 멤버 선택(체크박스)이 가능한가?" },
          { id: "chat-2-3", text: "생성 → 채널 목록에 추가되는가?" },
        ],
      },
      {
        id: "chat-messages",
        title: "메시지 송수신",
        items: [
          { id: "chat-3-1", text: "채널 입장 시 기존 메시지가 표시되는가?" },
          { id: "chat-3-2", text: "메시지 입력 + 전송 → 화면에 나타나는가?" },
          { id: "chat-3-3", text: "새 메시지 시 자동 스크롤이 내려가는가?" },
          { id: "chat-3-4", text: "위로 스크롤 → 이전 메시지가 로드되는가?" },
          { id: "chat-3-5", text: "날짜 변경 지점에 구분선이 표시되는가?" },
          { id: "chat-3-6", text: "@ 멘션 기능이 동작하는가?" },
          { id: "chat-3-7", text: "첨부 기능이 동작하는가?" },
        ],
      },
      {
        id: "chat-manage",
        title: "메시지 관리",
        items: [
          { id: "chat-4-1", text: "본인 메시지 수정이 가능한가?" },
          { id: "chat-4-2", text: '수정된 메시지에 "수정됨" 표시가 나타나는가?' },
          { id: "chat-4-3", text: "본인 메시지 삭제가 가능한가?" },
          { id: "chat-4-4", text: "관리자가 타인 메시지를 삭제할 수 있는가?" },
        ],
      },
      {
        id: "chat-thread",
        title: "쓰레드 (답글)",
        items: [
          { id: "chat-5-1", text: '"답글" 클릭 → 쓰레드 패널이 열리는가?' },
          { id: "chat-5-2", text: "원본 메시지가 상단에 표시되는가?" },
          { id: "chat-5-3", text: "쓰레드에 답글을 작성할 수 있는가?" },
        ],
      },
      {
        id: "chat-settings",
        title: "채널 관리 (관리자/사장님)",
        items: [
          { id: "chat-6-1", text: "설정 아이콘 클릭 → 채널 설정이 열리는가?" },
          { id: "chat-6-2", text: "채널명 수정이 가능한가?" },
          { id: "chat-6-3", text: "멤버 추가/제거가 가능한가?" },
          { id: "chat-6-4", text: "채널 삭제가 가능한가? (기본 채널 제외)" },
        ],
      },
    ],
  },
  // ─────────────────────────────────────────────
  // 메인 기능 — 알림 / 활동
  // ─────────────────────────────────────────────
  {
    id: "notifications",
    title: "알림",
    description: "/notifications",
    subsections: [
      {
        id: "notifications-display",
        title: "화면 표시",
        items: [
          { id: "notifications-1-1", text: '"알림" 타이틀이 보이는가?' },
          { id: "notifications-1-2", text: '"모두 읽음" 버튼이 보이는가? (읽지 않은 알림 있을 때)' },
          { id: "notifications-1-3", text: '알림이 없을 때 빈 상태 안내가 나오는가?' },
        ],
      },
      {
        id: "notifications-types",
        title: "알림 유형",
        items: [
          { id: "notifications-2-1", text: "태그 알림: 작성자 아바타, 이름, 포스트 미리보기(50자), 시간이 표시되는가?" },
          { id: "notifications-2-2", text: '시스템 알림: 아이콘 + 타이틀 + 유형 배지("재고 부족", "부분입고", "채널 언급")가 표시되는가?' },
          { id: "notifications-2-3", text: "읽지 않은 알림과 읽은 알림이 시각적으로 구분되는가?" },
        ],
      },
      {
        id: "notifications-interaction",
        title: "알림 상호작용",
        items: [
          { id: "notifications-3-1", text: "알림 클릭 → 읽음 처리되는가?" },
          { id: "notifications-3-2", text: "태그 알림 클릭 → 해당 포스트로 이동하는가?" },
          { id: "notifications-3-3", text: "시스템 알림 클릭 → 관련 페이지(재고/발주)로 이동하는가?" },
          { id: "notifications-3-4", text: '"모두 읽음" 클릭 → 모든 알림이 읽음 처리되는가?' },
        ],
      },
    ],
  },
  {
    id: "activity",
    title: "활동 로그",
    description: "/activity",
    subsections: [
      {
        id: "activity-display",
        title: "화면 표시",
        items: [
          { id: "activity-1-1", text: '"활동 로그" 타이틀이 보이는가?' },
          { id: "activity-1-2", text: "활동 유형 필터(체크박스)가 보이는가?" },
        ],
      },
      {
        id: "activity-list",
        title: "활동 목록",
        items: [
          { id: "activity-2-1", text: "날짜별로 그룹화되어 표시되는가? (오늘, 어제 등)" },
          { id: "activity-2-2", text: "각 항목에 아이콘, 설명, 품목명, 수량, 시간, 사용자가 표시되는가?" },
          { id: "activity-2-3", text: "동일 품목 연속 변경(30분 이내)이 묶여 표시되는가?" },
          { id: "activity-2-4", text: "묶인 활동을 펼쳐 상세 내역을 볼 수 있는가?" },
        ],
      },
      {
        id: "activity-filter",
        title: "필터",
        items: [
          { id: "activity-3-1", text: "유형 필터(입고/출고, 품목 등록/수정, 발주, 직원 등) 선택이 가능한가?" },
          { id: "activity-3-2", text: "필터 적용 → 해당 유형만 표시되는가?" },
          { id: "activity-3-3", text: "필터 해제 → 전체 활동이 다시 표시되는가?" },
        ],
      },
    ],
  },
  // ─────────────────────────────────────────────
  // 메인 기능 — 수익 관리
  // ─────────────────────────────────────────────
  {
    id: "pnl",
    title: "수익 관리 (P&L)",
    description: "/profit-loss (6개 탭)",
    subsections: [
      {
        id: "pnl-header",
        title: "공통 헤더",
        items: [
          { id: "pnl-0-1", text: '"수익 관리" 타이틀이 보이는가?' },
          { id: "pnl-0-2", text: "연도-월 선택(YYYY-MM 드롭다운)이 보이는가?" },
          { id: "pnl-0-3", text: "6개 탭(매출 달력, 상품별 가격 추이, 발주처별 통계, 지출 현황, 채널별 분석, 수익/손실 현황)이 보이는가?" },
        ],
      },
      {
        id: "pnl-material-calendar",
        title: "① 매출 달력",
        items: [
          { id: "pnl-1-1", text: "캘린더 그리드에 일별 매입 금액이 표시되는가?" },
          { id: "pnl-1-2", text: "월간 요약이 표시되는가?" },
          { id: "pnl-1-3", text: "날짜 클릭 → 해당 일 상세가 보이는가?" },
        ],
      },
      {
        id: "pnl-price-trend",
        title: "② 상품별 가격 추이",
        items: [
          { id: "pnl-2-1", text: "품목별 가격 추이 그래프(라인 차트)가 표시되는가?" },
          { id: "pnl-2-2", text: "품목 검색/선택이 가능한가?" },
          { id: "pnl-2-3", text: "기간(월/년) 선택이 가능한가?" },
        ],
      },
      {
        id: "pnl-supplier-summary",
        title: "③ 발주처별 통계",
        items: [
          { id: "pnl-3-1", text: "발주처별 총 지출 금액이 표시되는가?" },
          { id: "pnl-3-2", text: "구매 수량, 평균 단가가 표시되는가?" },
          { id: "pnl-3-3", text: "품목 수가 표시되는가?" },
        ],
      },
      {
        id: "pnl-expense",
        title: "④ 지출 현황",
        items: [
          { id: "pnl-4-1", text: "비용 카테고리별 금액이 표시되는가?" },
          { id: "pnl-4-2", text: "비율 파이 차트가 표시되는가?" },
          { id: "pnl-4-3", text: "비용 항목 추가/수정/삭제가 가능한가?" },
        ],
      },
      {
        id: "pnl-channel",
        title: "⑤ 채널별 분석",
        items: [
          { id: "pnl-5-1", text: "판매 채널별(배민, 쿠팡이츠, 요기요, 땡겨요) 매출이 표시되는가?" },
          { id: "pnl-5-2", text: "주문 건수가 표시되는가?" },
          { id: "pnl-5-3", text: "수수료 분류가 표시되는가?" },
        ],
      },
      {
        id: "pnl-statement",
        title: "⑥ 수익/손실 현황",
        items: [
          { id: "pnl-6-1", text: "매출, 원가, 매출총이익이 표시되는가?" },
          { id: "pnl-6-2", text: "운영비용, 영업이익이 표시되는가?" },
          { id: "pnl-6-3", text: "월별 비교가 가능한가?" },
        ],
      },
    ],
  },
  // ─────────────────────────────────────────────
  // 프로필 / 설정
  // ─────────────────────────────────────────────
  {
    id: "profile",
    title: "프로필",
    description: "/profile",
    subsections: [
      {
        id: "profile-user-info",
        title: "① 사용자 정보",
        items: [
          { id: "profile-1-1", text: "아바타, 이름(수정 가능), 이메일(읽기 전용)이 표시되는가?" },
          { id: "profile-1-2", text: "전화번호가 표시되는가?" },
          { id: "profile-1-3", text: "역할 배지(사장님/관리자/직원/알바)가 표시되는가?" },
        ],
      },
      {
        id: "profile-store-info",
        title: "② 매장 정보",
        items: [
          { id: "profile-2-1", text: "현재 매장명, 매장 유형이 표시되는가?" },
          { id: "profile-2-2", text: "주소, 전화번호가 표시되는가?" },
          { id: "profile-2-3", text: "영업 시작/종료 시간이 표시되는가?" },
          { id: "profile-2-4", text: "수정 버튼(사장님만)이 보이는가?" },
        ],
      },
      {
        id: "profile-notification",
        title: "③ 알림 설정",
        items: [
          { id: "profile-3-1", text: "푸시 알림 토글(Bell 아이콘)이 보이는가?" },
          { id: "profile-3-2", text: "토글 ON → 브라우저 알림 권한 요청이 나오는가?" },
          { id: "profile-3-3", text: "알림 유형별 체크박스(재고, 발주, 직원, 메시지)가 보이는가?" },
        ],
      },
      {
        id: "profile-platform",
        title: "④ 플랫폼 계정 연동",
        items: [
          { id: "profile-4-1", text: "발주처 플랫폼(네이버, 쿠팡, 식봄, 미트박스) 카드가 보이는가?" },
          { id: "profile-4-2", text: "배달 플랫폼(배달의민족, 쿠팡이츠, 요기요, 땡겨요) 카드가 보이는가?" },
          { id: "profile-4-3", text: "각 카드에 등록 상태 배지(등록됨/미등록)가 표시되는가?" },
          { id: "profile-4-4", text: "카드 펼치기 → 로그인 ID(마스킹), 비밀번호(눈 토글) 입력란이 보이는가?" },
          { id: "profile-4-5", text: "저장 → 계정이 연동되는가?" },
          { id: "profile-4-6", text: "삭제 → 연동이 해제되는가?" },
        ],
      },
      {
        id: "profile-account",
        title: "⑤ 계정 관리",
        items: [
          { id: "profile-5-1", text: "비밀번호 변경 버튼이 보이는가?" },
          { id: "profile-5-2", text: '"로그아웃" 버튼(LogOut 아이콘)이 보이는가?' },
          { id: "profile-5-3", text: "로그아웃 클릭 → 로그인 페이지로 이동하는가?" },
          { id: "profile-5-4", text: "로그아웃 후 보호된 페이지 접근 시 리다이렉트되는가?" },
          { id: "profile-5-5", text: "계정 삭제 옵션이 보이는가?" },
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
          { id: "store-1-1", text: '"매장 선택" 타이틀 + "작업할 매장을 선택하세요" 안내가 보이는가?' },
          { id: "store-1-2", text: "매장이 없을 때 → 빈 상태(매장 아이콘 + \"소속된 매장이 없습니다.\")가 보이는가?" },
          { id: "store-1-3", text: '"내 매장 등록하기" 버튼(Plus 아이콘)이 보이는가?' },
          { id: "store-1-4", text: "매장 카드에 매장명(굵게), 주소가 표시되는가?" },
          { id: "store-1-5", text: "현재 선택된 매장에 초록 체크 표시가 있는가?" },
          { id: "store-1-6", text: "다른 매장 클릭 → 매장이 전환되는가?" },
          { id: "store-1-7", text: "매장 전환 후 데이터가 새 매장 기준으로 표시되는가?" },
          { id: "store-1-8", text: '사장님만 "새 매장 추가" 버튼(점선 테두리)이 보이는가?' },
        ],
      },
      {
        id: "store-create",
        title: "매장 추가 (사장님만)",
        items: [
          { id: "store-2-1", text: '"매장 등록" 타이틀이 보이는가?' },
          { id: "store-2-2", text: '"매장 이름" 필수 입력란이 보이는가?' },
          { id: "store-2-3", text: '"매장 유형" 드롭다운(🍜배달음식점, 🍽️레스토랑, ☕카페, 🍸바/주점, 이모지 포함)이 보이는가?' },
          { id: "store-2-4", text: '"주소" 선택 입력란이 보이는가?' },
          { id: "store-2-5", text: '"전화번호" 선택 입력란이 보이는가?' },
          { id: "store-2-6", text: '"영업 시작 시간" / "영업 종료 시간" 드롭다운(30분 단위)이 보이는가?' },
          { id: "store-2-7", text: "매장명 없이 등록 → 오류가 나오는가?" },
          { id: "store-2-8", text: "등록 완료 → 매장 목록에 추가되는가?" },
        ],
      },
    ],
  },
  // ─────────────────────────────────────────────
  // 공통 UI
  // ─────────────────────────────────────────────
  {
    id: "common-ui",
    title: "공통 UI / 레이아웃",
    subsections: [
      {
        id: "common-header",
        title: "상단 헤더",
        items: [
          { id: "common-1-1", text: "좌측에 메뉴(햄버거) 아이콘이 보이는가?" },
          { id: "common-1-2", text: "중앙에 매장명(클릭 → 매장 선택 페이지)이 보이는가?" },
          { id: "common-1-3", text: "우측에 알림 벨 아이콘(읽지 않은 수 배지)이 보이는가?" },
          { id: "common-1-4", text: "우측에 프로필/사용자 메뉴 아이콘이 보이는가?" },
        ],
      },
      {
        id: "common-sidebar",
        title: "사이드바 (데스크탑)",
        items: [
          { id: "common-2-1", text: "데스크탑에서 좌측 사이드바가 고정 표시되는가?" },
          { id: "common-2-2", text: "메뉴 항목(대시보드, 재고관리, 발주관리, 직원관리, 소통, 수익관리, 알림, 프로필)이 있는가?" },
          { id: "common-2-3", text: "현재 페이지에 해당하는 메뉴가 활성화 표시되는가?" },
          { id: "common-2-4", text: "각 메뉴 클릭 → 해당 페이지로 이동하는가?" },
          { id: "common-2-5", text: "접기/펼치기 토글이 동작하는가?" },
        ],
      },
      {
        id: "common-bottom-nav",
        title: "하단 네비게이션 (모바일)",
        items: [
          { id: "common-3-1", text: "모바일에서 하단 탭 바가 고정 표시되는가?" },
          { id: "common-3-2", text: "탭(홈, 재고, 발주, 소통, 프로필)이 보이는가?" },
          { id: "common-3-3", text: "현재 페이지 탭이 강조 표시되는가?" },
          { id: "common-3-4", text: "모든 페이지에서 하단 탭이 유지되는가?" },
        ],
      },
      {
        id: "common-mobile-menu",
        title: "모바일 메뉴 (햄버거)",
        items: [
          { id: "common-4-1", text: "햄버거 클릭 → 좌측에서 슬라이드 메뉴가 나타나는가?" },
          { id: "common-4-2", text: "사이드바와 동일한 메뉴 항목이 있는가?" },
          { id: "common-4-3", text: "메뉴 항목 클릭 → 페이지 이동 + 메뉴 닫힘이 되는가?" },
          { id: "common-4-4", text: "닫기 버튼 또는 오버레이 클릭 → 메뉴가 닫히는가?" },
        ],
      },
      {
        id: "common-responsive",
        title: "반응형 레이아웃",
        items: [
          { id: "common-5-1", text: "모바일(~768px): 사이드바 숨김, 하단 탭 + 햄버거 메뉴 표시되는가?" },
          { id: "common-5-2", text: "데스크탑(768px~): 사이드바 표시, 하단 탭 + 햄버거 숨김되는가?" },
          { id: "common-5-3", text: "모든 페이지가 모바일에서 정상적으로 스크롤되는가?" },
        ],
      },
      {
        id: "common-permission",
        title: "권한별 접근 제어",
        items: [
          { id: "common-6-1", text: "사장님(owner): 모든 기능에 접근 가능한가?" },
          { id: "common-6-2", text: "관리자(manager): 품목 추가/수정, 스케줄 관리, 채널 생성이 가능한가?" },
          { id: "common-6-3", text: "직원(staff): 재고 조정(+/-), 조회만 가능한가?" },
          { id: "common-6-4", text: "알바(part_time): 재고 조정(+/-), 조회만 가능한가?" },
          { id: "common-6-5", text: "권한 없는 기능에 접근 시 적절한 안내가 나오는가?" },
        ],
      },
      {
        id: "common-toast",
        title: "토스트 / 로딩",
        items: [
          { id: "common-7-1", text: "성공 시 초록 토스트가 표시되는가?" },
          { id: "common-7-2", text: "오류 시 빨간 토스트가 표시되는가?" },
          { id: "common-7-3", text: "토스트가 3~5초 후 자동으로 사라지는가?" },
          { id: "common-7-4", text: "페이지 로딩 / API 호출 시 스피너가 표시되는가?" },
          { id: "common-7-5", text: "버튼 제출 중 스피너 + 비활성화로 중복 클릭이 방지되는가?" },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // 노심v2 QA 테스트 가이드
  // ═══════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // 노심v2 — 로그인
  // ─────────────────────────────────────────────
  {
    id: "nosim-login",
    title: "로그인",
    description: "/login",
    service: "nosim",
    subsections: [
      {
        id: "nosim-login-display",
        title: "화면 표시",
        items: [
          { id: "nosim-login-1-1", text: "로그인 페이지가 정상적으로 열리는가?" },
          { id: "nosim-login-1-2", text: "틸 그라디언트(#1E4A4A→#2A5C5C) 로고 박스(120x120px, rounded-2xl)와 SVG 아이콘이 보이는가?" },
          { id: "nosim-login-1-3", text: '"노심" 타이틀(text-4xl, bold)이 보이는가?' },
          { id: "nosim-login-1-4", text: '"로그인" 타이틀(text-xl, 가운데 정렬)이 보이는가?' },
          { id: "nosim-login-1-5", text: '"이메일" 입력란(h-14, rounded-xl, placeholder "이메일")이 보이는가?' },
          { id: "nosim-login-1-6", text: '"비밀번호" 입력란(h-14, rounded-xl, placeholder "비밀번호")이 보이는가?' },
          { id: "nosim-login-1-7", text: "비밀번호 입력란 우측에 Eye/EyeOff 토글 아이콘(22x22px)이 보이는가?" },
          { id: "nosim-login-1-8", text: "Eye 아이콘 클릭 → 비밀번호 표시/숨김이 전환되는가?" },
          { id: "nosim-login-1-9", text: '"자동로그인" 체크박스(틸 색상 #2A5C5C)가 보이는가?' },
          { id: "nosim-login-1-10", text: '"로그인" 버튼(골드 그라디언트 #C4A46A→#D8BC84, h-14, white text)이 보이는가?' },
          { id: "nosim-login-1-11", text: '"또는" 구분선(양쪽 수평선 + 텍스트)이 보이는가?' },
          { id: "nosim-login-1-12", text: '"회원가입" 버튼(외곽선, UserPlus 아이콘)이 보이는가?' },
          { id: "nosim-login-1-13", text: '하단에 "비밀번호 찾기" 링크가 보이는가?' },
        ],
      },
      {
        id: "nosim-login-validation",
        title: "입력 검증",
        items: [
          { id: "nosim-login-2-1", text: "이메일/비밀번호를 비워두고 로그인 클릭 → 오류 메시지가 나오는가?" },
          { id: "nosim-login-2-2", text: "잘못된 이메일로 로그인 → 빨간 알림 박스(bg-red-50, border-red-200)에 오류가 표시되는가?" },
          { id: "nosim-login-2-3", text: "올바른 이메일 + 잘못된 비밀번호 → 오류 메시지가 나오는가?" },
          { id: "nosim-login-2-4", text: "로그인 버튼 클릭 시 스피너가 표시되고 \"로딩중...\"으로 변경되는가?" },
          { id: "nosim-login-2-5", text: "로딩 중 버튼이 비활성화(opacity-50)되는가?" },
        ],
      },
      {
        id: "nosim-login-success",
        title: "정상 로그인",
        items: [
          { id: "nosim-login-3-1", text: "올바른 이메일/비밀번호로 로그인 → 대시보드(/dashboard)로 이동하는가?" },
          { id: "nosim-login-3-2", text: "로그인 상태에서 /login 접속 → 대시보드로 자동 이동되는가?" },
          { id: "nosim-login-3-3", text: "미로그인 상태에서 보호된 페이지 접속 → 로그인으로 리다이렉트되는가?" },
          { id: "nosim-login-3-4", text: "자동로그인 체크 후 로그인 → 브라우저 재시작 후에도 로그인 유지되는가?" },
        ],
      },
      {
        id: "nosim-login-v1-compare",
        title: "v1 대비 누락 기능 확인",
        items: [
          { id: "nosim-login-m1", text: "'이메일 찾기' 링크가 있는가? (v1에 있었음 — v2 누락)" },
          { id: "nosim-login-m2", text: "회원가입 버튼 클릭 → 회원가입 페이지로 이동하는가? (v1에 있었음 — v2 확인 필요)" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 노심v2 — 대시보드
  // ─────────────────────────────────────────────
  {
    id: "nosim-dashboard",
    title: "대시보드",
    description: "/dashboard",
    service: "nosim",
    subsections: [
      {
        id: "nosim-dash-header",
        title: "헤더 / 날짜",
        items: [
          { id: "nosim-dash-1-1", text: "대시보드 페이지가 정상적으로 열리는가?" },
          { id: "nosim-dash-1-2", text: "상단에 매장명이 표시되는가?" },
          { id: "nosim-dash-1-3", text: "날짜 선택기(YYYY-MM-DD)가 보이고 날짜 변경이 가능한가?" },
          { id: "nosim-dash-1-4", text: "요일 라벨이 표시되는가?" },
        ],
      },
      {
        id: "nosim-dash-kpi",
        title: "어제 확정수익 KPI (v2 신규)",
        items: [
          { id: "nosim-dash-2-1", text: '"어제 확정수익" 카드가 표시되는가?' },
          { id: "nosim-dash-2-2", text: "수익 금액이 emerald-500 색상으로 크게 표시되는가?" },
          { id: "nosim-dash-2-3", text: "수직 구분선 옆에 매출건수, 매출금액, 비용금액이 작은 텍스트로 표시되는가?" },
        ],
      },
      {
        id: "nosim-dash-trend",
        title: "순익 추이 (v2 신규)",
        items: [
          { id: "nosim-dash-3-1", text: '"순익 추이" 섹션 타이틀과 링크 아이콘이 보이는가?' },
          { id: "nosim-dash-3-2", text: "기간 탭 선택기(일간/주간/월간)가 보이는가?" },
          { id: "nosim-dash-3-3", text: "각 탭 클릭 시 차트 데이터가 변경되는가?" },
          { id: "nosim-dash-3-4", text: "바 차트가 정상 렌더링되는가?" },
          { id: "nosim-dash-3-5", text: "수익/손실이 색상으로 구분되는가?" },
          { id: "nosim-dash-3-6", text: "축 라벨과 값이 표시되는가?" },
        ],
      },
      {
        id: "nosim-dash-activity",
        title: "활동 섹션 (v2 신규)",
        items: [
          { id: "nosim-dash-4-1", text: '"활동" 섹션이 표시되는가?' },
          { id: "nosim-dash-4-2", text: '활동 유형 태그가 색상으로 구분되는가? (출고: 빨강, 입고: 파랑, 조정: 주황, 취소: 회색, 체크: 초록, 발주: 보라, 수령: 틸)' },
          { id: "nosim-dash-4-3", text: "각 활동 항목에 품목명, 수량, 시간이 표시되는가?" },
          { id: "nosim-dash-4-4", text: "취소 활동 클릭 시 상세 모달이 열리는가?" },
          { id: "nosim-dash-4-5", text: "취소 모달에 취소선 품목명, 원본 기록(시간/작업자/변동량), 취소 처리 정보가 표시되는가?" },
        ],
      },
      {
        id: "nosim-dash-v1-compare",
        title: "v1 대비 누락 기능 확인",
        items: [
          { id: "nosim-dash-m1", text: "빠른 검색(품목명/바코드/브랜드) 검색바가 있는가? (v1에 있었음 — v2 누락)" },
          { id: "nosim-dash-m2", text: "바코드 스캐너(전체 화면 오버레이)가 있는가? (v1에 있었음 — v2는 재고에서 제공)" },
          { id: "nosim-dash-m3", text: "오늘 할 일(TodayTasks) 섹션이 있는가? (v1에 있었음 — v2 누락)" },
          { id: "nosim-dash-m4", text: "최근 활동(RecentActivity) 섹션이 있는가? (v1에 있었음 — v2는 활동 탭으로 변경)" },
          { id: "nosim-dash-m5", text: "한글 초성 검색이 있는가? (v1에 있었음 — v2 누락)" },
          { id: "nosim-dash-m6", text: "스캐너 카드(퀵 액세스)가 있는가? (v1에 있었음 — v2 누락)" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 노심v2 — 재고 목록
  // ─────────────────────────────────────────────
  {
    id: "nosim-inventory",
    title: "재고 관리",
    description: "/inventory",
    service: "nosim",
    subsections: [
      {
        id: "nosim-inv-header",
        title: "헤더 / 탭",
        items: [
          { id: "nosim-inv-1-1", text: "재고 페이지가 정상적으로 열리는가?" },
          { id: "nosim-inv-1-2", text: '"재고" 타이틀이 표시되는가?' },
          { id: "nosim-inv-1-3", text: "매장 선택 드롭다운이 보이는가?" },
          { id: "nosim-inv-1-4", text: '탭 네비게이션("재고" | "활동")이 보이는가?' },
          { id: "nosim-inv-1-5", text: "탭 전환이 정상 동작하는가?" },
        ],
      },
      {
        id: "nosim-inv-search",
        title: "검색 / 필터",
        items: [
          { id: "nosim-inv-2-1", text: "상단에 검색바(돋보기 아이콘)가 보이는가?" },
          { id: "nosim-inv-2-2", text: "품목명으로 검색 → 해당 품목만 표시되는가?" },
          { id: "nosim-inv-2-3", text: "검색어 삭제 → 전체 목록으로 복귀하는가?" },
          { id: "nosim-inv-2-4", text: '상태 필터 버튼("전체" | "긴급발주" | "부족" | "안전")이 보이는가?' },
          { id: "nosim-inv-2-5", text: "각 필터 버튼 클릭 → 해당 상태 품목만 표시되는가?" },
        ],
      },
      {
        id: "nosim-inv-item-card",
        title: "품목 카드",
        items: [
          { id: "nosim-inv-3-1", text: "각 품목에 품목명(bold, slate-900)이 표시되는가?" },
          { id: "nosim-inv-3-2", text: "카테고리 배지(small, slate-500)가 표시되는가?" },
          { id: "nosim-inv-3-3", text: "현재 재고 수량이 크게 표시되고 상태별 색상이 적용되는가?" },
          { id: "nosim-inv-3-4", text: "안전재고 대비 비교가 표시되는가?" },
          { id: "nosim-inv-3-5", text: '상태 배지가 정상인가? ("즉시발주": 빨강, "부족": 노랑, "안전": 남색)' },
          { id: "nosim-inv-3-6", text: '"발주하기" 버튼(남색, rounded)이 보이고 동작하는가?' },
          { id: "nosim-inv-3-7", text: "마지막 업데이트 시간(작은 회색 텍스트)이 표시되는가?" },
          { id: "nosim-inv-3-8", text: "품목 카드 클릭 → 품목 상세 페이지로 이동하는가?" },
        ],
      },
      {
        id: "nosim-inv-activity-tab",
        title: "활동 탭 (v2 신규)",
        items: [
          { id: "nosim-inv-4-1", text: "활동 탭 선택 → 타임라인 형태의 재고 변동 이력이 표시되는가?" },
          { id: "nosim-inv-4-2", text: "각 로그에 활동 유형 배지가 표시되는가?" },
          { id: "nosim-inv-4-3", text: "품목명, 수량 변동(+/-), 전후 수량이 표시되는가?" },
          { id: "nosim-inv-4-4", text: "타임스탬프(작은 회색)와 작업자 이름이 표시되는가?" },
        ],
      },
      {
        id: "nosim-inv-v1-compare",
        title: "v1 대비 누락 기능 확인",
        items: [
          { id: "nosim-inv-m1", text: '뷰 모드 탭(전체, 카테고리, 바코드 없음, 발주 대기, 미분류 발주, 비활성화)이 있는가? (v1에 있었음 — v2 간소화)' },
          { id: "nosim-inv-m2", text: "+/- 빠른 재고 조정 버튼이 있는가? (v1에 있었음 — v2 확인 필요)" },
          { id: "nosim-inv-m3", text: "드래그 & 드롭 정렬(dnd-kit)이 있는가? (v1에 있었음 — v2 누락)" },
          { id: "nosim-inv-m4", text: "차트 보기(Bar/Pie)가 있는가? (v1에 있었음 — v2 누락)" },
          { id: "nosim-inv-m5", text: "바코드 복사 기능이 있는가? (v1에 있었음 — v2 누락)" },
          { id: "nosim-inv-m6", text: "카카오 공유(손실량 보고서)가 있는가? (v1에 있었음 — v2 누락)" },
          { id: "nosim-inv-m7", text: '하단 단축 버튼(바코드 스캔, 바코드 인쇄, 재고 순서 편집, 재고 변경 이력, 달력 보기)이 있는가? (v1에 있었음 — v2 확인 필요)' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 노심v2 — 품목 추가
  // ─────────────────────────────────────────────
  {
    id: "nosim-item-add",
    title: "품목 추가 (신규 상품 등록)",
    description: "/inventory/add",
    service: "nosim",
    subsections: [
      {
        id: "nosim-add-header",
        title: "헤더",
        items: [
          { id: "nosim-add-1-1", text: '뒤로가기 버튼(ArrowLeft) + "신규 상품 등록" 타이틀이 보이는가?' },
          { id: "nosim-add-1-2", text: "배경이 #f8f9fc인가?" },
          { id: "nosim-add-1-3", text: "에러 발생 시 빨간 알림(AlertCircle 아이콘, bg-red-50, border-red-200)이 표시되는가?" },
        ],
      },
      {
        id: "nosim-add-product-info",
        title: "상품정보 섹션",
        items: [
          { id: "nosim-add-2-1", text: '"상품정보" 섹션 헤더(좌측 엑센트 보더)가 보이는가?' },
          { id: "nosim-add-2-2", text: '"상품명 *" 필수 입력란(placeholder: "상품명을 입력하세요", rounded-xl)이 보이는가?' },
          { id: "nosim-add-2-3", text: '"브랜드" 입력란(placeholder: "브랜드명 입력")이 보이는가?' },
          { id: "nosim-add-2-4", text: "단위 선택 pill 버튼(개, kg, L, 박스, 팩, 봉)이 보이는가?" },
          { id: "nosim-add-2-5", text: "선택된 단위: 남색 배경(indigo-600) + 흰 글자, 미선택: stone-50 + slate-600인가?" },
          { id: "nosim-add-2-6", text: '"단위 수량 (1{단위} = ?개)" 입력란(placeholder: "1")이 보이는가?' },
          { id: "nosim-add-2-7", text: '"안전재고" 입력란(placeholder: "0")이 보이는가?' },
        ],
      },
      {
        id: "nosim-add-category-supplier",
        title: "카테고리 / 발주처",
        items: [
          { id: "nosim-add-3-1", text: "카테고리 선택 드롭다운(첫 옵션: \"카테고리 선택\")이 보이는가?" },
          { id: "nosim-add-3-2", text: "API에서 로드된 카테고리 목록이 표시되는가?" },
          { id: "nosim-add-3-3", text: '"발주처명" 입력란(placeholder: "발주처 이름 입력")이 보이는가?' },
          { id: "nosim-add-3-4", text: '발주 방식 드롭다운("선택 안함", "온라인 발주", "카카오톡", "전화주문", "문자주문")이 보이는가?' },
        ],
      },
      {
        id: "nosim-add-extra",
        title: "구매 URL / 바코드 / 메모",
        items: [
          { id: "nosim-add-4-1", text: "구매 URL 텍스트 영역(줄바꿈 구분, rows: 3)이 보이는가?" },
          { id: "nosim-add-4-2", text: '바코드 입력란(monospace, placeholder: "바코드 번호")이 보이는가?' },
          { id: "nosim-add-4-3", text: '메모 텍스트 영역(rows: 3, placeholder: "메모 입력")이 보이는가?' },
        ],
      },
      {
        id: "nosim-add-image",
        title: "이미지 업로드",
        items: [
          { id: "nosim-add-5-1", text: '사진 업로드 버튼(Camera 아이콘 + "사진 업로드", indigo-600)이 보이는가?' },
          { id: "nosim-add-5-2", text: "파일 선택 → 이미지 미리보기가 표시되는가?" },
        ],
      },
      {
        id: "nosim-add-submit",
        title: "등록 / 검증",
        items: [
          { id: "nosim-add-6-1", text: '"등록" 버튼(전체 너비, indigo-600)이 보이는가?' },
          { id: "nosim-add-6-2", text: "상품명 비어있으면 → 버튼이 비활성화되는가?" },
          { id: "nosim-add-6-3", text: "등록 클릭 → 스피너 표시 + \"등록 중...\" 텍스트로 변경되는가?" },
          { id: "nosim-add-6-4", text: "등록 성공 → 재고 목록에 새 품목이 나타나는가?" },
        ],
      },
      {
        id: "nosim-add-v1-compare",
        title: "v1 대비 누락 기능 확인",
        items: [
          { id: "nosim-add-m1", text: '카테고리 가로 스크롤 pill + "추가" pill(인라인 생성)이 있는가? (v1에 있었음 — v2 드롭다운으로 변경)' },
          { id: "nosim-add-m2", text: '발주처 드롭다운(온라인/저장된 발주처 그룹 + 직접입력)이 있는가? (v1에 있었음 — v2 텍스트 입력으로 변경)' },
          { id: "nosim-add-m3", text: "바코드 스캔 카메라 버튼(📷)이 있는가? (v1에 있었음 — v2 확인 필요)" },
          { id: "nosim-add-m4", text: '바코드 중복 검사(스피너 + 초록 체크 / 빨강 "이미 등록됨")가 동작하는가? (v1에 있었음)' },
          { id: "nosim-add-m5", text: '"+ 바코드 추가" 다중 바코드 등록이 가능한가? (v1에 있었음 — v2 누락)' },
          { id: "nosim-add-m6", text: '"바코드 없는 상품" 자동 생성이 있는가? (v1에 있었음 — v2 확인 필요)' },
          { id: "nosim-add-m7", text: '"취소" 버튼(외곽선)이 있는가? (v1에 있었음 — v2 확인 필요)' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 노심v2 — 품목 상세
  // ─────────────────────────────────────────────
  {
    id: "nosim-item-detail",
    title: "품목 상세",
    description: "/inventory/[id]",
    service: "nosim",
    subsections: [
      {
        id: "nosim-detail-header",
        title: "헤더",
        items: [
          { id: "nosim-detail-1-1", text: "뒤로가기 버튼 + 품목명(수정 연필 아이콘)이 보이는가?" },
          { id: "nosim-detail-1-2", text: "브랜드명이 표시되는가? (등록된 경우)" },
          { id: "nosim-detail-1-3", text: "재고 상태 배지(안전/부족)가 표시되는가?" },
          { id: "nosim-detail-1-4", text: '수정 버튼(연필 아이콘 + "수정") 또는 닫기 버튼(X)이 보이는가?' },
        ],
      },
      {
        id: "nosim-detail-stock",
        title: "① 재고현황",
        items: [
          { id: "nosim-detail-2-1", text: '"재고현황" 타이틀과 상태 점(색상 구분)이 보이는가?' },
          { id: "nosim-detail-2-2", text: "3열 그리드: 현재 재고(크게, 색상), 안전재고, 비율(%)이 표시되는가?" },
          { id: "nosim-detail-2-3", text: "마지막 업데이트 시간(작은 회색, 우측 정렬)이 표시되는가?" },
        ],
      },
      {
        id: "nosim-detail-edit",
        title: "② 수정 모드",
        items: [
          { id: "nosim-detail-3-1", text: '수정 버튼 클릭 → 파란 엑센트 보더 + "상품 정보 수정" 섹션이 표시되는가?' },
          { id: "nosim-detail-3-2", text: "기존 값이 각 입력란에 미리 채워져 있는가?" },
          { id: "nosim-detail-3-3", text: "저장 버튼 클릭 → 스피너 표시 후 수정이 완료되는가?" },
          { id: "nosim-detail-3-4", text: "취소 버튼 클릭 → 수정 모드가 닫히는가?" },
        ],
      },
      {
        id: "nosim-detail-info",
        title: "③ 상품 정보",
        items: [
          { id: "nosim-detail-4-1", text: '"상품 정보" 타이틀(Package 아이콘)이 보이는가?' },
          { id: "nosim-detail-4-2", text: "2열 행: 라벨(회색, xs) | 값(slate-700, bold)으로 표시되는가?" },
          { id: "nosim-detail-4-3", text: "바코드(복사 버튼 포함, monospace)가 표시되는가?" },
          { id: "nosim-detail-4-4", text: "단위, 카테고리가 표시되는가?" },
          { id: "nosim-detail-4-5", text: "메모가 border-top 구분선 아래에 별도 블록으로 표시되는가?" },
        ],
      },
      {
        id: "nosim-detail-price",
        title: "④ 가격 정보",
        items: [
          { id: "nosim-detail-5-1", text: '"가격 정보" 타이틀(Tag 아이콘)이 보이는가?' },
          { id: "nosim-detail-5-2", text: "구매단가, 판매단가, 최근발주단가, 최근발주일 행이 표시되는가?" },
          { id: "nosim-detail-5-3", text: '가격 이력 펼치기/접기가 가능한가? ("가격 이력" 서브 헤딩)' },
          { id: "nosim-detail-5-4", text: "타임라인 형태로 발주처, 단가, 수량, 총액, 날짜가 표시되는가?" },
        ],
      },
      {
        id: "nosim-detail-supplier",
        title: "⑤ 발주처 정보",
        items: [
          { id: "nosim-detail-6-1", text: '"발주처 정보" 타이틀(ShoppingCart 아이콘)이 보이는가?' },
          { id: "nosim-detail-6-2", text: "기본 발주처명과 타입 배지가 표시되는가?" },
          { id: "nosim-detail-6-3", text: "연락처: 전화(Phone 아이콘, 클릭 가능)와 이메일(Mail 아이콘, 클릭 가능)이 표시되는가?" },
          { id: "nosim-detail-6-4", text: "구매 링크(ExternalLink 아이콘): 사이트별 색상(쿠팡: 빨강, 배민: 틸, 네이버: 초록)으로 표시되는가?" },
        ],
      },
      {
        id: "nosim-detail-orders",
        title: "⑥ 최근 발주",
        items: [
          { id: "nosim-detail-7-1", text: '"최근 발주" 타이틀(TrendingUp 아이콘)이 보이는가?' },
          { id: "nosim-detail-7-2", text: "각 발주 카드에 발주처명, 상태 배지, 발주일이 표시되는가?" },
          { id: "nosim-detail-7-3", text: "단가 × 수량 = 소계가 표시되는가?" },
          { id: "nosim-detail-7-4", text: '상태: "전량 입고 완료"(초록, CheckCircle2) 또는 "입고 n/m단위"(노랑, AlertTriangle)가 표시되는가?' },
        ],
      },
      {
        id: "nosim-detail-batch",
        title: "⑦ 재고 배치 (유통기한)",
        items: [
          { id: "nosim-detail-8-1", text: "배치 카드에 잔여 수량이 표시되는가?" },
          { id: "nosim-detail-8-2", text: "유통기한 + 만료까지 남은 일수가 표시되는가?" },
          { id: "nosim-detail-8-3", text: "유통기한 상태별 색상이 적용되는가? (만료: 빨강, 임박: 노랑)" },
          { id: "nosim-detail-8-4", text: "입고일과 발주처 타입이 표시되는가?" },
        ],
      },
      {
        id: "nosim-detail-logs",
        title: "⑧ 재고 변동 이력",
        items: [
          { id: "nosim-detail-9-1", text: '"재고 변동 이력" 타이틀(Clock 아이콘)이 보이는가?' },
          { id: "nosim-detail-9-2", text: "시간순 변경 이력에 유형(입고/출고), 수량, 시간, 사용자가 표시되는가?" },
          { id: "nosim-detail-9-3", text: "수량 변동: 증가(+초록), 감소(-빨강), monospace로 표시되는가?" },
          { id: "nosim-detail-9-4", text: "전후 수량이 표시되는가?" },
        ],
      },
      {
        id: "nosim-detail-status",
        title: "⑨ 상태 관리 / 메타",
        items: [
          { id: "nosim-detail-10-1", text: '"비활성화"/"활성화" 토글 버튼이 보이는가?' },
          { id: "nosim-detail-10-2", text: "비활성화 시 재고 목록에서 숨겨지는가?" },
          { id: "nosim-detail-10-3", text: '"메타 정보"(FileText 아이콘): 생성일, 수정일, 상품 ID(monospace, 회색)가 표시되는가?' },
        ],
      },
      {
        id: "nosim-detail-v1-compare",
        title: "v1 대비 누락 기능 확인",
        items: [
          { id: "nosim-detail-m1", text: "발주처별 가격 비교(최신/평균/최저/최고)가 있는가? (v1에 있었음 — v2 확인 필요)" },
          { id: "nosim-detail-m2", text: "+/- 빠른 재고 조정 버튼이 있는가? (v1에 있었음 — v2 확인 필요)" },
          { id: "nosim-detail-m3", text: "시각적 재고 바(progress bar)가 있는가? (v1에 있었음 — v2 확인 필요)" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 노심v2 — 발주 (주문)
  // ─────────────────────────────────────────────
  {
    id: "nosim-order",
    title: "발주 (주문)",
    description: "/inventory/[id]/order",
    service: "nosim",
    subsections: [
      {
        id: "nosim-order-header",
        title: "헤더 / 품목 정보",
        items: [
          { id: "nosim-order-1-1", text: '뒤로가기 버튼 + "발주하기" 타이틀이 보이는가?' },
          { id: "nosim-order-1-2", text: '"발주 등록" 라벨이 보이는가?' },
          { id: "nosim-order-1-3", text: "품목명(bold), 브랜드(indigo-500, 있을 경우)가 표시되는가?" },
          { id: "nosim-order-1-4", text: "현재 재고(색상 구분), 안전재고, 최근 발주 단가가 작은 텍스트로 표시되는가?" },
        ],
      },
      {
        id: "nosim-order-quantity",
        title: "발주 수량",
        items: [
          { id: "nosim-order-2-1", text: '"발주 수량" 라벨(필수 표시)이 보이는가?' },
          { id: "nosim-order-2-2", text: "수량 입력: −/+ 원형 버튼(11x11)과 가운데 숫자 입력(2xl, 큰 텍스트)이 보이는가?" },
          { id: "nosim-order-2-3", text: "단위 라벨이 숫자 옆에 표시되는가?" },
          { id: "nosim-order-2-4", text: "부족량 계산 도우미 텍스트가 표시되는가?" },
          { id: "nosim-order-2-5", text: "+/- 버튼으로 수량이 정상 증감하는가?" },
        ],
      },
      {
        id: "nosim-order-supplier",
        title: "발주처 / 발주 방식",
        items: [
          { id: "nosim-order-3-1", text: '"발주처" 라벨(필수) + 텍스트 입력란(placeholder: "예: 배민상회, 네이버, 코스트코")이 보이는가?' },
          { id: "nosim-order-3-2", text: '발주 방식 버튼 그룹("온라인 주문" | "카카오톡" | "전화주문" | "문자주문")이 보이는가?' },
          { id: "nosim-order-3-3", text: "선택된 방식: indigo-600 배경 + 흰 글자, 미선택: 흰 배경 + stone-200 테두리인가?" },
          { id: "nosim-order-3-4", text: '"카카오/전화/문자 선택 시 발주 메시지를 복사할 수 있습니다" 안내가 보이는가?' },
        ],
      },
      {
        id: "nosim-order-extra",
        title: "예상 입고일 / 단가 / 메모",
        items: [
          { id: "nosim-order-4-1", text: '"예상 입고일" 날짜 선택기(Calendar 아이콘, 최소: 오늘)가 보이는가?' },
          { id: "nosim-order-4-2", text: '"단가" 입력란(선택, "/" + 단위 표시)이 보이는가?' },
          { id: "nosim-order-4-3", text: "단가 입력 시 예상 금액(indigo-500)이 계산되어 표시되는가?" },
          { id: "nosim-order-4-4", text: '"메모" 텍스트 영역(FileText 아이콘, rows: 3, placeholder: "발주 관련 메모")이 보이는가?' },
        ],
      },
      {
        id: "nosim-order-online",
        title: "온라인 구매 링크",
        items: [
          { id: "nosim-order-5-1", text: "구매 URL이 등록된 경우 \"온라인 구매\" 섹션(ExternalLink 아이콘)이 보이는가?" },
          { id: "nosim-order-5-2", text: '사이트별 색상 버튼(쿠팡: red-50, 배민: teal-50, 네이버: green-50, 기본: indigo-50)이 표시되는가?' },
          { id: "nosim-order-5-3", text: '각 버튼에 사이트명(bold), 최근 가격(small), "바로구매" + ExternalLink가 표시되는가?' },
          { id: "nosim-order-5-4", text: "바로구매 클릭 → 새 탭에서 해당 URL이 열리는가?" },
        ],
      },
      {
        id: "nosim-order-message",
        title: "발주 메시지 복사 (카카오/전화/문자)",
        items: [
          { id: "nosim-order-6-1", text: "카카오톡/전화/문자 선택 시 파란 박스(blue-50)에 발주 메시지가 표시되는가?" },
          { id: "nosim-order-6-2", text: '"카카오톡으로 발주하시나요?" 등 방식별 안내 문구가 표시되는가?' },
          { id: "nosim-order-6-3", text: '복사 버튼(Copy 아이콘 + "복사") 클릭 → "복사됨"(Check 아이콘, green-100)으로 변경되는가?' },
          { id: "nosim-order-6-4", text: "발주 메시지가 monospace 포맷으로 정확히 표시되는가?" },
        ],
      },
      {
        id: "nosim-order-submit",
        title: "하단 버튼",
        items: [
          { id: "nosim-order-7-1", text: '고정 하단 바에 "취소"(stone-100, slate-700)와 발주 완료 버튼(indigo-600)이 보이는가?' },
          { id: "nosim-order-7-2", text: '발주 완료 버튼에 "{수량}{단위} 발주 완료" 텍스트가 표시되는가?' },
          { id: "nosim-order-7-3", text: "발주처 비어있거나 수량 0이면 → 버튼이 비활성화되는가?" },
          { id: "nosim-order-7-4", text: '제출 중 → "등록 중..." 텍스트와 스피너가 표시되는가?' },
          { id: "nosim-order-7-5", text: '발주 성공 → "✓ 발주가 등록되었습니다." 토스트가 표시되고 /inventory로 이동하는가?' },
        ],
      },
      {
        id: "nosim-order-v1-compare",
        title: "v1 대비 누락 기능 확인",
        items: [
          { id: "nosim-order-m1", text: "발주처 드롭다운(기본 발주처 미리 선택)이 있는가? (v1에 있었음 — v2 텍스트 입력)" },
          { id: "nosim-order-m2", text: "단위 환산 정보가 표시되는가? (v1에 있었음 — v2 확인 필요)" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 노심v2 — 손익분석
  // ─────────────────────────────────────────────
  {
    id: "nosim-profit-loss",
    title: "손익분석",
    description: "/profit-loss (4탭: 발주/비용/채널/손익계산서)",
    service: "nosim",
    subsections: [
      {
        id: "nosim-pnl-header",
        title: "헤더 / 공통",
        items: [
          { id: "nosim-pnl-1-1", text: "손익분석 페이지가 정상적으로 열리는가?" },
          { id: "nosim-pnl-1-2", text: '"손익계산" 타이틀이 표시되는가?' },
          { id: "nosim-pnl-1-3", text: "연월 선택기가 보이고 월 변경이 가능한가?" },
          { id: "nosim-pnl-1-4", text: "매장명이 표시되는가?" },
          { id: "nosim-pnl-1-5", text: '탭 네비게이션("발주" | "비용" | "채널" | "손익계산서")이 보이는가?' },
          { id: "nosim-pnl-1-6", text: "선택된 탭: 파란 하단 보더, 미선택: 회색인가?" },
          { id: "nosim-pnl-1-7", text: "탭 전환 시 해당 패널이 로딩되는가?" },
        ],
      },
      {
        id: "nosim-pnl-order",
        title: "발주 탭",
        items: [
          { id: "nosim-pnl-2-1", text: "발주 분석 데이터가 표시되는가?" },
          { id: "nosim-pnl-2-2", text: "데이터 로딩 중 스피너가 표시되는가?" },
          { id: "nosim-pnl-2-3", text: "발주처별/품목별 발주 내역이 표시되는가?" },
        ],
      },
      {
        id: "nosim-pnl-cost",
        title: "비용 탭 (v2 신규: 고정비/변동비)",
        items: [
          { id: "nosim-pnl-3-1", text: "비용 입력 패널이 표시되는가?" },
          { id: "nosim-pnl-3-2", text: "고정비 섹션: 항목별 입력 필드가 있는가?" },
          { id: "nosim-pnl-3-3", text: "변동비 섹션: 항목별 입력 필드가 있는가?" },
          { id: "nosim-pnl-3-4", text: "비용 항목 추가/삭제가 가능한가?" },
          { id: "nosim-pnl-3-5", text: "입력한 비용이 저장되는가?" },
        ],
      },
      {
        id: "nosim-pnl-channel",
        title: "채널 탭",
        items: [
          { id: "nosim-pnl-4-1", text: "채널별 매출 분석이 표시되는가?" },
          { id: "nosim-pnl-4-2", text: "채널별 비용 분석이 표시되는가?" },
          { id: "nosim-pnl-4-3", text: "채널별 수익 계산이 표시되는가?" },
        ],
      },
      {
        id: "nosim-pnl-statement",
        title: "손익계산서 탭",
        items: [
          { id: "nosim-pnl-5-1", text: "손익계산서가 표 형태로 표시되는가?" },
          { id: "nosim-pnl-5-2", text: "매출, 비용, 이익 항목이 구분되어 표시되는가?" },
          { id: "nosim-pnl-5-3", text: "수정 가능한 필드가 있는가?" },
          { id: "nosim-pnl-5-4", text: "합계가 자동 계산되는가?" },
        ],
      },
      {
        id: "nosim-pnl-expense",
        title: "비용 개요 (v2 신규)",
        items: [
          { id: "nosim-pnl-6-1", text: "비용 카드에 카테고리명, 금액(색상), 비율(%)이 표시되는가?" },
          { id: "nosim-pnl-6-2", text: "비용 파이 차트가 정상 렌더링되는가?" },
          { id: "nosim-pnl-6-3", text: "인사이트/추천사항이 표시되는가?" },
        ],
      },
      {
        id: "nosim-pnl-v1-compare",
        title: "v1 대비 변경/누락 확인",
        items: [
          { id: "nosim-pnl-m1", text: "원재료 달력(월별 입출고 추이)이 있는가? (v1에 있었음 — v2 확인 필요)" },
          { id: "nosim-pnl-m2", text: "품목 가격 추이 차트가 있는가? (v1에 있었음 — v2 확인 필요)" },
          { id: "nosim-pnl-m3", text: "지출 분석 탭이 있는가? (v1에 있었음 — v2 비용 탭으로 통합)" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 노심v2 — 손익분석 v2 (고급)
  // ─────────────────────────────────────────────
  {
    id: "nosim-profit-loss-2",
    title: "손익분석 v2 (고급 PnL)",
    description: "/profit-loss-2 (v2 신규)",
    service: "nosim",
    subsections: [
      {
        id: "nosim-pnl2-basic",
        title: "고급 PnL 분석",
        items: [
          { id: "nosim-pnl2-1", text: "손익분석 v2 페이지가 정상적으로 열리는가?" },
          { id: "nosim-pnl2-2", text: "고급 손익 분석 데이터가 로딩되는가?" },
          { id: "nosim-pnl2-3", text: "매출/비용/이익 차트가 정상 렌더링되는가?" },
          { id: "nosim-pnl2-4", text: "기간 선택(월/분기)이 가능한가?" },
          { id: "nosim-pnl2-5", text: "카테고리별 상세 분석이 가능한가?" },
          { id: "nosim-pnl2-6", text: "데이터 로딩 중 스피너가 표시되는가?" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 노심v2 — 손익분석 v3 (비교)
  // ─────────────────────────────────────────────
  {
    id: "nosim-profit-loss-3",
    title: "손익분석 v3 (기간 비교)",
    description: "/profit-loss-3 (v2 신규)",
    service: "nosim",
    subsections: [
      {
        id: "nosim-pnl3-basic",
        title: "일일/주간/월간 비교",
        items: [
          { id: "nosim-pnl3-1", text: "손익분석 v3 페이지가 정상적으로 열리는가?" },
          { id: "nosim-pnl3-2", text: "일일 비교 모드가 동작하는가?" },
          { id: "nosim-pnl3-3", text: "주간 비교 모드가 동작하는가?" },
          { id: "nosim-pnl3-4", text: "월간 비교 모드가 동작하는가?" },
          { id: "nosim-pnl3-5", text: "기간 간 비교 차트가 정상 렌더링되는가?" },
          { id: "nosim-pnl3-6", text: "이전 기간 대비 증감률이 표시되는가?" },
          { id: "nosim-pnl3-7", text: "데이터 로딩 중 스피너가 표시되는가?" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 노심v2 — 직원 관리 (6탭)
  // ─────────────────────────────────────────────
  {
    id: "nosim-staff",
    title: "직원 관리",
    description: "/staff (6탭: 근태현황/근무일정/출퇴근기록/급여/직원목록/체크리스트)",
    service: "nosim",
    subsections: [
      {
        id: "nosim-staff-tabs",
        title: "상단 탭 (v2 신규)",
        items: [
          { id: "nosim-staff-1-1", text: "직원 관리 페이지가 정상적으로 열리는가?" },
          { id: "nosim-staff-1-2", text: '고정 상단 탭 6개("근태현황" | "근무일정" | "출퇴근기록" | "급여" | "직원목록" | "체크리스트")가 보이는가?' },
          { id: "nosim-staff-1-3", text: "각 탭 클릭 → 해당 패널이 표시되는가?" },
          { id: "nosim-staff-1-4", text: "선택된 탭이 강조 표시되는가?" },
        ],
      },
      {
        id: "nosim-staff-kanban-self",
        title: "근태현황 — 직원 본인 화면",
        items: [
          { id: "nosim-staff-2-1", text: "아바타 원(ID별 색상)과 이름(크게, bold), 역할 라벨이 보이는가?" },
          { id: "nosim-staff-2-2", text: '상태 플로우 바("출근 전" → "근무 중" → "퇴근 완료" → "조퇴·수정")가 보이는가?' },
          { id: "nosim-staff-2-3", text: "현재 단계가 색상으로 강조되고 비활성 단계는 회색인가?" },
          { id: "nosim-staff-2-4", text: "큰 시계 표시(HH:MM, monospace, 52px)가 보이는가?" },
          { id: "nosim-staff-2-5", text: '출근 전: 검은 원형 버튼(155x155px) + ✌️ + "출근" 라벨이 보이는가?' },
          { id: "nosim-staff-2-6", text: '근무 중: 초록 테두리 원형 버튼 + 👋 + "퇴근" 라벨이 보이는가?' },
          { id: "nosim-staff-2-7", text: '퇴근 완료: 파란 원형 표시 + ✅ + "근무 완료" 라벨이 보이는가?' },
          { id: "nosim-staff-2-8", text: "출근 버튼 클릭 → 출근 처리되고 상태가 변경되는가?" },
          { id: "nosim-staff-2-9", text: "퇴근 버튼 클릭 → 퇴근 처리되고 상태가 변경되는가?" },
          { id: "nosim-staff-2-10", text: '급여 정보 설정 시 "이번 달 예상 급여" 카드(금액 22px, bold + "원")가 표시되는가?' },
        ],
      },
      {
        id: "nosim-staff-kanban-manager",
        title: "근태현황 — 사장님/관리자 화면",
        items: [
          { id: "nosim-staff-3-1", text: '상태 KPI 카드 3개("근무중" green-600, "퇴근완료" blue-600, "미출근" slate-400)가 보이는가?' },
          { id: "nosim-staff-3-2", text: "각 KPI에 인원 수(2xl, bold, monospace)가 표시되는가?" },
          { id: "nosim-staff-3-3", text: '"📊 오늘 근무 현황" 카드에 날짜와 직원 목록이 표시되는가?' },
          { id: "nosim-staff-3-4", text: "각 직원: 아바타 + 이름 + 역할, 예정 시간, 출퇴근 시간(monospace), 상태 배지가 표시되는가?" },
          { id: "nosim-staff-3-5", text: '지각 시 "⚠ {분}분 지각" 경고가 표시되는가?' },
          { id: "nosim-staff-3-6", text: '관리자 액션 버튼("출근↑" 초록, "퇴근↓" 주황)이 보이고 동작하는가?' },
          { id: "nosim-staff-3-7", text: '"📋 출퇴근 기록 (오늘 전체)" 테이블이 표시되는가?' },
          { id: "nosim-staff-3-8", text: "직원 필터 드롭다운이 보이는가?" },
          { id: "nosim-staff-3-9", text: "테이블 컬럼(직원 | 유형 | 시각 | 예정시각 | 지각/조퇴 | 삭제)이 표시되는가?" },
          { id: "nosim-staff-3-10", text: "삭제 버튼이 동작하는가?" },
        ],
      },
      {
        id: "nosim-staff-schedule",
        title: "근무일정 탭 (v2 신규)",
        items: [
          { id: "nosim-staff-4-1", text: "주/월 토글과 이전/다음(‹ ›) 네비게이션이 보이는가?" },
          { id: "nosim-staff-4-2", text: '현재 날짜 범위와 "+ 근무 추가" 버튼이 보이는가? (사장님/관리자만)' },
          { id: "nosim-staff-4-3", text: '"🕐 영업시간 설정" 카드에 "오픈 {시간} → 마감 {시간}"이 표시되는가?' },
          { id: "nosim-staff-4-4", text: "수정 버튼 클릭 → 시간 입력란 + 취소/저장 버튼이 나타나는가?" },
          { id: "nosim-staff-4-5", text: '주차 탭("1주차 {범위}" | "2주차 {범위}")이 보이는가?' },
          { id: "nosim-staff-4-6", text: "범례: 직원별 색상 + 역할 라벨이 표시되는가?" },
          { id: "nosim-staff-4-7", text: "일정 그리드: 좌측 직원명/역할, 상단 요일/날짜(오늘: 파란, 일: 빨강, 토: 파랑)가 표시되는가?" },
          { id: "nosim-staff-4-8", text: "셀에 근무 카드(직원 색상 배경/테두리, 시작/종료 시간)가 표시되는가?" },
          { id: "nosim-staff-4-9", text: '빈 셀에 "+" 버튼 → 근무 추가 바텀시트가 열리는가?' },
          { id: "nosim-staff-4-10", text: '근무 추가 바텀시트: 직원 선택(색상 버튼), 날짜, 시간 입력(출근|퇴근), 시간 미리보기(파란), 확인/취소 버튼이 보이는가?' },
          { id: "nosim-staff-4-11", text: '"📊 2주 근무 요약" 테이블(직원 | 직책 | 근무일 | 총근무 | 요일)이 표시되는가?' },
        ],
      },
      {
        id: "nosim-staff-records",
        title: "출퇴근기록 탭",
        items: [
          { id: "nosim-staff-5-1", text: "출퇴근기록 탭이 동작하는가?" },
          { id: "nosim-staff-5-2", text: "날짜별 출퇴근 기록이 테이블로 표시되는가?" },
          { id: "nosim-staff-5-3", text: "직원별 출근/퇴근 시간(monospace)이 표시되는가?" },
        ],
      },
      {
        id: "nosim-staff-payroll",
        title: "급여 탭 (v2 신규)",
        items: [
          { id: "nosim-staff-6-1", text: "급여 탭이 동작하는가?" },
          { id: "nosim-staff-6-2", text: "직원별 급여 정보가 표시되는가?" },
          { id: "nosim-staff-6-3", text: "급여 입력/수정이 가능한가?" },
        ],
      },
      {
        id: "nosim-staff-list",
        title: "직원목록 탭",
        items: [
          { id: "nosim-staff-7-1", text: "활성 직원 목록이 표시되는가?" },
          { id: "nosim-staff-7-2", text: "각 직원: 이름, 역할, 연락처가 표시되는가?" },
          { id: "nosim-staff-7-3", text: "직원 추가가 가능한가?" },
          { id: "nosim-staff-7-4", text: "직원 삭제가 가능한가?" },
          { id: "nosim-staff-7-5", text: "직원 정보 수정이 가능한가?" },
        ],
      },
      {
        id: "nosim-staff-v1-compare",
        title: "v1 대비 누락 기능 확인",
        items: [
          { id: "nosim-staff-m1", text: "대기 중인 직원 목록이 있는가? (v1에 있었음 — v2 누락)" },
          { id: "nosim-staff-m2", text: "사전 등록(휴대폰 번호)이 가능한가? (v1에 있었음 — v2 누락)" },
          { id: "nosim-staff-m3", text: "직원 수정 별도 페이지(/staff/[id]/edit)가 있는가? (v1에 있었음 — v2 누락)" },
          { id: "nosim-staff-m4", text: "매장 배정 변경이 가능한가? (v1에 있었음 — v2 누락)" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 노심v2 — 출퇴근 관리
  // ─────────────────────────────────────────────
  {
    id: "nosim-attendance",
    title: "출퇴근 관리",
    description: "/attendance (v2 신규, 3탭: 오늘/기록/월간)",
    service: "nosim",
    subsections: [
      {
        id: "nosim-att-header",
        title: "헤더",
        items: [
          { id: "nosim-att-1-1", text: '브레드크럼 "직원관리 › 출퇴근 기록"이 보이는가?' },
          { id: "nosim-att-1-2", text: '"✅ 출퇴근 관리" 타이틀이 보이는가?' },
          { id: "nosim-att-1-3", text: "날짜 라벨이 표시되는가?" },
          { id: "nosim-att-1-4", text: '탭 네비게이션("오늘" | "기록" | "월간")이 보이는가?' },
        ],
      },
      {
        id: "nosim-att-today",
        title: "오늘 탭",
        items: [
          { id: "nosim-att-2-1", text: 'KPI 카드 3개("근무중" green, "퇴근완료" blue, "미출근" gray)가 보이는가?' },
          { id: "nosim-att-2-2", text: "각 KPI에 인원 수(2xl, bold, monospace)가 표시되는가?" },
          { id: "nosim-att-2-3", text: '"📊 오늘 근무 현황" 카드에 직원별 상태가 표시되는가?' },
          { id: "nosim-att-2-4", text: "각 직원: 아바타, 이름, 역할, 예정 시간(또는 \"미배정\")이 표시되는가?" },
          { id: "nosim-att-2-5", text: "출퇴근 시간(monospace)이 표시되는가?" },
          { id: "nosim-att-2-6", text: '지각 시 "⚠ {분}분 지각" 경고가 표시되는가?' },
          { id: "nosim-att-2-7", text: "상태 배지(Tag 컴포넌트)가 표시되는가?" },
          { id: "nosim-att-2-8", text: '사장님/관리자: "출근↑"(초록, 10px) / "퇴근↓"(주황) 액션 버튼이 동작하는가?' },
          { id: "nosim-att-2-9", text: '"📋 출퇴근 기록 (오늘 전체)" 테이블이 표시되는가?' },
          { id: "nosim-att-2-10", text: "직원 필터 드롭다운이 동작하는가?" },
          { id: "nosim-att-2-11", text: "테이블 컬럼(직원 | 유형 | 시각 | 예정시각 | 지각/조퇴)이 표시되는가?" },
          { id: "nosim-att-2-12", text: "색상 점 + 직원명, 출근/퇴근 태그, 시간(monospace)이 표시되는가?" },
          { id: "nosim-att-2-13", text: "삭제 버튼(빨간 배경, red-600)이 동작하는가?" },
        ],
      },
      {
        id: "nosim-att-history",
        title: "기록 탭",
        items: [
          { id: "nosim-att-3-1", text: '"날짜 선택" 카드에 날짜 입력(focus: blue-500)이 보이는가?' },
          { id: "nosim-att-3-2", text: '"📋 {날짜} 출퇴근 기록" 헤더와 건수 배지가 표시되는가?' },
          { id: "nosim-att-3-3", text: "테이블 컬럼(직원 | 출근 | 퇴근 | 근무시간)이 표시되는가?" },
          { id: "nosim-att-3-4", text: "출근 시간(monospace, bold), 퇴근 시간(monospace), 근무시간(green-700)이 표시되는가?" },
          { id: "nosim-att-3-5", text: '기록 없으면 "해당 날짜의 출퇴근 기록이 없습니다." 안내가 보이는가?' },
          { id: "nosim-att-3-6", text: "삭제 버튼이 동작하는가?" },
        ],
      },
      {
        id: "nosim-att-monthly",
        title: "월간 탭",
        items: [
          { id: "nosim-att-4-1", text: '"📅 이번달 근태 요약" 카드가 보이는가?' },
          { id: "nosim-att-4-2", text: "이전(‹) | \"YYYY.MM\"(monospace) | 다음(›) 네비게이션이 동작하는가?" },
          { id: "nosim-att-4-3", text: "요약 테이블 컬럼(직원 | 출근일수 | 지각횟수 | 결근 | 총근무시간)이 표시되는가?" },
          { id: "nosim-att-4-4", text: "출근일수(blue-700, bold, monospace)가 표시되는가?" },
          { id: "nosim-att-4-5", text: "지각횟수: 0 이상이면 red-600, 아니면 회색으로 표시되는가?" },
          { id: "nosim-att-4-6", text: "총근무시간(초록 포맷)이 표시되는가?" },
          { id: "nosim-att-4-7", text: '기록 없으면 "해당 월의 출근 기록이 없습니다." 안내가 보이는가?' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 노심v2 — 일정 관리 (근무자표)
  // ─────────────────────────────────────────────
  {
    id: "nosim-schedule",
    title: "근무자표",
    description: "/schedule (v2 신규, 2주 단위)",
    service: "nosim",
    subsections: [
      {
        id: "nosim-sched-header",
        title: "헤더 / 네비게이션",
        items: [
          { id: "nosim-sched-1-1", text: '브레드크럼 "직원관리 › 근무자표"가 보이는가?' },
          { id: "nosim-sched-1-2", text: '"📆 근무자표" 타이틀이 보이는가?' },
          { id: "nosim-sched-1-3", text: '날짜 범위 + "2주 단위 근무계획" 부제가 표시되는가?' },
          { id: "nosim-sched-1-4", text: '"+ 근무 추가" 버튼이 보이는가? (사장님/관리자만)' },
          { id: "nosim-sched-1-5", text: "이전(‹) | 날짜 범위(monospace) | 다음(›) 블록 네비게이션이 동작하는가?" },
        ],
      },
      {
        id: "nosim-sched-hours",
        title: "영업시간 설정",
        items: [
          { id: "nosim-sched-2-1", text: '"🕐 영업시간 설정" 카드가 보이는가?' },
          { id: "nosim-sched-2-2", text: '"오픈 {시간} → 마감 {시간}"이 표시되는가?' },
          { id: "nosim-sched-2-3", text: "수정 버튼 → 시간 입력란(오픈/마감) + 취소/저장 버튼이 나타나는가?" },
          { id: "nosim-sched-2-4", text: "저장 → 영업시간이 업데이트되는가?" },
        ],
      },
      {
        id: "nosim-sched-grid",
        title: "일정 그리드",
        items: [
          { id: "nosim-sched-3-1", text: '주차 탭("1주차 {범위}" | "2주차 {범위}")이 보이고 전환되는가?' },
          { id: "nosim-sched-3-2", text: "직원별 색상 범례가 역할 라벨과 함께 표시되는가?" },
          { id: "nosim-sched-3-3", text: "그리드 좌측: 직원명 + 역할(작은 텍스트)이 표시되는가?" },
          { id: "nosim-sched-3-4", text: "그리드 상단: 요일 라벨과 날짜(오늘: 파란 배경, 일: 빨강, 토: 파랑, 평일: 회색)가 표시되는가?" },
          { id: "nosim-sched-3-5", text: "근무 셀: 직원 색상 배경(18% 불투명) + 테두리(50% 불투명) + 시작/종료 시간이 표시되는가?" },
          { id: "nosim-sched-3-6", text: "근무 셀 클릭 → 삭제가 가능한가? (사장님/관리자)" },
          { id: "nosim-sched-3-7", text: '빈 셀 "+" 클릭 → 근무 추가 바텀시트가 열리는가?' },
        ],
      },
      {
        id: "nosim-sched-add-shift",
        title: "근무 추가 바텀시트",
        items: [
          { id: "nosim-sched-4-1", text: "드래그 핸들(흰 바) + \"근무 추가\" 헤더가 보이는가?" },
          { id: "nosim-sched-4-2", text: "직원 선택 버튼(색상 구분, 선택: 테두리 색상)이 보이는가?" },
          { id: "nosim-sched-4-3", text: "날짜 표시(색상 텍스트)가 보이는가?" },
          { id: "nosim-sched-4-4", text: "시간 입력(출근 | 퇴근) time picker가 보이는가?" },
          { id: "nosim-sched-4-5", text: "시간 미리보기(파란, monospace)가 표시되는가?" },
          { id: "nosim-sched-4-6", text: "취소/확인 버튼(flex-1, 가운데 정렬)이 보이고 동작하는가?" },
        ],
      },
      {
        id: "nosim-sched-summary",
        title: "2주 근무 요약",
        items: [
          { id: "nosim-sched-5-1", text: '"📊 2주 근무 요약" 테이블이 표시되는가?' },
          { id: "nosim-sched-5-2", text: "컬럼(직원 | 직책 | 근무일 | 총근무 | 요일)이 표시되는가?" },
          { id: "nosim-sched-5-3", text: "역할 배지, 근무일수, 총근무시간, 요일 약어가 정확히 표시되는가?" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 노심v2 — 점검 리스트 (체크리스트)
  // ─────────────────────────────────────────────
  {
    id: "nosim-checklist",
    title: "점검 리스트 (체크리스트)",
    description: "/checklist (v2 신규)",
    service: "nosim",
    subsections: [
      {
        id: "nosim-check-filter",
        title: "필터 바",
        items: [
          { id: "nosim-check-1-1", text: "점검 리스트 페이지가 정상적으로 열리는가?" },
          { id: "nosim-check-1-2", text: '상태 필터 버튼("전체" | "개인" | "공통" | "미확인")이 보이는가?' },
          { id: "nosim-check-1-3", text: "선택된 필터: blue-600 테두리 + 텍스트, 미선택: 투명인가?" },
          { id: "nosim-check-1-4", text: "필터 전환 시 항목이 정상 필터링되는가?" },
        ],
      },
      {
        id: "nosim-check-owner-card",
        title: "사장님/관리자 — 태스크 카드",
        items: [
          { id: "nosim-check-2-1", text: '시간대 배지가 색상으로 구분되는가? ("오픈": 남색, "오전": 앰버, "오후": 스카이, "마감": 슬레이트, "기타": 보라)' },
          { id: "nosim-check-2-2", text: "태스크명(bold)이 표시되는가?" },
          { id: "nosim-check-2-3", text: '태스크 타입 배지("개인": 바이올렛, "공통": 틸)가 표시되는가?' },
          { id: "nosim-check-2-4", text: '상태 배지: "확인완료"(emerald, CheckCircle2), "미확인"(amber, Clock), "완료"(sky, Check), "배정됨"(slate, UserCheck), "미배정"(slate, AlertCircle)이 표시되는가?' },
          { id: "nosim-check-2-5", text: "담당자 드롭다운이 보이고 변경 가능한가? (편집 권한자)" },
        ],
      },
      {
        id: "nosim-check-guide",
        title: "기준 설정 (가이드)",
        items: [
          { id: "nosim-check-3-1", text: '"기준 설정"/"기준 수정" 토글 버튼이 보이는가?' },
          { id: "nosim-check-3-2", text: '펼쳤을 때: "기준 설명" 입력, 이미지 업로드 버튼, 저장/취소 버튼이 보이는가?' },
          { id: "nosim-check-3-3", text: "기준 이미지 썸네일(10x10, 클릭 가능)이 표시되는가? (설정된 경우)" },
          { id: "nosim-check-3-4", text: "기준 설명 텍스트가 미리보기로 표시되는가?" },
        ],
      },
      {
        id: "nosim-check-photo",
        title: "사진 제출 / 검증",
        items: [
          { id: "nosim-check-4-1", text: '직원의 사진 제출 영역: 사진 미리보기(16x16) + "{이름} · {시간} 제출"이 표시되는가?' },
          { id: "nosim-check-4-2", text: '"확인" 버튼(emerald-600)과 "반려" 버튼(red-50)이 보이는가?' },
          { id: "nosim-check-4-3", text: '확인 처리 → "확인완료 {시간}" 텍스트가 표시되는가?' },
          { id: "nosim-check-4-4", text: '반려 선택 → "반려 사유 입력…" 입력란 + "반려"(red-600) 버튼이 나타나는가?' },
          { id: "nosim-check-4-5", text: "반려 사유가 있으면 빨간 텍스트로 표시되는가?" },
        ],
      },
      {
        id: "nosim-check-staff-view",
        title: "직원 — 태스크 카드",
        items: [
          { id: "nosim-check-5-1", text: "완료 원(emerald-500 채움/slate-300 테두리)이 상태에 따라 표시되는가?" },
          { id: "nosim-check-5-2", text: "완료된 태스크는 취소선이 적용되는가?" },
          { id: "nosim-check-5-3", text: "시간대 배지가 표시되는가?" },
          { id: "nosim-check-5-4", text: "제출된 사진 썸네일(8x8) + 시간(작은 회색)이 표시되는가?" },
          { id: "nosim-check-5-5", text: '상태: "확인완료"(초록) 또는 "반려: {사유}"(빨강)가 표시되는가?' },
          { id: "nosim-check-5-6", text: '"기준 보기"(Eye 아이콘) 토글 → 가이드 이미지(16x16) + 설명 텍스트가 펼쳐지는가?' },
          { id: "nosim-check-5-7", text: '"사진 제출"(Camera 아이콘) 버튼이 보이는가?' },
          { id: "nosim-check-5-8", text: "이미 확인 완료된 항목은 사진 제출 버튼이 비활성화되는가?" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 노심v2 — 프로필/설정
  // ─────────────────────────────────────────────
  {
    id: "nosim-profile",
    title: "프로필/설정",
    description: "/profile",
    service: "nosim",
    subsections: [
      {
        id: "nosim-prof-user",
        title: "계정 정보",
        items: [
          { id: "nosim-prof-1-1", text: "프로필 페이지가 정상적으로 열리는가?" },
          { id: "nosim-prof-1-2", text: "이메일이 표시되는가? (읽기 전용 또는 수정 가능)" },
          { id: "nosim-prof-1-3", text: "이름이 표시되고 수정 가능한가?" },
          { id: "nosim-prof-1-4", text: "전화번호가 표시되고 수정 가능한가?" },
          { id: "nosim-prof-1-5", text: "역할 배지(읽기 전용)가 표시되는가?" },
          { id: "nosim-prof-1-6", text: "아바타가 표시되는가? (있을 경우)" },
        ],
      },
      {
        id: "nosim-prof-password",
        title: "비밀번호 변경 (v2 신규)",
        items: [
          { id: "nosim-prof-2-1", text: '"비밀번호 변경" 버튼이 보이는가?' },
          { id: "nosim-prof-2-2", text: '클릭 → 모달: Lock 아이콘(blue-100 배경) + "비밀번호 변경" 타이틀이 보이는가?' },
          { id: "nosim-prof-2-3", text: '"새 비밀번호를 입력해 주세요" 부제 + "기존 비밀번호는 사용할 수 없습니다." 안내가 보이는가?' },
          { id: "nosim-prof-2-4", text: '"현재 비밀번호" 필수 입력란이 보이는가?' },
          { id: "nosim-prof-2-5", text: '"비밀번호" 입력란(8자 이상, 숨김/표시 토글)이 보이는가?' },
          { id: "nosim-prof-2-6", text: '"비밀번호 확인" 입력란(숨김/표시 토글)이 보이는가?' },
          { id: "nosim-prof-2-7", text: '비밀번호 불일치 → "비밀번호가 일치하지 않습니다."(red-500) 표시되는가?' },
          { id: "nosim-prof-2-8", text: '"확인" 버튼(전체 너비, 브랜드 색상)이 보이는가?' },
          { id: "nosim-prof-2-9", text: '닫기 버튼(X, 우상단)이 동작하는가?' },
          { id: "nosim-prof-2-10", text: '성공 시 → 초록 체크 아이콘 + "변경 완료" + "비밀번호가 변경되었습니다." 표시되는가?' },
        ],
      },
      {
        id: "nosim-prof-store",
        title: "매장 정보",
        items: [
          { id: "nosim-prof-3-1", text: "매장명이 표시되고 수정 가능한가?" },
          { id: "nosim-prof-3-2", text: "매장 타입 드롭다운(카페, 음식점, 편의점, 베이커리, 주점, 기타)이 보이는가?" },
          { id: "nosim-prof-3-3", text: "주소가 표시되고 수정 가능한가?" },
          { id: "nosim-prof-3-4", text: "매장 전화번호가 표시되고 수정 가능한가?" },
          { id: "nosim-prof-3-5", text: "사업자등록번호가 표시되고 수정 가능한가?" },
          { id: "nosim-prof-3-6", text: "영업시간(오픈/마감) 시간 입력이 보이는가?" },
        ],
      },
      {
        id: "nosim-prof-integration",
        title: "연동 설정",
        items: [
          { id: "nosim-prof-4-1", text: '"연동 설정" 타이틀과 소개 텍스트가 보이는가?' },
          { id: "nosim-prof-4-2", text: "각 연동 항목: 플랫폼 아이콘(48x48), 이름, 설명이 표시되는가?" },
          { id: "nosim-prof-4-3", text: '상태 배지: "연결완료"(회색), "확인필요"(주황), "연결하기"(브랜드), "준비중"(회색, 비활성)이 표시되는가?' },
          { id: "nosim-prof-4-4", text: '배달앱(배달의민족·요기요·쿠팡이츠·땡겨요) 연동이 보이는가?' },
          { id: "nosim-prof-4-5", text: '"POS" (OKPOS 포스 연동)이 보이는가? (v2 신규)' },
          { id: "nosim-prof-4-6", text: "카드매출, 홈택스, 카드, 계좌, 지도, 공과금, 신용점수가 \"준비중\"으로 표시되는가?" },
        ],
      },
      {
        id: "nosim-prof-connect",
        title: "플랫폼 연결 / 해제",
        items: [
          { id: "nosim-prof-5-1", text: "연결하기 클릭 → 로그인 ID + 비밀번호(숨김/표시 토글) 입력 폼이 펼쳐지는가?" },
          { id: "nosim-prof-5-2", text: '연결 확인 중 → "로그인 확인 중... (10~20초 소요)" 로딩 메시지가 표시되는가?' },
          { id: "nosim-prof-5-3", text: '오류 시 → 빨간 텍스트 오류 메시지가 표시되는가?' },
          { id: "nosim-prof-5-4", text: '성공 시 → "연결 확인 완료" (초록) 표시되는가?' },
          { id: "nosim-prof-5-5", text: "연결된 상태: 마스킹된 로그인 ID + 수정/삭제 버튼이 보이는가?" },
          { id: "nosim-prof-5-6", text: '"취소"(흰 테두리)와 "연결하기"/"확인 중..."(브랜드 색상) 버튼이 보이는가?' },
        ],
      },
      {
        id: "nosim-prof-pos",
        title: "POS 연결 (v2 신규)",
        items: [
          { id: "nosim-prof-6-1", text: "OKPOS 연결 상태: \"OKPOS 웹 계정\" 헤더 + 초록 MonitorCheck 아이콘이 보이는가?" },
          { id: "nosim-prof-6-2", text: '"연결완료" 상태와 마지막 동기화 정보("{날짜} · {건}건")가 표시되는가?' },
          { id: "nosim-prof-6-3", text: '"지금 동기화" 버튼(브랜드 색상, RefreshCw 아이콘)이 동작하는가?' },
          { id: "nosim-prof-6-4", text: '"연결 해제" 버튼(red-400)이 동작하는가?' },
        ],
      },
      {
        id: "nosim-prof-logout",
        title: "로그아웃",
        items: [
          { id: "nosim-prof-7-1", text: "로그아웃 버튼이 보이는가?" },
          { id: "nosim-prof-7-2", text: "로그아웃 클릭 → 로그인 페이지로 이동하는가?" },
          { id: "nosim-prof-7-3", text: "로그아웃 후 보호된 페이지 접속 불가한가?" },
        ],
      },
      {
        id: "nosim-prof-v1-compare",
        title: "v1 대비 누락 기능 확인",
        items: [
          { id: "nosim-prof-m1", text: "이메일 서버 연동(네이버 메일)이 있는가? (v1에 있었음 — v2 누락)" },
          { id: "nosim-prof-m2", text: "메일/SMS 알림 설정이 있는가? (v1에 있었음 — v2 누락)" },
          { id: "nosim-prof-m3", text: "앱 버전 표시가 있는가? (v1에 있었음 — v2 누락)" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 노심v2 — 하단 네비게이션
  // ─────────────────────────────────────────────
  {
    id: "nosim-bottom-nav",
    title: "하단 네비게이션",
    description: "모바일 하단 탭바 (v2: 재고/손익/홈/직원/프로필)",
    service: "nosim",
    subsections: [
      {
        id: "nosim-nav-display",
        title: "탭바 표시",
        items: [
          { id: "nosim-nav-1-1", text: "모바일에서 하단 탭 바가 화면 하단에 고정 표시되는가?" },
          { id: "nosim-nav-1-2", text: "5개 탭이 균등 배치되는가?" },
          { id: "nosim-nav-1-3", text: "재고 탭: Package 아이콘 + \"재고\" 라벨이 보이는가?" },
          { id: "nosim-nav-1-4", text: "손익 탭: Calculator 아이콘 + \"손익\" 라벨이 보이는가?" },
          { id: "nosim-nav-1-5", text: "홈 탭: Home 아이콘 + \"홈\" 라벨이 보이는가?" },
          { id: "nosim-nav-1-6", text: "직원 탭: Users 아이콘 + \"직원\" 라벨이 보이는가?" },
          { id: "nosim-nav-1-7", text: "프로필 탭: User 아이콘 + \"프로필\" 라벨이 보이는가?" },
        ],
      },
      {
        id: "nosim-nav-behavior",
        title: "동작",
        items: [
          { id: "nosim-nav-2-1", text: "재고 탭 클릭 → /inventory로 이동하는가?" },
          { id: "nosim-nav-2-2", text: "손익 탭 클릭 → /profit-loss로 이동하는가?" },
          { id: "nosim-nav-2-3", text: "홈 탭 클릭 → /dashboard로 이동하는가?" },
          { id: "nosim-nav-2-4", text: "직원 탭 클릭 → /staff로 이동하는가?" },
          { id: "nosim-nav-2-5", text: "프로필 탭 클릭 → /profile로 이동하는가?" },
          { id: "nosim-nav-2-6", text: "현재 페이지 탭이 강조 표시(색상 변경)되는가?" },
          { id: "nosim-nav-2-7", text: "모든 페이지에서 하단 탭이 유지되는가?" },
        ],
      },
      {
        id: "nosim-nav-v1-compare",
        title: "v1 대비 변경 확인",
        items: [
          { id: "nosim-nav-m1", text: "v1 탭(재고/활동/홈/발주/소통) → v2 탭(재고/손익/홈/직원/프로필)으로 변경 반영되었는가?" },
          { id: "nosim-nav-m2", text: "활동 피드 탭이 제거되었는가? (v1에 있었음 — v2 삭제)" },
          { id: "nosim-nav-m3", text: "발주 탭이 제거되었는가? (v1에 있었음 — v2에서 재고 페이지에 통합)" },
          { id: "nosim-nav-m4", text: "소통(채팅) 탭이 제거되었는가? (v1에 있었음 — v2 삭제)" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 노심v2 — 공통 UI / 반응형
  // ─────────────────────────────────────────────
  {
    id: "nosim-common",
    title: "공통 UI / 반응형",
    description: "전체 페이지 공통 사항",
    service: "nosim",
    subsections: [
      {
        id: "nosim-common-responsive",
        title: "반응형 레이아웃",
        items: [
          { id: "nosim-common-1-1", text: "모바일(~768px): 하단 탭 바가 표시되는가?" },
          { id: "nosim-common-1-2", text: "데스크탑(768px~): 사이드바가 표시되는가?" },
          { id: "nosim-common-1-3", text: "모든 페이지가 모바일에서 정상적으로 스크롤되는가?" },
          { id: "nosim-common-1-4", text: "컨테이너 최대 너비(max-w-390px 등)가 적용되는가?" },
        ],
      },
      {
        id: "nosim-common-toast",
        title: "토스트 / 로딩",
        items: [
          { id: "nosim-common-2-1", text: "성공 시 토스트가 표시되는가?" },
          { id: "nosim-common-2-2", text: "오류 시 빨간 토스트/알림이 표시되는가?" },
          { id: "nosim-common-2-3", text: "토스트가 자동으로 사라지는가?" },
          { id: "nosim-common-2-4", text: "페이지 로딩 / API 호출 시 스피너가 표시되는가?" },
          { id: "nosim-common-2-5", text: "버튼 제출 중 스피너 + 비활성화로 중복 클릭이 방지되는가?" },
        ],
      },
      {
        id: "nosim-common-permission",
        title: "권한별 접근 제어",
        items: [
          { id: "nosim-common-3-1", text: "사장님(owner): 모든 기능에 접근 가능한가?" },
          { id: "nosim-common-3-2", text: "관리자(manager): 품목 추가/수정, 스케줄 관리가 가능한가?" },
          { id: "nosim-common-3-3", text: "직원(staff): 출퇴근, 재고 조회/조정, 체크리스트만 가능한가?" },
          { id: "nosim-common-3-4", text: "알바(part_time): 제한된 기능만 접근 가능한가?" },
          { id: "nosim-common-3-5", text: "권한 없는 기능 접근 시 적절한 안내가 나오는가?" },
        ],
      },
      {
        id: "nosim-common-design",
        title: "디자인 시스템",
        items: [
          { id: "nosim-common-4-1", text: "버튼 스타일: Primary(indigo-600/브랜드, 흰 텍스트), Secondary(흰 배경, 테두리)가 일관되는가?" },
          { id: "nosim-common-4-2", text: "입력란: rounded-xl, border-stone-200, focus: border-brand + ring이 일관되는가?" },
          { id: "nosim-common-4-3", text: "카드: 흰 배경, border-stone-200, rounded-2xl이 일관되는가?" },
          { id: "nosim-common-4-4", text: "브랜드 색상: 틸(#2A5C5C), 골드 그라디언트, indigo-600이 일관되게 적용되는가?" },
          { id: "nosim-common-4-5", text: "숫자/시간: monospace 폰트가 적용되는가?" },
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
