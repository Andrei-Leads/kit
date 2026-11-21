import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { Marco } from "@/components/Marco";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { mensajeParecido } from "@/lib/mensajes";
import config from "@/site.config";

// Sin esto, un slug inexistente da 200 en la primera visita (partialPrefetching).
export const ensureStatic = "navigation";

// Sin trabajos, core devuelve [{ slug: "_" }], que no existe: la página hace notFound().
export function generateStaticParams() {
  return parametrosTrabajos(config);
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

const SIZES = "(min-width: 1280px) 700px, (min-width: 768px) 58vw, 92vw";

/**
 * Ficha de trabajo (encargo §7): foto 4:3 (con `antes`, la pieza AntesDespues), ficha de datos en
 * dos columnas (solo los que existan), contenido, testimonio con borde primario, enlace al servicio
 * y CTA «¿Quieres algo parecido?».
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const ficha = [
    ["Ubicación", trabajo.ubicacion],
    ["Año", trabajo.anio],
    ["Superficie", trabajo.superficie],
    ["Duración", trabajo.duracion],
    ["Precio", trabajo.precio],
  ].filter((f): f is [string, string | number] => f[1] !== undefined && f[1] !== "");
  const [principal, ...resto] = trabajo.imagenes;

  return (
    <Marco actual="trabajos">
      <Migas
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Trabajos" },
          { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
        ]}
        className="contenedor pt-2"
      />
      <article className="contenedor flex flex-col gap-5 pt-3">
        <header className="flex flex-col gap-2">
          <h1 className="text-h1 leading-[1.05] font-semibold">{trabajo.titulo}</h1>
          <p className="max-w-[56ch] text-lg text-texto-suave">{trabajo.descripcion}</p>
        </header>
        <div className="flex flex-wrap items-start gap-[clamp(20px,3vw,36px)]">
          <div className="flex min-w-0 flex-[7_1_420px] flex-col gap-3">
            {trabajo.antes ? (
              <AntesDespues antes={trabajo.antes} despues={principal} sizes={SIZES} preload className="border border-carril bg-superficie" />
            ) : (
              <Foto imagen={principal} sizes={SIZES} preload className="border border-carril" />
            )}
            {resto.length > 0 && (
              <ul className="grid grid-cols-2 gap-3">
                {resto.map((img) => (
                  <li key={img.src}>
                    <Foto imagen={img} sizes="(min-width: 768px) 28vw, 45vw" className="border border-carril" />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex min-w-0 flex-[5_1_300px] flex-col gap-[18px]">
            {ficha.length > 0 && (
              <dl className="border border-carril bg-superficie">
                {ficha.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[120px_minmax(0,1fr)] gap-3 border-b border-carril px-3.5 py-2.5 last:border-b-0">
                    <dt className="rotulo pt-0.5">{k}</dt>
                    <dd className="cifras">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
            {trabajo.contenido.map((p) => (
              <p key={p} className="text-[17px]">
                {p}
              </p>
            ))}
            {trabajo.testimonio && (
              <figure className="border-l-4 border-primario py-1 pl-4">
                <blockquote className="text-[19px] leading-[1.4]">«{trabajo.testimonio.texto}»</blockquote>
                <figcaption className="mt-1.5 text-[15px] text-texto-suave">{trabajo.testimonio.autor}</figcaption>
              </figure>
            )}
            {servicio && (
              <Link href={`/servicios/${servicio.slug}`} className="enlace inline-flex min-h-11 items-center self-start">
                Servicio: {servicio.titulo} ›
              </Link>
            )}
          </div>
        </div>
      </article>
      <CtaFinal contacto={config.contacto} mensaje={mensajeParecido(trabajo)} titulo="¿Quieres algo parecido?" textoWhatsapp="Quiero algo parecido por WhatsApp" />
    </Marco>
  );
}
