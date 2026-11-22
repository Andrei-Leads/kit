import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsapp } from "@/components/Iconos";
import { TEXTO_WHATSAPP } from "@/lib/mensajes";
import type { DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

/*
 * Variantes de botón de «Antes y después» (tablero Sistema). Todas son `className` de
 * BotonLlamada / BotonWhatsApp de core. Rectas (radio 0), sans de 15–16 px,
 * primario relleno con sobre-primario y contorno en primario.
 */
const BASE =
  "boton inline-flex items-center justify-center gap-2.5 rounded-boton border border-transparent px-5 text-center font-semibold leading-tight whitespace-nowrap no-underline";

/** Relleno primario. */
export const relleno = cn(BASE, "bg-primario text-sobre-primario hover:bg-primario-hover");
/** Contorno primario; al pasar, relleno. */
export const contorno = cn(BASE, "border-primario bg-transparent text-primario-texto hover:bg-primario hover:text-sobre-primario");
/** Grande (hero, CTA): 52 px y 16 px. */
export const grande = "min-h-[52px] px-6 text-base";

type PropsPareja = {
  cta: DatosCta;
  /** Texto del botón de WhatsApp. */
  textoWhatsapp?: ReactNode;
  /** «Llamar al 600 00 01 10» (hero, contacto, 404) o «Llamar» (CTA). */
  numeroEnLlamar?: boolean;
  /** Clases extra de cada botón (p. ej. altura de contacto). */
  claseBoton?: string;
  /** Iconos de WhatsApp y teléfono: solo en el hero (tablero Hero); el resto de páginas, sin icono. */
  iconos?: boolean;
  className?: string;
};

/**
 * Pareja de CTA: WhatsApp relleno + Llamar con contorno, en fila si caben. Sin WhatsApp,
 * Llamar pasa a ser el relleno.
 */
export function Pareja({ cta, textoWhatsapp = TEXTO_WHATSAPP, numeroEnLlamar, claseBoton, iconos, className }: PropsPareja) {
  const { telefono, whatsapp, mensaje } = cta;
  const llamar = (
    <>
      {iconos && <IconoTelefono />}
      {numeroEnLlamar ? (
        <span>Llamar al {telefonoVisible(telefono)}</span>
      ) : (
        <span>
          Llamar<span className="sr-only"> al {telefonoVisible(telefono)}</span>
        </span>
      )}
    </>
  );
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(relleno, grande, "flex-[1_1_180px]", claseBoton)}>
          {iconos && <IconoWhatsapp />}
          <span>{textoWhatsapp}</span>
        </BotonWhatsApp>
      )}
      <BotonLlamada
        telefono={telefono}
        className={cn(whatsapp ? contorno : relleno, grande, numeroEnLlamar ? "flex-[1_1_210px]" : "flex-[1_1_140px]", claseBoton)}
      >
        {llamar}
      </BotonLlamada>
    </div>
  );
}
