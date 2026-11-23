import Link from "next/link";
import type { Ancla } from "@andrei-leads/core";

import { IconoMenu } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  enlaces: readonly Ancla[];
  /** `id` del panel; el botón que lo abre lleva `popoverTarget={id}`. Único por página. */
  id?: string;
  className?: string;
  claseBoton?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx), reestilada en «Restauración»
 * (encargo §8): hoja que sube desde abajo sobre `superficie`, con asa, «Cerrar» y los enlaces a
 * 24 px entre separadores (animación en globals.css, `.menu-hoja`). API `popover` nativa: abre y
 * cierra sin JavaScript, con Esc o al tocar fuera, y el navegador gestiona el foco.
 *
 * Tokens: --color-superficie, --color-texto, --color-borde, --color-foco, --radius-boton.
 */
export function MenuPopover({ enlaces, id = "menu", className, claseBoton }: Props) {
  return (
    <>
      <button type="button" popoverTarget={id} className={claseBoton}>
        <IconoMenu />
        <span>Menú</span>
      </button>
      <div id={id} popover="auto" className={cn("menu-hoja px-5 pt-2.5 pb-[calc(20px+env(safe-area-inset-bottom))]", className)}>
        <div aria-hidden="true" className="mx-auto mb-1.5 h-1 w-10 rounded-sm bg-borde" />
        <div className="flex justify-end">
          <button
            type="button"
            popoverTarget={id}
            popoverTargetAction="hide"
            className="inline-flex min-h-11 items-center rounded-boton px-3.5 text-[15px] font-semibold text-texto"
          >
            Cerrar
          </button>
        </div>
        <nav aria-label="Menú">
          <ul>
            {enlaces.map((e, i) => (
              <li key={e.href} className={cn(i < enlaces.length - 1 && "border-b border-borde")}>
                <Link href={e.href} className="flex min-h-[52px] items-center text-2xl font-semibold text-texto no-underline">
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
