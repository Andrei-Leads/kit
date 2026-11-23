import type { ReactNode } from "react";

import { Pareja, type DatosCta } from "@/components/Pareja";

type Props = { cta: DatosCta; textoWhatsapp: ReactNode };

/**
 * CTA final (encargo §6.9): «¿Tienes *planos*?» en display y la pareja con el mensaje de la
 * página. Sin WhatsApp, la frase pide la llamada.
 */
export function CtaFinal({ cta, textoWhatsapp }: Props) {
  return (
    <section aria-labelledby="titulo-cta" className="mt-(--seccion) border-t border-borde py-[clamp(64px,9vw,128px)]">
      <div className="contenedor">
        <h2 id="titulo-cta" className="titulo-display">
          ¿Tienes <em>planos</em>?
        </h2>
        <p className="m-0 mt-6 mb-8 max-w-[46ch] text-texto-suave">
          {cta.whatsapp ? "Mándanoslos por WhatsApp o llámanos." : "Llámanos y cuéntanos tu obra."} Te decimos qué solución encaja y cuándo podemos montarla.
        </p>
        <Pareja cta={cta} textoWhatsapp={textoWhatsapp} alto={56} className="max-w-[620px]" />
      </div>
    </section>
  );
}
