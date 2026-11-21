"use client";

import { useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx } from "clsx";

const sinSuscripcion = () => () => {};

/**
 * Isla de cliente de `AntesDespues`. Recibe las dos fotos ya pintadas en el servidor
 * (`children`). Hasta que hidrata, las deja en fila; después las superpone y muestra el tirador
 * circular de 44 px. El `<input type="range">` cubre toda la foto (transparente): se arrastra en
 * cualquier punto y con las flechas del teclado; el foco se ve en el tirador.
 */
export function DeslizadorAntesDespues({ children, className }: { children: ReactNode; className?: string }) {
  const activo = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const [posicion, setPosicion] = useState(50);

  return (
    <div
      data-activo={activo || undefined}
      style={{ "--posicion": `${posicion}%`, "--recorte": `inset(0 ${100 - posicion}% 0 0)` } as CSSProperties}
      className={clsx(
        "group/ad relative grid grid-cols-2 gap-2 [@media(scripting:enabled)]:grid-cols-1 [@media(scripting:enabled)]:gap-0",
        className,
      )}
    >
      {children}
      {activo && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 z-[4] w-[3px] -translate-x-1/2 bg-superficie"
            style={{ left: "var(--posicion)" }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 z-[4] grid size-11 -translate-1/2 place-items-center rounded-full bg-superficie text-[15px] font-black text-texto shadow-[0_4px_14px_rgb(42_36_32/0.3)] group-has-[input:focus-visible]/ad:outline-2 group-has-[input:focus-visible]/ad:outline-offset-2 group-has-[input:focus-visible]/ad:outline-foco"
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
  );
}
