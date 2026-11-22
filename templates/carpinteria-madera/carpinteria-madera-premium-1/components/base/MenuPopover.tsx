import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  enlaces: readonly Ancla[];
  /** Nombre del negocio arriba a la izquierda del panel. */
  nombre: string;
  /** Pareja de botones de abajo (BotonWhatsApp + BotonLlamada pintados en el servidor). */
  botones?: ReactNode;
  /** `id` del panel; el botón que lo abre lleva `popoverTarget={id}`. Único por página. */
  id?: string;
  claseBoton?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx), reestilada en «Oficio»
 * (encargo §5.2): panel a pantalla completa en tinta, enlaces en Newsreader 300 a
 * 32 px con filetes y los dos botones abajo. API `popover` nativa: abre y cierra sin
 * JavaScript, con Esc, y el navegador gestiona el foco.
 */
export function MenuPopover({ enlaces, nombre, botones, id = "menu", claseBoton }: Props) {
  return (
    <>
      <button type="button" popoverTarget={id} className={cn("min-h-11 min-w-11 px-2.5 text-[15px]", claseBoton)}>
        Menú
      </button>
      <nav id={id} popover="auto" aria-label="Menú" className="menu-panel sobre-oscuro" data-tono="oscuro">
        <div className="flex min-h-14 items-center justify-between gap-4">
          <span className="titulo text-xl leading-[1.15]">{nombre}</span>
          <button type="button" popoverTarget={id} popoverTargetAction="hide" className="min-h-11 px-2.5 text-[15px]">
            Cerrar
          </button>
        </div>
        <ul className="m-0 mt-6 flex list-none flex-col p-0">
          {enlaces.map((e, i) => (
            <li key={e.href} style={{ "--i": i } as CSSProperties}>
              <Link href={e.href} className="titulo block border-b border-fondo/14 py-[18px] text-[32px] leading-[1.1]">
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
        {botones && <div className="mt-auto flex flex-col gap-3 pt-8">{botones}</div>}
      </nav>
    </>
  );
}
