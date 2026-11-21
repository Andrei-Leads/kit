/** Zonas (encargo §6.7): etiquetas rectas como los bornes numerados de una regleta. Sin datos, se oculta. */
export function Zonas({ zonas, titulo = "Dónde trabajamos" }: { zonas: readonly string[]; titulo?: string }) {
  if (zonas.length === 0) return null;
  return (
    <section aria-labelledby="h2-zonas" className="contenedor pt-[clamp(40px,6vw,72px)]">
      <h2 id="h2-zonas" className="h2 mb-4">
        {titulo}
      </h2>
      <ul className="flex flex-wrap gap-2">
        {zonas.map((z, i) => (
          <li key={z} className="flex border border-borde bg-superficie">
            <span aria-hidden="true" className="cifras flex min-w-[30px] items-center justify-center border-r border-borde bg-alterna text-[13px] font-semibold">
              {i + 1}
            </span>
            <span className="px-3 py-1.5 font-medium">{z}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
