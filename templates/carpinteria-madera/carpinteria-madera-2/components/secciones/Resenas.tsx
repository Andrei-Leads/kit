import Link from "next/link";
import { fechaResena, type Resena, type SiteConfig, type Trabajo } from "@andrei-leads/core";

import { lineaValoracion } from "@/lib/textos";

type Props = {
  resenas: readonly Resena[];
  valoracion?: SiteConfig["valoracion"];
  fichaGoogle?: string;
  /** Inicio: el primer trabajo con testimonio va primero, en una tarjeta del campo pleno. */
  testimonio?: Trabajo;
};

/** Las más recientes primero (sin fecha, al final), como mucho 6. */
function recientes(resenas: readonly Resena[]): Resena[] {
  return [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? "")).slice(0, 6);
}

/**
 * Reseñas (encargo §6.7): carril con `scroll-snap` de tarjetas redondeadas; una de una línea o de
 * un párrafo cabe en la misma tarjeta. El testimonio de un trabajo va primero. «Ver todas en
 * Google» solo con `fichaGoogle`. Sin reseñas ni testimonio, no pinta nada.
 */
export function Resenas({ resenas, valoracion, fichaGoogle, testimonio }: Props) {
  const lista = recientes(resenas);
  const test = testimonio?.testimonio;
  if (lista.length === 0 && !test) return null;
  return (
    <section aria-labelledby="h2-resenas" className="seccion overflow-hidden">
      <div className="contenedor">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2 id="h2-resenas" className="h2">
              Lo que dicen al terminar
            </h2>
            {valoracion && (
              <p className="font-semibold">
                <span aria-hidden="true" className="tracking-[1px] text-(--color-estrella)">
                  ★★★★★
                </span>{" "}
                {lineaValoracion(valoracion)}
              </p>
            )}
          </div>
          {fichaGoogle && (
            <a href={fichaGoogle} target="_blank" rel="noopener noreferrer" className="enlace">
              Ver todas en Google →
            </a>
          )}
        </div>
        <ul aria-labelledby="h2-resenas" tabIndex={0} className="carril carril-ancho">
          {testimonio && test && (
            <li className="campo-pleno flex flex-col gap-3.5 rounded-tarjeta p-6">
              <span className="text-[13px] font-bold tracking-[0.04em] uppercase">Sobre un trabajo</span>
              <blockquote className="font-titulo text-xl leading-[1.35] tracking-[-0.01em]">«{test.texto}»</blockquote>
              <span className="mt-auto text-[15px]">
                {test.autor} ·{" "}
                <Link href={`/trabajos/${testimonio.slug}`} className="inline-flex min-h-11 items-center underline underline-offset-[3px]">
                  {testimonio.titulo}
                </Link>
              </span>
            </li>
          )}
          {lista.map((r) => (
            <li key={`${r.autor}-${r.fecha ?? ""}`} className="flex flex-col gap-3 rounded-tarjeta bg-superficie p-6">
              <span role="img" aria-label={`${r.puntuacion} de 5 estrellas`} className="text-[17px] tracking-[2px] text-(--color-estrella)">
                {"★".repeat(Math.round(r.puntuacion))}
                {"☆".repeat(5 - Math.round(r.puntuacion))}
              </span>
              <p className="text-[16.5px] leading-normal">{r.texto}</p>
              <span className="mt-auto text-[14.5px] text-texto-suave">
                <strong className="text-texto">{r.autor}</strong>
                {r.fecha && <> · {fechaResena(r.fecha)}</>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
