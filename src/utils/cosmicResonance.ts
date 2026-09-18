/**
 * cosmicResonance.ts
 * Web Audio API Sacred Solfeggio Synthesizer & Universal Haptics
 * Provides real-time singing-bowl harmonics, horological mechanical ticks,
 * and dual haptic feedback (Capacitor Haptics + HTML5 Navigator Vibration).
 */

import { Haptics, ImpactStyle } from "@capacitor/haptics";

// Frequency mappings for sacred Vedic realms
export const REALM_FREQUENCIES: Record<string, number> = {
  muhurat: 432,   // 432 Hz - Cosmic Harmonic & Universal Balance
  jyotish: 528,   // 528 Hz - Planetary Transformation & DNA Matrix
  offerings: 639, // 639 Hz - Sacred Devotion & Heart Coherence
  love: 528,      // 528 Hz - Harmonic Union & Relationship Resonance
  remedies: 741,  // 741 Hz - Karmic Armor & Aura Purification
  wealth: 852,    // 852 Hz - Kubera Spatial Grid & Intuition
  family: 963,    // 963 Hz - Crown Rishi & Generational Connection
};

class CosmicResonanceEngine {
  private ctx: AudioContext | null = null;
  private activeOsc: OscillatorNode | null = null;
  private activeOvertone: OscillatorNode | null = null;
  private activeGain: GainNode | null = null;
  private isResonating: boolean = false;
  // Real recorded mantra loop (sounds far richer than synthesized tones).
  private mantra: HTMLAudioElement | null = null;
  private mantraFade: ReturnType<typeof setInterval> | null = null;

  private getAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  /**
   * Triggers dual haptic feedback: Capacitor Native + Web Vibration API fallback
   */
  public triggerHaptic(style: ImpactStyle = ImpactStyle.Light) {
    Haptics.impact({ style }).catch(() => {});

    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      try {
        if (style === ImpactStyle.Heavy) {
          window.navigator.vibrate([18, 30, 24]);
        } else if (style === ImpactStyle.Medium) {
          window.navigator.vibrate(15);
        } else {
          window.navigator.vibrate(8);
        }
      } catch {
        // Ignore vibration errors if disabled by browser policy
      }
    }
  }

  /**
   * Plays a delicate horological mechanical tick when rotating between sectors
   */
  public playDialTick() {
    this.triggerHaptic(ImpactStyle.Light);

    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // High-frequency mechanical crisp notch click
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.025);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // Ignore audio failure
    }
  }

  /**
   * Synthesizes a pure sacred Solfeggio singing-bowl chime with gentle overtones
   */
  public playSacredChime(freq: number, duration: number = 2.8) {
    this.triggerHaptic(ImpactStyle.Medium);

    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Primary Solfeggio tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Subtle celestial overtone for Tibetan singing bowl warmth
      const overtone = ctx.createOscillator();
      const overtoneGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      overtone.type = "sine";
      // Natural 2nd harmonic + subtle 1.5Hz celestial shimmer beat
      overtone.frequency.setValueAtTime(freq * 2.002, now);

      // Gentle non-jarring attack & exponential bell decay
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      overtoneGain.gain.setValueAtTime(0.0001, now);
      overtoneGain.gain.linearRampToValueAtTime(0.05, now + 0.05);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

      osc.connect(gain);
      gain.connect(ctx.destination);

      overtone.connect(overtoneGain);
      overtoneGain.connect(ctx.destination);

      osc.start(now);
      overtone.start(now);

      osc.stop(now + duration);
      overtone.stop(now + duration);
    } catch {
      // Audio autoplay policy handled safely
    }
  }

  /**
   * Toggles continuous sustained celestial resonance for deep focus / meditation
   */
  public toggleSustainedResonance(freq: number): boolean {
    const ctx = this.getAudioContext();
    if (!ctx) return false;

    if (this.isResonating) {
      this.stopResonance();
      return false;
    }

    try {
      const now = ctx.currentTime;
      this.activeOsc = ctx.createOscillator();
      this.activeOvertone = ctx.createOscillator();
      this.activeGain = ctx.createGain();

      // Warm, soft base tone. A gentle low-pass filter rounds off the harsh
      // "electronic buzz" edge that raw sine stacks produce.
      const lowpass = ctx.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(900, now);
      lowpass.Q.setValueAtTime(0.7, now);

      this.activeOsc.type = "sine";
      this.activeOsc.frequency.setValueAtTime(freq, now);

      // Soft octave shimmer (one octave up) — far more consonant than a fifth,
      // and kept very quiet so it only adds warmth, not a dissonant drone.
      this.activeOvertone.type = "sine";
      this.activeOvertone.frequency.setValueAtTime(freq * 2, now);
      const overtoneGain = ctx.createGain();
      overtoneGain.gain.setValueAtTime(0.18, now); // overtone at ~18% of main level

      // Gentle 4s fade-in to the target level; lower overall volume so it soothes.
      this.activeGain.gain.setValueAtTime(0.0001, now);
      this.activeGain.gain.exponentialRampToValueAtTime(0.06, now + 4);

      this.activeOsc.connect(lowpass);
      this.activeOvertone.connect(overtoneGain);
      overtoneGain.connect(lowpass);
      lowpass.connect(this.activeGain);
      this.activeGain.connect(ctx.destination);

      this.activeOsc.start(now);
      this.activeOvertone.start(now);
      this.isResonating = true;
      this.triggerHaptic(ImpactStyle.Light);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Play / stop a real recorded mantra loop (e.g. /audio/shanti-path.mp3).
   * Gentle fade in/out. Returns the new playing state (true = now playing).
   * This is preferred over synthesized tones — it sounds warm and authentic.
   */
  public toggleMantraLoop(url: string, targetVolume = 0.55): boolean {
    if (typeof window === "undefined") return false;

    // Already playing → fade out and stop.
    if (this.mantra && !this.mantra.paused) {
      this.fadeOutMantra();
      this.isResonating = false;
      return false;
    }

    try {
      if (this.mantraFade) { clearInterval(this.mantraFade); this.mantraFade = null; }
      const audio = this.mantra ?? new Audio(url);
      audio.src = url;
      audio.loop = true;
      audio.volume = 0;
      this.mantra = audio;

      audio.play().then(() => {
        // Smooth ~1.5s fade-in.
        const step = targetVolume / 30;
        this.mantraFade = setInterval(() => {
          if (!this.mantra) return;
          const next = Math.min(targetVolume, this.mantra.volume + step);
          this.mantra.volume = next;
          if (next >= targetVolume && this.mantraFade) {
            clearInterval(this.mantraFade);
            this.mantraFade = null;
          }
        }, 50);
      }).catch(() => { /* autoplay blocked until user gesture — this IS a gesture, so fine */ });

      this.triggerHaptic(ImpactStyle.Light);
      this.isResonating = true;
      return true;
    } catch {
      return false;
    }
  }

  private fadeOutMantra() {
    if (this.mantraFade) { clearInterval(this.mantraFade); this.mantraFade = null; }
    const audio = this.mantra;
    if (!audio) return;
    const step = (audio.volume || 0.5) / 20;
    this.mantraFade = setInterval(() => {
      if (!audio) return;
      const next = audio.volume - step;
      if (next <= 0.01) {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 0;
        if (this.mantraFade) { clearInterval(this.mantraFade); this.mantraFade = null; }
      } else {
        audio.volume = next;
      }
    }, 40);
  }

  public stopResonance() {
    // Stop the recorded mantra if that's what's playing.
    if (this.mantra && !this.mantra.paused) {
      this.fadeOutMantra();
    }
    if (!this.isResonating || !this.ctx) { this.isResonating = false; return; }
    try {
      const now = this.ctx.currentTime;
      if (this.activeGain) {
        // Exponential fade avoids the click a linear ramp-to-zero can cause.
        this.activeGain.gain.cancelScheduledValues(now);
        this.activeGain.gain.setValueAtTime(Math.max(this.activeGain.gain.value, 0.0001), now);
        this.activeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
      }
      setTimeout(() => {
        try {
          this.activeOsc?.stop();
          this.activeOvertone?.stop();
          this.activeOsc?.disconnect();
          this.activeOvertone?.disconnect();
          this.activeGain?.disconnect();
        } catch {}
        this.activeOsc = null;
        this.activeOvertone = null;
        this.activeGain = null;
        this.isResonating = false;
      }, 650);
    } catch {
      this.isResonating = false;
    }
  }

  public getIsResonating(): boolean {
    return this.isResonating;
  }
}

export const cosmicAudio = new CosmicResonanceEngine();
