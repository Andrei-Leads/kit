import Link from "next/link";
import type { ReactNode } from "react";

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
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx), reestilada (encargo §8): panel
 * redondeado que cae de la cápsula, con `@starting-style` (globals.css, `.menu-capsula`). La API
 * `popover` abre y cierra sin JavaScript, cierra con Esc o al tocar fuera y el navegador gestiona
 * el foco. El botón «Menú»/«Cerrar» lo pinta la cápsula.
 */
export function MenuPopover({ enlaces, actual, id = "menu", pie, className }: Props) {
  return (
    <nav
      id={id}
      popover="auto"
      aria-label="Menú"
      className={cn(
        "menu-capsula flex-col gap-2 rounded-[20px] border-0 bg-superficie p-2 text-texto shadow-tarjeta backdrop:bg-texto/30 [&:popover-open]:flex",
        className,
      )}
    >
      <ul className="flex flex-col">
        {[{ id: undefined, href: "/", texto: "Inicio" }, ...enlaces].map((e) => (
          <li key={e.href}>
            <Link
              href={e.href}
              aria-current={e.id && e.id === actual ? "page" : undefined}
              className={cn(
                "flex min-h-[52px] items-center rounded-[14px] px-4 font-titulo text-xl font-medium no-underline hover:bg-alterna",
                e.id && e.id === actual && "bg-alterna",
              )}
            >
              {e.texto}
            </Link>
          </li>
        ))}
      </ul>
      {pie && <div className="flex flex-col gap-2 p-1">{pie}</div>}
    </nav>
  );
}
