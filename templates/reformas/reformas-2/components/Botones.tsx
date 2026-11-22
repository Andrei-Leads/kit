import { BotonLlamada, BotonWhatsApp, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsApp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Contacto = Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;

type Props = {
  contacto: Contacto;
  mensaje: string;
  /** Texto del botón de WhatsApp. */
  textoWhatsapp?: string;
  /** Texto del botón de llamada (por defecto «Llamar · {teléfono}»). */
  textoLlamar?: string;
  /** "claro": sobre fondo crema o blanco. "sobre": sobre terracota (WhatsApp blanco y Llamar con contorno). */
  tono?: "claro" | "sobre";
  /** Línea de confianza bajo la pareja (horario, respuesta…). */
  nota?: string;
  className?: string;
};

/**
 * Pareja de CTAs (entrega v2): [WhatsApp principal] + [Llamar con contorno]. En móvil, uno encima
 * de otro; en cuanto caben, en fila. Sin WhatsApp, «Llamar» pasa a relleno y ocupa el sitio de los
 * dos.
 */
export function Pareja({ contacto, mensaje, textoWhatsapp = "Escribir por WhatsApp", textoLlamar, tono = "claro", nota, className }: Props) {
  const conWa = !!contacto.whatsapp;
  const claseWa = tono === "sobre" ? "boton-claro" : "boton-primario";
  const claseLlamar = conWa ? (tono === "sobre" ? "boton-contorno-sobre" : "boton-contorno") : claseWa;
  return (
    <div className={cn("flex w-full max-w-[560px] flex-col gap-2.5", className)}>
      <div className="flex flex-wrap gap-2">
        {contacto.whatsapp && (
          <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className={cn("boton flex-[1_1_240px]", claseWa)}>
            <IconoWhatsApp />
            {textoWhatsapp}
          </BotonWhatsApp>
        )}
        <BotonLlamada telefono={contacto.telefono} className={cn("boton flex-[1_1_200px]", claseLlamar)}>
          <IconoTelefono />
          <span>{textoLlamar ?? <>Llamar ·&nbsp;{telefonoVisible(contacto.telefono)}</>}</span>
        </BotonLlamada>
      </div>
      {nota && <p className={cn("text-sm leading-[1.4]", tono === "claro" && "text-texto-suave")}>{nota}</p>}
    </div>
  );
}
