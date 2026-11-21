import Link from "next/link";
import type { Ancla } from "@andrei-leads/core";

import { numeroOrden } from "@/lib/navegacion";
import { cn } from "@/lib/utils";

type Props = {
  enlaces: readonly Ancla[];
  /** `id` del panel; el botón «Menú» de la barra lleva `popoverTarget={id}`. Único por página. */
  id?: string;
  /** Ruta de la sección actual: su fila lleva `aria-current="page"` y va en primario-luz. */
  actual?: string;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx), reestilada para «Qué te pasa» como
 * hoja inferior de la barra combinada: fondo superficie, filete superior de 3 px y enlaces como filas
 * del índice. API `popover` nativa: abre y cierra sin JavaScript, cierra con Esc o al tocar fuera, y el
 * navegador gestiona el foco y el `aria-expanded` del botón. La animación está en globals.css
 * (`.hoja-menu`). El botón que la abre es el «Menú» de la barra (por eso aquí no hay botón propio).
 */
export function MenuPopover({ enlaces, id = "menu", actual, className }: Props) {
  return (
    <nav
      id={id}
      popover="auto"
      aria-label="Menú"
      className={cn(
        "hoja-menu fixed m-0 w-full max-w-none border-0 border-t-3 border-primario-luz bg-superficie px-4 pt-1 pb-3 text-texto lg:hidden",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="rotulo text-primario-luz">Menú</p>
        <button type="button" popoverTarget={id} popoverTargetAction="hide" className="min-h-11 px-1 text-[0.9375rem] font-semibold">
          Cerrar
        </button>
      </div>
      <ol className="border-t border-borde">
        {enlaces.map((e, i) => (
          <li key={e.href} className="border-b border-borde">
            <Link href={e.href} aria-current={e.href === actual ? "page" : undefined} className="fila-indice grid min-h-[52px] aria-[current=page]:text-primario-luz grid-cols-[2rem_minmax(0,1fr)_auto] items-baseline px-0.5 py-2.5">
              <span className="numero text-[0.8125rem] font-semibold tabular-nums">{numeroOrden(i)}</span>
              <span className="condensada text-2xl leading-[1.05]">{e.texto}</span>
              <span aria-hidden="true" className="flecha text-xl leading-none">
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
