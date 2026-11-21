import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp, type SiteConfig } from "@andrei-leads/core";

import { IconoCamara, IconoClip, IconoTelefono } from "@/components/Iconos";
import { llamarConNumero } from "@/lib/textos";
import { cn } from "@/lib/utils";

/*
 * Variantes de botón con nombre (encargo §3). Todas son pastillas (--radius-boton) con foco de 2 px.
 *   llamada-burbuja   primario, 56 px, a todo el ancho en móvil, «Llamar · número».
 *   whatsapp-suave    superficie con borde e icono de cámara («Mándanos una foto»).
 *   whatsapp-cta      CTA final: primario al 22 % sobre superficie, icono de clip.
 *   respuesta-rapida  borde de 1,5 px en --color-borde-respuesta, 44 px (clase RESPUESTA).
 */
export const PASTILLA =
  "pulsable inline-flex items-center justify-center gap-2.5 rounded-boton text-center font-extrabold no-underline";

export const LLAMADA_BURBUJA = cn(
  PASTILLA,
  "min-h-14 px-6 text-lg whitespace-nowrap bg-primario text-sobre-primario hover:bg-primario-hover",
);
export const WHATSAPP_SUAVE = cn(
  PASTILLA,
  "min-h-13 px-5 text-[17px] whitespace-nowrap border-[1.5px] border-borde bg-superficie text-texto hover:bg-burbuja-sale",
);
export const WHATSAPP_SUAVE_PEQUENO = cn(
  PASTILLA,
  "min-h-11 px-4 text-[15px] border-[1.5px] border-borde bg-superficie text-texto hover:bg-burbuja-sale",
);
export const RESPUESTA =
  "pulsable inline-flex min-h-11 max-w-[280px] items-center rounded-boton border-[1.5px] border-borde-respuesta bg-superficie px-4 py-2.5 text-left text-base leading-tight font-semibold text-texto no-underline hover:bg-burbuja-sale";

type Contacto = Pick<SiteConfig["contacto"], "telefono" | "urgencias24h">;

export function LlamadaBurbuja({ contacto, className }: { contacto: Contacto; className?: string }) {
  return (
    <BotonLlamada telefono={contacto.telefono} className={cn(LLAMADA_BURBUJA, className)}>
      <IconoTelefono />
      {llamarConNumero(contacto)}
    </BotonLlamada>
  );
}

export function WhatsappSuave({
  numero,
  mensaje,
  children = "Mándanos una foto",
  pequeno,
  className,
}: {
  numero: string;
  mensaje: string;
  children?: ReactNode;
  pequeno?: boolean;
  className?: string;
}) {
  return (
    <BotonWhatsApp numero={numero} mensaje={mensaje} className={cn(pequeno ? WHATSAPP_SUAVE_PEQUENO : WHATSAPP_SUAVE, className)}>
      <IconoCamara tamano={pequeno ? 16 : 19} />
      {children}
      {/* El texto visible no dice WhatsApp: el lector de pantalla sí lo oye. */}
      {!(typeof children === "string" && children.includes("WhatsApp")) && <span className="sr-only"> por WhatsApp</span>}
    </BotonWhatsApp>
  );
}

export function WhatsappCta({ numero, mensaje, className }: { numero: string; mensaje: string; className?: string }) {
  return (
    <BotonWhatsApp
      numero={numero}
      mensaje={mensaje}
      className={cn(PASTILLA, "min-h-14 px-5 text-[17px] leading-tight bg-wa-cta text-texto hover:bg-wa-cta-hover", className)}
    >
      <IconoClip />
      Abrir WhatsApp y adjuntar la foto
    </BotonWhatsApp>
  );
}

/**
 * Pareja Llamar + WhatsApp: la llamada primero y más grande; WhatsApp debajo en móvil y al lado
 * cuando cabe. Sin WhatsApp, la llamada ocupa todo el sitio.
 */
export function ParCta({
  contacto,
  mensaje,
  textoWhatsapp,
  className,
}: {
  contacto: Pick<SiteConfig["contacto"], "telefono" | "urgencias24h" | "whatsapp">;
  mensaje: string;
  textoWhatsapp?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-x-3 gap-y-2.5", className)}>
      <LlamadaBurbuja contacto={contacto} className="flex-[1.4_1_240px]" />
      {contacto.whatsapp && (
        <WhatsappSuave numero={contacto.whatsapp} mensaje={mensaje} className="flex-[1_1_200px]">
          {textoWhatsapp}
        </WhatsappSuave>
      )}
    </div>
  );
}
