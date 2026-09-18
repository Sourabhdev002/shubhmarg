"use client";

// Pure Web Audio API Haute Horology Synthesizer
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Synthesizes a sacred 432Hz / 528Hz celestial chime on complication tap
 */
export function playPanchangChime(freq = 432, duration = 2.2): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.24, now);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    masterGain.connect(ctx.destination);

    const harmonics = [
      { f: freq, g: 0.6 },
      { f: freq * 1.5, g: 0.25 }, // 648Hz Fifth
      { f: freq * 2, g: 0.15 },   // 864Hz Octave
    ];

    harmonics.forEach(({ f, g }) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(f, now);

      oscGain.gain.setValueAtTime(g, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.9);

      osc.connect(oscGain);
      oscGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + duration);
    });
  } catch {
    // Audio fallback
  }
}

/**
 * Synthesizes an authentic consecrated Hindu Temple Bell (घण्टा - Ghanta)
 * with multi-harmonic bronze partials, clapper strike transient,
 * and 4.2-second lingering acoustic shimmer.
 */
export function playTempleBellResonance(baseFreq = 432): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const totalDuration = 4.2;

    // Master bus
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.42, now);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + totalDuration);
    masterGain.connect(ctx.destination);

    // Subtle 4.8Hz acoustic vibrato LFO for bronze singing shimmer
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(4.8, now);
    lfoGain.gain.setValueAtTime(0.12, now);
    lfoGain.gain.linearRampToValueAtTime(0.02, now + totalDuration);
    lfo.connect(lfoGain);

    // Authentic bronze bell harmonic spectrum (hum, prime, tierce, quint, nominal, super-partials)
    const bellPartials = [
      { ratio: 0.5, gain: 0.45, decay: 4.2, type: "sine" as OscillatorType },    // Deep Hum Tone
      { ratio: 1.0, gain: 0.65, decay: 3.8, type: "sine" as OscillatorType },    // Fundamental Prime (432Hz)
      { ratio: 1.19, gain: 0.38, decay: 3.2, type: "sine" as OscillatorType },   // Minor Third (Tierce)
      { ratio: 1.51, gain: 0.32, decay: 2.9, type: "sine" as OscillatorType },   // Fifth (Quint)
      { ratio: 2.0, gain: 0.48, decay: 2.5, type: "sine" as OscillatorType },    // Octave (Nominal)
      { ratio: 2.76, gain: 0.22, decay: 1.8, type: "sine" as OscillatorType },   // Super-partial
      { ratio: 3.82, gain: 0.18, decay: 1.2, type: "triangle" as OscillatorType },// Bronze Clapper Strike Transient
      { ratio: 5.4, gain: 0.12, decay: 0.6, type: "triangle" as OscillatorType }, // Metallic Edge Sparkle
    ];

    bellPartials.forEach((partial) => {
      const osc = ctx.createOscillator();
      const pGain = ctx.createGain();

      osc.type = partial.type;
      osc.frequency.setValueAtTime(baseFreq * partial.ratio, now);

      pGain.gain.setValueAtTime(partial.gain, now);
      pGain.gain.exponentialRampToValueAtTime(0.0001, now + partial.decay);

      // Connect LFO to partial gain
      lfoGain.connect(pGain.gain);

      osc.connect(pGain);
      pGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + partial.decay);
    });

    lfo.start(now);
    lfo.stop(now + totalDuration);
  } catch {
    // Audio fallback safe
  }
}

