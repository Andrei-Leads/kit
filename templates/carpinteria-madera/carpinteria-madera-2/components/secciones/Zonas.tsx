/** Zonas (encargo §6.9): píldoras de texto (no enlaces: nada de páginas por municipio). Sin zonas, no existe. */
export function Zonas({ zonas }: { zonas: readonly string[] }) {
  if (zonas.length === 0) return null;
  return (
    <section aria-labelledby="h2-zonas" className="py-[clamp(48px,7vw,96px)]">
      <div className="contenedor flex flex-col gap-6">
        <h2 id="h2-zonas" className="h2">
          Dónde montamos
        </h2>
        <ul className="flex flex-wrap gap-2.5">
          {zonas.map((z) => (
            <li key={z} className="rounded-full border border-borde bg-superficie px-5 py-2.5 text-base font-semibold">
              {z}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
