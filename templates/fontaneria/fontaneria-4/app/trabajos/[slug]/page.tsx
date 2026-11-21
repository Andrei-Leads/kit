import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Marco } from "@/components/Marco";
import { CabeceraParte } from "@/components/secciones/CabeceraParte";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Encabezado } from "@/components/secciones/Encabezado";
import { casillasTrabajo } from "@/components/secciones/FichaTrabajo";
import { mensajeParte } from "@/lib/mensajes";
import { lineaConfianza } from "@/lib/formato";
import { datosMarco, numerar } from "@/lib/navegacion";
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
 * Parte completo de un trabajo (encargo §7): casillas de contexto (cada una solo con dato), polaroid
 * grande con la descripción, antes/después (pieza base reestilada) si hay `antes`, «Trabajo realizado»,
 * «Conformidad del cliente» con el testimonio, enlace al servicio y CTA «Abrir un aviso parecido».
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const indice = config.trabajos.indexOf(trabajo);
  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const campos = numerar([
    { id: "contexto", texto: "Contexto" },
    trabajo.antes && { id: "antes-despues", texto: "Antes y después" },
    (trabajo.contenido.length > 0 || servicio) && { id: "realizado", texto: "Trabajo realizado" },
    trabajo.testimonio && { id: "conformidad", texto: "Conformidad" },
    { id: "abrir-aviso", texto: "Abrir aviso" },
  ]);
  const n = (id: string) => campos.find((c) => c.id === id)?.n ?? "";

  return (
    <Marco {...datosMarco(config)} ficha pagina="trabajos" campos={campos}>
      <CabeceraParte
        tipo="Parte archivado"
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Trabajos" },
          { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
        ]}
        casillas={casillasTrabajo(trabajo, indice)}
        titulo={trabajo.titulo}
      />

      <div className="flex flex-col gap-(--sec) px-(--pad) pt-(--sec)">
        <section id="contexto" aria-labelledby="h2-contexto">
          <Encabezado n={n("contexto")} rotulo="Contexto" />
          <h2 id="h2-contexto" className="sr-only">
            Contexto
          </h2>
          <div className="flex flex-wrap items-start gap-7">
            <div className="giro-izq w-[min(280px,80%)] sm:w-[300px]">
              <Foto imagen={trabajo.imagenes[0]} sizes="300px" preload />
            </div>
            <p className="max-w-[52ch] flex-[1_1_260px] text-cuerpo leading-[1.65]">{trabajo.descripcion}</p>
          </div>
          {trabajo.imagenes.length > 1 && (
            <div className="mt-8 flex flex-wrap gap-6">
              {trabajo.imagenes.slice(1).map((img, i) => (
                <div key={img.src} className={`w-[180px] ${i % 2 ? "giro-izq" : "giro-der"}`}>
                  <Foto imagen={img} sizes="180px" marco="pequena" />
                </div>
              ))}
            </div>
          )}
        </section>

        {trabajo.antes && (
          <section id="antes-despues" aria-labelledby="h2-antes">
            <Encabezado n={n("antes-despues")} rotulo="Comparación" titulo="Antes y después" id="h2-antes" />
            <AntesDespues antes={trabajo.antes} despues={trabajo.imagenes[0]} sizes="(min-width: 40rem) 540px, 90vw" />
          </section>
        )}

        {(trabajo.contenido.length > 0 || servicio) && (
          <section id="realizado" aria-labelledby="h2-realizado">
            <Encabezado n={n("realizado")} rotulo="Detalle" titulo="Trabajo realizado" id="h2-realizado" />
            <div className="texto-editorial flex flex-col gap-[1.1em]">
              {trabajo.contenido.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {servicio && (
              <Link href={`/servicios/${servicio.slug}`} className="enlace-parte mt-4">
                Servicio: {servicio.titulo} →
              </Link>
            )}
          </section>
        )}

        {trabajo.testimonio && (
          <section id="conformidad" aria-labelledby="h2-conformidad">
            <Encabezado n={n("conformidad")} rotulo="Firma" titulo="Conformidad del cliente" id="h2-conformidad" />
            <figure className="max-w-[620px] border border-texto bg-superficie p-5">
              <blockquote className="text-[1.1875rem] leading-normal">«{trabajo.testimonio.texto}»</blockquote>
              <figcaption className="mt-4 border-t border-dashed border-cota pt-2.5 font-titulo text-[0.8125rem] text-acento">
                {trabajo.testimonio.autor}
              </figcaption>
            </figure>
          </section>
        )}
      </div>

      <CtaFinal contacto={config.contacto} confianza={lineaConfianza(config)}
        titulo="¿Tienes algo parecido? Abrimos el aviso."
        mensaje={mensajeParte(trabajo)}
        textoWhatsapp="Quiero algo parecido por WhatsApp"
      />
    </Marco>
  );
}
