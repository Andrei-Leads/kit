import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarServicio, metadatosServicio, parametrosServicios, precioDesde, trabajosDelServicio } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { Pareja } from "@/components/Botones";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FilasTrabajos } from "@/components/secciones/FilasTrabajos";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { mensajeDeServicio } from "@/lib/mensajes";
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
 * Ficha de servicio (encargo §7): migas, h1, descripción, precio y pareja Llamar + WhatsApp con el
 * mensaje del servicio y «Pregunta por WhatsApp»; `contenido`, «Qué incluye» con rombos y fotos en
 * miniatura recortadas en paralelogramo, y después la segunda pareja; trabajos del servicio; preguntas; CTA final (tercera llamada). Bloques vacíos ocultos.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const { contacto } = config;
  const mensaje = mensajeDeServicio(servicio);
  const trabajos = trabajosDelServicio(config.trabajos, servicio);
  const precio = servicio.precioDesde ? precioDesde(servicio.precioDesde) : null;
  const hayCuerpo = servicio.contenido.length > 0 || servicio.incluye.length > 0;
  const hayDetalle = hayCuerpo || servicio.imagenes.length > 0;

  const WA = "Pregunta por WhatsApp";

  return (
    <>
      <section className="bg-fondo [background-image:var(--haz)]">
        <div className="contenedor flex flex-col gap-5 pt-2 pb-10 lg:pb-14">
          <Migas
            migas={[
              { href: "/", texto: "Inicio" },
              { href: "/servicios", texto: "Servicios" },
              { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
            ]}
          />
          <h1 className="titulo-h1 m-0 max-w-[16ch]">{servicio.titulo}</h1>
          <p className="m-0 max-w-[60ch] text-lg">{servicio.descripcion}</p>
          {precio && (
            <p className="m-0 flex items-baseline gap-2">
              <span className="rotulo">{precio.desde ? "Desde" : "Precio"}</span>{" "}
              <span className="condensada text-[2.5rem] leading-none">{precio.importe}</span>
            </p>
          )}
          <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp={WA} className="max-w-3xl" />
        </div>
      </section>

      {hayDetalle && (
        <section aria-label="Detalle del servicio" className="bg-fondo">
          <div className="contenedor flex flex-col gap-8 pb-10 lg:pb-14">
            <div className={cn("grid max-w-5xl gap-8", hayCuerpo && servicio.imagenes.length > 0 && "sm:grid-cols-[minmax(0,1fr)_minmax(180px,225px)] lg:gap-14")}>
              {hayCuerpo && (
                <div className="flex max-w-[68ch] flex-col gap-6">
                  {servicio.contenido.length > 0 && (
                    <div className="flex flex-col gap-4 text-lg">
                      {servicio.contenido.map((p, i) => (
                        <p key={i} className="m-0">
                          {p}
                        </p>
                      ))}
                    </div>
                  )}
                  {servicio.incluye.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <h2 className="titulo-h2 m-0">Qué incluye</h2>
                      <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                        {servicio.incluye.map((i) => (
                          <li key={i} className="flex items-center gap-3.5 text-lg">
                            <span aria-hidden="true" className="rombo" />
                            {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              {servicio.imagenes.length > 0 && (
                <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(180px,225px))] gap-3 p-0">
                  {servicio.imagenes.map((f) => (
                    <li key={f.src}>
                      <Foto imagen={f} proporcion="1/1" sizes="225px" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp={WA} className="max-w-3xl" />
          </div>
        </section>
      )}

      {trabajos.length > 0 && (
        <section aria-labelledby="titulo-trabajos-servicio" className="bg-alterna">
          <div className="contenedor flex flex-col gap-6 py-10 lg:py-14">
            <h2 id="titulo-trabajos-servicio" className="titulo-h2 m-0">
              Avisos de este tipo
            </h2>
            <FilasTrabajos trabajos={trabajos} />
          </div>
        </section>
      )}

      <PreguntasFrecuentes preguntas={servicio.preguntas} titulo="Preguntas" id="titulo-preguntas-servicio" grupo="preguntas-servicio" />
      <CtaFinal contacto={contacto} mensaje={mensaje} titulo="¿Te pasa ahora?" textoWhatsapp={WA} />
    </>
  );
}
