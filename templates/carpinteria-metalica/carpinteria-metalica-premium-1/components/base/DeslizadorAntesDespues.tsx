"use client";

import { useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";


const sinSuscripcion = () => () => {};

/**
 * Isla de cliente de `AntesDespues` (kit/registry/base). Recibe las dos fotos ya
 * pintadas en el servidor. Hasta que hidrata, las deja en fila; después las superpone:
 * el `<input type="range">` cubre la foto (transparente) y el tirador es un filete de
 * 1 px con una píldora de 44 px. Solo guarda un número.
 */
export function DeslizadorAntesDespues({ children, className }: { children: ReactNode; className?: string }) {
  const activo = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const [posicion, setPosicion] = useState(50);

  return (
    <div
      data-activo={activo || undefined}
      style={activo ? ({ "--posicion": `${posicion}%`, "--recorte": `inset(0 ${100 - posicion}% 0 0)` } as CSSProperties) : undefined}
      className={["group/ad relative grid grid-cols-2 gap-2 data-[activo]:grid-cols-1 data-[activo]:gap-0", className].filter(Boolean).join(" ")}
    >
      {children}
      {activo && (
        <>
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 z-[4] w-px -translate-x-1/2 bg-superficie" style={{ left: "var(--posicion)" }} />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 z-[4] grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-superficie text-sm text-texto group-has-[input:focus-visible]/ad:outline-3 group-has-[input:focus-visible]/ad:outline-offset-2 group-has-[input:focus-visible]/ad:outline-foco"
            style={{ left: "var(--posicion)" }}
          >
            ⇆
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={posicion}
            onChange={(e) => setPosicion(Number(e.target.value))}
            aria-label="Deslizar para comparar antes y después"
            aria-valuetext={`${posicion} % antes`}
            className="absolute inset-0 z-[5] m-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </>
      )}
    </div>
  );
}
