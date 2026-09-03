export type HaloDesktopApi = {
  isDesktop: true;
  platform: "darwin" | "win32" | "linux";
  openSettings: () => Promise<void>;
  closeSettings: () => Promise<void>;
  setAlwaysOnTop: (value: boolean) => Promise<void>;
  setClickThrough: (value: boolean) => Promise<void>;
  startDrag: () => Promise<void>;
  resizeWidget: (info: { shape: string; size: number }) => Promise<void>;
};

declare global {
  interface Window {
    haloDesktop?: HaloDesktopApi;
  }
}

export function isHaloDesktop(): boolean {
  return typeof window !== "undefined" && Boolean(window.haloDesktop?.isDesktop);
}

export function desktopView(): "widget" | "settings" {
  if (typeof window === "undefined") return "widget";
  return window.location.hash.includes("settings") ? "settings" : "widget";
}
