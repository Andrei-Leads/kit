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
  "boton flex min-h-12 items-center justify-center gap-2.5 rounded-boton border px-3 text-[15px] leading-none font-semibold no-underline";

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), variante `dos` con
 * `primero="whatsapp"` (tipo proyecto), reestilada en «Antes y después»: sobre superficie con
 * filete arriba, [WhatsApp «Presupuesto»] relleno y [Llamar] con contorno, rectos. Oculta desde
 * `lg`. El pie reserva su altura.
 */
export function BarraMovil({ telefono, whatsapp, mensaje, className }: Props) {
  return (
    <div
      className={cn(
        "barra-movil fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-filete bg-superficie px-4 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] lg:hidden",
        className,
      )}
    >
      {whatsapp ? (
        <>
          <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(BOTON, "border-primario bg-primario text-sobre-primario")}>
            <IconoWhatsapp />
            Presupuesto<span className="sr-only"> por WhatsApp</span>
          </BotonWhatsApp>
          <BotonLlamada telefono={telefono} className={cn(BOTON, "border-primario bg-superficie text-primario-texto")}>
            <IconoTelefono />
            Llamar<span className="sr-only"> al {telefonoVisible(telefono)}</span>
          </BotonLlamada>
        </>
      ) : (
        <BotonLlamada telefono={telefono} className={cn(BOTON, "col-span-2 border-primario bg-primario text-sobre-primario")}>
          <IconoTelefono />
          Llamar al {telefonoVisible(telefono)}
        </BotonLlamada>
      )}
    </div>
  );
}
