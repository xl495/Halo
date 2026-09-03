import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function TickTime({
  text,
  className,
  style,
  animate = true,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  animate?: boolean;
}) {
  if (!animate) {
    return (
      <span className={className} style={style}>
        {text}
      </span>
    );
  }

  return (
    <span
      className={cn("halo-tick-row", className)}
      style={style}
      aria-label={text}
    >
      {text.split("").map((ch, i) => (
        <TickGlyph key={`r${text.length - i}`} value={ch} />
      ))}
    </span>
  );
}

function TickGlyph({ value }: { value: string }) {
  const shown = useRef(value);
  const [current, setCurrent] = useState(value);
  const [outgoing, setOutgoing] = useState<string | null>(null);

  useEffect(() => {
    if (value === shown.current) return;
    const from = shown.current;
    shown.current = value;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || value === ":" || value === "+" || from === ":" || from === "+") {
      setOutgoing(null);
      setCurrent(value);
      return;
    }

    setOutgoing(from);
    setCurrent(value);
    const id = window.setTimeout(() => setOutgoing(null), 240);
    return () => window.clearTimeout(id);
  }, [value]);

  return (
    <span
      className={cn(
        "halo-tick",
        value === ":" && "is-colon",
        value === "+" && "is-plus",
      )}
      aria-hidden
    >
      {outgoing ? (
        <>
          <span className="halo-tick-out" aria-hidden>
            {outgoing}
          </span>
          <span className="halo-tick-in">{current}</span>
        </>
      ) : (
        <span className="halo-tick-now">{current}</span>
      )}
    </span>
  );
}
