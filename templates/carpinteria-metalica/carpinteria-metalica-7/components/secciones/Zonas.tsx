/** Zonas (encargo §6): una línea en condensada separada por barras, nunca enlaces. Sin zonas, no se pinta. */
export function Zonas({ zonas, titulo = "Dónde trabajamos" }: { zonas: readonly string[]; titulo?: string }) {
  if (zonas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-zonas" className="pt-[clamp(36px,5vw,72px)] pb-2">
      <div className="contenedor">
        <h2 id="titulo-zonas" className="h2 mb-2.5">
          {titulo}
        </h2>
        <p className="font-titulo text-[clamp(1.5rem,1.1rem+1.8vw,2.75rem)] leading-[1.12] font-bold text-balance uppercase">{zonas.join(" / ")}</p>
      </div>
    </section>
  );
}
