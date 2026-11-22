import type { SiteConfig } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";
import { cn } from "@/lib/utils";

/** Zonas en pastillas blancas con borde: siempre lista, nunca enlaces (encargo §6.10). */
export function ListaZonas({ zonas }: { zonas: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {zonas.map((z) => (
        <li key={z} className="rounded-pastilla border border-borde bg-superficie px-4 py-2 text-[15px] leading-[1.3]">
          {z}
        </li>
      ))}
    </ul>
  );
}

/**
 * «Dónde trabajamos» y «Preguntas frecuentes» lado a lado en escritorio (Inicio.dc.html). Cada
 * mitad solo con datos; sin ninguna, no existe.
 */
export function ZonasPreguntas({ zonas, preguntas, className }: Pick<SiteConfig, "zonas" | "preguntas"> & { className?: string }) {
  if (zonas.length === 0 && preguntas.length === 0) return null;
  return (
    <section aria-label="Zonas y preguntas" className={cn("pt-[clamp(8px,4vw,32px)] pb-[clamp(56px,2rem+6vw,112px)]", className)}>
      <div className="contenedor flex flex-wrap gap-x-[72px] gap-y-14">
        {zonas.length > 0 && (
          <div className="flex-[1_1_300px]">
            <h2 className="titulo-seccion mb-5">Dónde trabajamos</h2>
            <ListaZonas zonas={zonas} />
          </div>
        )}
        {preguntas.length > 0 && (
          <div className="flex-[1.4_1_340px]">
            <h2 className="titulo-seccion mb-5">Preguntas frecuentes</h2>
            <Preguntas preguntas={preguntas} grupo="preguntas-inicio" />
          </div>
        )}
      </div>
    </section>
  );
}
