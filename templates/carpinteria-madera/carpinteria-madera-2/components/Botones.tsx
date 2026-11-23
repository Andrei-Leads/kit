import { BotonLlamada, BotonWhatsApp, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsApp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
  mensaje: string;
  /** Texto del botón de WhatsApp (el servicio o el trabajo van en el mensaje, no aquí). */
  textoWhatsapp?: string;
  /** Texto del botón de llamada (por defecto «Llamar al {teléfono}»). */
  textoLlamar?: string;
  /**
   * "claro": sobre crema o blanco (cta-claro + llamar-contorno). "pleno": sobre el campo de color
   * (cta-pleno en miel + llamar-pleno con contorno crema).
   */
  tono?: "claro" | "pleno";
  className?: string;
};

/**
 * Pareja de CTAs de cierre de bloque (mapa de CTAs de la entrega): [WhatsApp] + [Llamar], en fila
 * en cuanto caben (cada uno 260–380 px), uno encima de otro en móvil. Sin WhatsApp, «Llamar» pasa a
 * relleno y ocupa el sitio de los dos.
 */
export function Pareja({ contacto, mensaje, textoWhatsapp = "Escribir por WhatsApp", textoLlamar, tono = "claro", className }: Props) {
  const conWa = !!contacto.whatsapp;
  const claseWa = tono === "pleno" ? "boton-acento" : "boton-primario";
  const claseLlamar = conWa ? (tono === "pleno" ? "boton-contorno-pleno" : "boton-contorno") : claseWa;
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {contacto.whatsapp && (
        <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className={cn("boton max-w-[400px] flex-[1_1_260px]", claseWa)}>
          <IconoWhatsApp />
          {textoWhatsapp}
        </BotonWhatsApp>
      )}
      <BotonLlamada telefono={contacto.telefono} className={cn("boton max-w-[400px] flex-[1_1_260px]", claseLlamar)}>
        {!conWa && <IconoTelefono />}
        <span>{textoLlamar ?? <>Llamar al&nbsp;{telefonoVisible(contacto.telefono)}</>}</span>
      </BotonLlamada>
    </div>
  );
}
