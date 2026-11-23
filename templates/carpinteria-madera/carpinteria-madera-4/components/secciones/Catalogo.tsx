import Link from "next/link";
import type { Servicio, Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { numeroPieza, recientes } from "@/lib/piezas";

type Props = {
  servicios: readonly Servicio[];
  trabajos: readonly Trabajo[];
  /** Nivel del título de cada servicio (h3 bajo el h2 del inicio; h2 en /servicios). */
  nivel?: "h2" | "h3";
};

/**
 * Catálogo de servicios (encargo §6.3): lista numerada con líneas negras, a 2 columnas en escritorio.
 * Cada fila enlaza a su ficha: número de acento, título en condensada, descripción corta,
 * `precioDesde` tal cual y una miniatura 1:1 a la derecha (la pieza más reciente de ese servicio o,
 * si no hay, la primera foto del servicio). Sin foto, la fila va sin miniatura (índice de catálogo).
 */
export function Catalogo({ servicios, trabajos, nivel = "h3" }: Props) {
  const Titulo = nivel;
  const orden = recientes(trabajos);
  return (
    <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-x-[clamp(1rem,0.5rem+2vw,3rem)] border-b-2 border-borde p-0">
      {servicios.map((s, i) => {
        const miniatura = orden.find((p) => p.trabajo.servicio === s.slug)?.trabajo.imagenes[0] ?? s.imagenes[0];
        return (
          <li key={s.slug} className="flex min-w-0 border-t-2 border-borde">
            <Link
              href={`/servicios/${s.slug}`}
              className="flex min-w-0 flex-1 items-start gap-3.5 py-3.5 text-texto no-underline [@media(hover:hover)]:hover:bg-fila"
            >
              <span aria-hidden="true" className="ft numero min-w-[2.2ch] flex-none text-[clamp(1.75rem,1.3rem+1.4vw,2.75rem)] leading-[0.9]">
                {numeroPieza(i)}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <Titulo className="ft m-0 text-[clamp(1.375rem,1.1rem+0.9vw,2rem)] leading-[0.95] text-balance">{s.titulo}</Titulo>
                <span className="text-[0.9375rem] leading-[1.4] text-texto-suave">{s.descripcion}</span>
                {s.precioDesde && <span className="pie-ficha">{s.precioDesde}</span>}
              </span>
              {miniatura && (
                <Foto
                  imagen={miniatura}
                  proporcion="1/1"
                  sizes="(min-width: 1024px) 104px, 72px"
                  decorativa
                  etiqueta="corta"
                  className="w-[clamp(64px,50px+4vw,104px)] flex-none"
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
