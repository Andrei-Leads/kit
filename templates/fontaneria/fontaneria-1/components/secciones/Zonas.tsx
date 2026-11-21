/** Zonas: panel de destinos de estación, en condensada y mayúsculas separadas por «/». Sin zonas, no existe. */
export function Zonas({ zonas }: { zonas: readonly string[] }) {
  if (zonas.length === 0) return null;
  return (
    <section className="border-t border-borde">
      <div className="contenedor seccion-y flex flex-wrap gap-x-12 gap-y-5">
        <h2 className="condensada flex-[1_1_240px] text-h2">Dónde trabajamos</h2>
        <ul className="flex min-w-0 flex-[3_1_560px] flex-wrap gap-y-0.5">
          {zonas.map((z, i) => (
            <li key={z} className="condensada text-[clamp(1.5rem,1rem+2vw,2.75rem)] leading-[1.15] tracking-[0.01em] uppercase">
              {z}
              {i < zonas.length - 1 && (
                <span aria-hidden="true" className="px-[0.35em] font-normal text-primario-luz">
                  /
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
