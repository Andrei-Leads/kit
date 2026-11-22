import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { contorno, relleno } from "@/components/Botones";
import { IconoTelefono, IconoWhatsapp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, solo sale «Llamar · {teléfono}» a todo el ancho. */
  whatsapp?: string;
  /** Mensaje precargado (`mensajeInicio(config.contacto)` en todas las páginas). */
  mensaje: string;
  className?: string;
};

const BOTON = "min-h-14 flex-1 gap-2 px-3 text-base";

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), variante `dos` con
 * `primero="whatsapp"` (tipo proyecto), reestilada en «Restauración» (entrega, barra-ancho):
 * píldoras de 56 px sobre el nogal, [WhatsApp] relleno y [Llamar] con contorno crema, con icono y
 * texto. Oculta desde `lg`. Entra desde abajo al cargar (globals.css); el pie reserva su altura.
 */
export function BarraMovil({ telefono, whatsapp, mensaje, className }: Props) {
  return (
    <div
      className={cn(
        "barra-movil fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-borde bg-fondo px-2.5 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] lg:hidden",
        className,
      )}
    >
      {whatsapp ? (
        <>
          <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(relleno, BOTON)}>
            <IconoWhatsapp />
            WhatsApp
          </BotonWhatsApp>
          <BotonLlamada telefono={telefono} className={cn(contorno, BOTON)}>
            <IconoTelefono />
            Llamar<span className="sr-only"> al {telefonoVisible(telefono)}</span>
          </BotonLlamada>
        </>
      ) : (
        <BotonLlamada telefono={telefono} className={cn(relleno, BOTON)}>
          <IconoTelefono />
          Llamar · {telefonoVisible(telefono)}
        </BotonLlamada>
      )}
    </div>
  );
}
