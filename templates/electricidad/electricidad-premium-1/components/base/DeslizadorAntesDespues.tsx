"use client";

import { useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const sinSuscripcion = () => () => {};

/**
 * Isla de cliente de `AntesDespues` (≈ 1,5 KB). Recibe las dos fotos ya
 * pintadas en el servidor (`children`). Hasta que hidrata, las deja en fila;
 * después las superpone con el tirador de 1 px en señal y su círculo de 44 px.
 * El `<input type="range">` cubre toda la foto (se arrastra desde cualquier
 * punto) y da teclado y lector de pantalla. Solo guarda un número.
 */
export function DeslizadorAntesDespues({ children, className }: { children: ReactNode; className?: string }) {
  // false en el HTML del servidor y en la hidratación; true después: sin JS, las fotos se quedan en fila.
  const activo = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const [posicion, setPosicion] = useState(50);

  return (
    <div
      data-activo={activo || undefined}
      style={
        activo
          ? ({ "--posicion": `${posicion}%`, "--recorte": `inset(0 ${100 - posicion}% 0 0)` } as CSSProperties)
          : undefined
      }
      className={cn("group/ad relative grid grid-cols-2 gap-2 data-[activo]:grid-cols-1 data-[activo]:gap-0", className)}
    >
      {children}
      {activo && (
        <>
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 z-[4] w-px -translate-x-1/2 bg-acento" style={{ left: "var(--posicion)" }} />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 z-[4] grid size-11 -translate-x-1/2 place-items-center rounded-full border border-acento bg-[var(--color-velo)] text-sm text-acento backdrop-blur-[6px] group-has-[input:focus-visible]/ad:outline-2 group-has-[input:focus-visible]/ad:outline-offset-3 group-has-[input:focus-visible]/ad:outline-foco"
            style={{ left: "var(--posicion)" }}
          >
            ‹›
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={posicion}
            onChange={(e) => setPosicion(Number(e.target.value))}
            aria-label="Deslizar para comparar antes y después"
            aria-valuetext={`${posicion} % antes`}
            className="absolute inset-0 z-[5] h-full w-full cursor-ew-resize opacity-0"
          />
        </>
      )}
    </div>
  );
}
