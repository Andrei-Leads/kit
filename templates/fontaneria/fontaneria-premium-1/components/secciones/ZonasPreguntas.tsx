import { listaY, type SiteConfig } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";

/**
 * Zonas y preguntas (encargo §6.10): a la izquierda, la frase «Trabajamos en …»
 * (solo lista, nunca páginas por municipio); a la derecha, las preguntas en
 * `<details name>`. Cada mitad se oculta sin datos; sin ninguna, no existe.
 */
export function ZonasPreguntas({ zonas, preguntas }: Pick<SiteConfig, "zonas" | "preguntas">) {
  if (zonas.length === 0 && preguntas.length === 0) return null;
  return (
    <section data-tono="claro" aria-label="Zonas y preguntas" className="seccion bg-fondo">
      <div className="contenedor grid gap-16 lg:grid-cols-[400px_minmax(0,520px)] lg:gap-20">
        {zonas.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="etiqueta m-0">Zonas</h2>
            <p className="titulo m-0 text-[26px] leading-[1.25] lg:text-[32px]">Trabajamos en {listaY(zonas)}.</p>
          </div>
        )}
        {preguntas.length > 0 && (
          <div className={zonas.length === 0 ? "lg:col-span-2 lg:max-w-[720px]" : undefined}>
            <h2 className="etiqueta m-0 mb-6">Preguntas</h2>
            <Preguntas preguntas={preguntas} grupo="preguntas-inicio" />
          </div>
        )}
      </div>
    </section>
  );
}
