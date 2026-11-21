import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoMenu, IconoTelefono, IconoWhatsApp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`: [Menú] + Llamar (1fr 3fr). */
  whatsapp?: string;
  /** Mensaje precargado (el general en todas las páginas). */
  mensaje: string;
  /** «Llamar 24 h» o «Llamar ahora». */
  textoLlamar: string;
  /** `id` de la hoja del menú (MenuPopover con `sinBoton`). */
  idMenu?: string;
  className?: string;
};

const LATERAL =
  "celda-barra flex flex-col items-center justify-center gap-[3px] text-[0.8125rem] font-bold text-texto focus-visible:-outline-offset-4";

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), reestilada para «Qué te pasa»: solo la
 * variante `combinada` de urgencias. Celdas rectas de 56 px separadas por filetes de 1 px
 * (`barra-menu` · `barra-llamar` · `barra-whatsapp`); «Llamar» en latón ocupa el doble y lleva el número.
 * Por debajo de 1024 px. Va `sticky` como último hijo del <body>: su alto queda reservado al final de
 * la página y no tapa contenido. Visible desde el primer pintado (sin animación de entrada, v2).
 */
export function BarraMovil({ telefono, whatsapp, mensaje, textoLlamar, idMenu = "menu", className }: Props) {
  return (
    <nav
      aria-label="Acciones rápidas"
      className={cn("sticky bottom-0 z-30 border-t border-borde bg-fondo pb-[env(safe-area-inset-bottom)] lg:hidden", className)}
    >
      <div className={cn("grid h-14 gap-px bg-borde", whatsapp ? "grid-cols-[1fr_2fr_1fr]" : "grid-cols-[1fr_3fr]")}>
        <button type="button" popoverTarget={idMenu} className={LATERAL}>
          <IconoMenu />
          <span className="texto-menu">Menú</span>
          <span className="texto-cerrar">Cerrar</span>
        </button>
        <BotonLlamada telefono={telefono} className="boton-laton flex items-center justify-center gap-2.5 focus-visible:-outline-offset-4">
          <IconoTelefono />
          <span className="flex flex-col leading-[1.05]">
            <span className="condensada text-[1.3125rem]">{textoLlamar}</span>
            <span className="text-[0.8125rem] font-semibold tabular-nums">{telefonoVisible(telefono)}</span>
          </span>
        </BotonLlamada>
        {whatsapp && (
          <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={LATERAL}>
            <IconoWhatsApp />
            WhatsApp
          </BotonWhatsApp>
        )}
      </div>
    </nav>
  );
}
