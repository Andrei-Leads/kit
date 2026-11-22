import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  buscarServicio,
  metadatosServicio,
  minusculaInicial,
  otrosServicios,
  parametrosServicios,
  precioDesde,
  trabajosDelServicio,
} from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { Preguntas } from "@/components/base/Preguntas";
import { LlamadaCierre, ParCierre, WhatsappContorno } from "@/components/Botones";
import { BandaCabecera, H1_INTERIOR, H2 } from "@/components/secciones/BandaCabecera";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { TarjetaTrabajo } from "@/components/secciones/TarjetaTrabajo";
import { horarioLinea, valoracionLinea } from "@/lib/formato";
import { mensajeDeServicio, TEXTO_WHATSAPP_SERVICIO } from "@/lib/mensajes";

// Sin esto, con partialPrefetching un slug inexistente da 200 en la primera visita (AGENTS.md §11).
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
 * Ficha de servicio: banda con migas, h1, descripción, placa «Llegamos en», precio, botones y la
 * primera foto en duotono → contenido y «Qué incluye» (con marcas de codo) → más fotos → trabajos del
 * servicio → preguntas y «También hacemos» → «Dónde hacemos {servicio}» (texto, no enlaces) → CTA.
 * Sin `contenido`, la descripción (en la banda) hace de texto y la página lleva noindex (core).
 */
export default async function FichaServicio({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const { contacto, zonas } = config;
  const mensaje = mensajeDeServicio(servicio);
  const textoWa = TEXTO_WHATSAPP_SERVICIO;
  const [foto, ...fotos] = servicio.imagenes;
  const precio = servicio.precioDesde ? precioDesde(servicio.precioDesde) : undefined;
  const trabajos = trabajosDelServicio(config.trabajos, servicio);
  const otros = otrosServicios(config.servicios, servicio).slice(0, 3);
  const valoracion = valoracionLinea(config.valoracion);
  const hayTexto = servicio.contenido.length > 0;
  const hayIncluye = servicio.incluye.length > 0;

  return (
    <>
      <BandaCabecera>
        <div className="flex flex-wrap items-start gap-x-12 gap-y-7">
          <div className="min-w-0 flex-[1_1_520px]">
            <Migas
              migas={[
                { href: "/", texto: "Inicio" },
                { href: "/servicios", texto: "Servicios" },
                { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
              ]}
              className="text-texto [&_a]:underline"
            />
            <h1 className={`${H1_INTERIOR} mt-3`}>{servicio.titulo}</h1>
            <p className="mt-3 mb-0 max-w-[46ch] text-[clamp(1rem,0.9rem+0.4vw,1.1875rem)]">{servicio.descripcion}</p>
            {(contacto.tiempoLlegada || precio) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {contacto.tiempoLlegada && (
                  <span className="corte-9 inline-flex h-9 items-center gap-2 bg-tinta pr-[18px] pl-3 text-[15px] leading-none font-medium text-sobre-tinta">
                    Llegamos en
                    <strong className="font-titulo text-lg leading-none font-bold text-acento">{contacto.tiempoLlegada}</strong>
                  </span>
                )}
                {precio && (
                  <span className="inline-flex h-9 items-center border-2 border-tinta px-3.5 font-titulo text-base leading-none font-bold">
                    {precio.desde ? `desde ${precio.importe}` : precio.importe}
                  </span>
                )}
              </div>
            )}
            <div className="mt-5 flex max-w-[720px] flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3 sm:[&>*]:flex-[1_1_300px]">
              <LlamadaCierre contacto={contacto} alto="min-h-16" className="[&>span]:text-[19px] [&>span]:whitespace-nowrap" />
              {contacto.whatsapp && (
                <WhatsappContorno numero={contacto.whatsapp} mensaje={mensaje} alto="min-h-14">
                  {textoWa}
                </WhatsappContorno>
              )}
            </div>
            {valoracion && <p className="mt-3 mb-0 text-[15px] leading-[1.3] font-semibold">{valoracion}</p>}
          </div>
          {foto && (
            <div className="corte min-w-0 flex-[1_1_340px]">
              <Foto imagen={foto} proporcion="3/2" preload sizes="(min-width: 1024px) 500px, 100vw" />
            </div>
          )}
        </div>
      </BandaCabecera>

      {(hayTexto || hayIncluye) && (
        <section className="contenedor flex flex-wrap gap-x-16 gap-y-8 pt-9 pb-2 lg:pt-16">
          {hayTexto && (
            <div className="max-w-[68ch] min-w-0 flex-[1_1_560px]">
              {servicio.contenido.map((p, i) => (
                <p key={i} className="mt-0 mb-3.5">
                  {p}
                </p>
              ))}
            </div>
          )}
          <div className="min-w-0 flex-[1_1_320px]">
            {hayIncluye && (
              <>
                <h2 className={`${H2} mb-3`}>Qué incluye</h2>
                <ul className="m-0 grid list-none gap-2 p-0">
                  {servicio.incluye.map((x) => (
                    <li key={x} className="flex items-baseline gap-3">
                      <span aria-hidden="true" className="box-border size-3 flex-none -translate-y-0.5 border-b-4 border-l-4 border-tinta" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <ParCierre
              columna
              contacto={contacto}
              whatsapp={contacto.whatsapp}
              mensaje={mensaje}
              linea={horarioLinea(contacto)}
              className={hayIncluye ? "mt-[22px]" : ""}
            />
          </div>
        </section>
      )}

      {fotos.length > 0 && (
        <section className="contenedor pt-10 pb-2">
          <h2 className="sr-only">Fotos de {minusculaInicial(servicio.titulo)}</h2>
          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-3 lg:gap-3.5">
            {fotos.map((f) => (
              <div key={f.src} className="corte">
                <Foto imagen={f} proporcion="3/2" sizes="(min-width: 1024px) 400px, 50vw" />
              </div>
            ))}
          </div>
        </section>
      )}

      {trabajos.length > 0 && (
        <section className="contenedor pt-10 pb-2">
          <h2 className={`${H2} mb-3.5`}>Trabajos de {minusculaInicial(servicio.titulo)}</h2>
          <div className="grid gap-3">
            {trabajos.slice(0, 3).map((t) => (
              <TarjetaTrabajo key={t.slug} trabajo={t} horizontal />
            ))}
          </div>
        </section>
      )}

      {(servicio.preguntas.length > 0 || otros.length > 0) && (
        <section className="contenedor flex flex-wrap gap-x-16 gap-y-8 pt-10 pb-2">
          {servicio.preguntas.length > 0 && (
            <div className="min-w-0 flex-[1_1_560px]">
              <h2 className={`${H2} mb-3`}>Preguntas</h2>
              <Preguntas preguntas={servicio.preguntas} grupo="faq-servicio" />
            </div>
          )}
          {otros.length > 0 && (
            <div className="min-w-0 flex-[1_1_320px]">
              <h2 className={`${H2} mb-3`}>También hacemos</h2>
              <ul className="m-0 grid list-none gap-2 p-0">
                {otros.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/servicios/${o.slug}`} className="tarjeta-corte corte-12 block bg-tinta p-0.5 text-texto no-underline">
                      <span className="corte-11 flex min-h-12 items-center justify-between gap-3 bg-superficie px-4 font-titulo text-[17px] leading-[1.2] font-semibold">
                        {o.titulo}
                        <span aria-hidden="true">→</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {zonas.length > 0 && (
        <section className="contenedor pt-10 pb-6">
          <h2 className={`${H2} mb-2.5`}>Dónde hacemos {minusculaInicial(servicio.titulo)}</h2>
          <p className="m-0 max-w-[80ch] font-titulo text-[17px] leading-[1.7] font-semibold">{zonas.join(" · ")}</p>
        </section>
      )}

      <CtaFinal contacto={contacto} mensaje={mensaje} titulo="¿Lo necesitas ya? Llama." textoWhatsapp={textoWa} variante="cierre" />
    </>
  );
}
