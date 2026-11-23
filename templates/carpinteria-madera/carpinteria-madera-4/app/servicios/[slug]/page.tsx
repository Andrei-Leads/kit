import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarServicio, metadatosServicio, minusculaInicial, parametrosServicios } from "@andrei-leads/core";

import config from "@/site.config";
import { Migas } from "@/components/base/Migas";
import { Pareja } from "@/components/Botones";
import { MarcaPagina } from "@/components/CabeceraPagina";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { RejillaGaleria, RejillaPiezas } from "@/components/secciones/RejillaPiezas";
import { mensajeDeServicio } from "@/lib/mensajes";
import { numeroPieza, numerar } from "@/lib/piezas";

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
 * Ficha de servicio (entrega §07): «Catálogo 01» en acento, `h1` display, descripción, precio «desde»
 * tal cual y la pareja con el servicio en el mensaje → `contenido` a dos columnas → «Incluye» con
 * su pareja → «Piezas de {servicio}» (sin filtro) o, sin piezas, las fotos del servicio →
 * preguntas del servicio (o las generales) → CTA final «Pide presupuesto de {servicio}».
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const { contacto, servicios, trabajos, preguntas } = config;
  const indice = servicios.indexOf(servicio);
  const mensaje = mensajeDeServicio(servicio);
  const textoWhatsapp = `Pide presupuesto de ${minusculaInicial(servicio.titulo)}`;
  const piezas = numerar(trabajos).filter((p) => p.trabajo.servicio === servicio.slug);

  return (
    <>
      <section className="contenedor flex flex-col gap-6 pt-1">
        <MarcaPagina pagina="servicios" />
        <div className="flex flex-col gap-3.5 border-b-2 border-borde pb-6">
          <Migas
            migas={[
              { href: "/", texto: "Inicio" },
              { href: "/servicios", texto: "Servicios" },
              { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
            ]}
            className="-mb-2"
          />
          <span className="ft numero normal-case text-[clamp(1.5rem,1.1rem+1.2vw,2.5rem)] leading-none">Catálogo {numeroPieza(indice)}</span>
          <h1 className="titulo-display m-0 text-balance">{servicio.titulo}</h1>
          <p className="m-0 max-w-[52ch] text-lg text-pretty">{servicio.descripcion}</p>
          {servicio.precioDesde && <p className="pie-ficha m-0 text-base">{servicio.precioDesde}</p>}
          <Pareja telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} textoWhatsapp={textoWhatsapp} />
        </div>
        {servicio.contenido.length > 0 && (
          <div className="max-w-[1100px] [column-gap:40px] [columns:2_320px]">
            {servicio.contenido.map((p) => (
              <p key={p} className="m-0 mb-3 break-inside-avoid text-pretty">
                {p}
              </p>
            ))}
          </div>
        )}
        {servicio.incluye.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="titulo-h2 m-0">Incluye</h2>
            <ul className="m-0 max-w-[760px] list-none border-t-2 border-borde p-0">
              {servicio.incluye.map((x) => (
                <li key={x} className="ft border-b-2 border-borde py-2.5 text-[1.375rem] leading-tight">
                  <span aria-hidden="true">— </span>
                  {x}
                </li>
              ))}
            </ul>
            <Pareja telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} textoWhatsapp={textoWhatsapp} />
          </div>
        )}
      </section>
      {piezas.length > 0 ? (
        <RejillaPiezas piezas={piezas} servicios={servicios} titulo={`Piezas de ${minusculaInicial(servicio.titulo)}`} id="piezas-servicio" className="pt-(--seccion)" />
      ) : (
        <RejillaGaleria fotos={servicio.imagenes} titulo="Imágenes" recuento={servicio.imagenes.length === 1 ? "1 imagen" : `${servicio.imagenes.length} imágenes`} className="pt-(--seccion)" />
      )}
      <PreguntasFrecuentes preguntas={servicio.preguntas.length > 0 ? servicio.preguntas : preguntas} />
      <CtaFinal contacto={contacto} mensaje={mensaje} titulo={textoWhatsapp} />
    </>
  );
}
