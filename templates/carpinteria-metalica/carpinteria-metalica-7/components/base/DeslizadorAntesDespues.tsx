"use client";

import { useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx } from "clsx";

const sinSuscripcion = () => () => {};

/**
 * Isla de cliente de `AntesDespues` (registro, reestilada). Recibe las dos fotos ya pintadas en el
 * servidor. Sin JavaScript, en fila; con JavaScript disponible, superpuestas ya en el HTML y, al
 * hidratar, el tirador (barra de hierro de 10 px con filetes de acento) y un `<input type="range">`
 * nativo (teclado y lector de pantalla). Solo guarda la posición.
 */
export function DeslizadorAntesDespues({ children, className }: { children: ReactNode; className?: string }) {
  const activo = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const [posicion, setPosicion] = useState(50);

  return (
    <div
      data-activo={activo || undefined}
      style={{ "--posicion": `${posicion}%`, "--recorte": `inset(0 ${100 - posicion}% 0 0)` } as CSSProperties}
      className={clsx(
        "relative grid grid-cols-2 gap-2 [@media(scripting:enabled)]:grid-cols-1 [@media(scripting:enabled)]:gap-0",
        className,
      )}
    >
      {children}
      {activo && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 z-[4] w-2.5 -translate-x-1/2 border-x border-acento bg-superficie"
            style={{ left: "var(--posicion)" }}
          >
            <span className="absolute top-1/2 left-1/2 grid h-14 w-[30px] -translate-x-1/2 -translate-y-1/2 place-items-center border-2 border-acento bg-superficie">
              <span className="block h-6 w-0.5 bg-acento shadow-[-6px_0_0_var(--color-acento),6px_0_0_var(--color-acento)]" />
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
            className="absolute inset-x-3 bottom-10 z-[5] h-8 cursor-ew-resize accent-acento focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-acento"
          />
        </>
      )}
    </div>
  );
}
