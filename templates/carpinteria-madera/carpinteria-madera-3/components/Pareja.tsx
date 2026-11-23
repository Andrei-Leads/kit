import { BotonLlamada, BotonWhatsApp, type SiteConfig } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsApp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
  /** Mensaje precargado de WhatsApp de esta página. */
  mensaje: string;
  /** Texto del botón de WhatsApp (por defecto, el CTA principal del encargo). */
  textoWhatsapp?: string;
  textoLlamar?: string;
  /** Línea de confianza bajo los botones (horario o valoración), en mono. */
  nota?: string;
  className?: string;
};

/**
 * «Pareja CTA» del diseño: WhatsApp relleno en primario (hero-relleno, el principal, más ancho) y
 * «Llamar al taller» con contorno de 2 px de tinta (hero-contorno), los dos a 56 px. Uno encima de
 * otro en móvil y en fila cuando caben. Sin WhatsApp, Llamar ocupa todo el ancho y pasa a relleno.
 */
export function Pareja({ contacto, mensaje, textoWhatsapp = "Mándanos fotos y medidas", textoLlamar = "Llamar al taller", nota, className }: Props) {
  const { telefono, whatsapp } = contacto;
  return (
    <div className={cn("flex w-full flex-col gap-2.5", className)}>
      <div className="flex flex-wrap gap-3">
        {whatsapp && (
          <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className="btn btn-relleno flex-[1.4_1_250px]">
            <IconoWhatsApp />
            <span>{textoWhatsapp}</span>
          </BotonWhatsApp>
        )}
        <BotonLlamada telefono={telefono} className={cn("btn", whatsapp ? "btn-contorno flex-[1_1_200px]" : "btn-relleno flex-[1_1_100%]")}>
          <IconoTelefono />
          <span>{textoLlamar}</span>
        </BotonLlamada>
      </div>
      {nota && <p className="etiqueta text-[12.5px] leading-normal text-texto-suave">{nota}</p>}
    </div>
  );
}
