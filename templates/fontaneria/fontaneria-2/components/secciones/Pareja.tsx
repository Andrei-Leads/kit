import { BotonLlamada, BotonWhatsApp, type SiteConfig } from "@andrei-leads/core";

import { IconoMensaje, IconoTelefono } from "@/components/Iconos";
import { boton } from "@/lib/estilos";
import { textoLlamar } from "@/lib/formato";
import { cn } from "@/lib/utils";

type Props = {
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "urgencias24h">;
  /** Mensaje precargado de WhatsApp de la página. */
  mensaje: string;
  /** «principal» (60 px: hero, servicio, contacto, 404) o «cierre» (56 px: tras el bento, reseñas…). */
  tamano?: "principal" | "cierre";
  /** Texto visible del botón de WhatsApp. */
  textoWhatsapp?: string;
  /** Texto para el lector de pantalla tras el visible (p. ej. « por WhatsApp»). */
  completarWhatsapp?: string;
  /** Línea de confianza bajo los botones (horario, valoración…). */
  linea?: string;
  /** En columna (ficha lateral del trabajo). */
  apilada?: boolean;
  className?: string;
};

/**
 * Pareja de botones del diseño: `BotonLlamada` relleno («Llamar · número») y `BotonWhatsApp` con
 * contorno, con una línea de confianza debajo. Sin WhatsApp, la llamada ocupa todo el sitio.
 */
export function Pareja({
  contacto,
  mensaje,
  tamano = "principal",
  textoWhatsapp = "Escribir por WhatsApp",
  completarWhatsapp,
  linea,
  apilada,
  className,
}: Props) {
  const principal = tamano === "principal";
  const flex = apilada ? "w-full" : principal ? "flex-[1_1_240px]" : "flex-[1_1_260px]";
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <div className={cn("flex gap-3", apilada ? "flex-col" : "flex-wrap")}>
        <BotonLlamada
          telefono={contacto.telefono}
          className={cn(principal ? boton.llamadaPrincipal : boton.llamadaCierre, flex)}
        >
          <IconoTelefono />
          <span>{textoLlamar(contacto)}</span>
        </BotonLlamada>
        {contacto.whatsapp && (
          <BotonWhatsApp
            numero={contacto.whatsapp}
            mensaje={mensaje}
            className={cn(principal ? boton.whatsappSecundario : boton.whatsappCierre, flex, "relative")}
          >
            <IconoMensaje />
            <span>{textoWhatsapp}</span>
            {completarWhatsapp && <span className="sr-only">{completarWhatsapp}</span>}
          </BotonWhatsApp>
        )}
      </div>
      {linea && <p className="m-0 text-[.9375rem] leading-[1.45] text-texto-suave">{linea}</p>}
    </div>
  );
}
