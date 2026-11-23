import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import config from "@/site.config";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { mensajeDeTrabajo, TEXTO_WA_TRABAJO } from "@/lib/mensajes";

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

const DT = "text-xs font-medium tracking-[0.12em] text-texto-suave uppercase";
const DD = "m-0 mt-1.5 font-titulo text-[22px] leading-[1.25]";

/**
 * Ficha de obra (encargo §7): migas y `h1`; foto principal 3:2 a sangre; ficha en versalitas
 * (lugar, año, superficie, duración, precio y solución enlazada; cada dato que falta se va);
 * «Antes y *después*» si hay `antes`; `contenido`, el resto de fotos, el `testimonio` en serif
 * cursiva y el CTA «Quiero algo parecido».
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const c = config;
  const cta = { telefono: c.contacto.telefono, whatsapp: c.contacto.whatsapp, mensaje: mensajeDeTrabajo(trabajo) };
  const servicio = servicioDelTrabajo(c.servicios, trabajo);
  const datos = [
    ["Lugar", trabajo.ubicacion],
    ["Año", trabajo.anio && String(trabajo.anio)],
    ["Superficie", trabajo.superficie],
    ["Duración", trabajo.duracion],
    ["Precio", trabajo.precio],
  ].filter((d): d is [string, string] => Boolean(d[1]));
  const [principal, ...otras] = trabajo.imagenes;

  return (
    <>
      <article>
        <div className="contenedor pt-[clamp(24px,4vw,48px)]">
          <Migas
            migas={[
              { href: "/", texto: "Inicio" },
              { href: "/trabajos", texto: "Obras" },
              { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
            ]}
          />
          <h1 className="titulo-h1 mt-[clamp(24px,4vw,48px)] max-w-[18ch]">{trabajo.titulo}</h1>
          <p className="m-0 mt-5 max-w-[56ch] text-texto-suave">{trabajo.descripcion}</p>
        </div>
        <div className="mx-auto mt-[clamp(28px,4vw,56px)] max-w-[1440px]">
          <Foto imagen={principal} sizes="100vw" preload className="max-h-[88svh] w-full" />
        </div>
        <div className="contenedor">
          {(datos.length > 0 || servicio) && (
            <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] border-b border-borde">
              {datos.map(([k, v]) => (
                <div key={k} className="border-t border-anodizado py-5 pr-4">
                  <dt className={DT}>{k}</dt>
                  <dd className={DD}>{v}</dd>
                </div>
              ))}
              {servicio && (
                <div className="border-t border-anodizado py-5 pr-4">
                  <dt className={DT}>Solución</dt>
                  <dd className={DD}>
                    <Link href={`/servicios/${servicio.slug}`} className="underline decoration-1 underline-offset-[5px]">
                      {servicio.titulo}
                    </Link>
                  </dd>
                </div>
              )}
            </dl>
          )}

          {trabajo.antes && (
            <section aria-labelledby="titulo-antes" className="mt-[clamp(64px,9vw,128px)]">
              <h2 id="titulo-antes" className="titulo-h2 mb-6">
                Antes y <em>después</em>
              </h2>
              <AntesDespues antes={trabajo.antes} despues={principal} sizes="(min-width: 1440px) 1312px, 100vw" />
            </section>
          )}

          <div className="mx-auto mt-[clamp(64px,9vw,128px)] max-w-[64ch]">
            {trabajo.contenido.map((p) => (
              <p key={p} className="m-0 mb-5 font-titulo text-[21px] leading-[1.6]">
                {p}
              </p>
            ))}
            {trabajo.testimonio && (
              <figure className="m-0 mt-12 border-t border-anodizado pt-7">
                <blockquote className="m-0 font-titulo text-[clamp(1.625rem,1.2rem+1.4vw,2.25rem)] leading-[1.3] italic">«{trabajo.testimonio.texto}»</blockquote>
                <figcaption className="versalitas mt-4">{trabajo.testimonio.autor}</figcaption>
              </figure>
            )}
          </div>

          {otras.length > 0 && (
            <div className="mt-[clamp(80px,10vw,160px)] flex flex-col items-center gap-[clamp(48px,8vw,120px)]">
              {otras.map((f) => (
                <Foto key={f.src} imagen={f} sizes="(min-width: 768px) 720px, 100vw" className="w-full max-w-[720px]" />
              ))}
            </div>
          )}
        </div>
      </article>
      <CtaFinal cta={cta} textoWhatsapp={TEXTO_WA_TRABAJO} />
    </>
  );
}
