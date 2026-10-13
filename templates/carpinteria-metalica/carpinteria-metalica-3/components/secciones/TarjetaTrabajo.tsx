import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";
import { MessageCircle, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { telefonoVisible } from "@/lib/formato";

type Props = {
  telefono: string;
  whatsapp?: string;
  /** Mensaje de WhatsApp de este trabajo (`mensajeTrabajo`). */
  mensaje: string;
};

/** Tarjeta «¿Quieres algo parecido?» de la página de un trabajo. */
export function TarjetaTrabajo({ telefono, whatsapp, mensaje }: Props) {
  return (
    <div className="flex flex-col gap-2.5 rounded-md border-2 border-tinta bg-tarjeta p-4 shadow-placa">
      <h2 className="m-0 text-[22px] leading-[1.2] font-extrabold">¿Quieres algo parecido?</h2>
      <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "llamadaTrabajo" })}>
        <Phone aria-hidden="true" className="size-6" />
        <span>{telefonoVisible(telefono)}</span>
      </BotonLlamada>
      {whatsapp && (
        <BotonWhatsApp
          numero={whatsapp}
          mensaje={mensaje}
          className={buttonVariants({ variant: "whatsappSecundario" })}
        >
          <MessageCircle aria-hidden="true" className="size-5" />
          <span>Escribir por WhatsApp</span>
        </BotonWhatsApp>
      )}
    </div>
  );
}
