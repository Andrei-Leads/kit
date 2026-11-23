"use client";

import { useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx } from "clsx";

const sinSuscripcion = () => () => {};

/**
 * Isla de cliente de `AntesDespues` (versión sin salto de reformas-1, reestilada para «Galería»).
 * Recibe las dos fotos ya pintadas en el servidor. El `<input type="range">` cubre toda la foto
 * (transparente): se arrastra en cualquier punto, y con las flechas del teclado; el foco se ve en el
 * cuadrado del tirador. Arranca al 50 % y nunca se mueve solo. Solo guarda un número.
 */
export function DeslizadorAntesDespues({ children, etiqueta, className }: { children: ReactNode; etiqueta: string; className?: string }) {
  const activo = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const [posicion, setPosicion] = useState(50);

  return (
    <div
      data-activo={activo || undefined}
      style={{ "--posicion": `${posicion}%`, "--recorte": `inset(0 ${100 - posicion}% 0 0)` } as CSSProperties}
      className={clsx(
        "group/ad relative grid touch-pan-y grid-cols-2 gap-2 [@media(scripting:enabled)]:grid-cols-1 [@media(scripting:enabled)]:grid-rows-1 [@media(scripting:enabled)]:gap-0",
        className,
      )}
    >
      {children}
      {activo && (
        <>
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 z-[4] w-0.5 -translate-x-1/2 bg-texto" style={{ left: "var(--posicion)" }}>
            <span className="absolute top-1/2 left-1/2 size-7 -translate-1/2 border-2 border-texto bg-superficie group-has-[input:focus-visible]/ad:outline-3 group-has-[input:focus-visible]/ad:outline-offset-2 group-has-[input:focus-visible]/ad:outline-foco" />
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={posicion}
            onChange={(e) => setPosicion(Number(e.target.value))}
            aria-label={etiqueta}
            aria-valuetext={`${posicion} % antes`}
            className="absolute inset-0 z-[5] m-0 size-full cursor-ew-resize opacity-0 focus-visible:shadow-none focus-visible:outline-0"
          />
        </>
      )}
    </div>
  );
}
