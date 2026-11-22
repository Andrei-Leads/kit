import type { ReactNode } from "react";

import { Pareja, type DatosCta } from "@/components/Pareja";
import { TEXTO_WA } from "@/lib/mensajes";

type Props = { cta: DatosCta; frase?: ReactNode };

/**
 * Pareja de CTAs al cierre de un bloque del inicio (brief §7: como mucho cada 2–3 secciones):
 * filete, una frase opcional en serif de 24 px y la pareja.
 */
export function FranjaPareja({ cta, frase }: Props) {
  return (
    <div className="contenedor pt-[clamp(64px,8vw,112px)]">
      <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-5 border-t border-borde pt-8">
        {frase && <p className="m-0 max-w-[34ch] flex-[1_1_300px] font-titulo text-2xl leading-[1.3]">{frase}</p>}
        <div className="max-w-[560px] flex-[1_1_320px]">
          <Pareja cta={cta} textoWhatsapp={TEXTO_WA} />
        </div>
      </div>
    </div>
  );
}
