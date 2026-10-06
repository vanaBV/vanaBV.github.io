/* =========================================================
   vanaBV — SITE DATA
   ---------------------------------------------------------
   사이트에 보이는 내용은 거의 다 여기서 바꿀 수 있어요.
   - 문자열은 "따옴표" 안에, 항목 사이엔 쉼표(,)
   - 이미지 경로는 index.html 기준 (예: "img/oguri.webp")
   - 블로그 글은 여기가 아니라 posts/ 폴더 (README 참고)
   ========================================================= */
window.SITE = {
  profile: {
    handle: "vanaBV",
    name: "안서진",
    nameEn: "AHN SEO JIN",
    role: "GAME DEVELOPER",
    // ABOUT 섹션 스탯 카드
    stats: [
      ["CLASS", "Game Developer"],
      ["SERVER", "Roblox / Indie"],
      ["LANGUAGE", "Lua · TS · C# · HTML"],
      ["TOOL", "Roblox Studio · Blender"],
      ["STATUS", "🔨 In Development"],
    ],
    exp: 72, // EXP 바 (%)
    bio: [
      "게임 디렉터를 꿈꾸는 안서진입니다. 아이디어를 기획으로, 기획을 플레이 가능한 무언가로 만드는 걸 좋아해요.",
      "지금은 로블록스 택티컬 FPS <b>XRUNNERS</b>를 만들고 있고, 무기 뷰모델과 애니메이션을 Blender로 직접 작업하고 있어요.",
      "게임을 하고, 뜯어보고, 리뷰로 남깁니다. 이 사이트는 그 모든 기록이 쌓이는 세이브 파일이에요.",
    ],
    email: "banavana22@gmail.com",
    github: "https://github.com/vanaBV",
  },

  /* ---------- PROJECTS ---------- */
  projects: [
    {
      title: "XRUNNERS",
      genre: "Roblox Tactical FPS",
      status: "IN DEV",
      year: "2025 —",
      desc: "로블록스 택티컬 FPS. 로비 시스템부터 무기 뷰모델·애니메이션까지 직접 만들고 있는 메인 프로젝트.",
      tags: ["Roblox", "roblox-ts", "Blender"],
      link: "https://github.com/vanaBV/Xrunners",
    },
    {
      title: "WALLRUNNING OBBY",
      genre: "Roblox Parkour",
      status: "RELEASED",
      year: "2025.05",
      desc: "벽을 타고 달리는 월러닝 장애물 코스. 로블록스에서 바로 플레이할 수 있어요.",
      tags: ["Roblox Studio", "Lua"],
      link: "https://www.roblox.com/share?code=5d6bfd0da560414db35498116fe1d37d&type=ExperienceDetails&stamp=1747768098406",
      image: "img/roblox.png",
    },
    {
      title: "THE FINALS FAN PAGE",
      genre: "Web",
      status: "DONE",
      year: "2025.05",
      desc: "좋아하는 게임 THE FINALS 소개 페이지. 이 사이트 INSERT COIN 버튼의 원조.",
      tags: ["HTML", "CSS"],
      link: "https://vanabv.github.io/WEBHTML/THEFINALS/FINALS.html",
    },
    {
      title: "SUIKA GAME",
      genre: "Web Puzzle",
      status: "DONE",
      year: "2024",
      desc: "과일을 합쳐 수박을 만드는 물리 퍼즐 게임 클론.",
      tags: ["JavaScript"],
      link: "https://github.com/vanaBV/suika",
    },
    {
      title: "SEOUL VISTA",
      genre: "Web App",
      status: "WIP",
      year: "2026",
      desc: "TypeScript로 만들고 있는 웹 프로젝트.",
      tags: ["TypeScript"],
      link: "https://github.com/vanaBV/Seoul-Vista",
    },
    {
      title: "CALENDAR",
      genre: "Web",
      status: "DONE",
      year: "2025.03",
      desc: "HTML/CSS/JS로 만든 첫 웹 달력.",
      tags: ["HTML", "JavaScript"],
      link: "https://vanabv.github.io/CALENDER/",
    },
  ],

  /* ---------- SKILLS (level: 0~10) ---------- */
  skills: [
    { icon: "RS", name: "Roblox Studio", level: 8 },
    { icon: "LU", name: "Lua / Luau", level: 7 },
    { icon: "GD", name: "Game Design", level: 8 },
    { icon: "TS", name: "TypeScript", level: 5 },
    { icon: "BL", name: "Blender", level: 6 },
    { icon: "C#", name: "C#", level: 4 },
    { icon: "WB", name: "HTML / CSS / JS", level: 7 },
    { icon: "PY", name: "Python", level: 5 },
  ],

  /* ---------- MY ROOM windows ---------- */

  // [I] INVENTORY — 플레이한 게임 컬렉션
  // status: "PLAYING" | "CLEARED" | "WISHLIST"
  // review: posts/ 안의 글 파일 이름(확장자 빼고) → 리뷰 링크가 생김
  inventory: [
    { name: "THE FINALS", short: "TF", platform: "PC · Steam", status: "PLAYING", color: "#ff3b5c", note: "파괴 가능한 아레나. 팬페이지까지 만들 정도로 좋아하는 게임.", review: "2026-10-06-the-finals" },
    { name: "우마무스메", short: "UM", platform: "Mobile · PC", status: "PLAYING", color: "#5be7ff", note: "경마를 보게 된 계기. 최애는 오구리 캡." },
    { name: "MapleStory", short: "MS", platform: "PC", status: "CLEARED", color: "#ff8a1f", note: "이 사이트 UI의 영감." },
    { name: "Minecraft", short: "MC", platform: "PC · Modrinth", status: "PLAYING", color: "#4dc934", note: "모드팩 탐방 중." },
    { name: "Roblox", short: "RB", platform: "PC", status: "PLAYING", color: "#ffffff", note: "하는 것보다 만드는 시간이 더 긴 플랫폼." },
  ],

  // [G] GALLERY — 3D / Blender 작업물
  // image 를 비워두면 'RENDER SLOT' 빈 칸으로 보여요. img/gallery/ 에 렌더 넣고 경로 적기
  gallery: [
    { title: "Wakizashi Viewmodel", tool: "Blender", date: "2026", desc: "XRUNNERS용 와키자시 1인칭 뷰모델 & Idle 애니메이션", image: "" },
    { title: "Gukgung New Arms", tool: "Blender", date: "2026", desc: "국궁 무기용 팔 리깅", image: "" },
    { title: "Macuahuitl Rework", tool: "Blender", date: "2026", desc: "마콰우이틀 모델 리워크 v11", image: "" },
  ],

  // [A] ALBUM — 사진 · 스크린샷
  album: [
    { src: "img/oguri.webp", caption: "경마 보기 — 오구리 캡" },
    { src: "img/game.webp", caption: "게임" },
    { src: "img/music.png", caption: "음악 감상" },
    { src: "img/roblox.png", caption: "WALLRUNNING OBBY 출시 (2025.05.21)" },
  ],

  // [Q] QUEST LOG — 활동 기록 (최신이 위)
  // state: "NEW" | "IN PROGRESS" | "COMPLETE"
  quests: [
    { date: "2026.10", title: "vanaBV.github.io 리부트", desc: "픽셀 게임 컨셉 포트폴리오 + 리뷰 블로그 오픈", state: "NEW" },
    { date: "2025.11", title: "XRUNNERS 개발 시작", desc: "로블록스 택티컬 FPS 프로젝트 착수", state: "IN PROGRESS" },
    { date: "2025.05", title: "WALLRUNNING OBBY 출시", desc: "첫 로블록스 게임 공개", state: "COMPLETE" },
    { date: "2025.03", title: "첫 웹 포트폴리오 제작", desc: "HTML/CSS로 이력서 사이트 & THE FINALS 팬페이지", state: "COMPLETE" },
    { date: "2024", title: "UN 글로벌 아카데미 수료", desc: "", state: "COMPLETE" },
    { date: "2024", title: "공간정보 해커톤 대상", desc: "", state: "COMPLETE" },
    { date: "2023", title: "교내 해커톤 우수상", desc: "", state: "COMPLETE" },
  ],

  // [H] HOBBY — 취미 · 관심사
  hobbies: [
    { title: "경마 보기", image: "img/oguri.webp", desc: "우마무스메로 시작해서 실제 경마까지. 레이스 보는 날은 심장이 바빠요.", level: 9 },
    { title: "게임", image: "img/game.webp", desc: "장르 안 가리고 플레이. 하고 나면 리뷰 로그에 기록합니다.", level: 10 },
    { title: "음악 감상", image: "img/music.png", desc: "작업할 때도, 쉴 때도 항상 뭔가 듣고 있어요.", level: 8 },
  ],

  /* ---------- CONTACT ---------- */
  links: [
    { label: "GITHUB", sub: "@vanaBV", href: "https://github.com/vanaBV", sprite: "bag" },
    { label: "EMAIL", sub: "banavana22@gmail.com", href: "mailto:banavana22@gmail.com", sprite: "scroll" },
    { label: "ROBLOX", sub: "WALLRUNNING OBBY", href: "https://www.roblox.com/share?code=5d6bfd0da560414db35498116fe1d37d&type=ExperienceDetails&stamp=1747768098406", sprite: "coin" },
    { label: "BLOG", sub: "REVIEW LOG", href: "blog/", sprite: "heart" },
  ],
};
