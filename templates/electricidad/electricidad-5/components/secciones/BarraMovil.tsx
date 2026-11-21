import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsapp } from "@/components/Iconos";

type Props = {
  telefono: string;
  whatsapp?: string;
  /** Mensaje general (el mismo en todas las páginas). */
  mensaje: string;
  textoLlamada: string;
};

const PASTILLA = "boton flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-boton px-3 text-base font-bold no-underline";

/**
 * Barra móvil, variante `dos` con pastillas (pieza base `BarraMovil`
 * reestilada): barra-llamar (primario relleno) y barra-whatsapp (superficie con
 * borde 2 px en texto). Sin WhatsApp, Llamar ocupa todo el ancho. Oculta desde
 * 768 px. Entra desde abajo al cargar (globals.css, `.barra-movil`). El layout
 * reserva su altura al final del <body>.
 */
export function BarraMovil({ telefono, whatsapp, mensaje, textoLlamada }: Props) {
  return (
    <nav aria-label="Contacto rápido" className="barra-movil fixed inset-x-0 bottom-0 z-40 flex gap-2.5 bg-fondo/95 px-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-[0_-6px_24px_color-mix(in_srgb,var(--color-texto)_12%,transparent)] md:hidden">
      <BotonLlamada telefono={telefono} className={`${PASTILLA} bg-primario text-sobre-primario hover:bg-pleno-hover`}>
        <IconoTelefono />
        {textoLlamada}
        <span className="sr-only"> al {telefonoVisible(telefono)}</span>
      </BotonLlamada>
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={`${PASTILLA} border-2 border-texto bg-superficie text-texto hover:bg-alterna`}>
          <IconoWhatsapp />
          WhatsApp
        </BotonWhatsApp>
      )}
    </nav>
  );
}
