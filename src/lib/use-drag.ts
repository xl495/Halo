import { useRef, type PointerEvent } from "react";

export function useDrag(
  pos: { x: number; y: number },
  setPos: (x: number, y: number) => void,
) {
  const dragging = useRef(false);
  const origin = useRef({ px: 0, py: 0, x: 0, y: 0 });

  return {
    onPointerDown: (e: PointerEvent<HTMLElement>) => {
      if ((e.target as HTMLElement).closest("[data-no-drag]")) return;
      dragging.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      origin.current = {
        px: e.clientX,
        py: e.clientY,
        x: pos.x,
        y: pos.y,
      };
    },
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      if (!dragging.current) return;
      const parent = e.currentTarget.offsetParent as HTMLElement | null;
      const w = parent?.clientWidth ?? window.innerWidth;
      const h = parent?.clientHeight ?? window.innerHeight;
      const dx = (e.clientX - origin.current.px) / w;
      const dy = (e.clientY - origin.current.py) / h;
      setPos(
        Math.min(0.9, Math.max(0.01, origin.current.x + dx)),
        Math.min(0.82, Math.max(0.04, origin.current.y + dy)),
      );
    },
    onPointerUp: () => {
      dragging.current = false;
    },
  };
}
