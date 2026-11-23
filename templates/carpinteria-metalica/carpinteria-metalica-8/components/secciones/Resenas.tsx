import Link from "next/link";
import { fechaResena, mediaVisible, type Resena, type SiteConfig, type Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { totalResenas } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  resenas: readonly Resena[];
  valoracion?: SiteConfig["valoracion"];
  fichaGoogle?: string;
  /** Primer trabajo con testimonio (solo en el inicio): nota grande con la miniatura de la obra. */
  testimonio?: Trabajo;
  /** Notas que se muestran (4 en el inicio, 3 en /servicios). */
  max: number;
};

const GUIJARROS = ["rounded-guijarro-1", "rounded-guijarro-2", "rounded-guijarro-3", "rounded-guijarro-4"];

/**
 * «El tablón del taller» (encargo §6.8): las reseñas más recientes como notas en `superficie` con
 * chincheta, giro fijo y alterno de ±1,5° solo en escritorio y sin «reducir movimiento» (CSS
 * `.nota`). Mosaico en 2 columnas en escritorio y apiladas en móvil. Sin reseñas, fuera.
 */
export function Resenas({ resenas, valoracion, fichaGoogle, testimonio, max }: Props) {
  if (resenas.length === 0) return null;
  const notas = [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? "")).slice(0, max);
  const t = testimonio?.testimonio && testimonio;

  return (
    <section id="resenas" aria-labelledby="titulo-resenas" className="contenedor seccion">
      <div className="mb-[clamp(32px,4vw,52px)] flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div className="flex flex-col gap-3">
          <p className="antetitulo">Reseñas</p>
          <h2 id="titulo-resenas" className="h2">
            El tablón del taller
          </h2>
          {valoracion && (
            <p className="text-[17px] text-texto-suave">
              <strong className="text-texto">{mediaVisible(valoracion.media)} de 5</strong> · {totalResenas(valoracion.total)} en Google
            </p>
          )}
        </div>
        {fichaGoogle && (
          <a href={fichaGoogle} target="_blank" rel="noopener" className="enlace">
            Ver todas en Google&nbsp;→
          </a>
        )}
      </div>

      <div className="rounded-[clamp(28px,4vw,48px)_clamp(36px,5vw,60px)_clamp(28px,4vw,48px)_clamp(32px,4.5vw,56px)] bg-alterna p-[clamp(20px,4vw,56px)]">
        {t && t.testimonio && (
          <figure className="nota-grande relative mb-[clamp(20px,3vw,32px)] grid items-center gap-[clamp(16px,3vw,32px)] rounded-[8px_28px_28px_28px] bg-superficie p-[clamp(20px,3vw,32px)] shadow-suave lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <span aria-hidden="true" className="absolute -top-2 left-1/2 size-[18px] -translate-x-1/2 rounded-full bg-acento shadow-[0_2px_3px_rgb(42_32_25/0.3)]" />
            <Foto imagen={t.imagenes[0]} proporcion="4/3" sizes="(min-width: 1024px) 340px, calc(100vw - 80px)" className="rounded-3xl" />
            <div className="flex flex-col gap-3">
              <blockquote className="font-titulo text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] leading-[1.38] text-pretty">«{t.testimonio.texto}»</blockquote>
              <figcaption className="text-[15px] text-texto-suave">
                {t.testimonio.autor} ·{" "}
                <Link href={`/trabajos/${t.slug}`} className="font-semibold text-texto underline underline-offset-4">
                  {t.titulo}
                </Link>
              </figcaption>
            </div>
          </figure>
        )}
        <ul className="gap-x-[clamp(20px,3vw,32px)] lg:columns-2">
          {notas.map((r, i) => (
            <li
              key={`${r.autor}-${r.fecha ?? i}`}
              data-aparecer
              className={cn(
                "nota relative mb-[clamp(20px,3vw,32px)] break-inside-avoid bg-superficie px-6 pt-[26px] pb-[22px] shadow-suave",
                i % 2 ? "rounded-[28px_8px_28px_28px]" : "rounded-[28px_28px_8px_28px]",
              )}
            >
              <span aria-hidden="true" className="chincheta absolute -top-[7px] left-1/2 size-3.5 -translate-x-1/2 rounded-full bg-acento shadow-[0_2px_3px_rgb(42_32_25/0.3)]" />
              <p className="mb-2.5 text-base tracking-[2px] text-acento">
                <span aria-hidden="true">{"★".repeat(Math.round(r.puntuacion)) + "☆".repeat(5 - Math.round(r.puntuacion))}</span>
                <span className="sr-only">{r.puntuacion} de 5 estrellas</span>
              </p>
              <p className="text-[17px] leading-[1.6] text-pretty">{r.texto}</p>
              <div className="mt-4 flex items-center gap-3">
                <span aria-hidden="true" className={cn("flex h-[37px] w-10 flex-none items-center justify-center bg-primario-suave font-titulo text-lg font-medium", GUIJARROS[i % 4])}>
                  {r.autor.charAt(0)}
                </span>
                <span className="flex flex-col leading-[1.3]">
                  <strong className="text-[15px] font-semibold">{r.autor}</strong>
                  {r.fecha && <span className="text-sm text-texto-suave">{fechaResena(r.fecha)}</span>}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
