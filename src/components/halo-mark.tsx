import { cn } from "@/lib/utils";

export function HaloMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("text-primary", className)}
      aria-hidden
    >
      <circle
        cx="16"
        cy="16"
        r="11"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="50 20"
        transform="rotate(-90 16 16)"
      />
      <circle cx="16" cy="16" r="3.4" fill="currentColor" />
    </svg>
  );
}
