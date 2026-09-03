import { useEffect, useRef, useState } from "react";
import { Search, Wifi, Battery } from "lucide-react";
import { toast } from "sonner";
import { HaloMark } from "@/components/halo-mark";
import { SettingsWindow } from "@/components/settings/settings-window";
import { HaloWidget } from "@/components/widget/halo-widget";
import { playChime } from "@/lib/chime";
import { formatClock } from "@/lib/format-time";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useHalo } from "@/store/halo";

export function DesktopShell() {
  const lang = useHalo((s) => s.lang);
  const os = useHalo((s) => s.os);
  const focusMode = useHalo((s) => s.focusMode);
  const status = useHalo((s) => s.status);
  const sound = useHalo((s) => s.sound);
  const loopGeneration = useHalo((s) => s.loopGeneration);
  const hasHydrated = useHalo((s) => s.hasHydrated);
  const start = useHalo((s) => s.start);
  const pause = useHalo((s) => s.pause);
  const resume = useHalo((s) => s.resume);
  const reset = useHalo((s) => s.reset);
  const settingsOpen = useHalo((s) => s.settingsOpen);
  const setSettingsOpen = useHalo((s) => s.setSettingsOpen);
  const setFocusMode = useHalo((s) => s.setFocusMode);
  const setLang = useHalo((s) => s.setLang);
  const setOs = useHalo((s) => s.setOs);

  const [clock, setClock] = useState(() => formatClock(new Date()));
  const didAutostart = useRef(false);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const id = window.setInterval(() => setClock(formatClock(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      const unsub = useHalo.persist.onFinishHydration(() => {
        useHalo.setState({ hasHydrated: true });
      });
      if (useHalo.persist.hasHydrated()) {
        useHalo.setState({ hasHydrated: true });
      }
      return unsub;
    }
    if (didAutostart.current) return;
    didAutostart.current = true;
    if (useHalo.getState().status === "idle") start();
  }, [hasHydrated, start]);

  useEffect(() => {
    if (status !== "done") return;
    if (sound) playChime();
    toast(t(lang, "timeUp"));
  }, [status, sound, lang]);

  useEffect(() => {
    if (loopGeneration < 1) return;
    if (useHalo.getState().sound) playChime();
  }, [loopGeneration]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        const s = useHalo.getState();
        if (s.status === "running") s.pause();
        else if (s.status === "paused") s.resume();
        else if (s.status === "done") s.again();
        else s.start();
      } else if (e.key === "r" || e.key === "R") {
        reset();
      } else if (e.key === "s" || e.key === "S") {
        setFocusMode(false);
        setSettingsOpen(!useHalo.getState().settingsOpen);
      } else if (e.key === "f" || e.key === "F") {
        setFocusMode(!useHalo.getState().focusMode);
      } else if (e.key === "Escape") {
        if (useHalo.getState().focusMode) setFocusMode(false);
        else setSettingsOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pause, resume, reset, setSettingsOpen, setFocusMode]);

  return (
    <div
      className={cn("halo-desktop", os === "windows" && "is-windows")}
      data-os={os}
    >
      <div className="halo-wallpaper" aria-hidden>
        <img
          src={os === "mac" ? "/wallpaper-mac.jpg" : "/wallpaper-win.jpg"}
          alt=""
          className="halo-wallpaper-img"
        />
        <div className="halo-grain" />
      </div>

      {os === "mac" && !focusMode ? (
        <MacBar
          clock={clock}
          lang={lang}
          onToggleLang={() => setLang(lang === "zh" ? "en" : "zh")}
          onToggleOs={() => setOs("windows")}
          onOpenSettings={() => {
            setFocusMode(false);
            setSettingsOpen(true);
          }}
        />
      ) : null}

      <div className="halo-stage">
        <HaloWidget />
        <SettingsWindow />
      </div>

      {focusMode ? (
        <button
          type="button"
          className="halo-exit-focus"
          onClick={() => setFocusMode(false)}
        >
          {t(lang, "exitFocus")}
        </button>
      ) : null}

      {os === "mac" && !focusMode ? (
        <MacDock
          settingsOpen={settingsOpen}
          onOpenSettings={() => setSettingsOpen(true)}
          onFocus={() => setFocusMode(true)}
        />
      ) : null}

      {os === "windows" && !focusMode ? (
        <WinBar
          clock={clock}
          lang={lang}
          onToggleLang={() => setLang(lang === "zh" ? "en" : "zh")}
          onToggleOs={() => setOs("mac")}
          onOpenSettings={() => {
            setFocusMode(false);
            setSettingsOpen(true);
          }}
        />
      ) : null}
    </div>
  );
}

function MacBar({
  clock,
  lang,
  onToggleLang,
  onToggleOs,
  onOpenSettings,
}: {
  clock: string;
  lang: "zh" | "en";
  onToggleLang: () => void;
  onToggleOs: () => void;
  onOpenSettings: () => void;
}) {
  return (
    <header className="halo-menubar">
      <div className="halo-menubar-left">
        <HaloMark className="size-4" />
        <button type="button" className="halo-menu-strong" onClick={onOpenSettings}>
          {t(lang, "appName")}
        </button>
        <button type="button" className="halo-menu-item" onClick={onOpenSettings}>
          {t(lang, "timer")}
        </button>
        <button type="button" className="halo-menu-item" onClick={onOpenSettings}>
          {t(lang, "menuView")}
        </button>
      </div>
      <div className="halo-menubar-right">
        <button type="button" className="halo-menu-item" onClick={onToggleOs}>
          {t(lang, "windows")}
        </button>
        <button type="button" className="halo-menu-item" onClick={onToggleLang}>
          {lang === "zh" ? "EN" : "中"}
        </button>
        <Wifi className="size-3.5 opacity-80" />
        <span className="tabular-nums">{clock}</span>
      </div>
    </header>
  );
}

function MacDock({
  settingsOpen,
  onOpenSettings,
  onFocus,
}: {
  settingsOpen: boolean;
  onOpenSettings: () => void;
  onFocus: () => void;
}) {
  const lang = useHalo((s) => s.lang);
  return (
    <nav className="halo-dock" aria-label="Dock">
      <button type="button" className="halo-dock-item is-live" onClick={onFocus}>
        <HaloMark className="size-7" />
      </button>
      <button
        type="button"
        className={cn("halo-dock-item", settingsOpen && "is-live")}
        onClick={onOpenSettings}
        aria-label={t(lang, "settings")}
      >
        <span className="halo-dock-gear" />
      </button>
    </nav>
  );
}

function WinBar({
  clock,
  lang,
  onToggleLang,
  onToggleOs,
  onOpenSettings,
}: {
  clock: string;
  lang: "zh" | "en";
  onToggleLang: () => void;
  onToggleOs: () => void;
  onOpenSettings: () => void;
}) {
  return (
    <footer className="halo-taskbar">
      <div className="halo-taskbar-cluster">
        <button
          type="button"
          className="halo-taskbar-start"
          onClick={onOpenSettings}
          aria-label={t(lang, "appName")}
        >
          <HaloMark className="size-5" />
        </button>
        <button type="button" className="halo-taskbar-search" onClick={onOpenSettings}>
          <Search className="size-3.5" />
          <span>{t(lang, "search")}</span>
        </button>
        <button type="button" className="halo-taskbar-pin is-live" onClick={onOpenSettings}>
          <HaloMark className="size-5" />
        </button>
      </div>
      <div className="halo-taskbar-tray">
        <button type="button" className="halo-menu-item" onClick={onToggleOs}>
          {t(lang, "mac")}
        </button>
        <button type="button" className="halo-menu-item" onClick={onToggleLang}>
          {lang === "zh" ? "EN" : "中"}
        </button>
        <Wifi className="size-3.5 opacity-80" />
        <Battery className="size-3.5 opacity-80" />
        <span className="tabular-nums">{clock}</span>
      </div>
    </footer>
  );
}
