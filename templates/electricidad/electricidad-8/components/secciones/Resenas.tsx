import type { ReactNode } from "react";
import { mediaVisible, type Resena, type SiteConfig } from "@andrei-leads/core";

import { Flecha } from "@/components/Iconos";
import { H2, Rotulo } from "@/components/Rotulo";
import { fechaCorta } from "@/lib/formato";
import { cn } from "@/lib/utils";

/** Las más recientes primero (las que no tienen fecha, al final); como mucho 6. */
function recientes(resenas: readonly Resena[]): Resena[] {
  return [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? "")).slice(0, 6);
}

/**
 * `Resenas` (encargo §6.7): la valoración arriba como cifra; citas en la serif a 22 px con comillas
 * tipográficas, autor y fecha en versalitas. «Ver todas en Google» solo con ficha. Sin reseñas, no
 * existe. `children`: la pareja de botones que cierra el bloque.
 */
export function Resenas({
  resenas,
  valoracion,
  fichaGoogle,
  n,
  children,
}: {
  resenas: readonly Resena[];
  valoracion?: SiteConfig["valoracion"];
  fichaGoogle?: string;
  n: string;
  children?: ReactNode;
}) {
  if (resenas.length === 0) return null;
  return (
    <section aria-labelledby="h2-resenas" className="contenedor py-14 lg:py-24">
      <Rotulo n={n} texto="Reseñas" />
      <div className="mt-4 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
        <h2 id="h2-resenas" className={H2}>
          Lo que dicen de nosotros
        </h2>
        {valoracion && (
          <p className="flex items-baseline gap-3">
            <span className="cifras-antiguas font-titulo text-cifra leading-none">{mediaVisible(valoracion.media)}</span>
            <span className="versalitas text-texto-suave">
              de 5 · {valoracion.total} reseñas en Google
            </span>
          </p>
        )}
      </div>
      <ul className="mt-8 grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
        {recientes(resenas).map((r) => (
          <li key={`${r.autor}-${r.fecha ?? ""}`} className="border-t border-linea-plano py-6">
            <figure>
              <p className="tracking-[0.12em] text-[0.8125rem]">
                <span aria-hidden="true">
                  {"★".repeat(r.puntuacion)}
                  {"☆".repeat(5 - r.puntuacion)}
                </span>
                <span className="sr-only">{r.puntuacion} de 5</span>
              </p>
              <blockquote className="mt-3 font-titulo text-[1.375rem] leading-snug">«{r.texto}»</blockquote>
              <figcaption className="versalitas mt-4 text-texto-suave">
                {[r.autor, r.fecha && fechaCorta(r.fecha)].filter(Boolean).join(" · ")}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      {fichaGoogle && (
        <a
          href={fichaGoogle}
          rel="noopener"
          className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-semibold text-acento underline decoration-1 underline-offset-[5px] hover:decoration-2 focus-visible:outline-2 focus-visible:outline-foco"
        >
          Ver todas en Google <Flecha />
        </a>
      )}
      {children && <div className={cn("mt-8")}>{children}</div>}
    </section>
  );
}
