import type { ReactNode } from "react";

import { Pareja } from "@/components/Botones";
import { Senal, Titular } from "@/components/Titular";
import type { DatosCta } from "@/lib/textos";

type Props = {
  cta: DatosCta;
  /** Titular con su palabra destacada; por defecto «Hablemos de tu instalación.». */
  titular?: ReactNode;
  textoWhatsapp?: ReactNode;
  /** Línea de confianza: el horario (formatearHorario). */
  confianza?: string;
};

/** CtaFinal (encargo §6.11): titular grande, las dos píldoras de 56 px y el horario. */
export function CtaFinal({ cta, titular, textoWhatsapp, confianza }: Props) {
  return (
    <section data-tono="oscuro" aria-labelledby="titulo-cta" className="pb-[clamp(80px,4rem+5vw,144px)]">
      <div className="contenedor flex flex-col gap-8 border-t border-[var(--color-linea)] pt-[clamp(48px,3rem+3vw,96px)]">
        <Titular
          id="titulo-cta"
          tamano="display"
          lineas={[
            titular ?? (
              <>
                Hablemos de tu <Senal>instalación</Senal>.
              </>
            ),
          ]}
        />
        <Pareja cta={cta} textoWhatsapp={textoWhatsapp} confianza={confianza} />
      </div>
    </section>
  );
}
