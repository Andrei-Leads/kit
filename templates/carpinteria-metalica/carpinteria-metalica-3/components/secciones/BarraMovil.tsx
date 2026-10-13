import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";
import { MessageCircle, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

type Props = {
  telefono: string;
  whatsapp?: string;
  mensaje: string;
};

/** Barra fija inferior (solo móvil): Llamar | WhatsApp. Sin WhatsApp, Llamar a todo el ancho. */
export function BarraMovil({ telefono, whatsapp, mensaje }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 bg-tarjeta px-2.5 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] shadow-barra md:hidden">
      <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "barraLlamar" })}>
        <Phone aria-hidden="true" className="size-5" />
        <span>Llamar</span>
      </BotonLlamada>
      {whatsapp && (
        <BotonWhatsApp
          numero={whatsapp}
          mensaje={mensaje}
          className={buttonVariants({ variant: "barraWhatsapp" })}
        >
          <MessageCircle aria-hidden="true" className="size-5" />
          <span>WhatsApp</span>
        </BotonWhatsApp>
      )}
    </div>
  );
}
