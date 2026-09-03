import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Toaster, toast } from "sonner";
import { SettingsWindow } from "@/components/settings/settings-window";
import { HaloWidget } from "@/components/widget/halo-widget";
import { playChime } from "@/lib/chime";
import { desktopView, isHaloDesktop } from "@/lib/desktop";
import { installHaloDesktop } from "@/lib/tauri-bridge";
import { t } from "@/lib/i18n";
import { useHalo } from "@/store/halo";
import "./styles.css";

function NativeApp() {
  const view = desktopView();
  const lang = useHalo((s) => s.lang);
  const status = useHalo((s) => s.status);
  const sound = useHalo((s) => s.sound);
  const loopGeneration = useHalo((s) => s.loopGeneration);
  const hasHydrated = useHalo((s) => s.hasHydrated);
  const alwaysOnTop = useHalo((s) => s.alwaysOnTop);
  const shape = useHalo((s) => s.shape);
  const size = useHalo((s) => s.size);
  const start = useHalo((s) => s.start);
  const reset = useHalo((s) => s.reset);
  const setOs = useHalo((s) => s.setOs);
  const setSettingsOpen = useHalo((s) => s.setSettingsOpen);
  const setFocusMode = useHalo((s) => s.setFocusMode);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("halo-native");
    root.classList.toggle("halo-native-settings", view === "settings");
    document.body.classList.add("halo-native");
    document.body.classList.toggle("halo-native-settings", view === "settings");
  }, [view]);

  useEffect(() => {
    const platform = window.haloDesktop?.platform;
    if (platform === "darwin") setOs("mac");
    else if (platform === "win32") setOs("windows");
  }, [setOs]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

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
    if (!isHaloDesktop()) return;
    void window.haloDesktop?.setAlwaysOnTop(alwaysOnTop);
  }, [alwaysOnTop]);

  useEffect(() => {
    if (!isHaloDesktop() || view !== "widget") return;
    void window.haloDesktop?.resizeWidget({ shape, size });
  }, [shape, size, view]);

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
        if (isHaloDesktop()) void window.haloDesktop?.openSettings();
        else setSettingsOpen(!useHalo.getState().settingsOpen);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reset, setSettingsOpen, setFocusMode]);

  return (
    <>
      {view === "settings" ? <SettingsWindow /> : <HaloWidget />}
      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          style: {
            background: "#0e1a18",
            color: "#e8f2ef",
            border: "1px solid rgb(255 255 255 / 0.08)",
          },
        }}
      />
    </>
  );
}

void installHaloDesktop().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <NativeApp />
    </StrictMode>,
  );
});
