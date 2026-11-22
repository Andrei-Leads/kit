"use client";

import { useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const sinSuscripcion = () => () => {};

/**
 * Isla de cliente de `AntesDespues` (registro, reestilada en «Oficio»): recibe las dos
 * fotos ya pintadas en el servidor. Hasta que hidrata, las deja en fila; después las
 * superpone con un tirador de 1 px y un círculo de 44 px. Solo guarda un número.
 */
export function DeslizadorAntesDespues({ children, className }: { children: ReactNode; className?: string }) {
  const activo = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const [posicion, setPosicion] = useState(50);

  return (
    <div
      data-activo={activo || undefined}
      style={activo ? ({ "--posicion": `${posicion}%`, "--recorte": `inset(0 ${100 - posicion}% 0 0)` } as CSSProperties) : undefined}
      className={cn("group/ad relative grid grid-cols-1 gap-2 sm:grid-cols-2 data-[activo]:grid-cols-1 data-[activo]:gap-0", className)}
    >
      {children}
      {activo && (
        <>
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 z-[4] w-px -translate-x-1/2 bg-fondo" style={{ left: "var(--posicion)" }}>
            <span className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-fondo bg-tinta/60 text-sm text-fondo">
              ↔
            </span>
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
