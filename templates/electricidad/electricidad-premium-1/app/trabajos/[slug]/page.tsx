import { ViewTransition } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import config from "@/site.config";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Collage } from "@/components/Collage";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { EnlaceFlecha, Senal, UltimaDestacada } from "@/components/Titular";
import { mensajeDeTrabajo, TEXTO_WHATSAPP_TRABAJO } from "@/lib/mensajes";
import { datosCta, lineaConfianza, lineaHorario } from "@/lib/textos";

// Un slug que no está en generateStaticParams se genera en la primera visita. Sin esto,
// partialPrefetching sirve antes el App Shell con 200 y el 404 solo llega a la segunda.
export const ensureStatic = "navigation";

// Con cacheComponents, generateStaticParams no puede devolver []: sin trabajos, core pone "_".
export function generateStaticParams() {
  return parametrosTrabajos(config);
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

/**
 * Ficha de trabajo (encargo §7): hero interior con «Quiero algo parecido»,
 * antes/después grande a ancho completo (escenográfico de la página) o, sin
 * `antes`, la foto 4:5 grande con parallax; ficha en <dl> horizontal (solo
 * datos existentes), contenido, resto de fotos en collage, testimonio como cita
 * grande, enlace al servicio y pareja final.
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const cta = datosCta(config.contacto, mensajeDeTrabajo(trabajo));
  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const [principal, ...resto] = trabajo.imagenes;
  const ficha = [
    { dt: "Ubicación", dd: trabajo.ubicacion },
    { dt: "Año", dd: trabajo.anio ? String(trabajo.anio) : undefined },
    { dt: "Superficie", dd: trabajo.superficie },
    { dt: "Duración", dd: trabajo.duracion },
    { dt: "Precio orientativo", dd: trabajo.precio },
    { dt: "Servicio", dd: servicio?.titulo },
  ].filter((f): f is { dt: string; dd: string } => Boolean(f.dd));

  return (
    <>
      <span data-pagina="trabajos" hidden />
      <HeroInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Proyectos" },
          { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
        ]}
        titulo={<UltimaDestacada texto={trabajo.titulo} />}
        frase={trabajo.descripcion}
        cta={cta}
        textoWhatsapp={TEXTO_WHATSAPP_TRABAJO}
        confianza={lineaConfianza(config)}
        numeroPagina="03"
        sinMedio
      />

      <section aria-label="Fotos del proyecto" className="pb-[clamp(72px,3.5rem+4vw,128px)]">
        <div className="contenedor">
          <ViewTransition name={`trabajo-${trabajo.slug}`} share="morph" default="none">
            <div>
              {trabajo.antes ? (
                <AntesDespues antes={trabajo.antes} despues={principal} sizes="(min-width: 1280px) 1184px, 100vw" />
              ) : (
                <Foto imagen={principal} sizes="(min-width: 1024px) 560px, 100vw" className="px-grande" claseEnvoltorio="max-w-[560px]" />
              )}
            </div>
          </ViewTransition>
        </div>
      </section>

      {ficha.length > 0 && (
        <section aria-label="Ficha del proyecto" className="pb-[clamp(56px,3rem+3vw,96px)]">
          <dl className="contenedor m-0 grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3 lg:grid-cols-6">
            {ficha.map((f) => (
              <div key={f.dt} className="flex flex-col gap-2 border-t border-[var(--color-linea)] pt-3">
                <dt className="etiqueta text-acento">{f.dt}</dt>
                <dd className="m-0 text-[17px] leading-snug">{f.dd}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {trabajo.contenido.length > 0 && (
        <section aria-label="El proyecto" className="pb-[clamp(56px,3rem+3vw,96px)]">
          <div className="contenedor">
            <div className="flex max-w-[62ch] flex-col gap-4">
              {trabajo.contenido.map((p) => (
                <p key={p} className="m-0 text-[clamp(1.125rem,1rem+0.4vw,1.3125rem)]">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {resto.length > 0 && (
        <section aria-label="Más fotos" className="pb-[clamp(56px,3rem+3vw,96px)]">
          <div className="contenedor">
            <Collage imagenes={resto.slice(0, 2)} sizes="(min-width: 1024px) 440px, 78vw" className="max-w-[560px]" />
          </div>
        </section>
      )}

      {trabajo.testimonio && (
        <section aria-label="Testimonio" className="pb-[clamp(56px,3rem+3vw,96px)]">
          <figure data-aparecer className="contenedor m-0 flex flex-col gap-4">
            <blockquote className="m-0 max-w-[920px] border-t border-[var(--color-linea)] pt-10 font-titulo text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-[1.2] tracking-[-0.015em]">
              <p className="m-0">«{trabajo.testimonio.texto}»</p>
            </blockquote>
            <figcaption className="etiqueta text-texto-suave">{trabajo.testimonio.autor}</figcaption>
          </figure>
        </section>
      )}

      {servicio && (
        <div className="contenedor pb-[clamp(56px,3rem+3vw,96px)]">
          <EnlaceFlecha href={`/servicios/${servicio.slug}`}>
            <span className="text-texto-suave">Servicio:</span> {servicio.titulo}
          </EnlaceFlecha>
        </div>
      )}

      <CtaFinal
        cta={cta}
        titular={
          <>
            ¿Quieres algo <Senal>parecido</Senal>?
          </>
        }
        textoWhatsapp={TEXTO_WHATSAPP_TRABAJO}
        confianza={lineaHorario(config.contacto)}
      />
    </>
  );
}
