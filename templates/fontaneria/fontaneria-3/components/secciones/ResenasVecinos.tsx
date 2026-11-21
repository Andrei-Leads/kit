import Link from "next/link";
import { fechaResena, mediaVisible, type Resena, type SiteConfig } from "@andrei-leads/core";

import { Estrellas } from "@/components/Estrellas";
import { Pareja } from "@/components/Pareja";
import { enlaceFlecha } from "@/lib/botones";
import { fuenteResena, resenasRecientes } from "@/lib/resenas";
import { piedra, type DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  resenas: readonly Resena[];
  valoracion?: SiteConfig["valoracion"];
  fichaGoogle?: string;
  cta: DatosCta;
  /**
   * "inicio": las 6 más recientes, la destacada recortada a 6 líneas con «Leer entera».
   * "completa" (/servicios, `id="resenas"`): todas, sin recortes.
   * "servicio": solo la más reciente.
   */
  variante?: "inicio" | "completa" | "servicio";
  titulo?: string;
  textoWhatsapp?: string;
};

/** Más de 60 caracteres: puede ir como cita a tamaño de titular. */
const MIN_DESTACADA = 60;
/** Menos de 70: piedra con la cita en cursiva. */
const MAX_CORTA = 70;
/** Más de 200: piedra a dos columnas en escritorio. */
const MIN_ANCHA = 200;
/**
 * Más de 120 caracteres pueden pasar de 6 líneas de cita a 375 px: se recortan
 * y llevan «Leer entera». Por debajo, la cita sale entera, sin recorte.
 */
const MIN_LEER_ENTERA = 120;

function meta(r: Resena): string {
  return [r.fecha ? fechaResena(r.fecha) : undefined, fuenteResena(r.fuente)].filter(Boolean).join(" · ");
}

const COLUMNAS: Record<number, string> = { 1: "md:grid-cols-1", 2: "md:grid-cols-2", 3: "md:grid-cols-3" };

/**
 * Sección estrella: lo que dicen los vecinos. La más reciente de más de 60
 * caracteres va como cita a tamaño de titular (Fraunces cursiva); las demás, en
 * piedras de tamaños variables con el texto entero. Fecha como «noviembre de
 * 2026» (nunca relativa). Cierra con la valoración grande, la pareja de botones
 * y «Ver todas las reseñas en Google» (solo con ficha). Sin reseñas, no existe.
 */
export function ResenasVecinos({ resenas, valoracion, fichaGoogle, cta, variante = "inicio", titulo = "Lo que dicen los vecinos", textoWhatsapp }: Props) {
  if (resenas.length === 0) return null;
  const completa = variante === "completa";
  const todas = resenasRecientes(resenas);
  const lote = completa ? todas : todas.slice(0, 6);
  const iDestacada = lote.findIndex((r) => r.texto.length > MIN_DESTACADA);
  const destacada = iDestacada >= 0 ? lote[iDestacada] : undefined;
  let resto = lote.filter((_, i) => i !== iDestacada);
  if (variante === "servicio") resto = destacada ? [] : resto.slice(0, 1);
  const columnas = Math.max(1, Math.min(3, resto.length));
  const leerEntera = destacada && !completa && destacada.texto.length > MIN_LEER_ENTERA;
  const media = valoracion ? mediaVisible(valoracion.media) : undefined;

  return (
    <section id={completa ? "resenas" : undefined} aria-labelledby="titulo-resenas" className="pt-[clamp(4rem,3rem+4vw,7.5rem)] pb-[clamp(3rem,2rem+3vw,5rem)]">
      <div className="contenedor">
        <h2 id="titulo-resenas" className="titulo-seccion max-w-[18ch]">
          {titulo}
        </h2>

        {destacada && (
          <figure className="mt-[clamp(2rem,1.5rem+2vw,3.5rem)] mb-0 max-w-[1000px]">
            <blockquote
              data-aparecer
              className={cn(
                "m-0 font-titulo text-cita font-normal tracking-[-0.01em] italic",
                leerEntera && "line-clamp-6",
              )}
            >
              «{destacada.texto}»
            </blockquote>
            <figcaption className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 leading-snug">
              <Estrellas puntuacion={destacada.puntuacion} className="text-xl text-acento" />
              <strong className="font-bold">{destacada.autor}</strong>
              {meta(destacada) && <span className="text-texto-suave">{meta(destacada)}</span>}
              {leerEntera && (
                <Link href="/servicios#resenas" className="inline-flex min-h-11 items-center font-bold text-texto underline">
                  Leer entera<span className="sr-only"> la reseña de {destacada.autor}</span>
                </Link>
              )}
            </figcaption>
          </figure>
        )}

        {resto.length > 0 && (
          <ul
            className={cn(
              "m-0 mt-[clamp(2.5rem,2rem+2vw,4rem)] grid list-none grid-flow-dense grid-cols-1 items-start gap-[clamp(0.75rem,0.5rem+1vw,1.25rem)] p-0",
              COLUMNAS[columnas],
            )}
          >
            {resto.map((r, i) => {
              const corta = r.texto.length < MAX_CORTA;
              const ancha = columnas > 1 && r.texto.length > MIN_ANCHA;
              return (
                <li
                  key={`${r.autor}-${i}`}
                  data-piedra
                  className={cn(
                    "piedra-hover flex flex-col gap-3.5 bg-superficie p-[clamp(1.5rem,1.2rem+1vw,2.25rem)]",
                    piedra(i + 1),
                    ancha && "md:col-span-2",
                  )}
                >
                  <Estrellas puntuacion={r.puntuacion} className="text-[1.0625rem] leading-none text-acento" />
                  {corta ? (
                    <p className="m-0 font-titulo text-[clamp(1.375rem,1.2rem+0.8vw,1.875rem)] leading-[1.2] text-balance italic">«{r.texto}»</p>
                  ) : (
                    <p className="m-0 leading-[1.55]">{r.texto}</p>
                  )}
                  <p className="m-0 mt-auto flex flex-wrap gap-x-3 gap-y-1 text-[0.9375rem] leading-snug">
                    <strong>{r.autor}</strong>
                    {meta(r) && <span className="text-texto-suave">{meta(r)}</span>}
                  </p>
                </li>
              );
            })}
          </ul>
        )}

        <div className="onda-fina mt-[clamp(2.5rem,2rem+2vw,4rem)] flex flex-wrap items-center justify-between gap-x-10 gap-y-6 pt-[clamp(2rem,1.5rem+2vw,3rem)]">
          {valoracion && (
            <div className="flex items-center gap-4">
              <span className="font-titulo text-[clamp(4rem,3rem+4vw,6.5rem)] leading-[0.9] font-medium tracking-[-0.03em]">{media}</span>
              <span className="leading-snug">
                <Estrellas puntuacion={valoracion.media} etiqueta={`${media} de 5 estrellas`} className="block text-[1.375rem] text-acento" />
                <span className="font-semibold">{valoracion.total} reseñas en Google</span>
              </span>
            </div>
          )}
          <div className="flex max-w-[640px] flex-[1_1_320px] flex-col gap-3">
            <Pareja cta={cta} linea={null} textoWhatsapp={textoWhatsapp} />
            {fichaGoogle && (
              <a href={fichaGoogle} target="_blank" rel="noopener noreferrer" className={cn(enlaceFlecha, "underline")}>
                Ver todas las reseñas en Google →
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
