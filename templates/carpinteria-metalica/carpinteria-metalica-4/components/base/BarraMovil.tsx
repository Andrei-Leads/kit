import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsApp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, solo sale Llamar, a todo el ancho. */
  whatsapp?: string;
  /** Mensaje precargado (el general en todas las páginas). */
  mensaje: string;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), variante `dos` con
 * `primero="whatsapp"` (tipo proyecto), reestilada (encargo §3): fondo en cianotipia, filete
 * superior en --color-reticula-fuerte, [WhatsApp] en primario con filete de acento y [Llamar] con
 * contorno claro, 52 px con icono y texto. Entra desde abajo al cargar (`@starting-style`, solo
 * con movimiento). Oculta desde 1024 px. El layout reserva su altura al final del `<body>`.
 */
export function BarraMovil({ telefono, whatsapp, mensaje, className }: Props) {
  return (
    <nav
      aria-label="Contacto rápido"
      data-alterna=""
      className={cn(
        "barra-movil fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t-2 border-reticula-fuerte bg-alterna px-2.5 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] lg:hidden",
        className,
      )}
    >
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className="boton boton-lamina boton-medio flex-1 gap-2 px-3">
          <IconoWhatsApp />
          WhatsApp
        </BotonWhatsApp>
      )}
      <BotonLlamada telefono={telefono} className="boton boton-trazo boton-medio flex-1 gap-2 px-3">
        <IconoTelefono />
        Llamar
        <span className="sr-only"> al {telefonoVisible(telefono)}</span>
      </BotonLlamada>
    </nav>
  );
}
