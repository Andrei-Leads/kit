import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoCamara, IconoTelefono } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, solo sale Llamar, a todo el ancho. */
  whatsapp?: string;
  /** Mensaje precargado (el general en todas las páginas). */
  mensaje: string;
  /** «Llamar» o «Llamar 24 h». */
  textoLlamar: string;
  className?: string;
};

const BOTON = "pulsable flex min-h-13 flex-1 items-center justify-center gap-2 rounded-boton text-[17px] font-extrabold no-underline";

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), variante `dos` reestilada en
 * electricidad-7: dos pastillas [Llamar | WhatsApp con cámara] sobre papel translúcido, fija
 * abajo hasta 1024 px. Entra desde abajo al cargar (280 ms, 150 ms de retraso; sin entrada con
 * «reducir movimiento»). El <body> reserva su altura (72 px + área segura).
 */
export function BarraMovil({ telefono, whatsapp, mensaje, textoLlamar, className }: Props) {
  return (
    <nav
      aria-label="Contacto rápido"
      className={cn(
        "barra-movil fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-linea-fuerte bg-fondo/95 px-3 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] backdrop-blur-sm lg:hidden",
        className,
      )}
    >
      <BotonLlamada telefono={telefono} className={cn(BOTON, "bg-primario text-sobre-primario")}>
        <IconoTelefono tamano={19} />
        {textoLlamar}
        <span className="sr-only"> al {telefonoVisible(telefono)}</span>
      </BotonLlamada>
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(BOTON, "border-[1.5px] border-borde bg-superficie text-texto")}>
          <IconoCamara tamano={19} />
          WhatsApp
        </BotonWhatsApp>
      )}
    </nav>
  );
}
