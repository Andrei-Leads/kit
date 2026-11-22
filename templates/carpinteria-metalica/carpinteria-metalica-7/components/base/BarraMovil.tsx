import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoWhatsApp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, solo sale «Llamar» a todo el ancho. */
  whatsapp?: string;
  /** Mensaje general (`mensajeInicio`) en todas las páginas. */
  mensaje: string;
  className?: string;
};

const BOTON =
  "flex min-h-12 flex-1 items-center justify-center gap-2 bg-primario px-3 font-titulo text-xl font-extrabold tracking-[0.05em] text-sobre-primario uppercase no-underline focus-visible:outline-3 focus-visible:-outline-offset-6 focus-visible:outline-sobre-primario";

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), reestilada para «Forja» (variante
 * `dos`, tipo proyecto): placa de hierro fija abajo con [WhatsApp] [Llamar] en primario y un corte
 * de 10 px en la esquina exterior de cada botón. Oculta desde 1024 px. Entra desde abajo con
 * `@starting-style` (.barra-movil en globals.css); nunca empieza oculta.
 */
export function BarraMovil({ telefono, whatsapp, mensaje, className }: Props) {
  return (
    <div
      className={cn(
        "barra-movil hierro fixed inset-x-0 bottom-0 z-40 flex gap-2 p-2 pb-[calc(8px+env(safe-area-inset-bottom))] shadow-[0_-1px_0_var(--color-hierro-linea)] lg:hidden",
        className,
      )}
    >
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(BOTON, "[clip-path:polygon(10px_0,100%_0,100%_100%,0_100%,0_10px)]")}>
          <IconoWhatsApp />
          WhatsApp
        </BotonWhatsApp>
      )}
      <BotonLlamada telefono={telefono} className={cn(BOTON, "[clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,0_100%)]")}>
        Llamar
        <span className="sr-only"> al {telefonoVisible(telefono)}</span>
      </BotonLlamada>
    </div>
  );
}
