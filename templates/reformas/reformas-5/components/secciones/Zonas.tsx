import { listaY } from "@andrei-leads/core";

/** «Dónde trabajamos»: las zonas en texto corrido («Valencia, Torrent… y Burjassot.»). */
export function Zonas({ zonas }: { zonas: readonly string[] }) {
  if (zonas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-zonas" className="seccion">
      <div className="contenedor grid gap-x-16 gap-y-4 lg:grid-cols-2">
        <h2 id="titulo-zonas" className="titulo-seccion">
          Dónde trabajamos
        </h2>
        <p className="m-0 text-(length:--text-entrada) leading-[1.55]">{listaY(zonas)}.</p>
      </div>
    </section>
  );
}
