import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarServicio, metadatosServicio, minusculaInicial, parametrosServicios, trabajosDelServicio } from "@andrei-leads/core";

import config from "@/site.config";
import { Pareja } from "@/components/Botones";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { ArcoTesela } from "@/components/secciones/ArcoTesela";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { TarjetaCasa } from "@/components/secciones/TarjetaCasa";
import { datosCta } from "@/lib/cta";
import { mensajeDeServicio, TEXTO_WHATSAPP_SERVICIO } from "@/lib/mensajes";
import { metaCorta, metaLarga } from "@/lib/textos";
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
 * Ficha de servicio (encargo §7): migas, h1, «desde», pareja y la foto 1 en un arco grande →
 * deslizador en arco de la primera casa del servicio con `antes` → `contenido` a 62 caracteres
 * e «incluye» con viñeta de arco → pareja → resto de fotos en arcos pequeños → casas del
 * servicio → preguntas → CTA con su mensaje. La pareja sale tres veces.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const cta = datosCta(config.contacto, mensajeDeServicio(servicio));
  const enFrase = minusculaInicial(servicio.titulo);
  const casas = trabajosDelServicio(config.trabajos, servicio);
  const conAntes = casas.find((t) => t.antes);
  const [foto, ...resto] = servicio.imagenes;
  const hayTexto = servicio.contenido.length > 0;
  const hayIncluye = servicio.incluye.length > 0;

  return (
    <>
      <span data-pagina="servicios" hidden />
      <section
        aria-labelledby="titulo-servicio"
        className="contenedor grid items-center gap-x-16 gap-y-8 pt-[clamp(1.25rem,4vw,4rem)] lg:grid-cols-2"
      >
        <div className="flex flex-col items-start gap-4">
          <Migas
            migas={[
              { href: "/", texto: "Inicio" },
              { href: "/servicios", texto: "Servicios" },
              { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
            ]}
          />
          <h1 id="titulo-servicio" className="titulo-display">
            {servicio.titulo}
          </h1>
          {servicio.precioDesde && <span className="pildora px-3.5 py-[5px]">{servicio.precioDesde}</span>}
          <p className="m-0 mb-2 max-w-[34ch] text-(length:--text-entrada) leading-normal">{servicio.descripcion}</p>
          <Pareja cta={cta} textoWhatsapp={TEXTO_WHATSAPP_SERVICIO} alinear="inicio" />
        </div>
        <div className="w-full lg:max-w-[460px] lg:justify-self-end">
          {foto ? (
            <Foto imagen={foto} sizes="(min-width: 1024px) 460px, 100vw" proporcion="4/5" arco preload />
          ) : (
            <ArcoTesela proporcion="4/5" />
          )}
        </div>
      </section>

      {conAntes?.antes && (
        <section aria-labelledby="titulo-antes-despues" className="contenedor pt-[clamp(4rem,2.5rem+6vw,7rem)]">
          <h2 id="titulo-antes-despues" className="titulo-seccion mb-2 text-center">
            Así cambió una casa
          </h2>
          <p className="m-0 mb-8 text-center text-texto-suave">
            {conAntes.titulo}
            {metaLarga(conAntes) && <> · {metaLarga(conAntes)}</>}
          </p>
          <AntesDespues
            antes={conAntes.antes}
            despues={conAntes.imagenes[0]}
            titulo={conAntes.titulo}
            sizes="(min-width: 1024px) 520px, 100vw"
            className="mx-auto w-full max-w-[720px] [@media(scripting:enabled)]:max-w-[520px]"
          />
        </section>
      )}

      {(hayTexto || hayIncluye) && (
        <section aria-label="Qué hacemos" className="contenedor grid gap-x-16 gap-y-10 pt-[clamp(4rem,2.5rem+6vw,7rem)] lg:grid-cols-2">
          {hayTexto && (
            <div className="max-w-[62ch]">
              {servicio.contenido.map((p) => (
                <p key={p} className="m-0 mb-[18px]">
                  {p}
                </p>
              ))}
            </div>
          )}
          {hayIncluye && (
            <div className={cn(!hayTexto && "lg:col-span-2")}>
              <h2 className="remate m-0 mb-5 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-[1.15]">Qué incluye</h2>
              <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
                {servicio.incluye.map((x) => (
                  <li key={x} className="flex items-start gap-3.5">
                    <span aria-hidden="true" className="mt-[5px] h-[18px] w-3.5 flex-none rounded-[7px_7px_2px_2px] bg-acento" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <div className="contenedor pt-14">
        <Pareja cta={cta} nota="¿Hablamos de tu casa?" textoWhatsapp={TEXTO_WHATSAPP_SERVICIO} />
      </div>

      {resto.length > 0 && (
        <section aria-label="Más fotos" className="contenedor pt-[clamp(4rem,2.5rem+6vw,7rem)]">
          <ul className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-4 p-0 lg:grid-cols-4">
            {resto.map((f) => (
              <li key={f.src}>
                <Foto imagen={f} sizes="(min-width: 1024px) 25vw, 50vw" arco calidad={60} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {casas.length > 0 && (
        <section aria-labelledby="titulo-casas-servicio" className="contenedor pt-[clamp(4rem,2.5rem+6vw,7rem)]">
          <h2 id="titulo-casas-servicio" className="titulo-seccion mb-8">
            Casas donde lo hicimos
          </h2>
          <ul className="m-0 grid list-none gap-8 p-0 lg:grid-cols-3">
            {casas.map((t, i) => (
              <li key={t.slug} className="flex">
                <TarjetaCasa trabajo={t} meta={metaCorta(t)} i={i} className="w-full" />
              </li>
            ))}
          </ul>
        </section>
      )}

      <PreguntasFrecuentes preguntas={servicio.preguntas} titulo={`Preguntas sobre ${enFrase}`} grupo="preguntas-servicio" />

      <CtaFinal
        cta={cta}
        titulo={`Pide presupuesto de ${enFrase}`}
        texto="Mándanos unas fotos y unas medidas por WhatsApp y te decimos por dónde empezar."
        textoWhatsapp={TEXTO_WHATSAPP_SERVICIO}
      />
    </>
  );
}
