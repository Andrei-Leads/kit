import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";

import { IconoWhatsapp } from "@/components/Iconos";
import { llamarLargo } from "@/lib/textos";
import { cn } from "@/lib/utils";

export type DatosCta = { telefono: string; whatsapp?: string; mensaje: string };

type Props = {
  cta: DatosCta;
  textoWhatsapp: ReactNode;
  /** Por defecto, «Llamar · {teléfono}». */
  textoLlamar?: ReactNode;
  /** Alto del botón de WhatsApp: 52 (parejas) o 56 (hero, CTA final, contacto). */
  alto?: 52 | 56;
  className?: string;
};

/**
 * «Perfil Par» (encargo §3): `BotonWhatsApp` en `boton-anodizado` + `BotonLlamada` en
 * `boton-contorno` de 2 px, uno al lado del otro y, si no caben, uno encima del otro (a
 * todo el ancho en móvil). Sin WhatsApp, «Llamar» ocupa todo el ancho. De servidor.
 */
export function Pareja({ cta, textoWhatsapp, textoLlamar, alto = 52, className }: Props) {
  return (
    <div className={cn("flex w-full flex-wrap items-stretch gap-x-3 gap-y-2", className)}>
      {cta.whatsapp && (
        <BotonWhatsApp numero={cta.whatsapp} mensaje={cta.mensaje} className={cn("boton boton-anodizado flex-[1_1_250px] whitespace-nowrap", alto === 56 && "min-h-14")}>
          <IconoWhatsapp />
          <span>{textoWhatsapp}</span>
        </BotonWhatsApp>
      )}
      <BotonLlamada telefono={cta.telefono} className="boton boton-contorno flex-[1_1_200px] whitespace-nowrap">
        {textoLlamar ?? llamarLargo(cta.telefono)}
      </BotonLlamada>
    </div>
  );
}
