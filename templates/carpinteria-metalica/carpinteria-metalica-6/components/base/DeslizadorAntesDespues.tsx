"use client";

import { useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx } from "clsx";

const sinSuscripcion = () => () => {};

/**
 * Isla de cliente de `AntesDespues` (versión sin salto de electricidad-5, reestilada en «Fachada
 * nueva»). Recibe las dos fotos ya pintadas en el servidor. El `<input type="range">` cubre toda la
 * foto (transparente): se arrastra en cualquier punto con el dedo o el ratón, y con las flechas del
 * teclado; el foco se ve en el tirador circular de 44 px. Nunca se mueve solo (encargo §12).
 */
export function DeslizadorAntesDespues({ children, etiqueta, className }: { children: ReactNode; etiqueta: string; className?: string }) {
  const activo = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const [posicion, setPosicion] = useState(50);

  return (
    <div
      data-activo={activo || undefined}
      style={{ "--posicion": `${posicion}%`, "--recorte": `inset(0 ${100 - posicion}% 0 0)` } as CSSProperties}
      className={clsx(
        "deslizador group/ad relative grid touch-pan-y grid-cols-2 gap-2 [@media(scripting:enabled)]:grid-cols-1 [@media(scripting:enabled)]:gap-0",
        className,
      )}
    >
      {children}
      {activo && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 z-[4] w-0.5 -translate-x-1/2 bg-white"
            style={{ left: "var(--posicion)" }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 z-[4] -translate-1/2"
            style={{ left: "var(--posicion)" }}
          >
            <span className="tirador grid size-11 place-items-center rounded-full bg-white text-texto shadow-[0_2px_8px_rgb(0_0_0/0.25)] group-has-[input:focus-visible]/ad:outline-3 group-has-[input:focus-visible]/ad:outline-offset-2 group-has-[input:focus-visible]/ad:outline-foco">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
              </svg>
            </span>
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={posicion}
            onChange={(e) => setPosicion(Number(e.target.value))}
            aria-label={etiqueta}
            aria-valuetext={`${posicion} % antes`}
            className="absolute inset-0 z-[5] m-0 size-full cursor-ew-resize opacity-0"
          />
        </>
      )}
    </div>
  );
}
