import { fechaResena, mediaVisible, type Resena, type SiteConfig } from "@andrei-leads/core";

/**
 * Reseñas (encargo §6.6): las 6 más recientes en tarjetas rectas con una línea de estado
 * («★★★★★ · octubre de 2026»). Las largas se ven enteras. «Ver todas en Google» solo con ficha.
 */
export function Resenas({
  resenas,
  valoracion,
  fichaGoogle,
}: {
  resenas: readonly Resena[];
  valoracion?: SiteConfig["valoracion"];
  fichaGoogle?: string;
}) {
  if (resenas.length === 0) return null;
  const recientes = [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? "")).slice(0, 6);
  return (
    <section aria-labelledby="h2-resenas" className="contenedor pt-[clamp(40px,6vw,72px)]">
      <div className="mb-[18px] flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2">
        <h2 id="h2-resenas" className="h2">
          Reseñas
        </h2>
        {valoracion && (
          <p className="cifras text-[17px] font-medium">
            <span aria-hidden="true">★ </span>
            {mediaVisible(valoracion.media)} de 5 · {valoracion.total} reseñas
          </p>
        )}
      </div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] items-start gap-3">
        {recientes.map((r) => (
          <li key={r.autor + r.texto} data-aparecer="" className="border border-carril bg-superficie">
            <p className="cifras flex items-center gap-2 border-b border-carril px-3.5 py-2 text-sm">
              <span role="img" aria-label={`${r.puntuacion} de 5 estrellas`} className="tracking-[0.08em]">
                <span className="text-texto">{"★".repeat(r.puntuacion)}</span>
                <span className="text-apagado">{"★".repeat(5 - r.puntuacion)}</span>
              </span>
              {r.fecha && <span className="text-texto-suave">· {fechaResena(r.fecha)}</span>}
            </p>
            <blockquote className="flex flex-col gap-2 px-3.5 pt-3 pb-3.5">
              <p className="text-[17px] leading-[1.45]">{r.texto}</p>
              <footer className="text-[15px] font-semibold">{r.autor}</footer>
            </blockquote>
          </li>
        ))}
      </ul>
      {fichaGoogle && (
        <a href={fichaGoogle} target="_blank" rel="noopener" className="enlace mt-2 inline-flex min-h-11 items-center">
          Ver todas en Google ›
        </a>
      )}
    </section>
  );
}
