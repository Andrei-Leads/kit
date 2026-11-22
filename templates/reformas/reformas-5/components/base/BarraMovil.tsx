import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoWhatsapp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, solo sale «Llamar · número» a todo el ancho. */
  whatsapp?: string;
  /** Mensaje precargado (`mensajeInicio(config.contacto)` en todas las páginas). */
  mensaje: string;
  className?: string;
};

const BOTON =
  "boton flex min-h-[52px] items-center justify-center gap-2 rounded-boton text-base font-semibold no-underline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-foco";

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), variante `dos` con
 * `primero="whatsapp"` (tipo proyecto), reestilada en «Tu casa»: píldoras sobre
 * superficie, WhatsApp ancho (flex 1,35) en primario y Llamar con contorno de tinta.
 * Oculta desde `lg`. El layout reserva su altura al final del `<body>`.
 */
export function BarraMovil({ telefono, whatsapp, mensaje, className }: Props) {
  return (
    <div
      className={cn(
        "barra-movil fixed inset-x-0 bottom-0 z-40 flex gap-2.5 border-t border-borde bg-superficie/97 px-3 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgb(43_35_29/0.08)] lg:hidden",
        className,
      )}
    >
      {whatsapp ? (
        <>
          <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(BOTON, "flex-[1.35] bg-primario text-sobre-primario")}>
            <IconoWhatsapp tamano={19} />
            WhatsApp
          </BotonWhatsApp>
          <BotonLlamada telefono={telefono} className={cn(BOTON, "flex-1 border-2 border-texto text-texto")}>
            Llamar
            <span className="sr-only"> al {telefonoVisible(telefono)}</span>
          </BotonLlamada>
        </>
      ) : (
        <BotonLlamada telefono={telefono} className={cn(BOTON, "flex-1 bg-primario text-sobre-primario")}>
          Llamar · {telefonoVisible(telefono)}
        </BotonLlamada>
      )}
    </div>
  );
}
