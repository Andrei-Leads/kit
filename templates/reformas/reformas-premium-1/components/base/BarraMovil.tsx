import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsapp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, «Llamar» ocupa todo el ancho como principal. */
  whatsapp?: string;
  /** Mensaje precargado (genérico en todas las páginas). */
  mensaje: string;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), variante `dos` de tipo
 * proyecto, en píldoras de 56 px (encargo §3): [WhatsApp «Enséñanos tu casa»] [Llamar].
 * Fija abajo en móvil (oculta desde 1024 px), fondo opaco, nunca se esconde. Entra
 * desde abajo con `@starting-style` (`.barra-movil`, globals.css).
 */
export function BarraMovil({ telefono, whatsapp, mensaje, className }: Props) {
  return (
    <div
      className={cn(
        "barra-movil fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-borde bg-fondo px-3 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] lg:hidden",
        className,
      )}
    >
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className="cta cta-principal flex-[1.6] gap-2 px-3 text-[15px] whitespace-nowrap">
          <IconoWhatsapp />
          Enséñanos tu casa
        </BotonWhatsApp>
      )}
      <BotonLlamada telefono={telefono} className={cn("cta flex-1 gap-2 px-3 text-[15px]", whatsapp ? "cta-secundario-oscuro" : "cta-principal")}>
        <IconoTelefono />
        Llamar
        <span className="sr-only"> al {telefonoVisible(telefono)}</span>
      </BotonLlamada>
    </div>
  );
}
