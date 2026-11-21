"use client";

import { useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx } from "clsx";

const sinSuscripcion = () => () => {};

/**
 * Isla de cliente de `AntesDespues` (solución de electricidad-7, reestilada). Recibe las dos fotos ya
 * pintadas en el servidor (`children`). El diseño superpuesto lo pone el CSS (`scripting: enabled`),
 * así que hidratar no mueve nada. El `<input type="range">` cubre toda la foto (transparente): se
 * arrastra en cualquier punto y con las flechas; el foco se ve en el tirador (placa primario de 44 px).
 */
export function DeslizadorAntesDespues({ children, className }: { children: ReactNode; className?: string }) {
  const activo = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const [posicion, setPosicion] = useState(50);

  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      <div
        data-activo={activo || undefined}
        style={{ "--posicion": `${posicion}%`, "--recorte": `inset(0 ${100 - posicion}% 0 0)` } as CSSProperties}
        className="group/ad relative grid grid-cols-2 gap-2 [@media(scripting:enabled)]:grid-cols-1 [@media(scripting:enabled)]:gap-0"
      >
        {children}
        {activo && (
          <>
            <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 z-[4] w-[3px] -translate-x-1/2 bg-primario" style={{ left: "var(--posicion)" }} />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 z-[4] grid size-11 -translate-1/2 place-items-center bg-primario text-lg font-black text-sobre-primario group-has-[input:focus-visible]/ad:outline-3 group-has-[input:focus-visible]/ad:outline-offset-2 group-has-[input:focus-visible]/ad:outline-foco"
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
              aria-label="Deslizar para comparar antes y después"
              aria-valuetext={`${posicion} % antes`}
              className="absolute inset-0 z-[5] m-0 size-full cursor-ew-resize opacity-0"
            />
          </>
        )}
      </div>
      {/* Por CSS y no por estado: sin salto al hidratar; sin JS no sale. */}
      <p className="m-0 hidden text-sm text-texto-suave [@media(scripting:enabled)]:block">Desliza para comparar.</p>
    </div>
  );
}
