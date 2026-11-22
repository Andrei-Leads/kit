import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { dosCifras } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  enlaces: readonly Ancla[];
  /** Nombre del negocio, arriba a la izquierda del panel. */
  nombre: string;
  /** Pareja de CTAs (56 px) con el horario, abajo del panel. */
  pie?: ReactNode;
  /** `id` del panel; el botón que lo abre lleva `popoverTarget={id}`. Único por página. */
  id?: string;
  claseBoton?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx), reestilada como menú
 * «persiana» de «Marco» (encargo §6): panel de tinta a pantalla completa que baja desde
 * arriba (`@starting-style`), enlaces numerados en Hanken 300 a 40 px (64 en escritorio)
 * con filetes de 1 px y, abajo, la pareja de CTAs. API `popover` nativa: abre y cierra
 * sin JavaScript, con Esc, y el navegador gestiona el foco.
 */
export function MenuPopover({ enlaces, nombre, pie, id = "menu", claseBoton }: Props) {
  return (
    <>
      <button
        type="button"
        popoverTarget={id}
        className={cn("min-h-12 cursor-pointer border-0 bg-transparent pr-0.5 pl-2 text-base font-medium text-current underline decoration-1 underline-offset-[6px]", claseBoton)}
      >
        Menú
      </button>
      <div id={id} popover="auto" className="menu-persiana" data-tono="oscuro">
        <div className="contenedor flex h-(--alto-cabecera) flex-none items-center justify-between">
          <span className="fino text-lg">{nombre}</span>
          <button
            type="button"
            popoverTarget={id}
            popoverTargetAction="hide"
            className="min-h-12 cursor-pointer border-0 bg-transparent pr-0.5 pl-3 text-base font-medium text-sobre-tinta underline decoration-1 underline-offset-[6px]"
          >
            Cerrar
          </button>
        </div>
        <nav aria-label="Menú" className="contenedor flex-1 pt-2 pb-6">
          <ol className="m-0 list-none border-t border-borde-tinta p-0">
            {enlaces.map((e, i) => (
              <li key={e.href} className="menu-enlace border-b border-borde-tinta" style={{ "--i": i } as CSSProperties}>
                <Link href={e.href} className="flex items-baseline gap-5 py-3.5 text-sobre-tinta no-underline lg:py-[18px]">
                  <span aria-hidden="true" className="min-w-6 text-xs tracking-[0.12em] text-sobre-tinta-suave">
                    {dosCifras(i + 1)}
                  </span>
                  <span className="fino text-[40px] leading-[1.05] lg:text-[64px]">{e.texto}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        {pie && <div className="contenedor flex-none pb-8 lg:pb-12">{pie}</div>}
      </div>
    </>
  );
}
