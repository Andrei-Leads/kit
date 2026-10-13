import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";
import { MessageCircle } from "lucide-react";

import { ContenidoLlamada } from "@/components/ContenidoLlamada";
import { buttonVariants } from "@/components/ui/button";

type Props = {
  telefono: string;
  whatsapp?: string;
  /** Mensaje de WhatsApp según la página (general, servicio, trabajo). */
  mensaje: string;
};

/** Banda final sobre primario. */
export function CtaFinal({ telefono, whatsapp, mensaje }: Props) {
  return (
    <section className="foco-claro bg-primario py-10 text-sobre-primario md:py-[88px]">
      <div className="contenedor grid items-center gap-x-14 gap-y-6 md:grid-cols-2">
        <h2 className="m-0 text-[28px] leading-[1.1] font-extrabold tracking-[-0.01em] text-balance md:text-[46px]">
          ¿Se te ha quedado la casa o el local abierto?
        </h2>
        <div className="flex flex-col gap-2.5">
          <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "llamadaHeroBlanca" })}>
            <ContenidoLlamada telefono={telefono} tamanoNumero="31" blanco />
          </BotonLlamada>
          {whatsapp && (
            <BotonWhatsApp
              numero={whatsapp}
              mensaje={mensaje}
              className={buttonVariants({ variant: "whatsappContornoBlanco" })}
            >
              <MessageCircle aria-hidden="true" className="size-5" />
              <span>Escribir por WhatsApp</span>
            </BotonWhatsApp>
          )}
        </div>
      </div>
    </section>
  );
}
