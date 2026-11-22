import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { Pareja } from "@/components/Botones";
import { Marco } from "@/components/Marco";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { mensajeDeTrabajo } from "@/lib/mensajes";
import { etiquetaPieza } from "@/lib/textos";
import config from "@/site.config";

// Un slug que no está en generateStaticParams se genera en la primera visita. Sin esto,
// partialPrefetching sirve antes el App Shell con 200 y el 404 solo llega a la segunda.
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
 * Ficha de obra (encargo §7): foto principal a sangre con corte diagonal y, al lado (debajo en
 * móvil), la placa «PIEZA 06 · BENETÚSSER · 2026», el h1, la descripción y los datos (`dl`; cada
 * dato que falta desaparece). Después, antes/después si hay `antes`, el resto de fotos en mosaico,
 * `contenido`, testimonio, enlace al servicio y «Quiero una así» + Llamar.
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const indice = config.trabajos.indexOf(trabajo);
  const { contacto } = config;
  const mensaje = mensajeDeTrabajo(trabajo);
  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const [principal, ...resto] = trabajo.imagenes;
  const datos = (
    [
      ["Lugar", trabajo.ubicacion],
      ["Año", trabajo.anio],
      ["Superficie", trabajo.superficie],
      ["Duración", trabajo.duracion],
      ["Servicio", servicio?.titulo],
      ["Precio", trabajo.precio],
    ] as const
  ).filter(([, v]) => v !== undefined && v !== "");

  return (
    <Marco actual="trabajos">
      <header className="lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start">
        <div className="banda-abajo relative aspect-[4/3] lg:[clip-path:polygon(0_0,100%_0,88%_100%,0_100%)]">
          <Foto
            imagen={principal}
            sizes="(min-width: 1024px) 58vw, 100vw"
            proporcion="relleno"
            preload
            className="absolute inset-0"
            claseEtiqueta="top-[76px] left-4 lg:left-10"
          />
        </div>
        <div className="contenedor flex flex-col justify-end pt-5 lg:max-w-none lg:pt-[140px] lg:pr-[max(40px,calc((100vw-1200px)/2+40px))] lg:pb-10 lg:pl-6">
          <Migas
            migas={[
              { href: "/", texto: "Inicio" },
              { href: "/trabajos", texto: "Obras" },
              { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
            ]}
          />
          <p className="corte-placa hierro mt-3.5 self-start py-[5px] pr-4 pl-2.5 font-titulo text-[15px] font-bold tracking-[0.07em] uppercase [clip-path:polygon(0_0,100%_0,calc(100%-10px)_100%,0_100%)]">
            {etiquetaPieza(trabajo, indice)}
          </p>
          <h1 className="mt-2.5 font-titulo text-[clamp(2.25rem,1.2rem+3.6vw,4.5rem)] leading-[0.92] font-extrabold text-balance uppercase [overflow-wrap:anywhere]">
            {trabajo.titulo}
          </h1>
          <p className="mt-3 max-w-[46ch] leading-[1.45] text-pretty">{trabajo.descripcion}</p>
          {datos.length > 0 && (
            <dl className="mt-5 grid grid-cols-2 gap-x-4">
              {datos.map(([k, v]) => (
                <div key={k} className="border-t border-borde py-2.5">
                  <dt className="font-titulo text-sm font-bold tracking-[0.06em] text-texto-suave uppercase">{k}</dt>
                  <dd className="mt-0.5 font-titulo text-[22px] leading-[1.1] font-extrabold uppercase">{String(v)}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </header>

      <section aria-label="La obra" className="py-[clamp(32px,5vw,72px)]">
        <div className="contenedor">
          {trabajo.antes && (
            <div className="mb-8">
              <h2 className="h2 mb-3.5">Antes y después</h2>
              <AntesDespues antes={trabajo.antes} despues={principal} sizes="(min-width: 800px) 760px, calc(100vw - 32px)" className="max-w-[760px]" />
            </div>
          )}
          {resto.length > 0 && (
            <ul className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-3">
              {resto.map((f) => (
                <li key={f.src}>
                  <Foto imagen={f} sizes="(min-width: 1024px) 380px, calc(50vw - 22px)" proporcion="1/1" etiquetaCompacta className="corte-tarjeta" />
                </li>
              ))}
            </ul>
          )}
          <div className="grid items-start gap-[clamp(24px,4vw,64px)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div>
              {trabajo.contenido.map((p) => (
                <p key={p} className="mb-3.5 max-w-[62ch] text-pretty">
                  {p}
                </p>
              ))}
              {servicio && (
                <Link href={`/servicios/${servicio.slug}`} className="enlace text-[19px]">
                  Ver el servicio: {servicio.titulo}{" "}
                  <span aria-hidden="true" className="text-acento">
                    →
                  </span>
                </Link>
              )}
            </div>
            {trabajo.testimonio && (
              <figure className="hierro corte-tarjeta p-6">
                <blockquote className="font-titulo text-[26px] leading-[1.1] font-bold text-balance uppercase">«{trabajo.testimonio.texto}»</blockquote>
                <figcaption className="mt-3.5 text-[15px] text-texto-suave">{trabajo.testimonio.autor}</figcaption>
              </figure>
            )}
          </div>
          <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp="Quiero una así" sinIcono className="mt-8 max-w-[560px]" />
        </div>
      </section>
      <CtaFinal contacto={contacto} mensaje={mensaje} />
    </Marco>
  );
}
