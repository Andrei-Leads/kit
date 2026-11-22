import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { mensajeDeTrabajo } from "@/lib/mensajes";
import { pieConjunto } from "@/lib/textos";
import config from "@/site.config";

// Un slug que no está en generateStaticParams se genera en la primera visita. Sin esto,
// partialPrefetching sirve antes el App Shell con 200 y el 404 solo llega a la segunda.
export const ensureStatic = "navigation";

// Sin trabajos, core devuelve [{ slug: "_" }], que buscarTrabajo no encuentra: 404.
export function generateStaticParams() {
  return parametrosTrabajos(config);
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

/**
 * Ficha de obra (encargo §7): foto principal 4:3 redondeada (o el antes y después, con la misma foto
 * de «después»), datos en chips de arcilla, descripción, `contenido`, testimonio con comillas, el
 * enlace al servicio, «Quiero algo parecido» y más fotos. Cada chip vacío desaparece.
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const { contacto } = config;
  const mensaje = mensajeDeTrabajo(trabajo);
  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const [foto, ...fotos] = trabajo.imagenes;
  const datos = [
    ["Dónde", trabajo.ubicacion],
    ["Año", trabajo.anio && String(trabajo.anio)],
    ["Tamaño", trabajo.superficie],
    ["Plazo", trabajo.duracion],
    ["Precio", trabajo.precio],
  ].filter((d): d is [string, string] => !!d[1]);
  const pieAntes = trabajo.antes && pieConjunto([foto, trabajo.antes]);

  return (
    <>
      <article className="mx-auto flex max-w-[calc(1000px+2*clamp(20px,5vw,56px))] flex-col gap-[22px] px-[clamp(20px,5vw,56px)] pt-[clamp(28px,4vw,48px)] pb-[clamp(56px,7vw,96px)]">
        <Migas
          migas={[
            { href: "/", texto: "Inicio" },
            { href: "/trabajos", texto: "Obras" },
            { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
          ]}
        />
        <h1 className="font-titulo text-[clamp(2.25rem,1.6rem+3vw,4.25rem)] leading-[1.02] font-medium tracking-[-0.02em] text-balance">{trabajo.titulo}</h1>
        {datos.length > 0 && (
          <ul aria-label="Datos de la obra" className="flex flex-wrap gap-2">
            {datos.map(([k, v]) => (
              <li key={k} className="rounded-chip bg-alterna px-3.5 py-1.5 text-[15px] leading-[1.3]">
                <span className="text-texto-suave">{k}</span> <strong className="font-semibold">{v}</strong>
              </li>
            ))}
          </ul>
        )}

        {trabajo.antes ? (
          <figure>
            <AntesDespues antes={trabajo.antes} despues={foto} preload sizes="(min-width: 1024px) 1000px, calc(100vw - 40px)" />
            <figcaption className="pie-foto mt-2.5">
              {pieAntes}
              <span className="[@media(scripting:none)]:hidden">
                {pieAntes ? " · " : ""}Arrastra para comparar antes y después
              </span>
            </figcaption>
          </figure>
        ) : (
          <Foto imagen={foto} preload proporcion="4/3" sizes="(min-width: 1024px) 1000px, calc(100vw - 40px)" />
        )}

        <div className="mt-3 grid items-start gap-[clamp(28px,4vw,56px)] lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <p className="font-titulo text-[clamp(1.375rem,1.2rem+0.6vw,1.75rem)] leading-[1.35] text-pretty">{trabajo.descripcion}</p>
            {trabajo.contenido.map((p) => (
              <p key={p} className="text-texto-suave text-pretty">
                {p}
              </p>
            ))}
            {servicio && (
              <Link href={`/servicios/${servicio.slug}`} className="enlace self-start text-primario-tinta">
                Servicio: {servicio.titulo}&nbsp;→
              </Link>
            )}
          </div>
          {trabajo.testimonio && (
            <blockquote className="relative rounded-tarjeta bg-superficie px-7 pt-10 pb-7 shadow-suave">
              <span aria-hidden="true" className="absolute -top-1.5 left-6 font-titulo text-[88px] leading-none text-acento">
                “
              </span>
              <p className="font-titulo text-[22px] leading-[1.4] text-pretty">{trabajo.testimonio.texto}</p>
              <footer className="mt-4 text-[15px] text-texto-suave">{trabajo.testimonio.autor}</footer>
            </blockquote>
          )}
        </div>

        {fotos.length > 0 && (
          <ul aria-label="Más fotos de la obra" className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-5">
            {fotos.map((f) => (
              <li key={f.src}>
                <Foto imagen={f} proporcion="4/3" sizes="(min-width: 1024px) 480px, calc(100vw - 40px)" />
              </li>
            ))}
          </ul>
        )}

        <section aria-labelledby="titulo-parecido" className="sobre-alterna mt-5 flex flex-wrap items-center justify-between gap-5 rounded-tarjeta bg-alterna p-[clamp(24px,4vw,40px)]">
          <h2 id="titulo-parecido" className="font-titulo text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-[1.1] font-medium">
            Quiero algo parecido
          </h2>
          <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp="Pedir algo parecido" textoLlamar="Llamar al taller" className="max-lg:w-full" />
        </section>
      </article>
      <CtaFinal contacto={contacto} mensaje={mensaje} textoWhatsapp="Quiero algo parecido" />
    </>
  );
}
