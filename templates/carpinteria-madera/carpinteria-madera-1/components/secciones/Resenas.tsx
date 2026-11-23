import { fechaResena, type Resena, type SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { TituloSeccion } from "@/components/TituloSeccion";
import { estrellas, lineaValoracion, resenasRecientes, type DatosCta } from "@/lib/textos";

type Props = Pick<SiteConfig, "resenas" | "valoracion"> & { fichaGoogle?: string; cta: DatosCta };

/** «★★★★★ · Autor · septiembre de 2026»; la puntuación, en texto para el lector de pantalla. */
export function PieResena({ resena }: { resena: Resena }) {
  return (
    <>
      <span aria-hidden="true">{estrellas(resena.puntuacion)}</span>
      <span className="sr-only">{Math.round(resena.puntuacion)} de 5</span> · {resena.autor}
      {resena.fecha && <> · {fechaResena(resena.fecha)}</>}
    </>
  );
}

/**
 * Reseñas (encargo §6.6): el h2 es la valoración («4,9 · 86 reseñas en Google»). La más reciente,
 * grande en serif cursiva; las 3 siguientes en columna, cortadas a 6 líneas solo a la vista (el
 * texto entero está en el HTML). «Ver todas en Google» solo con `fichaGoogle`. Sin reseñas, no existe.
 */
export function Resenas({ resenas, valoracion, fichaGoogle, cta }: Props) {
  if (resenas.length === 0) return null;
  const [grande, ...resto] = resenasRecientes(resenas);
  return (
    <section aria-labelledby="titulo-resenas" className="marco seccion">
      <TituloSeccion id="titulo-resenas" className="mb-[clamp(32px,4vw,56px)]">
        {valoracion ? lineaValoracion(valoracion) : "Lo que dicen de nosotros"}
      </TituloSeccion>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-x-[clamp(32px,5vw,80px)] gap-y-12">
        <figure data-aparecer>
          <blockquote className="font-titulo text-[clamp(2rem,1.4rem+2.4vw,3.5rem)] leading-[1.12] tracking-[-0.015em] text-balance italic">
            «{grande.texto}»
          </blockquote>
          <figcaption className="mt-5 text-[15px] text-texto-suave">
            <PieResena resena={grande} />
          </figcaption>
        </figure>
        {(resto.length > 0 || fichaGoogle) && (
          <div className="grid content-start">
            {resto.slice(0, 3).map((r) => (
              <figure key={r.autor + r.texto} className="border-t border-filete py-5">
                <blockquote className="line-clamp-6">{r.texto}</blockquote>
                <figcaption className="mt-2 text-sm text-texto-suave">
                  <PieResena resena={r} />
                </figcaption>
              </figure>
            ))}
            {fichaGoogle && (
              <a href={fichaGoogle} className="enlace con-flecha inline-flex min-h-11 items-center justify-self-start text-[15px]">
                Ver todas en Google <span aria-hidden="true" className="flecha ml-1">→</span>
              </a>
            )}
          </div>
        )}
      </div>
      <Pareja cta={cta} className="mt-[clamp(48px,6vw,80px)]" />
    </section>
  );
}
