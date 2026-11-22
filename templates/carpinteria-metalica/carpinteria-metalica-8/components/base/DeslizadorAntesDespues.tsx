"use client";

import { useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx } from "clsx";

const sinSuscripcion = () => () => {};

/**
 * Isla de cliente de `AntesDespues` (reestilada: tirador en guijarro). Recibe las dos fotos ya
 * pintadas en el servidor (`children`). Sin JavaScript, en fila. Con JavaScript disponible,
 * superpuestas ya en el HTML; al hidratar solo se añaden la línea, el tirador y el
 * `<input type="range">` invisible a toda la superficie (teclado y lector de pantalla nativos; el
 * foco se ve en el contenedor, `.comparador:has(input:focus-visible)`). Solo guarda la posición.
 */
export function DeslizadorAntesDespues({ children, className }: { children: ReactNode; className?: string }) {
  const activo = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const [posicion, setPosicion] = useState(50);

  return (
    <div
      data-activo={activo || undefined}
      style={{ "--posicion": `${posicion}%`, "--recorte": `inset(0 ${100 - posicion}% 0 0)` } as CSSProperties}
      className={clsx(
        "comparador relative grid grid-cols-2 gap-2 rounded-foto [@media(scripting:enabled)]:grid-cols-1 [@media(scripting:enabled)]:gap-0 [@media(scripting:enabled)]:overflow-hidden [@media(scripting:enabled)]:touch-pan-y",
        className,
      )}
    >
      {children}
      {activo && (
        <>
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 z-[4] w-[3px] -translate-x-1/2 bg-superficie" style={{ left: "var(--posicion)" }} />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 z-[4] flex h-[50px] w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-guijarro-2 bg-superficie font-titulo text-lg shadow-suave"
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
            aria-label="Comparar antes y después"
            aria-valuetext={`${posicion} % antes`}
            className="absolute inset-0 z-[5] m-0 size-full cursor-ew-resize opacity-0"
          />
        </>
      )}
    </div>
  );
}
