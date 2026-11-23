import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoWhatsapp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, Llamar a todo el ancho. */
  whatsapp?: string;
  /** Mensaje precargado (el general en todas las páginas). */
  mensaje: string;
  className?: string;
};

const BOTON =
  "ft flex min-h-14 flex-1 items-center justify-center gap-2 px-3 text-xl tracking-[0.04em] no-underline focus-visible:-outline-offset-[5px] active:translate-y-px motion-reduce:active:translate-y-0";

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), variante `dos` con WhatsApp primero
 * (tipo proyecto), reestilada para «Galería» (barra-ancho): botones cuadrados de 56 px, WhatsApp
 * negro y Llamar sobre papel, línea superior de 2 px. Visible por debajo de 1024 px (la cabecera de
 * móvil no lleva WhatsApp). Entra desde abajo con @starting-style. El layout reserva su altura.
 */
export function BarraMovil({ telefono, whatsapp, mensaje, className }: Props) {
  return (
    <nav
      aria-label="Contacto rápido"
      className={cn("barra-entra fixed inset-x-0 bottom-0 z-40 flex border-t-2 border-borde bg-fondo pb-[env(safe-area-inset-bottom)] lg:hidden", className)}
    >
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(BOTON, "bg-texto text-white [@media(hover:hover)]:hover:bg-hover-tinta")}>
          <IconoWhatsapp className="size-5 flex-none" />
          WhatsApp
        </BotonWhatsApp>
      )}
      <BotonLlamada telefono={telefono} className={cn(BOTON, "bg-fondo text-texto [@media(hover:hover)]:hover:bg-hover-claro")}>
        Llamar
        <span className="sr-only"> al {telefonoVisible(telefono)}</span>
      </BotonLlamada>
    </nav>
  );
}
