import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoWhatsapp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, Llamar a todo el ancho. */
  whatsapp?: string;
  /** Mensaje precargado (el general en todas las páginas). */
  mensaje: string;
  className?: string;
};

const BOTON =
  "condensada flex h-14 flex-1 items-center justify-center gap-2 px-3 text-lg tracking-[0.02em] no-underline focus-visible:outline-3 focus-visible:-outline-offset-[5px]";

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), variante `dos`
 * con `primero="whatsapp"` (tipo proyecto), reestilada para «Obra con nombre»:
 * rectangular, 56 px, filete superior de 2 px; WhatsApp en primario y Llamar en
 * negro. Visible por debajo de 1024 px (la cabecera de móvil no lleva
 * WhatsApp). Entra desde abajo con @starting-style (directa con «reducir
 * movimiento»). El layout reserva su altura.
 */
export function BarraMovil({ telefono, whatsapp, mensaje, className }: Props) {
  return (
    <nav
      aria-label="Contacto rápido"
      className={cn("barra-entra fixed inset-x-0 bottom-0 z-40 flex border-t-2 border-borde bg-negro pb-[env(safe-area-inset-bottom)] lg:hidden", className)}
    >
      {whatsapp && (
        <BotonWhatsApp
          numero={whatsapp}
          mensaje={mensaje}
          className={cn(BOTON, "bg-primario text-sobre-primario focus-visible:outline-foco active:bg-primario-hover")}
        >
          <IconoWhatsapp />
          WhatsApp
        </BotonWhatsApp>
      )}
      <BotonLlamada telefono={telefono} className={cn(BOTON, "bg-negro text-sobre-negro focus-visible:outline-foco-sobre-negro active:bg-[#2a2a2a]")}>
        Llamar
        <span className="sr-only"> al {telefonoVisible(telefono)}</span>
      </BotonLlamada>
    </nav>
  );
}
