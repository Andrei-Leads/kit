import Link from "next/link";
import type { Ancla } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  enlaces: readonly Ancla[];
  /** Pie del panel (teléfono y email). */
  pie?: React.ReactNode;
  /** `id` del panel; el botón que lo abre lleva `popoverTarget={id}`. Único por página. */
  id?: string;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx), reestilada en «Tu casa»
 * (encargo §8): panel redondeado que baja desde la cabecera, sobre el marrón de la
 * cabecera sólida, con enlaces de 56 px en humanista de 24 px. API `popover` nativa:
 * abre y cierra sin JavaScript, con Esc o al tocar fuera.
 */
export function MenuPopover({ enlaces, pie, id = "menu", className }: Props) {
  return (
    <>
      <button
        type="button"
        popoverTarget={id}
        className="flex min-h-11 flex-none items-center gap-2 pr-1 pl-1.5 text-[15px] font-semibold text-white"
      >
        Menú
        <span aria-hidden="true" className="grid gap-1">
          <span className="block h-0.5 w-[18px] rounded-sm bg-white" />
          <span className="block h-0.5 w-[18px] rounded-sm bg-white" />
        </span>
      </button>
      <nav id={id} popover="auto" aria-label="Menú" className={cn("menu-panel sobre-oscuro px-6 pt-2 pb-6", className)}>
        <ul className="m-0 flex list-none flex-col p-0">
          {enlaces.map((e) => (
            <li key={e.href}>
              <Link
                href={e.href}
                className="remate flex min-h-14 items-center border-b border-white/14 text-2xl text-white no-underline"
              >
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
        {pie && <div className="mt-[18px] text-[15px] text-pie-suave">{pie}</div>}
        <button
          type="button"
          popoverTarget={id}
          popoverTargetAction="hide"
          className="mt-4 min-h-11 rounded-boton border-2 border-white/60 px-5 text-[15px] font-semibold text-white"
        >
          Cerrar
        </button>
      </nav>
    </>
  );
}
