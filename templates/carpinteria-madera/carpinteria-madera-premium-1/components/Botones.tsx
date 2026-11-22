import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsapp } from "@/components/Iconos";
import { TEXTO_WA } from "@/lib/mensajes";
import type { DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

/*
 * Variantes de botón de «Oficio» (encargo §8.4). Todas son `className` de
 * BotonLlamada / BotonWhatsApp de core; el aspecto y los estados están en
 * globals.css (.boton, .b-primario, .b-papel, .b-tinta, .b-contorno).
 */
export const pildoraHero = "boton b-primario"; // WhatsApp sobre tinta, foto o vídeo
export const pildoraHeroVelo = "boton b-papel"; // Llamar sobre tinta: relleno de papel
export const pildoraClaro = "boton b-primario"; // WhatsApp sobre papel
export const pildoraTinta = "boton b-tinta"; // Llamar sobre papel; WhatsApp del asistente

/** «Llamar al 654 17 39 20». */
export function textoLlamar(telefono: string): string {
  return `Llamar al ${telefonoVisible(telefono)}`;
}

type Props = {
  cta: DatosCta;
  /** Tono del fondo: «claro» = pildora-claro + pildora-tinta; «oscuro» = pildora-hero + pildora-hero-velo. */
  tono: "claro" | "oscuro";
  textoWhatsapp?: string;
  /** Línea de confianza (solo datos): valoración, horario o la frase de WhatsApp. */
  confianza?: string;
  className?: string;
};

/**
 * ParejaCta (encargo §6): WhatsApp primero (más ancho) + Llamar con el número, de
 * 56 px, y la línea de confianza debajo. Sin WhatsApp, Llamar ocupa el sitio de
 * los dos en primario.
 */
export function ParejaCta({ cta, tono, textoWhatsapp = TEXTO_WA, confianza, className }: Props) {
  const { telefono, whatsapp, mensaje } = cta;
  const llamarClase = tono === "oscuro" ? pildoraHeroVelo : pildoraTinta;
  return (
    <div className={cn("flex w-full max-w-[600px] flex-col gap-3", className)}>
      <div className="flex flex-wrap gap-3">
        {whatsapp ? (
          <>
            <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(tono === "oscuro" ? pildoraHero : pildoraClaro, "flex-[1.4_1_220px]")}>
              <IconoWhatsapp />
              <span>{textoWhatsapp}</span>
            </BotonWhatsApp>
            <BotonLlamada telefono={telefono} className={cn(llamarClase, "flex-[1_1_180px] whitespace-nowrap")}>
              <IconoTelefono />
              <span>{textoLlamar(telefono)}</span>
            </BotonLlamada>
          </>
        ) : (
          <BotonLlamada telefono={telefono} className={cn(pildoraHero, "flex-[1_1_100%]")}>
            <IconoTelefono />
            <span>{textoLlamar(telefono)}</span>
          </BotonLlamada>
        )}
      </div>
      {confianza && <p className={cn("m-0 text-sm leading-[1.45]", tono === "oscuro" ? "text-papel-suave" : "text-texto-suave")}>{confianza}</p>}
    </div>
  );
}
