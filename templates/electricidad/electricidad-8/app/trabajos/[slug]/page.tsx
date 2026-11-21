import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { ParCta } from "@/components/Botones";
import { CabeceraPagina } from "@/components/CabeceraPagina";
import { Marco } from "@/components/Marco";
import { Rotulo } from "@/components/Rotulo";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { mensajeFichaTrabajo } from "@/lib/mensajes";
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

/**
 * Ficha de trabajo (encargo §7): lámina principal 3:2 con marco (con `antes`, AntesDespues), tabla
 * de datos con filetes (cada dato solo si existe), `contenido`, `testimonio` como cita en la serif,
 * enlace al servicio y CTA «Quiero algo parecido».
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const c = config;
  const servicio = servicioDelTrabajo(c.servicios, trabajo);
  const mensaje = mensajeFichaTrabajo(trabajo);
  const [principal, ...resto] = trabajo.imagenes;
  const filas = [
    trabajo.ubicacion && { k: "Lugar", v: trabajo.ubicacion },
    trabajo.anio && { k: "Año", v: String(trabajo.anio) },
    trabajo.superficie && { k: "Alcance", v: trabajo.superficie },
    trabajo.duracion && { k: "Duración", v: trabajo.duracion },
    trabajo.precio && { k: "Precio", v: trabajo.precio },
  ].filter(Boolean) as { k: string; v: string }[];
  const hayFicha = filas.length > 0 || Boolean(servicio);

  return (
    <Marco actual="trabajos">
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Trabajos" },
          { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
        ]}
        titulo={trabajo.titulo}
        entradilla={trabajo.descripcion}
        className="pb-8 lg:pb-10"
      />

      <div className="contenedor pb-14 lg:pb-20">
        {trabajo.antes ? (
          <AntesDespues antes={trabajo.antes} despues={principal} sizes="(min-width: 1280px) 1180px, 100vw" preload />
        ) : (
          <Foto imagen={principal} sizes="(min-width: 1280px) 1180px, 100vw" marco="lamina" preload />
        )}
        {resto.length > 0 && (
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {resto.map((img) => (
              <Foto key={img.src} imagen={img} sizes="(min-width: 640px) 45vw, 100vw" marco="lamina" />
            ))}
          </div>
        )}

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {hayFicha && (
            <section aria-labelledby="h2-ficha" className="lg:col-span-5">
              <Rotulo n="01" texto="Ficha del trabajo" />
              <h2 id="h2-ficha" className="sr-only">
                Ficha del trabajo
              </h2>
              <dl className="mt-4 border-t border-texto">
                {filas.map((f) => (
                  <div key={f.k} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-linea-plano py-3">
                    <dt className="versalitas pt-1.5 text-texto-suave">{f.k}</dt>
                    <dd className="font-titulo text-[1.1875rem]">{f.v}</dd>
                  </div>
                ))}
                {servicio && (
                  <div className="grid grid-cols-[7rem_1fr] items-center gap-4 border-b border-linea-plano py-1">
                    <dt className="versalitas text-texto-suave">Servicio</dt>
                    <dd>
                      <Link
                        href={`/servicios/${servicio.slug}`}
                        className="inline-flex min-h-11 items-center font-titulo text-[1.1875rem] text-acento underline decoration-1 underline-offset-4 focus-visible:outline-2 focus-visible:outline-foco"
                      >
                        {servicio.titulo}
                      </Link>
                    </dd>
                  </div>
                )}
              </dl>
            </section>
          )}
          {(trabajo.contenido.length > 0 || trabajo.testimonio) && (
            <div className={hayFicha ? "lg:col-span-7" : "lg:col-span-8"}>
              {trabajo.contenido.length > 0 && (
                <div className="flex max-w-[66ch] flex-col gap-4">
                  {trabajo.contenido.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              )}
              {trabajo.testimonio && (
                <figure className="mt-8 border-t border-texto pt-6">
                  <blockquote className="font-titulo text-[clamp(1.5rem,1.25rem+1vw,2rem)] leading-snug">«{trabajo.testimonio.texto}»</blockquote>
                  <figcaption className="versalitas mt-4 text-texto-suave">{trabajo.testimonio.autor}</figcaption>
                </figure>
              )}
            </div>
          )}
        </div>

        <ParCta contacto={c.contacto} mensaje={mensaje} textoWhatsapp="Quiero algo parecido" className="mt-12" />
      </div>

      <CtaFinal
        contacto={c.contacto}
        mensaje={mensaje}
        textoWhatsapp="Quiero algo parecido"
        titulo="¿Quieres algo parecido en tu edificio?"
      />
    </Marco>
  );
}
