import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { relleno } from "@/components/Botones";
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
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), variante `dos` con WhatsApp primero
 * (tipo proyecto), reestilada en «Veta» (entrega, barra-ancho): [WhatsApp] en primario y [Llamar]
 * en tinta, a toda la altura de 56 px, con icono y texto, más el área segura. Oculta desde 1024 px.
 * Entra desde abajo al cargar (globals.css); el pie reserva su altura.
 */
export function BarraMovil({ telefono, whatsapp, mensaje, className }: Props) {
  return (
    <div
      className={cn(
        "barra-movil fixed inset-x-0 bottom-0 z-40 flex border-t border-filete bg-fondo pb-[env(safe-area-inset-bottom)] lg:hidden",
        className,
      )}
    >
      {whatsapp ? (
        <>
          <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(relleno, BOTON)}>
            <IconoWhatsapp />
            WhatsApp
          </BotonWhatsApp>
          <BotonLlamada
            telefono={telefono}
            className={cn("boton inline-flex items-center justify-center font-semibold no-underline", BOTON, "bg-texto text-superficie hover:bg-tinta-hover")}
          >
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
