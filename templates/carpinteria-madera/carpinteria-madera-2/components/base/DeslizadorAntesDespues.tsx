"use client";

import { useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx } from "clsx";

const sinSuscripcion = () => () => {};

/**
 * Isla de cliente de `AntesDespues`. Recibe las dos fotos ya pintadas en el servidor (`children`).
 * Sin JavaScript, en fila. Con JavaScript disponible, superpuestas ya en el HTML; al hidratar solo
 * se añaden la línea, el tirador miel y el `<input type="range">` (invisible, cubre la foto). Solo
 * guarda un número (la posición).
 */
export function DeslizadorAntesDespues({ children, className }: { children: ReactNode; className?: string }) {
  const activo = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const [posicion, setPosicion] = useState(50);

  return (
    <div
      data-activo={activo || undefined}
      style={{ "--posicion": `${posicion}%`, "--recorte": `inset(0 ${100 - posicion}% 0 0)` } as CSSProperties}
      className={clsx(
        "relative grid grid-cols-2 gap-2 rounded-foto [@media(scripting:enabled)]:grid-cols-1 [@media(scripting:enabled)]:gap-0",
        "has-[input:focus-visible]:outline-3 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-foco",
        className,
      )}
    >
      {children}
      {activo && (
        <>
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 z-[4] w-0.5 -translate-x-1/2 bg-superficie" style={{ left: "var(--posicion)" }} />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 z-[4] -translate-x-1/2 -translate-y-1/2 rounded-full bg-acento px-3.5 py-2 text-sm font-extrabold text-(--color-sobre-acento) shadow-[0_4px_12px_rgb(0_0_0/0.2)]"
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
            aria-label="Deslizar para comparar el hueco antes y después"
            aria-valuetext={`${posicion} % antes`}
            className="absolute inset-0 z-[5] m-0 size-full cursor-ew-resize opacity-0"
          />
        </>
      )}
    </div>
  );
}
