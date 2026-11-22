import Link from "next/link";
import type { Ancla } from "@andrei-leads/core";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
  enlaces: readonly Ancla[];
  /** Nombre del negocio arriba a la izquierda del panel. */
  marca: ReactNode;
  /** La pareja de CTAs abajo del panel (servidor: BotonLlamada / BotonWhatsApp de core). */
  pie?: ReactNode;
  /** `id` del panel; el botón que lo abre lleva `popoverTarget={id}`. Único por página. */
  id?: string;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx), reestilada en
 * «Caudal» (encargo §5.2): a pantalla completa en tinta, enlaces en Inter
 * Tight 300 a 2 rem con filetes de 1 px y la pareja de CTAs abajo. API
 * `popover` nativa: abre y cierra sin JavaScript, con Esc o con «Cerrar».
 * Entrada: opacity + translate de 24 px (globals.css, `.menu-pantalla`).
 */
export function MenuPopover({ enlaces, marca, pie, id = "menu", className }: Props) {
  return (
    <>
      <button
        type="button"
        popoverTarget={id}
        className="flex size-11 flex-none flex-col items-center justify-center gap-[7px] lg:hidden"
      >
        <span className="sr-only">Menú</span>
        <span aria-hidden="true" className="block h-px w-[22px] bg-current" />
        <span aria-hidden="true" className="block h-px w-[22px] bg-current" />
      </button>
      <nav id={id} popover="auto" aria-label="Menú" className={cn("menu-pantalla sobre-tinta", className)}>
        <div className="flex h-[60px] flex-none items-center justify-between pr-2 pl-4">
          {marca}
          <button
            type="button"
            popoverTarget={id}
            popoverTargetAction="hide"
            className="min-h-11 px-3 text-[15px] font-medium text-white"
          >
            Cerrar
          </button>
        </div>
        <ul className="m-0 flex list-none flex-col px-4 pt-6">
          {enlaces.map((e) => (
            <li key={e.href} className="border-b border-white/16">
              <Link href={e.href} className="titulo flex min-h-16 items-center text-[2rem] text-white no-underline">
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
        {pie && <div className="mt-auto px-4 pt-10 pb-[calc(24px+env(safe-area-inset-bottom))]">{pie}</div>}
      </nav>
    </>
  );
}
