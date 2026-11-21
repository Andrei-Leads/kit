import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarServicio, metadatosServicio, parametrosServicios, trabajosDelServicio } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { ParCta } from "@/components/Botones";
import { ChatWhatsApp } from "@/components/secciones/ChatWhatsApp";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { H1, H2 } from "@/components/secciones/Encabezado";
import { Precio } from "@/components/secciones/Precio";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { TarjetaTrabajo } from "@/components/secciones/TarjetaTrabajo";
import { mensajeDeServicio } from "@/lib/mensajes";

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
 * Ficha de servicio: migas, h1, descripción, precio, pareja Llamar + «Mándanos una foto» y la
 * versión corta del asistente (paso 2, con el servicio elegido) → contenido, «Qué incluye» en
 * burbujas y pareja; fotos 3:4 → trabajos del servicio → preguntas → CTA con su mensaje.
 */
export default async function FichaServicio({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const { contacto, negocio } = config;
  const mensaje = mensajeDeServicio(servicio);
  const trabajos = trabajosDelServicio(config.trabajos, servicio);
  const parrafos = servicio.contenido; // sin contenido, la descripción ya está bajo el h1

  return (
    <article>
      <div className="contenedor pt-5 pb-[clamp(40px,2rem+3vw,88px)]">
        <Migas
          migas={[
            { href: "/", texto: "Inicio" },
            { href: "/servicios", texto: "Servicios" },
            { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
          ]}
        />
        <div className="mt-2 flex flex-wrap items-start gap-x-[clamp(32px,5vw,72px)] gap-y-7">
          <div className="flex min-w-0 flex-[5_1_320px] flex-col gap-4">
            <h1 className={H1}>{servicio.titulo}</h1>
            <p className="m-0 text-[clamp(1.125rem,1rem+0.5vw,1.35rem)] leading-snug text-texto-suave">{servicio.descripcion}</p>
            {servicio.precioDesde && (
              <p className="m-0 w-fit rounded-[14px_14px_14px_4px] border border-linea-fuerte bg-superficie px-3.5 py-1.5 font-extrabold">
                <Precio texto={servicio.precioDesde} />
              </p>
            )}
            <ParCta contacto={contacto} mensaje={mensaje} />
          </div>
          {contacto.whatsapp && (
            <div className="flex min-w-0 flex-[7_1_400px] justify-end">
              <div className="w-full max-w-(--container-chat)">
                <ChatWhatsApp negocio={negocio} contacto={contacto} servicios={config.servicios} servicioInicial={servicio.titulo} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sin contenido, «incluye» ni fotos, la banda no tiene nada propio: se omite (la pareja ya está en el hero y el CTA). */}
      {(parrafos.length > 0 || servicio.incluye.length > 0 || servicio.imagenes.length > 0) && (
      <div className="bg-superficie py-[clamp(48px,2.5rem+3vw,96px)]">
        <div className="contenedor flex flex-wrap items-start gap-x-[clamp(32px,6vw,96px)] gap-y-8">
          <div className="flex max-w-[62ch] min-w-0 flex-[1_1_340px] flex-col gap-4">
            {parrafos.map((p, i) => (
              <p key={i} className="m-0">
                {p}
              </p>
            ))}
            {servicio.incluye.length > 0 && (
              <>
                <h2 className={`${H2} mt-4`}>Qué incluye</h2>
                <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                  {servicio.incluye.map((x) => (
                    <li key={x} className="rounded-[20px_20px_6px_20px] bg-burbuja-sale px-4 py-2.5 leading-tight font-bold">
                      {x}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <ParCta contacto={contacto} mensaje={mensaje} className="mt-2" />
          </div>
          {servicio.imagenes.length > 0 && (
            <div className="flex w-full min-w-0 flex-[0_1_300px] flex-col gap-4">
              {servicio.imagenes.map((f) => (
                <Foto key={f.src} imagen={f} proporcion="3/4" sizes="300px" className="w-full max-w-[300px] lg:ml-auto" />
              ))}
            </div>
          )}
        </div>
      </div>
      )}

      {trabajos.length > 0 && (
        <section aria-labelledby="h-svc-trab" className="contenedor pt-[clamp(48px,2.5rem+3vw,96px)]">
          <h2 id="h-svc-trab" className={`${H2} mb-5`}>
            Lo hemos hecho así
          </h2>
          <ul className="m-0 grid list-none grid-cols-2 gap-x-3 gap-y-4 p-0 lg:grid-cols-4">
            {trabajos.map((t) => (
              <li key={t.slug}>
                <TarjetaTrabajo trabajo={t} sizes="(min-width: 1024px) 280px, 50vw" />
              </li>
            ))}
          </ul>
        </section>
      )}

      <PreguntasFrecuentes preguntas={servicio.preguntas} titulo="Preguntas" grupo="faq-servicio" />
      <CtaFinal contacto={contacto} mensaje={mensaje} />
    </article>
  );
}
