import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";

import { IconoWhatsapp } from "@/components/Iconos";
import { RESPUESTA } from "@/lib/mensajes";
import { textoLlamar, type Confianza } from "@/lib/textos";
import { cn } from "@/lib/utils";

export type DatosCta = { telefono: string; whatsapp?: string; mensaje: string };

const ALTO = { 48: "min-h-12", 56: "min-h-14", 64: "min-h-16" } as const;

type Props = {
  cta: DatosCta;
  textoWhatsapp: ReactNode;
  /** Por defecto, «Llamar al {número}». */
  textoLlamar?: ReactNode;
  /** «oscuro»: sobre tinta o sobre el pano (Llamar en contorno de 2 px, WhatsApp con borde claro). */
  tono?: "claro" | "oscuro";
  tamano?: 48 | 56 | 64;
  /** En móvil, uno encima del otro a todo el ancho (hero y heros interiores). */
  apilar?: boolean;
  /** Botón de llamada con el número en Hanken 300 a 28 px (`boton-telefono`, /contacto). */
  telefonoGrande?: boolean;
  confianza?: Confianza;
  className?: string;
};

/**
 * Pieza propia `ParejaCta` (encargo §8): `BotonWhatsApp` (principal, relleno de primario)
 * + `BotonLlamada` (relleno de tinta sobre claro; contorno de 2 px sobre tinta), siempre
 * con texto, y la línea de confianza debajo. Sin WhatsApp, «Llamar» ocupa el sitio de
 * los dos. De servidor (0 KB de JS). Las parejas no se animan nunca.
 */
export function ParejaCta({ cta, textoWhatsapp, textoLlamar: tl, tono = "claro", tamano = 48, apilar, telefonoGrande, confianza: conf, className }: Props) {
  // Sin WhatsApp, la línea de WhatsApp no tiene sentido.
  const confianza = !cta.whatsapp && conf?.texto === RESPUESTA ? undefined : conf;
  const oscuro = tono === "oscuro";
  const alto = ALTO[tamano];
  const pad = tamano >= 56 ? "px-[26px] lg:px-[30px]" : "px-[22px]";
  const ancho = apilar ? "max-lg:w-full" : "flex-[1_1_auto] lg:flex-none";
  return (
    <div className={cn("w-full", className)}>
      <div className={cn("flex gap-2", apilar ? "flex-wrap max-lg:flex-col" : "flex-wrap", !cta.whatsapp && "lg:max-w-[560px]")}>
        {cta.whatsapp && (
          <BotonWhatsApp numero={cta.whatsapp} mensaje={cta.mensaje} className={cn("boton boton-wa", alto, pad, ancho, oscuro && "sobre-tinta")}>
            <IconoWhatsapp />
            <span>{textoWhatsapp}</span>
          </BotonWhatsApp>
        )}
        <BotonLlamada
          telefono={cta.telefono}
          className={cn("boton boton-llamar", alto, pad, cta.whatsapp ? ancho : "w-full flex-1", oscuro && "sobre-tinta")}
        >
          <span className={cn(telefonoGrande && "fino text-[28px] leading-none")}>{tl ?? textoLlamar(cta.telefono)}</span>
        </BotonLlamada>
      </div>
      {confianza && (
        <p className={cn("m-0 mt-3 text-sm leading-normal", oscuro ? "text-sobre-tinta-suave" : "text-texto-suave")}>
          {confianza.href ? (
            <a href={confianza.href} target="_blank" rel="noopener noreferrer" className="relative underline decoration-1 underline-offset-4 before:absolute before:inset-x-0 before:-inset-y-3.5 before:content-['']">
              {confianza.texto}
            </a>
          ) : (
            confianza.texto
          )}
        </p>
      )}
    </div>
  );
}
