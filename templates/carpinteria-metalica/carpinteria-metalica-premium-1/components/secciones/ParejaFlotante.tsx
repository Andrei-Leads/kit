import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";

import { IconoWhatsapp } from "@/components/Iconos";
import { TEXTO_WA_CORTO } from "@/lib/mensajes";
import { textoLlamar } from "@/lib/textos";

type Props = { telefono: string; whatsapp?: string; mensaje: string };

/**
 * `pareja-flotante` (encargo §3 y §12): WhatsApp + Llamar (orden del diseño y de la cabecera) compactos (48 px) en una cápsula
 * de tinta al 94 % abajo a la derecha. Solo desde 1024 px y solo cuando la cabecera se
 * esconde (`html[data-scroll="abajo"]`, CSS); aparece con `@starting-style`.
 */
export function ParejaFlotante({ telefono, whatsapp, mensaje }: Props) {
  return (
    <div data-tono="oscuro" className="pareja-flotante fixed right-6 bottom-6 z-30 gap-2 rounded-boton p-1.5">
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className="boton boton-wa sobre-tinta min-h-12 px-5 whitespace-nowrap">
          <IconoWhatsapp tamano={18} />
          {TEXTO_WA_CORTO}
        </BotonWhatsApp>
      )}
      <BotonLlamada telefono={telefono} className="boton boton-llamar sobre-tinta min-h-12 px-5 whitespace-nowrap">
        {textoLlamar(telefono)}
      </BotonLlamada>
    </div>
  );
}
