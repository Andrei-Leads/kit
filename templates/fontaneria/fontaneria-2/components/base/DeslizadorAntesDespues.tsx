"use client";

import { useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const sinSuscripcion = () => () => {};

/**
 * Isla de cliente de `AntesDespues`. Recibe las dos fotos ya pintadas en el
 * servidor (`children`). Hasta que hidrata, las deja en fila; después las
 * superpone y muestra el deslizador. Solo guarda un número (la posición).
 *
 * Reestilada en fontaneria-2: el range ocupa toda la foto (invisible, se arrastra en
 * cualquier punto) y el foco de teclado se dibuja alrededor de la pieza.
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
        "group/ad relative grid grid-cols-2 gap-2 rounded-tarjeta data-[activo]:grid-cols-1 data-[activo]:gap-0 has-[input:focus-visible]:outline-3 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-foco",
        className,
      )}
    >
      {children}
      {activo && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 z-[4] w-0.5 -translate-x-1/2 bg-fondo"
            style={{ left: "var(--posicion)" }}
          />
          {/* Tirador circular blanco de 48 px (fontaneria-2): solo decoración; el control es el range. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 z-[4] flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1.5 rounded-full bg-fondo shadow-tirador"
            style={{ left: "var(--posicion)" }}
          >
            <span className="h-0 w-0 border-y-[6px] border-r-[7px] border-y-transparent border-r-texto" />
            <span className="h-0 w-0 border-y-[6px] border-l-[7px] border-y-transparent border-l-texto" />
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={posicion}
            onChange={(e) => setPosicion(Number(e.target.value))}
            aria-label="Deslizar para comparar antes y después"
            aria-valuetext={`${posicion} % antes`}
            className="absolute inset-0 z-[5] m-0 size-full cursor-ew-resize touch-pan-y opacity-0"
          />
        </>
      )}
    </div>
  );
}
