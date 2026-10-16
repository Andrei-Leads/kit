import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";
import { MessageCircle, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

type Props = {
  telefono: string;
  whatsapp?: string;
  /** Mensaje general en todas las páginas (brief §7; decisión 5 de Ysst). */
  mensaje: string;
};

/**
 * Barra inferior fija (solo < 1024 px): Llamar (relleno primario) | WhatsApp (contorno), con borde superior
 * en --color-linea. Sin WhatsApp, Llamar ocupa todo el ancho. El Pie reserva 104 px abajo para no quedar
 * tapado. Entra con translateY al cargar (animate-barra, 280 ms, retraso 150 ms): CSS puro, sin JS;
 * con «reducir movimiento» está visible desde el inicio.
 */
export function BarraMovil({ telefono, whatsapp, mensaje }: Props) {
  return (
    <div className="animate-barra fixed inset-x-0 bottom-0 z-30 flex gap-2.5 border-t border-linea bg-noche px-3 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] lg:hidden">
      <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "barraLlamar" })}>
        <Phone aria-hidden="true" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5 flex-none" />
        <span>Llamar</span>
      </BotonLlamada>
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={buttonVariants({ variant: "barraWhatsapp" })}>
          <MessageCircle aria-hidden="true" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5 flex-none" />
          <span>WhatsApp</span>
        </BotonWhatsApp>
      )}
    </div>
  );
}
