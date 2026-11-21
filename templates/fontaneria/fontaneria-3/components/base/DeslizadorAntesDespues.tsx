"use client";

import { useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const sinSuscripcion = () => () => {};

/**
 * Isla de cliente de `AntesDespues`. Recibe las dos fotos ya pintadas en el
 * servidor (`children`). Hasta que hidrata, las deja en fila; después las
 * superpone y muestra el deslizador. Solo guarda un número (la posición).
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
      className={cn(
        // Sin JS: dos columnas. Con JS: una sola celda con las dos capas encima (AntesDespues las coloca).
        "group/ad relative grid grid-cols-2 gap-2 data-[activo]:grid-cols-1 data-[activo]:gap-0",
        className,
      )}
    >
      {children}
      {activo && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 z-[4] w-[3px] -translate-x-1/2 bg-fondo"
            style={{ left: "var(--posicion)" }}
          />
          {/* Tirador circular arena de 52 px (solo dibujo: el control es el range). */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 z-[4] grid size-[52px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-texto bg-fondo text-lg font-extrabold tracking-[0.1em] text-texto"
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
            className="peer absolute inset-0 z-[5] m-0 size-full cursor-ew-resize opacity-0"
          />
          {/* El range es invisible: el foco se ve en todo el comparador. */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-[6] rounded-tarjeta peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-foco" />
        </>
      )}
    </div>
  );
}
