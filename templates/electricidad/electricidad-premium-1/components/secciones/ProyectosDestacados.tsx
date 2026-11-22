import { ViewTransition } from "react";
import type { Imagen, Trabajo } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Collage } from "@/components/Collage";
import { Foto } from "@/components/base/Foto";
import { Antetitulo, EnlaceFlecha, Senal, Titular } from "@/components/Titular";
import { fichaTrabajo, recientes, type DatosCta } from "@/lib/textos";

type Props = {
  trabajos: readonly Trabajo[];
  galeria: readonly (Imagen & { titulo?: string })[];
  cta: DatosCta;
};

/**
 * ProyectosDestacados (encargo §6.3, tramo claro): los 3 trabajos más
 * recientes. El primero en collage a dos escalas con su ficha; el segundo y el
 * tercero en bandas 4:1 con el texto al lado. Cierra con pareja-cierre. Sin
 * trabajos, la galería sin ficha; sin nada, no se pinta.
 */
export function ProyectosDestacados({ trabajos, galeria, cta }: Props) {
  if (trabajos.length === 0 && galeria.length === 0) return null;
  const tres = recientes(trabajos).slice(0, 3);
  return (
    <section data-tono="claro" aria-labelledby="titulo-proyectos" className="tramo-claro seccion">
      <div className="contenedor flex flex-col gap-[clamp(48px,3rem+2vw,88px)]">
        <div className="flex flex-col gap-6">
          <Antetitulo>Proyectos</Antetitulo>
          <Titular
            id="titulo-proyectos"
            lineas={
              tres.length > 0
                ? [
                    <>
                      Obras <Senal>recientes</Senal>,
                    </>,
                    "con sus datos.",
                  ]
                : [
                    <>
                      Obras <Senal>terminadas</Senal>.
                    </>,
                  ]
            }
          />
        </div>

        {tres.length > 0 ? (
          <>
            <Destacado trabajo={tres[0]} />
            {tres.length > 1 && (
              <ul className="m-0 flex list-none flex-col p-0">
                {tres.slice(1).map((t) => (
                  <li key={t.slug} data-aparecer className="grid items-center gap-x-[clamp(24px,4vw,64px)] gap-y-5 border-t border-[var(--color-linea)] py-10 md:grid-cols-[1.4fr_1fr]">
                    <Foto imagen={t.imagenes[0]} proporcion="4/1" sizes="(min-width: 768px) 56vw, 100vw" className="px-grande" />
                    <div className="flex flex-col gap-3">
                      {fichaTrabajo(t) && <p className="etiqueta m-0 text-acento">{fichaTrabajo(t)}</p>}
                      <h3 className="titulo-pequeno">{t.titulo}</h3>
                      <EnlaceFlecha href={`/trabajos/${t.slug}`}>
                        Ver proyecto<span className="sr-only">: {t.titulo}</span>
                      </EnlaceFlecha>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-10">
            <Collage imagenes={galeria.slice(0, 2)} sizes="(min-width: 1024px) 480px, 78vw" className="w-full max-w-[560px]" />
            <EnlaceFlecha href="/trabajos">Ver las obras</EnlaceFlecha>
          </div>
        )}

        <Pareja cta={cta} tamano="cierre" />
      </div>
    </section>
  );
}

function Destacado({ trabajo }: { trabajo: Trabajo }) {
  const segunda = trabajo.imagenes[1] ?? trabajo.antes;
  const ficha = fichaTrabajo(trabajo);
  return (
    <article className="flex flex-wrap items-end gap-x-[clamp(32px,4vw,64px)] gap-y-8">
      <div className="w-full max-w-[560px] flex-[1_1_420px]">
        <ViewTransition name={`trabajo-${trabajo.slug}`} share="morph" default="none">
          <div>
            <Collage imagenes={segunda ? [trabajo.imagenes[0], segunda] : [trabajo.imagenes[0]]} sizes="(min-width: 1024px) 440px, 78vw" />
          </div>
        </ViewTransition>
      </div>
      <div data-aparecer className="flex max-w-[480px] flex-[1_1_300px] flex-col gap-[18px] pb-10">
        {ficha && <p className="etiqueta m-0 text-acento">{ficha}</p>}
        <h3 className="titulo-pequeno text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)]">{trabajo.titulo}</h3>
        <p className="m-0 text-texto-suave">{trabajo.descripcion}</p>
        <EnlaceFlecha href={`/trabajos/${trabajo.slug}`}>
          Ver proyecto<span className="sr-only">: {trabajo.titulo}</span>
        </EnlaceFlecha>
      </div>
    </article>
  );
}
