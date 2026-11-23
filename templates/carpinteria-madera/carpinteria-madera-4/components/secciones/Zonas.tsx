/** «Trabajamos en» (encargo §6.8): una línea condensada con los municipios separados por barras. Sin zonas, no sale. */
export function Zonas({ zonas }: { zonas: readonly string[] }) {
  if (zonas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-zonas" className="contenedor pt-(--seccion)">
      <div className="flex flex-col gap-2 border-t-2 border-borde pt-3">
        <h2 id="titulo-zonas" className="pie-ficha m-0 text-texto-suave">
          Trabajamos en
        </h2>
        <p className="ft m-0 text-[clamp(1.375rem,1rem+1.6vw,2.5rem)] leading-[1.05]">
          {zonas.map((z, i) => (
            <span key={z}>
              {i > 0 && <span aria-hidden="true"> / </span>}
              {i > 0 && <span className="sr-only">, </span>}
              {z}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
