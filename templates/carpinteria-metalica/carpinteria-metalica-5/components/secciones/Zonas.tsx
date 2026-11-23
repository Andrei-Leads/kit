import { listaY } from "@andrei-leads/core";

/** Zonas (encargo §6.9): una línea corrida con `listaY` de core. Sin zonas, no existe. */
export function Zonas({ zonas }: { zonas: readonly string[] }) {
  if (zonas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-zonas" className="contenedor seccion">
      <h2 id="titulo-zonas" className="versalitas mb-4">
        Zonas
      </h2>
      <p className="m-0 max-w-[44ch] font-titulo text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] leading-[1.35] font-[350]">Trabajamos en {listaY(zonas)}.</p>
    </section>
  );
}
