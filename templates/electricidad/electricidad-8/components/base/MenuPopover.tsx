import Link from "next/link";
import type { Ancla } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  enlaces: readonly (Ancla & { actual?: boolean })[];
  /** `id` del panel; el botón que lo abre lleva `popoverTarget={id}`. Único por página. */
  id?: string;
  texto?: string;
  className?: string;
  claseBoton?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx), reestilada (encargo §8): panel de
 * papel a pantalla completa en móvil, «Cerrar» de 44 px como primer elemento y los enlaces en la
 * serif a 28 px con filetes. API `popover` nativa: abre y cierra sin JavaScript y con Esc. El panel
 * va justo después del botón para que el orden de tabulación siga al botón.
 */
export function MenuPopover({ enlaces, id = "menu", texto = "Menú", className, claseBoton }: Props) {
  return (
    <>
      <button
        type="button"
        popoverTarget={id}
        className={cn(
          "inline-flex min-h-11 items-center px-1 font-semibold text-texto underline decoration-1 underline-offset-[6px] focus-visible:outline-2 focus-visible:outline-foco",
          claseBoton,
        )}
      >
        {texto}
      </button>
      <nav
        id={id}
        popover="auto"
        aria-label="Menú"
        className={cn(
          "panel-menu fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-fondo px-(--pad) pt-4 pb-10 text-texto opacity-100",
          className,
        )}
      >
        <div className="flex justify-end border-b border-linea-plano pb-3">
          <button
            type="button"
            popoverTarget={id}
            popoverTargetAction="hide"
            className="inline-flex min-h-11 items-center border border-texto px-4 font-semibold focus-visible:outline-2 focus-visible:outline-foco"
          >
            Cerrar
          </button>
        </div>
        <ul className="mt-2">
          {enlaces.map((e, i) => (
            <li key={e.href} className="border-b border-linea-plano">
              <Link
                href={e.href}
                aria-current={e.actual ? "page" : undefined}
                className="flex min-h-14 items-baseline gap-4 py-3 font-titulo text-[1.75rem] leading-tight focus-visible:outline-2 focus-visible:outline-foco aria-[current=page]:underline aria-[current=page]:decoration-primario aria-[current=page]:decoration-1 aria-[current=page]:underline-offset-8"
              >
                <span aria-hidden="true" className="w-6 text-sm text-texto-suave tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
