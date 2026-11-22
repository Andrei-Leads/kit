import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarServicio, metadatosServicio, parametrosServicios } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { Pareja } from "@/components/Botones";
import { CabeceraPagina } from "@/components/CabeceraPagina";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { RejillaObras, numerar } from "@/components/secciones/RejillaObras";
import { mensajeDeServicio } from "@/lib/mensajes";
import { numeroObra, obrasTexto } from "@/lib/obras";
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
 * Ficha de servicio: migas, «Servicio 01 · 2 obras», `h1`, descripción y la
 * pareja → las obras de ese servicio en rejilla (`#obras`, sin pestañas, con
 * la celda de CTA) → `contenido` a dos columnas → fotos en color 3:2 → «Qué
 * incluye» → pareja → preguntas del servicio → CTA final. Tres parejas con el
 * mensaje del servicio (hero, tras «incluye», final).
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const { contacto, trabajos } = config;
  const mensaje = mensajeDeServicio(servicio);
  const indice = config.servicios.indexOf(servicio);
  const obras = numerar(trabajos).filter((o) => o.trabajo.servicio === servicio.slug);
  const pareja = <Pareja telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} />;
  const hayContenido = servicio.contenido.length > 0;

  return (
    <>
      <CabeceraPagina
        pagina="servicios"
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
          { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
        ]}
        antetitulo={`Servicio ${numeroObra(indice)}${obras.length > 0 ? ` · ${obrasTexto(obras.length)}` : ""}`}
        titulo={servicio.titulo}
        entrada={
          <>
            <p>{servicio.descripcion}</p>
            {servicio.precioDesde && <p className="mt-2 font-semibold">{servicio.precioDesde}</p>}
          </>
        }
      >
        {pareja}
      </CabeceraPagina>

      <RejillaObras
        id="obras"
        obras={obras}
        servicios={config.servicios}
        encabezado={{ titulo: `Obras de ${servicio.titulo.toLowerCase()}`, sub: obrasTexto(obras.length) }}
        cierre={{
          tipo: "cta",
          titulo: `La obra ${numeroObra(trabajos.length)} puede ser la tuya`,
          children: <Pareja telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} compacta className="max-w-none" />,
        }}
        className="pt-(--seccion)"
      />

      {(hayContenido || servicio.imagenes.length > 0 || servicio.incluye.length > 0) && (
        <section aria-label="Qué hacemos" className="contenedor pt-(--seccion)">
          {hayContenido && (
            <div className="border-t-2 border-borde pt-5 lg:columns-2 lg:gap-10">
              {servicio.contenido.map((p) => (
                <p key={p} className="m-0 mb-3.5 break-inside-avoid">
                  {p}
                </p>
              ))}
            </div>
          )}
          {servicio.imagenes.length > 0 && (
            <div className={cn("grid gap-3 sm:grid-cols-2", hayContenido && "mt-7")}>
              {servicio.imagenes.map((img, i) => (
                <figure key={img.src} className="m-0">
                  <Foto imagen={img} sizes="(min-width: 640px) 50vw, 100vw" proporcion="3/2" preload={i === 0 && obras.length === 0} />
                </figure>
              ))}
            </div>
          )}
          {servicio.incluye.length > 0 && (
            <>
              <h2 className="titulo-h2 m-0 mt-12">Qué incluye</h2>
              <ol className="m-0 mt-4 list-none border-t-2 border-borde p-0">
                {servicio.incluye.map((x, k) => (
                  <li key={x} className="flex items-baseline gap-4 border-b-2 border-borde py-3">
                    <span aria-hidden="true" className="condensada w-7 flex-none text-[15px] text-texto-suave">
                      {numeroObra(k)}
                    </span>
                    <span className="text-[17px]">{x}</span>
                  </li>
                ))}
              </ol>
            </>
          )}
          <div className="mt-6">{pareja}</div>
        </section>
      )}

      <PreguntasFrecuentes preguntas={servicio.preguntas} grupo="preguntas-servicio" />
      <CtaFinal contacto={contacto} mensaje={mensaje} />
    </>
  );
}
