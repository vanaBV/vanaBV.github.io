/* =========================================================
   vanaBV — GAME REVIEW BLOG POSTS & DATA STORE
   기본 게시글 + 개발자 모드(8771)에서 작성한 사용자 게시글을 통합 관리합니다.
   ========================================================= */

// 기본 내장 게시글 목록
window.DEFAULT_POSTS = [
  {
    id: "the-finals-review",
    title: "THE FINALS — 모든 것을 파괴하는 쾌감과 게임성 심층 리뷰",
    subtitle: "전통적인 하이퍼 FPS의 공식을 부수고 세운 새로운 아레나",
    date: "2026.10.06",
    game: "THE FINALS",
    developer: "Embark Studios",
    platform: "PC (Steam) / Console",
    genre: "Destruction FPS / Game Show",
    score: 9.2,
    badge: "RECOMMENDED",
    tags: ["FPS", "Unreal Engine 5", "Game Design", "Physics"],
    summary: "벽과 천장을 무너뜨려 동선을 실시간으로 바꾸는 파괴 메커니즘과 가상 게임쇼라는 독창적인 컨셉이 완벽하게 결합된 수작.",
    content: `
      <h2>1. 들어가며: 왜 이 게임에 매료되었는가?</h2>
      <p>수많은 하이퍼 FPS들이 정형화된 맵 구조 안에서 에임 싸움과 스킬 쿨타임 분배에 집중할 때, <b>THE FINALS</b>는 근본적인 질문을 던졌습니다. <i>"적이 있는 방의 문을 열고 들어가는 대신, 바닥을 무너뜨려 적을 아래층으로 떨어뜨리면 어떨까?"</i></p>
      <p>서버사이드 물리 파괴 엔진을 통해 실시간으로 지형지물이 박살 나는 광경은 게임을 플레이하는 내내 감탄을 자아내게 합니다. 제 웹 포트폴리오 첫 사이트에도 팬페이지를 만들었을 만큼 저에게 큰 영감을 준 게임입니다.</p>

      <h2>2. 핵심 게임플레이 & 기획적 분석</h2>
      <h3>① 공간의 재구성: 완전 파괴 시스템</h3>
      <p>THE FINALS의 파괴는 단순한 시각 효과가 아닌 <b>전술의 핵심</b>입니다. 캐시아웃 금고를 탈환하기 위해 정면으로 돌파할 필요 없이, 아래층에서 C4로 천장을 터뜨려 금고를 아래로 떨어뜨리거나 벽을 뚫고 기습할 수 있습니다. 이는 고착화된 수비 포지션을 언제든 뒤흔들 수 있는 자유도를 제공합니다.</p>

      <h3>② 체급(Light, Medium, Heavy) 시스템의 밸런스</h3>
      <ul>
        <li><b>소형 (Light):</b> 압도적인 기동성과 은신, 높은 단일 화력을 지녔지만 체력이 낮아 한 번의 실수가 치명적입니다.</li>
        <li><b>중형 (Medium):</b> 힐 빔, 제세동기, 터렛 등 팀 서포트의 핵심 역할을 담당합니다.</li>
        <li><b>대형 (Heavy):</b> 바리케이드, 돔 쉴드, RPG, 슬레지해머로 전장의 파괴와 영역 장악을 주도합니다.</li>
      </ul>

      <h3>③ 게임쇼(Game Show) 테마의 몰입감 넘치는 UI/UX</h3>
      <p>캐스터들의 중계 보이스, 경기장의 홀로그램 스폰서 광고, 동전으로 터지는 사망 연출까지 모든 UI와 사운드가 하나의 거대한 '가상 리얼리티 쇼'라는 일관된 세계관을 완성합니다.</p>

      <h2>3. 총평 & 평가</h2>
      <p>팀플레이에 대한 의존도가 높아 솔로 큐 플레이 시 피로도가 존재하지만, 친구들과 합을 맞춰 벽을 부수고 마지막 1초에 금고를 탈취할 때의 도파민은 다른 어떤 게임과도 비교할 수 없습니다.</p>
    `,
  },
  {
    id: "wallrunning-lobby-postmortem",
    title: "WALLRUNNING OBBY 출시 회고 & 로블록스 기획 기록",
    subtitle: "처음으로 만들어본 로블록스 파쿠르 시스템의 물리 튜닝 이야기",
    date: "2025.05.21",
    game: "WALLRUNNING OBBY",
    developer: "vanaBV",
    platform: "Roblox",
    genre: "Parkour / Obby",
    score: 8.5,
    badge: "MY PROJECT",
    tags: ["Roblox", "Lua", "Game Dev", "Postmortem"],
    summary: "로블록스 기본 점프맵의 한계를 넘어 벽 달리기(Wallrunning) 물리 판정을 구현하며 겪은 시행착오와 교훈.",
    content: `
      <h2>1. 기획 의도</h2>
      <p>로블록스의 수많은 '오비(Obby)' 게임들은 정적인 발판을 점프하는 구조가 대부분이었습니다. 저는 여기에 속도감과 템포를 불어넣기 위해 타이탄폴이나 미러즈 엣지 같은 <b>월러닝(Wallrun)</b> 메커니즘을 접목해보고 싶었습니다.</p>

      <h2>2. 개발 중 마주한 난관</h2>
      <p>Raycast로 벽면의 법선 벡터(Normal)를 감지하고 플레이어의 벨로시티를 벽과 평행하게 유지시키는 작업에서 중력 보정이 까다로웠습니다. 수많은 테스트 끝에 각도 허용치와 부드러운 카메라 틸트 효과를 추가하여 속도감을 살릴 수 있었습니다.</p>

      <h2>3. 배운 점</h2>
      <p>조작감이 좋은 게임은 0.1초 단위의 타이밍과 시각 피드백이 결정한다는 것을 직접 체감한 프로젝트였습니다. 이 경험은 현재 제작 중인 <b>XRUNNERS</b>의 기동 시스템에도 큰 밑거름이 되고 있습니다.</p>
    `,
  },
];

// 통합 스토어 함수들
window.BlogStore = {
  STORAGE_KEY: "vanabv_custom_posts",
  PASSCODE: "8771",

  // 개발자 모드 인증 확인
  isDevAuthenticated() {
    return sessionStorage.getItem("vanabv_dev_auth") === "1" || localStorage.getItem("vanabv_dev_auth") === "1";
  },

  // 개발자 로그인
  login(passcode, remember = true) {
    if (passcode === this.PASSCODE) {
      sessionStorage.setItem("vanabv_dev_auth", "1");
      if (remember) localStorage.setItem("vanabv_dev_auth", "1");
      return true;
    }
    return false;
  },

  // 개발자 로그아웃
  logout() {
    sessionStorage.removeItem("vanabv_dev_auth");
    localStorage.removeItem("vanabv_dev_auth");
  },

  // 로컬에 저장된 사용자 작성 글 불러오기
  getCustomPosts() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to load custom posts", e);
      return [];
    }
  },

  // 전체 글 (사용자 글 최신순 우선 + 기본 글)
  getAllPosts() {
    const custom = this.getCustomPosts();
    // 중복 id 제거 (사용자가 기본 글을 수정 저장했을 수도 있음)
    const customIds = new Set(custom.map(p => p.id));
    const filteredDefaults = window.DEFAULT_POSTS.filter(p => !customIds.has(p.id));
    return [...custom, ...filteredDefaults];
  },

  // 글 저장 (추가 또는 수정)
  savePost(post) {
    const custom = this.getCustomPosts();
    const existingIndex = custom.findIndex(p => p.id === post.id);
    if (existingIndex >= 0) {
      custom[existingIndex] = post;
    } else {
      custom.unshift(post); // 최신글 맨 위로
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(custom));
    window.POSTS = this.getAllPosts();
    return true;
  },

  // 글 삭제
  deletePost(id) {
    let custom = this.getCustomPosts();
    custom = custom.filter(p => p.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(custom));
    window.POSTS = this.getAllPosts();
    return true;
  },

  // GitHub 배포용 JS 코드 생성
  generateExportCode() {
    const all = this.getAllPosts();
    return `/* =========================================================
   vanaBV — GAME REVIEW BLOG POSTS & DATA STORE
   최종 업데이트: ${new Date().toLocaleDateString("ko-KR")}
   ========================================================= */
window.DEFAULT_POSTS = ${JSON.stringify(all, null, 2)};
`;
  }
};

// 전역 POSTS 변수 초기화
window.POSTS = window.BlogStore.getAllPosts();
