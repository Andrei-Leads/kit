"use client";

import { useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

// clsx y no cn(): cn arrastra tailwind-merge (~9 KB gzip) al navegador.
import { clsx } from "clsx";

const sinSuscripcion = () => () => {};

/**
 * Isla de cliente de `AntesDespues` (versión sin salto de electricidad-5, reestilada). Recibe las
 * dos fotos ya pintadas en el servidor. El `<input type="range">` cubre toda la foto (transparente):
 * se arrastra en cualquier punto con el dedo o el ratón, y con las flechas del teclado; el foco
 * se ve en el asa cuadrada de 44 px. Nunca se mueve solo.
 */
export function DeslizadorAntesDespues({
  children,
  etiqueta,
  pista,
  className,
}: {
  children: ReactNode;
  etiqueta: string;
  pista?: boolean;
  className?: string;
}) {
  const activo = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const [posicion, setPosicion] = useState(50);

  return (
    <div
      data-activo={activo || undefined}
      style={{ "--posicion": `${posicion}%`, "--recorte": `inset(0 ${100 - posicion}% 0 0)` } as CSSProperties}
      className={clsx(
        "group/ad relative grid touch-pan-y grid-cols-2 gap-2 [@media(scripting:enabled)]:grid-cols-1 [@media(scripting:enabled)]:gap-0",
        className,
      )}
    >
      {children}
      {activo && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 z-[4] w-(--tirador) -translate-x-1/2 bg-superficie"
            style={{ left: "var(--posicion)" }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 z-[4] grid size-11 -translate-1/2 place-items-center border border-texto bg-superficie text-texto group-has-[input:focus-visible]/ad:outline-2 group-has-[input:focus-visible]/ad:outline-offset-3 group-has-[input:focus-visible]/ad:outline-foco"
            style={{ left: "var(--posicion)" }}
          >
            <svg
              width="30"
              height="20"
              viewBox="0 0 30 20"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.4}
              strokeLinecap="square"
              className={clsx(pista && "asa-pista")}
            >
              <path d="M9 4L3 10l6 6M21 4l6 6-6 6" />
            </svg>
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={posicion}
            onChange={(e) => setPosicion(Number(e.target.value))}
            aria-label={etiqueta}
            aria-valuetext={`${posicion} % antes`}
            className="absolute inset-0 z-[5] m-0 size-full cursor-ew-resize opacity-0"
          />
        </>
      )}
    </div>
  );
}
