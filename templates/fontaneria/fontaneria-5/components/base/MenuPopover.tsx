import Link from "next/link";
import type { Ancla } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  enlaces: readonly Ancla[];
  /** `id` del panel; el botón que lo abre lleva `popoverTarget={id}`. Único por página. */
  id?: string;
  texto?: string;
  sinBoton?: boolean;
  className?: string;
  claseBoton?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx), reestilada para «Llegamos»: panel bajo
 * la cápsula con la esquina superior derecha cortada y borde tinta de 2 px. API `popover` nativa:
 * abre y cierra sin JavaScript, con Esc o tocando fuera. Entra con opacidad + 8 px (`.panel-menu`).
 */
export function MenuPopover({ enlaces, id = "menu", texto = "Menú", sinBoton, className, claseBoton }: Props) {
  return (
    <>
      {!sinBoton && (
        <button
          type="button"
          popoverTarget={id}
          className={cn(
            "boton inline-flex h-12 items-center border-2 border-tinta bg-superficie px-3 font-titulo text-[15px] font-semibold text-texto",
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
          "panel-menu corte fixed inset-x-3 top-[86px] bottom-auto m-0 h-fit w-auto translate-y-[-8px] bg-tinta p-0.5 text-texto opacity-0 backdrop:bg-transparent",
          className,
        )}
      >
        <div className="corte-13 bg-superficie px-4 pt-1.5 pb-4">
          <div className="flex justify-end">
            <button
              type="button"
              popoverTarget={id}
              popoverTargetAction="hide"
              className="min-h-11 px-2 font-titulo text-[15px] font-semibold underline underline-offset-4"
            >
              Cerrar
            </button>
          </div>
          <ul className="m-0 list-none p-0">
            {enlaces.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  className="flex min-h-12 items-center justify-between border-b-2 border-linea-clara font-titulo text-[19px] font-semibold text-texto no-underline"
                >
                  {e.texto}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
