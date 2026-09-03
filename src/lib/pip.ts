import { createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { HaloWidget } from "@/components/widget/halo-widget";
import { useHalo } from "@/store/halo";

let pipRoot: Root | null = null;

export async function openHaloPip(size: number): Promise<boolean> {
  const dip = window.documentPictureInPicture;
  if (!dip) return false;
  const pip = await dip.requestWindow({
    width: Math.max(220, Math.round(size + 48)),
    height: Math.max(220, Math.round(size + 80)),
  });
  for (const node of document.querySelectorAll("style, link[rel='stylesheet']")) {
    pip.document.head.appendChild(node.cloneNode(true));
  }
  pip.document.body.style.margin = "0";
  pip.document.body.style.background = "transparent";
  pip.document.documentElement.style.background = "transparent";
  pip.document.body.style.display = "grid";
  pip.document.body.style.placeItems = "center";
  pip.document.body.style.minHeight = "100vh";
  pip.document.body.style.overflow = "hidden";
  const mount = pip.document.createElement("div");
  pip.document.body.appendChild(mount);
  pipRoot = createRoot(mount);
  pipRoot.render(createElement(HaloWidget, { embedded: true }));
  useHalo.getState().setPipActive(true);
  pip.addEventListener("pagehide", () => {
    pipRoot?.unmount();
    pipRoot = null;
    useHalo.getState().setPipActive(false);
  });
  return true;
}

declare global {
  interface Window {
    documentPictureInPicture?: {
      requestWindow: (opts: {
        width: number;
        height: number;
      }) => Promise<Window>;
    };
  }
}
