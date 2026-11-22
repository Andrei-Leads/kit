import { listaY, type Pregunta } from "@andrei-leads/core";

import { ParejaCta } from "@/components/Botones";
import { Preguntas } from "@/components/base/Preguntas";
import type { DatosCta } from "@/lib/textos";

type Props = {
  zonas: readonly string[];
  preguntas: readonly Pregunta[];
  cta: DatosCta;
  confianza?: string;
  tituloPreguntas?: string;
  grupo?: string;
};

/** Zonas en texto corrido y preguntas con `<details name>` (encargo §6.10). Cada parte se oculta sin datos. */
export function ZonasYPreguntas({ zonas, preguntas, cta, confianza, tituloPreguntas = "Preguntas", grupo = "preguntas" }: Props) {
  if (zonas.length === 0 && preguntas.length === 0) return null;
  return (
    <section data-tono="claro" aria-label="Zonas y preguntas" className="seccion">
      <div className="contenedor flex flex-wrap gap-x-[clamp(40px,6vw,96px)] gap-y-14">
        {zonas.length > 0 && (
          <div className="max-w-[440px] flex-[1_1_340px]">
            <h2 className="etiqueta m-0 text-texto-suave">Dónde montamos</h2>
            <p className="mt-4 text-lg leading-[1.6]">{listaY(zonas)}.</p>
          </div>
        )}
        {preguntas.length > 0 && (
          <div className="min-w-0 flex-[1_1_480px]">
            <h2 className="titulo text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-[1.1]">{tituloPreguntas}</h2>
            <Preguntas preguntas={preguntas} grupo={grupo} className="mt-5" />
          </div>
        )}
      </div>
      <div className="contenedor mt-14">
        <ParejaCta cta={cta} tono="claro" confianza={confianza} />
      </div>
    </section>
  );
}
