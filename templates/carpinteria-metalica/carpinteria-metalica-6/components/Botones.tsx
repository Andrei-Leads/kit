import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsapp } from "@/components/Iconos";
import { TEXTO_WA } from "@/lib/mensajes";
import type { DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

/*
 * Variantes de botón de «Fachada nueva» (encargo §3 y entrega §3). Todas son `className` de
 * BotonLlamada / BotonWhatsApp de core. Pastillas de 999 px, texto a 700 y contorno de 2 px.
 * Hover de color, foco con el anillo global de 3 px y `scale(.98)` al pulsar (globals.css `.boton`).
 */
const BASE =
  "boton inline-flex items-center justify-center gap-2.5 rounded-boton border-2 border-primario px-[22px] text-center text-[17px] leading-tight font-bold no-underline";

/** `boton-pastilla`: relleno primario, texto en sobre-primario, 52 px. */
export const pastilla = cn(BASE, "min-h-[52px] bg-primario text-sobre-primario hover:border-primario-hover hover:bg-primario-hover");
/** `boton-pastilla-claro`: blanco con contorno primario de 2 px, texto en tinta. */
export const pastillaClara = cn(BASE, "min-h-[52px] bg-superficie text-texto hover:bg-primario-suave");
/** Hero y CTA final: 56 px. */
export const grande = "min-h-14";
/** `boton-chip`: compacto, 44 px de zona táctil (cabecera). */
export const chip =
  "boton inline-flex min-h-11 flex-none items-center gap-2 rounded-boton border-2 border-primario px-3.5 text-[15px] leading-none font-bold whitespace-nowrap no-underline";
export const chipRelleno = cn(chip, "bg-primario text-sobre-primario hover:border-primario-hover hover:bg-primario-hover");
export const chipClaro = cn(chip, "bg-superficie text-texto hover:bg-primario-suave");
/** `enlace-whatsapp`: texto 700 subrayado con el logotipo, 44 px de zona («Quiero este cambio»). */
export const enlaceWhatsapp =
  "boton inline-flex min-h-11 items-center gap-2 font-bold text-primario-texto underline underline-offset-4 decoration-[1.5px]";

type PropsPareja = {
  cta: DatosCta;
  /** Texto del botón de WhatsApp. */
  textoWhatsapp?: ReactNode;
  /** «Llamar · 600 11 14 03» (por defecto) o «Llamar» a secas (asistente). */
  sinNumero?: boolean;
  /** 56 px (hero, CTA final, contacto) en lugar de 52. */
  alto?: boolean;
  /** Hero en móvil: los dos a todo el ancho, uno debajo del otro. */
  apilada?: boolean;
  className?: string;
};

/**
 * Pareja de CTA: `boton-pastilla` de WhatsApp + `boton-pastilla-claro` de llamada, en fila si caben
 * y apilados si no. Sin WhatsApp, Llamar pasa a ser el relleno y ocupa su sitio.
 */
export function Pareja({ cta, textoWhatsapp = TEXTO_WA, sinNumero, alto, apilada, className }: PropsPareja) {
  const { telefono, whatsapp, mensaje } = cta;
  return (
    <div className={cn("flex flex-wrap gap-2.5", apilada && "max-lg:flex-col max-lg:gap-2", className)}>
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(pastilla, alto && grande, "flex-[1_1_240px]", apilada && "max-lg:flex-none lg:flex-none")}>
          <IconoWhatsapp tamano={alto ? 22 : 20} />
          <span>{textoWhatsapp}</span>
        </BotonWhatsApp>
      )}
      <BotonLlamada
        telefono={telefono}
        className={cn(whatsapp ? pastillaClara : pastilla, alto && grande, "flex-[1_1_200px] whitespace-nowrap", apilada && "max-lg:flex-none lg:flex-none")}
      >
        <IconoTelefono tamano={20} />
        {sinNumero ? (
          <span>
            Llamar<span className="sr-only"> al {telefonoVisible(telefono)}</span>
          </span>
        ) : (
          <span>Llamar · {telefonoVisible(telefono)}</span>
        )}
      </BotonLlamada>
    </div>
  );
}
