/** «Dónde trabajamos»: píldoras redondeadas, sin enlace (nunca páginas por municipio). */
export function Zonas({ zonas }: { zonas: readonly string[] }) {
  if (zonas.length === 0) return null;
  return (
    <section aria-labelledby="h2-zonas" className="seccion">
      <div className="contenedor flex flex-col gap-5">
        <h2 id="h2-zonas" className="h2">
          Dónde trabajamos
        </h2>
        <ul className="flex flex-wrap gap-2">
          {zonas.map((z) => (
            <li key={z} className="rounded-full border border-borde bg-superficie px-[18px] py-2.5">
              {z}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
