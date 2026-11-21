import Link from "next/link";
import { fechaResena, mediaVisible, type Resena, type SiteConfig } from "@andrei-leads/core";

import { Estrellas } from "@/components/Estrellas";
import { cn } from "@/lib/utils";

type Props = {
  resenas: readonly Resena[];
  valoracion?: SiteConfig["valoracion"];
  fichaGoogle?: string;
  /** "inicio": las 6 más recientes y la primera recortada a 4 líneas. "completa" (/servicios#resenas): todas. */
  variante?: "inicio" | "completa";
};

/** Más recientes primero (las fechas «AAAA-MM[-DD]» se ordenan como texto); sin fecha, al final. */
function recientes(resenas: readonly Resena[]): Resena[] {
  return [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? ""));
}

/** Reseñas: la primera a tamaño grande en condensada y las demás en columnas. Sin reseñas, no existe. */
export function Resenas({ resenas, valoracion, fichaGoogle, variante = "inicio" }: Props) {
  if (resenas.length === 0) return null;
  const completa = variante === "completa";
  const lista = recientes(resenas).slice(0, completa ? undefined : 6);
  const [primera, ...resto] = lista;
  const leerEntera = !completa && primera.texto.length > 220;
  return (
    <section id={completa ? "resenas" : undefined} className="scroll-mt-20 bg-superficie">
      <div className="contenedor seccion-y">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 className="condensada text-h2">Lo que dicen</h2>
          {valoracion && (
            <p className="text-[0.9375rem] text-texto-suave">
              <span className="font-bold text-primario-luz">{mediaVisible(valoracion.media)} ★</span> · {valoracion.total} reseñas en Google
            </p>
          )}
        </div>
        <figure className="mt-7 border-t-3 border-primario-luz pt-5">
          <blockquote>
            <p className={cn("condensada text-[clamp(1.75rem,1.1rem+2.6vw,3.25rem)] leading-[1.08] font-bold text-balance", !completa && "line-clamp-4")}>
              «{primera.texto}»
            </p>
          </blockquote>
          <figcaption className="mt-3.5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[0.9375rem]">
            <Estrellas puntuacion={primera.puntuacion} />
            <span className="font-bold">{primera.autor}</span>
            {primera.fecha && <span className="text-texto-suave">{fechaResena(primera.fecha)}</span>}
            {leerEntera && (
              <Link href="/servicios#resenas" className="inline-flex min-h-11 items-center font-bold text-primario-luz underline underline-offset-4">
                Leer entera<span className="sr-only"> la reseña de {primera.autor}</span>
              </Link>
            )}
          </figcaption>
        </figure>
        {resto.length > 0 && (
          <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-x-8 gap-y-7">
            {resto.map((r) => (
              <figure key={`${r.autor}-${r.fecha ?? ""}`} className="border-t border-borde pt-3.5">
                <Estrellas puntuacion={r.puntuacion} className="text-[0.9375rem]" />
                <blockquote className="mt-2">
                  <p>{r.texto}</p>
                </blockquote>
                <figcaption className="mt-2.5 text-sm">
                  <span className="font-bold">{r.autor}</span>
                  {r.fecha && <span className="text-texto-suave"> · {fechaResena(r.fecha)}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
        {fichaGoogle && (
          <a
            href={fichaGoogle}
            target="_blank"
            rel="noopener"
            className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-primario-luz underline underline-offset-4"
          >
            Ver todas en Google <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </section>
  );
}
