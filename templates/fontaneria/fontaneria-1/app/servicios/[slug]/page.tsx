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
import { Preguntas } from "@/components/base/Preguntas";
import { Encabezado } from "@/components/Encabezado";
import { FilaIndice, ListaIndice } from "@/components/FilaIndice";
import { Cuadrado } from "@/components/Iconos";
import { ParCta } from "@/components/ParCta";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { mensajeDeServicio } from "@/lib/mensajes";
import { numeroOrden } from "@/lib/navegacion";
import { lineaHorario, lineaValoracion, textoLlamar } from "@/lib/textos";

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
 * Ficha de servicio: el h1 es el síntoma a --text-display; debajo, `llamada-par` + `whatsapp-par` con el
 * mensaje del servicio y el precio en un recuadro. Después, contenido (o descripción), «Qué incluye»,
 * otra pareja, hasta 3 fotos 4:3, trabajos de este tipo, preguntas, «Otros problemas» y el CTA final.
 * Cada bloque vacío desaparece.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const { contacto } = config;
  const par = {
    telefono: contacto.telefono,
    whatsapp: contacto.whatsapp,
    mensaje: mensajeDeServicio(servicio),
    textoLlamar: textoLlamar(contacto),
  };
  const horario = lineaHorario(contacto);
  const parrafos = servicio.contenido.length > 0 ? servicio.contenido : [servicio.descripcion];
  const trabajos = trabajosDelServicio(config.trabajos, servicio);
  const otros = otrosServicios(config.servicios, servicio).slice(0, 3);
  const precio = servicio.precioDesde ? precioDesde(servicio.precioDesde) : null;

  return (
    <>
      <Encabezado
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
          { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
        ]}
        titulo={servicio.titulo}
        claseTitulo="max-w-[14ch]"
      >
        <ParCta className="mt-6 max-w-[680px]" {...par} confianza={lineaValoracion(config)} />
        {precio && (
          <p className="mt-4 inline-flex items-baseline gap-3 border border-primario-luz px-4 py-2.5">
            <span className="text-sm text-texto-suave">Precio orientativo</span>
            <span className="condensada text-[1.75rem] leading-none tracking-normal text-primario-luz">
              {precio.desde && <span className="mr-1.5 text-base tracking-[0.06em] uppercase">Desde</span>}
              {precio.importe}
            </span>
          </p>
        )}
      </Encabezado>

      <section className="border-t border-borde">
        <div className="contenedor flex flex-wrap gap-x-16 gap-y-9 py-[clamp(40px,6vw,80px)]">
          <div className="max-w-[65ch] min-w-0 flex-[3_1_520px]">
            {parrafos.map((p) => (
              <p key={p} className="mb-[1em] text-cuerpo">
                {p}
              </p>
            ))}
          </div>
          {servicio.incluye.length > 0 && (
            <div className="min-w-0 flex-[1_1_280px]">
              <h2 className="condensada border-b-3 border-primario-luz pb-3 text-[1.75rem] leading-none">Qué incluye</h2>
              <ul>
                {servicio.incluye.map((i) => (
                  <li key={i} className="flex items-baseline gap-3 border-b border-borde py-3">
                    <Cuadrado />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="contenedor pb-[clamp(40px,6vw,80px)]">
          <ParCta className="max-w-[680px]" {...par} confianza={horario} />
        </div>
        {servicio.imagenes.length > 0 && (
          <div className="contenedor grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-4 pb-[clamp(40px,6vw,80px)]">
            {servicio.imagenes.slice(0, 3).map((im) => (
              <Foto key={im.src} imagen={im} sizes="(min-width: 640px) 560px, calc(100vw - 32px)" proporcion="4/3" className="max-w-[560px]" />
            ))}
          </div>
        )}
      </section>

      {trabajos.length > 0 && (
        <section className="border-t border-borde">
          <div className="contenedor py-[clamp(40px,6vw,80px)]">
            <h2 className="condensada mb-5 text-h2">Trabajos de este tipo</h2>
            <ul>
              {trabajos.map((t) => (
                <li key={t.slug}>
                  <Link href={`/trabajos/${t.slug}`} className="flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-borde py-4 hover:bg-superficie">
                    <Foto imagen={t.imagenes[0]} sizes="128px" proporcion="4/3" decorativa etiquetaCorta className="w-32 flex-none" />
                    <span className="min-w-0 flex-[1_1_200px]">
                      <span className="condensada block text-2xl leading-[1.05]">{t.titulo}</span>
                      <span className="mt-1 block text-sm text-texto-suave">{[t.ubicacion, t.anio, t.duracion].filter(Boolean).join(" · ")}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {servicio.preguntas.length > 0 && (
        <section className="border-t border-borde">
          <div className="contenedor flex flex-wrap gap-x-12 gap-y-5 py-[clamp(40px,6vw,80px)]">
            <h2 className="condensada flex-[1_1_240px] text-h2">Preguntas</h2>
            <Preguntas preguntas={servicio.preguntas} grupo="faq-servicio" className="min-w-0 flex-[3_1_560px]" />
          </div>
        </section>
      )}

      {otros.length > 0 && (
        <section className="border-t border-borde">
          <div className="contenedor py-[clamp(40px,6vw,80px)]">
            <h2 className="condensada mb-4 text-h2">Otros problemas</h2>
            <nav aria-label="Otros problemas">
              <ListaIndice>
                {otros.map((s) => (
                  <FilaIndice
                    key={s.slug}
                    href={`/servicios/${s.slug}`}
                    numero={numeroOrden(config.servicios.indexOf(s))}
                    titulo={s.titulo}
                    tam="pequena"
                  />
                ))}
              </ListaIndice>
            </nav>
          </div>
        </section>
      )}

      <CtaFinal {...par} horario={horario} />
    </>
  );
}
