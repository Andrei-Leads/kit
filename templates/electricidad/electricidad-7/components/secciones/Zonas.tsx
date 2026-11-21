/** Zonas como pastillas (nunca enlaces). Sin zonas, nada. */
export function Zonas({ zonas, titulo = "Dónde trabajamos" }: { zonas: readonly string[]; titulo?: string }) {
  if (zonas.length === 0) return null;
  return (
    <section aria-labelledby="h-zonas" className="contenedor pt-[clamp(48px,2.5rem+3vw,96px)]">
      <div className="flex flex-wrap gap-x-[clamp(32px,6vw,96px)] gap-y-4">
        <h2 id="h-zonas" className="m-0 flex-[1_1_260px] text-h2 leading-[1.1] font-black">
          {titulo}
        </h2>
        <ul className="m-0 flex flex-[2_1_340px] list-none flex-wrap gap-2 p-0">
          {zonas.map((z) => (
            <li key={z} className="rounded-boton border border-linea-fuerte bg-superficie px-4 py-[9px] text-[15.5px] font-bold">
              {z}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
