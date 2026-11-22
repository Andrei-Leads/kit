"use client";

import { useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx } from "clsx";

const sinSuscripcion = () => () => {};

/**
 * Isla de `AntesDespues` (≈ 1,5 KB). Recibe las dos fotos ya pintadas en el
 * servidor. El `<input type="range">` cubre toda la foto (transparente): se
 * arrastra en cualquier punto y con las flechas; el foco se ve en la píldora.
 */
export function DeslizadorAntesDespues({ children, etiqueta, className }: { children: ReactNode; etiqueta: string; className?: string }) {
  const activo = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const [posicion, setPosicion] = useState(50);

  return (
    <div
      style={{ "--posicion": `${posicion}%`, "--recorte": `inset(0 ${100 - posicion}% 0 0)` } as CSSProperties}
      className={clsx(
        "group/ad relative grid touch-pan-y grid-cols-2 gap-3 [@media(scripting:enabled)]:grid-cols-1 [@media(scripting:enabled)]:gap-0",
        className,
      )}
    >
      {children}
      {activo && (
        <>
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 z-[4] w-px bg-white" style={{ left: "var(--posicion)" }} />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 z-[4] grid h-10 w-16 -translate-1/2 place-items-center rounded-full bg-white text-sm text-tinta group-has-[input:focus-visible]/ad:outline-2 group-has-[input:focus-visible]/ad:outline-offset-3 group-has-[input:focus-visible]/ad:outline-tinta"
            style={{ left: "var(--posicion)" }}
          >
            ‹ ›
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={posicion}
            onChange={(e) => setPosicion(Number(e.target.value))}
            aria-label={etiqueta}
            aria-valuetext={`Se ve un ${posicion} % del antes`}
            className="absolute inset-0 z-[5] m-0 size-full cursor-ew-resize opacity-0"
          />
        </>
      )}
    </div>
  );
}
