import { BotonLlamada, BotonWhatsApp, type SiteConfig } from "@andrei-leads/core";

import { IconoBocadillo, IconoTelefono } from "@/components/Iconos";
import { textoLlamarCompleto } from "@/lib/formato";
import { cn } from "@/lib/utils";

type Contacto = Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "urgencias24h">;

export const TEXTO_WHATSAPP = "Cuéntanoslo por WhatsApp";

/** Variante `pulsador` (56 px) o `pulsador-compacto` (44 px): «Llamar 24 h · teléfono». */
export function Pulsador({
  contacto,
  compacto,
  icono = true,
  className,
}: {
  contacto: Contacto;
  compacto?: boolean;
  icono?: boolean;
  className?: string;
}) {
  return (
    <BotonLlamada telefono={contacto.telefono} className={cn(compacto ? "pulsador-compacto" : "pulsador", className)}>
      {icono && <IconoTelefono className={compacto ? "size-[18px]" : "size-5"} />}
      <span>{textoLlamarCompleto(contacto)}</span>
    </BotonLlamada>
  );
}

/** Variante `whatsapp-etiqueta`: cinta de rotuladora con bocadillo. Solo con `whatsapp`. */
export function WhatsAppEtiqueta({
  numero,
  mensaje,
  texto = TEXTO_WHATSAPP,
  compacto,
  icono = true,
  className,
}: {
  numero?: string;
  mensaje: string;
  texto?: string;
  compacto?: boolean;
  icono?: boolean;
  className?: string;
}) {
  if (!numero) return null;
  return (
    <BotonWhatsApp numero={numero} mensaje={mensaje} className={cn("whatsapp-etiqueta", compacto && "compacto", className)}>
      {icono && <IconoBocadillo className={compacto ? "size-[18px]" : "size-5"} />}
      <span>{texto}</span>
    </BotonWhatsApp>
  );
}

/** Pareja grande: pulsador + WhatsApp, a todo el ancho en móvil (hero, fichas, contacto, 404). */
export function Pareja({
  contacto,
  mensaje,
  textoWhatsapp,
  className,
}: {
  contacto: Contacto;
  mensaje: string;
  textoWhatsapp?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2.5", className)}>
      <Pulsador contacto={contacto} className="flex-[1_1_auto]" />
      <WhatsAppEtiqueta numero={contacto.whatsapp} mensaje={mensaje} texto={textoWhatsapp} className="flex-[1_1_auto]" />
    </div>
  );
}

/** Cierre de bloque del inicio: frase + pareja compacta (como mucho cada 2–3 secciones). */
export function Cierre({ texto, contacto, mensaje }: { texto: string; contacto: Contacto; mensaje: string }) {
  return (
    <div className="contenedor pt-6">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 border-t border-carril pt-[18px]">
        <p className="flex-[1_1_220px] text-lg font-medium">{texto}</p>
        <Pulsador contacto={contacto} compacto icono={false} />
        <WhatsAppEtiqueta numero={contacto.whatsapp} mensaje={mensaje} compacto icono={false} />
      </div>
    </div>
  );
}
