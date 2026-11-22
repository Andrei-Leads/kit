import { listaY, type SiteConfig } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";
import { Titular } from "@/components/Botones";
import { cn } from "@/lib/utils";

/**
 * «Dónde *trabajamos*» (zonas como frase con el formateador de listas de core) y «Lo que
 * nos *preguntan*» (pieza base `Preguntas`). Sin preguntas, solo zonas a ancho completo;
 * sin nada, no existe.
 */
export function ZonasPreguntas({ zonas, preguntas }: Pick<SiteConfig, "zonas" | "preguntas">) {
  if (zonas.length === 0 && preguntas.length === 0) return null;
  return (
    <section data-tono="claro" className="seccion bg-fondo">
      <div className={cn("contenedor grid gap-x-16 gap-y-16", zonas.length > 0 && preguntas.length > 0 && "lg:grid-cols-2")}>
        {zonas.length > 0 && (
          <div aria-labelledby="titulo-zonas" role="region">
            <p className="etiqueta mb-4 text-texto-suave">Zonas</p>
            <Titular id="titulo-zonas" antes="Dónde" destacada="trabajamos" />
            <p className="m-0 mt-6 max-w-[40ch] text-entradilla">Hacemos obras en {listaY(zonas)}.</p>
          </div>
        )}
        {preguntas.length > 0 && (
          <div aria-labelledby="titulo-preguntas" role="region">
            <p className="etiqueta mb-4 text-texto-suave">Preguntas</p>
            <Titular id="titulo-preguntas" antes="Lo que nos" destacada="preguntan" />
            <Preguntas preguntas={preguntas} className="mt-8" />
          </div>
        )}
      </div>
    </section>
  );
}
