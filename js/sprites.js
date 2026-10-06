/* =========================================================
   vanaBV — PIXEL SPRITES
   Shared by the homepage decoration AND the arcade game,
   so the easter-egg game feels like part of the same world.
   '.' = transparent, other chars map to PALETTE.
   ========================================================= */
(function () {
  const V = (window.VANA = window.VANA || {});

  const PALETTE = {
    K: "#1a1a1a", Y: "#ffe600", y: "#b8a400", O: "#ff8a1f", o: "#c85a00",
    W: "#ffffff", S: "#f4d9b0", G: "#4dc934", g: "#2a8418", B: "#88c8f0",
    b: "#2f6fb0", R: "#ff3b5c", C: "#5be7ff", P: "#9b5cff", p: "#5a2db0",
  };

  const SPRITES = {
    mushroom: [
      [
        "....KKKK....",
        "..KKOOOOKK..",
        ".KOOWWOOOOK.",
        "KOOWWWWOOWWK",
        "KOOOWWOOOWOK",
        "KOOOOOOOOOOK",
        ".KKKKKKKKKK.",
        "..KSSSSSSK..",
        "..KSKSSKSK..",
        "..KSSSSSSK..",
        "..KK....KK..",
      ],
      [
        "....KKKK....",
        "..KKOOOOKK..",
        ".KOOWWOOOOK.",
        "KOOWWWWOOWWK",
        "KOOOWWOOOWOK",
        "KOOOOOOOOOOK",
        ".KKKKKKKKKK.",
        "..KSSSSSSK..",
        "..KSKSSKSK..",
        "..KSSSSSSK..",
        "...KK..KK...",
      ],
    ],
    slime: [
      [
        "............",
        "....KKKK....",
        "..KKGGGGKK..",
        ".KGGWGGGGGK.",
        ".KGWWGGGGGK.",
        "KGGGKGGKGGGK",
        "KGGGGGGGGGGK",
        "KgGGGGGGGGgK",
        ".KKKKKKKKKK.",
      ],
      [
        "............",
        "............",
        "...KKKKKK...",
        ".KKGGWGGGKK.",
        "KGGWWGGGGGGK",
        "KGGGKGGKGGGK",
        "KGGGGGGGGGGK",
        "KggGGGGGGggK",
        "KKKKKKKKKKKK",
      ],
    ],
    bat: [
      [
        "P..........P",
        "PP..KKKK..PP",
        "PPPKPPPPKPPP",
        ".PPPWPPWPPP.",
        "..PPKPPKPP..",
        "...PPPPPP...",
        "....P..P....",
        "............",
      ],
      [
        "............",
        "....KKKK....",
        "..PKPPPPKP..",
        ".PPPWPPWPPP.",
        "PPPPKPPKPPPP",
        "PP.PPPPPP.PP",
        "P...P..P...P",
        "............",
      ],
    ],
    ship: [
      [
        "......W......",
        ".....WCW.....",
        ".....WCW.....",
        "....KWWWK....",
        "...KYWWWYK...",
        "K..KYYWYYK..K",
        "YK.KYYYYYK.KY",
        "YYKYYYYYYYKYY",
        "YYYYYKKKYYYYY",
        "..ROR...ROR..",
      ],
      [
        "......W......",
        ".....WCW.....",
        ".....WCW.....",
        "....KWWWK....",
        "...KYWWWYK...",
        "K..KYYWYYK..K",
        "YK.KYYYYYK.KY",
        "YYKYYYYYYYKYY",
        "YYYYYKKKYYYYY",
        "...O.....O...",
      ],
    ],
    hero: [
      [
        "...KKKK...",
        "..KKKKKK..",
        ".KKSSSSKK.",
        ".KSSKSKSK.",
        ".KSSSSSSK.",
        "..KSSSSK..",
        ".KYYYYYYK.",
        "KSKYYYYKSK",
        "KSKYYYYKSK",
        ".KKbbbbKK.",
        "..KbbbbK..",
        "..KbKKbK..",
        "..KbK.KbK.",
        ".KKK..KKK.",
      ],
      [
        "...KKKK...",
        "..KKKKKK..",
        ".KKSSSSKK.",
        ".KSSKSKSK.",
        ".KSSSSSSK.",
        "..KSSSSK..",
        ".KYYYYYYK.",
        "KSKYYYYKSK",
        "KSKYYYYKSK",
        ".KKbbbbKK.",
        "..KbbbbK..",
        "..KbbbbK..",
        ".KbK..KbK.",
        ".KK....KK.",
      ],
    ],
    coin: [[
      "..KKKK..",
      ".KYYYYK.",
      "KYYWYYoK",
      "KYWYYYoK",
      "KYYYYYoK",
      "KYYYYooK",
      ".KooooK.",
      "..KKKK..",
    ]],
    heart: [[
      ".KKK...KKK..",
      "KRRRK.KRRRK.",
      "KRWRRKRRRRK.",
      "KRWRRRRRRRK.",
      "KRRRRRRRRRK.",
      ".KRRRRRRRK..",
      "..KRRRRRK...",
      "...KRRRK....",
      "....KRK.....",
      ".....K......",
    ]],
    bag: [[
      "....KKKK....",
      "...K....K...",
      "...K....K...",
      ".KKKKKKKKKK.",
      "KOOOOOOOOOOK",
      "KOOOOYYOOOOK",
      "KOOOOYYOOOOK",
      "KoOOOOOOOOoK",
      "KoOOOOOOOOoK",
      "KooooooooooK",
      ".KKKKKKKKKK.",
    ]],
    frame: [[
      "KKKKKKKKKKKK",
      "KYYYYYYYYYYK",
      "KYBBBBBBBBYK",
      "KYBBBBBBWBYK",
      "KYBBBBBBBBYK",
      "KYBBBGBBBBYK",
      "KYBBGGGBBBYK",
      "KYBGGGGGBGYK",
      "KYGGGGGGGGYK",
      "KYYYYYYYYYYK",
      "KKKKKKKKKKKK",
    ]],
    camera: [[
      "...KKKK.....",
      "KKKKYYKKKKKK",
      "KWWWWWWWWWWK",
      "KWWWKKKKWWRK",
      "KWWKBBBBKWWK",
      "KWWKBWBBKWWK",
      "KWWKBBBBKWWK",
      "KWWWKKKKWWWK",
      "KWWWWWWWWWWK",
      "KKKKKKKKKKKK",
    ]],
    scroll: [[
      ".KKKKKKKKKK.",
      "KoSSSSSSSSoK",
      ".KSSSSSSSSK.",
      ".KSKKKKKSSK.",
      ".KSSSSSSSSK.",
      ".KSKKKKSSSK.",
      ".KSSSSSSSSK.",
      ".KSKKKKKKSK.",
      ".KSSSSSSSSK.",
      "KoSSSSSSSSoK",
      ".KKKKKKKKKK.",
    ]],
  };

  function size(name, frame = 0) {
    const rows = SPRITES[name][frame];
    return { w: rows[0].length, h: rows.length };
  }

  /** Returns an inline SVG string. scale = CSS px per pixel. */
  function toSVG(name, { frame = 0, scale = 4, title = "", className = "", palette = {} } = {}) {
    const rows = SPRITES[name][frame];
    const pal = Object.assign({}, PALETTE, palette);
    const w = rows[0].length, h = rows.length;
    let rects = "";
    rows.forEach((row, y) => {
      // merge horizontal runs of the same color => fewer nodes
      let x = 0;
      while (x < w) {
        const ch = row[x];
        if (ch === ".") { x++; continue; }
        let run = 1;
        while (x + run < w && row[x + run] === ch) run++;
        rects += `<rect x="${x}" y="${y}" width="${run}" height="1" fill="${pal[ch] || "#f0f"}"/>`;
        x += run;
      }
    });
    const label = title ? `role="img" aria-label="${title}"` : `aria-hidden="true"`;
    return `<svg class="${className}" ${label} viewBox="0 0 ${w} ${h}" width="${w * scale}" height="${h * scale}" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">${rects}</svg>`;
  }

  /** Pre-renders a sprite to an offscreen canvas (used by the game). */
  const cache = new Map();
  function toCanvas(name, frame = 0, scale = 1, palette = null) {
    const key = `${name}|${frame}|${scale}|${palette ? JSON.stringify(palette) : ""}`;
    if (cache.has(key)) return cache.get(key);
    const rows = SPRITES[name][frame];
    const pal = Object.assign({}, PALETTE, palette || {});
    const c = document.createElement("canvas");
    c.width = rows[0].length * scale;
    c.height = rows.length * scale;
    const ctx = c.getContext("2d");
    rows.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        const ch = row[x];
        if (ch === ".") continue;
        ctx.fillStyle = pal[ch];
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    });
    cache.set(key, c);
    return c;
  }

  /** Mask of solid pixels — used for pixel-perfect-ish hit boxes. */
  function frames(name) { return SPRITES[name].length; }

  V.sprites = { PALETTE, SPRITES, toSVG, toCanvas, size, frames };

  /* auto-hydrate: <span data-sprite="coin" data-scale="3"></span> */
  function hydrate(root = document) {
    root.querySelectorAll("[data-sprite]:not([data-hydrated])").forEach((el) => {
      const name = el.dataset.sprite;
      if (!SPRITES[name]) return;
      el.innerHTML = toSVG(name, {
        scale: Number(el.dataset.scale || 4),
        frame: Number(el.dataset.frame || 0),
        title: el.dataset.title || "",
      });
      el.dataset.hydrated = "1";
    });
  }
  V.sprites.hydrate = hydrate;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => hydrate());
  else hydrate();
})();
