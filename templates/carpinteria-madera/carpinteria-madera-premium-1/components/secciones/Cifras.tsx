import { listaY, mediaVisible, type SiteConfig } from "@andrei-leads/core";

import { ParejaCta } from "@/components/Botones";
import type { DatosCta } from "@/lib/textos";

type Props = {
  anioFundacion?: number;
  valoracion?: SiteConfig["valoracion"];
  zonas: readonly string[];
  garantias: readonly string[];
  marcas: readonly string[];
  cta: DatosCta;
  confianza?: string;
};

/**
 * Cifras (encargo §6.7): 3–4 cifras grandes solo con datos, las garantías en dos
 * columnas con filete y las marcas en una línea. Cada parte existe solo con su dato;
 * sin ninguna, la sección no sale.
 */
export function Cifras({ anioFundacion, valoracion, zonas, garantias, marcas, cta, confianza }: Props) {
  const cifras: { pre: string; num: string; post: string }[] = [];
  if (anioFundacion) cifras.push({ pre: "Desde", num: String(anioFundacion), post: "en el mismo oficio" });
  if (valoracion) cifras.push({ pre: "Valoración", num: mediaVisible(valoracion.media), post: `de 5 · ${valoracion.total} reseñas en Google` });
  if (zonas.length > 3) cifras.push({ pre: "Montamos en", num: String(zonas.length), post: "municipios" });
  if (cifras.length === 0 && garantias.length === 0 && marcas.length === 0) return null;

  return (
    <section data-tono="oscuro" aria-labelledby={garantias.length > 0 ? "titulo-garantias" : undefined} aria-label={garantias.length > 0 ? undefined : "En cifras"} className="seccion sobre-oscuro relative z-[6] bg-tinta text-fondo">
      <div className="contenedor">
        {cifras.length > 0 && (
          <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-10">
            {cifras.map((c) => (
              <div key={c.pre} data-aparecer className="flex flex-col border-t border-fondo/20 pt-5">
                <dt className="etiqueta text-papel-suave">{c.pre}</dt>
                <dd className="m-0 contents">
                  <span className="titulo mt-2.5 text-[clamp(4rem,3rem+3vw,6rem)] leading-none tabular-nums">{c.num}</span>
                  <span className="mt-2.5 text-[15px] text-papel-suave">{c.post}</span>
                </dd>
              </div>
            ))}
          </dl>
        )}
        {garantias.length > 0 && (
          <div className="mt-[clamp(56px,6vw,96px)]">
            <h2 id="titulo-garantias" className="titulo text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-[1.1]">
              Lo que firmamos
            </h2>
            <ul className="m-0 mt-6 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-x-12 p-0">
              {garantias.map((g) => (
                <li key={g} className="border-t border-fondo/20 py-[18px] text-[17px] leading-[1.45]">
                  {g}
                </li>
              ))}
            </ul>
          </div>
        )}
        {marcas.length > 0 && (
          <p className="mt-7 text-[15px] text-papel-suave">
            Herrajes y acabados: <span className="text-fondo">{listaY(marcas)}</span>
          </p>
        )}
        <ParejaCta cta={cta} tono="oscuro" confianza={confianza} className="mt-14" />
      </div>
    </section>
  );
}
