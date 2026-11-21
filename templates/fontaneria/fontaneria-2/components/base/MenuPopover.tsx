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
 * Reestilada en fontaneria-2 (encargo §8): panel desplegable bajo la cabecera
 * de 60 px, a todo el ancho, con filas de 56 px; botón «Menú» en píldora gris.
 *
 * Tokens: --color-fondo, --color-superficie, --color-texto, --color-borde,
 * --color-primario, --color-foco, --radius-boton.
 */
export function MenuPopover({ enlaces, id = "menu", texto = "Menú", sinBoton, className, claseBoton }: Props) {
  return (
    <>
      {!sinBoton && (
        <button
          type="button"
          popoverTarget={id}
          className={cn(
            "foco inline-flex min-h-12 items-center rounded-boton border border-borde bg-superficie px-4 text-base font-semibold text-texto",
            claseBoton,
          )}
        >
          {texto}
        </button>
      )}
      <nav
        id={id}
        popover="auto"
        aria-label="Menú"
        className={cn(
          "inset-x-0 top-15 bottom-auto m-0 h-auto max-h-[calc(100dvh-3.75rem)] w-full max-w-none overflow-y-auto border-0 border-b border-borde bg-fondo px-5 pt-2 pb-5 text-texto shadow-[0_24px_40px_-24px_rgb(0_0_0/0.25)] backdrop:bg-texto/20",
          className,
        )}
      >
        <ul className="m-0 list-none p-0">
          {enlaces.map((e) => (
            <li key={e.href} className="border-b border-borde">
              <Link
                href={e.href}
                className="foco flex min-h-14 items-center justify-between text-lg font-semibold no-underline"
              >
                {e.texto}
                <span aria-hidden="true" className="text-texto-suave">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          popoverTarget={id}
          popoverTargetAction="hide"
          className="foco mt-4 min-h-12 w-full rounded-boton border border-borde bg-superficie px-4 font-semibold"
        >
          Cerrar
        </button>
      </nav>
    </>
  );
}
