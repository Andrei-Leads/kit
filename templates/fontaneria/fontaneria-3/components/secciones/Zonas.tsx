import { listaY } from "@andrei-leads/core";

/** «Trabajamos en Sevilla, Tomares… y Dos Hermanas.» en Fraunces. Sin zonas, no existe. */
export function Zonas({ zonas }: { zonas: readonly string[] }) {
  if (zonas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-zonas" className="seccion">
      <div className="contenedor">
        <h2 id="titulo-zonas" className="m-0 font-texto text-base font-bold tracking-[0.06em] uppercase">
          Dónde trabajamos
        </h2>
        <p className="mt-4 mb-0 max-w-[26em] font-titulo text-[clamp(1.625rem,1.15rem+2.2vw,3rem)] leading-[1.2] font-normal tracking-[-0.01em] text-balance">
          Trabajamos en {listaY(zonas)}.
        </p>
      </div>
    </section>
  );
}
