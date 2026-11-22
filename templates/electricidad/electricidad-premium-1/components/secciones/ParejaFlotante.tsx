import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";

import { IconoWhatsapp } from "@/components/Iconos";
import type { DatosCta } from "@/lib/textos";

const BOTON = "boton inline-flex min-h-12 items-center justify-center gap-2 rounded-boton px-5 text-[15px] font-medium no-underline";

/**
 * pareja-flotante (escritorio, encargo §3 y §12): cápsula de tinta al 94 % con
 * filete, abajo a la derecha, solo mientras la cabecera está escondida (CSS con
 * `data-scroll`). Sin JS no aparece: la cabecera nunca se esconde.
 */
export function ParejaFlotante({ cta }: { cta: DatosCta }) {
  const { telefono, whatsapp, mensaje } = cta;
  return (
    <div className="pareja-flotante fixed right-6 bottom-6 z-40">
      <div className="flex gap-2 rounded-boton border border-[var(--color-linea)] bg-[var(--color-barra)] p-1.5 backdrop-blur-[12px]">
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={`${BOTON} bg-primario text-sobre-primario hover:bg-primario-hover`}>
          <IconoWhatsapp className="size-[18px]" />
          WhatsApp
        </BotonWhatsApp>
      )}
      <BotonLlamada telefono={telefono} className={`${BOTON} border-2 border-texto text-texto`}>
        Llamar
      </BotonLlamada>
      </div>
    </div>
  );
}
