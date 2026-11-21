import { cn } from "@/lib/utils";

/**
 * Borde ondulado (SVG en línea, < 1 KB) en `currentColor`: el color lo pone
 * quien lo usa (`text-fondo` bajo una foto, `text-tinta` sobre el CTA final).
 */
export function Onda({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1200 24"
      preserveAspectRatio="none"
      className={cn("block h-6 w-full", className)}
    >
      <path d="M0 24V12C150 0 300 0 450 12S750 24 900 12S1100 0 1200 10V24Z" fill="currentColor" />
    </svg>
  );
}
