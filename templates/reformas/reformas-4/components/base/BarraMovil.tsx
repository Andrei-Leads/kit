import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, Llamar ocupa todo el ancho. */
  whatsapp?: string;
  mensaje: string;
  variante: "dos";
  /** Proyecto: WhatsApp a la izquierda. */
  primero?: "llamar" | "whatsapp";
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), reestilada (encargo §3): sobre negro con
 * un filete superior de --color-borde, [WhatsApp] relleno latón y [Llamar] con contorno de 2 px. Se
 * oculta desde 1024 px, donde el índice lateral lleva los dos botones. El pie reserva su altura.
 */
export function BarraMovil({ telefono, whatsapp, mensaje, primero = "whatsapp", className }: Props) {
  const llamar = (
    <BotonLlamada key="llamar" telefono={telefono} className="btn btn-tel min-h-[52px] flex-1 px-3">
      Llamar
      <span className="sr-only"> al {telefonoVisible(telefono)}</span>
    </BotonLlamada>
  );
  const wa = whatsapp && (
    <BotonWhatsApp key="wa" numero={whatsapp} mensaje={mensaje} className="btn btn-wa min-h-[52px] flex-1 gap-2.5 px-3">
      <span aria-hidden="true" className="bocadillo" />
      WhatsApp
    </BotonWhatsApp>
  );
  const botones = primero === "llamar" ? [llamar, wa] : [wa, llamar];
  return (
    <div
      className={cn(
        "barra-diario fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-borde bg-fondo px-3 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] lg:hidden",
        className,
      )}
    >
      {botones}
    </div>
  );
}
