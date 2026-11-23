import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsapp } from "@/components/Iconos";
import { TEXTO_WHATSAPP } from "@/lib/mensajes";
import type { DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

/*
 * Variantes de botón de «Restauración» (entrega, apartado 7). Todas son `className` de
 * BotonLlamada / BotonWhatsApp de core: píldora, relleno de primario con texto en
 * sobre-primario (core lo recalcula) y contorno crema de 2 px. Hover solo con puntero
 * (`hover:` de Tailwind v4 ya va dentro de `@media (hover: hover)`), pulsado con scale(.97)
 * (clase `boton`, globals.css) y foco de 3 px en --color-foco (base).
 */
const BASE =
  "boton inline-flex items-center justify-center gap-2.5 rounded-boton px-[22px] text-center leading-tight font-semibold no-underline";

/** hero-relleno / cta-relleno / barra-ancho: primario relleno. */
export const relleno = cn(BASE, "bg-primario font-[640] text-sobre-primario hover:bg-primario-hover active:bg-primario-pulsado");
/** hero-contorno / tarjeta-contorno / cabecera-compacto: borde crema de 2 px. */
export const contorno = cn(BASE, "border-2 border-texto bg-transparent text-texto hover:bg-texto/10 active:bg-texto/16");
/** 56 px y 17 px (hero, CTA final, asistente, contacto, final de las fichas). */
export const grande = "min-h-14 text-[17px]";
/** 52 px y 16 px (cierres de sección, 404). */
export const medio = "min-h-[52px] text-base";

type PropsPareja = {
  cta: DatosCta;
  /** Texto del botón de WhatsApp. */
  textoWhatsapp?: ReactNode;
  /** «Llamar · 600 00 05 15» (cierres) o «Llamar» (hero, fichas, contacto). */
  numeroEnLlamar?: boolean;
  tamano?: "grande" | "medio";
  /** Iconos en los dos botones (hero, contacto); en los cierres, solo en WhatsApp. */
  iconoLlamar?: boolean;
  /** Hero: uno encima de otro en móvil, en fila desde `lg` con el principal más ancho. */
  hero?: boolean;
  className?: string;
};

/**
 * Pareja de CTA (entrega, mapa de CTAs): WhatsApp relleno + Llamar con contorno de 2 px, en fila
 * si caben. Sin WhatsApp, Llamar ocupa el sitio relleno de primario y con el número, sin hueco.
 */
export function Pareja({ cta, textoWhatsapp = TEXTO_WHATSAPP, numeroEnLlamar, tamano = "medio", iconoLlamar, hero, className }: PropsPareja) {
  const { telefono, whatsapp, mensaje } = cta;
  const alto = tamano === "grande" ? grande : medio;
  const numero = telefonoVisible(telefono);
  return (
    <div className={cn(hero ? "flex flex-col gap-2 lg:flex-row lg:gap-3" : "flex flex-wrap gap-2.5", className)}>
      {whatsapp && (
        <BotonWhatsApp
          numero={whatsapp}
          mensaje={mensaje}
          className={cn(relleno, alto, hero ? "min-h-14 lg:flex-[1.5_1_auto] lg:whitespace-nowrap" : "flex-[1_1_260px]")}
        >
          <IconoWhatsapp tamano={hero ? 22 : 20} />
          <span>{textoWhatsapp}</span>
        </BotonWhatsApp>
      )}
      <BotonLlamada
        telefono={telefono}
        className={cn(
          whatsapp ? contorno : relleno,
          alto,
          hero ? (whatsapp ? "min-h-[52px] lg:min-h-14 lg:flex-[1_1_auto]" : "min-h-14 lg:flex-1") : "flex-[1_1_200px]",
        )}
      >
        {(iconoLlamar || !whatsapp) && <IconoTelefono />}
        {whatsapp && !numeroEnLlamar ? (
          <span>
            Llamar<span className="sr-only"> al {numero}</span>
          </span>
        ) : whatsapp ? (
          <span>Llamar · {numero}</span>
        ) : (
          <span>Llamar al {numero}</span>
        )}
      </BotonLlamada>
    </div>
  );
}
