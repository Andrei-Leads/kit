import { listaY } from "@andrei-leads/core";

import { TituloSeccion } from "@/components/TituloSeccion";

/** «Dónde montamos» (encargo §6.8): las zonas en una línea de texto corrido en serif cursiva. Sin zonas, no existe. */
export function Zonas({ zonas }: { zonas: readonly string[] }) {
  if (zonas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-zonas" className="marco seccion">
      <TituloSeccion id="titulo-zonas" className="mb-6">
        Dónde montamos
      </TituloSeccion>
      <p data-aparecer className="max-w-[30ch] font-titulo text-[clamp(1.6rem,1.2rem+1.6vw,2.6rem)] leading-[1.25] text-balance italic">
        {listaY(zonas)}.
      </p>
    </section>
  );
}
