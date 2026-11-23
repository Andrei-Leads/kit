"use client";

import { useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx } from "clsx";

const sinSuscripcion = () => () => {};

/**
 * Isla de cliente de `AntesDespues` (registro), en «Perfil»: el tirador es un filete
 * anodizado de 1 px con un cuadro de 36 px; el `<input type="range">` nativo cubre la foto
 * (transparente) y su foco se ve en el cuadro. Sin JavaScript, las fotos van en fila. Solo
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
        "relative grid grid-cols-1 gap-2 sm:grid-cols-2 [@media(scripting:enabled)]:grid-cols-1 [@media(scripting:enabled)]:gap-0",
        className,
      )}
    >
      {children}
      {activo && (
        <>
          <input
            type="range"
            min={0}
            max={100}
            value={posicion}
            onChange={(e) => setPosicion(Number(e.target.value))}
            aria-label="Comparar antes y después"
            aria-valuetext={`${posicion} % antes`}
            className="peer absolute inset-0 z-[5] m-0 size-full cursor-ew-resize opacity-0"
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 z-[4] w-px bg-anodizado peer-focus-visible:[&>span]:outline-2 peer-focus-visible:[&>span]:outline-offset-2 peer-focus-visible:[&>span]:outline-foco peer-focus-visible:[&>span]:outline-solid" style={{ left: "var(--posicion)" }}>
            <span className="absolute top-1/2 -left-[18px] -mt-[18px] flex size-9 items-center justify-center gap-1.5 border border-anodizado bg-fondo">
              <span className="h-3 w-px bg-anodizado" />
              <span className="h-3 w-px bg-anodizado" />
            </span>
          </div>
        </>
      )}
    </div>
  );
}
