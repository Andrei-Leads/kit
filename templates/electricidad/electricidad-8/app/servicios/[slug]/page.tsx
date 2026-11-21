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

import { Foto } from "@/components/base/Foto";
import { Preguntas } from "@/components/base/Preguntas";
import { ParCta } from "@/components/Botones";
import { CabeceraPagina } from "@/components/CabeceraPagina";
import { Flecha, Rombo } from "@/components/Iconos";
import { Marco } from "@/components/Marco";
import { H2, Rotulo } from "@/components/Rotulo";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FichaCaso } from "@/components/secciones/FichaCaso";
import { numerar } from "@/lib/formato";
import { mensajeFichaServicio } from "@/lib/mensajes";
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

/**
 * Ficha de servicio (encargo §7): migas, h1 en la serif, entradilla, precio y la pareja de botones;
 * `contenido` en una columna de 66ch con capitular, las fotos 3:2 enmarcadas con su pie, `incluye`
 * con filetes y la segunda pareja; trabajos del servicio; preguntas; otros servicios y CTA final
 * (tres parejas Llamar + WhatsApp en total). Cada bloque vacío se oculta y se renumera.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = buscarServicio(config, slug);
  if (!servicio) notFound();

  const c = config;
  const mensaje = mensajeFichaServicio(servicio);
  const precio = servicio.precioDesde ? precioDesde(servicio.precioDesde) : undefined;
  const trabajos = trabajosDelServicio(c.trabajos, servicio);
  const otros = otrosServicios(c.servicios, servicio).slice(0, 4);
  const hayDescripcion = servicio.contenido.length > 0 || servicio.imagenes.length > 0;
  const n = numerar([
    hayDescripcion && "descripcion",
    servicio.incluye.length > 0 && "incluye",
    trabajos.length > 0 && "trabajos",
    servicio.preguntas.length > 0 && "preguntas",
    otros.length > 0 && "otros",
    "cta",
  ]);

  return (
    <Marco actual="servicios">
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
          { href: `/servicios/${servicio.slug}`, texto: servicio.titulo },
        ]}
        titulo={servicio.titulo}
        entradilla={servicio.descripcion}
      >
        {precio && (
          <p className="mt-4 flex items-baseline gap-2">
            {precio.desde && <span className="versalitas text-texto-suave">Desde</span>}{" "}
            <span className="cifras-antiguas font-titulo text-[1.75rem]">{precio.importe}</span>
          </p>
        )}
        <ParCta contacto={c.contacto} mensaje={mensaje} className="mt-7" />
      </CabeceraPagina>

      {hayDescripcion && (
        <section aria-labelledby="h2-descripcion" className="contenedor pb-14 lg:pb-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className={servicio.imagenes.length > 0 ? "lg:col-span-6" : "lg:col-span-8"}>
              <Rotulo n={n("descripcion")} texto="Descripción" />
              <h2 id="h2-descripcion" className="sr-only">
                Descripción del servicio
              </h2>
              {servicio.contenido.length > 0 && (
                <div className="mt-6 flex max-w-[66ch] flex-col gap-4">
                  {servicio.contenido.map((p, i) => (
                    <p
                      key={p}
                      className={cn(i === 0 && "first-letter:float-left first-letter:mt-1 first-letter:mr-2 first-letter:font-titulo first-letter:text-[3.6rem] first-letter:leading-[0.8]")}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              )}
            </div>
            {servicio.imagenes.length > 0 && (
              <div className="flex flex-col gap-8 lg:col-span-6">
                {servicio.imagenes.map((img) => (
                  <Foto key={img.src} imagen={img} sizes="(min-width: 1024px) 540px, 100vw" marco="lamina" />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {servicio.incluye.length > 0 && (
        <section aria-labelledby="h2-incluye" className="contenedor pb-14 lg:pb-20">
          <Rotulo n={n("incluye")} texto="Incluye" />
          <h2 id="h2-incluye" className={cn(H2, "mt-4")}>
            Qué incluye
          </h2>
          <ul className="mt-6 grid gap-x-10 border-t border-texto sm:grid-cols-2 lg:grid-cols-3">
            {servicio.incluye.map((x) => (
              <li key={x} className="flex items-baseline gap-3 border-b border-linea-plano py-4 font-titulo text-[1.25rem] leading-snug">
                <Rombo className="-translate-y-0.5" />
                {x}
              </li>
            ))}
          </ul>
          <ParCta contacto={c.contacto} mensaje={mensaje} className="mt-8" />
        </section>
      )}

      {trabajos.length > 0 && (
        <section aria-labelledby="h2-trabajos" className="contenedor pb-14 lg:pb-20">
          <Rotulo n={n("trabajos")} texto="Trabajos" />
          <h2 id="h2-trabajos" className={cn(H2, "mt-4")}>
            Trabajos de este servicio
          </h2>
          <div className="mt-8 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {trabajos.map((t) => (
              <FichaCaso key={t.slug} trabajo={t} nivel="h3" />
            ))}
          </div>
        </section>
      )}

      {servicio.preguntas.length > 0 && (
        <section aria-labelledby="h2-preguntas" className="contenedor pb-14 lg:pb-20">
          <Rotulo n={n("preguntas")} texto="Preguntas" />
          <div className="mt-4 grid gap-8 lg:grid-cols-12">
            <h2 id="h2-preguntas" className={cn(H2, "lg:col-span-4")}>
              Preguntas frecuentes
            </h2>
            <Preguntas preguntas={servicio.preguntas} grupo="preguntas-servicio" className="lg:col-span-8" />
          </div>
        </section>
      )}

      {otros.length > 0 && (
        <nav aria-labelledby="h2-otros" className="contenedor pb-14 lg:pb-20">
          <Rotulo n={n("otros")} texto="Otros servicios" />
          <h2 id="h2-otros" className="sr-only">
            Otros servicios
          </h2>
          <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
            {otros.map((o) => (
              <li key={o.slug} className="border-b border-linea-plano">
                <Link
                  href={`/servicios/${o.slug}`}
                  className="flex min-h-14 items-center justify-between gap-4 py-3 font-titulo text-[1.1875rem] hover:underline focus-visible:outline-2 focus-visible:outline-foco"
                >
                  {o.titulo} <Flecha />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <CtaFinal contacto={c.contacto} mensaje={mensaje} n={n("cta")} />
    </Marco>
  );
}
