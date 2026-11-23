import Link from "next/link";

import type { EnlaceMenu } from "@/lib/navegacion";
import { cn } from "@/lib/utils";

type Props = {
  enlaces: readonly EnlaceMenu[];
  /** `id` del panel; el botón que lo abre lleva `popoverTarget={id}`. Único por página. */
  id?: string;
  className?: string;
  claseBoton?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx), reestilada en «Veta» (encargo §5):
 * botón «Menú» de texto subrayado que pasa a «Cerrar» con el panel abierto (solo CSS), y panel a
 * todo el ancho bajo la cabecera con los enlaces en serif de 28 px y filete entre ellos (estilos
 * en globals.css, `.menu-panel`). API `popover` nativa: abre y cierra sin JavaScript, con Esc o al
 * tocar fuera, y el navegador gestiona el foco y `aria-expanded`.
 *
 * Tokens: --color-fondo, --color-texto, --color-foco (más --color-filete, propio).
 */
export function MenuPopover({ enlaces, id = "menu", className, claseBoton }: Props) {
  return (
    <>
      <button
        type="button"
        popoverTarget={id}
        className={cn(
          "inline-flex min-h-11 items-center px-3 text-[15px] font-medium text-texto underline underline-offset-4",
          claseBoton,
        )}
      >
        <span className="menu-abrir">Menú</span>
        <span className="menu-cerrar">Cerrar</span>
      </button>
      <div id={id} popover="auto" className={cn("menu-panel marco pt-2 pb-6", className)}>
        <nav aria-label="Menú">
          <ul>
            {enlaces.map((e) => (
              <li key={e.href} className="border-b border-filete">
                <Link href={e.href} className="flex min-h-14 items-center py-3.5 font-titulo text-[28px] leading-[1.15] text-texto no-underline">
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
