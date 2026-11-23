"use client";

import { useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx } from "clsx";

const sinSuscripcion = () => () => {};

/**
 * Isla de cliente de `AntesDespues` (pieza del registro, reestilada). Recibe las dos fotos ya
 * pintadas en el servidor (`children`). Sin JS, en fila. Con JS disponible, superpuestas ya en el
 * HTML; al hidratar se añaden el tirador (una cota vertical de 2 px con topes a 45°) y un
 * `<input type="range">` nativo que cubre la foto (se arrastra en cualquier punto; teclado con las
 * flechas). Como el control es invisible, el foco se dibuja en el marco con `:has()`.
 */
export function DeslizadorAntesDespues({ children, className }: { children: ReactNode; className?: string }) {
  // false en el HTML del servidor y en la hidratación; true después: el deslizador solo aparece con JS.
  const activo = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const [posicion, setPosicion] = useState(50);

  return (
    <div
      data-activo={activo || undefined}
      style={{ "--posicion": `${posicion}%`, "--recorte": `inset(0 ${100 - posicion}% 0 0)` } as CSSProperties}
      className={clsx(
        "relative grid grid-cols-2 gap-2 outline-offset-4 has-[input:focus-visible]:outline-3 has-[input:focus-visible]:outline-foco [@media(scripting:enabled)]:grid-cols-1 [@media(scripting:enabled)]:gap-0",
        className,
      )}
    >
      {children}
      {activo && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 z-[4] flex w-[13px] -translate-x-1/2 flex-col items-center"
            style={{ left: "var(--posicion)" }}
          >
            <span className="mt-2.5 h-px w-[13px] rotate-45 bg-texto" />
            <span className="w-0.5 flex-1 bg-texto" />
            <span className="mb-2.5 h-px w-[13px] rotate-45 bg-texto" />
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
