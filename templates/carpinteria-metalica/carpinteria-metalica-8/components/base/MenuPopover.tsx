import Link from "next/link";
import type { ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  enlaces: readonly Ancla[];
  /** `id` del panel; el botón que lo abre lleva `popoverTarget={id}`. Único por página. */
  id?: string;
  /** Contenido del botón (por defecto «Menú»). */
  texto?: ReactNode;
  /** Bajo los enlaces (p. ej. la pareja de CTAs). */
  pie?: ReactNode;
  className?: string;
  claseBoton?: string;
};

/**
 * Pieza base del registro, reestilada (encargo §8): hoja inferior redondeada sobre `superficie`,
 * con enlaces grandes en Jost y «Cerrar» a todo el ancho. API `popover` nativa: abre y cierra sin
 * JavaScript, con Esc o al tocar fuera. Animación (240 ms) en globals.css (`.menu-hoja`).
 */
export function MenuPopover({ enlaces, id = "menu", texto = "Menú", pie, className, claseBoton }: Props) {
  return (
    <>
      <button
        type="button"
        popoverTarget={id}
        className={cn(
          "inline-flex min-h-11 min-w-11 items-center justify-center rounded-[22px_18px_24px_18px] bg-alterna px-3.5 font-titulo text-base font-medium text-texto",
          claseBoton,
        )}
      >
        {texto}
      </button>
      <div
        id={id}
        popover="auto"
        role="dialog"
        aria-label="Menú"
        className={cn("menu-hoja rounded-t-[32px] bg-superficie px-6 pt-3.5 pb-[calc(28px+env(safe-area-inset-bottom))] text-texto", className)}
      >
        <div aria-hidden="true" className="mx-auto mb-3 h-[5px] w-11 rounded-full bg-borde" />
        <nav aria-label="Principal">
          <ul>
            {[{ href: "/", texto: "Inicio" }, ...enlaces].map((e) => (
              <li key={e.href} className="border-b-[1.5px] border-dashed border-borde">
                <Link href={e.href} className="flex min-h-14 items-center font-titulo text-[28px] leading-tight font-medium no-underline">
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {pie && <div className="mt-5">{pie}</div>}
        <button
          type="button"
          popoverTarget={id}
          popoverTargetAction="hide"
          className="boton boton-tierra mt-4 w-full"
        >
          Cerrar
        </button>
      </div>
    </>
  );
}
