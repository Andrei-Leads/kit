import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  buscarServicio,
  metadatosServicio,
  minusculaInicial,
  otrosServicios,
  parametrosServicios,
  trabajosDelServicio,
} from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { Capitular } from "@/components/Capitular";
import { Pareja } from "@/components/Pareja";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { MigasPagina } from "@/components/secciones/MigasPagina";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { RejillaTrabajos } from "@/components/secciones/RejillaTrabajos";
import { ResenasVecinos } from "@/components/secciones/ResenasVecinos";
import { Precio, Servicios } from "@/components/secciones/Servicios";
import { etiquetaWhatsappServicio, mensajeDeServicio } from "@/lib/mensajes";
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
 * Ficha de servicio: migas → h1, descripción, precio y pareja con el mensaje del
 * servicio (foto en arco a la derecha en escritorio, debajo del título en móvil)
 * → `contenido` con capitular e «incluye» en piedra (+ pareja) → más fotos →
 * trabajos del servicio → la reseña más reciente → preguntas del servicio →
 * otros servicios → CTA. Sin `contenido`: solo la descripción (y `noindex`).
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const cta = datosCta(config, mensajeDeServicio(servicio));
  const textoWa = etiquetaWhatsappServicio(servicio);
  const [foto, ...masFotos] = servicio.imagenes;
  const hayCuerpo = servicio.contenido.length > 0;
  const trabajos = trabajosDelServicio(config.trabajos, servicio);
  const otros = otrosServicios(config.servicios, servicio).slice(0, 3);

  return (
    <>
      <span data-pagina="servicios" hidden />
      <MigasPagina migas={[{ href: "/", texto: "Inicio" }, { href: "/servicios", texto: "Servicios" }, { texto: servicio.titulo }]} />

      <section className="pt-[clamp(1.5rem,1rem+2vw,3rem)] pb-[clamp(3rem,2rem+3vw,6rem)]">
        <div className="contenedor">
          <div
            className={cn(
              "grid grid-cols-1 items-end gap-x-[clamp(2rem,1rem+4vw,5rem)] gap-y-[clamp(1.5rem,1rem+2vw,3rem)]",
              foto && "md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]",
            )}
          >
            <div>
              <h1 className="m-0 font-titulo text-[clamp(2.5rem,1.6rem+4vw,5.25rem)] leading-[0.98] font-medium tracking-[-0.025em] text-balance">
                {servicio.titulo}
              </h1>
              <p className="mt-5 mb-0 max-w-[30em] text-entrada">{servicio.descripcion}</p>
              {servicio.precioDesde && <Precio texto={servicio.precioDesde} className="mt-3" />}
            </div>
            {foto && (
              <Foto
                imagen={foto}
                sizes="(min-width: 768px) 460px, 100vw"
                proporcion="4/5"
                preload
                className="w-full max-w-[460px] md:row-span-2 md:justify-self-end"
              />
            )}
            <Pareja cta={cta} textoWhatsapp={textoWa} className="max-w-[560px]" />
          </div>

          {hayCuerpo && (
            <div
              className={cn(
                "mt-[clamp(3rem,2rem+3vw,5rem)] grid grid-cols-1 items-start gap-[clamp(2rem,1.5rem+3vw,5rem)]",
                servicio.incluye.length > 0 && "md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]",
              )}
            >
              <Capitular parrafos={servicio.contenido} />
              {servicio.incluye.length > 0 && (
                <aside aria-labelledby="titulo-incluye" className="rounded-piedra-2 bg-superficie p-[clamp(1.5rem,1.2rem+1.4vw,2.5rem)]">
                  <h2 id="titulo-incluye" className="m-0 font-titulo text-[clamp(1.5rem,1.3rem+0.8vw,2rem)] leading-[1.1] font-medium">
                    Qué incluye
                  </h2>
                  <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
                    {servicio.incluye.map((x) => (
                      <li key={x} className="flex items-baseline gap-3 leading-snug">
                        <span aria-hidden="true" className="size-2.5 flex-none -translate-y-[0.1em] rounded-[40%_60%_55%_45%] bg-primario-texto" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </aside>
              )}
            </div>
          )}
          {hayCuerpo && <Pareja cta={cta} textoWhatsapp={textoWa} className="mt-[clamp(2.5rem,2rem+2vw,4rem)]" />}

          {masFotos.length > 0 && (
            <ul className="m-0 mt-[clamp(3rem,2rem+3vw,5rem)] grid list-none grid-cols-2 gap-[clamp(0.75rem,0.5rem+1vw,1.25rem)] p-0 md:grid-cols-4">
              {masFotos.map((f) => (
                <li key={f.src}>
                  <Foto imagen={f} sizes="(min-width: 768px) 25vw, 50vw" proporcion="4/5" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {trabajos.length > 0 && (
        <section aria-labelledby="titulo-trabajos-servicio" className="seccion">
          <div className="contenedor">
            <h2 id="titulo-trabajos-servicio" className="titulo-seccion mb-[clamp(1.5rem,1rem+2vw,3rem)]">
              Trabajos de {minusculaInicial(servicio.titulo)}
            </h2>
            <RejillaTrabajos trabajos={trabajos} nivel="h3" />
          </div>
        </section>
      )}

      <ResenasVecinos
        resenas={config.resenas}
        valoracion={config.valoracion}
        fichaGoogle={config.contacto.fichaGoogle}
        cta={cta}
        variante="servicio"
        titulo="Lo último que dicen de nosotros"
        textoWhatsapp={textoWa}
      />
      <PreguntasFrecuentes preguntas={servicio.preguntas} titulo={`Preguntas sobre ${minusculaInicial(servicio.titulo)}`} />
      <Servicios servicios={otros} titulo="Otros servicios" variante="tarjetas" />
      <CtaFinal cta={cta} textoWhatsapp={textoWa} />
    </>
  );
}
