export function formatRemaining(ms: number, showSeconds: boolean): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");

  if (hours > 0) {
    return showSeconds
      ? `${hours}:${pad(minutes)}:${pad(seconds)}`
      : `${hours}:${pad(minutes)}`;
  }
  if (showSeconds) return `${pad(minutes)}:${pad(seconds)}`;
  return `${pad(minutes)}:${pad(seconds)}`;
}

export function formatOvertime(ms: number, showSeconds: boolean): string {
  return `+${formatRemaining(ms, showSeconds)}`;
}

export function formatClock(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** Approximate advance width of a tabular time string, in em. */
export function timeEmWidth(text: string): number {
  let w = 0;
  for (const ch of text) {
    if (ch === ":") w += 0.3;
    else if (ch === "+") w += 0.5;
    else w += 0.62;
  }
  return w;
}

export function fitTimeFontSize(
  basePx: number,
  text: string,
  maxPx: number,
): number {
  const em = timeEmWidth(text);
  if (em <= 0) return basePx;
  const fitted = Math.floor(maxPx / em);
  return Math.max(11, Math.min(basePx, fitted));
}
