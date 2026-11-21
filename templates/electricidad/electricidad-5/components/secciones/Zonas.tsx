/** Pastillas redondeadas con las zonas. Sin datos, no existe. */
export function Zonas({ zonas }: { zonas: readonly string[] }) {
  if (zonas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-zonas" className="seccion pt-0">
      <div className="contenedor">
        <h2 id="titulo-zonas" className="titulo-seccion">
          Dónde trabajamos
        </h2>
        <ul className="m-0 mt-6 flex list-none flex-wrap gap-2.5 p-0">
          {zonas.map((z) => (
            <li key={z} className="inline-flex min-h-[52px] items-center gap-2.5 rounded-boton bg-superficie px-5 font-semibold">
              <span aria-hidden="true" className="size-2 rounded-full bg-primario" />
              {z}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
