import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";
import { MessageCircle } from "lucide-react";

import { ContenidoLlamada } from "@/components/ContenidoLlamada";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  whatsapp?: string;
  mensaje: string;
  precioDesde?: string;
  horario?: string;
  className?: string;
};

/** Tarjeta de contacto de un servicio: precio orientativo, llamar y WhatsApp. */
export function TarjetaCtaServicio({ telefono, whatsapp, mensaje, precioDesde, horario, className }: Props) {
  return (
    <aside
      className={cn(
        "foco-claro flex flex-col gap-2.5 rounded-md border-2 border-tinta bg-tarjeta p-4 shadow-placa",
        className
      )}
    >
      {precioDesde && (
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[15px] text-tinta-suave">Precio orientativo</span>
          <strong className="text-[22px] font-extrabold tabular-nums">{precioDesde}</strong>
        </div>
      )}
      <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "llamadaServicio" })}>
        <ContenidoLlamada telefono={telefono} tamanoNumero="29" />
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
      {horario && <p className="m-0 text-sm text-tinta-suave">{horario}</p>}
    </aside>
  );
}
