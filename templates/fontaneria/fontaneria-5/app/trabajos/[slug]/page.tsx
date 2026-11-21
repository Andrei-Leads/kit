import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, otrosTrabajos, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import config from "@/site.config";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { H1_INTERIOR, H2 } from "@/components/secciones/BandaCabecera";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { EtiquetaUbicacion, TarjetaTrabajo } from "@/components/secciones/TarjetaTrabajo";
import { mensajeDeTrabajo } from "@/lib/mensajes";

// Sin esto, con partialPrefetching un slug inexistente da 200 en la primera visita (AGENTS.md §11).
/** Foto principal: 4:3 en móvil y la franja de 1216 × 640 del export en escritorio. */
const PROPORCION_FOTO = "aspect-[4/3] lg:aspect-[1216/640]";
const SIZES_FOTO = "(min-width: 1280px) 1216px, (min-width: 1024px) calc(100vw - 64px), calc(100vw - 40px)";

export const ensureStatic = "navigation";

// Sin trabajos, core devuelve [{ slug: "_" }], que no existe: notFound().
export function generateStaticParams() {
  return parametrosTrabajos(config);
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

/**
 * Ficha de trabajo: migas, h1 y la ubicación en etiqueta grande; foto en duotono a lo ancho (con
 * `antes`, AntesDespues con las dos fotos en duotono y tirador recto tinta); ficha de datos (solo
 * los que hay; la ubicación como nodo de red), contenido, testimonio, enlace al servicio y CTA
 * «¿Tienes algo parecido cerca?».
 */
export default async function FichaTrabajo({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const { contacto } = config;
  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const [foto, ...fotos] = trabajo.imagenes;
  const otros = otrosTrabajos(config.trabajos, trabajo, 3);
  const ficha: { k: string; v: string; nodo?: boolean }[] = [];
  if (trabajo.ubicacion) ficha.push({ k: "Ubicación", v: trabajo.ubicacion, nodo: true });
  if (trabajo.anio) ficha.push({ k: "Año", v: String(trabajo.anio) });
  if (servicio) ficha.push({ k: "Servicio", v: servicio.titulo });
  if (trabajo.superficie) ficha.push({ k: "Superficie", v: trabajo.superficie });
  if (trabajo.duracion) ficha.push({ k: "Duración", v: trabajo.duracion });
  if (trabajo.precio) ficha.push({ k: "Precio", v: trabajo.precio });

  return (
    <>
      <section className="contenedor pt-6 pb-2 lg:pt-10">
        <Migas
          migas={[
            { href: "/", texto: "Inicio" },
            { href: "/trabajos", texto: "Trabajos" },
            { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
          ]}
          className="text-texto [&_a]:underline"
        />
        <div className="mt-3 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <h1 className={`${H1_INTERIOR} max-w-[16ch]`}>{trabajo.titulo}</h1>
          {trabajo.ubicacion && (
            <EtiquetaUbicacion ubicacion={trabajo.ubicacion} className="text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)]" />
          )}
        </div>
        <div className="corte mt-5">
          {trabajo.antes ? (
            <AntesDespues antes={trabajo.antes} despues={foto} preload sizes={SIZES_FOTO} claseProporcion={PROPORCION_FOTO} />
          ) : (
            <Foto imagen={foto} proporcion="relleno" preload sizes={SIZES_FOTO} className={PROPORCION_FOTO} />
          )}
        </div>
      </section>

      <section className="contenedor flex flex-wrap gap-x-16 gap-y-8 pt-7 pb-2">
        {ficha.length > 0 && (
          <dl className="m-0 grid flex-[1_1_300px] grid-cols-[auto_1fr] content-start border-t-2 border-tinta">
            {ficha.map((f) => (
              <div key={f.k} className="contents">
                <dt className="border-b-2 border-tinta py-2.5 pr-4 text-sm text-texto-suave">{f.k}</dt>
                <dd className="m-0 flex items-center gap-2 border-b-2 border-tinta py-2.5 font-titulo text-[17px] leading-[1.3] font-semibold">
                  {f.nodo && <span aria-hidden="true" className="box-border size-3 flex-none rounded-full border-3 border-primario bg-white" />}
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>
        )}
        <div className="max-w-[68ch] min-w-0 flex-[1_1_560px]">
          {(trabajo.contenido.length > 0 ? trabajo.contenido : [trabajo.descripcion]).map((p, i) => (
            <p key={i} className="mt-0 mb-3.5">
              {p}
            </p>
          ))}
          {trabajo.testimonio && (
            <blockquote className="corte my-5 bg-tinta p-0.5">
              <div className="corte-13 bg-superficie px-5 py-4">
                <p className="m-0 font-titulo text-xl leading-[1.3] font-semibold">«{trabajo.testimonio.texto}»</p>
                <footer className="mt-2 text-[15px] text-texto-suave">{trabajo.testimonio.autor}</footer>
              </div>
            </blockquote>
          )}
          {servicio && (
            <Link
              href={`/servicios/${servicio.slug}`}
              className="inline-flex min-h-11 items-center font-titulo text-[17px] leading-tight font-semibold text-texto underline decoration-2 underline-offset-[5px]"
            >
              Ver el servicio: {servicio.titulo} <span aria-hidden="true">&nbsp;→</span>
            </Link>
          )}
        </div>
      </section>

      {fotos.length > 0 && (
        <section className="contenedor pt-8 pb-2">
          <h2 className="sr-only">Más fotos</h2>
          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-3 lg:gap-3.5">
            {fotos.map((f) => (
              <div key={f.src} className="corte">
                <Foto imagen={f} proporcion="4/3" sizes="(min-width: 1024px) 400px, 50vw" />
              </div>
            ))}
          </div>
        </section>
      )}

      {otros.length > 0 && (
        <section className="contenedor pt-10 pb-2">
          <h2 className={`${H2} mb-3.5`}>Otros trabajos</h2>
          <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {otros.map((t) => (
              <li key={t.slug} className="flex">
                <TarjetaTrabajo trabajo={t} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <CtaFinal
        contacto={contacto}
        mensaje={mensajeDeTrabajo(trabajo)}
        titulo="¿Tienes algo parecido cerca?"
        textoWhatsapp="Quiero algo parecido por WhatsApp"
        variante="cierre"
      />
    </>
  );
}
