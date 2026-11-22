import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarServicio, metadatosServicio, parametrosServicios, trabajosDelServicio } from "@andrei-leads/core";

import config from "@/site.config";
import { Pareja } from "@/components/Pareja";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { ListaIncluye, NumeroGigante } from "@/components/secciones/Soluciones";
import { TarjetaObra } from "@/components/secciones/TarjetaObra";
import { mensajeDeServicio, TEXTO_WA_SERVICIO } from "@/lib/mensajes";

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
 * Ficha de solución (encargo §7): migas; foto 3:2 a sangre de columna (o la ficha tipográfica)
 * con el `h1`, la descripción y la pareja; `contenido` en 64 caracteres con capitular (sin
 * contenido, la descripción); «Qué *incluye*» con pareja; el resto de `imagenes` en una tira
 * vertical; obras de esta solución; preguntas y CTA final. Tres parejas con su mensaje.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const c = config;
  const cta = { telefono: c.contacto.telefono, whatsapp: c.contacto.whatsapp, mensaje: mensajeDeServicio(servicio) };
  const n = c.servicios.indexOf(servicio) + 1;
  const [foto, ...resto] = servicio.imagenes;
  const [primero, ...parrafos] = servicio.contenido.length > 0 ? servicio.contenido : [servicio.descripcion];
  const obras = trabajosDelServicio(c.trabajos, servicio);

  return (
    <>
      <article className="contenedor pt-[clamp(24px,4vw,48px)]">
        <Migas
          migas={[
            { href: "/", texto: "Inicio" },
            { href: "/servicios", texto: "Soluciones" },
            { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
          ]}
        />
        <div className="mt-[clamp(28px,4vw,56px)] flex flex-wrap items-end gap-x-[clamp(32px,5vw,80px)] gap-y-8">
          <div className="min-w-0 flex-[1_1_520px]">
            {foto ? <Foto imagen={foto} sizes="(min-width: 1024px) 55vw, 100vw" preload /> : <NumeroGigante n={n} />}
          </div>
          <div className="min-w-0 flex-[1_1_360px]">
            <h1 className="titulo-h1">{servicio.titulo}</h1>
            <p className="m-0 mt-5 mb-7 text-texto-suave">{servicio.descripcion}</p>
            <Pareja cta={cta} textoWhatsapp={TEXTO_WA_SERVICIO} alto={56} />
          </div>
        </div>

        <div className="mx-auto mt-[clamp(64px,9vw,128px)] max-w-[64ch]">
          <p className="capitular m-0 font-titulo text-[21px] leading-[1.6]">{primero}</p>
          {parrafos.map((p) => (
            <p key={p} className="m-0 mt-5 text-texto-medio">
              {p}
            </p>
          ))}
        </div>

        {servicio.incluye.length > 0 && (
          <section aria-labelledby="titulo-incluye" className="mx-auto mt-[clamp(64px,9vw,128px)] max-w-[880px]">
            <h2 id="titulo-incluye" className="titulo-h2">
              Qué <em>incluye</em>
            </h2>
            <ListaIncluye incluye={servicio.incluye} grande />
            <Pareja cta={cta} textoWhatsapp={TEXTO_WA_SERVICIO} className="mt-8 max-w-[560px]" />
          </section>
        )}

        {resto.length > 0 && (
          <div className="mt-[clamp(80px,10vw,160px)] flex flex-col items-center gap-[clamp(80px,10vw,160px)]">
            {resto.map((f) => (
              <Foto key={f.src} imagen={f} sizes="(min-width: 768px) 720px, 100vw" className="w-full max-w-[720px]" />
            ))}
          </div>
        )}

        {obras.length > 0 && (
          <section aria-labelledby="titulo-obras-solucion" className="mt-(--seccion)">
            <h2 id="titulo-obras-solucion" className="titulo-h2 mb-10">
              Obras con esta <em>solución</em>
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-x-[clamp(24px,4vw,64px)] gap-y-12">
              {obras.map((t) => (
                <TarjetaObra key={t.slug} trabajo={t} sizes="(min-width: 1024px) 45vw, 100vw" />
              ))}
            </div>
          </section>
        )}
      </article>
      <PreguntasFrecuentes preguntas={servicio.preguntas} grupo="preguntas-solucion" />
      <CtaFinal cta={cta} textoWhatsapp={TEXTO_WA_SERVICIO} />
    </>
  );
}
