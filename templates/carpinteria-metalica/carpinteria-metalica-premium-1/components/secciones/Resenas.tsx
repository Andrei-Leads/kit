import Link from "next/link";
import type { CSSProperties } from "react";
import { fechaResena, mediaVisible, type Resena, type SiteConfig, type Trabajo } from "@andrei-leads/core";

import { EnlaceFlecha } from "@/components/EnlaceFlecha";
import { ParejaCta, type DatosCta } from "@/components/ParejaCta";
import { RESPUESTA, TEXTO_WA } from "@/lib/mensajes";

type Props = {
  resenas: readonly Resena[];
  valoracion: SiteConfig["valoracion"];
  fichaGoogle?: string;
  trabajos: readonly Trabajo[];
  cta: DatosCta;
};

/** Más reciente primero (las fechas AAAA-MM[-DD] se ordenan como texto); sin fecha, al final. */
function porFecha(resenas: readonly Resena[]): Resena[] {
  return [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? ""));
}

function Pie({ r }: { r: Resena }) {
  return (
    <p className="m-0 mt-3 text-sm text-texto-suave">
      {r.autor}
      {r.fecha && <> · {fechaResena(r.fecha)}</>}
    </p>
  );
}

/**
 * Reseñas (encargo §6.9): sobre alterna, una grande en Hanken 300 (la más reciente de
 * menos de 280 caracteres), dos pequeñas (una larga se corta a 6 líneas con «Leer entera»
 * en `<details>`, sin JS), el `testimonio` de un trabajo con enlace y «Ver todas en
 * Google →». Pareja al final. Sin reseñas ni testimonio, la sección desaparece.
 */
export function Resenas({ resenas, valoracion, fichaGoogle, trabajos, cta }: Props) {
  const conTestimonio = trabajos.find((t) => t.testimonio);
  if (resenas.length === 0 && !conTestimonio) return null;
  const orden = porFecha(resenas);
  const grande = orden.find((r) => r.texto.length < 280) ?? orden[0];
  const pequenas = orden.filter((r) => r !== grande).slice(0, 2);
  return (
    <section data-tono="claro" aria-labelledby="titulo-resenas" className="seccion bg-alterna">
      <div className="contenedor">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 id="titulo-resenas" className="etiqueta">
            Reseñas
          </h2>
          {valoracion && (
            <p className="m-0 text-sm text-texto-suave">
              {mediaVisible(valoracion.media)} · {valoracion.total} reseñas en Google
            </p>
          )}
        </div>
        {grande && (
          <figure className="m-0 mt-8 max-w-[28ch] lg:mt-10 lg:max-w-[24em]" data-aparecer>
            <blockquote className="fino m-0 text-[32px] leading-[1.18] lg:text-[44px]">«{grande.texto}»</blockquote>
            <figcaption>
              <Pie r={grande} />
            </figcaption>
          </figure>
        )}
        {(pequenas.length > 0 || conTestimonio?.testimonio) && (
          <ul className="m-0 mt-12 grid list-none grid-cols-1 gap-x-6 gap-y-8 p-0 lg:mt-16 lg:grid-cols-3">
            {pequenas.map((r, i) => (
              <li key={`${r.autor}-${r.fecha ?? i}`} data-aparecer style={{ "--i": i } as CSSProperties} className="border-t border-borde pt-6">
                {r.texto.length > 200 ? (
                  <div className="resena-larga">
                    <p className="resena-texto m-0 text-[15px] leading-relaxed">{r.texto}</p>
                    <details>
                      <summary className="mt-2 inline-flex min-h-11 items-center text-sm font-medium underline decoration-1 underline-offset-4">
                        <span className="leer-entera">Leer entera</span>
                        <span className="leer-menos">Leer menos</span>
                      </summary>
                    </details>
                  </div>
                ) : (
                  <p className="m-0 text-[15px] leading-relaxed">{r.texto}</p>
                )}
                <Pie r={r} />
              </li>
            ))}
            {conTestimonio?.testimonio && (
              <li data-aparecer style={{ "--i": pequenas.length } as CSSProperties} className="border-t border-texto pt-6">
                <p className="fino m-0 text-xl leading-snug">«{conTestimonio.testimonio.texto}»</p>
                <p className="m-0 mt-3 text-sm text-texto-suave">
                  {conTestimonio.testimonio.autor} ·{" "}
                  <Link href={`/trabajos/${conTestimonio.slug}`} className="text-texto underline decoration-1 underline-offset-4">
                    {conTestimonio.titulo}
                  </Link>
                </p>
              </li>
            )}
          </ul>
        )}
        {fichaGoogle && resenas.length > 0 && (
          <EnlaceFlecha href={fichaGoogle} externo className="mt-8">
            Ver todas en Google
          </EnlaceFlecha>
        )}
        <ParejaCta cta={cta} textoWhatsapp={TEXTO_WA} confianza={{ texto: RESPUESTA }} className="mt-10 max-w-[620px]" />
      </div>
    </section>
  );
}
