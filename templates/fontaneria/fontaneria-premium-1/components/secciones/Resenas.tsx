import type { CSSProperties } from "react";
import { fechaResena, mediaVisible, type SiteConfig } from "@andrei-leads/core";

import { EnlaceFlecha, Pareja } from "@/components/Botones";
import { Estrellas } from "@/components/Iconos";
import { destacarFinal } from "@/lib/textos";
import type { DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  config: Pick<SiteConfig, "resenas" | "valoracion" | "trabajos" | "contacto">;
  cta: DatosCta;
  /** Cuántas reseñas en columnas (las más recientes primero). */
  max?: number;
};

/**
 * Reseñas (encargo §6.8). Arriba, la cita del primer `trabajos[].testimonio`
 * con sus últimas palabras destacadas y, al lado, la valoración en cifra. Sin
 * testimonio, la valoración sube a cifra grande (no se convierte una reseña en
 * cita para no inventar contexto). Debajo, hasta 3 reseñas en columnas con
 * estrellas, fecha y autor. «Ver todas en Google» solo con `fichaGoogle`.
 * Sin reseñas, no existe.
 */
export function Resenas({ config, cta, max = 3 }: Props) {
  const { resenas, valoracion, trabajos, contacto } = config;
  if (resenas.length === 0) return null;
  const conTestimonio = trabajos.find((t) => t.testimonio);
  const lista = [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? "")).slice(0, max);

  const cifra = valoracion && (
    <div className={cn("flex flex-col gap-2", conTestimonio && "lg:items-start lg:justify-self-end")}>
      <p className={cn("titulo m-0 leading-none font-extralight", conTestimonio ? "text-[72px] lg:text-[88px]" : "text-[96px] lg:text-[140px]")}>
        {mediaVisible(valoracion.media)}
      </p>
      <Estrellas puntuacion={valoracion.media} className="text-acento" />
      <p className="m-0 text-sm text-texto-suave">{valoracion.total} reseñas en Google</p>
    </div>
  );

  return (
    <section data-tono="claro" aria-labelledby="titulo-resenas" className="seccion bg-fondo">
      <div className="contenedor flex flex-col gap-14 lg:gap-[72px]">
        <div className={cn("grid gap-10", conTestimonio && cifra && "lg:grid-cols-[minmax(0,640px)_1fr] lg:items-center")}>
          <div className="flex flex-col gap-[18px]">
            <p className="etiqueta">Reseñas</p>
            {conTestimonio?.testimonio ? (
              <figure className="m-0 flex flex-col gap-5">
                <h2 id="titulo-resenas" className="sr-only">
                  Lo que dicen nuestros clientes
                </h2>
                <blockquote className="titulo m-0 text-[30px] leading-[1.15] lg:text-[48px]">
                  <Cita texto={conTestimonio.testimonio.texto} />
                </blockquote>
                <figcaption className="text-sm text-texto-suave">
                  {conTestimonio.testimonio.autor} · {conTestimonio.titulo}
                </figcaption>
              </figure>
            ) : (
              <h2 id="titulo-resenas" className="titulo text-[40px] lg:text-h2">
                Lo que dicen <em>nuestros clientes</em>
              </h2>
            )}
          </div>
          {cifra}
        </div>
        <ul className="m-0 grid list-none gap-0 p-0 lg:grid-cols-3 lg:gap-8">
          {lista.map((r, i) => (
            <li key={`${r.autor}-${i}`} data-aparecer style={{ "--i": i } as CSSProperties} className="flex flex-col gap-3 border-t border-borde py-6 lg:pr-8">
              <div className="flex items-center justify-between gap-4">
                <Estrellas puntuacion={r.puntuacion} className="text-[13px] text-tinta" />
                <span className="sr-only">{r.puntuacion} de 5</span>
                {r.fecha && <span className="text-xs text-texto-suave">{fechaResena(r.fecha)}</span>}
              </div>
              <p className="m-0 leading-relaxed">{r.texto}</p>
              <p className="m-0 text-sm text-texto-suave">{r.autor}</p>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-7 border-t border-borde pt-10 lg:flex-row lg:items-center lg:justify-between">
          {contacto.fichaGoogle && <EnlaceFlecha href={contacto.fichaGoogle}>Ver todas en Google</EnlaceFlecha>}
          <Pareja cta={cta} className="lg:ml-auto" />
        </div>
      </div>
    </section>
  );
}

/** La cita entre «» con las tres últimas palabras destacadas. */
function Cita({ texto }: { texto: string }) {
  const [inicio, final, cierre] = destacarFinal(texto);
  return (
    <>
      «{inicio}
      <em>{final}</em>
      {cierre}»
    </>
  );
}
