import type { ReactNode } from "react";

import { Pareja } from "@/components/Botones";
import type { DatosCta } from "@/lib/textos";

import { Titular } from "./Titular";

type Props = {
  cta: DatosCta;
  /** Líneas del titular (con la palabra destacada en `<em>`). */
  lineas?: ReactNode[];
  textoWhatsapp?: ReactNode;
  /** Línea de confianza (valoración u horario). */
  confianza?: string;
};

/** CTA final (encargo §6.11), sobre tinta: titular a --text-display, `pareja-cta` y línea de confianza. */
export function CtaFinal({ cta, lineas, textoWhatsapp, confianza }: Props) {
  return (
    <section data-tono="oscuro" aria-labelledby="titulo-cta" className="sobre-tinta bg-tinta pt-24 pb-16 text-white lg:pt-36 lg:pb-24">
      <div className="contenedor flex flex-col gap-7">
        <Titular
          id="titulo-cta"
          className="text-display"
          lineas={lineas ?? ["Pide presupuesto", <>para <em>tu instalación</em>.</>]}
        />
        <Pareja cta={cta} tamano="cta" tono="oscuro" textoWhatsapp={textoWhatsapp} className="mt-2" />
        {confianza && <p className="m-0 text-sm text-sobre-tinta-suave">{confianza}</p>}
      </div>
    </section>
  );
}
