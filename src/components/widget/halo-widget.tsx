import { useEffect, useMemo, useState } from "react";
import { Pause, Play, RotateCcw, Settings2 } from "lucide-react";
import { WidgetFace } from "@/components/widget/widget-face";
import { t, tRound } from "@/lib/i18n";
import { formatOvertime, formatRemaining } from "@/lib/format-time";
import { isHaloDesktop } from "@/lib/desktop";
import { useDrag } from "@/lib/use-drag";
import { cn } from "@/lib/utils";
import { useHalo } from "@/store/halo";

export function HaloWidget({
  preview = false,
  embedded = false,
  forceSize,
}: {
  preview?: boolean;
  embedded?: boolean;
  forceSize?: number;
}) {
  const lang = useHalo((s) => s.lang);
  const shape = useHalo((s) => s.shape);
  const themeId = useHalo((s) => s.themeId);
  const size = useHalo((s) => s.size);
  const opacity = useHalo((s) => s.opacity);
  const thickness = useHalo((s) => s.thickness);
  const glass = useHalo((s) => s.glass);
  const showSeconds = useHalo((s) => s.showSeconds);
  const showLabel = useHalo((s) => s.showLabel);
  const showProgress = useHalo((s) => s.showProgress);
  const customLabel = useHalo((s) => s.label);
  const loop = useHalo((s) => s.loop);
  const loopRound = useHalo((s) => s.loopRound);
  const status = useHalo((s) => s.status);
  const durationMs = useHalo((s) => s.durationMs);
  const remainingMs = useHalo((s) => s.remainingMs);
  const endsAt = useHalo((s) => s.endsAt);
  const finishedAt = useHalo((s) => s.finishedAt);
  const widgetPos = useHalo((s) => s.widgetPos);
  const alwaysOnTop = useHalo((s) => s.alwaysOnTop);
  const widgetFocus = useHalo((s) => s.widgetFocus);
  const pipActive = useHalo((s) => s.pipActive);
  const pause = useHalo((s) => s.pause);
  const resume = useHalo((s) => s.resume);
  const reset = useHalo((s) => s.reset);
  const start = useHalo((s) => s.start);
  const again = useHalo((s) => s.again);
  const setSettingsOpen = useHalo((s) => s.setSettingsOpen);
  const setSettingsTab = useHalo((s) => s.setSettingsTab);
  const setWidgetPos = useHalo((s) => s.setWidgetPos);
  const setWidgetFocus = useHalo((s) => s.setWidgetFocus);
  const finish = useHalo((s) => s.finish);

  const [now, setNow] = useState(() => Date.now());
  const [fit, setFit] = useState(size);

  useEffect(() => {
    if (status !== "running" && status !== "done") return;
    const id = window.setInterval(() => setNow(Date.now()), 80);
    return () => window.clearInterval(id);
  }, [status]);

  useEffect(() => {
    const apply = () =>
      setFit(Math.min(forceSize ?? size, Math.max(140, window.innerWidth - 40)));
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [size, forceSize]);

  const remaining = useMemo(() => {
    if (status === "running" && endsAt) return Math.max(0, endsAt - now);
    if (status === "done") return 0;
    return remainingMs;
  }, [status, endsAt, now, remainingMs]);

  const overtimeMs =
    status === "done" && finishedAt ? Math.max(0, now - finishedAt) : 0;

  useEffect(() => {
    if (status === "running" && remaining <= 0) finish();
  }, [status, remaining, finish]);

  const progress = durationMs > 0 ? remaining / durationMs : 0;
  const timeText =
    status === "done"
      ? formatOvertime(overtimeMs, showSeconds)
      : formatRemaining(remaining, showSeconds);
  const statusLabel =
    customLabel.trim() ||
    (loop && status === "running" && loopRound > 0
      ? tRound(lang, loopRound)
      : t(
          lang,
          status === "done"
            ? overtimeMs > 0
              ? "overtime"
              : "done"
            : status === "paused"
              ? "paused"
              : loop
                ? "looping"
                : "counting",
        ));
  const urgent = status === "running" && remaining > 0 && remaining <= 60_000;
  const critical = status === "running" && remaining > 0 && remaining <= 10_000;

  const drag = useDrag(widgetPos, setWidgetPos);
  const z = alwaysOnTop ? 50 : widgetFocus ? 40 : 24;
  const desktop = isHaloDesktop();
  const [hot, setHot] = useState(false);

  useEffect(() => {
    if (!desktop) return;
    const enter = () => setHot(true);
    const leave = () => setHot(false);
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mouseleave", leave);
    window.addEventListener("pointerover", enter);
    return () => {
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseleave", leave);
      window.removeEventListener("pointerover", enter);
    };
  }, [desktop]);

  if (pipActive && !preview && !embedded && !desktop) return null;

  const floating = !preview && !embedded && !desktop;

  return (
    <div
      className={cn(
        "halo-float",
        !floating && "halo-float-preview",
        desktop && "halo-float-desktop",
        hot && "is-hot",
        status === "done" && "halo-float-done",
        urgent && "is-urgent",
        critical && "is-critical",
        status === "done" && "is-overtime",
      )}
      style={
        floating
          ? {
              left: `${widgetPos.x * 100}%`,
              top: `${widgetPos.y * 100}%`,
              zIndex: z,
              opacity,
            }
          : { opacity }
      }
      data-halo-theme={themeId}
      data-halo-glass={glass ? "true" : "false"}
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest("[data-no-drag]")) return;
        if (desktop) {
          if (e.button !== 0) return;
          e.preventDefault();
          void window.haloDesktop?.startDrag();
          return;
        }
        if (!floating) return;
        setWidgetFocus(true);
        drag.onPointerDown(e);
      }}
      onPointerEnter={() => setHot(true)}
      onPointerLeave={() => setHot(false)}
      onPointerMove={floating ? drag.onPointerMove : undefined}
      onPointerUp={floating ? drag.onPointerUp : undefined}
      onPointerCancel={floating ? drag.onPointerUp : undefined}
    >
      <WidgetFace
        shape={shape}
        size={preview ? (forceSize ?? 72) : fit}
        thickness={preview ? Math.max(6, thickness * 0.7) : thickness}
        progress={progress}
        timeText={timeText}
        label={statusLabel}
        showLabel={showLabel}
        showProgress={showProgress}
        glass={glass}
        done={status === "done"}
        compact={preview}
      />
      {preview ? null : (
        <div className="halo-controls" data-no-drag>
          <button
            type="button"
            className="halo-ctrl"
            aria-label={
              status === "running" ? t(lang, "pause") : t(lang, "start")
            }
            onClick={() => {
              if (status === "running") pause();
              else if (status === "paused") resume();
              else if (status === "done") again();
              else start();
            }}
          >
            {status === "running" ? <Pause /> : <Play />}
          </button>
          <button
            type="button"
            className="halo-ctrl"
            aria-label={t(lang, "reset")}
            onClick={() => reset()}
          >
            <RotateCcw />
          </button>
          <button
            type="button"
            className="halo-ctrl"
            aria-label={t(lang, "settings")}
            onClick={() => {
              setSettingsTab("timer");
              useHalo.getState().setFocusMode(false);
              if (desktop) void window.haloDesktop?.openSettings();
              else setSettingsOpen(true);
            }}
          >
            <Settings2 />
          </button>
        </div>
      )}
    </div>
  );
}
