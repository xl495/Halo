export function playChime() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  const ctx = new AudioCtx();
  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99];
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    const t0 = now + i * 0.11;
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(0.1, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.72);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + 0.75);
  });
  window.setTimeout(() => {
    void ctx.close();
  }, 1800);
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
