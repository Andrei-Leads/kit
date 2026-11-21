import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  buscarServicio,
  metadatosServicio,
  otrosServicios,
  parametrosServicios,
  precioDesde,
  trabajosDelServicio,
} from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { Pareja } from "@/components/Botones";
import { IconoCheck, IconoFlecha } from "@/components/Iconos";
import { BandaInterior } from "@/components/secciones/BandaInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { TrabajosBento } from "@/components/secciones/TrabajosBento";
import { mensajeDeServicio, TEXTO_WHATSAPP_SERVICIO } from "@/lib/mensajes";
import { datosCta } from "@/lib/textos";
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
 * Ficha de servicio: banda pleno (migas, h1, descripción, pareja y tarjeta de
 * cifra con `precioDesde`) → `contenido` en 66ch con «incluye» en tarjeta y la
 * segunda pareja → fotos en tarjetas 4:3 → trabajos del servicio → preguntas →
 * otros servicios → CTA final con su mensaje (tercera pareja).
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const cta = datosCta(config, mensajeDeServicio(servicio));
  const textoWa = TEXTO_WHATSAPP_SERVICIO;
  const trabajos = trabajosDelServicio(config.trabajos, servicio);
  const otros = otrosServicios(config.servicios, servicio);
  const precio = servicio.precioDesde ? precioDesde(servicio.precioDesde) : undefined;
  const hayTexto = servicio.contenido.length > 0;
  const hayIncluye = servicio.incluye.length > 0;

  return (
    <>
      <span data-pagina="servicios" hidden />
      <BandaInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
          { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
        ]}
        titulo={servicio.titulo}
        entrada={<p>{servicio.descripcion}</p>}
        aparte={
          precio && (
            <div className="sobre-claro rounded-tarjeta bg-superficie p-6 text-texto lg:p-8">
              <p className="m-0 text-sm font-semibold text-texto-suave">Precio orientativo</p>
              <p className="m-0 mt-2 font-titulo text-[clamp(2.75rem,2rem+3vw,4.5rem)] leading-none font-[750] tracking-[-0.04em] tabular-nums">
                {precio.desde && <span className="text-[0.55em] tracking-[-0.02em]">desde</span>}
                {precio.desde && " "}
                {precio.importe}
              </p>
              <span aria-hidden="true" className="raya-acento mt-2.5" />
              <p className="m-0 mt-3 text-[0.9375rem] text-texto-suave">Te confirmamos el precio antes de empezar.</p>
            </div>
          )
        }
      >
        <Pareja cta={cta} tono="pleno" textoWhatsapp={textoWa} />
      </BandaInterior>

      {(hayTexto || hayIncluye) && (
        <section aria-label="Qué hacemos" className="seccion">
          <div className={cn("contenedor grid gap-8", hayTexto && hayIncluye && "lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-14")}>
            {hayTexto && (
              <div className="max-w-[66ch]">
                <h2 className="titulo-seccion">Qué hacemos</h2>
                {servicio.contenido.map((p) => (
                  <p key={p} className="m-0 mt-4 text-[1.125rem]">
                    {p}
                  </p>
                ))}
                {!hayIncluye && <Pareja cta={cta} tono="claro" textoWhatsapp={textoWa} className="mt-7" />}
              </div>
            )}
            {hayIncluye && (
              <div className="rounded-tarjeta bg-superficie p-6 lg:p-8">
                <h2 className="m-0 font-titulo text-[1.5rem] leading-tight font-bold tracking-[-0.02em]">Incluye</h2>
                <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
                  {servicio.incluye.map((x) => (
                    <li key={x} className="flex items-center gap-3 text-lg font-semibold">
                      <span aria-hidden="true" className="grid size-8 flex-none place-items-center rounded-full bg-primario-suave">
                        <IconoCheck className="size-4" />
                      </span>
                      {x}
                    </li>
                  ))}
                </ul>
                <Pareja cta={cta} tono="claro" textoWhatsapp={textoWa} className="mt-7 sm:flex-col sm:items-stretch sm:*:w-full" />
              </div>
            )}
          </div>
        </section>
      )}

      {servicio.imagenes.length > 0 && (
        <section aria-label="Fotos del servicio" className={cn("seccion", (hayTexto || hayIncluye) && "pt-0")}>
          <div className="contenedor">
          <ul className="m-0 grid list-none gap-(--hueco-bento) p-0 sm:grid-cols-2">
            {servicio.imagenes.map((f, i) => (
              <li key={f.src} className="rounded-tarjeta bg-superficie p-2.5">
                <Foto imagen={f} sizes="(min-width: 640px) 50vw, 100vw" proporcion="4/3" preload={i === 0 && !hayTexto && !hayIncluye} />
              </li>
            ))}
          </ul>
          </div>
        </section>
      )}

      {trabajos.length > 0 && (
        <section aria-labelledby="titulo-trabajos-servicio" className="seccion pt-0">
          <div className="contenedor">
            <h2 id="titulo-trabajos-servicio" className="titulo-seccion mb-7">
              Trabajos: {servicio.titulo}
            </h2>
            <TrabajosBento trabajos={trabajos} destacado={false} nivel="h3" />
          </div>
        </section>
      )}

      <PreguntasFrecuentes preguntas={servicio.preguntas} grupo="preguntas-servicio" centrada />

      {otros.length > 0 && (
        <section aria-labelledby="titulo-otros" className="seccion pt-0">
          <div className="contenedor">
            <h2 id="titulo-otros" className="titulo-seccion mb-7">
              Otros servicios
            </h2>
            <ul className="m-0 grid list-none grid-cols-2 gap-(--hueco-bento) p-0 lg:grid-cols-3">
              {otros.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="tarjeta-enlace flex h-full min-h-[72px] items-center justify-between gap-2 rounded-tarjeta bg-superficie py-3 pr-2.5 pl-4 text-[0.9375rem] leading-snug font-bold no-underline sm:gap-4 sm:pl-5 sm:text-base"
                  >
                    {s.titulo}
                    <span aria-hidden="true" className="grid size-10 flex-none place-items-center rounded-full bg-primario-suave">
                      <IconoFlecha className="size-[18px]" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaFinal cta={cta} contacto={config.contacto} titulo="Cuéntanos qué necesitas" textoWhatsapp={textoWa} />
    </>
  );
}
