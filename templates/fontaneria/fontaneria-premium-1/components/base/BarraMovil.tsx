import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsapp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, solo Llamar, relleno y a todo el ancho. */
  whatsapp?: string;
  /** Mensaje general (`mensajeInicio(config.contacto)` en todas las páginas). */
  mensaje: string;
  className?: string;
};

const BOTON =
  "boton flex h-14 min-w-0 items-center justify-center gap-2.5 rounded-boton border-2 px-3 text-base leading-none font-medium no-underline";

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), variante `dos`
 * con WhatsApp primero (tipo proyecto), reestilada en «Caudal» (barra-whatsapp /
 * barra-llamar): tinta al 94 % de 72 px, dos píldoras de 56 px; WhatsApp
 * relleno y Llamar con contorno blanco e icono de teléfono. Visible desde el
 * primer pintado, sin animación. Oculta desde `lg` (1024 px).
 */
export function BarraMovil({ telefono, whatsapp, mensaje, className }: Props) {
  return (
    <nav
      aria-label="Contacto rápido"
      className={cn(
        "sobre-tinta fixed inset-x-0 bottom-0 z-40 flex h-[calc(72px+env(safe-area-inset-bottom))] items-start gap-2 border-t border-white/12 bg-tinta/94 px-3 pt-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-[12px] lg:hidden",
        className,
      )}
    >
      {whatsapp ? (
        <>
          <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(BOTON, "flex-[1.3] border-primario bg-primario text-sobre-primario")}>
            <IconoWhatsapp tamano={20} />
            WhatsApp
          </BotonWhatsApp>
          <BotonLlamada telefono={telefono} className={cn(BOTON, "flex-1 border-white text-white")}>
            <IconoTelefono />
            Llamar
            <span className="sr-only"> al {telefonoVisible(telefono)}</span>
          </BotonLlamada>
        </>
      ) : (
        <BotonLlamada telefono={telefono} className={cn(BOTON, "flex-1 border-primario bg-primario text-sobre-primario")}>
          <IconoTelefono />
          Llamar al {telefonoVisible(telefono)}
        </BotonLlamada>
      )}
    </nav>
  );
}
