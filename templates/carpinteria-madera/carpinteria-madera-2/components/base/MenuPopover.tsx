import Link from "next/link";
import type { ReactNode } from "react";

import { CerrarMenu } from "@/components/CerrarMenu";
import type { Enlace, IdPagina } from "@/lib/navegacion";
import { cn } from "@/lib/utils";

type Props = {
  enlaces: readonly Enlace[];
  actual?: IdPagina;
  /** `id` del panel; el botón que lo abre lleva `popoverTarget={id}`. Único por página. */
  id?: string;
  /** La pareja WhatsApp + Llamar, al pie del panel (pintada por la cápsula). */
  pie?: ReactNode;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx), reestilada como en reformas-2: panel
 * blanco redondeado que cae desde la cápsula (`.menu-capsula` en globals.css, con
 * `@starting-style`). API `popover` nativa: abre y cierra sin JavaScript, con Esc o al tocar fuera.
 * Inicio + el menú, con flecha y la página actual marcada; al pie, la pareja de botones. La isla
 * `CerrarMenu` lo cierra al pulsar un enlace (navegación de cliente) o al salir el foco con Tab.
 *
 * Tokens: --color-superficie, --color-texto, --color-alterna, --color-foco, --font-titulo.
 */
export function MenuPopover({ enlaces, actual, id = "menu", pie, className }: Props) {
  return (
    <>
      <nav
        id={id}
        popover="auto"
        aria-label="Menú"
        className={cn(
          "menu-capsula flex-col gap-3 rounded-tarjeta border-0 bg-superficie p-3 text-texto shadow-tarjeta backdrop:bg-texto/30 [&:popover-open]:flex",
          className,
        )}
      >
        <ul className="flex flex-col">
          {[{ id: "inicio" as const, href: "/", texto: "Inicio" }, ...enlaces].map((e) => (
            <li key={e.href}>
              <Link
                href={e.href}
                aria-current={e.id && e.id === actual ? "page" : undefined}
                className={cn(
                  "flex min-h-14 items-center justify-between rounded-2xl px-4 font-titulo text-xl font-semibold no-underline hover:bg-alterna",
                  e.id && e.id === actual && "bg-alterna",
                )}
              >
                {e.texto}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
        {pie && <div className="flex flex-col gap-2.5 px-1 pb-1">{pie}</div>}
      </nav>
      <CerrarMenu idMenu={id} />
    </>
  );
}
