import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Filete } from "@/components/TituloSeccion";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { mensajeDeTrabajo, TEXTO_WHATSAPP_TRABAJO } from "@/lib/mensajes";
import { fichaTrabajo } from "@/lib/textos";
import config from "@/site.config";

// Un slug que no está en generateStaticParams se genera en la primera visita. Sin esto,
// partialPrefetching sirve antes el App Shell con 200 y el 404 solo llega a la segunda.
export const ensureStatic = "navigation";

// Con cacheComponents, generateStaticParams no puede devolver []: sin trabajos, core devuelve
// [{ slug: "_" }], que no existe y hace notFound().
export function generateStaticParams() {
  return parametrosTrabajos(config);
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

const SECCION = "marco pt-[clamp(48px,6vw,96px)]";

/**
 * Ficha de trabajo (encargo §7): `imagenes[0]` a sangre, h1, ficha en una línea en cursiva, el
 * contenido (o la descripción), el antes/después si hay `antes`, el resto de fotos en rejilla de 2,
 * el testimonio en serif cursiva grande y el cierre «¿Algo parecido en tu casa?» con el enlace al
 * servicio. Cada dato que falta se omite sin separador suelto.
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();
  const { contacto } = config;
  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const cta = { telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeDeTrabajo(trabajo) };
  const [principal, ...resto] = trabajo.imagenes;
  const ficha = fichaTrabajo(trabajo);
  const parrafos = trabajo.contenido.length > 0 ? trabajo.contenido : [trabajo.descripcion];

  return (
    <article data-pagina="trabajos">
      <Migas
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Trabajos" },
          { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
        ]}
        className="marco py-2"
      />
      <Foto imagen={principal} sizes="100vw" proporcion="relleno" preload calidad={60} className="aspect-[4/5] max-h-[76svh] w-full lg:aspect-video" />
      <section className="marco grid gap-4 pt-[clamp(40px,6vw,96px)]">
        <h1 className="titulo-display">{trabajo.titulo}</h1>
        {ficha && <p className="font-titulo text-[clamp(1.15rem,1rem+0.5vw,1.4rem)] leading-[1.4] text-texto-suave italic">{ficha}</p>}
        <Filete className="mt-2" />
        <div className="max-w-[68ch]">
          {parrafos.map((p) => (
            <p key={p} className="mt-3">
              {p}
            </p>
          ))}
        </div>
      </section>
      {trabajo.antes && (
        <section aria-labelledby="titulo-antes-despues" className={SECCION}>
          <h2 id="titulo-antes-despues" className="titulo-h2 mb-5">
            Antes y después
          </h2>
          <AntesDespues antes={trabajo.antes} despues={principal} titulo={trabajo.titulo} sizes="(min-width: 1440px) 1300px, 100vw" />
        </section>
      )}
      {resto.length > 0 && (
        <section aria-label={`Más fotos de ${trabajo.titulo}`} className={`marco grid grid-cols-2 gap-[clamp(12px,2vw,24px)] pt-[clamp(32px,4vw,56px)]`}>
          {resto.map((f) => (
            <Foto key={f.src} imagen={f} sizes="(min-width: 1440px) 650px, 50vw" proporcion="4/5" />
          ))}
        </section>
      )}
      {trabajo.testimonio && (
        <figure className="marco pt-[clamp(56px,8vw,120px)]">
          <blockquote className="max-w-[22ch] font-titulo text-[clamp(2rem,1.4rem+2.6vw,4rem)] leading-[1.1] tracking-[-0.015em] text-balance italic">
            «{trabajo.testimonio.texto}»
          </blockquote>
          <figcaption className="mt-4 text-[15px] text-texto-suave">{trabajo.testimonio.autor}</figcaption>
        </figure>
      )}
      <section aria-labelledby="titulo-cierre" className="marco mt-[clamp(64px,8vw,120px)] grid gap-6 bg-alterna py-[clamp(56px,7vw,104px)]">
        <h2 id="titulo-cierre" className="font-titulo text-[clamp(2.25rem,1.5rem+3.4vw,5rem)] leading-none tracking-[-0.025em]">
          ¿Algo <em>parecido</em> en tu casa?
        </h2>
        <Pareja cta={cta} textoWhatsapp={TEXTO_WHATSAPP_TRABAJO} />
        {servicio && (
          <Link href={`/servicios/${servicio.slug}`} className="enlace con-flecha inline-flex min-h-11 items-center justify-self-start text-[15px]">
            Ver el servicio: {servicio.titulo} <span aria-hidden="true" className="flecha ml-1">→</span>
          </Link>
        )}
      </section>
    </article>
  );
}
