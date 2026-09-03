import { useId, type ReactNode } from "react";
import { TickTime } from "@/components/widget/tick-time";
import { fitTimeFontSize } from "@/lib/format-time";
import type { Shape } from "@/lib/themes";
import { cn } from "@/lib/utils";

export interface WidgetFaceProps {
  shape: Shape;
  size: number;
  thickness: number;
  progress: number;
  timeText: string;
  label: string;
  showLabel: boolean;
  showProgress: boolean;
  glass: boolean;
  done: boolean;
  compact?: boolean;
}

export function WidgetFace({
  shape,
  size,
  thickness,
  progress,
  timeText,
  label,
  showLabel,
  showProgress,
  glass,
  done,
  compact = false,
}: WidgetFaceProps) {
  const baseSize = compact
    ? Math.max(11, Math.round(size * 0.16))
    : shape === "minimal"
      ? Math.round(size * 0.28)
      : shape === "pill"
        ? Math.round(size * 0.2)
        : Math.round(size * 0.22);
  const maxWidth = timeMaxWidth(shape, size, thickness, compact);
  const timeSize = fitTimeFontSize(baseSize, timeText, maxWidth);
  const long = timeText.length > 5;
  const labelSize = compact ? 0 : Math.max(10, Math.round(size * 0.052));

  const face = (
    <div className={cn("halo-face", done && "halo-done")}>
      <TickTime
        text={timeText}
        animate={!compact}
        className={cn(
          "halo-time tabular-nums font-display tracking-tight",
          long && "is-long",
        )}
        style={{ fontSize: timeSize }}
      />
      {showLabel && !compact ? (
        <span className="halo-label" style={{ fontSize: labelSize }}>
          {label}
        </span>
      ) : null}
    </div>
  );

  if (shape === "ring") {
    return (
      <RingFrame
        size={size}
        thickness={thickness}
        progress={showProgress ? progress : 0}
        showProgress={showProgress}
        glass={glass}
      >
        {face}
      </RingFrame>
    );
  }

  if (shape === "pill") {
    return (
      <div
        className={cn("halo-pill", glass && "halo-face-glass")}
        style={{
          width: size * 1.28,
          height: Math.max(size * 0.4, compact ? 44 : 72),
        }}
      >
        {face}
        {showProgress ? (
          <span
            className="halo-pill-bar"
            style={{ width: `${Math.max(2, progress * 100)}%` }}
          />
        ) : null}
      </div>
    );
  }

  if (shape === "card") {
    return (
      <div
        className={cn("halo-card-face", glass && "halo-face-glass")}
        style={{
          width: size * 1.12,
          height: compact ? 64 : size * 0.78,
        }}
      >
        {face}
        {showProgress ? (
          <span className="halo-card-track">
            <span
              className="halo-card-bar"
              style={{ width: `${Math.max(2, progress * 100)}%` }}
            />
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div className="halo-minimal" style={{ minWidth: size * 0.9 }}>
      {face}
    </div>
  );
}

function timeMaxWidth(
  shape: Shape,
  size: number,
  thickness: number,
  compact: boolean,
): number {
  if (compact) return Math.max(48, size * 0.72);
  if (shape === "ring") {
    const inner = size - (thickness + 6) * 2 - 8;
    return inner * 0.84;
  }
  if (shape === "pill") return size * 1.28 - 56;
  if (shape === "card") return size * 1.12 - 44;
  return size * 1.05;
}

function RingFrame({
  size,
  thickness,
  progress,
  showProgress,
  glass,
  children,
}: {
  size: number;
  thickness: number;
  progress: number;
  showProgress: boolean;
  glass: boolean;
  children: ReactNode;
}) {
  const uid = useId();
  const gradId = `halo-grad-${uid.replace(/:/g, "")}`;
  const glowId = `halo-glow-${uid.replace(/:/g, "")}`;
  const inset = 6;
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - thickness) / 2 - inset;
  const circ = 2 * Math.PI * r;
  const dash = Math.max(0, Math.min(1, progress)) * circ;
  const tipX = cx + r * Math.sin(progress * Math.PI * 2);
  const tipY = cy - r * Math.cos(progress * Math.PI * 2);
  const inner = size - (thickness + inset) * 2 - 8;

  return (
    <div className="halo-ring" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="halo-ring-svg"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="var(--halo-ring-from)" />
            <stop offset="100%" stopColor="var(--halo-ring-to)" />
          </linearGradient>
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--halo-track)"
          strokeWidth={thickness}
        />
        {showProgress ? (
          <g filter={`url(#${glowId})`}>
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth={thickness}
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circ}`}
              transform={`rotate(-90 ${cx} ${cy})`}
            />
            {progress > 0.02 && progress < 0.995 ? (
              <circle
                cx={tipX}
                cy={tipY}
                r={thickness / 2 + 0.6}
                fill="var(--halo-ring-to)"
              />
            ) : null}
          </g>
        ) : null}
      </svg>
      <div
        className={cn("halo-ring-inner", glass && "halo-face-glass")}
        style={{ width: inner, height: inner }}
      >
        {children}
      </div>
    </div>
  );
}
