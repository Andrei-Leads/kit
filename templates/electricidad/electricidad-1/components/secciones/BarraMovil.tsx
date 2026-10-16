import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";
import { MessageCircle, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

type Props = {
  telefono: string;
  whatsapp?: string;
  mensaje: string;
};

/**
 * Barra inferior (solo < 768 px): Llamar (relleno) | WhatsApp (contorno). Sin WhatsApp,
 * Llamar a todo el ancho. Sticky y último hijo del body: flota sobre el contenido y, al final,
 * queda debajo del pie sin taparlo. Entra con translateY al cargar (animate-barra: CSS puro,
 * sin JS; con «reducir movimiento» está visible desde el inicio).
 */
export function BarraMovil({ telefono, whatsapp, mensaje }: Props) {
  return (
    <div className="animate-barra sticky bottom-0 z-30 flex gap-2 bg-papel px-3 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] shadow-barra md:hidden">
      <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "barraLlamar" })}>
        <Phone aria-hidden="true" strokeWidth={2} strokeLinejoin="round" className="size-5 flex-none" />
        <span>Llamar</span>
      </BotonLlamada>
      {whatsapp && (
        <BotonWhatsApp
          numero={whatsapp}
          mensaje={mensaje}
          className={buttonVariants({ variant: "barraWhatsapp" })}
        >
          <MessageCircle aria-hidden="true" strokeWidth={2} strokeLinejoin="round" className="size-5 flex-none" />
          <span>WhatsApp</span>
        </BotonWhatsApp>
      )}
    </div>
  );
}
