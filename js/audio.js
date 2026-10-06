/* =========================================================
   vanaBV — 8-BIT AUDIO SYNTH (Web Audio API)
   Generates authentic retro chiptune sound effects procedurally.
   No external audio files needed.
   ========================================================= */
(function () {
  const V = (window.VANA = window.VANA || {});

  let ctx = null;
  let muted = false;

  function getAudioContext() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) ctx = new AudioCtx();
    }
    if (ctx && ctx.state === "suspended") {
      ctx.resume();
    }
    return ctx;
  }

  // Pre-generate white noise buffer for explosions
  let noiseBuf = null;
  function getNoiseBuffer(c) {
    if (noiseBuf) return noiseBuf;
    const size = c.sampleRate * 1;
    noiseBuf = c.createBuffer(1, size, c.sampleRate);
    const output = noiseBuf.getChannelData(0);
    for (let i = 0; i < size; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return noiseBuf;
  }

  const sfx = {
    // INSERT COIN sound (classic 2-tone chime: B5 -> E6)
    coin() {
      if (muted) return;
      const c = getAudioContext();
      if (!c) return;
      const now = c.currentTime;

      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = "square";
      osc.connect(gain);
      gain.connect(c.destination);

      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.setValueAtTime(0.15, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.start(now);
      osc.stop(now + 0.36);
    },

    // Player laser shot (retro high-to-low chirp)
    laser() {
      if (muted) return;
      const c = getAudioContext();
      if (!c) return;
      const now = c.currentTime;

      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = "square";
      osc.connect(gain);
      gain.connect(c.destination);

      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.12);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.start(now);
      osc.stop(now + 0.13);
    },

    // Enemy explosion (filtered noise burst)
    explosion() {
      if (muted) return;
      const c = getAudioContext();
      if (!c) return;
      const now = c.currentTime;

      const noise = c.createBufferSource();
      noise.buffer = getNoiseBuffer(c);

      const filter = c.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(60, now + 0.3);

      const gain = c.createGain();
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(c.destination);

      noise.start(now);
      noise.stop(now + 0.36);
    },

    // UI Click / select (short blip)
    blip() {
      if (muted) return;
      const c = getAudioContext();
      if (!c) return;
      const now = c.currentTime;

      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = "triangle";
      osc.connect(gain);
      gain.connect(c.destination);

      osc.frequency.setValueAtTime(523.25, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.start(now);
      osc.stop(now + 0.06);
    },

    // Game Start Fanfare
    gameStart() {
      if (muted) return;
      const c = getAudioContext();
      if (!c) return;
      const notes = [261.63, 329.63, 392.00, 523.25]; // C E G C
      notes.forEach((freq, idx) => {
        const now = c.currentTime + idx * 0.09;
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = "square";
        osc.connect(gain);
        gain.connect(c.destination);

        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        osc.start(now);
        osc.stop(now + 0.2);
      });
    },

    // Game Over
    gameOver() {
      if (muted) return;
      const c = getAudioContext();
      if (!c) return;
      const notes = [440, 392, 349.23, 293.66]; // A G F D
      notes.forEach((freq, idx) => {
        const now = c.currentTime + idx * 0.14;
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = "sawtooth";
        osc.connect(gain);
        gain.connect(c.destination);

        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.start(now);
        osc.stop(now + 0.25);
      });
    },

    toggleMute() {
      muted = !muted;
      return muted;
    },
    isMuted() {
      return muted;
    }
  };

  V.audio = sfx;
})();
