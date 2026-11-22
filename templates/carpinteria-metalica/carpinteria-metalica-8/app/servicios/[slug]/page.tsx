import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarServicio, metadatosServicio, parametrosServicios, precioDesde, trabajosDelServicio } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Obras } from "@/components/secciones/Obras";
import { PreguntasFrecuentes, Recordatorio } from "@/components/secciones/ZonasPreguntas";
import { mensajeDeServicio } from "@/lib/mensajes";
import { cn } from "@/lib/utils";
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

/** Texto corto del botón de WhatsApp del servicio (regla de Ysst): el servicio va en el mensaje. */
const PEDIR = "Pedir presupuesto";

/**
 * Ficha de servicio (encargo §7): h1 y foto en arco, `contenido` y «Qué incluye» con la pareja,
 * más fotos en collage, obras del servicio, preguntas, el recordatorio del taller y el CTA con su
 * mensaje. La pareja WhatsApp + Llamar sale tres veces (hero, tras «incluye», final).
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const { contacto, negocio } = config;
  const mensaje = mensajeDeServicio(servicio);
  const [foto, ...fotos] = servicio.imagenes;
  const precio = servicio.precioDesde && precioDesde(servicio.precioDesde);
  const parrafos = servicio.contenido;

  return (
    <>
      <section aria-labelledby="titulo-servicio" className="contenedor pt-[clamp(28px,4vw,48px)] pb-[clamp(56px,7vw,96px)]">
        <div className="grid items-center gap-[clamp(28px,5vw,72px)] lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <Migas
              migas={[
                { href: "/", texto: "Inicio" },
                { href: "/servicios", texto: "Servicios" },
                { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
              ]}
            />
            <h1 id="titulo-servicio" className="font-titulo text-display leading-none font-medium tracking-[-0.02em] text-balance">
              {servicio.titulo}
            </h1>
            <p className="max-w-[44ch] text-texto-suave text-pretty">{servicio.descripcion}</p>
            {precio && (
              <p className="font-titulo text-2xl">
                {precio.desde && <span className="me-2 font-texto text-sm font-semibold tracking-[0.08em] text-texto-suave uppercase">Desde</span>}
                {precio.importe}
              </p>
            )}
            <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp={PEDIR} textoLlamar="Llamar al taller" grande className="mt-1.5" />
          </div>
          <div>
            {foto ? (
              <Foto
                imagen={foto}
                preload
                proporcion="4/5"
                pieDerecha
                sizes="(min-width: 1024px) 520px, calc(100vw - 40px)"
                className="ms-auto w-full max-w-[520px] rounded-[50%_50%_24px_24px/40%_40%_24px_24px] bg-primario-suave"
                claseFigura="ms-auto max-w-[520px]"
              />
            ) : (
              <div aria-hidden="true" className="ms-auto flex aspect-[4/5] w-full max-w-[520px] items-center justify-center rounded-[50%_50%_24px_24px/40%_40%_24px_24px] bg-primario-suave font-titulo text-[180px] font-medium text-primario-tinta opacity-60">
                {servicio.titulo.charAt(0)}
              </div>
            )}
          </div>
        </div>
      </section>

      {(parrafos.length > 0 || servicio.incluye.length > 0) && (
        <section aria-label="Detalle del servicio" className="contenedor pb-[clamp(56px,7vw,96px)]">
          <div className="grid items-start gap-[clamp(32px,5vw,72px)] lg:grid-cols-2">
            <div className="flex max-w-[62ch] flex-col gap-[18px]">
              {parrafos.map((p) => (
                <p key={p} className="text-pretty">
                  {p}
                </p>
              ))}
            </div>
            {servicio.incluye.length > 0 && (
              <div className="flex flex-col gap-[18px] rounded-tarjeta bg-superficie p-[clamp(24px,3vw,36px)]">
                <h2 className="font-titulo text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-[1.1] font-medium">Qué incluye</h2>
                <ul className="grid gap-3">
                  {servicio.incluye.map((x) => (
                    <li key={x} className="flex items-baseline gap-3.5">
                      <span aria-hidden="true" className="h-3 w-3.5 flex-none translate-y-px rounded-guijarro-2 bg-primario" />
                      {x}
                    </li>
                  ))}
                </ul>
                <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp={PEDIR} textoLlamar="Llamar" iconoLlamar={false} apilar={false} className="mt-1.5 [&>*]:flex-[1_1_160px]" />
              </div>
            )}
          </div>
        </section>
      )}

      {fotos.length > 0 && (
        <section aria-label="Más fotos" className="contenedor pb-[clamp(56px,7vw,96px)]">
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6">
            {fotos.slice(0, 3).map((f, i) => (
              <li key={f.src}>
                <Foto imagen={f} proporcion="3/2" sizes="(min-width: 1024px) 380px, calc(100vw - 40px)" className={cn(i % 2 === 1 && "rounded-guijarro-2")} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <Obras trabajos={trabajosDelServicio(config.trabajos, servicio)} modo="servicio" antetitulo="Obras" titulo="Trabajos de este servicio" />
      <PreguntasFrecuentes preguntas={servicio.preguntas} grupo="preguntas-servicio" />
      <Recordatorio anio={negocio.anioFundacion} ciudad={contacto.direccion.ciudad} />
      <CtaFinal contacto={contacto} mensaje={mensaje} textoWhatsapp={PEDIR} />
    </>
  );
}
