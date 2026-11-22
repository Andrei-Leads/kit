import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";

import { IconoWhatsapp } from "@/components/Iconos";
import { TEXTO_WHATSAPP } from "@/lib/mensajes";
import { textoLlamar, type DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

/*
 * Variantes de botón de «Tensión» (encargo §3). Todas son `className` de
 * BotonLlamada / BotonWhatsApp de core: píldora para llamar y WhatsApp, nunca
 * enlace de texto. El relleno de primario es solo para `pildora-senal`.
 */
const BASE =
  "boton inline-flex items-center justify-center gap-2.5 rounded-boton px-5 py-2 text-center leading-tight font-medium no-underline";

/** pildora-senal (56 px): fondo primario, texto sobre-primario. */
export const pildoraSenal = cn(BASE, "min-h-14 bg-primario text-[17px] text-sobre-primario hover:bg-primario-hover");
/** pildora-contorno (56 px): borde de 2 px en texto, número en tabular-nums. */
export const pildoraContorno = cn(BASE, "min-h-14 border-2 border-texto text-[17px] text-texto tabular-nums hover:bg-texto/8");
/** pareja-cierre: las dos anteriores a 48 px. */
const cierre = "min-h-12 text-base";
/** cabecera-llamar / cabecera-whatsapp (44 px). */
export const cabeceraLlamar = cn(BASE, "min-h-11 border-2 border-texto px-4 text-[15px] whitespace-nowrap text-texto tabular-nums hover:bg-texto/8");
export const cabeceraWhatsapp = cn(BASE, "min-h-11 bg-primario px-4 text-[15px] whitespace-nowrap text-sobre-primario hover:bg-primario-hover");

type PropsPareja = {
  cta: DatosCta;
  /** 56 px (hero, pano, CTA final, contacto, 404) o 48 px (pareja-cierre). */
  tamano?: "grande" | "cierre";
  textoWhatsapp?: ReactNode;
  /** Línea de confianza (valoración u horario) bajo la pareja; solo datos reales. */
  confianza?: string;
  /** Sobre foto (pano): la píldora de contorno lleva el velo detrás. */
  velo?: boolean;
  className?: string;
};

/**
 * Pareja de CTA (ParejaCTA): WhatsApp primero en señal + «Llamar al …» en
 * contorno; en fila si caben, una encima de otra en móvil. Sin WhatsApp,
 * Llamar pasa a relleno de primario y ocupa el sitio de los dos, sin hueco.
 */
export function Pareja({ cta, tamano = "grande", textoWhatsapp = TEXTO_WHATSAPP, confianza, velo, className }: PropsPareja) {
  const { telefono, whatsapp, mensaje } = cta;
  const t = tamano === "cierre" ? cierre : "";
  return (
    <div className={cn("flex w-full max-w-[660px] flex-col gap-3", className)}>
      <div className="flex w-full flex-wrap gap-3">
        {whatsapp ? (
          <>
            <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(pildoraSenal, t, "flex-[1.25_1_290px]")}>
              <IconoWhatsapp />
              <span>{textoWhatsapp}</span>
            </BotonWhatsApp>
            <BotonLlamada telefono={telefono} className={cn(pildoraContorno, t, "flex-[1_1_220px]", velo && "bg-[var(--color-velo)] backdrop-blur-[6px]")}>
              {textoLlamar(telefono)}
            </BotonLlamada>
          </>
        ) : (
          <BotonLlamada telefono={telefono} className={cn(pildoraSenal, t, "flex-[1_1_100%] tabular-nums")}>
            {textoLlamar(telefono)}
          </BotonLlamada>
        )}
      </div>
      {confianza && <p className="m-0 text-[13px] leading-snug text-texto-suave">{confianza}</p>}
    </div>
  );
}
