import Link from "next/link";
import type { ReactNode } from "react";

import type { Enlace, IdPagina } from "@/lib/navegacion";
import { cn } from "@/lib/utils";

type Props = {
  enlaces: readonly Enlace[];
  actual?: IdPagina;
  /** `id` del panel; el botón «Menú» de la cabecera lleva `popoverTarget={id}`. */
  id?: string;
  /** Pie del panel (el teléfono, con `BotonLlamada`, pintado por la cabecera). */
  pie?: ReactNode;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx), reestilada (encargo §8): hoja a
 * pantalla completa en cianotipia con el índice numerado («00 Inicio · 01 Trabajos…»). La API
 * `popover` abre y cierra sin JavaScript, cierra con Esc y el navegador gestiona el foco. Entra
 * con `@starting-style` (globals.css, `.menu-plano`). El botón «Menú» lo pinta la cabecera.
 *
 * Tokens: --color-alterna, --color-acento, --font-titulo; foco blanco ([data-alterna]).
 */
export function MenuPopover({ enlaces, actual, id = "menu", pie, className }: Props) {
  const lista = [{ id: undefined, n: "00", href: "/", texto: "Inicio" }, ...enlaces];
  return (
    <div id={id} popover="auto" data-alterna="" className={cn("menu-plano reticula-alterna flex-col [&:popover-open]:flex", className)}>
      <div className="flex h-14 flex-none items-center justify-between border-b border-[color-mix(in_oklab,var(--color-acento)_40%,transparent)]">
        <span className="etiqueta text-sobre-alterna-suave">ÍNDICE</span>
        <button
          type="button"
          popoverTarget={id}
          popoverTargetAction="hide"
          className="h-11 cursor-pointer border border-sobre-alterna bg-transparent px-3 font-titulo text-[13px] text-sobre-alterna"
        >
          Cerrar
        </button>
      </div>
      <nav aria-label="Índice" className="py-3">
        <ul>
          {lista.map((e) => (
            <li key={e.href}>
              <Link
                href={e.href}
                aria-current={e.id && e.id === actual ? "page" : undefined}
                className="flex min-h-[60px] items-baseline gap-4 border-b border-[color-mix(in_oklab,var(--color-acento)_30%,transparent)] py-3.5 font-titulo text-2xl text-sobre-alterna no-underline aria-[current=page]:underline aria-[current=page]:underline-offset-[6px]"
              >
                <span className="w-6 text-[13px] text-sobre-alterna-suave">{e.n}</span>
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {pie && <div className="mt-auto flex flex-col gap-1.5 font-titulo">{pie}</div>}
    </div>
  );
}
