import Link from "next/link";
import type { ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { IconoCerrar, IconoFlecha, IconoMenu } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  enlaces: readonly Ancla[];
  /** Nombre del negocio, arriba de la hoja (como la cabecera). */
  nombre: string;
  /** Botones de WhatsApp y llamada del pie de la hoja, ya pintados en el servidor. */
  pie?: ReactNode;
  /** `id` del panel; el botón que lo abre lleva `popoverTarget={id}`. Único por página. */
  id?: string;
  /** Nombre largo en móvil: «Menú» se queda en icono y el texto, para el lector de pantalla. */
  compacto?: boolean;
};

const BOTON =
  "boton inline-flex min-h-11 flex-none cursor-pointer items-center gap-1.5 rounded-boton bg-alterna px-3 text-[15px] leading-none font-bold text-texto";

/**
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx), reestilada en «Fachada nueva»
 * (encargo §6.1): hoja desde arriba, blanca, con radios inferiores de 24 px; el nombre y «Cerrar»
 * en una fila de 60 px, los enlaces a 21 px con flecha y los dos botones al pie. API `popover`
 * nativa: abre y cierra sin JavaScript, con Esc o al tocar fuera, y el navegador gestiona el foco.
 */
export function MenuPopover({ enlaces, nombre, pie, id = "menu", compacto }: Props) {
  return (
    <>
      <button type="button" popoverTarget={id} className={cn(BOTON, compacto && "max-sm:px-2.5")}>
        <IconoMenu />
        <span className={cn(compacto && "max-sm:sr-only")}>Menú</span>
      </button>
      <div id={id} popover="auto" className="menu-hoja px-4 pb-5">
        <div className="-mx-4 flex min-h-[60px] items-center gap-2 border-b border-borde pr-3 pl-4">
          <span className="min-w-0 flex-1 text-base leading-[1.15] font-extrabold text-balance">{nombre}</span>
          <button type="button" popoverTarget={id} popoverTargetAction="hide" className={BOTON}>
            <IconoCerrar />
            Cerrar
          </button>
        </div>
        <nav aria-label="Menú" className="pt-2 pb-4">
          <ul>
            {enlaces.map((e) => (
              <li key={e.href} className="border-b border-borde">
                <Link href={e.href} className="flex min-h-14 items-center justify-between text-[21px] font-extrabold no-underline">
                  {e.texto}
                  <IconoFlecha tamano={20} className="flex-none text-texto-suave" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {pie}
      </div>
    </>
  );
}
