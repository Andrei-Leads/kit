import { ViewTransition } from "react";
import type { SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Enlace, ParejaCta, Titular } from "@/components/Botones";
import { fichaObra, lineaConfianza, type DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

import { Collage } from "./Collage";
import { FichaObra } from "./FichaObra";
import { TarjetaObra } from "./TarjetaObra";

type Props = {
  config: Pick<SiteConfig, "trabajos" | "galeria" | "valoracion" | "contacto">;
  datos: DatosCta;
};

/**
 * «Las obras en *portada*» (sección estrella, encargo §6.3). La primera obra en doble
 * página (collage 4:5 con parallax y ficha en filetes); las dos siguientes, tarjetas a
 * dos tamaños (la segunda más abajo; en móvil, al 100 % y al 78 % alternando lado).
 * Sin trabajos, la `galeria` con el mismo ritmo. Sin nada, no existe. Cierra con la pareja.
 */
export function EnPortada({ config, datos }: Props) {
  const { trabajos, galeria } = config;
  if (trabajos.length === 0 && galeria.length === 0) return null;
  const [primera, ...resto] = trabajos;

  return (
    <section data-tono="claro" aria-labelledby="titulo-portada" className="seccion bg-fondo pt-0">
      <div className="contenedor">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-borde pt-10">
          <div>
            <p className="etiqueta mb-4 text-texto-suave">Obras</p>
            <Titular id="titulo-portada" antes="Las obras" destacada="en portada" />
          </div>
          <Enlace href="/trabajos">Todas las obras</Enlace>
        </div>

        {primera ? (
          <>
            <article className="mt-[clamp(48px,5vw,88px)] grid items-center gap-x-12 gap-y-10 lg:grid-cols-12">
              <Collage
                grande={primera.imagenes[0]}
                mini={primera.imagenes[1]}
                lado="derecha"
                sizes="(min-width: 1024px) 560px, 78vw"
                paralaje
                envolver={(foto) => (
                  <ViewTransition name={`obra-${primera.slug}`} share="obra" default="none">
                    {foto}
                  </ViewTransition>
                )}
                className="lg:col-span-7"
              />
              <div data-aparecer className="lg:col-span-5">
                <p className="etiqueta text-texto-suave">Obra 01</p>
                <h3 className="m-0 mt-3 text-[clamp(2rem,1.4rem+2.6vw,2.75rem)] leading-[1.05] tracking-[-0.015em]">{primera.titulo}</h3>
                {primera.ubicacion && <p className="m-0 mt-2 font-destacada text-2xl text-texto-suave italic">{primera.ubicacion}</p>}
                <p className="m-0 mt-5 max-w-[46ch]">{primera.descripcion}</p>
                <FichaObra filas={fichaObra(primera)} className="mt-7" />
                <Enlace href={`/trabajos/${primera.slug}`} className="mt-5">
                  Ver la obra<span className="sr-only">: {primera.titulo}</span>
                </Enlace>
              </div>
            </article>
            {resto.length > 0 && (
              <div className="mt-[clamp(64px,7vw,128px)] grid gap-x-12 gap-y-14 lg:grid-cols-12">
                {resto.slice(0, 2).map((t, i) => (
                  <TarjetaObra
                    key={t.slug}
                    trabajo={t}
                    numero={i + 2}
                    i={i}
                    sizes="(min-width: 1024px) 520px, 90vw"
                    className={cn(i === 0 ? "lg:col-span-6" : "ml-auto w-[78%] lg:col-span-5 lg:col-start-8 lg:mt-[120px] lg:w-auto")}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <ul className="m-0 mt-[clamp(48px,5vw,88px)] grid list-none gap-x-12 gap-y-14 p-0 lg:grid-cols-12">
            {galeria.slice(0, 3).map((g, i) => (
              <li
                key={g.src}
                data-aparecer
                style={{ "--i": i } as React.CSSProperties}
                className={cn(i === 0 && "lg:col-span-7", i === 1 && "ml-auto w-[78%] lg:col-span-5 lg:mt-[120px] lg:w-auto", i === 2 && "lg:col-span-6")}
              >
                <figure className="m-0">
                  <Foto imagen={g} sizes="(min-width: 1024px) 560px, 90vw" proporcion="4/5" />
                  {g.titulo && <figcaption className="mt-3 text-[15px] text-texto-suave">{g.titulo}</figcaption>}
                </figure>
              </li>
            ))}
          </ul>
        )}

        <ParejaCta datos={datos} fondo="claro" confianza={lineaConfianza(config)} className="mt-[clamp(64px,6vw,112px)]" />
      </div>
    </section>
  );
}
