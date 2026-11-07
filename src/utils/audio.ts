// Web Audio API synthesized sound generator for Sadashiv PG Prank
// Reliable, zero external assets, no CORS issues, works instantly on mobile & desktop!

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. Diwali Cracker / Fireworks Burst Sound
export function playCrackerBurst() {
  try {
    const ctx = getAudioContext();
    const count = 7;
    for (let i = 0; i < count; i++) {
      const delay = i * 0.12 + Math.random() * 0.08;
      setTimeout(() => {
        const bufferSize = ctx.sampleRate * 0.25;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let j = 0; j < bufferSize; j++) {
          data[j] = (Math.random() * 2 - 1) * Math.exp(-j / (ctx.sampleRate * 0.04));
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800 + Math.random() * 600, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.7, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start();
      }, delay * 1000);
    }
  } catch (e) {
    console.error('Audio error:', e);
  }
}

// 2. Cha-ching Money Chime (Fake Hope!)
export function playMoneyChime() {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.5);
    });
  } catch (e) {
    console.error('Audio error:', e);
  }
}

// 3. Sad Trombone / "Wah-Wah-Wah-Waaah" (Psych reveal!)
export function playSadTrombone() {
  try {
    const ctx = getAudioContext();
    const notes = [
      { f: 293.66, t: 0.35 }, // D4
      { f: 277.18, t: 0.35 }, // C#4
      { f: 261.63, t: 0.35 }, // C4
      { f: 246.94, t: 0.8 },  // B3 drop
    ];

    let start = ctx.currentTime;
    notes.forEach((note, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(note.f, start);
      if (idx === notes.length - 1) {
        osc.frequency.exponentialRampToValueAtTime(180, start + note.t);
      }

      gain.gain.setValueAtTime(0.3, start);
      gain.gain.exponentialRampToValueAtTime(0.01, start + note.t);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + note.t);
      start += note.t + 0.05;
    });
  } catch (e) {
    console.error('Audio error:', e);
  }
}

// 4. Loud Sunny Knock on Room Door "Thump Thump Thump"
export function playSunnyKnock() {
  try {
    const ctx = getAudioContext();
    const knockTimes = [0, 0.16, 0.32, 0.5];

    knockTimes.forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, ctx.currentTime + delay);
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + delay + 0.08);

      gain.gain.setValueAtTime(0.7, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.1);
    });
  } catch (e) {
    console.error('Audio error:', e);
  }
}

// 5. Diwali Rocket Whoosh
export function playRocketWhoosh() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.6);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.7);

    // End with a bang
    setTimeout(() => {
      playCrackerBurst();
    }, 550);
  } catch (e) {
    console.error('Audio error:', e);
  }
}

// 6. Pressure Cooker Whistle
export function playCookerWhistle() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(2400, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(2800, ctx.currentTime + 0.8);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.2);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.2);
  } catch (e) {
    console.error('Audio error:', e);
  }
}

// 7. Click / Pop sound
export function playPop() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.06);
  } catch (e) {
    console.error('Audio error:', e);
  }
}
