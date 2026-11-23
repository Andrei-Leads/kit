import type { Resena, SiteConfig } from "@andrei-leads/core";

import { Encabezado } from "@/components/Encabezado";
import { dosCifras, textoValoracion } from "@/lib/textos";

type Props = {
  resenas: readonly Resena[];
  valoracion?: SiteConfig["valoracion"];
  fichaGoogle?: string;
  n?: string;
  id?: string;
};

/** Más de 280 caracteres: se corta a 6 líneas con «Leer entera». */
const LARGA = 280;

/**
 * `Observaciones` (encargo §6.7): las 3 reseñas más recientes como observaciones de plano, con la
 * fecha en mono («2026-09») y la puntuación con 5 marcas de cota. Una reseña larga se corta a 6
 * líneas con «Leer entera» (`<details>` nativo: el texto entero está siempre en el HTML).
 * «Ver todas en Google» solo con `fichaGoogle`. Sin reseñas, no pinta nada.
 */
export function Observaciones({ resenas, valoracion, fichaGoogle, n, id }: Props) {
  if (resenas.length === 0) return null;
  const recientes = [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? "")).slice(0, 3);
  return (
    <section id={id} aria-labelledby="titulo-observaciones" className="gutter seccion">
      <Encabezado n={n} etiqueta="OBSERVACIONES" titulo="Lo que dicen al terminar" id="titulo-observaciones">
        {(valoracion || fichaGoogle) && (
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2 font-titulo text-sm">
            {valoracion && <span>{textoValoracion(valoracion)} en Google</span>}
            {fichaGoogle && (
              <a href={fichaGoogle} rel="noopener" className="inline-flex min-h-11 items-center underline underline-offset-[3px]">
                Ver todas en Google ↗
              </a>
            )}
          </p>
        )}
      </Encabezado>
      <ul className="ancho grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-7 gap-y-8">
        {recientes.map((r, i) => (
          <li key={`${r.autor}-${r.fecha ?? i}`} className="resena flex flex-col gap-3 border-t border-texto pt-3.5">
            <div className="etiqueta flex items-center justify-between gap-3">
              <span>OBS. {dosCifras(i + 1)}</span>
              {r.fecha && <span>{r.fecha.slice(0, 7)}</span>}
            </div>
            <div role="img" aria-label={`${r.puntuacion} de 5`} className="flex h-4 items-end gap-[5px]">
              {[1, 2, 3, 4, 5].map((k) => (
                <span key={k} className={k <= r.puntuacion ? "h-4 w-0.5 bg-texto" : "h-4 w-0.5 bg-borde"} />
              ))}
            </div>
            {r.texto.length > LARGA ? (
              <>
                <p className="resena-corta text-base leading-[1.6]">{r.texto}</p>
                <details>
                  <summary className="inline-flex min-h-11 cursor-pointer list-none items-center font-titulo text-[13px] underline underline-offset-[3px]">
                    <span className="leer-abrir">Leer entera</span>
                    <span className="leer-cerrar">Leer menos</span>
                  </summary>
                </details>
              </>
            ) : (
              <p className="text-base leading-[1.6] text-pretty">{r.texto}</p>
            )}
            <span className="etiqueta text-texto-suave">— {r.autor}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
