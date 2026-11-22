import { cn } from "@/lib/utils";

const CURVAS = [
  "M0 90 C 220 60, 380 140, 600 110 S 980 70, 1200 120",
  "M0 190 C 260 170, 420 240, 640 205 S 1000 160, 1200 215",
  "M0 300 C 180 280, 400 350, 620 310 S 960 270, 1200 330",
  "M0 395 C 240 380, 470 445, 700 400 S 1020 370, 1200 420",
  "M0 480 C 200 470, 430 520, 650 488 S 980 450, 1200 505",
  "M0 575 C 260 560, 440 625, 660 590 S 1010 550, 1200 600",
  "M0 670 C 220 650, 420 720, 640 680 S 990 640, 1200 690",
  "M0 755 C 240 745, 460 790, 700 760 S 1000 730, 1200 770",
];

/**
 * Textura de veta (encargo §5.6): SVG en línea de menos de 1 KB, 8 curvas de 1 px
 * en --color-veta, decorativo. Sustituye a cualquier foto que falte sobre tinta.
 * Nunca PNG ni feTurbulence.
 */
export function Veta({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 1200 800" preserveAspectRatio="none" className={cn("veta", className)}>
      <g fill="none" strokeWidth={1}>
        {CURVAS.map((d) => (
          <path key={d} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  );
}
