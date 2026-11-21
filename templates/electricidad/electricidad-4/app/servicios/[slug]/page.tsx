import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  buscarServicio,
  metadatosServicio,
  otrosServicios,
  parametrosServicios,
  trabajosDelServicio,
} from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { Pareja, Pulsador, WhatsAppEtiqueta } from "@/components/Botones";
import { ModuloPequeno } from "@/components/Cuadro";
import { Palanca } from "@/components/Iconos";
import { Marco } from "@/components/Marco";
import { PrecioCinta } from "@/components/PrecioCinta";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { TarjetaTrabajo } from "@/components/secciones/TarjetaTrabajo";
import { posicion } from "@/lib/formato";
import { mensajeModulo } from "@/lib/mensajes";
import config from "@/site.config";

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
 * Ficha de servicio (encargo §7): su módulo con la palanca bajada junto al h1, descripción,
 * precio en cinta y pareja; después contenido (sin él, nada: la descripción ya está arriba), fotos 4:3, «Qué incluye» con
 * casillas, segunda pareja; trabajos del servicio, preguntas, «Otros módulos de este cuadro» y CTA
 * con su mensaje (tres parejas en total). Cada bloque vacío se oculta.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const { servicios, contacto } = config;
  const n = servicios.findIndex((s) => s.slug === servicio.slug) + 1;
  const mensaje = mensajeModulo(servicio);
  const trabajos = trabajosDelServicio(config.trabajos, servicio);
  const otros = otrosServicios(servicios, servicio);

  return (
    <Marco actual="servicios">
      <Migas
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
          { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
        ]}
        className="contenedor pt-2"
      />
      <section className="contenedor flex flex-col gap-5 pt-3 pb-[clamp(32px,5vw,56px)]">
        <div className="flex items-start gap-[clamp(16px,3vw,28px)]">
          <span aria-hidden="true" className="flex w-[clamp(84px,14vw,120px)] flex-none flex-col border border-borde bg-superficie">
            <span className="cifras m-[3px] border border-primario bg-etiqueta p-[5px] text-xs font-semibold">{posicion(n)}</span>
            <span className="relative flex h-24 items-center justify-center">
              <span className="absolute inset-x-0 top-1/2 -mt-[9px] h-[18px] bg-carril" />
              <Palanca bajada className="relative h-[72px] w-11" />
            </span>
          </span>
          <div className="flex min-w-0 flex-col gap-2.5">
            <h1 className="text-h1 leading-[1.05] font-semibold">{servicio.titulo}</h1>
            <p className="max-w-[48ch] text-lg text-texto-suave">{servicio.descripcion}</p>
            {servicio.precioDesde && <PrecioCinta precio={servicio.precioDesde} className="text-base" />}
          </div>
        </div>
        <Pareja contacto={contacto} mensaje={mensaje} className="max-w-[640px]" />
      </section>

      <section aria-label="Detalle del servicio" className="border-y border-carril bg-superficie">
        <div className="contenedor flex flex-col gap-7 py-[clamp(36px,5vw,64px)]">
          {servicio.contenido.length > 0 && (
            <div className="flex max-w-[68ch] flex-col gap-3.5">
              {servicio.contenido.map((p) => (
                <p key={p} className="text-lg leading-[1.55]">
                  {p}
                </p>
              ))}
            </div>
          )}
          {servicio.imagenes.length > 0 && (
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-3">
              {servicio.imagenes.map((img, i) => (
                <li key={img.src}>
                  <Foto imagen={img} sizes="(min-width: 1280px) 400px, (min-width: 640px) 45vw, 92vw" preload={i === 0} className="border border-carril" />
                </li>
              ))}
            </ul>
          )}
          {servicio.incluye.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="h2">Qué incluye</h2>
              <ul className="flex flex-col gap-2.5">
                {servicio.incluye.map((x) => (
                  <li key={x} className="flex items-center gap-3 text-[17px]">
                    <span aria-hidden="true" className="flex size-5 flex-none items-center justify-center border-2 border-texto">
                      <span className="size-2.5 bg-primario" />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-wrap gap-2.5 border-t border-carril pt-5">
            <Pulsador contacto={contacto} compacto icono={false} />
            <WhatsAppEtiqueta numero={contacto.whatsapp} mensaje={mensaje} compacto icono={false} />
          </div>
        </div>
      </section>

      {trabajos.length > 0 && (
        <section aria-labelledby="h2-trabajos-servicio" className="contenedor pt-[clamp(36px,5vw,64px)]">
          <h2 id="h2-trabajos-servicio" className="h2 mb-[18px]">
            Trabajos de este servicio
          </h2>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-3.5">
            {trabajos.map((t) => (
              <li key={t.slug}>
                <TarjetaTrabajo trabajo={t} nivel="h3" descripcion={false} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <PreguntasFrecuentes preguntas={servicio.preguntas} grupo="preguntas-servicio" />

      {otros.length > 0 && (
        <section aria-labelledby="h2-otros" className="contenedor pt-[clamp(40px,6vw,72px)]">
          <h2 id="h2-otros" className="h2 mb-4">
            Otros módulos de este cuadro
          </h2>
          <ul className="flex flex-wrap gap-y-3 pl-px">
            {otros.map((o) => (
              <li key={o.slug} className="flex w-(--ancho-modulo)">
                <ModuloPequeno servicio={o} n={servicios.indexOf(o) + 1} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <CtaFinal contacto={contacto} mensaje={mensaje} titulo="¿Es esto lo que te pasa? Llámanos." />
    </Marco>
  );
}
