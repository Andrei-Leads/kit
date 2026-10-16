import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";
import { MessageCircle, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { telefonoVisible, type Ancla } from "@/lib/formato";
import { textos } from "@/lib/textos";
import { BarraMovilInterior } from "./BarraMovilInterior";

type Props = {
  items: Ancla[];
  telefono: string;
  whatsapp?: string;
  /** Mensaje general en todas las páginas (decisión 5 de Ysst). */
  mensaje: string;
  email: string;
  horario: { dias: string; horas: string }[];
};

/**
 * Barra combinada del pie (ver BarraMovilInterior). Componente de servidor: renderiza aquí los
 * `BotonLlamada` y `BotonWhatsApp` y los pasa ya hechos a la parte cliente, para que core (y zod)
 * no entren en el JavaScript del navegador.
 */
export function BarraMovil({ items, telefono, whatsapp, mensaje, email, horario }: Props) {
  return (
    <BarraMovilInterior
      items={items}
      email={email}
      horario={horario}
      llamada={
        <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "barraLlamar" })}>
          <Phone aria-hidden="true" strokeWidth={2} strokeLinejoin="round" className="size-5 flex-none" />
          <span>{textos.llamar}</span>
        </BotonLlamada>
      }
      whatsapp={
        whatsapp && (
          <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={buttonVariants({ variant: "barraWhatsapp" })}>
            <MessageCircle aria-hidden="true" strokeWidth={1.75} strokeLinejoin="round" className="size-5 flex-none" />
            <span>{textos.whatsapp}</span>
          </BotonWhatsApp>
        )
      }
      llamadaMenu={
        <BotonLlamada telefono={telefono} className={`${buttonVariants({ variant: "llamadaAcento" })} w-full`}>
          <Phone aria-hidden="true" strokeWidth={2} strokeLinejoin="round" className="size-5 flex-none" />
          <span>
            {textos.llamanos}: {telefonoVisible(telefono)}
          </span>
        </BotonLlamada>
      }
    />
  );
}
