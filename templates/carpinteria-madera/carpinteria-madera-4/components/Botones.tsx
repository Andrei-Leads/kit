import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoWhatsapp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  whatsapp?: string;
  /** Mensaje precargado según la página. */
  mensaje: string;
  /** Texto del botón de WhatsApp (por defecto, «Pide presupuesto»). */
  textoWhatsapp?: string;
  /** Texto de Llamar (por defecto, «Llamar · 633 917 204»). */
  textoLlamar?: string;
  /**
   * claro: hero-negro + hero-contorno. acento: ficha-acento + hero-contorno (ficha de pieza).
   * negro: cta-blanco + cta-contorno-blanco (sobre bloque negro).
   */
  tono?: "claro" | "acento" | "negro";
  /** hero: 22 px; grande: 64 px (/contacto). */
  tamano?: "normal" | "hero" | "grande";
  className?: string;
};

const WA = { claro: "boton-negro", acento: "boton-acento", negro: "boton-blanco" } as const;
const LLAMAR = { claro: "boton-contorno", acento: "boton-contorno", negro: "boton-contorno-blanco" } as const;

/**
 * Pareja de CTAs de «Galería»: WhatsApp (bloque negro de 56 px, el elemento de acción más grande) +
 * «Llamar · 633 917 204» (contorno de 2 px). `flex-wrap` con 1.4 1 260px / 1 1 220px: en móvil cada
 * uno en su fila y, sin WhatsApp, Llamar ocupa el sitio sin dejar hueco.
 */
export function Pareja({ telefono, whatsapp, mensaje, textoWhatsapp = "Pide presupuesto", textoLlamar, tono = "claro", tamano = "normal", className }: Props) {
  return (
    <div className={cn("pareja", tamano === "hero" && "pareja-hero", tamano === "grande" && "pareja-grande", className)}>
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn("boton boton-principal", WA[tono])}>
          <IconoWhatsapp className={tamano === "grande" ? "size-6 flex-none" : "size-[22px] flex-none"} />
          {textoWhatsapp}
        </BotonWhatsApp>
      )}
      <BotonLlamada telefono={telefono} className={cn("boton boton-secundario", LLAMAR[tono])}>
        {textoLlamar ?? (
          <span>
            Llamar <span aria-hidden="true">·</span> <span className="whitespace-nowrap">{telefonoVisible(telefono)}</span>
          </span>
        )}
      </BotonLlamada>
    </div>
  );
}
