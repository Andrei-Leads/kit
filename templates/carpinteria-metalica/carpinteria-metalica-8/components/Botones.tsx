import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsApp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Contacto = Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;

type Props = {
  contacto: Contacto;
  mensaje: string;
  /** Texto del botón de WhatsApp. */
  textoWhatsapp?: string;
  /** Texto del botón de llamada (por defecto «Llamar · {teléfono}»). */
  textoLlamar?: ReactNode;
  /** "claro": guijarro + tierra. "sobre": sobre el guijarro primario del CTA final. */
  tono?: "claro" | "sobre";
  /** 56 px (hero, CTA, configurador) o 52 px. */
  grande?: boolean;
  /** En móvil, a todo el ancho y apilados. */
  apilar?: boolean;
  iconoLlamar?: boolean;
  className?: string;
};

/**
 * Pareja de CTAs (encargo §3): [WhatsApp en `boton-guijarro`] + [Llamar en `boton-tierra`]. En móvil,
 * uno debajo del otro y a todo el ancho; en escritorio, en fila. Sin WhatsApp, Llamar ocupa su sitio
 * sin dejar hueco (pasa a relleno).
 */
export function Pareja({ contacto, mensaje, textoWhatsapp = "Cuéntanos qué necesitas", textoLlamar, tono = "claro", grande, apilar = true, iconoLlamar = true, className }: Props) {
  const wa = !!contacto.whatsapp;
  const claseWa = tono === "sobre" ? "boton-sobre" : "boton-guijarro";
  const claseLlamar = tono === "sobre" ? (wa ? "boton-sobre-contorno" : "boton-sobre") : wa ? "boton-tierra" : "boton-guijarro";
  return (
    <div className={cn("flex flex-wrap gap-3", apilar && "max-lg:flex-col", className)}>
      {contacto.whatsapp && (
        <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className={cn("boton", grande && "boton-grande", claseWa, apilar && "max-lg:w-full")}>
          <IconoWhatsApp tamano={grande ? 21 : 20} />
          {textoWhatsapp}
        </BotonWhatsApp>
      )}
      <BotonLlamada telefono={contacto.telefono} className={cn("boton", grande && "boton-grande", claseLlamar, apilar && "max-lg:w-full")}>
        {iconoLlamar && <IconoTelefono tamano={19} />}
        <span>{textoLlamar ?? <>Llamar ·&nbsp;{telefonoVisible(contacto.telefono)}</>}</span>
      </BotonLlamada>
    </div>
  );
}
