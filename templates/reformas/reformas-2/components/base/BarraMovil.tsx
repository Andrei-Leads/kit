import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsApp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, solo sale Llamar, a todo el ancho y con relleno. */
  whatsapp?: string;
  /** Mensaje precargado (el general en todas las páginas). */
  mensaje: string;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), variante `dos` con
 * `primero="whatsapp"` (tipo proyecto), reestilada según la entrega v2: dos píldoras de 56 px con
 * icono y texto, [WhatsApp] relleno y [Llamar] con contorno, 6 px de relleno y área segura (69 px
 * sin zona segura). Sin animación de entrada. Oculta desde 1024 px, donde la cápsula lleva los dos
 * botones. El layout reserva su altura al final del `<body>`.
 */
export function BarraMovil({ telefono, whatsapp, mensaje, className }: Props) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-borde bg-superficie px-2 pt-1.5 pb-[calc(6px+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_oklch(0.3_0.05_40/0.08)] lg:hidden",
        className,
      )}
    >
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className="boton boton-primario h-14 flex-1 px-3">
          <IconoWhatsApp />
          WhatsApp
        </BotonWhatsApp>
      )}
      <BotonLlamada telefono={telefono} className={cn("boton h-14 flex-1 px-3", whatsapp ? "boton-contorno" : "boton-primario")}>
        <IconoTelefono />
        Llamar
        <span className="sr-only"> al {telefonoVisible(telefono)}</span>
      </BotonLlamada>
    </div>
  );
}
