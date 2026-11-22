import Link from "next/link";
import type { ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  enlaces: readonly Ancla[];
  /** `id` del panel; el botón que lo abre lleva `popoverTarget={id}`. Único por página. */
  id?: string;
  /** Nombre del negocio, arriba a la izquierda del panel. */
  nombre: string;
  /** La pareja de CTAs, abajo del panel. */
  children?: ReactNode;
  claseBoton?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx), reestilada para
 * «Estancia»: pantalla completa en tinta con la espiga, enlaces en Instrument Sans
 * 400 a 40 px (entran escalonados con `@starting-style`, globals.css) y la pareja
 * de CTAs abajo. Misma API `popover`: abre y cierra sin JavaScript, con Esc, y el
 * navegador gestiona el foco.
 */
export function MenuPopover({ enlaces, id = "menu", nombre, children, claseBoton }: Props) {
  return (
    <>
      <button
        type="button"
        popoverTarget={id}
        className={cn("inline-flex min-h-11 items-center gap-2 px-1 text-[15px] font-medium", claseBoton)}
      >
        <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
          <span className="block h-px bg-current" />
          <span className="block h-px bg-current" />
        </span>
        Menú
      </button>
      <nav id={id} popover="auto" aria-label="Menú" data-tono="oscuro" className="menu-pantalla">
        <div className="absolute inset-x-0 top-0 flex h-[var(--alto-cabecera)] items-center justify-between gap-4 px-[var(--gutter)]">
          <p className="m-0 text-[17px] leading-tight">{nombre}</p>
          <button
            type="button"
            popoverTarget={id}
            popoverTargetAction="hide"
            className="inline-flex min-h-11 items-center gap-2 px-1 text-[15px] font-medium"
          >
            <span aria-hidden="true" className="text-xl leading-none">×</span>
            Cerrar
          </button>
        </div>
        <ul className="m-0 flex list-none flex-col p-0">
          <li style={{ "--i": 0 } as React.CSSProperties} className="border-b border-borde-oscuro">
            <Link href="/" className="block py-3 text-[40px] leading-[1.1] tracking-[-0.02em] no-underline">
              Inicio
            </Link>
          </li>
          {enlaces.map((e, i) => (
            <li key={e.href} style={{ "--i": i + 1 } as React.CSSProperties} className="border-b border-borde-oscuro">
              <Link href={e.href} className="block py-3 text-[40px] leading-[1.1] tracking-[-0.02em] no-underline">
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
        {children && <div className="mt-auto flex flex-col gap-3 pt-8">{children}</div>}
      </nav>
    </>
  );
}
