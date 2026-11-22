import { listaY, type Pregunta } from "@andrei-leads/core";

import { TituloLineas } from "@/components/TituloLineas";
import { Preguntas } from "@/components/base/Preguntas";
import { cn } from "@/lib/utils";

type Props = { zonas: readonly string[]; preguntas: readonly Pregunta[] };

/** Zonas (texto corrido con `listaY`, nunca páginas por municipio) y preguntas frecuentes (encargo §6.11). */
export function ZonasPreguntas({ zonas, preguntas }: Props) {
  if (zonas.length === 0 && preguntas.length === 0) return null;
  return (
    <section data-tono="claro" aria-label="Zonas y preguntas" className="seccion bg-fondo">
      <div className="contenedor rejilla gap-y-16">
        {zonas.length > 0 && (
          <div className={cn(preguntas.length > 0 ? "lg:col-[1/6]" : "lg:col-[1/9]")}>
            <p className="etiqueta">Zonas</p>
            <TituloLineas lineas={[<>Dónde <em>trabajamos</em>.</>]} className="titulo-h2 mt-3" />
            <p className="m-0 mt-6 col-texto text-texto-suave">{listaY(zonas)}.</p>
          </div>
        )}
        {preguntas.length > 0 && (
          <div className={cn(zonas.length > 0 ? "lg:col-[7/13]" : "lg:col-[1/9]")}>
            <h2 className="etiqueta mb-5">Preguntas frecuentes</h2>
            <Preguntas preguntas={preguntas} />
          </div>
        )}
      </div>
    </section>
  );
}
