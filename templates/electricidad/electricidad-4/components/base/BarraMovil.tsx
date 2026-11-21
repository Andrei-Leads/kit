import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoBocadillo, IconoTelefono } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, «Llamar» a todo el ancho. */
  whatsapp?: string;
  /** Mensaje precargado (el general en todas las páginas). */
  mensaje: string;
  /** «Llamar» o «Llamar 24 h». */
  textoLlamar: string;
  className?: string;
};

const BOTON =
  "flex min-h-[60px] flex-1 items-center justify-center gap-2 px-3 text-lg focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-foco";

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), variante `dos` reestilada para
 * «Cuadro» (encargo §3): `barra-llamar` (primario con sombra de pulsador) | `barra-whatsapp`
 * (superficie). Visible por debajo de 1024 px, donde la cabecera no lleva WhatsApp. Entra al
 * cargar con @starting-style (sin entrada con «reducir movimiento»). El layout reserva su altura y globals.css pone scroll-padding-bottom para que no tape el foco.
 * El foco de «Llamar» va en color sobre-primario (no depende del primario del cliente).
 */
export function BarraMovil({ telefono, whatsapp, mensaje, textoLlamar, className }: Props) {
  return (
    <nav
      aria-label="Contacto rápido"
      className={cn(
        "barra-entra fixed inset-x-0 bottom-0 z-40 flex border-t border-borde bg-superficie pb-[env(safe-area-inset-bottom)] lg:hidden",
        className,
      )}
    >
      <BotonLlamada telefono={telefono} className={cn(BOTON, "bg-primario font-semibold text-sobre-primario shadow-pulsador focus-visible:outline-sobre-primario active:shadow-pulsado")}>
        <IconoTelefono />
        {textoLlamar}
        <span className="sr-only"> al {telefonoVisible(telefono)}</span>
      </BotonLlamada>
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(BOTON, "bg-superficie font-medium text-texto")}>
          <IconoBocadillo />
          WhatsApp
        </BotonWhatsApp>
      )}
    </nav>
  );
}
