import type { ReactNode } from "react";
import type { SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { lineasHorario, type DatosCta } from "@/lib/textos";

type Props = {
  cta: DatosCta;
  contacto: Pick<SiteConfig["contacto"], "horario" | "urgencias24h">;
  titulo?: string;
  textoWhatsapp?: ReactNode;
};

/** Banda de color pleno (tarjeta grande) con el título, el horario y la pareja. */
export function CtaFinal({ cta, contacto, titulo = "Llámanos y dejamos tu casa al día", textoWhatsapp }: Props) {
  const horario = lineasHorario(contacto);
  return (
    <section aria-labelledby="titulo-cta" className="seccion pt-0">
      <div className="contenedor">
        <div data-aparecer className="sobre-pleno grid gap-7 rounded-tarjeta bg-pleno p-7 text-sobre-primario md:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-12 lg:px-14">
          <div>
            <h2 id="titulo-cta" className="m-0 font-titulo text-[clamp(2rem,1.5rem+2.2vw,3.25rem)] leading-[1.02] font-[750] tracking-[-0.035em] text-balance">
              {titulo}
            </h2>
            {horario.length > 0 && (
              <ul className="m-0 mt-4 list-none p-0">
                {horario.map((l) => (
                  <li key={l.dias}>
                    <strong>{l.dias}</strong> <span aria-hidden="true">·</span> {l.horas}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Pareja cta={cta} tono="pleno" textoWhatsapp={textoWhatsapp} className="lg:flex-col lg:items-stretch lg:*:w-full" />
        </div>
      </div>
    </section>
  );
}
