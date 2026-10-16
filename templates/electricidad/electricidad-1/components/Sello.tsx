import { useId } from "react";

import { cn } from "@/lib/utils";

type Props = {
  /** Tamaño y color por clase: 72 px junto al h1 del hero móvil; 104 px en escritorio y /empresa. */
  className?: string;
  /** Solo /empresa: se «estampa» al entrar en pantalla (Specs §8). Nunca en el hero. */
  animar?: boolean;
};

/**
 * Sello de habilitación (Specs §7): borde doble en primario, texto curvo fijo y check.
 * Puramente decorativo (aria-hidden): el dato real va siempre en texto al lado. Solo se
 * pinta si hay `acreditaciones`; esa decisión es del llamador.
 */
export function Sello({ className, animar }: Props) {
  // Id único por instancia: el hero pinta dos sellos (móvil y escritorio) y un id repetido haría que
  // el texto curvo del oculto apuntara al arco de otro svg.
  const arco = useId();
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      data-anim={animar ? "sello" : undefined}
      data-umbral={animar ? "0.5" : undefined}
      className={cn("size-[72px] flex-none text-primario md:size-[104px]", className)}
    >
      <defs>
        <path id={arco} d="M50 50m-35 0a35 35 0 1 1 70 0a35 35 0 1 1-70 0" />
      </defs>
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="44.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" strokeWidth="1" />
      <text
        fill="currentColor"
        style={{ fontFamily: "var(--font-mono)", fontSize: "8.4px", fontWeight: 700, letterSpacing: "0.9px" }}
      >
        <textPath href={`#${arco}`}>EMPRESA INSTALADORA HABILITADA ·</textPath>
      </text>
      <path d="M39 50l7.5 7.5L62 42" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="square" />
    </svg>
  );
}
