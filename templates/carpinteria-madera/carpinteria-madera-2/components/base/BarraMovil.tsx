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
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), variante `dos` de proyecto
 * reestilada: [WhatsApp | Llamar] en píldoras de 56 px (`barra-ancho`) sobre blanco, hasta 1024 px.
 * Entra desde abajo al cargar (`.barra-movil`, directa con «reducir movimiento»). El `<body>` reserva
 * su altura (layout.tsx).
 *
 * Tokens: --color-superficie, --color-borde, --color-primario, --color-sobre-primario, --color-texto.
 */
export function BarraMovil({ telefono, whatsapp, mensaje, className }: Props) {
  return (
    <nav
      aria-label="Contacto rápido"
      className={cn(
        "barra-movil fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-borde bg-superficie px-3 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] lg:hidden",
        className,
      )}
    >
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className="boton boton-primario min-w-0 flex-1 gap-2 px-3 text-[16.5px]">
          <IconoWhatsApp />
          WhatsApp
        </BotonWhatsApp>
      )}
      <BotonLlamada
        telefono={telefono}
        className={cn("boton min-w-0 flex-1 gap-2 px-3 text-[16.5px]", whatsapp ? "boton-contorno" : "boton-primario")}
      >
        <IconoTelefono />
        Llamar
        <span className="sr-only"> al {telefonoVisible(telefono)}</span>
      </BotonLlamada>
    </nav>
  );
}
