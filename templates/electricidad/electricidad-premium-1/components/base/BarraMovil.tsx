import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoWhatsapp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, «Llamar» a todo el ancho (en primario). */
  whatsapp?: string;
  /** Mensaje general en todas las páginas. */
  mensaje: string;
  className?: string;
};

const BOTON =
  "boton flex min-h-14 flex-1 items-center justify-center gap-2 rounded-boton px-3 text-base font-medium no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foco";

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), variante `dos`
 * reestilada para «Tensión» (encargo §3 y §8): WhatsApp | Llamar sobre tinta
 * al 94 % con desenfoque y filete superior; barra-whatsapp en primario,
 * barra-llamar con contorno de 2 px. Oculta desde 768 px.
 */
export function BarraMovil({ telefono, whatsapp, mensaje, className }: Props) {
  return (
    <div
      className={cn(
        "barra-movil fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-[var(--color-linea)] bg-[var(--color-barra)] px-2 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] backdrop-blur-[12px] md:hidden",
        className,
      )}
    >
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(BOTON, "bg-primario text-sobre-primario")}>
          <IconoWhatsapp />
          WhatsApp
        </BotonWhatsApp>
      )}
      <BotonLlamada telefono={telefono} className={cn(BOTON, whatsapp ? "border-2 border-texto text-texto" : "bg-primario text-sobre-primario")}>
        Llamar
        <span className="sr-only"> al {telefonoVisible(telefono)}</span>
      </BotonLlamada>
    </div>
  );
}
