import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { buscarServicio, metadatosServicio, otrosServicios, parametrosServicios, trabajosDelServicio } from "@andrei-leads/core";

import config from "@/site.config";
import { EnlaceFlecha } from "@/components/EnlaceFlecha";
import { ParejaCta } from "@/components/ParejaCta";
import { Foto } from "@/components/base/Foto";
import { Preguntas } from "@/components/base/Preguntas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { mensajeDeServicio, RESPUESTA, textoWaServicio } from "@/lib/mensajes";
import { confianzaHorario, dosCifras, lugarAnio } from "@/lib/textos";
import { cn } from "@/lib/utils";

// Un slug que no está en generateStaticParams se genera en la primera visita. Sin esto,
// partialPrefetching sirve antes el App Shell con 200 y el 404 solo llega a la segunda.
export const ensureStatic = "navigation";

// Con cacheComponents, generateStaticParams no puede devolver []: core pone un slug de relleno.
export function generateStaticParams() {
  return parametrosServicios(config);
}

// Servicio sin `contenido`: core devuelve `noindex, follow`. Slug inexistente: {}.
export async function generateMetadata({ params }: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosServicio(config, slug);
}

/**
 * Ficha de servicio con la plantilla de «competencia» (encargo §7 y anexo P2.2): hero
 * interior con pareja → tira de `incluye` seguida de pareja → bloques texto e imagen
 * alternos (párrafo n de `contenido` con `imagenes[n+1]`; los que sobran, en una columna
 * de 64 caracteres) → trabajos del servicio → preguntas → tarjetas a los demás servicios
 * → CTA final. Las tres parejas llevan el mensaje de este servicio.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const c = config;
  const cta = { telefono: c.contacto.telefono, whatsapp: c.contacto.whatsapp, mensaje: mensajeDeServicio(servicio) };
  const textoWa = textoWaServicio(servicio.titulo);
  const bloques: { texto: string; imagen: (typeof servicio.imagenes)[number] }[] = [];
  const resto: string[] = [];
  servicio.contenido.forEach((p, i) => {
    const imagen = servicio.imagenes[i + 1];
    if (imagen) bloques.push({ texto: p, imagen });
    else resto.push(p);
  });
  const obras = trabajosDelServicio(c.trabajos, servicio);
  const otros = otrosServicios(c.servicios, servicio);

  return (
    <>
      <HeroInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
          { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
        ]}
        antetitulo="Servicio"
        titulo={servicio.titulo}
        frase={servicio.descripcion}
        precio={servicio.precioDesde}
        cta={cta}
        textoWhatsapp={textoWa}
        confianza={{ texto: RESPUESTA }}
        fotos={[servicio.imagenes[0], servicio.imagenes[1]]}
        transicion={`servicio-${servicio.slug}`}
      />

      {servicio.incluye.length > 0 && (
        <section data-tono="claro" aria-labelledby="titulo-incluye" className="bg-superficie py-14 lg:py-[88px]">
          <div className="contenedor">
            <h2 id="titulo-incluye" className="etiqueta">
              Incluye
            </h2>
            <ol
              className="m-0 mt-6 grid list-none grid-cols-2 gap-x-6 gap-y-8 p-0 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))]"
              style={{ "--n": Math.min(servicio.incluye.length, 4) } as CSSProperties}
            >
              {servicio.incluye.map((x, i) => (
                <li key={x} data-aparecer style={{ "--i": i } as CSSProperties} className="border-t border-borde pt-4">
                  <span className="text-xs tracking-[0.12em] text-texto-suave">{dosCifras(i + 1)}</span>
                  <p className="fino m-0 mt-3 text-xl leading-[1.2] lg:text-[22px]">{x}</p>
                </li>
              ))}
            </ol>
            <ParejaCta cta={cta} textoWhatsapp={textoWa} confianza={{ texto: RESPUESTA }} className="mt-12 max-w-[620px]" />
          </div>
        </section>
      )}

      {(bloques.length > 0 || resto.length > 0) && (
        <section data-tono="claro" aria-label="Cómo lo hacemos" className="seccion bg-fondo">
          <div className="contenedor flex flex-col gap-16 lg:gap-24">
            {bloques.map((b, i) => {
              const invertido = i % 2 === 1;
              return (
                <div key={b.imagen.src} className="rejilla items-center gap-y-8">
                  <div className={cn("lg:row-start-1", invertido ? "lg:col-[8/13]" : "lg:col-[1/6]")}>
                    <div className="px-mini">
                      <Foto imagen={b.imagen} sizes="(min-width: 1024px) 34vw, 100vw" />
                    </div>
                  </div>
                  <p data-aparecer className={cn("fino m-0 text-[22px] leading-[1.35] lg:row-start-1 lg:text-[28px]", invertido ? "lg:col-[2/7]" : "lg:col-[7/12]")}>
                    {b.texto}
                  </p>
                </div>
              );
            })}
            {resto.length > 0 && (
              <div className="max-w-[64ch] lg:ml-[calc(100%/12)]">
                {resto.map((p) => (
                  <p key={p} className="m-0 mb-5">
                    {p}
                  </p>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {obras.length > 0 && (
        <section data-tono="claro" aria-labelledby="titulo-obras" className="seccion bg-alterna">
          <div className="contenedor">
            <h2 id="titulo-obras" className="etiqueta">
              Obras de este servicio
            </h2>
            <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-x-6 gap-y-12 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {obras.map((t) => (
                <li key={t.slug}>
                  <Foto imagen={t.imagenes[0]} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
                  {lugarAnio(t) && <p className="etiqueta mt-4">{lugarAnio(t)}</p>}
                  <h3 className="fino m-0 mt-2 text-2xl leading-tight">{t.titulo}</h3>
                  <EnlaceFlecha href={`/trabajos/${t.slug}`} className="mt-2">
                    Ver el trabajo
                  </EnlaceFlecha>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {servicio.preguntas.length > 0 && (
        <section data-tono="claro" aria-labelledby="titulo-preguntas" className="seccion bg-fondo">
          <div className="contenedor">
            <div className="mx-auto max-w-[760px]">
              <h2 id="titulo-preguntas" className="etiqueta mb-5">
                Preguntas
              </h2>
              <Preguntas preguntas={servicio.preguntas} grupo="preguntas-servicio" />
            </div>
          </div>
        </section>
      )}

      {otros.length > 0 && (
        <section data-tono="claro" aria-labelledby="titulo-otros" className="seccion bg-fondo">
          <div className="contenedor">
            <h2 id="titulo-otros" className="etiqueta">
              Otras soluciones
            </h2>
            <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-x-6 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {otros.map((s) => (
                <li key={s.slug} className="border-t border-borde pt-5">
                  <h3 className="fino m-0 text-2xl leading-tight">{s.titulo}</h3>
                  <p className="m-0 mt-3 max-w-[40ch] text-[15px] text-texto-suave">{s.descripcion}</p>
                  <EnlaceFlecha href={`/servicios/${s.slug}`} className="mt-2">
                    Descubrir<span className="sr-only"> {s.titulo}</span>
                  </EnlaceFlecha>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaFinal
        cta={cta}
        lineas={[<>Cuéntanos tu <em>hueco</em>.</>]}
        textoWhatsapp={textoWa}
        confianza={confianzaHorario(c.contacto.horario)}
      />
    </>
  );
}
