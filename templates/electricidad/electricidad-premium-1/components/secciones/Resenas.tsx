import { mediaVisible, type SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Antetitulo, EnlaceFlecha, Senal, Titular } from "@/components/Titular";
import { fechaCorta, type DatosCta } from "@/lib/textos";

type Props = Pick<SiteConfig, "resenas" | "valoracion"> & {
  fichaGoogle?: string;
  cta?: DatosCta;
  /** Versión corta (en /servicios): solo tres en fila, sin titular grande. */
  corta?: boolean;
};

/**
 * Reseñas (encargo §6.8): 3–6 recientes. La primera en Schibsted a 32 px con
 * comillas tipográficas; el resto en columnas a 18 px; autor y fecha en
 * mayúsculas de 12 px. «Ver todas en Google» con `fichaGoogle`. Sin reseñas, no
 * se pinta.
 */
export function Resenas({ resenas, valoracion, fichaGoogle, cta, corta }: Props) {
  if (resenas.length === 0) return null;
  const orden = [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? ""));
  const lista = orden.slice(0, corta ? 3 : 6);
  const [primera, ...resto] = corta ? [undefined, ...lista] : lista;
  const autor = (r: (typeof resenas)[number]) => [r.autor, r.fecha && fechaCorta(r.fecha)].filter(Boolean).join(" · ");
  return (
    <section data-tono="oscuro" aria-labelledby="titulo-resenas" className="seccion">
      <div className="contenedor flex flex-col gap-[clamp(40px,2rem+2vw,64px)]">
        <div className={corta ? "sr-only" : "flex flex-wrap items-end justify-between gap-6"}>
          <div className="flex flex-col gap-6">
            <Antetitulo>Reseñas</Antetitulo>
            <Titular
              id="titulo-resenas"
              lineas={[
                <>
                  Lo que <Senal>cuentan</Senal>.
                </>,
              ]}
            />
          </div>
          {valoracion && (
            <p className="m-0 flex items-baseline gap-3">
              <span className="font-texto text-[clamp(2.5rem,2rem+1.5vw,3.5rem)] leading-none font-extralight tabular-nums">{mediaVisible(valoracion.media)}</span>
              <span className="text-texto-suave">{valoracion.total} reseñas en Google</span>
            </p>
          )}
        </div>

        {primera && (
          <figure data-aparecer className="m-0 max-w-[880px]">
            <blockquote className="m-0 font-titulo text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-[1.3] tracking-[-0.01em]">
              <p className="m-0">«{primera.texto}»</p>
            </blockquote>
            <figcaption className="etiqueta mt-4 text-texto-suave">{autor(primera)}</figcaption>
          </figure>
        )}

        {resto.length > 0 && (
          <ul className="m-0 grid list-none gap-x-12 gap-y-8 p-0 md:grid-cols-2 lg:grid-cols-3">
            {resto.map((r, i) =>
              r ? (
                <li key={`${r.autor}-${i}`} data-aparecer className="border-t border-[var(--color-linea)] pt-5">
                  <figure className="m-0">
                    <blockquote className="m-0 text-lg leading-snug">
                      <p className="m-0">«{r.texto}»</p>
                    </blockquote>
                    <figcaption className="etiqueta mt-3 text-texto-suave">{autor(r)}</figcaption>
                  </figure>
                </li>
              ) : null,
            )}
          </ul>
        )}

        {fichaGoogle && !corta && (
          <EnlaceFlecha href={fichaGoogle} externo>
            Ver todas en Google
          </EnlaceFlecha>
        )}
        {cta && <Pareja cta={cta} tamano="cierre" />}
      </div>
    </section>
  );
}
