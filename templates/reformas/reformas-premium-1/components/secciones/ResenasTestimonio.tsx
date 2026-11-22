import { fechaResena, mediaVisible, type SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Enlace, ParejaCta, Titular } from "@/components/Botones";
import { lineaConfianza, partirResena, type DatosCta } from "@/lib/textos";

type Props = {
  config: Pick<SiteConfig, "resenas" | "valoracion" | "contacto" | "trabajos">;
  datos: DatosCta;
};

/**
 * «Lo que *cuentan*» sobre `--color-alterna` (encargo §6.8): el primer testimonio de una
 * obra como cita de revista (Instrument Serif cursiva) con la miniatura de su obra, y las
 * 3 reseñas más recientes en columnas con filete. Las largas, «Leer más» en `<details>`.
 * «Ver todas en Google →» solo con `fichaGoogle`. Sin reseñas ni testimonio, no existe.
 */
export function ResenasTestimonio({ config, datos }: Props) {
  const { resenas, valoracion, contacto, trabajos } = config;
  const conTestimonio = trabajos.find((t) => t.testimonio);
  if (resenas.length === 0 && !conTestimonio) return null;
  const recientes = [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? "")).slice(0, 3);

  return (
    <section data-tono="claro" aria-labelledby="titulo-resenas" className="seccion bg-alterna">
      <div className="contenedor">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="etiqueta mb-4 text-texto-suave">Reseñas</p>
            <Titular id="titulo-resenas" antes="Lo que" destacada="cuentan" />
          </div>
          {valoracion && (
            <p className="m-0 flex items-baseline gap-3">
              <span className="text-[clamp(3rem,2rem+3vw,4.5rem)] leading-none tracking-[-0.02em]">{mediaVisible(valoracion.media)}</span>
              <span className="text-[15px] text-texto-suave">
                de 5 · {valoracion.total} reseñas en Google
              </span>
            </p>
          )}
        </div>

        {conTestimonio?.testimonio && (
          <figure data-aparecer className="m-0 mt-[clamp(48px,5vw,88px)] grid items-center gap-x-12 gap-y-8 border-t border-borde pt-10 md:grid-cols-[200px_1fr]">
            <Foto imagen={conTestimonio.imagenes[0]} sizes="200px" proporcion="4/5" etiqueta="mini" className="w-[140px] md:w-full" />
            <div>
              <blockquote className="m-0 max-w-[30ch] font-destacada text-[clamp(1.625rem,1.3rem+1.2vw,2rem)] leading-[1.25] italic">
                «{conTestimonio.testimonio.texto}»
              </blockquote>
              <figcaption className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] text-texto-suave">
                <span>
                  {conTestimonio.testimonio.autor} · {conTestimonio.titulo}
                </span>
                <Enlace href={`/trabajos/${conTestimonio.slug}`} className="text-texto">
                  Ver la obra<span className="sr-only">: {conTestimonio.titulo}</span>
                </Enlace>
              </figcaption>
            </div>
          </figure>
        )}

        {recientes.length > 0 && (
          <ul className="m-0 mt-[clamp(48px,5vw,88px)] grid list-none gap-x-10 gap-y-10 p-0 md:grid-cols-3">
            {recientes.map((r, i) => {
              const { inicio, resto } = partirResena(r.texto);
              return (
                <li key={`${r.autor}-${i}`} data-aparecer style={{ "--i": i } as React.CSSProperties} className="border-t border-borde pt-6">
                  <figure className="m-0">
                    <p className="m-0 text-[15px] tracking-[2px] text-texto" aria-label={`${r.puntuacion} de 5 estrellas`} role="img">
                      {"★".repeat(r.puntuacion)}
                      <span className="text-texto-suave">{"☆".repeat(5 - r.puntuacion)}</span>
                    </p>
                    <blockquote className="m-0 mt-4">
                      <p className="m-0">{inicio}</p>
                      {resto && (
                        <details className="group/leer">
                          <summary className="mt-2 inline-flex min-h-11 cursor-pointer list-none items-center text-[15px] underline [&::-webkit-details-marker]:hidden">
                            <span className="group-open/leer:hidden">Leer más</span>
                            <span className="hidden group-open/leer:inline">Leer menos</span>
                          </summary>
                          <p className="m-0">{resto}</p>
                        </details>
                      )}
                    </blockquote>
                    <figcaption className="mt-4 text-sm text-texto-suave">
                      {r.autor}
                      {r.fecha && ` · ${fechaResena(r.fecha)}`}
                      {r.fuente === "google" && " · Google"}
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        )}
        {contacto.fichaGoogle && recientes.length > 0 && (
          <a href={contacto.fichaGoogle} className="enlace mt-8" rel="noopener" target="_blank">
            <span>
              Ver todas en Google<span className="sr-only"> (se abre en otra pestaña)</span>
            </span>
            <span aria-hidden="true">→</span>
          </a>
        )}

        <ParejaCta datos={datos} fondo="claro" confianza={lineaConfianza(config, "horario")} className="mt-[clamp(56px,5vw,96px)]" />
      </div>
    </section>
  );
}
