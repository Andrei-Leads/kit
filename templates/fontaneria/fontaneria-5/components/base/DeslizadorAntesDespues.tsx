"use client";

import { useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const sinSuscripcion = () => () => {};

/**
 * Isla de cliente de `AntesDespues`. Recibe las dos fotos ya pintadas en el servidor (`children`),
 * superpuestas. El tirador (línea y caja «‹ ›») se pinta siempre, también sin JS, en el 50 %. Al
 * hidratar se añade un `<input type="range">` transparente sobre toda la foto (teclado y lector de
 * pantalla gratis; `touch-action: pan-y` deja hacer scroll vertical en el móvil). El foco se ve en la
 * caja del tirador. Solo guarda un número (la posición).
 */
export function DeslizadorAntesDespues({ children, className }: { children: ReactNode; className?: string }) {
  // false en el HTML del servidor y en la hidratación; true después.
  const activo = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const [posicion, setPosicion] = useState(50);

  return (
    <div style={{ "--posicion": `${posicion}%` } as CSSProperties} className={cn("group/ad", className)}>
      {children}
      {activo && (
        <input
          type="range"
          min={0}
          max={100}
          value={posicion}
          onChange={(e) => setPosicion(Number(e.target.value))}
          aria-label="Deslizar para comparar antes y después"
          aria-valuetext={`${posicion} % antes`}
          className="peer absolute inset-0 z-[5] m-0 size-full cursor-ew-resize touch-pan-y appearance-none opacity-0"
        />
      )}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 z-[4] w-1 -translate-x-1/2 bg-tinta"
        style={{ left: "var(--posicion)" }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 z-[4] grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center bg-tinta font-titulo text-lg font-bold text-sobre-tinta peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-foco peer-focus-visible:shadow-[0_0_0_2px_#fff]"
        style={{ left: "var(--posicion)" }}
      >
        ‹ ›
      </span>
    </div>
  );
}
