import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Lang } from "@/lib/i18n";
import type { Shape, ThemeId } from "@/lib/themes";

export type OsChrome = "mac" | "windows";
export type Status = "idle" | "running" | "paused" | "done";
export type SettingsTab = "timer" | "look" | "display" | "about";

const DEFAULT_DURATION = 25 * 60 * 1000;
const DEFAULT_REMAINING = (16 * 60 + 31) * 1000;

export interface HaloState {
  hasHydrated: boolean;
  lang: Lang;
  os: OsChrome;
  shape: Shape;
  themeId: ThemeId;
  size: number;
  opacity: number;
  thickness: number;
  glass: boolean;
  showSeconds: boolean;
  showLabel: boolean;
  showProgress: boolean;
  label: string;
  sound: boolean;
  loop: boolean;
  clickThrough: boolean;
  alwaysOnTop: boolean;
  settingsOpen: boolean;
  settingsTab: SettingsTab;
  focusMode: boolean;
  durationMs: number;
  remainingMs: number;
  endsAt: number | null;
  finishedAt: number | null;
  status: Status;
  loopGeneration: number;
  loopRound: number;
  widgetPos: { x: number; y: number };
  settingsPos: { x: number; y: number };
  widgetFocus: boolean;
  pipActive: boolean;
  setHasHydrated: (v: boolean) => void;
  setLang: (lang: Lang) => void;
  setOs: (os: OsChrome) => void;
  setShape: (shape: Shape) => void;
  setTheme: (themeId: ThemeId) => void;
  setSize: (size: number) => void;
  setOpacity: (opacity: number) => void;
  setThickness: (thickness: number) => void;
  setGlass: (glass: boolean) => void;
  setShowSeconds: (v: boolean) => void;
  setShowLabel: (v: boolean) => void;
  setShowProgress: (v: boolean) => void;
  setLabel: (label: string) => void;
  setSound: (v: boolean) => void;
  setLoop: (v: boolean) => void;
  setClickThrough: (v: boolean) => void;
  setAlwaysOnTop: (v: boolean) => void;
  setSettingsOpen: (v: boolean) => void;
  setSettingsTab: (tab: SettingsTab) => void;
  setFocusMode: (v: boolean) => void;
  setWidgetPos: (x: number, y: number) => void;
  setSettingsPos: (x: number, y: number) => void;
  setWidgetFocus: (v: boolean) => void;
  setPipActive: (v: boolean) => void;
  start: (durationMs?: number) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  finish: () => void;
  again: () => void;
  nudge: (deltaMs: number) => void;
  remainingNow: () => number;
}

export const useHalo = create<HaloState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      lang: "zh",
      os: "mac",
      shape: "ring",
      themeId: "aurora",
      size: 236,
      opacity: 1,
      thickness: 11,
      glass: false,
      showSeconds: true,
      showLabel: true,
      showProgress: true,
      label: "",
      sound: true,
      loop: false,
      clickThrough: false,
      alwaysOnTop: true,
      settingsOpen: true,
      settingsTab: "timer",
      focusMode: false,
      durationMs: DEFAULT_DURATION,
      remainingMs: DEFAULT_REMAINING,
      endsAt: null,
      finishedAt: null,
      status: "idle",
      loopGeneration: 0,
      loopRound: 0,
      widgetPos: { x: 0.07, y: 0.2 },
      settingsPos: { x: 0.48, y: 0.055 },
      widgetFocus: false,
      pipActive: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
      setLang: (lang) => set({ lang }),
      setOs: (os) => set({ os }),
      setShape: (shape) => set({ shape }),
      setTheme: (themeId) => set({ themeId }),
      setSize: (size) => set({ size }),
      setOpacity: (opacity) => set({ opacity }),
      setThickness: (thickness) => set({ thickness }),
      setGlass: (glass) => set({ glass }),
      setShowSeconds: (showSeconds) => set({ showSeconds }),
      setShowLabel: (showLabel) => set({ showLabel }),
      setShowProgress: (showProgress) => set({ showProgress }),
      setLabel: (label) => set({ label }),
      setSound: (sound) => set({ sound }),
      setLoop: (loop) => set({ loop }),
      setClickThrough: (clickThrough) => set({ clickThrough }),
      setAlwaysOnTop: (alwaysOnTop) => set({ alwaysOnTop }),
      setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
      setSettingsTab: (settingsTab) => set({ settingsTab }),
      setFocusMode: (focusMode) => set({ focusMode }),
      setWidgetPos: (x, y) => set({ widgetPos: { x, y } }),
      setSettingsPos: (x, y) => set({ settingsPos: { x, y } }),
      setWidgetFocus: (widgetFocus) => set({ widgetFocus }),
      setPipActive: (pipActive) => set({ pipActive }),
      start: (durationMs) => {
        const s = get();
        const next = durationMs ?? s.remainingMs ?? s.durationMs;
        const ms = Math.max(1000, next);
        set({
          durationMs: durationMs ?? s.durationMs,
          remainingMs: ms,
          endsAt: Date.now() + ms,
          finishedAt: null,
          status: "running",
          loopRound: s.loop ? 1 : 0,
        });
      },
      pause: () => {
        const { status, endsAt } = get();
        if (status !== "running" || !endsAt) return;
        set({
          remainingMs: Math.max(0, endsAt - Date.now()),
          endsAt: null,
          status: "paused",
        });
      },
      resume: () => {
        const { status, remainingMs } = get();
        if (status !== "paused") return;
        set({
          endsAt: Date.now() + Math.max(0, remainingMs),
          status: "running",
        });
      },
      reset: () => {
        const { durationMs } = get();
        set({
          remainingMs: durationMs,
          endsAt: null,
          finishedAt: null,
          status: "idle",
          loopRound: 0,
        });
      },
      finish: () => {
        const s = get();
        if (s.status !== "running") return;
        if (s.loop) {
          const ms = Math.max(1000, s.durationMs);
          set({
            remainingMs: ms,
            endsAt: Date.now() + ms,
            finishedAt: null,
            status: "running",
            loopGeneration: s.loopGeneration + 1,
            loopRound: s.loopRound + 1,
          });
          return;
        }
        set({
          remainingMs: 0,
          endsAt: null,
          finishedAt: Date.now(),
          status: "done",
        });
      },
      again: () => {
        const s = get();
        set({
          remainingMs: s.durationMs,
          endsAt: Date.now() + s.durationMs,
          finishedAt: null,
          status: "running",
          loopRound: s.loop ? 1 : 0,
        });
      },
      nudge: (deltaMs) => {
        const s = get();
        if (s.status === "done") return;
        const current =
          s.status === "running" && s.endsAt
            ? s.endsAt - Date.now()
            : s.remainingMs;
        const rem = Math.max(1000, current + deltaMs);
        set({
          remainingMs: rem,
          durationMs: Math.max(rem, s.durationMs + deltaMs),
          endsAt: s.status === "running" ? Date.now() + rem : null,
        });
      },
      remainingNow: () => {
        const { status, endsAt, remainingMs } = get();
        if (status === "running" && endsAt) return Math.max(0, endsAt - Date.now());
        if (status === "done") return 0;
        return remainingMs;
      },
    }),
    {
      name: "halo-widget",
      partialize: (s) => ({
        lang: s.lang,
        os: s.os,
        shape: s.shape,
        themeId: s.themeId,
        size: s.size,
        opacity: s.opacity,
        thickness: s.thickness,
        glass: s.glass,
        showSeconds: s.showSeconds,
        showLabel: s.showLabel,
        showProgress: s.showProgress,
        label: s.label,
        sound: s.sound,
        loop: s.loop,
        clickThrough: s.clickThrough,
        alwaysOnTop: s.alwaysOnTop,
        settingsOpen: s.settingsOpen,
        settingsTab: s.settingsTab,
        durationMs: s.durationMs,
        remainingMs: s.remainingMs,
        endsAt: s.endsAt,
        finishedAt: s.finishedAt,
        status: s.status,
        loopRound: s.loopRound,
        widgetPos: s.widgetPos,
        settingsPos: s.settingsPos,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (
            state.status === "running" &&
            state.endsAt &&
            state.endsAt <= Date.now()
          ) {
            if (state.loop) {
              state.remainingMs = state.durationMs;
              state.endsAt = Date.now() + state.durationMs;
            } else {
              state.status = "done";
              state.remainingMs = 0;
              state.finishedAt = state.endsAt;
              state.endsAt = null;
            }
          }
          state.hasHydrated = true;
        } else {
          useHalo.setState({ hasHydrated: true });
        }
      },
    },
  ),
);

if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === "halo-widget") useHalo.persist.rehydrate();
  });
}
