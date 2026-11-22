import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, minusculaInicial, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Marco } from "@/components/Marco";
import { BandaInterior } from "@/components/secciones/BandaInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
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
 * Ficha de trabajo (encargo §7): foto principal 16:10 con radio de 20 px y, si hay `antes`, la
 * tarjeta «Así estaba» al lado (debajo en móvil; sin deslizador). Pastillas de contexto, contenido,
 * testimonio, galería y CTA «Quiero algo parecido».
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const [foto, ...fotos] = trabajo.imagenes;
  const datos = [
    ["Ubicación", trabajo.ubicacion],
    ["Año", trabajo.anio && String(trabajo.anio)],
    ["Superficie", trabajo.superficie],
    ["Plazo", trabajo.duracion],
    ["Precio", trabajo.precio],
  ].filter((d): d is [string, string] => !!d[1]);

  return (
    <Marco actual="trabajos">
      <BandaInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Trabajos" },
          { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
        ]}
        titulo={trabajo.titulo}
        entradilla={trabajo.descripcion}
      />

      <section aria-label="La obra" className="pt-[clamp(32px,1rem+4vw,72px)]">
        <div className="contenedor flex flex-col gap-7">
          <div className={trabajo.antes ? "grid items-start gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]" : "grid"}>
            <Foto imagen={foto} preload sizes="(min-width: 1024px) 720px, calc(100vw - 32px)" proporcion="relleno" className="aspect-[16/10] rounded-[20px]" />
            {trabajo.antes && (
              <figure className="flex flex-col gap-2 rounded-[20px] bg-superficie p-2 shadow-tarjeta">
                <Foto imagen={trabajo.antes} sizes="(min-width: 1024px) 440px, calc(100vw - 48px)" proporcion="relleno" className="aspect-[16/10] rounded-[14px]" />
                <figcaption className="px-2 pt-1 pb-1.5 font-titulo text-lg font-semibold">Así estaba</figcaption>
              </figure>
            )}
          </div>

          {datos.length > 0 && (
            <ul aria-label="Datos del trabajo" className="flex flex-wrap gap-2">
              {datos.map(([k, v]) => (
                <li key={k} className="flex items-baseline gap-2 rounded-full border border-borde bg-superficie px-4 py-2.5">
                  <span className="text-[13px] text-texto-suave">{k}</span>
                  <strong className="font-semibold">{v}</strong>
                </li>
              ))}
            </ul>
          )}

          {(trabajo.contenido.length > 0 || trabajo.testimonio || servicio) && (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-x-[clamp(32px,5vw,72px)] gap-y-8">
              <div className="flex max-w-[62ch] flex-col gap-4">
                {trabajo.contenido.length > 0 && (
                  <>
                    <h2 className="h2">La obra</h2>
                    {trabajo.contenido.map((p) => (
                      <p key={p} className="text-pretty">
                        {p}
                      </p>
                    ))}
                  </>
                )}
                {servicio && (
                  <Link href={`/servicios/${servicio.slug}`} className="enlace self-start">
                    Ver el servicio:&nbsp;{minusculaInicial(servicio.titulo)}&nbsp;→
                  </Link>
                )}
              </div>
              {trabajo.testimonio && (
                <blockquote className="flex flex-col gap-4 rounded-tarjeta bg-alterna p-[clamp(24px,3vw,40px)]">
                  <p className="font-titulo text-[clamp(1.25rem,1rem+1vw,1.75rem)] leading-[1.3] font-medium text-pretty">«{trabajo.testimonio.texto}»</p>
                  <footer className="font-semibold">{trabajo.testimonio.autor}</footer>
                </blockquote>
              )}
            </div>
          )}

          {fotos.length > 0 && (
            <ul aria-label="Más fotos de la obra" className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-3">
              {fotos.map((f) => (
                <li key={f.src}>
                  <Foto imagen={f} sizes="(min-width: 1024px) 380px, calc(100vw - 32px)" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CtaFinal
        contacto={config.contacto}
        mensaje={mensajeDeTrabajo(trabajo)}
        titulo="¿Te gusta cómo quedó?"
        textoWhatsapp="Quiero algo parecido"
        planificar={false}
      />
    </Marco>
  );
}
