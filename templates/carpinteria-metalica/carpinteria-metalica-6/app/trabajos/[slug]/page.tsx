import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import config from "@/site.config";
import { IconoCalendario, IconoEtiqueta, IconoRegla, IconoReloj, IconoUbicacion, IconoVentana } from "@/components/Iconos";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { mensajeDeTrabajo, TEXTO_WA_TRABAJO } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

// Ver app/servicios/[slug]/page.tsx: sin esto, un slug inexistente da 200 en la primera visita.
export const ensureStatic = "navigation";

// Sin trabajos, core devuelve [{ slug: "_" }], que no existe: la página hace notFound().
export function generateStaticParams() {
  return parametrosTrabajos(config);
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

const SIZES = "(min-width: 1024px) 940px, 100vw";

/**
 * Ficha de trabajo (encargo §7 e Interiores.dc.html): migas, h1 y descripción; el deslizador
 * grande 4:3 (o la foto sola) como LCP; la fila de datos en pastillas (lugar, año, superficie,
 * plazo y precio, cada una solo con dato). Sobre blanco, «El trabajo» (`contenido`), el enlace al
 * servicio y el testimonio con comillas grandes en primario; el resto de `imagenes`; y el CTA
 * «Quiero algo parecido».
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const { contacto } = config;
  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const [principal, ...resto] = trabajo.imagenes;
  const datos: { v?: string; icono: ReactNode; nombre: string }[] = [
    { v: trabajo.ubicacion, icono: <IconoUbicacion tamano={16} />, nombre: "Lugar" },
    { v: trabajo.anio?.toString(), icono: <IconoCalendario tamano={16} />, nombre: "Año" },
    { v: trabajo.superficie, icono: <IconoRegla tamano={16} />, nombre: "Tamaño" },
    { v: trabajo.duracion, icono: <IconoReloj tamano={16} />, nombre: "Plazo" },
    { v: trabajo.precio, icono: <IconoEtiqueta tamano={16} />, nombre: "Precio aproximado" },
  ].filter((d) => d.v);
  const parrafos = trabajo.contenido.length > 0 ? trabajo.contenido : [];

  return (
    <>
      <span data-pagina="trabajos" hidden />
      <section className="contenedor pt-2 pb-[clamp(40px,6vw,72px)]">
        <Migas
          migas={[
            { href: "/", texto: "Inicio" },
            { href: "/trabajos", texto: "Fachadas" },
            { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
          ]}
        />
        <h1 className="titulo-display mt-2 max-w-[18ch]">{trabajo.titulo}</h1>
        <p className="mt-4 max-w-[40rem] text-texto-suave">{trabajo.descripcion}</p>
        <div className="mt-6 max-w-[940px]">
          {trabajo.antes ? (
            <>
              <AntesDespues antes={trabajo.antes} despues={principal} titulo={trabajo.titulo} sizes={SIZES} preload antesInmediata />
              <p className="mt-3 text-[15px] text-texto-suave">
                <span aria-hidden="true">‹› </span>Desliza para comparar
              </p>
            </>
          ) : (
            <Foto imagen={principal} sizes={SIZES} preload />
          )}
        </div>
        {datos.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {datos.map((d) => (
              <li key={d.nombre} className="flex min-h-9 items-center gap-1.5 rounded-pastilla border border-borde bg-superficie px-3.5 text-[15px] font-bold">
                {d.icono}
                <span className="sr-only">{d.nombre}: </span>
                {d.v}
              </li>
            ))}
          </ul>
        )}
      </section>

      {(parrafos.length > 0 || servicio || trabajo.testimonio) && (
        <section aria-label="El trabajo" className="border-y border-borde bg-superficie py-[clamp(48px,2rem+5vw,88px)]">
          <div className={cn("contenedor grid items-start gap-x-14 gap-y-10", trabajo.testimonio && "lg:grid-cols-2")}>
            <div className="max-w-[65ch]">
              {parrafos.length > 0 && (
                <>
                  <h2 className="titulo-seccion mb-5">El trabajo</h2>
                  {parrafos.map((p) => (
                    <p key={p} className="mb-[1em] last:mb-0">
                      {p}
                    </p>
                  ))}
                </>
              )}
              {servicio && (
                <Link
                  href={`/servicios/${servicio.slug}`}
                  className={cn(
                    "inline-flex min-h-14 items-center gap-3 rounded-pastilla border border-borde bg-fondo py-2 pr-5 pl-2 no-underline hover:bg-primario-suave",
                    parrafos.length > 0 && "mt-6",
                  )}
                >
                  <span className="flex size-10 flex-none items-center justify-center rounded-full bg-primario-suave">
                    <IconoVentana tamano={20} className="text-texto" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[13px] text-texto-suave">Servicio</span>
                    <span className="text-base font-bold">{servicio.titulo}</span>
                  </span>
                </Link>
              )}
            </div>
            {trabajo.testimonio && (
              <figure className="m-0 rounded-tarjeta bg-primario-suave p-6">
                <span aria-hidden="true" className="block text-6xl leading-[0.6] font-extrabold text-primario-texto">
                  “
                </span>
                <blockquote className="mt-4 text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-[1.45] font-bold">{trabajo.testimonio.texto}</blockquote>
                <figcaption className="mt-3 text-[15px] text-texto-suave">{trabajo.testimonio.autor}</figcaption>
              </figure>
            )}
          </div>
        </section>
      )}

      {resto.length > 0 && (
        <section aria-label="Más fotos" className="contenedor pt-[clamp(48px,6vw,80px)]">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resto.map((f) => (
              <li key={f.src}>
                <Foto imagen={f} sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw" />
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className={cn(resto.length > 0 && "mt-[clamp(48px,6vw,80px)]")}>
        <CtaFinal
          cta={{ telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeDeTrabajo(trabajo) }}
          textoWhatsapp={TEXTO_WA_TRABAJO}
          titulo="¿Quieres algo parecido?"
        />
      </div>
    </>
  );
}
