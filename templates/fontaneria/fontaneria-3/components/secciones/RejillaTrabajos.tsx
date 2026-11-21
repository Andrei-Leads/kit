import Link from "next/link";
import type { Imagen, Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";

const REJILLA =
  "m-0 grid list-none grid-cols-1 gap-x-[clamp(1rem,0.6rem+1.5vw,2rem)] gap-y-[clamp(2rem,1.5rem+2vw,3rem)] p-0 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]";
const SIZES = "(min-width: 768px) 33vw, 100vw";

/**
 * Rejilla de arcos (foto 4:5 con arco arriba) con título, ubicación y año.
 * `precargar`: precarga la primera foto (solo donde es la primera foto visible: /trabajos).
 */
export function RejillaTrabajos({ trabajos, nivel = "h2", precargar }: { trabajos: readonly Trabajo[]; nivel?: "h2" | "h3"; precargar?: boolean }) {
  const Titulo = nivel;
  return (
    <ul className={`rejilla-trabajos ${REJILLA}`}>
      {trabajos.map((t, i) => {
        const meta = [t.ubicacion, t.anio].filter(Boolean).join(" · ");
        return (
          <li key={t.slug} data-servicio={t.servicio}>
            <Link href={`/trabajos/${t.slug}`} className="flex flex-col gap-2.5 no-underline">
              <Foto imagen={t.imagenes[0]} sizes={SIZES} proporcion="4/5" preload={precargar && i === 0} decorativa className="piedra-hover" />
              <Titulo className="m-0 mt-1 font-titulo text-[clamp(1.25rem,1.1rem+0.7vw,1.75rem)] leading-[1.12] font-medium text-balance">{t.titulo}</Titulo>
              {meta && <p className="m-0 text-[0.9375rem] text-texto-suave">{meta}</p>}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Sin trabajos: la galería en arcos, con su título si lo tiene. */
export function RejillaGaleria({ galeria, precargar }: { galeria: readonly (Imagen & { titulo?: string })[]; precargar?: boolean }) {
  return (
    <ul className={REJILLA}>
      {galeria.map((g, i) => (
        <li key={g.src}>
          <figure className="m-0 flex flex-col gap-2.5">
            <Foto imagen={g} sizes={SIZES} proporcion="4/5" preload={precargar && i === 0} />
            {g.titulo && <figcaption className="font-titulo text-[clamp(1.25rem,1.1rem+0.7vw,1.75rem)] leading-[1.12]">{g.titulo}</figcaption>}
          </figure>
        </li>
      ))}
    </ul>
  );
}
