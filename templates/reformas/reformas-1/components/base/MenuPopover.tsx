import Link from "next/link";
import type { Ancla } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  enlaces: readonly Ancla[];
  /** Nombre del negocio, arriba de la hoja (como la cabecera). */
  nombre: string;
  /** `id` del panel; el botón que lo abre lleva `popoverTarget={id}`. Único por página. */
  id?: string;
  className?: string;
  claseBoton?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx), reestilada en «Antes y después»
 * (encargo §8): hoja desde arriba a todo el ancho, con el nombre, «Cerrar» y los enlaces en
 * serif de 32 px entre filetes. API `popover` nativa: abre y cierra sin JavaScript, con Esc o
 * al tocar fuera, y el navegador gestiona el foco.
 */
export function MenuPopover({ enlaces, nombre, id = "menu", className, claseBoton }: Props) {
  return (
    <>
      <button type="button" popoverTarget={id} className={claseBoton}>
        Menú
      </button>
      <div id={id} popover="auto" className={cn("menu-hoja px-4 pt-3 pb-7", className)}>
        <div className="flex min-h-11 items-center justify-between gap-4">
          <span className="font-titulo text-xl leading-tight font-medium">{nombre}</span>
          <button type="button" popoverTarget={id} popoverTargetAction="hide" className={claseBoton}>
            Cerrar
          </button>
        </div>
        <nav aria-label="Menú" className="mt-3">
          <ul>
            {enlaces.map((e) => (
              <li key={e.href} className="border-t border-filete">
                <Link href={e.href} className="block py-3 font-titulo text-[32px] leading-[1.2] no-underline">
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
