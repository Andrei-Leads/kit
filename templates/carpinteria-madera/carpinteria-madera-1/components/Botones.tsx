import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoWhatsapp } from "@/components/Iconos";
import { TEXTO_WHATSAPP } from "@/lib/mensajes";
import type { DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

/*
 * Variantes de botón de «Veta» (entrega, «Variantes de botón»). Todas son `className` de
 * BotonLlamada / BotonWhatsApp de core: rectas (radio 0), relleno de primario con texto en
 * sobre-primario (core lo recalcula), contorno de 2 px de tinta, o superficie sobre foto con velo.
 * Hover solo con puntero (`hover:` de Tailwind v4 ya va dentro de `@media (hover: hover)`),
 * pulsado translateY(1px) scale(.98) y halo hueso de 7 px al enfocar (clase `boton`, globals.css).
 */
const BASE = "boton inline-flex items-center justify-center gap-2.5 text-center leading-tight font-semibold no-underline";

/** hero-relleno: primario relleno (CTA principal). */
export const relleno = cn(BASE, "bg-primario text-sobre-primario hover:bg-primario-hover");
/** hero-contorno / cabecera-compacto / estancia-texto: 2 px de tinta sobre el papel. */
export const contorno = cn(BASE, "border-2 border-texto text-texto hover:bg-alterna");
/** cta-claro: superficie sobre foto con velo (hero de escritorio, CTA final). */
export const claro = cn(BASE, "bg-superficie text-texto hover:bg-alterna");

/** 56 px y 17 px (hero, parejas). */
export const grande = "min-h-14 px-6 text-[17px]";
/** cabecera-compacto: 48 px y 15 px. */
export const compacto = "min-h-12 px-4 text-[15px]";

type PropsPareja = {
  cta: DatosCta;
  /** Texto del botón de WhatsApp. */
  textoWhatsapp?: ReactNode;
  /** Sobre foto con velo: Llamar en `claro` en lugar de `contorno`. */
  sobreFoto?: boolean;
  className?: string;
};

/**
 * Pareja de CTA (entrega, pieza «ParCTA»): WhatsApp relleno (más ancho) + «Llamar · {teléfono}»
 * con contorno (o claro sobre foto), en fila si caben. Sin WhatsApp, Llamar ocupa todo el ancho
 * relleno de primario, sin hueco.
 */
export function Pareja({ cta, textoWhatsapp = TEXTO_WHATSAPP, sobreFoto, className }: PropsPareja) {
  const { telefono, whatsapp, mensaje } = cta;
  return (
    <div className={cn("flex w-full max-w-[680px] flex-wrap gap-3", className)}>
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(relleno, grande, "flex-[1.4_1_250px]")}>
          <IconoWhatsapp />
          <span>{textoWhatsapp}</span>
        </BotonWhatsApp>
      )}
      <BotonLlamada
        telefono={telefono}
        className={cn(whatsapp ? (sobreFoto ? claro : contorno) : relleno, grande, whatsapp ? "flex-[1_1_210px]" : "flex-[1_1_100%]")}
      >
        Llamar · {telefonoVisible(telefono)}
      </BotonLlamada>
    </div>
  );
}
