import { LogicalSize } from "@tauri-apps/api/dpi";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import type { HaloDesktopApi } from "@/lib/desktop";

function widgetSize(shape = "ring", size = 236) {
  const padX = 28;
  const padY = 56;
  if (shape === "pill") {
    return {
      width: Math.round(size * 1.32) + padX,
      height: Math.max(Math.round(size * 0.5), 108) + padY,
    };
  }
  if (shape === "card") {
    return {
      width: Math.round(size * 1.12) + padX,
      height: Math.round(size * 0.78) + padY,
    };
  }
  if (shape === "minimal") {
    return { width: Math.round(size * 1.15) + padX, height: 88 + padY };
  }
  return { width: size + padX, height: size + padY };
}

function detectPlatform(): HaloDesktopApi["platform"] {
  const ua = navigator.userAgent;
  if (/Mac|iPhone|iPad/.test(ua)) return "darwin";
  if (/Win/.test(ua)) return "win32";
  return "linux";
}

export async function installHaloDesktop() {
  if (typeof window === "undefined") return;
  if (!("__TAURI_INTERNALS__" in window)) return;

  const api: HaloDesktopApi = {
    isDesktop: true,
    platform: detectPlatform(),
    openSettings: async () => {
      const win = await WebviewWindow.getByLabel("settings");
      await win?.show();
      await win?.setFocus();
    },
    closeSettings: async () => {
      const win = await WebviewWindow.getByLabel("settings");
      await win?.hide();
    },
    setAlwaysOnTop: async (value) => {
      const win = await WebviewWindow.getByLabel("widget");
      await win?.setAlwaysOnTop(value);
    },
    setClickThrough: async (value) => {
      const win = await WebviewWindow.getByLabel("widget");
      await win?.setIgnoreCursorEvents(Boolean(value));
    },
    startDrag: async () => {
      const win = getCurrentWindow();
      await win.startDragging();
    },
    resizeWidget: async (info) => {
      const win = await WebviewWindow.getByLabel("widget");
      const next = widgetSize(info.shape, info.size);
      await win?.setSize(new LogicalSize(next.width, next.height));
    },
  };

  window.haloDesktop = api;
}
