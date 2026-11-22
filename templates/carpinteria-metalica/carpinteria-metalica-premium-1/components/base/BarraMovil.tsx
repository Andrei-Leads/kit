import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoWhatsapp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, «Llamar» a todo el ancho. */
  whatsapp?: string;
  /** Mensaje general (`mensajeInicio(config.contacto)`) en todas las páginas. */
  mensaje: string;
  className?: string;
};

const BOTON = "boton min-h-14 flex-1 px-3";

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), variante `dos` con
 * WhatsApp primero (tipo proyecto), reestilada en «Marco» (encargo §3): botones de
 * 56 px con texto sobre tinta al 94 % con filete superior de 1 px. Oculta desde 1024 px.
 */
export function BarraMovil({ telefono, whatsapp, mensaje, className }: Props) {
  return (
    <div
      data-tono="oscuro"
      className={cn(
        "barra-movil fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-borde-tinta px-2.5 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] lg:hidden",
        className,
      )}
    >
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(BOTON, "boton-wa sobre-tinta")}>
          <IconoWhatsapp />
          WhatsApp
        </BotonWhatsApp>
      )}
      <BotonLlamada telefono={telefono} className={cn(BOTON, "boton-llamar sobre-tinta")}>
        Llamar
        <span className="sr-only"> al {telefonoVisible(telefono)}</span>
      </BotonLlamada>
    </div>
  );
}
