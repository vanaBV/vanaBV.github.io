/* =========================================================
   vanaBV — MAIN APPLICATION CONTROLLER
   - Dynamic data rendering from site.js
   - 10-click INSERT COIN easter egg counter
   - Draggable MapleStory style windows & modals
   - Audio integration & toast notifications
   ========================================================= */
(function () {
  const V = (window.VANA = window.VANA || {});

  let coinCount = 0;
  const COIN_TARGET = 10;
  let highestZ = 700;

  // Render dynamic content from SITE
  function renderAll() {
    const data = window.SITE;
    if (!data) return;

    renderHero(data);
    renderAbout(data);
    renderProjects(data);
    renderSkills(data);
    renderInventory(data);
    renderGallery(data);
    renderAlbum(data);
    renderQuests(data);
    renderHobbies(data);
    renderLinks(data);

    if (V.sprites && V.sprites.hydrate) {
      V.sprites.hydrate();
    }
  }

  function renderHero(data) {
    const roleEl = document.getElementById("hero-role");
    if (roleEl && data.profile) roleEl.textContent = data.profile.role;
  }

  function renderAbout(data) {
    const statsEl = document.getElementById("about-stats");
    if (statsEl && data.profile && data.profile.stats) {
      statsEl.innerHTML = data.profile.stats
        .map(([k, v]) => `
          <div class="stat-row">
            <span class="stat-key">${k}</span>
            <span class="stat-val">${v}</span>
          </div>
        `).join("");
    }

    const expFill = document.getElementById("about-exp-fill");
    const expText = document.getElementById("about-exp-text");
    if (expFill && data.profile) {
      expFill.style.width = `${data.profile.exp || 50}%`;
      if (expText) expText.textContent = `EXP ${data.profile.exp || 50}%`;
    }

    const bioEl = document.getElementById("about-bio");
    if (bioEl && data.profile && data.profile.bio) {
      bioEl.innerHTML = data.profile.bio.map((p) => `<p>${p}</p>`).join("");
    }
  }

  function renderProjects(data) {
    const grid = document.getElementById("projects-grid");
    if (!grid || !data.projects) return;

    grid.innerHTML = data.projects.map((p) => {
      const tags = (p.tags || []).map((t) => `<span class="tag">${t}</span>`).join(" ");
      return `
        <article class="project-card px-frame px-shadow">
          <header class="project-header">
            <span class="project-title">${p.title}</span>
            <span class="project-status">${p.status}</span>
          </header>
          <div class="project-body">
            <div class="project-meta">
              <span>${p.genre}</span> · <span>${p.year}</span>
            </div>
            <p class="project-desc">${p.desc}</p>
            <div class="project-tags">${tags}</div>
          </div>
          <footer class="project-footer">
            <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="btn-glitch-fill small" data-hover="INSERT COIN">
              <span class="text">[ VIEW PROJECT ]</span>
              <span class="text-decoration"></span>
              <span class="decoration"></span>
            </a>
          </footer>
        </article>
      `;
    }).join("");
  }

  function renderSkills(data) {
    const list = document.getElementById("skills-list");
    if (!list || !data.skills) return;

    list.innerHTML = data.skills.map((s) => {
      let blocks = "";
      for (let i = 0; i < 10; i++) {
        const filled = i < s.level;
        blocks += `<span class="skill-block ${filled ? 'filled' : 'empty'}"></span>`;
      }
      return `
        <div class="skill-row">
          <div class="skill-label">
            <span class="skill-badge">${s.icon}</span>
            <span class="skill-name">${s.name}</span>
          </div>
          <div class="skill-bar" aria-label="${s.name} ${s.level} out of 10">${blocks}</div>
          <span class="skill-num">${s.level * 10}%</span>
        </div>
      `;
    }).join("");
  }

  function renderInventory(data) {
    const container = document.getElementById("inventory-grid");
    if (!container || !data.inventory) return;

    container.innerHTML = data.inventory.map((item) => `
      <div class="inv-slot px-frame">
        <div class="inv-header">
          <span class="inv-short" style="color: ${item.color || '#ffe600'}">${item.short}</span>
          <span class="inv-status">${item.status}</span>
        </div>
        <div class="inv-name">${item.name}</div>
        <div class="inv-plat">${item.platform}</div>
        <p class="inv-note">${item.note}</p>
        ${item.review ? `<button class="btn-px read-review-btn" data-review="${item.review}" style="font-size: 7px; padding: 4px 8px; margin-top: 6px;">[ REVIEW ]</button>` : ''}
      </div>
    `).join("");
  }

  function renderGallery(data) {
    const container = document.getElementById("gallery-grid");
    if (!container || !data.gallery) return;

    container.innerHTML = data.gallery.map((g) => `
      <div class="gallery-card px-frame">
        <div class="gallery-preview">
          ${g.image ? `<img src="${g.image}" alt="${g.title}">` : `<div class="render-slot"><span class="px-font" style="font-size: 8px; color: var(--accent);">[ 3D RENDER SLOT ]</span></div>`}
        </div>
        <div class="gallery-info">
          <div class="gallery-title">${g.title}</div>
          <div class="gallery-meta">${g.tool} · ${g.date}</div>
          <p class="gallery-desc">${g.desc}</p>
        </div>
      </div>
    `).join("");
  }

  function renderAlbum(data) {
    const container = document.getElementById("album-grid");
    if (!container || !data.album) return;

    container.innerHTML = data.album.map((a) => `
      <div class="album-card px-frame">
        <div class="album-img-wrap">
          <img src="${a.src}" alt="${a.caption}">
        </div>
        <div class="album-caption">${a.caption}</div>
      </div>
    `).join("");
  }

  function renderQuests(data) {
    const container = document.getElementById("quests-list");
    if (!container || !data.quests) return;

    container.innerHTML = data.quests.map((q) => `
      <div class="quest-row">
        <span class="quest-badge quest-${q.state.toLowerCase().replace(/\s+/g, '-')}">${q.state}</span>
        <div class="quest-content">
          <div class="quest-header">
            <span class="quest-title">${q.title}</span>
            <span class="quest-date">${q.date}</span>
          </div>
          ${q.desc ? `<p class="quest-desc">${q.desc}</p>` : ''}
        </div>
      </div>
    `).join("");
  }

  function renderHobbies(data) {
    const container = document.getElementById("hobbies-grid");
    if (!container || !data.hobbies) return;

    container.innerHTML = data.hobbies.map((h) => `
      <div class="hobby-card px-frame">
        <div class="hobby-img">
          <img src="${h.image}" alt="${h.title}">
        </div>
        <div class="hobby-body">
          <div class="hobby-title">${h.title} <span class="hobby-lv">LV.${h.level}</span></div>
          <p class="hobby-desc">${h.desc}</p>
        </div>
      </div>
    `).join("");
  }

  function renderLinks(data) {
    const container = document.getElementById("contact-links");
    if (!container || !data.links) return;

    container.innerHTML = data.links.map((link) => `
      <a href="${link.href}" ${link.href.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ''} class="contact-box px-frame px-shadow">
        <span data-sprite="${link.sprite}" data-scale="2"></span>
        <div class="contact-text">
          <div class="contact-label">${link.label}</div>
          <div class="contact-sub">${link.sub}</div>
        </div>
      </a>
    `).join("");
  }

  // Toast Notification
  function showToast(msg) {
    const stack = document.getElementById("toast-stack");
    if (!stack) return;
    const t = document.createElement("div");
    t.className = "toast px-frame";
    t.textContent = msg;
    stack.appendChild(t);
    setTimeout(() => {
      if (t.parentNode) t.parentNode.removeChild(t);
    }, 2500);
  }

  // Window Management
  function setupWindows() {
    document.querySelectorAll(".win").forEach((win) => {
      // Bring to front on mousedown
      win.addEventListener("pointerdown", () => {
        highestZ++;
        win.style.zIndex = highestZ;
      });

      // Draggable title bar
      const title = win.querySelector(".win-title");
      if (title) {
        let isDragging = false;
        let startX = 0, startY = 0, initialLeft = 0, initialTop = 0;

        title.addEventListener("pointerdown", (e) => {
          if (e.target.closest(".win-close")) return;
          isDragging = true;
          title.setPointerCapture(e.pointerId);

          const rect = win.getBoundingClientRect();
          startX = e.clientX;
          startY = e.clientY;
          initialLeft = rect.left;
          initialTop = rect.top;

          highestZ++;
          win.style.zIndex = highestZ;
        });

        title.addEventListener("pointermove", (e) => {
          if (!isDragging) return;
          const dx = e.clientX - startX;
          const dy = e.clientY - startY;
          win.style.left = `${Math.max(0, initialLeft + dx)}px`;
          win.style.top = `${Math.max(50, initialTop + dy)}px`;
          win.style.transform = "none";
        });

        const stopDrag = (e) => {
          if (isDragging) {
            isDragging = false;
            try { title.releasePointerCapture(e.pointerId); } catch (_) {}
          }
        };
        title.addEventListener("pointerup", stopDrag);
        title.addEventListener("pointercancel", stopDrag);
      }

      // Close buttons
      const closeBtn = win.querySelector(".win-close");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          closeWindow(win);
          V.audio.blip();
        });
      }
    });

    // Window openers
    document.querySelectorAll("[data-open-win]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute("data-open-win");
        openWindow(targetId);
        V.audio.blip();
      });
    });

    // ESC to close topmost open window
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const openWins = Array.from(document.querySelectorAll("dialog.win[open]"));
        if (openWins.length > 0) {
          const topWin = openWins.sort((a, b) => (Number(a.style.zIndex) || 0) - (Number(b.style.zIndex) || 0)).pop();
          if (topWin) closeWindow(topWin);
        }
      }
    });
  }

  function openWindow(winId) {
    const win = document.getElementById(winId);
    if (!win) return;

    if (!win.open) {
      if (typeof win.show === "function") win.show();
      else win.setAttribute("open", "");
    }

    // Center window if not already positioned
    if (!win.style.left) {
      const w = win.offsetWidth || 500;
      const h = win.offsetHeight || 400;
      win.style.left = `${Math.max(10, (window.innerWidth - w) / 2)}px`;
      win.style.top = `${Math.max(60, (window.innerHeight - h) / 2)}px`;
      win.style.transform = "none";
    }

    highestZ++;
    win.style.zIndex = highestZ;
  }

  function closeWindow(win) {
    if (typeof win === "string") win = document.getElementById(win);
    if (!win) return;

    if (win.id === "win-arcade" && V.game) {
      V.game.stop();
    }

    if (typeof win.close === "function") win.close();
    else win.removeAttribute("open");
  }

  // 10-Click INSERT COIN Easter Egg
  function setupEasterEgg() {
    const heroBtn = document.getElementById("hero-cta");
    const creditEl = document.getElementById("hud-credit");

    function registerCoin(e) {
      // Prevent default navigation to give game priority
      if (e) e.preventDefault();

      coinCount++;
      V.audio.coin();

      // Bump credit counter in HUD
      if (creditEl) {
        creditEl.textContent = `CREDIT: ${coinCount.toString().padStart(2, "0")}/${COIN_TARGET}`;
        creditEl.classList.remove("bump");
        void creditEl.offsetWidth; // trigger reflow
        creditEl.classList.add("bump");
      }

      if (coinCount < COIN_TARGET) {
        showToast(`🪙 INSERT COIN! [ ${coinCount} / ${COIN_TARGET} ]`);
      } else {
        // Trigger arcade game!
        coinCount = 0;
        if (creditEl) creditEl.textContent = "CREDIT: 10/10 READY!";
        showToast("👾 10 COINS INSERTED! ARCADE ACTIVATED!");

        // Open arcade window and start game
        setTimeout(() => {
          openWindow("win-arcade");
          if (V.game) V.game.start();
        }, 400);
      }
    }

    if (heroBtn) {
      heroBtn.addEventListener("click", registerCoin);
    }

    // Direct arcade launch button in HUD or room
    const directArcadeBtn = document.getElementById("btn-launch-arcade");
    if (directArcadeBtn) {
      directArcadeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openWindow("win-arcade");
        if (V.game) V.game.start();
      });
    }

    // Review modal links delegation
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".read-review-btn");
      if (btn) {
        const reviewSlug = btn.getAttribute("data-review");
        openReview(reviewSlug);
      }
    });
  }

  // Built-in Review Modal Reader
  const SAMPLE_REVIEWS = {
    "2026-10-06-the-finals": {
      title: "THE FINALS — 모든 것을 파괴하는 쾌감과 게임성",
      date: "2026.10.06",
      score: "9.2 / 10",
      content: `
        <h3>왜 THE FINALS인가?</h3>
        <p>기존 하이퍼 FPS들이 단순히 에임과 스킬 쿨타임 싸움이었다면, THE FINALS는 <b>'지형 파괴'</b>라는 변수로 게임의 공식을 완전히 바꿨습니다.</p>
        <p>천장을 부수고 아래로 금고를 떨어뜨리거나, 적이 숨은 벽을 RPG로 날려버리는 물리 엔진 기반의 상호작용은 매 판 완전히 다른 상황을 만들어냅니다.</p>
        <h3>기획자 관점에서의 인상적인 디테일</h3>
        <ul>
          <li><b>쇼(Show) 컨셉의 UI/UX:</b> 아나운서 중계와 관중 환호, 홀로그램 연출로 플레이어가 실제 가상 쇼의 참가자가 된 느낌을 부여합니다.</li>
          <li><b>체급 시스템:</b> 소형(기동성), 중형(지원/유틸), 대형(파괴/탱킹)의 뚜렷한 역할 분담과 속도감의 균형.</li>
        </ul>
        <p>개인 포트폴리오 첫 웹사이트에 팬페이지를 만들고, 이번 리부트 사이트의 상징인 <b>'INSERT COIN' 버튼</b>도 THE FINALS에서 출발한 만큼 저에게 가장 큰 영감을 준 게임 중 하나입니다.</p>
      `,
    },
  };

  function openReview(slug) {
    const review = SAMPLE_REVIEWS[slug] || {
      title: "리뷰 준비 중",
      date: "2026",
      score: "—",
      content: "<p>곧 작성될 리뷰 글입니다. 블로그 페이지에서 더 많은 글을 만나보세요!</p>",
    };

    const modalTitle = document.getElementById("review-title");
    const modalDate = document.getElementById("review-date");
    const modalScore = document.getElementById("review-score");
    const modalBody = document.getElementById("review-body");

    if (modalTitle) modalTitle.textContent = review.title;
    if (modalDate) modalDate.textContent = review.date;
    if (modalScore) modalScore.textContent = `SCORE: ${review.score}`;
    if (modalBody) modalBody.innerHTML = review.content;

    openWindow("win-review");
    V.audio.blip();
  }

  // Audio mute toggle
  function setupAudioToggle() {
    const muteBtn = document.getElementById("hud-mute");
    if (!muteBtn) return;
    muteBtn.addEventListener("click", () => {
      const isMuted = V.audio.toggleMute();
      muteBtn.textContent = isMuted ? "SOUND: OFF" : "SOUND: ON";
      showToast(isMuted ? "🔇 SOUND MUTED" : "🔊 SOUND ON");
    });
  }

  // Init everything
  document.addEventListener("DOMContentLoaded", () => {
    renderAll();
    setupWindows();
    setupEasterEgg();
    setupAudioToggle();
    if (V.game && V.game.bindTouchControls) {
      V.game.bindTouchControls();
    }
  });

  V.app = {
    openWindow,
    closeWindow,
    showToast,
    openReview,
  };
})();
