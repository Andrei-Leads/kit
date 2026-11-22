import type { ReactNode } from "react";
import { direccionLinea, urlComoLlegar, type SiteConfig } from "@andrei-leads/core";

import { ParejaCta } from "@/components/Botones";
import { EnlaceFlecha } from "@/components/EnlaceFlecha";
import { Destacada, TituloLineas } from "@/components/Titulo";
import { Veta } from "@/components/Veta";
import { TEXTO_WA_FINAL } from "@/lib/mensajes";
import type { DatosCta } from "@/lib/textos";

type Props = {
  cta: DatosCta;
  contacto: Pick<SiteConfig["contacto"], "direccion" | "coordenadas">;
  confianza?: string;
  /** Líneas del titular (por defecto «¿Tienes un hueco / que llenar?»). */
  lineas?: readonly ReactNode[];
  textoWhatsapp?: string;
  /** La dirección del taller con «Cómo llegar →» (inicio). */
  conDireccion?: boolean;
  id?: string;
};

/** CTA final (encargo §6.11): tinta con veta, titular con palabra destacada, la pareja del hero y la dirección del taller. */
export function CtaFinal({ cta, contacto, confianza, lineas, textoWhatsapp = TEXTO_WA_FINAL, conDireccion = true, id }: Props) {
  return (
    <section
      id={id}
      data-tono="oscuro"
      aria-labelledby="titulo-cta-final"
      className="seccion sobre-oscuro relative z-[6] overflow-hidden bg-tinta text-fondo"
      style={id ? { viewTimelineName: `--sec-${id}` } : undefined}
    >
      <Veta />
      <div className="contenedor relative">
        <TituloLineas
          id="titulo-cta-final"
          lineas={lineas ?? ["¿Tienes un hueco", <>que <Destacada>llenar</Destacada>?</>]}
          className="max-w-[14ch] text-h2"
        />
        <ParejaCta cta={cta} tono="oscuro" textoWhatsapp={textoWhatsapp} confianza={confianza} className="mt-10" />
        {conDireccion && (
          <div className="mt-14 flex flex-wrap items-baseline gap-x-10 gap-y-3 border-t border-fondo/20 pt-6">
            <p className="m-0 max-w-[44ch] flex-[1_1_320px] text-base leading-normal">
              {direccionLinea(contacto.direccion)}
              <br />
              <span className="text-papel-suave">Si quieres, ven a ver las maderas.</span>
            </p>
            <EnlaceFlecha href={urlComoLlegar(contacto)} externo>
              Cómo llegar
            </EnlaceFlecha>
          </div>
        )}
      </div>
    </section>
  );
}
