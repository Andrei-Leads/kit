import type { ReactNode } from "react";

import { Pareja } from "@/components/Botones";
import type { DatosCta } from "@/lib/textos";

type Props = {
  cta: DatosCta;
  titulo: ReactNode;
  /** Frase bajo el titular. */
  texto?: ReactNode;
  textoWhatsapp?: ReactNode;
};

/** CTA final sobre `alterna` (Inicio.dc.html): titular centrado de 30–48 px, frase y los dos botones de 56 px. */
export function CtaFinal({ cta, titulo, texto, textoWhatsapp }: Props) {
  return (
    <section aria-labelledby="titulo-cta" className="bg-alterna py-[clamp(56px,2rem+6vw,112px)]">
      <div className="contenedor">
        <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
        <h2 id="titulo-cta" className="text-[clamp(1.875rem,1.3rem+2vw,3rem)] leading-[1.1] font-extrabold text-balance">
          {titulo}
        </h2>
        {texto && <p className="max-w-[34rem] text-texto-suave">{texto}</p>}
          <Pareja cta={cta} textoWhatsapp={textoWhatsapp} alto className="mt-2 w-full max-w-[600px]" />
        </div>
      </div>
    </section>
  );
}
