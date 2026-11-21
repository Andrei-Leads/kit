import Link from "next/link";
import type { Ancla } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  enlaces: readonly Ancla[];
  /** `id` del panel; el botón que lo abre lleva `popoverTarget={id}`. Único por página. */
  id?: string;
  className?: string;
  claseBoton?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx), reestilada en electricidad-7: el
 * panel (radio de 24 px) cae bajo la cápsula. API `popover` nativa: abre y cierra sin JavaScript,
 * con Esc o al tocar fuera. El mismo botón lo abre y lo cierra; su texto cambia a «Cerrar» con CSS
 * (`:has(#menu:popover-open)` en globals.css). El panel no tapa la página, así que no hace falta
 * cerrarlo al salir el foco.
 */
export function MenuPopover({ enlaces, id = "menu", className, claseBoton }: Props) {
  return (
    <>
      <button
        type="button"
        popoverTarget={id}
        className={cn(
          "pulsable inline-flex min-h-11 flex-none items-center rounded-boton bg-alterna px-[15px] text-sm font-extrabold text-texto",
          claseBoton,
        )}
      >
        <span className="texto-menu">Menú</span>
        <span className="texto-cerrar">Cerrar</span>
      </button>
      <nav
        id={id}
        popover="auto"
        aria-label="Menú"
        className={cn(
          "panel-menu fixed inset-x-3 top-[4.75rem] bottom-auto m-0 h-auto w-auto rounded-tarjeta border border-linea bg-superficie p-2 text-texto opacity-0 shadow-panel",
          className,
        )}
      >
        <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
          {enlaces.map((e) => (
            <li key={e.href}>
              <Link href={e.href} className="flex min-h-12 items-center rounded-2xl px-4 text-lg font-extrabold no-underline hover:bg-fondo">
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
