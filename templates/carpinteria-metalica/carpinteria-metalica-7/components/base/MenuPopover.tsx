import Link from "next/link";
import type { ReactNode } from "react";

import type { Enlace, IdPagina } from "@/lib/navegacion";
import { cn } from "@/lib/utils";

type Props = {
  enlaces: readonly Enlace[];
  actual?: IdPagina;
  /** `id` del panel; el botón que lo abre (en la cápsula) lleva `popoverTarget={id}`. */
  id?: string;
  /** Debajo de los enlaces (el WhatsApp de la cápsula, pintado en el servidor). */
  pie?: ReactNode;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx), reestilada para «Forja»: hoja de
 * hierro bajo la cápsula, enlaces en condensada de 32 px con «/» en acento y esquina cortada.
 * API `popover` nativa: abre y cierra sin JavaScript, con Esc o tocando fuera. Aparece con
 * `@starting-style` (.menu-capsula en globals.css). El botón lo pone la cápsula.
 */
export function MenuPopover({ enlaces, actual, id = "menu", pie, className }: Props) {
  return (
    <nav
      id={id}
      popover="auto"
      aria-label="Menú"
      className={cn(
        "menu-capsula hierro corte-tarjeta fixed inset-x-4 top-[72px] bottom-auto m-0 h-auto max-h-[calc(100dvh-88px)] w-auto overflow-y-auto px-5 pt-1.5 pb-5 backdrop:bg-black/40",
        className,
      )}
    >
      <ul>
        {[{ id: undefined, href: "/", texto: "Inicio" }, ...enlaces].map((e) => (
          <li key={e.href}>
            <Link
              href={e.href}
              aria-current={e.id && e.id === actual ? "page" : undefined}
              className="flex min-h-[58px] items-center justify-between border-b border-borde font-titulo text-[32px] leading-none font-extrabold uppercase no-underline focus-visible:-outline-offset-2 aria-[current=page]:text-acento"
            >
              {e.texto}
              <span aria-hidden="true" className="text-2xl text-acento">
                /
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {pie && <div className="mt-4 grid gap-2">{pie}</div>}
    </nav>
  );
}
