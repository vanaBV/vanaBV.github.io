/* =========================================================
   vanaBV — SPACE INVADERS EASTER EGG GAME
   "VANA INVADERS" (스페이스 인베이더 스타일 슈팅 게임)
   Activated when clicking INSERT COIN 10 times.
   ========================================================= */
(function () {
  const V = (window.VANA = window.VANA || {});

  const W = 320;
  const H = 400;

  let canvas, ctx;
  let running = false;
  let animId = null;

  // Game state
  let score = 0;
  let hiScore = Number(localStorage.getItem("vanabv_invaders_hi") || 0);
  let wave = 1;
  let lives = 3;
  let state = "READY"; // "READY", "PLAY", "GAMEOVER", "WAVECLEAR"
  let stateTimer = 0;

  // Entities
  let player = {
    x: W / 2 - 13,
    y: H - 36,
    w: 26,
    h: 20,
    speed: 160,
    cooldown: 0,
  };

  let bullets = [];      // player lasers: { x, y, vy, w, h }
  let enemyBullets = []; // enemy bombs: { x, y, vy, w, h }
  let enemies = [];      // { x, y, type, frame, alive, w, h, pts }
  let particles = [];    // { x, y, vx, vy, color, life, maxLife, size }
  let ufo = null;        // { x, y, vx, pts, active }

  // Enemy fleet motion
  let fleetDir = 1;
  let fleetSpeed = 30;
  let fleetAnimTimer = 0;
  let fleetAnimFrame = 0;
  let enemyShootTimer = 0;

  // Input
  const keys = { left: false, right: false, shoot: false };

  function initCanvas() {
    canvas = document.getElementById("arcade-canvas");
    if (!canvas) return;
    canvas.width = W;
    canvas.height = H;
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
  }

  function resetGame() {
    score = 0;
    wave = 1;
    lives = 3;
    player.x = W / 2 - 13;
    bullets = [];
    enemyBullets = [];
    particles = [];
    ufo = null;
    spawnWave();
    state = "PLAY";
    V.audio.gameStart();
  }

  function spawnWave() {
    enemies = [];
    bullets = [];
    enemyBullets = [];
    const rows = 4;
    const cols = 8;
    const startX = 24;
    const startY = 48;
    const spacingX = 34;
    const spacingY = 24;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let type = "slime";
        let pts = 20;
        if (r === 0) { type = "bat"; pts = 40; }
        else if (r === 1) { type = "mushroom"; pts = 30; }
        else { type = "slime"; pts = 10; }

        enemies.push({
          x: startX + c * spacingX,
          y: startY + r * spacingY,
          type: type,
          frame: 0,
          alive: true,
          w: 24,
          h: 18,
          pts: pts,
        });
      }
    }

    fleetDir = 1;
    fleetSpeed = 25 + wave * 5;
    fleetAnimTimer = 0;
    fleetAnimFrame = 0;
    enemyShootTimer = 0;
  }

  function createExplosion(x, y, color = "#ffe600", count = 12) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 20 + Math.random() * 80;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: color,
        life: 0.35 + Math.random() * 0.2,
        maxLife: 0.5,
        size: Math.random() < 0.5 ? 2 : 3,
      });
    }
  }

  function update(dt) {
    if (state === "GAMEOVER" || state === "WAVECLEAR") {
      stateTimer += dt;
      if (state === "WAVECLEAR" && stateTimer > 1.8) {
        wave++;
        spawnWave();
        state = "PLAY";
      }
      // update particles
      particles.forEach((p) => {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
      });
      particles = particles.filter((p) => p.life > 0);
      return;
    }

    if (state !== "PLAY") return;

    // Player movement
    if (keys.left) player.x -= player.speed * dt;
    if (keys.right) player.x += player.speed * dt;
    player.x = Math.max(6, Math.min(W - player.w - 6, player.x));

    // Player shooting
    player.cooldown -= dt;
    if (keys.shoot && player.cooldown <= 0) {
      bullets.push({
        x: player.x + player.w / 2 - 2,
        y: player.y - 6,
        vy: -260,
        w: 4,
        h: 8,
      });
      player.cooldown = 0.22;
      V.audio.laser();
    }

    // Update bullets
    bullets.forEach((b) => (b.y += b.vy * dt));
    bullets = bullets.filter((b) => b.y > -10);

    // Update enemy bullets
    enemyBullets.forEach((b) => (b.y += b.vy * dt));
    enemyBullets = enemyBullets.filter((b) => b.y < H + 10);

    // Fleet movement & bounds
    fleetAnimTimer += dt;
    if (fleetAnimTimer > 0.45) {
      fleetAnimTimer = 0;
      fleetAnimFrame = 1 - fleetAnimFrame;
    }

    let minX = 999, maxX = -999, maxY = 0;
    let livingCount = 0;

    enemies.forEach((e) => {
      if (!e.alive) return;
      livingCount++;
      e.x += fleetDir * fleetSpeed * dt;
      e.frame = fleetAnimFrame;
      if (e.x < minX) minX = e.x;
      if (e.x + e.w > maxX) maxX = e.x + e.w;
      if (e.y + e.h > maxY) maxY = e.y + e.h;
    });

    if (livingCount === 0) {
      state = "WAVECLEAR";
      stateTimer = 0;
      V.audio.blip();
      return;
    }

    // Dynamic speed up as enemies die
    const totalEnemies = 32;
    fleetSpeed = (25 + wave * 6) + (1 - livingCount / totalEnemies) * 60;

    // Bounce fleet against edges and drop down
    if ((fleetDir > 0 && maxX >= W - 10) || (fleetDir < 0 && minX <= 10)) {
      fleetDir = -fleetDir;
      enemies.forEach((e) => {
        if (e.alive) e.y += 12;
      });
    }

    // Check if enemies reached player base
    if (maxY >= player.y) {
      lives = 0;
      state = "GAMEOVER";
      V.audio.gameOver();
      return;
    }

    // Enemy shooting
    enemyShootTimer += dt;
    if (enemyShootTimer > Math.max(0.6, 2.0 - wave * 0.25)) {
      enemyShootTimer = 0;
      const living = enemies.filter((e) => e.alive);
      if (living.length > 0) {
        const shooter = living[Math.floor(Math.random() * living.length)];
        enemyBullets.push({
          x: shooter.x + shooter.w / 2 - 2,
          y: shooter.y + shooter.h,
          vy: 140 + wave * 15,
          w: 4,
          h: 6,
        });
      }
    }

    // UFO bonus ship
    if (!ufo && Math.random() < 0.002) {
      ufo = {
        x: -24,
        y: 22,
        vx: 70,
        w: 24,
        h: 12,
        pts: (Math.floor(Math.random() * 3) + 1) * 100,
        active: true,
      };
    }
    if (ufo && ufo.active) {
      ufo.x += ufo.vx * dt;
      if (ufo.x > W + 30) ufo = null;
    }

    // Bullet-Enemy Collisions
    bullets.forEach((b) => {
      // Check UFO
      if (ufo && ufo.active && rectHit(b, ufo)) {
        b.y = -999;
        createExplosion(ufo.x + ufo.w / 2, ufo.y + ufo.h / 2, "#ff3bd4", 18);
        score += ufo.pts;
        ufo = null;
        V.audio.explosion();
        return;
      }

      enemies.forEach((e) => {
        if (!e.alive) return;
        if (rectHit(b, e)) {
          b.y = -999;
          e.alive = false;
          score += e.pts;
          createExplosion(e.x + e.w / 2, e.y + e.h / 2, "#ffe600", 10);
          V.audio.explosion();
          if (score > hiScore) {
            hiScore = score;
            localStorage.setItem("vanabv_invaders_hi", hiScore);
          }
        }
      });
    });

    // Enemy bullet - Player collision
    enemyBullets.forEach((eb) => {
      if (rectHit(eb, player)) {
        eb.y = 999;
        createExplosion(player.x + player.w / 2, player.y + player.h / 2, "#ff3b5c", 20);
        lives--;
        V.audio.explosion();
        if (lives <= 0) {
          state = "GAMEOVER";
          V.audio.gameOver();
        }
      }
    });

    // Particles
    particles.forEach((p) => {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
    });
    particles = particles.filter((p) => p.life > 0);
  }

  function rectHit(a, b) {
    return (
      a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y
    );
  }

  function render() {
    if (!ctx) return;

    // Clear background: retro dark space
    ctx.fillStyle = "#07090e";
    ctx.fillRect(0, 0, W, H);

    // Starfield
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    for (let i = 0; i < 20; i++) {
      const sx = ((i * 37 + wave * 5) % W);
      const sy = ((i * 73 + Date.now() * 0.02) % H);
      ctx.fillRect(sx, sy, 1, 1);
    }

    // HUD top bar
    ctx.fillStyle = "#ffe600";
    ctx.font = "8px 'Press Start 2P', monospace";
    ctx.textAlign = "left";
    ctx.fillText(`SCORE ${score.toString().padStart(5, "0")}`, 10, 14);
    ctx.textAlign = "right";
    ctx.fillText(`HI ${hiScore.toString().padStart(5, "0")}`, W - 10, 14);

    // Separator line
    ctx.fillStyle = "#223";
    ctx.fillRect(0, 18, W, 1);

    // Draw UFO
    if (ufo && ufo.active) {
      ctx.fillStyle = "#ff3bd4";
      ctx.fillRect(ufo.x + 4, ufo.y, 16, 4);
      ctx.fillRect(ufo.x, ufo.y + 4, 24, 4);
      ctx.fillStyle = "#ffe600";
      ctx.fillRect(ufo.x + 8, ufo.y + 4, 8, 4);
    }

    // Draw enemies with our sprite library
    enemies.forEach((e) => {
      if (!e.alive) return;
      const cv = V.sprites.toCanvas(e.type, e.frame, 2);
      ctx.drawImage(cv, Math.round(e.x), Math.round(e.y));
    });

    // Draw player ship
    if (lives > 0) {
      const shipCv = V.sprites.toCanvas("ship", 0, 2);
      ctx.drawImage(shipCv, Math.round(player.x), Math.round(player.y));
    }

    // Draw player bullets (cyan pixel laser)
    ctx.fillStyle = "#5be7ff";
    bullets.forEach((b) => {
      ctx.fillRect(Math.round(b.x), Math.round(b.y), b.w, b.h);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(Math.round(b.x) + 1, Math.round(b.y) + 1, b.w - 2, b.h - 2);
      ctx.fillStyle = "#5be7ff";
    });

    // Draw enemy bullets (yellow/red flickering bombs)
    enemyBullets.forEach((eb) => {
      ctx.fillStyle = Math.random() < 0.5 ? "#ffe600" : "#ff3b5c";
      ctx.fillRect(Math.round(eb.x), Math.round(eb.y), eb.w, eb.h);
    });

    // Draw particles
    particles.forEach((p) => {
      ctx.fillStyle = p.color;
      ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
    });

    // Bottom HUD: Wave & Lives
    ctx.fillStyle = "#223";
    ctx.fillRect(0, H - 18, W, 1);

    ctx.fillStyle = "#ffe600";
    ctx.font = "8px 'Press Start 2P', monospace";
    ctx.textAlign = "left";
    ctx.fillText(`WAVE ${wave}`, 10, H - 6);

    // Draw lives as hearts
    const heartCv = V.sprites.toCanvas("heart", 0, 1);
    for (let i = 0; i < lives; i++) {
      ctx.drawImage(heartCv, W - 18 - i * 14, H - 15);
    }

    // Overlays for game state
    if (state === "GAMEOVER") {
      ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
      ctx.fillRect(0, H / 2 - 40, W, 80);

      ctx.fillStyle = "#ff3b5c";
      ctx.font = "14px 'Press Start 2P', monospace";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", W / 2, H / 2 - 8);

      ctx.fillStyle = "#ffe600";
      ctx.font = "8px 'Press Start 2P', monospace";
      ctx.fillText("PRESS START TO RETRY", W / 2, H / 2 + 16);
    } else if (state === "WAVECLEAR") {
      ctx.fillStyle = "#5be7ff";
      ctx.font = "12px 'Press Start 2P', monospace";
      ctx.textAlign = "center";
      ctx.fillText("WAVE CLEAR!", W / 2, H / 2);
    }
  }

  let lastTime = 0;
  function loop(now) {
    if (!running) return;
    const dt = Math.min(0.1, (now - lastTime) / 1000 || 0.016);
    lastTime = now;

    update(dt);
    render();

    animId = requestAnimationFrame(loop);
  }

  function start() {
    initCanvas();
    if (!canvas) return;
    running = true;
    resetGame();
    lastTime = performance.now();
    cancelAnimationFrame(animId);
    animId = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(animId);
  }

  // Keyboard controls
  window.addEventListener("keydown", (e) => {
    if (!running) return;
    if (e.code === "ArrowLeft" || e.code === "KeyA") { keys.left = true; e.preventDefault(); }
    if (e.code === "ArrowRight" || e.code === "KeyD") { keys.right = true; e.preventDefault(); }
    if (e.code === "Space" || e.code === "KeyZ") {
      keys.shoot = true;
      e.preventDefault();
      if (state === "GAMEOVER") resetGame();
    }
  });

  window.addEventListener("keyup", (e) => {
    if (!running) return;
    if (e.code === "ArrowLeft" || e.code === "KeyA") keys.left = false;
    if (e.code === "ArrowRight" || e.code === "KeyD") keys.right = false;
    if (e.code === "Space" || e.code === "KeyZ") keys.shoot = false;
  });

  // Touch & Mouse bindings (mobile friendly)
  function bindTouchControls() {
    const btnLeft = document.getElementById("arcade-btn-left");
    const btnRight = document.getElementById("arcade-btn-right");
    const btnFire = document.getElementById("arcade-btn-fire");
    const btnStart = document.getElementById("arcade-btn-start");

    if (btnLeft) {
      btnLeft.addEventListener("pointerdown", () => (keys.left = true));
      btnLeft.addEventListener("pointerup", () => (keys.left = false));
      btnLeft.addEventListener("pointerleave", () => (keys.left = false));
    }
    if (btnRight) {
      btnRight.addEventListener("pointerdown", () => (keys.right = true));
      btnRight.addEventListener("pointerup", () => (keys.right = false));
      btnRight.addEventListener("pointerleave", () => (keys.right = false));
    }
    if (btnFire) {
      btnFire.addEventListener("pointerdown", () => {
        keys.shoot = true;
        if (state === "GAMEOVER") resetGame();
      });
      btnFire.addEventListener("pointerup", () => (keys.shoot = false));
    }
    if (btnStart) {
      btnStart.addEventListener("click", () => resetGame());
    }
  }

  V.game = {
    start,
    stop,
    resetGame,
    bindTouchControls,
    isRunning: () => running,
  };
})();
