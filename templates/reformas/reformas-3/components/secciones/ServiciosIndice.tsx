import Link from "next/link";
import type { Servicio, Trabajo } from "@andrei-leads/core";

import { numeroObra, obrasPorServicio, obrasTexto } from "@/lib/obras";

type Props = {
  servicios: readonly Servicio[];
  trabajos: readonly Trabajo[];
  /** Nivel del título de cada fila (h3 bajo el h2 «Servicios» del inicio; h2 en /servicios). */
  nivel?: "h2" | "h3";
};

const ENLACE = "etiqueta flex min-h-11 items-center border-2 border-borde px-3 text-sm no-underline";

/**
 * Tabla de catálogo: número, título en condensada de 24 px, descripción,
 * «desde» y dos enlaces («Ver servicio» y «{n} obras», a `#obras` de la ficha).
 * Cada fila es `flex-wrap`: en escritorio cabe en una línea; en móvil, número
 * y título arriba y el resto debajo. Con 10 servicios, una tabla de 10 filas.
 */
export function ServiciosIndice({ servicios, trabajos, nivel = "h3" }: Props) {
  const recuento = obrasPorServicio(trabajos);
  const Titulo = nivel;
  return (
    <ol className="m-0 list-none border-t-2 border-borde p-0">
      {servicios.map((s, i) => {
        const n = recuento.get(s.slug) ?? 0;
        return (
          <li key={s.slug} className="flex flex-wrap items-baseline gap-x-5 gap-y-1.5 border-b-2 border-borde py-3.5">
            <span aria-hidden="true" className="condensada w-8 text-xl text-texto-suave">
              {numeroObra(i)}
            </span>
            <Titulo className="condensada m-0 flex-[1_1_220px] text-2xl leading-none">
              <Link href={`/servicios/${s.slug}`} className="text-texto no-underline hover:text-primario">
                {s.titulo}
              </Link>
            </Titulo>
            <p className="m-0 flex-[3_1_300px] text-[15px] leading-[1.45] text-texto-suave">{s.descripcion}</p>
            {s.precioDesde && <span className="flex-none text-[15px] font-semibold">{s.precioDesde}</span>}
            <div className="flex flex-none gap-1.5">
              <Link href={`/servicios/${s.slug}`} className={`${ENLACE} text-texto hover:bg-negro hover:text-sobre-negro`} aria-label={`Ver servicio: ${s.titulo}`}>
                Ver servicio
              </Link>
              {n > 0 && (
                <Link
                  href={`/servicios/${s.slug}#obras`}
                  className={`${ENLACE} bg-negro text-sobre-negro hover:border-primario hover:bg-primario hover:text-sobre-primario`}
                  aria-label={`${obrasTexto(n)} de ${s.titulo.toLowerCase()}`}
                >
                  {obrasTexto(n)}
                </Link>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
