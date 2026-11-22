import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsapp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, «Llamar al {teléfono}» a todo el ancho. */
  whatsapp?: string;
  /** Mensaje general en todas las páginas. */
  mensaje: string;
};

const BOTON = "boton min-h-14 flex-1 basis-0 gap-2 px-3";

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), variante `dos` con
 * WhatsApp primero (tipo proyecto), reestilada en «Oficio» (encargo §5.2): 56 px +
 * zona segura, papel opaco con filete superior, icono + texto. Oculta desde `lg`.
 * Nunca se esconde. El pie deja su altura libre al final.
 */
export function BarraMovil({ telefono, whatsapp, mensaje }: Props) {
  return (
    <div
      className="barra-movil fixed inset-x-0 bottom-0 z-[55] flex gap-2 border-t border-borde bg-fondo px-2 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] lg:hidden"
      data-tono="claro"
    >
      {whatsapp ? (
        <>
          <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(BOTON, "b-primario")}>
            <IconoWhatsapp />
            WhatsApp
          </BotonWhatsApp>
          <BotonLlamada telefono={telefono} className={cn(BOTON, "b-tinta")}>
            <IconoTelefono />
            Llamar
            <span className="sr-only"> al {telefonoVisible(telefono)}</span>
          </BotonLlamada>
        </>
      ) : (
        <BotonLlamada telefono={telefono} className={cn(BOTON, "b-primario")}>
          <IconoTelefono />
          Llamar al {telefonoVisible(telefono)}
        </BotonLlamada>
      )}
    </div>
  );
}
