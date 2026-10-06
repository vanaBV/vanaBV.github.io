# 🕹️ vanaBV // Game Developer Portfolio & Review Log

> 메이플스토리 UI & 레트로 픽셀 아케이드 감성의 개인 포트폴리오 + 게임 분석/리뷰 블로그  
> 🌐 **Live Website**: [https://vanabv.github.io](https://vanabv.github.io)

---

## 🎮 주요 기능 & 특징

1. **MapleStory 테마 Hero 섹션**
   - 레트로 블루 스카이, 픽셀 태양, 떠다니는 구름, 잔디 타일 & 횡스크롤 애니메이션
   - 중앙 타이포그래피 + 깜빡이는 커서 효과
2. **`PLAY NOW` ➜ `INSERT COIN` 글리치 버튼**
   - 호버 시 노란색 스윕 + 글리치 셰이크 + `INSERT COIN` 점멸 텍스트
3. **👾 10-Click 이스터에그: `VANA INVADERS '26`**
   - `PLAY NOW / INSERT COIN` 버튼을 10번 연속 클릭하면 코인 사운드와 함께 **스페이스 인베이더 스타일 레트로 웹 슈팅 게임**이 열립니다!
   - 외계 함선 격추, 보너스 UFO, 하이스코어 로컬 저장, Web Audio 기반 8비트 사운드 탑재.
4. **드래그 가능한 메이플스토리풍 윈도우 창 (My Room & Archive)**
   - `[H] HOBBIES`: 경마 보기(오구리 캡), 게임, 음악 감상
   - `[I] INVENTORY`: 플레이한 게임 컬렉션 & 리뷰 연결
   - `[G] GALLERY`: 3D / Blender 작업물 (와키자시, 국궁 팔 리깅 등)
   - `[A] ALBUM`: 스크린샷 앨범
   - `[Q] QUESTS`: 타임라인 형식 활동 기록
5. **📝 나만의 게임 리뷰 블로그 (`blog/`)**
   - 게임 리뷰 및 포스트모템 아카이브
   - 본문 내 인-페이지 리더기 및 블로그 전용 페이지 제공

---

## ✍️ 블로그 글 & 프로필 내용 수정 방법

### 1. 새 게임 리뷰 작성하기
`blog/posts.js` 파일을 열고 아래 양식으로 배열 맨 위에 새 리뷰를 추가하면 즉시 사이트와 블로그에 반영됩니다:

```javascript
{
  id: "my-new-game-review",
  title: "게임 제목 — 한 줄 분석",
  subtitle: "서브 타이틀",
  date: "2026.10.06",
  game: "게임 이름",
  developer: "개발사",
  platform: "PC / Mobile",
  genre: "장르",
  score: 9.0,
  badge: "RECOMMENDED",
  tags: ["FPS", "Game Design"],
  summary: "간략한 요약 설명",
  content: `
    <h2>1. 분석 내용</h2>
    <p>여기에 본문을 작성하세요. &lt;b&gt;태그&lt;/b&gt;도 사용 가능합니다.</p>
  `,
},
```

### 2. 프로필·프로젝트·취미 수정하기
`data/site.js` 파일에서 이름, 스탯, 프로젝트 링크, 취미 설명 등을 간편하게 수정할 수 있습니다.

### 3. 수정 후 GitHub에 반영 (배포)
터미널에서 아래 3줄만 입력하면 끝납니다:
```bash
git add .
git commit -m "feat: 새 리뷰 작성"
git push
```
