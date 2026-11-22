import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { buscarTrabajo, metadatosTrabajo, minusculaInicial, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";
import Link from "next/link";

import config from "@/site.config";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { Destacada, Enlace, Pareja, Titular } from "@/components/Botones";
import { Collage } from "@/components/secciones/Collage";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FichaObra } from "@/components/secciones/FichaObra";
import { mensajeDeTrabajo } from "@/lib/mensajes";
import { datosCta, fichaObra, lineaConfianza, num, partirTitulo, TEXTOS } from "@/lib/textos";

// Un slug que no está en generateStaticParams se genera en la primera visita. Sin esto,
// partialPrefetching sirve antes el App Shell con 200 y el 404 solo llega a la segunda.
export const ensureStatic = "navigation";

// Con cacheComponents, generateStaticParams no puede devolver []: core pone un slug de relleno.
export function generateStaticParams() {
  return parametrosTrabajos(config);
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

/**
 * Ficha de obra (encargo §7): doble página con `imagenes[0]` 4:5 (destino de la transición
 * desde la tarjeta) y el `h1` con la ubicación en cursiva y la ficha en filetes. Después,
 * el antes/después a sangre (o `imagenes[1]` en banda 4:1), «Cómo lo *hicimos*» junto al
 * resto de fotos, el testimonio, «Ver {servicio} →», la obra siguiente y el CTA. Cada dato
 * que falte se omite.
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const t = buscarTrabajo(config, slug);
  if (!t) notFound();

  const { trabajos, servicios, contacto } = config;
  const indice = trabajos.indexOf(t);
  const siguiente = trabajos.length > 1 ? trabajos[(indice + 1) % trabajos.length] : undefined;
  const servicio = servicioDelTrabajo(servicios, t);
  const datos = datosCta(contacto, mensajeDeTrabajo(t));
  const { antes: tituloAntes, destacada } = partirTitulo(t.titulo);
  const resto = t.imagenes.slice(t.antes ? 1 : 2);
  const banda = !t.antes ? t.imagenes[1] : undefined;
  const pareja = <Pareja datos={datos} fondo="claro" textoWa={TEXTOS.whatsappTrabajo} textoLlamar="Llamar" className="max-w-[620px]" />;

  return (
    <>
      <section data-tono="claro" data-pagina="trabajos" className="bg-fondo pt-[clamp(24px,4vw,56px)] pb-[clamp(56px,6vw,112px)]">
        <div className="contenedor">
          <Migas
            migas={[
              { href: "/", texto: "Inicio" },
              { href: "/trabajos", texto: "Obras" },
              { href: `/trabajos/${t.slug}`, texto: t.titulo },
            ]}
            className="mb-[clamp(28px,4vw,56px)]"
          />
          <div className="grid items-end gap-x-12 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ViewTransition name={`obra-${t.slug}`} share="obra" default="none">
                <Foto imagen={t.imagenes[0]} sizes="(min-width: 1024px) 640px, 100vw" proporcion="4/5" preload />
              </ViewTransition>
            </div>
            <div className="lg:col-span-5">
              <p className="etiqueta text-texto-suave">Obra {num(indice + 1)}</p>
              <h1 className="m-0 mt-3 text-[clamp(2.25rem,1.5rem+3vw,3.75rem)] leading-[1.05] tracking-[-0.02em]">
                {tituloAntes}
                {destacada && (
                  <>
                    {" "}
                    <Destacada>{destacada}</Destacada>
                  </>
                )}
              </h1>
              <p className="m-0 mt-5 max-w-[46ch] text-texto-suave">{t.descripcion}</p>
              <FichaObra filas={fichaObra(t, t.ubicacion)} className="mt-7" />
              <div className="mt-8">{pareja}</div>
            </div>
          </div>
        </div>
      </section>

      {t.antes ? (
        <section data-tono="oscuro" aria-labelledby="titulo-antes" className="seccion bg-tinta text-fondo">
          <div className="contenedor">
            <Titular id="titulo-antes" antes="Antes y" destacada="después" />
            <p className="m-0 mt-4 text-texto-claro">{t.titulo}</p>
          </div>
          <AntesDespues antes={t.antes} despues={t.imagenes[0]} sizes="100vw" className="mt-10" />
        </section>
      ) : (
        banda && (
          <div data-tono="claro" className="contenedor">
            <Foto imagen={banda} sizes="(min-width: 1280px) 1120px, 100vw" proporcion="4/1" paralaje />
          </div>
        )
      )}

      {(t.contenido.length > 0 || resto.length > 0) && (
        <section data-tono="claro" aria-labelledby="titulo-hicimos" className="seccion bg-fondo">
          <div className="contenedor grid items-start gap-x-16 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Titular id="titulo-hicimos" antes="Cómo lo" destacada="hicimos" />
              {t.contenido.map((p, i) => (
                <p key={i} className="m-0 mt-6 max-w-[440px]">
                  {p}
                </p>
              ))}
              {servicio && (
                <Enlace href={`/servicios/${servicio.slug}`} className="mt-6">
                  Ver {minusculaInicial(servicio.titulo)}
                </Enlace>
              )}
            </div>
            {resto[0] && (
              <Collage grande={resto[0]} mini={resto[1]} sizes="(min-width: 1024px) 440px, 78vw" paralaje className="lg:col-span-6 lg:col-start-7" />
            )}
          </div>
        </section>
      )}

      {t.testimonio && (
        <section data-tono="claro" aria-label="Testimonio" className="seccion bg-alterna">
          <figure className="contenedor m-0">
            <blockquote className="m-0 max-w-[28ch] font-destacada text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] leading-[1.2] italic">
              «{t.testimonio.texto}»
            </blockquote>
            <figcaption className="mt-6 text-[15px] text-texto-suave">{t.testimonio.autor}</figcaption>
          </figure>
        </section>
      )}

      <section data-tono="claro" className="bg-fondo py-[clamp(56px,5vw,96px)]">
        <div className="contenedor flex flex-col gap-3">
          <p className="etiqueta text-texto-suave">¿Una obra parecida en tu casa?</p>
          {pareja}
          <p className="m-0 text-sm text-texto-suave">{lineaConfianza(config)}</p>
        </div>
      </section>

      {siguiente && (
        <Link href={`/trabajos/${siguiente.slug}`} data-tono="oscuro" className="group block bg-tinta-suave text-fondo no-underline">
          <span className="contenedor flex flex-wrap items-end justify-between gap-6 py-[clamp(48px,5vw,88px)]">
            <span>
              <span className="etiqueta block text-texto-claro">Obra siguiente · {num(trabajos.indexOf(siguiente) + 1)}</span>
              <span className="mt-3 block text-[clamp(1.75rem,1.2rem+2.2vw,2.75rem)] leading-[1.05]">{siguiente.titulo}</span>
            </span>
            <span aria-hidden="true" className="text-3xl motion-safe:transition-transform group-hover:translate-x-[5px]">
              →
            </span>
          </span>
        </Link>
      )}

      <CtaFinal datos={datos} textoWa={TEXTOS.whatsappTrabajo} textoLlamar="Llamar" confianza={lineaConfianza(config, "horario")} />
    </>
  );
}
