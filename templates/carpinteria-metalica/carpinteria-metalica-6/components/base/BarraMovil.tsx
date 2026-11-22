import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsapp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, solo sale «Llamar» a todo el ancho. */
  whatsapp?: string;
  /** Mensaje precargado (`mensajeInicio(config.contacto)` en todas las páginas). */
  mensaje: string;
  className?: string;
};

const BOTON =
  "boton flex min-h-12 flex-1 items-center justify-center gap-2 rounded-boton border-2 border-primario px-3 text-base leading-none font-bold no-underline";

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), variante `dos` con WhatsApp primero
 * (tipo proyecto), reestilada en «Fachada nueva» (encargo §3): dos pastillas de 48 px sobre blanco
 * con una sombra suave arriba (estática). WhatsApp relleno y Llamar con contorno. Sin WhatsApp,
 * «Llamar» relleno a todo el ancho. Oculta desde `lg`; el pie reserva su altura.
 */
export function BarraMovil({ telefono, whatsapp, mensaje, className }: Props) {
  return (
    <nav
      aria-label="Contacto rápido"
      className={cn(
        "barra-movil fixed inset-x-0 bottom-0 z-40 flex gap-2 bg-superficie px-3 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] shadow-[0_-6px_18px_-10px_rgb(0_0_0/0.25)] lg:hidden",
        className,
      )}
    >
      {whatsapp ? (
        <>
          <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(BOTON, "bg-primario text-sobre-primario hover:border-primario-hover hover:bg-primario-hover")}>
            <IconoWhatsapp />
            WhatsApp
          </BotonWhatsApp>
          <BotonLlamada telefono={telefono} className={cn(BOTON, "bg-superficie text-texto hover:bg-primario-suave")}>
            <IconoTelefono />
            Llamar<span className="sr-only"> al {telefonoVisible(telefono)}</span>
          </BotonLlamada>
        </>
      ) : (
        <BotonLlamada telefono={telefono} className={cn(BOTON, "bg-primario text-sobre-primario hover:border-primario-hover hover:bg-primario-hover")}>
          <IconoTelefono />
          Llamar · {telefonoVisible(telefono)}
        </BotonLlamada>
      )}
    </nav>
  );
}
