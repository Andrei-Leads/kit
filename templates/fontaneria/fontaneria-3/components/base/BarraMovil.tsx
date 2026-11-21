import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";
import { MessageCircle, Phone } from "lucide-react";

import { Onda } from "@/components/Onda";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  /** Sin `whatsapp`, Llamar ocupa todo el ancho. */
  whatsapp?: string;
  /** Mensaje precargado (el general en todas las páginas). */
  mensaje: string;
  /** «Llamar 24 h» con urgencias; si no, «Llamar». */
  textoLlamada: string;
  className?: string;
};

const BOTON =
  "boton flex min-h-14 flex-1 items-center justify-center gap-2 border-2 border-texto px-2.5 leading-[1.15] font-bold no-underline";

/**
 * Pieza base del registro (kit/registry/base/BarraMovil.tsx), variante `dos`
 * (Llamar | WhatsApp, urgencias), reestilada para «La furgoneta»: dos piedras de
 * 56 px sobre una barra arena opaca con onda superior de 8 px. Por debajo de
 * 768 px, fija abajo, visible desde el primer pintado y sin animación de entrada
 * (entrega §3 bis). El pie deja su hueco (`pb` del pie en móvil).
 */
export function BarraMovil({ telefono, whatsapp, mensaje, textoLlamada, className }: Props) {
  return (
    <div className={cn("fixed inset-x-0 bottom-0 z-40 md:hidden", className)}>
      <Onda className="-mb-px h-2 text-fondo" />
      <nav aria-label="Contacto rápido" className="flex gap-2 bg-fondo px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        <BotonLlamada telefono={telefono} className={cn(BOTON, "rounded-boton bg-primario text-[1.0625rem] text-sobre-primario")}>
          <Phone aria-hidden="true" strokeWidth={2.2} className="size-5 flex-none" />
          <span>{textoLlamada}</span>
        </BotonLlamada>
        {whatsapp && (
          <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(BOTON, "rounded-barra-wa bg-superficie text-[0.9375rem] text-texto")}>
            <MessageCircle aria-hidden="true" strokeWidth={2.2} className="size-5 flex-none" />
            <span>Escribir por WhatsApp</span>
          </BotonWhatsApp>
        )}
      </nav>
    </div>
  );
}
