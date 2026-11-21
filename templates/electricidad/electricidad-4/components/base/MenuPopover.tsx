import type { Ancla } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  enlaces: readonly (Ancla & { actual?: boolean })[];
  /** `id` del panel; el botón que lo abre lleva `popoverTarget={id}`. Único por página. */
  id?: string;
  className?: string;
  claseBoton?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx), reestilada para «Cuadro» (encargo
 * §8): panel recto que baja de la cabecera en móvil. API `popover` nativa: abre y cierra sin
 * JavaScript, con Esc o al tocar fuera. Los enlaces son `<a>` normales (no `next/link`): la
 * cabecera vive en cada página y, con navegación de cliente, el panel se quedaría abierto; así se
 * cierra solo al cambiar de página sin añadir una isla de cliente.
 */
export function MenuPopover({ enlaces, id = "menu", className, claseBoton }: Props) {
  return (
    <>
      <button
        type="button"
        popoverTarget={id}
        className={cn(
          "min-h-11 min-w-11 flex-none rounded-boton border border-borde bg-superficie px-3 text-base font-medium text-texto",
          claseBoton,
        )}
      >
        Menú
      </button>
      <nav
        id={id}
        popover="auto"
        aria-label="Menú"
        className={cn("menu-panel m-0 border-y border-carril bg-superficie p-0 text-texto backdrop:bg-texto/30", className)}
      >
        <ul>
          {enlaces.map((e) => (
            <li key={e.href}>
              <a
                href={e.href}
                aria-current={e.actual ? "page" : undefined}
                className="contenedor flex min-h-[52px] items-center justify-between border-b border-carril text-lg font-medium no-underline focus-visible:-outline-offset-2 aria-[current=page]:font-semibold aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-4"
              >
                <span className="flex items-center gap-2.5">
                  {e.actual && <span aria-hidden="true" className="size-2.5 bg-texto" />}
                  {e.texto}
                </span>
                <span aria-hidden="true" className="text-texto-suave">
                  ›
                </span>
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              popoverTarget={id}
              popoverTargetAction="hide"
              className="contenedor flex min-h-[52px] w-full items-center text-base font-medium text-texto-suave focus-visible:-outline-offset-2"
            >
              Cerrar
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
