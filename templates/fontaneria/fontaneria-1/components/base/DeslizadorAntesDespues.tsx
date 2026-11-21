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
            className="pointer-events-none absolute inset-y-0 z-[4] w-[3px] -translate-x-1/2 bg-primario"
            style={{ left: "var(--posicion)" }}
          />
          <input
            type="range"
            min={0}
            max={100}
            value={posicion}
            onChange={(e) => setPosicion(Number(e.target.value))}
            aria-label="Deslizar para comparar antes y después"
            aria-valuetext={`${posicion} % antes`}
            className="absolute inset-x-3 bottom-3 z-[5] h-6 cursor-ew-resize accent-primario focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foco"
          />
        </>
      )}
    </div>
  );
}
