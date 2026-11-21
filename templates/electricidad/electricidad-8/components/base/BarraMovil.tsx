import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoBocadillo, IconoTelefono } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, solo sale Llamar a todo el ancho. */
  whatsapp?: string;
  /** Mensaje precargado (el general en todas las páginas). */
  mensaje: string;
  /** «Llamar» o «Llamar 24 h». */
  textoLlamar?: string;
  className?: string;
};

const BOTON =
  "flex min-h-14 flex-1 items-center justify-center gap-2 px-3 text-base font-semibold focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-foco";

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), variante `dos` reestilada (encargo §3):
 * `barra-llamar` en noche relleno y `barra-whatsapp` en superficie con borde. Oculta desde `md`.
 * Entra desde abajo al cargar (`.barra-entra`, sin entrada con «reducir movimiento»).
 */
export function BarraMovil({ telefono, whatsapp, mensaje, textoLlamar = "Llamar", className }: Props) {
  return (
    <nav
      aria-label="Contacto rápido"
      className={cn(
        "barra-entra fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-linea-plano bg-fondo p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] md:hidden",
        className,
      )}
    >
      <BotonLlamada telefono={telefono} className={cn(BOTON, "bg-noche text-noche-texto active:bg-[color-mix(in_oklab,var(--color-noche)_80%,black)]")}>
        <IconoTelefono />
        {textoLlamar}
        <span className="sr-only"> al {telefonoVisible(telefono)}</span>
      </BotonLlamada>
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(BOTON, "border border-texto bg-superficie text-texto active:bg-alterna")}>
          <IconoBocadillo />
          WhatsApp
        </BotonWhatsApp>
      )}
    </nav>
  );
}
