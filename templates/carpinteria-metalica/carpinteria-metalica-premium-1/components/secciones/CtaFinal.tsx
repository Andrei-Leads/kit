import type { ReactNode } from "react";

import { ParejaCta, type DatosCta } from "@/components/ParejaCta";
import { TituloLineas } from "@/components/TituloLineas";
import type { Confianza } from "@/lib/textos";

type Props = {
  cta: DatosCta;
  /** Titular por líneas (con una palabra en cursiva). */
  lineas: readonly ReactNode[];
  textoWhatsapp: ReactNode;
  confianza: Confianza;
};

/** CTA final (encargo §6): oscuro, titular en display por líneas, pareja de 56 px y horario. */
export function CtaFinal({ cta, lineas, textoWhatsapp, confianza }: Props) {
  return (
    <section data-tono="oscuro" aria-labelledby="titulo-cta-final" className="seccion bg-tinta text-sobre-tinta">
      <div className="contenedor">
        <TituloLineas id="titulo-cta-final" lineas={lineas} className="titulo-display max-w-[16ch]" />
        <ParejaCta cta={cta} textoWhatsapp={textoWhatsapp} tono="oscuro" tamano={56} confianza={confianza} className="mt-10 max-w-[620px] lg:max-w-none" />
      </div>
    </section>
  );
}

/** Titular común del CTA final: «Mándanos una / foto de tu *ventana*.»; sin WhatsApp, «Hablemos de / tu *ventana*.». */
export function lineasFoto(whatsapp?: string): ReactNode[] {
  return whatsapp
    ? ["Mándanos una", <>foto de tu <em>ventana</em>.</>]
    : ["Hablemos de", <>tu <em>ventana</em>.</>];
}
