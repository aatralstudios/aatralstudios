// Procedural mechanical keyboard sound synthesizer using Web Audio API
// Strict compliance: Audio is MUTED by default. No autoplay.

let audioCtx: AudioContext | null = null;
let isSoundEnabled = false;

export function toggleSound(): boolean {
  isSoundEnabled = !isSoundEnabled;
  if (isSoundEnabled && !audioCtx) {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new AudioContextClass();
    } catch {
      // AudioContext not supported
    }
  }
  return isSoundEnabled;
}

export function getSoundStatus(): boolean {
  return isSoundEnabled;
}

export function playMechanicalKeyClick(pitchModifier: number = 1.0) {
  if (!isSoundEnabled || !audioCtx) return;

  try {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    
    // Noise impulse for tactile click
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600 * pitchModifier, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400 * pitchModifier, now);
    filter.Q.setValueAtTime(3.0, now);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  } catch {
    // Fail silently without blocking UI
  }
}
