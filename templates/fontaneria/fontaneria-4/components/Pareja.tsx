import { BotonLlamada, BotonWhatsApp, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsApp } from "@/components/Iconos";
import { textoLlamar } from "@/lib/formato";
import { cn } from "@/lib/utils";

type Props = {
  /** Teléfono, WhatsApp y urgencias: los pasa la página (nada de `@/site.config` en las secciones). */
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "urgencias24h">;
  /** Mensaje precargado de WhatsApp de esta página. */
  mensaje: string;
  /** Texto del botón de WhatsApp. */
  textoWhatsapp?: string;
  /** "papel" (whatsapp-hero) o "calco" (whatsapp-cta, sobre la hoja azul). */
  fondo?: "papel" | "calco";
  /** Línea de confianza debajo (lineaConfianza). */
  confianza?: string;
  className?: string;
};

/**
 * Pareja de botones del diseño: `llamada-hero` (relleno primario, icono + verbo + número) y
 * `whatsapp-hero` / `whatsapp-cta` (contorno de 2 px). A todo el ancho por debajo de 640 px y en
 * fila desde 640 px. Sin WhatsApp, solo la llamada.
 */
export function Pareja({ contacto, mensaje, textoWhatsapp = "Envíanos una foto por WhatsApp", fondo = "papel", confianza, className }: Props) {
  const { telefono, whatsapp } = contacto;
  return (
    <div className={className}>
      <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
        <BotonLlamada telefono={telefono} className="btn btn-llamada">
          <IconoTelefono />
          <span>
            {textoLlamar(contacto)} · {telefonoVisible(telefono)}
          </span>
        </BotonLlamada>
        {whatsapp && (
          <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn("btn", fondo === "calco" ? "btn-calco" : "btn-tinta")}>
            <IconoWhatsApp />
            <span>{textoWhatsapp}</span>
          </BotonWhatsApp>
        )}
      </div>
      {confianza && (
        <p className={cn("mt-2.5 font-titulo text-xs leading-normal", fondo === "calco" ? "text-sobre-calco" : "text-texto-suave")}>
          {confianza}
        </p>
      )}
    </div>
  );
}
