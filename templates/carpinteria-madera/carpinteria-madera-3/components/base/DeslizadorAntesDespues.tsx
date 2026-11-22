"use client";

import { useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx } from "clsx";

const sinSuscripcion = () => () => {};

/**
 * Isla de cliente de `AntesDespues` (pieza del registro, reestilada). Recibe las dos fotos ya pintadas
 * en el servidor (`children`). Sin JS, en fila. Con JS disponible, superpuestas ya en el HTML; al
 * hidratar se añaden la línea de cota en lápiz con su tirador «↔» y, debajo, el `<input type="range">`.
 * Solo guarda un número (la posición).
 */
export function DeslizadorAntesDespues({ children, className }: { children: ReactNode; className?: string }) {
  // false en el HTML del servidor y en la hidratación; true después: el deslizador solo aparece con JS.
  const activo = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const [posicion, setPosicion] = useState(50);

  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      <div
        data-activo={activo || undefined}
        // Las variables van desde el primer pintado: la foto de antes ya sale recortada al 50 % sin esperar a hidratar.
        style={{ "--posicion": `${posicion}%`, "--recorte": `inset(0 ${100 - posicion}% 0 0)` } as CSSProperties}
        className="relative grid grid-cols-2 gap-2 [@media(scripting:enabled)]:grid-cols-1 [@media(scripting:enabled)]:gap-0"
      >
        {children}
        {activo && (
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 z-[4] border-l border-lapiz" style={{ left: "var(--posicion)" }}>
            <span className="absolute top-1/2 -left-[15px] -mt-[15px] grid size-[30px] place-items-center border border-lapiz bg-fondo font-titulo text-[13px] text-lapiz">
              ↔
            </span>
          </span>
        )}
      </div>
      {activo && (
        <input
          type="range"
          min={0}
          max={100}
          value={posicion}
          onChange={(e) => setPosicion(Number(e.target.value))}
          aria-label="Deslizar entre antes y después"
          aria-valuetext={`${posicion} % antes`}
          className="m-0 h-11 w-full cursor-ew-resize accent-lapiz"
        />
      )}
    </div>
  );
}
