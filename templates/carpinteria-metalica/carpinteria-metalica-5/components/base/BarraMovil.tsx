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

/** `boton-barra`: 48 px dentro de una barra de 64 px. */
const BOTON = "boton min-h-0 flex-1 px-3";

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), variante `dos` con WhatsApp
 * primero (tipo proyecto, encargo §3): sobre `superficie` con un filete superior de 1 px en
 * anodizado; entra desde abajo al cargar (`@starting-style`). Oculta desde 1024 px. El
 * layout reserva su altura al final del `<body>`.
 */
export function BarraMovil({ telefono, whatsapp, mensaje, className }: Props) {
  return (
    <nav
      aria-label="Contacto rápido"
      className={cn(
        "barra-movil fixed inset-x-0 bottom-0 z-40 flex h-[calc(64px+env(safe-area-inset-bottom))] gap-2 border-t border-anodizado bg-superficie px-3 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] lg:hidden",
        className,
      )}
    >
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(BOTON, "boton-anodizado")}>
          <IconoWhatsapp tamano={16} />
          WhatsApp
        </BotonWhatsApp>
      )}
      <BotonLlamada telefono={telefono} className={cn(BOTON, "boton-contorno")}>
        Llamar
        <span className="sr-only"> al {telefonoVisible(telefono)}</span>
      </BotonLlamada>
    </nav>
  );
}
