import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { Pareja } from "@/components/Botones";
import { Marco } from "@/components/Marco";
import { mensajeDeTrabajo } from "@/lib/mensajes";
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
 * Ficha de trabajo (encargo §7): foto 4:5 redondeada (LCP) junto a migas, h1, descripción, ficha en
 * píldoras (ubicación, año, medida, plazo, precio), contenido y enlace al servicio. Debajo, el hueco
 * antes y después (`AntesDespues` con tirador miel, si hay `antes`), el testimonio en burbuja, el
 * resto de fotos y «Quiero algo parecido». Cada dato que falta se omite.
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const [foto, ...fotos] = trabajo.imagenes;
  const ficha = [
    ["Ubicación", trabajo.ubicacion],
    ["Año", trabajo.anio && String(trabajo.anio)],
    ["Medida", trabajo.superficie],
    ["Plazo", trabajo.duracion],
    ["Precio", trabajo.precio],
  ].filter((d): d is [string, string] => !!d[1]);

  return (
    <Marco actual="trabajos">
      <section aria-labelledby="h1-trabajo" className="px-[clamp(20px,4vw,40px)] pt-[100px] pb-[clamp(56px,8vw,104px)]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-[clamp(36px,6vw,72px)]">
          <div className="flex flex-wrap items-start gap-[clamp(24px,5vw,64px)]">
            <Foto imagen={foto} preload sizes="(min-width: 1024px) 520px, calc(100vw - 40px)" className="max-w-[520px] min-w-0 flex-[1_1_340px]" />
            <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-[18px]">
              <Migas
                migas={[
                  { href: "/", texto: "Inicio" },
                  { href: "/trabajos", texto: "Trabajos" },
                  { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
                ]}
                className="text-texto-suave"
              />
              <h1 id="h1-trabajo" className="font-titulo text-[clamp(2rem,1.4rem+2.6vw,3.75rem)] leading-[1.05] font-bold tracking-[-0.03em]">
                {trabajo.titulo}
              </h1>
              <p className="text-entradilla">{trabajo.descripcion}</p>
              {ficha.length > 0 && (
                <dl className="flex flex-wrap gap-2">
                  {ficha.map(([k, v]) => (
                    <div key={k} className="flex items-baseline gap-1.5 rounded-full border border-borde bg-superficie px-4 py-2">
                      <dt className="text-[13.5px] text-texto-suave">{k}</dt>
                      <dd className="text-[15px] font-bold">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {trabajo.contenido.map((p) => (
                <p key={p} className="max-w-[60ch]">
                  {p}
                </p>
              ))}
              {servicio && (
                <Link href={`/servicios/${servicio.slug}`} className="enlace self-start">
                  Ver el servicio: {servicio.titulo} →
                </Link>
              )}
            </div>
          </div>

          {trabajo.antes && (
            <div className="flex max-w-[720px] flex-col gap-4">
              <h2 className="h3-seccion">El hueco, antes y después</h2>
              <AntesDespues antes={trabajo.antes} despues={foto} sizes="(min-width: 1024px) 520px, calc(100vw - 40px)" className="max-w-[520px]" />
            </div>
          )}

          {trabajo.testimonio && (
            <figure className="flex max-w-[720px] flex-col gap-3">
              <blockquote className="rounded-[28px_28px_28px_8px] bg-alterna px-7 py-6 font-titulo text-[clamp(1.2rem,1rem+0.8vw,1.6rem)] leading-[1.35] tracking-[-0.01em]">
                «{trabajo.testimonio.texto}»
              </blockquote>
              <figcaption className="pl-3 font-semibold">{trabajo.testimonio.autor}</figcaption>
            </figure>
          )}

          {fotos.length > 0 && (
            <ul aria-label="Más fotos del trabajo" className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {fotos.map((f) => (
                <li key={f.src} className="min-w-0">
                  <Foto imagen={f} compacta sizes="(min-width: 1024px) 380px, 45vw" />
                </li>
              ))}
            </ul>
          )}

          <Pareja contacto={config.contacto} mensaje={mensajeDeTrabajo(trabajo)} textoWhatsapp="Quiero algo parecido" />
        </div>
      </section>
    </Marco>
  );
}
