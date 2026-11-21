import Link from "next/link";
import type { ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  enlaces: readonly Ancla[];
  /** `id` del panel; el botón que lo abre lleva `popoverTarget={id}`. Único por página. */
  id?: string;
  /** Línea final: la llamada-placa «Llamar 24 h · número» (BotonLlamada, pintado en el servidor). */
  llamada?: ReactNode;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx), reestilada para «Apagón» (encargo §8)
 * como **hoja inferior** de la barra combinada: solo el panel (el botón «Menú» está en la barra). API
 * `popover` nativa: abre y cierra sin JavaScript, «Esc» o tocar fuera la cierran y el foco vuelve a
 * «Menú». Un popover no atrapa el foco: «Cerrar» (44 px) es el primer elemento. Entra desde abajo con
 * `@starting-style` (clase `hoja` en globals.css; sin desplazamiento con «reducir movimiento»).
 *
 * Tokens: --color-superficie, --color-texto, --color-borde, --color-foco, --color-primario.
 */
export function MenuPopover({ enlaces, id = "menu", llamada, className }: Props) {
  return (
    <nav
      id={id}
      popover="auto"
      aria-label="Menú"
      className={cn(
        "hoja fixed inset-x-0 top-auto bottom-0 m-0 h-auto max-h-[85dvh] w-full max-w-none translate-y-full overflow-y-auto bg-superficie p-0 pb-[calc(1rem+env(safe-area-inset-bottom))] text-texto opacity-0 lg:hidden",
        className,
      )}
    >
      <div aria-hidden="true" className="cinta" />
      <div className="flex items-center justify-between gap-3 px-4 pt-3">
        <button
          type="button"
          popoverTarget={id}
          popoverTargetAction="hide"
          className="foco flex min-h-11 items-center gap-2 border-2 border-borde px-4 font-semibold"
        >
          <span aria-hidden="true" className="text-xl leading-none">×</span>
          Cerrar
        </button>
        <span aria-hidden="true" className="rotulo text-xs">
          Esc también cierra
        </span>
      </div>
      <ul className="mt-2 divide-y divide-borde/40 px-4">
        {enlaces.map((e) => (
          <li key={e.href}>
            <Link href={e.href} className="foco condensada flex min-h-14 items-center gap-4 text-[1.625rem] uppercase">
              {e.texto}
            </Link>
          </li>
        ))}
      </ul>
      {llamada && <div className="mt-3 px-4">{llamada}</div>}
    </nav>
  );
}
