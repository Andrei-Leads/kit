import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  buscarServicio,
  metadatosServicio,
  otrosServicios,
  parametrosServicios,
  trabajosDelServicio,
} from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { Verificado } from "@/components/Iconos";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Pareja } from "@/components/secciones/Pareja";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { TarjetaPrecio } from "@/components/secciones/TarjetaPrecio";
import { TarjetasTrabajo } from "@/components/secciones/TarjetasTrabajo";
import { h1Pagina, h2Seccion, tarjeta } from "@/lib/estilos";
import { lineaCierre, lineaHorario } from "@/lib/formato";
import { mensajeDeServicio } from "@/lib/mensajes";
import { hayPrecios, tarjetaPrecio } from "@/lib/precios";
import { cn } from "@/lib/utils";

// Un slug que no está en generateStaticParams se genera en la primera visita. Sin esto,
// partialPrefetching sirve antes el App Shell con 200 y el 404 solo llega a la segunda.
// Con "navigation", Next espera al resultado completo: 404 desde la primera petición.
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
 * Ficha de servicio (encargo §7): migas; partido como el hero (h1, descripción, tarjeta «Precio desde»
 * si hay `precioDesde`, pareja de botones con el mensaje del servicio y foto a la derecha; en móvil,
 * debajo). Después, «Qué incluye» con su pareja de cierre y `contenido` sobre --color-alterna, más fotos
 * en rejilla de 2, trabajos del servicio, preguntas, otros servicios y CTA. Cada bloque vacío se oculta.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const { contacto } = config;
  const mensaje = mensajeDeServicio(servicio);
  const [foto, ...masFotos] = servicio.imagenes;
  const trabajos = trabajosDelServicio(config.trabajos, servicio);
  const otros = otrosServicios(config.servicios, servicio).slice(0, 4);
  const precio = servicio.precioDesde ? tarjetaPrecio("", servicio.precioDesde, false) : null;
  const hayIncluye = servicio.incluye.length > 0;
  const hayContenido = servicio.contenido.length > 0;

  return (
    <>
      <section className="contenedor flex flex-col gap-5 pt-[clamp(20px,3vw,40px)] pb-[clamp(48px,6vw,88px)]">
        <Migas
          migas={[
            { href: "/", texto: "Inicio" },
            { href: "/servicios", texto: "Servicios" },
            { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
          ]}
        />
        <div className={cn("grid grid-cols-1 items-center gap-[clamp(28px,5vw,64px)]", foto && "lg:grid-cols-2")}>
          <div className="flex min-w-0 flex-col gap-5">
            <h1 className={h1Pagina}>{servicio.titulo}</h1>
            <p className="m-0 text-lg text-texto-suave">{servicio.descripcion}</p>
            {servicio.precioDesde && precio && (
              <TarjetaPrecio
                variante="hero"
                className="order-1 lg:order-none"
                precio={precio}
              />
            )}
            <Pareja contacto={contacto} mensaje={mensaje} linea={lineaHorario(contacto)} />
          </div>
          {foto && <Foto imagen={foto} preload proporcion="4/3" sizes="(min-width: 1280px) 560px, (min-width: 960px) 46vw, 100vw" className="rounded-tarjeta" />}
        </div>
      </section>

      {(hayIncluye || hayContenido) && (
        <section
          className={cn(
            "contenedor grid grid-cols-1 items-start gap-[clamp(28px,5vw,64px)] bg-alterna py-[clamp(48px,6vw,88px)]",
            hayIncluye && hayContenido && "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]",
          )}
        >
          {hayIncluye && (
            <div className="flex flex-col gap-4.5 rounded-tarjeta bg-fondo p-[clamp(24px,3vw,36px)] shadow-tarjeta">
              <h2 className="m-0 text-2xl font-extrabold tracking-[-0.02em]">Qué incluye</h2>
              <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
                {servicio.incluye.map((i) => (
                  <li key={i} className="flex items-start gap-3 leading-[1.4] font-semibold">
                    <Verificado />
                    <span className="pt-0.5">{i}</span>
                  </li>
                ))}
              </ul>
              <Pareja
                contacto={contacto}
                mensaje={mensaje}
                tamano="cierre"
                textoWhatsapp="Envíanos una foto por WhatsApp"
                linea={lineaCierre(config)}
              />
            </div>
          )}
          {hayContenido && (
            <div className="flex max-w-[68ch] flex-col gap-4">
              {/* Título añadido por Claude Design para no saltar de h1 a párrafos sin h2 (entrega §10). */}
              <h2 className="m-0 text-2xl font-extrabold tracking-[-0.02em]">Cómo lo hacemos</h2>
              {servicio.contenido.map((p, i) => (
                <p key={i} className="m-0">
                  {p}
                </p>
              ))}
            </div>
          )}
        </section>
      )}

      {masFotos.length > 0 && (
        <section aria-label="Más fotos" className="contenedor pt-[clamp(48px,6vw,88px)]">
          <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
            {masFotos.map((f) => (
              <li key={f.src}>
                <Foto imagen={f} proporcion="3/2" sizes="(min-width: 768px) 50vw, 100vw" />
              </li>
            ))}
          </ul>
        </section>
      )}

      {trabajos.length > 0 && (
        <section aria-labelledby="titulo-trabajos-servicio" className="contenedor flex flex-col gap-6 pt-[clamp(48px,6vw,88px)]">
          <h2 id="titulo-trabajos-servicio" className={h2Seccion}>
            Trabajos de este servicio
          </h2>
          <TarjetasTrabajo trabajos={trabajos} nivel="h3" />
        </section>
      )}

      <PreguntasFrecuentes
        preguntas={servicio.preguntas}
        titulo="Preguntas sobre este servicio"
        id="titulo-preguntas-servicio"
        grupo="preguntas-servicio"
        className="pt-[clamp(48px,6vw,88px)]"
      />

      {otros.length > 0 && (
        <section aria-labelledby="titulo-otros" className="contenedor flex flex-col gap-5 py-[clamp(48px,6vw,88px)]">
          <h2 id="titulo-otros" className="m-0 text-2xl font-extrabold tracking-[-0.02em]">
            Otros servicios
          </h2>
          <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
            {otros.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/servicios/${s.slug}`}
                  className={cn(tarjeta, "foco inline-flex min-h-12 items-center gap-x-2.5 rounded-boton px-5 py-2 leading-tight font-semibold no-underline shadow-none hover:bg-alterna")}
                >
                  {s.titulo}
                  {s.precioDesde && <span className="font-medium whitespace-nowrap text-texto-suave tabular-nums">{s.precioDesde}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {otros.length === 0 && <div className="h-[clamp(48px,6vw,88px)]" />}
      <CtaFinal contacto={config.contacto} valoracion={config.valoracion} conPrecios={hayPrecios(config)} mensaje={mensaje} />
    </>
  );
}
