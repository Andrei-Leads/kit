import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp, type SiteConfig } from "@andrei-leads/core";

import { IconoWhatsApp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Contacto = Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;

type Props = {
  contacto: Contacto;
  mensaje: string;
  /** Texto del botón de WhatsApp (corto: el servicio o el trabajo van en el mensaje). */
  textoWhatsapp?: string;
  textoLlamar?: ReactNode;
  /**
   * "oxido": sobre el fondo de color (WhatsApp `boton-hierro` + Llamar `boton-contorno`).
   * "hierro": sobre hierro (WhatsApp `boton-chispa` + Llamar `boton-contorno-claro`).
   */
  sobre?: "oxido" | "hierro";
  /** Sin icono en el WhatsApp (botones de servicio y de obra, como en el diseño). */
  sinIcono?: boolean;
  className?: string;
};

/**
 * Pareja de CTAs (mapa de CTAs de la entrega): WhatsApp principal + Llamar igual de visible. En
 * móvil, uno encima de otro; en cuanto caben (240 px cada uno), en fila. Sin WhatsApp, «Llamar»
 * pasa a relleno y ocupa el sitio de los dos.
 */
export function Pareja({ contacto, mensaje, textoWhatsapp = "Mándanos una foto", textoLlamar = "Llamar", sobre = "oxido", sinIcono, className }: Props) {
  const conWa = !!contacto.whatsapp;
  const claseWa = sobre === "oxido" ? "boton-hierro" : "boton-chispa";
  const claseLlamar = conWa ? (sobre === "oxido" ? "boton-contorno" : "boton-contorno-claro") : claseWa;
  return (
    <div className={cn("grid max-w-[620px] grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-3 gap-y-2", className)}>
      {contacto.whatsapp && (
        <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className={cn("boton", claseWa)}>
          {!sinIcono && <IconoWhatsApp />}
          {textoWhatsapp}
        </BotonWhatsApp>
      )}
      <BotonLlamada telefono={contacto.telefono} className={cn("boton self-end", claseLlamar)}>
        {textoLlamar}
      </BotonLlamada>
    </div>
  );
}
