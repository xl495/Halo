import { useEffect, useState } from "react";
import {
  Clock3,
  Info,
  Monitor,
  Palette,
  PictureInPicture2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { HaloMark } from "@/components/halo-mark";
import { TickTime } from "@/components/widget/tick-time";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { playChime } from "@/lib/chime";
import { formatRemaining } from "@/lib/format-time";
import { t, type MsgKey } from "@/lib/i18n";
import { openHaloPip } from "@/lib/pip";
import { isHaloDesktop } from "@/lib/desktop";
import { PRESETS, SHAPES, THEMES } from "@/lib/themes";
import { useDrag } from "@/lib/use-drag";
import { cn } from "@/lib/utils";
import { useHalo, type SettingsTab } from "@/store/halo";

const TABS: { id: SettingsTab; icon: typeof Clock3; key: MsgKey }[] = [
  { id: "timer", icon: Clock3, key: "timer" },
  { id: "look", icon: Palette, key: "look" },
  { id: "display", icon: Monitor, key: "display" },
  { id: "about", icon: Info, key: "about" },
];

export function SettingsWindow() {
  const lang = useHalo((s) => s.lang);
  const open = useHalo((s) => s.settingsOpen);
  const focusMode = useHalo((s) => s.focusMode);
  const tab = useHalo((s) => s.settingsTab);
  const pos = useHalo((s) => s.settingsPos);
  const alwaysOnTop = useHalo((s) => s.alwaysOnTop);
  const widgetFocus = useHalo((s) => s.widgetFocus);
  const os = useHalo((s) => s.os);
  const setOpen = useHalo((s) => s.setSettingsOpen);
  const setTab = useHalo((s) => s.setSettingsTab);
  const setPos = useHalo((s) => s.setSettingsPos);
  const setWidgetFocus = useHalo((s) => s.setWidgetFocus);
  const drag = useDrag(pos, setPos);
  const page = isHaloDesktop();

  if (!page && (!open || focusMode)) return null;

  const z = alwaysOnTop && widgetFocus ? 30 : 42;

  function close() {
    if (page) void window.haloDesktop?.closeSettings();
    else setOpen(false);
  }

  return (
    <section
      className={cn("halo-settings", page && "halo-settings-page")}
      style={
        page
          ? undefined
          : {
              left: `${pos.x * 100}%`,
              top: `${pos.y * 100}%`,
              zIndex: z,
            }
      }
      onPointerDown={() => setWidgetFocus(false)}
    >
      <header
        className="halo-settings-bar"
        onPointerDown={page ? undefined : drag.onPointerDown}
        onPointerMove={page ? undefined : drag.onPointerMove}
        onPointerUp={page ? undefined : drag.onPointerUp}
        {...(page ? { "data-tauri-drag-region": true } : {})}
      >
        {os === "mac" ? (
          <span className="halo-traffic">
            <button
              type="button"
              className="halo-traffic-btn halo-traffic-close"
              aria-label={t(lang, "close")}
              data-no-drag
              onClick={close}
            />
            <span className="halo-traffic-btn halo-traffic-min" />
            <span className="halo-traffic-btn halo-traffic-max" />
          </span>
        ) : (
          <span className="halo-win-mark">
            <HaloMark className="size-3.5" />
          </span>
        )}
        <span className="halo-settings-title">{t(lang, "settings")}</span>
        <button
          type="button"
          className="halo-settings-x"
          aria-label={t(lang, "close")}
          data-no-drag
          onClick={close}
        >
          <X className="size-3.5" />
        </button>
      </header>
      <div className="halo-settings-body">
        <nav className="halo-settings-nav" aria-label={t(lang, "settings")}>
          {TABS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                className={cn(
                  "halo-nav-btn",
                  tab === item.id && "halo-nav-btn-active",
                )}
                onClick={() => setTab(item.id)}
              >
                <Icon className="size-4" />
                {t(lang, item.key)}
              </button>
            );
          })}
        </nav>
        <div className="halo-settings-content">
          {tab === "timer" ? <TimerPanel /> : null}
          {tab === "look" ? <LookPanel /> : null}
          {tab === "display" ? <DisplayPanel /> : null}
          {tab === "about" ? <AboutPanel /> : null}
        </div>
      </div>
    </section>
  );
}

function TimerPanel() {
  const lang = useHalo((s) => s.lang);
  const status = useHalo((s) => s.status);
  const durationMs = useHalo((s) => s.durationMs);
  const remainingMs = useHalo((s) => s.remainingMs);
  const endsAt = useHalo((s) => s.endsAt);
  const showSeconds = useHalo((s) => s.showSeconds);
  const customLabel = useHalo((s) => s.label);
  const loop = useHalo((s) => s.loop);
  const setLabel = useHalo((s) => s.setLabel);
  const setLoop = useHalo((s) => s.setLoop);
  const start = useHalo((s) => s.start);
  const pause = useHalo((s) => s.pause);
  const resume = useHalo((s) => s.resume);
  const reset = useHalo((s) => s.reset);
  const again = useHalo((s) => s.again);

  const [now, setNow] = useState(() => Date.now());
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(25);
  const [secs, setSecs] = useState(0);
  const [until, setUntil] = useState("18:00");

  useEffect(() => {
    if (status !== "running") return;
    const id = window.setInterval(() => setNow(Date.now()), 200);
    return () => window.clearInterval(id);
  }, [status]);

  const remaining =
    status === "running" && endsAt
      ? Math.max(0, endsAt - now)
      : status === "done"
        ? 0
        : remainingMs;

  const clock = formatRemaining(remaining, showSeconds);

  return (
    <div className="halo-panel">
      <p
        className={cn(
          "halo-big-time tabular-nums font-display",
          clock.length > 8 && "is-very-long",
          clock.length > 5 && clock.length <= 8 && "is-long",
        )}
      >
        <TickTime text={clock} />
      </p>
      <p className="halo-big-sub">
        {status === "done"
          ? t(lang, "done")
          : loop && status === "running"
            ? t(lang, "looping")
            : `${t(lang, "total")} · ${formatRemaining(durationMs, false)}`}
      </p>
      <div className="halo-row">
        <Button
          onClick={() => {
            if (status === "running") pause();
            else if (status === "paused") resume();
            else if (status === "done") again();
            else start();
            if (status !== "running") toast(t(lang, "started"));
          }}
        >
          {status === "running"
            ? t(lang, "pause")
            : status === "paused"
              ? t(lang, "resume")
              : status === "done"
                ? t(lang, "again")
                : t(lang, "start")}
        </Button>
        <Button variant="secondary" onClick={() => reset()}>
          {t(lang, "reset")}
        </Button>
      </div>
      <ToggleRow
        label={t(lang, "loop")}
        checked={loop}
        onCheckedChange={setLoop}
      />
      <p className="halo-hint">{t(lang, "loopHint")}</p>

      <Label>{t(lang, "eventName")}</Label>
      <Input
        value={customLabel}
        placeholder={t(lang, "eventPlaceholder")}
        onChange={(e) => setLabel(e.target.value)}
        maxLength={24}
      />

      <Label>{t(lang, "presets")}</Label>
      <div className="halo-preset-grid">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            className="halo-chip"
            onClick={() => {
              start(p.minutes * 60 * 1000);
              toast(`${t(lang, "started")} · ${t(lang, p.key)}`);
            }}
          >
            {t(lang, p.key)}
          </button>
        ))}
      </div>

      <Label>{t(lang, "custom")}</Label>
      <div className="halo-duration">
        <NumberField
          label={t(lang, "hours")}
          value={hours}
          max={23}
          onChange={setHours}
        />
        <NumberField
          label={t(lang, "minutes")}
          value={mins}
          max={59}
          onChange={setMins}
        />
        <NumberField
          label={t(lang, "seconds")}
          value={secs}
          max={59}
          onChange={setSecs}
        />
      </div>
      <Button
        variant="outline"
        onClick={() => {
          const ms = ((hours * 3600 + mins * 60 + secs) * 1000) || 1000;
          start(ms);
          toast(t(lang, "started"));
        }}
      >
        {t(lang, "apply")}
      </Button>

      <Label htmlFor="halo-until">{t(lang, "until")}</Label>
      <div className="halo-row">
        <Input
          id="halo-until"
          type="time"
          value={until}
          onChange={(e) => setUntil(e.target.value)}
        />
        <Button
          variant="secondary"
          onClick={() => {
            const [h, m] = until.split(":").map(Number);
            const d = new Date();
            d.setHours(h || 0, m || 0, 0, 0);
            if (d.getTime() <= Date.now()) d.setDate(d.getDate() + 1);
            start(d.getTime() - Date.now());
            toast(t(lang, "started"));
          }}
        >
          {t(lang, "apply")}
        </Button>
      </div>
      <p className="halo-hint">{t(lang, "targetHint")}</p>
    </div>
  );
}

function NumberField({
  label,
  value,
  max,
  onChange,
}: {
  label: string;
  value: number;
  max: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="halo-num">
      <span>{label}</span>
      <Input
        type="number"
        min={0}
        max={max}
        value={value}
        onChange={(e) =>
          onChange(Math.max(0, Math.min(max, Number(e.target.value) || 0)))
        }
      />
    </label>
  );
}

function LookPanel() {
  const lang = useHalo((s) => s.lang);
  const shape = useHalo((s) => s.shape);
  const themeId = useHalo((s) => s.themeId);
  const size = useHalo((s) => s.size);
  const thickness = useHalo((s) => s.thickness);
  const opacity = useHalo((s) => s.opacity);
  const glass = useHalo((s) => s.glass);
  const setShape = useHalo((s) => s.setShape);
  const setTheme = useHalo((s) => s.setTheme);
  const setSize = useHalo((s) => s.setSize);
  const setThickness = useHalo((s) => s.setThickness);
  const setOpacity = useHalo((s) => s.setOpacity);
  const setGlass = useHalo((s) => s.setGlass);

  return (
    <div className="halo-panel">
      <Label>{t(lang, "shape")}</Label>
      <div className="halo-shape-grid">
        {SHAPES.map((id) => (
          <button
            key={id}
            type="button"
            className={cn("halo-shape-card", shape === id && "is-active")}
            data-halo-theme={themeId}
            onClick={() => setShape(id)}
          >
            <span className={cn("halo-shape-icon", `is-${id}`)} aria-hidden />
            <span>
              {t(
                lang,
                id === "ring"
                  ? "shapeRing"
                  : id === "pill"
                    ? "shapePill"
                    : id === "minimal"
                      ? "shapeMinimal"
                      : "shapeCard",
              )}
            </span>
          </button>
        ))}
      </div>

      <Label>{t(lang, "theme")}</Label>
      <div className="halo-theme-grid">
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            type="button"
            className={cn(
              "halo-theme-swatch",
              themeId === theme.id && "is-active",
            )}
            data-halo-theme={theme.id}
            onClick={() => setTheme(theme.id)}
          >
            <span className="halo-theme-ring" />
            <span>{lang === "zh" ? theme.zh : theme.en}</span>
          </button>
        ))}
      </div>

      <div className="halo-slider-row">
        <Label>
          {t(lang, "size")} · {size}
        </Label>
        <Slider
          min={140}
          max={320}
          step={4}
          value={[size]}
          onValueChange={(v) => setSize(v[0] ?? size)}
        />
      </div>
      <div className="halo-slider-row">
        <Label>
          {t(lang, "thickness")} · {thickness}
        </Label>
        <Slider
          min={6}
          max={18}
          step={1}
          value={[thickness]}
          onValueChange={(v) => setThickness(v[0] ?? thickness)}
        />
      </div>
      <div className="halo-slider-row">
        <Label>
          {t(lang, "opacity")} · {Math.round(opacity * 100)}%
        </Label>
        <Slider
          min={0.55}
          max={1}
          step={0.01}
          value={[opacity]}
          onValueChange={(v) => setOpacity(v[0] ?? opacity)}
        />
      </div>
      <ToggleRow
        label={t(lang, "glass")}
        checked={glass}
        onCheckedChange={setGlass}
      />
    </div>
  );
}

function DisplayPanel() {
  const lang = useHalo((s) => s.lang);
  const os = useHalo((s) => s.os);
  const showSeconds = useHalo((s) => s.showSeconds);
  const showLabel = useHalo((s) => s.showLabel);
  const showProgress = useHalo((s) => s.showProgress);
  const sound = useHalo((s) => s.sound);
  const loop = useHalo((s) => s.loop);
  const alwaysOnTop = useHalo((s) => s.alwaysOnTop);
  const setLang = useHalo((s) => s.setLang);
  const setOs = useHalo((s) => s.setOs);
  const setShowSeconds = useHalo((s) => s.setShowSeconds);
  const setShowLabel = useHalo((s) => s.setShowLabel);
  const setShowProgress = useHalo((s) => s.setShowProgress);
  const setSound = useHalo((s) => s.setSound);
  const setLoop = useHalo((s) => s.setLoop);
  const setAlwaysOnTop = useHalo((s) => s.setAlwaysOnTop);
  const setFocusMode = useHalo((s) => s.setFocusMode);
  const size = useHalo((s) => s.size);

  async function popOut() {
    try {
      const ok = await openHaloPip(size);
      if (!ok) {
        setFocusMode(true);
        toast(t(lang, "pipUnsupported"));
      } else {
        setFocusMode(true);
      }
    } catch {
      setFocusMode(true);
      toast(t(lang, "pipUnsupported"));
    }
  }

  return (
    <div className="halo-panel">
      <Label>{t(lang, "language")}</Label>
      <div className="halo-seg">
        <button
          type="button"
          className={cn("halo-seg-btn", lang === "zh" && "is-active")}
          onClick={() => setLang("zh")}
        >
          中文
        </button>
        <button
          type="button"
          className={cn("halo-seg-btn", lang === "en" && "is-active")}
          onClick={() => setLang("en")}
        >
          English
        </button>
      </div>
      <Label>{t(lang, "desktop")}</Label>
      <div className="halo-seg">
        <button
          type="button"
          className={cn("halo-seg-btn", os === "mac" && "is-active")}
          onClick={() => setOs("mac")}
        >
          {t(lang, "mac")}
        </button>
        <button
          type="button"
          className={cn("halo-seg-btn", os === "windows" && "is-active")}
          onClick={() => setOs("windows")}
        >
          {t(lang, "windows")}
        </button>
      </div>
      <ToggleRow
        label={t(lang, "showSeconds")}
        checked={showSeconds}
        onCheckedChange={setShowSeconds}
      />
      <ToggleRow
        label={t(lang, "showLabel")}
        checked={showLabel}
        onCheckedChange={setShowLabel}
      />
      <ToggleRow
        label={t(lang, "showProgress")}
        checked={showProgress}
        onCheckedChange={setShowProgress}
      />
      <ToggleRow
        label={t(lang, "sound")}
        checked={sound}
        onCheckedChange={(v) => {
          setSound(v);
          if (v) playChime();
        }}
      />
      <ToggleRow
        label={t(lang, "loop")}
        checked={loop}
        onCheckedChange={setLoop}
      />
      <ToggleRow
        label={t(lang, "alwaysOnTop")}
        checked={alwaysOnTop}
        onCheckedChange={setAlwaysOnTop}
      />
      {isHaloDesktop() ? null : (
        <>
          <div className="halo-row halo-row-top">
            <Button variant="secondary" onClick={() => setFocusMode(true)}>
              {t(lang, "focusMode")}
            </Button>
            <Button variant="outline" onClick={() => void popOut()}>
              <PictureInPicture2 />
              {t(lang, "popOut")}
            </Button>
          </div>
          <p className="halo-hint">{t(lang, "popOutHint")}</p>
        </>
      )}
    </div>
  );
}

function AboutPanel() {
  const lang = useHalo((s) => s.lang);
  return (
    <div className="halo-panel halo-about">
      <HaloMark className="size-12" />
      <h2 className="font-display text-lg font-medium tracking-tight">
        {t(lang, "appName")}
      </h2>
      <p className="text-sm text-fg-muted">{t(lang, "appTag")}</p>
      <p className="text-sm leading-relaxed text-pretty text-fg-muted">
        {t(lang, "aboutBody")}
      </p>
      <p className="halo-hint">{t(lang, "aboutHint")}</p>
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="halo-toggle">
      <span>{label}</span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
