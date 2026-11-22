import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { IconoWhatsapp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  telefono: string;
  whatsapp?: string;
  /** Mensaje precargado según la página. */
  mensaje: string;
  /** Texto del botón de WhatsApp (por defecto, «Presupuesta tu obra»). */
  textoWhatsapp?: string;
  /** claro: sobre blanco. banda: sobre el primario (CTA final). negro: sobre el menú. */
  tono?: "claro" | "banda" | "negro";
  /** Compacta: 48 px y 17 px (celda de cierre de la rejilla); «Llamar» sin número. */
  compacta?: boolean;
  className?: string;
};

const WA = { claro: "boton-wa", banda: "boton-wa-banda", negro: "boton-wa" } as const;
const LLAMAR = { claro: "boton-contorno", banda: "boton-contorno-banda", negro: "boton-contorno-negro" } as const;

/**
 * Pareja de CTAs de «Obra con nombre»: WhatsApp (bloque primario de 56 px, el
 * elemento de acción más grande) + «Llamar · 600 00 03 03» (contorno de 2 px).
 * `flex-wrap` con 2 1 260px / 1 1 200px: en móvil cada uno en su fila y, sin
 * WhatsApp, Llamar ocupa el sitio sin dejar hueco.
 */
export function Pareja({ telefono, whatsapp, mensaje, textoWhatsapp = "Presupuesta tu obra", tono = "claro", compacta, className }: Props) {
  const numero = telefonoVisible(telefono);
  return (
    <div className={cn("pareja max-w-[640px]", compacta && "pareja-compacta", className)}>
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn("boton boton-principal", WA[tono])}>
          <IconoWhatsapp className={compacta ? "size-[18px] flex-none" : "size-5 flex-none"} />
          {textoWhatsapp}
        </BotonWhatsApp>
      )}
      <BotonLlamada telefono={telefono} className={cn("boton boton-secundario", LLAMAR[tono])}>
        {compacta ? (
          <>
            Llamar<span className="sr-only"> al {numero}</span>
          </>
        ) : (
          <span>
            Llamar <span aria-hidden="true">·</span> <span className="whitespace-nowrap tabular-nums">{numero}</span>
          </span>
        )}
      </BotonLlamada>
    </div>
  );
}
