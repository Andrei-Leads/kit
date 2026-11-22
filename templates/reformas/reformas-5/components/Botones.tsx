import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsapp } from "@/components/Iconos";
import { TEXTO_WHATSAPP } from "@/lib/mensajes";
import { textoLlamar, type DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

/*
 * Variantes de botón de «Tu casa» (tablero §12). Todas son `className` de
 * BotonLlamada / BotonWhatsApp de core. Píldora siempre; Llamar nunca es un
 * enlace de texto (contorno de 2 px o relleno). `.boton` (globals.css) añade el
 * pulsado (scale .97).
 */
const BASE = "boton inline-flex items-center justify-center gap-2.5 rounded-boton text-center leading-tight font-semibold no-underline";

/** wa-hero / cta-wa: píldora clara (superficie) de 56 px sobre vídeo, foto o primario. */
export const waClaro = cn(BASE, "min-h-14 bg-superficie px-[30px] text-lg text-texto hover:bg-white active:bg-[#efe6da]");
/** llamar-hero / cta-llamar: contorno blanco 2 px sobre vídeo o foto. */
export const llamarBlanco = cn(BASE, "min-h-[52px] border-2 border-white px-[26px] text-[17px] text-white hover:bg-white/14 active:bg-white/24");
/** cta-llamar: contorno sobre-primario dentro del arco primario. */
export const llamarSobrePrimario = cn(
  BASE,
  "min-h-[52px] border-2 border-sobre-primario px-6 text-[17px] text-sobre-primario hover:bg-sobre-primario/14",
);
/** wa-primario: relleno primario con sobre-primario (fuera de vídeo y primario). */
export const waPrimario = cn(BASE, "min-h-14 bg-primario px-7 text-lg text-sobre-primario hover:bg-primario-hover");
/** llamar-contorno: contorno de tinta 2 px; al pasar, relleno de tinta. */
export const llamarContorno = cn(BASE, "min-h-[52px] border-2 border-texto px-6 text-[17px] text-texto hover:bg-texto hover:text-superficie");

type PropsPareja = {
  cta: DatosCta;
  /** Frase encima de los botones (p. ej. «¿Te imaginas la tuya?…»). */
  nota?: ReactNode;
  textoWhatsapp?: ReactNode;
  alinear?: "centro" | "inicio";
  className?: string;
};

/**
 * Pareja de CTA (TuCasaPareja): WhatsApp en primario + «Llamar · número» con
 * contorno, cada uno de 260 px como mínimo y en fila si caben. Sin WhatsApp,
 * Llamar pasa a primario y ocupa su sitio, sin hueco.
 */
export function Pareja({ cta, nota, textoWhatsapp = TEXTO_WHATSAPP, alinear = "centro", className }: PropsPareja) {
  const { telefono, whatsapp, mensaje } = cta;
  const centro = alinear === "centro";
  return (
    <div className={cn("flex w-full flex-col gap-4", centro ? "items-center text-center" : "items-start text-left", className)}>
      {nota && <p className="remate m-0 text-lg leading-snug text-balance">{nota}</p>}
      <div className={cn("flex w-full max-w-[640px] flex-wrap gap-3", centro && "justify-center")}>
        {whatsapp ? (
          <>
            <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(waPrimario, "flex-[1_1_260px]")}>
              <IconoWhatsapp />
              <span>{textoWhatsapp}</span>
            </BotonWhatsApp>
            <BotonLlamada telefono={telefono} className={cn(llamarContorno, "flex-[1_1_260px]")}>
              <IconoTelefono />
              <span>{textoLlamar(telefono)}</span>
            </BotonLlamada>
          </>
        ) : (
          <BotonLlamada telefono={telefono} className={cn(waPrimario, "flex-[1_1_260px]")}>
            <IconoTelefono />
            <span>{textoLlamar(telefono)}</span>
          </BotonLlamada>
        )}
      </div>
    </div>
  );
}
