"use client";

import { useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx } from "clsx";

const sinSuscripcion = () => () => {};

/**
 * Isla de cliente de `AntesDespues`. Recibe las dos fotos ya pintadas en el
 * servidor (`children`). Sin JavaScript, en fila. Con JavaScript disponible
 * (`@media (scripting: enabled)`), superpuestas ya en el HTML (sin salto de
 * maquetación al hidratar); al hidratar solo se añade el deslizador. Solo
 * guarda un número (la posición).
 */
export function DeslizadorAntesDespues({ children, className }: { children: ReactNode; className?: string }) {
  // false en el HTML del servidor y en la hidratación; true después: el deslizador solo aparece con JS.
  const activo = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const [posicion, setPosicion] = useState(50);

  return (
    <div
      data-activo={activo || undefined}
      // Las variables van desde el primer pintado: así la foto de antes ya sale recortada al 50 % sin esperar a hidratar.
      style={{ "--posicion": `${posicion}%`, "--recorte": `inset(0 ${100 - posicion}% 0 0)` } as CSSProperties}
      className={clsx(
        // Sin JS: dos columnas. Con JS disponible: una sola celda con las dos capas encima (AntesDespues las coloca).
        "group/ad relative grid grid-cols-2 gap-2 [@media(scripting:enabled)]:grid-cols-1 [@media(scripting:enabled)]:gap-0",
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
