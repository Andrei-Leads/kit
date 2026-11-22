/** Zonas en condensada, en línea, separadas por «/» en primario. Sin zonas, no sale. */
export function Zonas({ zonas }: { zonas: readonly string[] }) {
  if (zonas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-zonas" className="contenedor pt-(--seccion)">
      <h2 id="titulo-zonas" className="etiqueta m-0 border-t-2 border-borde pt-3.5 text-[15px] text-texto-suave">
        Zonas donde trabajamos
      </h2>
      <ul className="m-0 mt-3 flex list-none flex-wrap gap-y-1 p-0">
        {zonas.map((z, k) => (
          <li key={z} className="condensada text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] leading-[1.05]">
            {z}
            {k < zonas.length - 1 && (
              <span aria-hidden="true" className="px-[0.3em] text-primario">
                /
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
