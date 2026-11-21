import Link from "next/link";
import type { Ancla } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  enlaces: readonly Ancla[];
  /** `id` del panel; el botón que lo abre lleva `popoverTarget={id}`. Único por página. */
  id?: string;
  /** Texto del botón. */
  texto?: string;
  /** Pinta solo el panel (el botón lo pone otro, p. ej. la barra móvil combinada). */
  sinBoton?: boolean;
  className?: string;
  claseBoton?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx). Menú móvil con
 * la API `popover` nativa: abre y cierra sin JavaScript, cierra con Esc o al
 * tocar fuera, y el navegador gestiona el foco. Sustituye al `sheet` de shadcn.
 *
 * Tokens: --color-fondo, --color-texto, --color-borde, --color-foco,
 * --radius-boton, --radius-tarjeta.
 */
export function MenuPopover({ enlaces, id = "menu", texto = "Menú", sinBoton, className, claseBoton }: Props) {
  return (
    <>
      {!sinBoton && (
        <button
          type="button"
          popoverTarget={id}
          className={cn(
            "inline-flex min-h-11 items-center gap-2 rounded-boton px-3 font-semibold text-texto focus-visible:outline-2 focus-visible:outline-foco",
            claseBoton,
          )}
        >
          <span aria-hidden="true">☰</span>
          {texto}
        </button>
      )}
      <nav
        id={id}
        popover="auto"
        aria-label="Menú"
        className={cn(
          "m-0 ms-auto h-dvh w-[min(20rem,85vw)] border-s border-borde bg-fondo p-6 text-texto backdrop:bg-texto/40",
          className,
        )}
      >
        <div className="mb-6 flex justify-end">
          <button
            type="button"
            popoverTarget={id}
            popoverTargetAction="hide"
            className="min-h-11 rounded-boton px-3 font-semibold focus-visible:outline-2 focus-visible:outline-foco"
          >
            Cerrar
          </button>
        </div>
        <ul className="divide-y divide-borde">
          {enlaces.map((e) => (
            <li key={e.href}>
              <Link href={e.href} className="block py-3 text-lg font-semibold focus-visible:outline-2 focus-visible:outline-foco">
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
