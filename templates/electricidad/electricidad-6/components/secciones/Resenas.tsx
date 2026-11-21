import type { ReactNode } from "react";
import { fechaResena, type Resena, type SiteConfig } from "@andrei-leads/core";

import { Estrellas } from "@/components/Estrellas";
import { Valoracion } from "@/components/Valoracion";

type Props = {
  resenas: readonly Resena[];
  valoracion?: SiteConfig["valoracion"];
  fichaGoogle?: string;
  /** «Lo que dicen de noche» solo con `urgencias24h`; si no, «Lo que dicen de nosotros». */
  deNoche?: boolean;
  /** Contenido al final (la pareja de cierre). */
  children?: ReactNode;
};

/** Las más recientes primero (las que no tienen fecha, al final), sin filtrar por texto. */
function recientes(resenas: readonly Resena[], max: number): Resena[] {
  return [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? "")).slice(0, max);
}

/** Reseñas (encargo §6.6): 3–6 recientes en tarjetas de superficie, texto a 18 px y fecha. Sin reseñas, nada. */
export function Resenas({ resenas, valoracion, fichaGoogle, deNoche, children }: Props) {
  if (resenas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-resenas" className="bg-alterna">
      <div className="contenedor flex flex-col gap-6 py-9 lg:py-13">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="titulo-resenas" className="titulo-h2 m-0">
            {deNoche ? "Lo que dicen de noche" : "Lo que dicen de nosotros"}
          </h2>
          <Valoracion valoracion={valoracion} />
        </div>
        <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-2 lg:grid-cols-3">
          {recientes(resenas, 6).map((r, i) => (
            <li key={`${r.autor}-${i}`} data-aparecer className="flex flex-col gap-3 bg-superficie p-5">
              <Estrellas puntuacion={r.puntuacion} />
              <blockquote className="m-0 flex-1 text-lg leading-[1.45]">
                <p className="m-0">{r.texto}</p>
              </blockquote>
              <p className="m-0 text-sm text-texto-suave">
                <strong className="font-bold text-texto">{r.autor}</strong>
                {r.fecha && <> · {fechaResena(r.fecha)}</>}
              </p>
            </li>
          ))}
        </ul>
        {fichaGoogle && (
          <p className="m-0">
            <a href={fichaGoogle} rel="noopener noreferrer" target="_blank" className="foco inline-flex min-h-11 items-center gap-1 border-b-2 border-texto font-bold text-texto no-underline">
              Ver todas en Google <span aria-hidden="true">›</span>
            </a>
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
